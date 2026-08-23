#!/usr/bin/env python3
# upscale_frames.py — Real-ESRGAN x4plus 逐帧超分（torch/MPS，RRDBNet 内联实现，免 basicsr）
# 用法: python3 upscale_frames.py <输入帧目录> <输出帧目录> [起始帧号]
# 模型: scripts/models/RealESRGAN_x4plus.pth（67MB 不入库），首次使用下载：
#   curl -L -o scripts/models/RealESRGAN_x4plus.pth \
#     https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth
import sys, os, math
import torch
import torch.nn as nn
import numpy as np
from PIL import Image

class RRDBBlock(nn.Module):
    def __init__(self, nf=64, gc=32):
        super().__init__()
        self.conv1 = nn.Conv2d(nf, gc, 3, 1, 1)
        self.conv2 = nn.Conv2d(nf + gc, gc, 3, 1, 1)
        self.conv3 = nn.Conv2d(nf + 2 * gc, gc, 3, 1, 1)
        self.conv4 = nn.Conv2d(nf + 3 * gc, gc, 3, 1, 1)
        self.conv5 = nn.Conv2d(nf + 4 * gc, nf, 3, 1, 1)
        self.lrelu = nn.LeakyReLU(0.2, inplace=True)
    def forward(self, x):
        x1 = self.lrelu(self.conv1(x))
        x2 = self.lrelu(self.conv2(torch.cat((x, x1), 1)))
        x3 = self.lrelu(self.conv3(torch.cat((x, x1, x2), 1)))
        x4 = self.lrelu(self.conv4(torch.cat((x, x1, x2, x3), 1)))
        x5 = self.conv5(torch.cat((x, x1, x2, x3, x4), 1))
        return x5 * 0.2 + x

class RRDB(nn.Module):
    def __init__(self, nf=64, gc=32):
        super().__init__()
        self.rdb1 = RRDBBlock(nf, gc)
        self.rdb2 = RRDBBlock(nf, gc)
        self.rdb3 = RRDBBlock(nf, gc)
    def forward(self, x):
        return self.rdb3(self.rdb2(self.rdb1(x))) * 0.2 + x

class RRDBNet(nn.Module):
    def __init__(self, nf=64, nb=23, gc=32):
        super().__init__()
        self.conv_first = nn.Conv2d(3, nf, 3, 1, 1)
        self.body = nn.ModuleList([RRDB(nf, gc) for _ in range(nb)])
        self.conv_body = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_up1 = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_up2 = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_hr = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_last = nn.Conv2d(nf, 3, 3, 1, 1)
        self.lrelu = nn.LeakyReLU(0.2, inplace=True)
    def forward(self, x):
        feat = self.conv_first(x)
        body = feat
        for blk in self.body:
            body = blk(body)
        feat = feat + self.conv_body(body)
        feat = self.lrelu(self.conv_up1(nn.functional.interpolate(feat, scale_factor=2, mode='nearest')))
        feat = self.lrelu(self.conv_up2(nn.functional.interpolate(feat, scale_factor=2, mode='nearest')))
        return self.conv_last(self.lrelu(self.conv_hr(feat)))

def load_model(path):
    m = RRDBNet()
    sd = torch.load(path, map_location='cpu', weights_only=True)
    sd = sd.get('params_ema', sd.get('params', sd))
    m.load_state_dict(sd, strict=True)   # 键名与官方 ckpt 一致：body.N.rdbK.convM
    return m.eval()

def main():
    src, dst = sys.argv[1], sys.argv[2]
    start = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    os.makedirs(dst, exist_ok=True)
    dev = torch.device('mps' if torch.backends.mps.is_available() else 'cpu')
    model = load_model(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'models/RealESRGAN_x4plus.pth')).to(dev)
    if dev.type == 'mps':
        model = model.half()
    files = sorted(f for f in os.listdir(src) if f.endswith('.png'))
    files = [f for f in files if int(f[1:5]) >= start]
    print(f'device={dev.type} frames={len(files)}', flush=True)
    with torch.no_grad():
        for i, f in enumerate(files):
            img = np.array(Image.open(os.path.join(src, f)).convert('RGB'), dtype=np.float32) / 255.
            t = torch.from_numpy(img.transpose(2, 0, 1)).unsqueeze(0).to(dev)
            if dev.type == 'mps':
                t = t.half()
            out = model(t).clamp(0, 1).float().cpu().numpy()[0].transpose(1, 2, 0)
            Image.fromarray((out * 255).round().astype(np.uint8)).save(os.path.join(dst, f))
            if (i + 1) % 20 == 0:
                print(f'{i+1}/{len(files)}', flush=True)
    print('DONE', flush=True)

if __name__ == '__main__':
    main()

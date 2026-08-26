# 视频分层分析协议（video-to-superprompt 本土化）

用户拿视频当参考（X 分享 / 录屏 / B站链接）时，不凭印象总结——抽帧、分层、落成可复刻的参数。输出要么是设计令牌（进参考卡），要么是 superprompt（进 spec）。

## 1 · 拿到源文件

- 本地路径直接用；X/B站/网页视频：`~/.agent-reach-venv/bin/yt-dlp --cookies-from-browser chrome -o /tmp/ref.mp4 "URL"`（B站 412 风控走 cookies；sph 页桌面端不可播时绕道官网源）
- 拿不到源文件就问用户要，不编造视频内容

## 2 · 抽帧（不逐秒均匀抽，按叙事节拍抽）

```bash
ffprobe -v error -show_entries format=duration,size:stream=width,height,r_frame_rate -of json /tmp/ref.mp4
mkdir -p /tmp/ref-frames && ffmpeg -y -i /tmp/ref.mp4 -vf fps=1 /tmp/ref-frames/f-%03d.jpg
```

长视频/滚动重的再加：开头、中段、结尾、每个转场瞬间各补一帧。帧必须肉眼过一遍，不盲信分析。

## 3 · 六层分析（每层落成参数，禁写「好看」「流畅」）

| 层 | 看什么 | 落成什么 |
|---|---|---|
| 故事 | 目的、情绪弧线、段落顺序、转场节点 | 段落表 + 节拍时间点 |
| 布局 | 栅格、sticky 区、卡片、遮罩、页边距、导航 | 容器宽度/分栏/padding 数值 |
| 动效 | reveal 时机、缓动、视差、蒙版、pinned 段、滚动 scrub、hover、环境 loop、运镜 | 机制名 + 时长/缓动/触发位置 |
| 视觉 | 字体、色板、表面、边框、阴影、质感、图标、图/视频处理 | 色值/字重字号阶梯/滤镜参数 |
| 技术 | CSS 原生 vs GSAP/Lenis/Three.js/canvas/video currentTime | 实现选型（我们默认零依赖原生） |
| 降级 | reduced-motion、移动端、触摸态、懒加载、静态兜底 | 每条的兜底方案 |

## 4 · 输出二选一

- **进参考卡**：按 `cards/_template.md` 提取设计令牌（学语法——色板/字体/签名交互参数，不学课文——布局文案图像）
- **进 spec**：写 superprompt——资产地图 + 全局语言 + 逐段解剖（每段：目的/布局/视觉/动效/交互/降级）+ 反模式清单。prompt 要长到「不看原视频也能重建交互」

## 5 · 验收

- 引用的资产路径/URL 真实存在或明确标 placeholder
- 抽帧文件非空且有代表性
- 产出里没有不可执行的虚词

> 来源：MengTo/Skills `codex/video-to-superprompt`，2026-08-26 按本流水线裁剪（去掉 Aura/Fable 绑定，接到参考卡/spec 两个出口）。

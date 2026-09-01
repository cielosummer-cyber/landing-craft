# landing-craft · 高级美学落地页流水线

![状态](https://img.shields.io/badge/%E7%8A%B6%E6%80%81-%E7%A7%81%E6%9C%89%E6%89%93%E7%A3%A8%E4%B8%AD-d9a441)
![形态](https://img.shields.io/badge/%E5%BD%A2%E6%80%81-Agent%20Skill-0f6fff)
![验收](https://img.shields.io/badge/%E9%AA%8C%E6%94%B6-Playwright-45a17b)
![开源](https://img.shields.io/badge/%E5%BC%80%E6%BA%90-%E6%9A%82%E6%9C%AA%E5%BC%80%E6%BA%90-9aa4ab)
![参考卡](https://img.shields.io/badge/%E5%8F%82%E8%80%83%E5%8D%A1-13%20%E5%BC%A0-4ea08e)

把「做个好看的落地页」变成一条可重复的流水线。核心认知：**值钱的是把设计意图写成精确参数，工具层全是可替代的免费件**——Agent 负责精确执行，人负责审美决策。零边际成本，全部本地完成。

> 当前状态：私有打磨中，未开源。by 周颖（@cielosummer-cyber）

## 流水线五段

1. **素材阶梯**：CC 免费图库检索 → AI 生图兜底 → 诚实 placeholder，绝不贴白底假图
2. **工程级设计 spec**：布局坐标、色板、字体阶梯、动效编排全部落成数值，写进 `spec.md`
3. **单文件 HTML 构建**：vanilla JS + SVG，零依赖双击直开
4. **Playwright 截图验收**：`scripts/shoot.mjs` 出首屏/中段/全页三图 + console 报错报告；`?shot=1` 置完成态保证确定性
5. **沉淀参考卡**：验证过的美学方向冻结为设计令牌卡，下翻倍

## 目录结构

```
SKILL.md               入口：触发条件 + 流水线规程
references/
  quality-gates.md     质量门（反 slop 清单 / 品味锚点 / 工程硬指标）
  video-analysis.md    参考为视频时的抽帧分层协议
  spec-template.md     设计 spec 模板
  cards/               参考卡：一张卡 = 一个被验证的美学方向（色板/字体/签名交互/禁忌）
    _template.md       新卡提取协议（含最小 demo + PROMPT 硬规则）
    {方向名}.md + {方向名}/demo/ + PROMPT.md
scripts/
  shoot.mjs            截图验收（Google Fonts 4s 预检：健康直连，弱网 abort 走 fallback）
  gen_image.sh / ark_image.sh / ark_video.sh   生图生视频兜底
  fetch_images.py / upscale_frames.py          图库检索 / 视频帧超分
assets/snippets/       可复用动效片段（preloader / scroll-expand / clip-reveal 等）
```

## 参考卡（13 张，全部带最小 demo + 复刻提示词）

`crimson-data-atlas` 绛红数据图谱 · `teal-solar-rings` 黛青节令环谱（同心环点读交互）· `hall-touch-wall` 展厅触控巨幕（待机自演+触摸直达）· `hairline-archive-portal` · `digital-heritage-immersive` · `new-chinese-editorial` · `slow-magazine-editorial` · `dark-tech-saas` · `dark-gold-luxury` · `deep-space-atlas` · `experimental-studio` · `archive-dossier` · `retro-dtc-consumer`

卡只记可执行令牌与禁忌——禁忌栏写不出来说明这个方向还没看懂。

## 安装与用法

作为 agent skill 使用：把本目录软链接（推荐，保持单一真相源）或复制到 agent 的 skills 目录：

```bash
ln -s "$PWD" ~/.agents/skills/landing-craft   # 或 ~/.codex/skills/ 等
```

之后对 agent 说「用 landing-craft 做个 XX 落地页」即可触发。

### shoot.mjs 验收

```bash
node scripts/shoot.mjs /abs/path/index.html [输出目录] [视口WxH，默认1440x900]
```

- 必须传 **绝对路径**（相对路径会拼出无效 file:// URL，截出全白图）
- Playwright 从 npx 缓存动态定位，无需全局安装；首次先跑 `npx -y playwright --version`
- 定高舞台卡按卡面实测尺寸传视口，如 `1728x860`

## 依赖

node（≥18，shoot.mjs 用到全局 fetch）· ffmpeg（视频抽帧）· Playwright（npx 缓存）· Google Fonts（弱网自动降级 fallback 字体）

## 红线

- 学语法不抄课文：参考页/参考视频只提取语法（布局机制、动效编排、色板角色），文案与内容模块必须新写
- 新方向沉淀成卡时必须配最小 demo 与 PROMPT，禁忌栏必填

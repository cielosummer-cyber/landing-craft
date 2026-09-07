# 落地工坊 Landing Atelier · 高级美学落地页工作流

![形态](https://img.shields.io/badge/%E5%BD%A2%E6%80%81-Agent%20Skill-0f6fff)
![验收](https://img.shields.io/badge/%E9%AA%8C%E6%94%B6-Playwright-45a17b)
![参考卡](https://img.shields.io/badge/%E5%8F%82%E8%80%83%E5%8D%A1-13%20%E5%BC%A0-4ea08e)
![License](https://img.shields.io/badge/License-MIT-d9a441)
![展示站](https://img.shields.io/badge/%E5%B1%95%E7%A4%BA%E7%AB%99-GitHub%20Pages-FF6363)

把「做个好看的落地页」变成一条可重复的流水线。核心认知：**值钱的是把设计意图写成精确参数，工具层全是可替代的免费件**——Agent 负责精确执行，人负责审美决策。零边际成本，全部本地完成。

**展示站（13 张参考卡的 demo 画廊）：https://cielosummer-cyber.github.io/landing-atelier/**

## 流水线五段

1. **素材阶梯**：CC 免费图库检索 → AI 生图兜底 → 诚实 placeholder，绝不贴白底假图
2. **工程级设计 spec**：布局坐标、色板、字体阶梯、动效编排全部落成数值，写进 `spec.md`
3. **单文件 HTML 构建**：vanilla JS + SVG，零依赖双击直开
4. **Playwright 截图验收**：`scripts/shoot.mjs` 出首屏/中段/全页三图 + console 报错报告；`?shot=1` 置完成态保证确定性
5. **沉淀参考卡**：验证过的美学方向冻结为设计令牌卡，下单翻倍

## 安装与用法

作为 agent skill 使用：把本目录软链接（推荐，保持单一真相源）或复制到 agent 的 skills 目录：

```bash
ln -s "$PWD" ~/.agents/skills/landing-atelier   # 或 ~/.codex/skills/ 等
```

之后对 agent 说「用 landing-atelier 做个 XX 落地页」即可触发。

### 脚本依赖与降级

素材阶梯按顺序下、缺哪级跳哪级，不报错：

- `scripts/fetch_images.py`：零依赖（Wikimedia / Openverse 检索）
- `scripts/ark_image.sh` / `ark_video.sh`：需自备火山引擎 Ark key（环境变量 `ARK_SEEDREAM_API_KEY`，或 `~/.config/ark/agent-plan-key` 文件）；没有就跳过
- `scripts/gen_image.sh`：备用通道，需本机 codex CLI 已登录 ChatGPT；没有就跳过
- `scripts/shoot.mjs`：截图验收。必须传**绝对路径**；Playwright 从 npx 缓存动态定位，首次先跑 `npx -y playwright --version`

## 参考卡（13 张，全部带最小 demo + 复刻提示词）

`crimson-data-atlas` 绛红数据图谱 · `teal-solar-rings` 黛青节令环谱 · `hall-touch-wall` 展厅触控巨幕 · `hairline-archive-portal` 细笔档案门户 · `digital-heritage-immersive` 数字非遗·暗夜流光 · `new-chinese-editorial` 新中式编辑风 · `slow-magazine-editorial` 慢杂志 · `dark-tech-saas` 暗夜科技 · `dark-gold-luxury` 暗金奢华 · `deep-space-atlas` 深空星图 · `experimental-studio` 实验工作室 · `archive-dossier` 卷宗档案 · `retro-dtc-consumer` 复古消费 DTC

卡只记可执行令牌与禁忌——禁忌栏写不出来说明这个方向还没看懂。逐卡详情与在线 demo 见展示站。

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
docs/                  展示站源码（GitHub Pages，本流水线自产）
```

## 依赖

node（≥18，shoot.mjs 用到全局 fetch）· ffmpeg（视频抽帧）· Playwright（npx 缓存）· Google Fonts（弱网自动降级 fallback 字体）

## 红线

- 学语法不抄课文：参考页/参考视频只提取语法（布局机制、动效编排、色板角色），文案与内容模块必须新写
- 新方向沉淀成卡时必须配最小 demo 与 PROMPT，禁忌栏必填
- 参考卡提取自公开站点的设计语法（色板/排版/交互机制），不含亦不得复制其内容资产（图像、文案、商标）

## License

MIT · by zhou ying（@cielosummer-cyber）

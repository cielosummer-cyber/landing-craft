# 落地工坊（Landing Atelier）官方展示站 — Landing Page · 工程级设计规格

## 品牌与气质
- 品牌：landing-atelier（真实开源项目，MIT，作者 周颖 @cielosummer-cyber）— 高级美学落地页固定流水线 agent skill
- 气质关键词：近黑、精确、开发者工具、氛围光、速度感（方向卡 `dark-tech-saas`，本站即该卡的 dogfood 证据）
- 受众距离：1m 笔记本；视觉温度：安静、精确
- 单 accent 色：`#FF6363`（Raycast 红，贯穿全场，不发明第二个）
- 签名交互：hero 边缘氛围光跟手——两层 radial-gradient 光斑随鼠标缓慢偏移，rAF lerp 平滑

## 内容结构（5 段）
1. **Hero**：整段极致居中。mono eyebrow → 64px 级巨标题「landing-atelier」→ 中文定位一句 → 安装命令代码块（ln -s 软链）→ GitHub / Pages 两个文字链。签名交互两层氛围光在 hero 边缘跟手
2. **流水线五段**：20px Label 题注「流水线」+ 五步（0 定方向 / 1 素材阶梯 / 2 工程级 spec / 3 单文件 HTML / 4 截图验收），每步一句可执行要点，参数即文案；分隔用 hairline 不用卡片
3. **方向卡画廊（页面主体）**：20px Label 题注「方向卡 · 13」+ 3 列 grid；每卡 = demo 截图（10px 圆角 + 0.1 alpha 细白边 + 深投影悬浮）+ 方向名 + 气质关键词 + 签名交互一行 + 禁忌一句
4. **质量门与红线**：两条红线（学语法不抄课文 / 参考卡只提取设计语法不含内容资产）+ 质量门硬指标一行 mono 参数
5. **Footer**：by 周颖（@cielosummer-cyber）· MIT · GitHub 仓库链接 + mono 参数行（lerp / 光斑 opacity / 半径）

## Assets（本地路径，use verbatim, do NOT hotlink）
全部位于 `assets/cards/`，为各方向卡 demo 首屏实测截图（1440×900，hall-touch-wall 为 1920×1080），JPEG 压缩至 ≤300KB：
- `CARD_ARCHIVE` = `assets/cards/archive-dossier.jpg`（卷宗档案 demo 首屏，241KB）
- `CARD_CRIMSON` = `assets/cards/crimson-data-atlas.jpg`（绛红数据图谱 demo 首屏，75KB）
- `CARD_DARKGOLD` = `assets/cards/dark-gold-luxury.jpg`（暗金奢华卡面令牌示意页截图——该卡无 demo，严格用卡内色板/字体/参数写的纯 HTML 示意页，149KB）
- `CARD_DARKTECH` = `assets/cards/dark-tech-saas.jpg`（暗夜科技 demo 首屏，82KB）
- `CARD_DEEPSPACE` = `assets/cards/deep-space-atlas.jpg`（深空星图 demo 首屏，82KB）
- `CARD_HERITAGE` = `assets/cards/digital-heritage-immersive.jpg`（数字非遗 demo 首屏，106KB）
- `CARD_EXPERIMENTAL` = `assets/cards/experimental-studio.jpg`（实验工作室 demo 首屏，104KB）
- `CARD_HAIRLINE` = `assets/cards/hairline-archive-portal.jpg`（细笔档案门户 demo 首屏，61KB）
- `CARD_HALLWALL` = `assets/cards/hall-touch-wall.jpg`（展厅触控巨幕 demo 首屏 1920×1080，225KB）
- `CARD_NEWCN` = `assets/cards/new-chinese-editorial.jpg`（新中式编辑风 demo 首屏，64KB）
- `CARD_RETRO` = `assets/cards/retro-dtc-consumer.jpg`（复古消费 DTC demo 首屏，118KB）
- `CARD_SLOWMAG` = `assets/cards/slow-magazine-editorial.jpg`（慢杂志 demo 首屏，82KB）
- `CARD_TEAL` = `assets/cards/teal-solar-rings.jpg`（黛青节令环谱 demo 首屏，98KB）
许可：全部为 skill 仓库内自产截图，无外部素材，随仓库 MIT。

## Constants
- 签名交互：`GLOW_LERP = 0.06`（卡允许 0.05–0.08）；光斑 A `radial-gradient(circle 50vw, ACCENT 0%, transparent 60%)` opacity `0.12`；光斑 B `radial-gradient(circle 44vw, #FFFFFF 0%, transparent 55%)` opacity `0.07`；两层合计视觉峰值 ≤ 0.14；偏移量 = 鼠标相对视口中心位移 × 0.06（A 层）/ × -0.04（B 层反向）；无鼠标时静止在默认位
- `EASE_OUT_EXPO = cubic-bezier(0.16, 1, 0.3, 1)`（入场动画统一曲线）
- 色板：`BG #07080A`、`INK #FFFFFF`、`ACCENT #FF6363`、`MUTED rgba(255,255,255,0.6)`、`DIM rgba(255,255,255,0.38)`、`HAIRLINE rgba(255,255,255,0.10)`、按钮反转 `#E6E6E6` 底 + `#2F3031` 字、8px 圆角
- 字体：display = Inter 600（fallback system-ui）64px 级 clamp(40px, 6vw, 64px) line-height 1.1；body = Inter 400 16px line-height 1.7；label = Inter 500 20px letter-spacing 0.2px；mono = ui-monospace, "SF Mono", Menlo, monospace 12–14px（代码块/参数行/eyebrow，系统字体零外部加载）
- 排版：容器 1180px 居中；section padding 150px 0；画廊 grid 3 列 gap 28px（<1080px 2 列，<720px 1 列）
- 画廊截图：`border-radius 10px`、`border 1px solid HAIRLINE`、`box-shadow 0 24px 60px rgba(0,0,0,0.5)`、hover 时 translateY(-4px) 300ms、`img{width:100%;height:auto;display:block}`
- 导航：悬浮玻璃胶囊 `backdrop-filter blur(16px)` + 1px HAIRLINE 边 + 999px 圆角
- 代码块容器：显式 `white-space: pre-wrap`（卡的验证修正 1）、底 `rgba(255,255,255,0.04)`、1px HAIRLINE 边、10px 圆角、mono 14px
- 中文引号一律「」；`text-wrap: balance` 用于 display 标题

## Behavior / Animations
1. **氛围光跟手（签名交互）** — 监听 `mousemove` 记 raw 目标；rAF 每帧 `cur += (target - cur) * 0.06`；两层 `position:fixed` 光斑 `translate3d` 跟随（A 顺向 ×0.06、B 反向 ×-0.04）；`pointer-events:none`；`prefers-reduced-motion` 与 `?shot=1` 时静止于默认位（视口 18% / 82% 水平位）不挂监听
2. **Page load 编排（唯一一场入场）** — hero eyebrow → 标题 → 定位句 → 代码块 → 链接行，fade-up 16px + opacity，各 600ms EASE_OUT_EXPO，stagger 80ms；之后所有 section 走 IntersectionObserver threshold 0.2，fade-up 16px 600ms 一次，不重复
3. **画廊卡 hover** — 截图 translateY(-4px) 300ms，阴影加深到 `0 32px 80px rgba(0,0,0,0.6)`；无其他微交互
4. **`?shot=1` 兼容** — 所有 reveal 元素 JS 立即置完成态（不挂 observer、不播入场），氛围光静止默认位；截图确定性

## 验收标准
- 打开 3 秒内看到：近黑底 + 居中巨标题 + 安装命令代码块，边缘一层克制的红色氛围光
- 控制台 0 报错；file:// 双击直开；Google Fonts（仅 Inter 一族）失败时 system-ui fallback 依然成立
- 支持 `?shot=1`：所有 reveal/入场动画立即置完成态
- 禁忌对照（dark-tech-saas 卡）：无均匀深蓝底、无紫色霓虹 glow、无第二个高饱和 accent、无渐变文字标题、无衬线字体

## 灵感来源与差异（originality audit 预留）
- 拿走：dark-tech-saas 卡的令牌级语法——`#07080A` 近黑底、单 accent、Inter 字阶、居中 hero + 大留白节奏、氛围光跟手机制与参数、截图图像处理规（圆角/细白边/深投影）
- 没拿：不复制 raycast.com 的布局结构、文案、图像与段落顺序；内容（流水线五段、13 卡画廊、质量门红线）全部为本项目自有

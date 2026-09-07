# 暗金奢华 参考卡

- 来源：内部验证单（AURELE 腕表，已验收）
- 气质关键词：暗场、金色机械、博物馆打光、编辑排版、克制
- 适用：腕表/珠宝/烈酒/高端个护等「物件崇拜」型品牌；深色产品图现成的主题
- 不适用：食品生鲜、亲子、轻量 SaaS 工具——暗场会把亲和力压没

## 色板
- BG: `#0A0908` — 近黑暖底（不是纯黑，带一点棕）
- INK: `#F2EDE4` — 暖白主文字
- ACCENT: `#C9A24B` — 哑光金，唯一强调色（高光、CTA hover、关键词斜体）
- MUTED: `rgba(242,237,228,0.55)`
- HAIRLINE: `rgba(201,162,75,0.25)` — marquee 上下分隔线

## 字体配对
- Display: Playfair Display 800（fallback Didot/Bodoni MT/Georgia）— 巨型 hero 标题，clamp(56px, 11vw, 164px)
- Label/Mono: JetBrains Mono 300/400 — eyebrow、参数、按钮，letter-spacing 0.15-0.5em
- 中文: 系统宋体 fallback

## 签名交互
- 机制：spotlight reveal——同一 hero 图叠两层，底层 `brightness(0.35)`，顶层全亮 + `mask-image: radial-gradient(circle 280px at var(--mx) var(--my), ...)`；mousemove 存 raw，rAF 每帧 lerp 平滑；无鼠标时 sin/cos 缓慢漂移
- 参数：`SPOTLIGHT_R=280`、`LERP=0.08`、`GRID_CELL=48`、`GRID_OPACITY=0.05`

## 排版节奏
- 容器 1180px 居中；section padding 140-160px；玻璃拟态胶囊 nav（blur 18px + 金边 0.18 alpha）；分隔用留白不用卡片

## 图像处理
- hero 图默认压暗 brightness(0.35) 等 spotlight 点亮；section 图 hover scale 1.04；全部 2px 微圆角 + 内描边金线

## 禁忌
- 禁亮底卡片、禁第二个 accent 色（金只能有一个）、禁 emoji 图标、禁粗边框——暗场的贵气靠「细」

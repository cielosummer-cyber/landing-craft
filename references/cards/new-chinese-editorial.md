# 新中式编辑风 参考卡

- 来源：`~/k3-replica-shanwu/`（山雾茶，已验收）
- 气质关键词：宣纸底、墨绿、大量留白、竖排细节、安静
- 适用：茶/香/文房/手作/东方生活方式品牌；中文为主的主题
- 不适用：科技/AI/运动品牌——宣纸底会拖垮速度感

## 色板
- BG: `#F4F0E6` — 暖米宣纸底
- INK: `#232B20` — 松烟墨（带绿调的黑，不是纯黑）
- ACCENT: `#56714B` — 苔绿，唯一强调色（编号、关键词、eyebrow）
- MUTED: `rgba(35,43,32,0.6)`
- HAIRLINE: `rgba(35,43,32,0.18)` — 参数行/nav/section 分隔全靠它

## 字体配对
- Display: Noto Serif SC 900（fallback Songti SC/STSong）— 巨型中文 hero，clamp(120px, 22vw, 300px)
- 西文点缀: Cormorant Garamond italic — 品牌罗马字、编号
- Label/Mono: JetBrains Mono 300 — 参数值（中西混排的呼吸感来源）

## 签名交互
- 机制：hero 图 scroll-expand——初始 38vw 居中小图，rAF 监听 scroll，`progress = clamp(scrollY/0.9vh)`，easeOutCubic 后映射宽度 38vw→100vw、圆角 4px→0、图内 scale 1.15→1
- 参数：`W_MIN=38vw`、`RANGE=90vh`、`eased = 1-(1-p)^3`

## 排版节奏
- 容器 1180px；section padding 150px；编号段标「一 · 序 / 二 · 茶山」+ 64px hairline；参数用 hairline 行式表（hover 苔绿 6% 底）；竖排装饰 `writing-mode: vertical-rl`

## 图像处理
- 原图直出不加滤镜（浅底方向图要干净）；hover scale 1.04；2px 微圆角

## 禁忌
- 禁卡片容器（分隔只用 hairline 和留白）、禁粗黑边框、禁饱和度高的绿（苔绿必须灰调）、禁英文大标题喧宾夺主——中文是主角

# 复刻提示词 · new-chinese-editorial 最小 demo

> 用法：把下面这段贴给 agent，可复刻出本 demo 的语法骨架（令牌 + 签名交互），再按单子主题替换内容。

复刻 new-chinese-editorial 参考卡最小 demo：单文件零依赖 HTML，暖米宣纸底 #F4F0E6、松烟墨 #232B20（带绿调的黑，不用纯黑）、唯一强调色苔绿 #56714B（编号/关键词/eyebrow，必须灰调）、MUTED rgba(35,43,32,0.6)、分隔全靠 1px hairline rgba(35,43,32,0.18)。宋体 900 巨型中文 hero clamp(120px,22vw,300px)，西文只许 Cormorant Garamond italic 小字点缀（品牌罗马字/编号），参数值 JetBrains Mono 300，容器 1180px、section padding 150px，编号段标「一 · 色板」式 + 64px hairline，竖排装饰 writing-mode: vertical-rl。签名交互 hero 图 scroll-expand：200vh 滚动区间 + sticky 100vh 舞台，图初始 38vw 居中（圆角 4px、图内 scale 1.15），rAF 监听 scroll，progress = clamp(scrollY/0.9vh)，easeOutCubic eased = 1-(1-p)^3 后映射宽度 38vw→100vw、圆角 4px→0、图内 scale 1.15→1，左下 mono 参数行实时回显 Y/P/EASED/W/R/SCALE；图用纯 CSS 渐变/clip-path 画灰调茶山占位，原图直出不加滤镜，图像示例 hover scale 1.04、2px 微圆角，参数做成 hairline 行式表（hover 苔绿 6% 底）。禁忌：卡片容器（分隔只用 hairline 和留白）、粗黑边框、饱和度高的绿、英文大标题喧宾夺主——中文是主角。

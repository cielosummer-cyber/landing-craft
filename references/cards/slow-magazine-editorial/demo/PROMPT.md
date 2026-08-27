# 复刻提示词 · slow-magazine-editorial 最小 demo

> 用法：把下面这段贴给 agent，可复刻出本 demo 的语法骨架（令牌 + 签名交互），再按单子主题替换内容。

复刻 slow-magazine-editorial 参考卡最小 demo：单文件零依赖 HTML，纯白底 #FFFFFF、纯黑 INK #000000（标题与正文同色）、MUTED rgba(0,0,0,0.55)，无彩色 accent——这个方向的 accent 是留白本身，链接下划线与小规则线（hairline）一律纯黑 1px。字体全场同族衬线：Display 英文 400 50px 全大写、letter-spacing -0.5px（系统 fallback 栈 "EB Garamond","Cormorant Garamond",Georgia,serif），中文 Noto Serif SC 400–600（fallback Songti SC），正文同族衬线 400、行高 1.9，绝不混无衬线正文；mono 只许出现在参数行。排版节奏：内容栏极窄 640–720px 居中、单栏；导航极简到只剩 logo + 汉堡；标题全大写、两行以内；图片纵向肖像 4:5，无圆角无投影无边框直出；一次只给一张图，段间距拉到视口级。签名交互——图片揭示式入场：IntersectionObserver 滚动到位加态（只进不退），外层 clip-path: inset(8%) → inset(0)、内层 scale 1.04 → 1，过渡 1s easeOutExpo（cubic-bezier(0.16,1,0.3,1)）；figcaption 文字同步 fade-up（0.8s、位移 16px、无 delay，全站节奏 0.8–1.2s）；图片 hover 仅 opacity 0.92、不位移；交互参数写成 JS 常量置顶并注入 CSS 变量，fixed mono 参数行实时回显滚动位置、揭示计数与全部冻结参数。禁忌做成 ✕ 行展示区（纯黑 hairline 分隔，不用卡片）：禁任何彩色 accent、禁卡片和投影、禁圆角、禁动画花哨（位移超过 24px 就破了「慢」）、禁网格拼贴。图形占位用纯 CSS 低饱和渐变（自然光、大量负空间），不放真实文案与图像。

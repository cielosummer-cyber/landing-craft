# 复刻提示词 · dark-tech-saas 最小 demo

> 用法：把下面这段贴给 agent，可复刻出本 demo 的语法骨架（令牌 + 两个签名交互），再按单子主题替换内容。

复刻 dark-tech-saas 参考卡最小 demo：单文件零依赖 HTML，近黑微蓝底 #07080A（不是 #000 不是深蓝 #0D1117）、纯白主标题、唯一 accent #FF6363（换品牌只换这一个色）、次级文字 rgba(255,255,255,.6)；按钮反转浅灰 #E6E6E6 底 + 深字 #2F3031 + 8px 圆角。导航为悬浮玻璃胶囊：rgba(255,255,255,.04) 底 + backdrop-filter blur(14px) + 0.1 alpha 白边 + 999px 圆角。hero 极致居中：Display Inter 600 / 64px / line-height 1.1 两行以内，Label Inter 500 / 20px，Body Inter 400 / 16px。签名交互两个：①氛围光跟手——两层 radial-gradient 光斑（accent 同色系、opacity ≤.14、半径 40–60vw）置于 hero 边缘，指针位置映射为小幅度 translate（前层顺向 70px 级、后层反向视差），rAF + lerp 0.06 缓慢追随，mono 参数行实时回显；②终端键入动画——CSS 终端窗（#101214、10px 圆角、0.1 alpha 白边、0 40px 90px 深投影悬浮，三个窗点用中性灰不用彩色），JS 循环逐字键入命令（34ms/字）+ 输出行延迟浮现 + 方块光标 1s 闪烁。section 靠大留白（130px）分隔，字阶用全格线 specimen 行展示。禁忌：均匀深蓝底 + 紫色霓虹 glow、第二个高饱和 accent、渐变文字标题、衬线字体。

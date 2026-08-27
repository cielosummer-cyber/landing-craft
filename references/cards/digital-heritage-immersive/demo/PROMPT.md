# 复刻提示词 · digital-heritage-immersive 最小 demo

> 用法：把下面这段贴给 agent，可复刻出本 demo 的语法骨架（令牌 + 两个签名交互），再按单子主题替换内容。

复刻 digital-heritage-immersive 参考卡最小 demo：单文件零依赖 HTML，近黑底 #0E0F0E、暖白 #F2EFE9、唯一强调色朱砂 #C8391F（编号/当前态/展签 hover 6% 底，金色只许出现在文物材质里）；门类矿物色族黛蓝 #3A4457 / 松绿 #3E5648 / 赭石 #6B4A3F / 米白 #D8D2B8 / 墨黑 #22241F 仅作门类标识，降饱和使用。宋体 900 巨标题 clamp(72px,12vw,180px)，8 字标题 4+4 主动断行（上行暖白、下行朱砂，各 white-space:nowrap），mono 小字 uppercase + tracking .2em，黑底正文用无衬线 1.9 行高，内容块偏左反对称。演示两个签名交互：①文物聚光——纯 CSS 渐变铜镜双层渲染，底层 filter brightness(.35)，顶层 mask-image: radial-gradient(circle 320px at x y, #000 0%, #000 40%, transparent 100%) 跟随指针，rAF + LERP 0.08 平滑，静止 2.2s 切利萨如轨迹自游走待机，mono 参数行实时回显；②竖栏手风琴——5 根 flex 竖栏（矿物色底 + ≤8% 透明度斜纹暗纹），栏题宋体 700 竖排 writing-mode: vertical-rl，点击展开 flex-grow 1→6（约 60% 宽），600ms cubic-bezier(.16,1,.3,1)，未展开栏底图 brightness(.45)，展开延迟显现 hairline 展签参数行（hover 朱砂 6% 底）。禁忌：纹样铺满、符号堆砌、居中奖状构图、多色抢戏、黑底暗金小字长文。

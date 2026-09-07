# 实验工作室 参考卡（✅ 已自建验证）

- 来源：locomotive.ca（2026-08-20 提取，Awwwards 级agency）；验证单：内部项目（2026-08-20）
- 气质关键词：纯黑、白字、grotesque、解码动画、作品即内容
- 适用：设计工作室、创意 agency、个人作品集、数字艺术项目
- 不适用：任何需要「快速讲清产品」的页面——这方向把态度放在信息前面

## 色板
- BG: `#000000` 纯黑（实测）
- INK: `#FFFFFF` 纯白（实测）
- ACCENT: 无彩色 accent——强调靠字重、尺寸、下划线动画；如必须，用品牌单色（Locomotive 用橙砖红 logo 点，面积 <1%）
- MUTED: `rgba(255,255,255,0.5)`

## 字体配对
- Display: HelveticaNowDisplay / LocomotiveNew 400 79px 级（免费替代：**Archivo / Space Grotesk**，400-500，字距 normal）
- 特色：grotesque 无衬线全场通用，标题正文同族，靠尺寸阶梯区分

## 签名交互
- 最小演示：`demo/index.html`（零依赖双击直开，签名交互 + 排版令牌全参数；复刻提示词 `demo/PROMPT.md`）
- 机制：text scramble 解码——标题逐行从随机字符（`!<>-_\\/[]{}—=+*^?#`）解码到目标文案，每行依次 settle；列表项 hover 时同样解码刷新
- 参数：每字符 2-3 帧随机期，帧率 ~30ms；行间 stagger 150ms；字符池含目标文案自身字符

## 排版节奏
- 巨型左对齐或居中文本行堆叠成「目录」；作品条目整行可点，hover 出右侧缩略图跟随鼠标；无传统卡片网格

## 图像处理
- 作品图只在 hover/进入时出现（跟随光标的浮动预览图）；图不常驻布局

## 禁忌
- 禁任何装饰元素（图标/分隔线/按钮样式全是多余的）、禁圆角、禁彩色渐变、禁「 section 标题 + 描述 + 网格」的常规结构——这个方向的结构本身就是表达

## 验证修正（2026-08-20，内部项目首用回填）
- scramble 实现实录（按卡参数一次跑通，无参数修正）：字符池 `!<>-_\\/[]{}—=+*^?#`；帧率 30ms（rAF 内用 `now - last >= 30` 节流，不能裸跑 rAF——headless 下 rAF 不锁 60fps）；每字符 settle 帧 = `index + rand(2,3)`，天然形成从左到右依次解码；替换字符从「字符池 + 目标文案字符」联合采样（落实「字符池含目标文案自身字符」）；行间 stagger 150ms（hero 三行 0/150/300ms setTimeout 启动）
- 修正 1：hero 巨型标题行不要加 `white-space: nowrap`——14 字符 × clamp 最小 64px 在 375px 移动端必然溢出裁切；去掉后允许折行，桌面仍单行
- 修正 2：卡未写的两个配套配方（验证中沉淀）：①作品列表 hover 时 sibling 条目名 dim 到 `opacity 0.25`（200ms），当前条目保持 1——这是「目录」气质的半壁江山；②浮动预览图跟随用 lerp 0.12 缓动 + `translate(鼠标x + 24px, 鼠标y - 图高/2)`，图 340×227（3:2），出现/消失 200ms EASE_OUT_EXPO，`pointer-events: none`
- 修正 3：验收注意——headless 验证 scramble 时 `page.goto` 默认等 load 事件，Google Fonts 拉取期间动画已放完，采样会误判「动画没跑」；要用 `waitUntil: 'domcontentloaded'` 立即连采（验证脚本留在该单 verify-dynamic.mjs）
- `?shot=1` 约定：scramble 直接写完成态文案；hover 预览图在 shot 模式保持隐藏（hover 态不可截图，属正常，不算卡隐藏态）

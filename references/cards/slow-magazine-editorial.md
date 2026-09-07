# 慢杂志 editorial 参考卡（✅ 已自建验证）

- 来源：kinfolk.com（2026-08-20 提取）；验证单：内部项目（远岸 YUANAN 独立文学杂志，2026-08-20，0 pageerror 过质量门）
- 气质关键词：纯白、衬线、大留白、美术馆、慢
- 适用：杂志/出版、文化机构、展览、画廊、深度内容品牌；英文为主的主题
- 不适用：电商转化页、工具产品——这方向故意不做「效率」

## 色板
- BG: `#FFFFFF` 纯白（实测）
- INK: `#000000` 纯黑标题与正文（实测）
- ACCENT: 无——这个方向的 accent 是「留白本身」；链接下划线/小规则线用纯黑
- MUTED: `rgba(0,0,0,0.55)`

## 字体配对
- Display: Kinfolk-Serif-Deck 400 50px 大写，letter-spacing -0.5px（免费替代：**EB Garamond / Cormorant Garamond**，大写 + 轻微负字距）
- 中文搭配: Noto Serif SC 400-600（fallback Songti SC）
- Body: 同族衬线 400，绝不混无衬线正文

## 签名交互
- 最小演示：`demo/index.html`（零依赖双击直开，签名交互 + 排版令牌全参数；复刻提示词 `demo/PROMPT.md`）
- 机制：图片揭示式入场——滚动到位时图片从 clip-path inset(8%) + scale 1.04 收拢到 inset(0) + scale 1，文字同步 fade-up；全站节奏慢（0.8-1.2s）
- 参数：`clip-path` 过渡 1s easeOutExpo；图片 hover 仅 opacity 0.92，不位移

## 排版节奏
- 内容宽度极窄（640-720px 居中）；单栏为主，图纵向肖像比例（4:5）；标题全大写、两行以内；导航极简到只剩 logo + 汉堡

## 图像处理
- 摄影必须美术馆级：低饱和、自然光、大量负空间；图无圆角无投影无边框，直出

## 禁忌
- 禁任何彩色 accent、禁卡片和投影、禁圆角、禁动画花哨（位移超过 24px 就破了「慢」）、禁网格拼贴——一次只给一张图

## 验证修正（2026-08-20 远岸单回填）
- 卡内令牌全部直接可用，色板/字体配对/签名交互参数一次跑通，无修正
- 素材实战经验：「窗边读书」类 Wikimedia 命中率高（hero 一次到位）；「杂志平铺静物」图库两轮全灭（Wikimedia 全是 vintage 杂志扫描 PDF，Openverse/Flickr 命中纹身手臂、游戏杂志、信息图）——平铺静物直接走 gen_image 生图，提示词写「blank cream-white covers, no text, no logos + 白色亚麻桌布 + 北窗光」，效果反而最贴这个方向
- `fetch_images.py` 两个坑：①文件名会把 thumburl 的 query string（`&utm_campaign=...`）带进来，下载后先批量改名再审核；②同前缀文件按 55 字符截断后互相覆盖（同作者同系列三张图只活下来一张），同名系列要重抓就得改 query
- `gen_image.sh` 的坑：codex exec 即使成功生图也可能整体非 0 退出（codex 进程自身 exit code），`test -s` 之前脚本就被 set -e 带崩——看到「Command failed」先 `ls` 确认文件，多半已经生成好了
- 竖排小字细节签名（writing-mode: vertical-rl）若 absolute 定位，top 对齐会跨 section 的 hairline 悬在两段之间；`bottom: 0` 对齐段落最稳
- Cormorant Garamond 的 oldstyle 数字（0 渲染如小写 o）用在「专题 01」式编号上有性格，可放心用

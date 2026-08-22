# 质量门 · 验收清单

截图出来后逐项过。任何一项不过 = 回去改，不交付。

## 反 slop（出现即打回）

- 紫色渐变背景 / 通用深蓝底 + 霓虹 glow
- emoji 当图标、装饰性 icon 满天飞
- 圆角卡片 + 左侧彩色 border accent 的 2020 年代 SaaS 风
- SVG 手画物品/人脸冒充产品图
- 编造的 stats、假数据填充空白
- 散落的微交互（入场动画只能有一场编排好的 page load，不是到处乱动）

> 完整版反 slop 清单和「为什么」：`~/.agents/skills/huashu-design/references/content-guidelines.md`

## 品味锚点（至少命中每条的一项）

- **字体**：display 有性格（Playfair / Noto Serif SC / Didot 类），不是全场 Inter/系统默认
- **色彩**：一个有温度的底色 + 单 accent 贯穿，用 spec 色板里的色，不临场发明
- **签名交互**：存在且按 spec 参数工作——这是本流程和普通模板页的分水岭
- **细节签名**：有一处「值得截图」的 120% 细节（巨型水印 / 竖排小字 / 字符级升起）
- **排版**：`text-wrap: pretty/balance`、中文用「」引号、hairline 分隔线比卡片容器更克制
- **加载器**：重资产页（大图/视频 hero/3D）的加载等待必须是设计内容——mono 大写小字 + 进度百分比 + 品牌语气文案（Heart Blooms「Warming the render pipeline」/ Your Robots「SYSTEM BOOT」实测），不许白屏或浏览器默认；轻量页不需要加载器，别为加而加
- **参数即文案**：交互说明和技术参数可以做设计元素——mono footer 印操作说明（「DRAG · ORBIT　MOVE · STIR THE WIND」）、真实工程参数作质感文案（「15,000 instanced grass · 950 procedural flowers」），Apogee 站实测

## 视觉密度

- 个人页 / 品牌页 / 作品集类：必须有真实配图（照片或生图），纯文字排版页直接打回——「太简陋，连个配图都没有」实测教训
- 配图多于一张时风格必须统一（同一提示词公共段 / 同一来源图库系列），交付前并排肉眼比对

## 工程硬指标

- `shoot.mjs` 报告 pageerror = 0
- `?shot=1` 全页截图里没有任何 reveal 元素卡在隐藏态
- 图片全部本地路径，无热链、无 404
- 图片 alt 写了中文描述；许可来源记在 spec 的 Assets 段
- 代码块/终端容器显式 `white-space: pre-wrap`（HTML 默认吞换行，SABLE 单实测翻车）
- `img` 必须同时写 `width:100%;height:auto`（或等价约束）——只写 `max-width:100%` 会被拉伸到原始像素高度、整版塌陷（CIELO V5 卷宗单实测翻车）
- 视差/漂浮元素用 JS 覆写 `transform` 会吞掉 CSS 里的 `rotate/scale`——固定形变走 `data-*` 由 JS 合成（野柠单实测翻车）
- fullPage 截图里 fixed/sticky nav 重复出现在中段 = 截图伪影，不是 bug，不打回

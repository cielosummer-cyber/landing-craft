# 卷宗档案 参考卡（✅ 已自建验证）

- 来源：niccolomiranda.com「Paper Portfolio」（Awwwards 纸感作品集，2026-08-20 实地提取）× 中文卷宗/档案本土转译；验证单：`~/landing-cielo/` V3→V4（周颖个人页）
- 验证修正：
  1. V3 纯文字卷宗被判「太简陋」——**这个方向必须配「档案附件」图**：波普版画插图（白边相框 + 微倾 + 胶带贴角）与卷宗骨架绝配；持卷人肖像贴封面右栏（白边照片 + 胶带 +「持卷人」图注）
  2. 整套配图风格锁定公共提示词段（实测五张一次成，描边/网点/四色/纸底完全一致）："Pop-art comic illustration in Roy Lichtenstein style: bold black outlines, Ben-Day halftone dots, flat color blocks. Palette strictly limited to: seal red #C03A2B, warm black #1A1714, mustard gold #C9A869, deep teal #2E5E4E. Background: warm cream archival paper #E7DFCB."
  3. `gen_image.sh` 两个坑（已修进脚本）：目标目录不存在直接失败 → 已加 `mkdir -p`；**批量生图必须串行**——并发会在新目录撞 `git init` 竞态并把 .git 错建进 assets/
  4. gpt-image-2 生成指定年龄/气质的中文男性波普肖像可靠（"39-year-old Chinese man, strategy director" 一次到位）
- 气质关键词：档案纸、浓墨、印泥红、表格线、公文细节、大尺度排印对比
- 适用：个人品牌页（研究型/治理型人格）、出版、文化机构、严肃内容品牌的中文场景
- 不适用：消费促销、SaaS 工具、活泼品牌——公文的克制会压掉亲和力

## 色板
- BG: `#E7DFCB` 档案纸（暖旧，不是白不是米黄——像放了五年的卷宗封面）
- INK: `#1A1714` 浓墨（暖黑，不用纯黑）
- ACCENT: `#C03A2B` 印泥红——**只给印章、涂黑条、编号戳**，不做链接色不做按钮底色
- MUTED: `rgba(26,23,20,0.6)`
- LINE: `rgba(26,23,20,0.55)`（表格线比 hairline 粗，要「印出来」的感觉）

## 字体配对
- Display: Noto Serif SC 900（fallback Songti SC）— 封面反白大标题，字距 0.1em+
- 公文正文: Noto Sans SC 400/500（fallback PingFang SC）— 表格内容、说明文字
- Data/编号: JetBrains Mono 400 — 卷宗编号、数字、日期
- 印章字: Noto Serif SC 900 反白，2×2 四字方章

## 签名交互（两个，一大一小）
- **盖章入场**：红方章从 scale 1.8 / rotate -18° / opacity 0 砸到 scale 1 / rotate -8°，`cubic-bezier(0.2,1.4,0.4,1)` 0.5s，delay 1.2s；章体 `mix-blend-mode: multiply` 让它「印」在纸面/墨带上
- **涂黑条揭示**：`<span class="redact">` 黑条盖字，hover 时黑条 scaleX→0（transform-origin: right，0.4s easeOutExpo）露出文字——「解密」手感。全页最多两处，多了变 gimmick

## 排版节奏
- 页面 = 一份卷宗：masthead（编号/日期/「密级：公开」）→ 墨带反白封面大标题（墨色块 + 反白字，Miranda 式尺度对比）→ 全格线表格（边框全显的公文表格，不是 hairline 行）→ 条款体守则（第一条/第二条…）
- 尺度对比要狠：封面标题 clamp(72px, 14vw, 200px)，正文 14px——公文的小字和大标题的反差就是张力

## 图像处理
- 不用照片；纸纤维质感 = 全页 SVG feTurbulence 噪点层（multiply，opacity ≤0.5）；印章边缘可用轻微 border-radius 不规则化

## 禁忌
- 禁圆角卡片、禁阴影浮起（卷宗是平的，印上去的）、禁红以外的任何彩色、禁渐变、禁「现代 SaaS 圆角按钮」——按钮就是表格单元格或下划线文字
- 红只许出现在章/戳/涂黑条——红色泛滥 = 春联，不是卷宗

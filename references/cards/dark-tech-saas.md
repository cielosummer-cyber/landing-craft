# 暗夜科技 参考卡（✅ 已自建验证）

- 来源：raycast.com（2026-08-20 提取）；验证单：内部项目（SABLE CLI，2026-08-20 验收通过）
- 验证修正：
  1. TOML/代码块容器必须显式 `white-space: pre-wrap`——HTML 默认吞换行，首跑翻车一次
  2. Playwright fullPage 截图里 fixed 胶囊 nav 会重复出现在页面中段——是截图机制伪影，不是 bug，验收时不用管
  3. accent 换成信号橙 `#FF5C29` 同样成立，证实「换品牌只换一个 accent」的卡规有效
- 气质关键词：近黑、精确、开发者工具、氛围光、速度感
- 适用：开发者工具、AI 产品、效率工具、桌面应用
- 不适用：消费品牌、食品、亲子——近黑底 + 单色 UI 没有购买欲

## 色板
- BG: `#07080A` — 近黑微蓝（不是 #000，不是深蓝 #0D1117）
- INK: `#FFFFFF` — 纯白主标题
- ACCENT: `#FF6363` — Raycast 红（换品牌时换成品牌 accent，但只许一个）；边缘氛围光用同色系 radial-gradient，opacity 极低
- MUTED: `rgba(255,255,255,0.6)`
- 按钮反转：浅灰 `#E6E6E6` 底 + 深字 `#2F3031`，8px 圆角

## 字体配对
- Display: Inter 600（fallback system-ui）— 64px 级居中巨标题，line-height 1.1
- Body: Inter 400 16px
- Label: Inter 500 20px 级 section 题注，letter-spacing 0.2px

## 签名交互
- 最小演示：`demo/index.html`（零依赖双击直开，两个签名交互 + 排版令牌全参数；复刻提示词 `demo/PROMPT.md`）
- 机制：hero 边缘氛围光跟随鼠标缓慢偏移（两层 radial-gradient 层，translate 跟手 lerp），或终端/快捷键键入动画
- 参数：lerp 0.05-0.08；光斑 opacity ≤ 0.14；径向半径 40-60vw

## 排版节奏
- 极致居中：hero 整段居中，标题两行以内；导航为悬浮玻璃胶囊（blur + 0.1 alpha 白边）；section 之间靠大留白和截图交替

## 图像处理
- 产品 UI 截图为主角，加 8-12px 圆角 + 细白边（0.1 alpha）+ 深投影悬浮

## 禁忌
- 禁均匀深蓝底 + 紫色霓虹 glow（GitHub-dark 偷懒解，Raycast 的近黑是有色相的 #07080A）
- 禁第二个高饱和 accent；禁渐变文字标题；禁衬线字体

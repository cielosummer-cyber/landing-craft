# 媒体配方（2026-08-22 从 viktoroddy 三条实操视频提取）

视频来源：x.com/viktoroddy（Taste the Sky 饼干站 / Imperial VPN 天使站 / 1 小时构建实录），逐帧分析存档于会话记录。以下配方均已在其成品页面上验证有效。

## hero 视频 loop 提示词公式（图生视频）

流程：生图模型出 hero 主图 → 让 LLM 把图写成图生视频提示词 → 视频模型生成无缝循环 hero。

> ✅ 2026-08-22 已接入：火山方舟 Agent Plan（Large 套餐含视频配额），脚本 `scripts/ark_video.sh`——文生视频直接给提示词，图生视频把 hero 图作为第三个参数（首帧）。生成图走 `scripts/ark_image.sh`（Seedream 5.0）。两个脚本都走 `/api/plan/v3` 套餐内计费。

提示词公式（四要素，缺一不可）：

1. **主体基本静止**："the subject remains mostly still"
2. **微动给生机**：呼吸感部件（翅膀/发丝/布料/烟雾）缓慢漂移，"as if touched by a light breeze"
3. **极慢运镜**："an extremely slow cinematic camera push-in with slight parallax"
4. **循环约束**："minimal, seamless, and loop-friendly — no dramatic gestures or scene changes"

> Seedance 中文提示词同样有效，按同一四要素写：主体基本静止 + 微动部件 + 极慢推镜 + 无缝循环。

## 滚动场景编排的提需求句式（v1 实测）

给 AI 描述滚动叙事时，按「钉住 + 滚动驱动状态迁移」说，不说虚词：

> "Section pinned on screen; scrolling drives the animation from scene one to scene two. Scene one: giant bold headline 'Taste the Sky'. Scene two: headline 'The Difference'. Transition: as you scroll, the first headline's letters scatter and fly off upwards."

对应我们的 spec.md「行为动画」段：每个滚动场景写清 锚定状态 → 滚动区间 → 元素终态，三个要素。

## 组件级参考提取（v2 实测）

看中某个站的局部构件，用组件复制类浏览器工具直接提取该节点的 HTML + computed CSS 作参考（视频中对 olympusdao.finance 实操），再按自己色板重写。**只提取结构与参数，不整段抄代码**——与我们组件源目录的用法一致。

## Prompt-as-artifact（v1/v3 实测）

他把复刻提示词存成项目文件（`RECREATE PROMPT.md`），与产物同目录。我们的 spec.md 已覆盖此职能—— spec 就是这单的 recreate prompt，迭代先改 spec 的纪律与此同源。

## 视频迭代防漂移：验收闸门机制（2026-08-23 宜春 kiosk 三轮翻车换来）

同一内容反复重新生成必然漂移（生成是抽卡，提示词只能调概率）。纪律：

1. **用户验收通过的版本立刻抽关键帧存档**（起/承/转/合 4 帧，存 `qa/gate-*/`），此后任何改动必须过闸门比对才能替换上线
2. **清晰度/体积类升级一律走超分，不再重新生成**：Real-ESRGAN 逐帧 4x（`tools/upscale_frames.py`，torch/MPS，免 basicsr）再 lanczos 收到目标分辨率，内容零漂移
3. **换片必带 URL 版本参数**（`attract-loop.mp4?v=up1080`），file:// 下 Chrome 视频缓存极顽固
4. **ark_video.sh 第 6 参数分辨率**：`1080p` 仅 doubao-seedance-2.0（非 mini）实测可用

## maskedmerge 两个连环坑（2026-08-23 实修）

1. **流顺序是反的**：亮部遮罩取的是**第二路流**（overlay），暗部取第一路。「标题带保金」的正确写法是 `[低部流][金字流][mask]maskedmerge`——金字流必须放第二输入。写反了会让标题带悄悄吃上降饱和（金字灰暗的隐形根因）
2. **RGB 源丢色**：输入是 PNG 帧序列（rgb）时 maskedmerge 输出会丢彩成全灰，两路输入先 `format=yuv444p` 再进 maskedmerge；mp4 源（yuv）无此问题
3. mask 必须 `nullsrc=d=时长` 生成等长视频 + `-shortest`，`-loop 1 -i png` 会无限流卡死

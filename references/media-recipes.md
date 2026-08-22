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

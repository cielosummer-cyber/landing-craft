# 签名交互片段库

从已上线的真实页面里逐参数提取的最小自包含交互块。用法：**复制片段进项目的 `index.html`，再按当前 spec 改参数**——不是引用、不是依赖，复制完这份文件就与库无关了。每个片段顶部注释含用途、来源、参数表、`?shot=1` 完成态规则和已知坑。

所有片段遵守 landing-craft 硬约定：URL 带 `?shot=1` 时所有入场动画立即置完成态（确定性截图用），通常由 `<html class="shot">` + CSS 覆写 + JS 短路三路共同保证。

| 文件 | 用途 | 适用气质 |
|---|---|---|
| `stamp.html` | 印章块 scale 1.8→1、rotate -18°→-8° 砸落，multiply 混合出油墨感 | 档案 / 卷宗 / 编辑部 |
| `redact.html` | 行内词组盖黑条，hover 时黑条从右侧收起（全页最多两处） | 解密 / 档案 / 彩蛋 |
| `ch-rise.html` | 大标题逐字从遮罩内升起，0.09s 错峰 | 中文大字招牌入场 |
| `scroll-expand.html` | hero 图随滚动 38vw→100vw 撑满，圆角与内部缩放同步收敛 | 东方 / 叙事 / 揭幕 |
| `clip-reveal.html` | 图片入视口时 clip-path inset(8%)→0 + img scale 1.04→1 双重收敛 | 杂志 / 编辑 / 显影 |
| `preloader.html` | 品牌化加载器：mono 三角落小字 + 进度百分比 + 混合进度驱动，淡出时发 `loader:done` 事件接力入场编排 | 重资产页（大图/视频 hero） |
| `bg-flow-field.html` | Canvas 2D 粒子流场全屏背景，暖琥珀/金/珊瑚拖尾丝线，鼠标推斥交互 | 暖调 / 手作 / 人文编辑部 |
| `bg-topo-field.html` | Raw WebGL 地形等高线缓慢漂移 + 1px 物理像素细网格 | 工业 / 基础设施 / 极客科技 |
| `bg-cloud-field.html` | Raw WebGL 紫夜山峦 5 层视差迁移 + 星野闪烁 + 偶发流星 | SaaS / AI / 平台型产品 hero |

已知坑补充：`clip-reveal` 的容器带 `overflow:hidden`，竖排小字等附属元素别放容器内，会被整体裁掉——外套一层 `position:relative` 定位容器（江报研学单慢杂志方向实测）。

三个 `bg-*` 背景片段的共用约定：canvas fixed 定位 z-index 0、pointer-events:none、DPR 上限 2、`visibilitychange` 暂停 rAF；`?shot=1` 渲染一个固定时间点的静态帧后停循环（flow-field 用固定种子 PRNG 同步预滚 1500 帧，两次截图 sha 一致；两个 WebGL 片段固定 u_time）。`bg-cloud-field` 的 SHOT_T 是 GPU 实测选出来的（GLSL sin 大参数精度与 JS 不一致，CPU 预算流星周期会落空），换时间点必须重新实测。

来源项目：内部项目（stamp / redact / ch-rise / scroll-expand / clip-reveal）、`heart-ui.vercel.app` × `robot-game-3d-sq5l.vercel.app`（preloader，scratch 页实测 pageerror 0）、`threeui`（MIT，github.com/MengTo/threeui；bg-flow-field / bg-topo-field / bg-cloud-field，scratch 页实测 pageerror 0）。

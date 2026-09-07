# 工程级设计 spec 模板

> 对应原工作流里那份 Google Doc 的角色：资产 + 常量 + 行为，全部精确到参数。
> 写不满宁可砍需求，不要留虚词。

```markdown
# {品牌名} — Landing Page · 工程级设计规格

## 品牌与气质
- 品牌：{名字}（虚构/真实）— {一句话定位}
- 气质关键词：{3-5 个，如：暗场、金色机械、克制、编辑排版}
- 受众距离：{10cm 手机 / 1m 笔记本 / 10m 投屏}；视觉温度：{安静/兴奋/权威/温柔}
- 单 accent 色：{色值}（贯穿全场，不发明第二个）
- 签名交互：{本单唯一的主打交互，一句话说清机制}

## 内容结构（N 段）
1. **Hero**：{布局 + 签名交互的具体表现}
2. **{段名}**：{内容 + 图位}
...

## Assets（本地路径，use verbatim, do NOT hotlink）
- `HERO_IMG` = `assets/img/xxx.jpg`（{一句话内容}，{许可} — {来源}，{宽}×{高}）
- ...

## Constants
- {签名交互的参数，如 SPOTLIGHT_R = 280、LERP = 0.08}
- `EASE_OUT_EXPO = cubic-bezier(0.16, 1, 0.3, 1)`（入场动画统一曲线）
- 色板：`BG #...`、`INK #...`、`ACCENT #...`、`MUTED rgba(...)`
- 字体：display = {...}（fallback 写系统字体）；label/mono = {...}

## Behavior / Animations
1. **{签名交互}** — {逐帧机制：监听什么、算什么、怎么映射到 CSS}
2. **Page load 编排** — {谁先谁后，延迟数值；之后的 section 走 IntersectionObserver threshold 0.2，fade-up 一次}
3. **{其他组件行为}** — {marquee / 计数 / hover 态，各带参数}

## 验收标准
- {打开 3 秒内应该看到什么}
- 控制台 0 报错；file:// 双击直开；Google Fonts 失败时 fallback 依然成立
- 支持 `?shot=1`：所有 reveal/入场动画立即置完成态
```

## 两个真实 spec 参考

- 暗金奢华方向：内部验证单 spec.md
- 浅底新中式方向：内部验证单 spec.md（含素材阶梯的实战记录）

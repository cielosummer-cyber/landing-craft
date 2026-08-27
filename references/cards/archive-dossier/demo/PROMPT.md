# 复刻提示词 · archive-dossier 最小 demo

> 用法：把下面这段贴给 agent，可复刻出本 demo 的语法骨架（令牌 + 两个签名交互），再按单子主题替换内容。

复刻 archive-dossier 参考卡最小 demo：单文件零依赖 HTML，档案纸底 #E7DFCB、浓墨 #1A1714（暖黑不纯黑）、印泥红 #C03A2B 只给章/戳/涂黑条（不做链接色不做按钮底），表格线 rgba(26,23,20,.55) 全显要「印出来」；全页 SVG feTurbulence 噪点层 multiply opacity .45 做纸纤维质感。页面 = 一份卷宗：mono masthead（卷宗编号/日期/密级：公开，上下表格线）→ 墨带反白大标题（浓墨色块 + 反白宋体 900，clamp(72px,14vw,200px) 对 14px 正文的狠尺度对比）→ 全格线令牌表（border-collapse 边框全显，不是 hairline 行）→ 条款体守则（第一条/第二条…，宋体 700 条号 + 无衬线 14px/1.9 条文）。签名交互：①盖章入场——2×2 四字红方章（反白宋体 900、轻微不规则 border-radius、rotate -8°、mix-blend-mode:multiply 压在墨带与纸面交界），从 scale 1.8 / rotate -18° / opacity 0 砸落，cubic-bezier(0.2,1.4,0.4,1) 0.5s、delay 1.2s；②涂黑条揭示——span.redact::after 黑条盖字，hover 时 scaleX→0（transform-origin:right，0.4s cubic-bezier(0.16,1,0.3,1)），全页最多两处。禁忌：圆角卡片、阴影浮起、渐变、红以外的任何彩色、SaaS 圆角按钮——按钮就是表格单元格或下划线文字。

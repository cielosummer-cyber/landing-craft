# 复刻提示词 · retro-dtc-consumer 最小 demo

> 用法：把下面这段贴给 agent，可复刻出本 demo 的语法骨架（令牌 + 签名交互），再按单子主题替换内容。

复刻 retro-dtc-consumer 参考卡最小 demo：单文件零依赖 HTML，奶油底 #F7F3E8 全场不熄、深松绿 #034638（标题）/ #14433D（正文副阶）标题正文共用族、唯一强调色柠檬黄 #F5F36A 只给 pill CTA（黄底 + 深绿字 + 999px 圆角）与弧形色块；顶部一条公告条做反色运用（深绿底 + 奶油字）。Display 用复古粗衬线 Fraunces 900（开 SOFT/WONK 轴，fallback Georgia，中文配 ZCOOL KuaiLe）40px+ 大字短句左对齐，UI/正文用圆润几何无衬线 700（Ano → Nunito Sans / DM Sans），字必须「有肉」。hero 左文右图：左大字标题 + 描边胶囊 chip 行（深绿 1.5px 边、999px 圆角、hover 填充深绿字转奶油），右半纯 CSS 产品罐（大圆角罐身 + 椭圆罐盖 + 奶油标签，柠檬黄圆形色块托底撞色）。签名交互 = 产品罐视差漂浮：多个罐子各写 data-speed（三档 0.03 / 0.06 / 0.1），rAF 每帧按 (scrollY − stageTop) × speed 写 translateY，滚动时不同档位漂移量拉开；入场动画用轻微回弹 easeOutBack（cubic-bezier(.34,1.56,.64,1)，从 translateY(48px) scale(.94) 弹入，逐罐 stagger delay），mono 参数行实时回显 SCROLL 与各档 ΔY；漂浮舞台坐柠檬黄色块上，上下边缘用 SVG 波浪曲线与奶油 section 交接。不放真实文案与图像，罐子全用 CSS 渐变/形状占位。禁忌：暗底（深绿只许小面积反色）、细瘦字体、黑白灰性冷淡、直角硬边——圆角和曲线是这个方向的体温。

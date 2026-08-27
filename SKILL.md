---
name: landing-craft
description: 高级美学落地页固定流水线：素材阶梯（CC 免费图库 → codex image_gen 生图兜底 → 诚实 placeholder）→ 工程级设计 spec → 单文件 HTML 构建 → Playwright 截图验收。当用户要做 landing page / 落地页 / 产品页 / 品牌官网 / 活动页，或要「高级感」「premium」「美学级」的网页时使用。零边际成本，全部本地完成。
---

# landing-craft · 高级美学落地页流水线

把「做个好看的落地页」变成一条可重复的流水线。核心认知：**值钱的是把设计意图写成精确参数，工具层全是可替代的免费件**——Agent 负责精确执行，人负责审美决策。

先跑通再定制。每一步有完成标准，不达标不往下走。

## 参考卡库（开工前必看）

`references/cards/` 里是美学方向的冻结设计令牌（色板/字体/签名交互参数/禁忌）。当前库存：

| 卡 | 方向 | 状态 |
|---|---|---|
| `dark-gold-luxury.md` | 暗金奢华（腕表/珠宝/烈酒） | ✅ 自建验证（`~/k3-replica-demo/`） |
| `new-chinese-editorial.md` | 新中式编辑风（茶/香/东方生活方式） | ✅ 自建验证（`~/k3-replica-shanwu/`） |
| `dark-tech-saas.md` | 暗夜科技（开发者工具/AI 产品，源 raycast.com） | ✅ 自建验证（`~/landing-sable/`） |
| `retro-dtc-consumer.md` | 复古消费 DTC（食品饮料/个护，源 drinkolipop.com） | ✅ 自建验证（`~/landing-yeling/`） |
| `slow-magazine-editorial.md` | 慢杂志 editorial（出版/展览/文化，源 kinfolk.com） | ✅ 自建验证（`~/landing-yuanan/`） |
| `experimental-studio.md` | 实验工作室（agency/作品集，源 locomotive.ca） | ✅ 自建验证（`~/landing-northfield/`） |
| `deep-space-atlas.md` | 深空星图（知识图谱/文化科技，⚠️ 仅限 Cielo 本人品牌项目使用——个人页场景被本人否决） | ✅ 自建验证（`~/landing-cielo/` V2） |
| `archive-dossier.md` | 卷宗档案（个人品牌/出版/文化机构，源 niccolomiranda.com × 中文卷宗转译） | ✅ 自建验证（`~/landing-cielo/` V3） |
| `digital-heritage-immersive.md` | 数字非遗·暗夜流光（非遗/文博/展馆大屏，源 teamlab.art × hkpm.org.hk × ihchina.cn 对照） | ✅ 自建验证（`~/landing-heritage-test/`，回填主动断行规则） |
| `hairline-archive-portal.md` | 细笔档案门户（多分库文化数字化门户首屏，源 e-dunhuang.com 实地提取；与 digital-heritage-immersive 在「压暗 hero」「中文巨标题字重」两点上正相反，禁混用） | ✅ 自建验证（`~/landing-xingtu-claude/`，双平台对决首用，回填 5 条修正） |

基准卡 = 从真实优秀站点提取的令牌，尚未经自建验证；首次被单子使用时验收加倍严格，用后把状态改为 ✅ 并回填修正。

外部提取源目录（灵感 / 组件 / Mac 产品页，按用途分类）：`references/sources.md`——提取新卡或找签名交互配方时先查它，不临时乱搜。参考是**视频**（X 分享/录屏/B站）时先走 `references/video-analysis.md`：yt-dlp 拿源 → ffmpeg 抽帧 → 六层分析 → 输出令牌或 superprompt，不凭印象总结。

互动案例拆解库（完整产品级交互的逐帧分析，学结构/文案/ritual 设计，不学配色）：`references/case-*.md`——当前有「岭南灯愿」非遗 UGC 小程序（仪式四步法 / mechanic 语义化 / 开光构图）。

签名交互片段库：`assets/snippets/`——九个已验证的片段（盖章入场 / 涂黑条揭示 / 字符级升起 / scroll-expand / clip-path 揭示 / 品牌化加载器 + 三个氛围背景 bg-flow-field / bg-topo-field / bg-cloud-field），复制片段再按 spec 改参数，别从零重写。媒体配方（hero 视频 loop 提示词公式、滚动场景编排句式、组件级参考提取）：`references/media-recipes.md`。

## 流水线（5 步）

### 0 · 定方向（参考卡驱动，禁止凭空发明风格）

**记忆门禁（已知用户/品牌必做）**：为老熟人或已知品牌做单时，选卡前先 `memory_recall` 查两件事——这人的审美基准是什么、有没有被否决过的方向。否决记录一票有效：记忆里说「XX 方向被本人否决」，这个方向直接出局，不得重蹈。查不到再走下面的常规流程。

方向只能有两个来源，优先级从高到低：

1. **用户给了参考**（URL / 截图 / 品牌 /「就要 XX 那种感觉」）→ 按 `references/cards/_template.md` 尾部的提取协议，把它提取成一张新卡
2. **没给参考** → 从 `references/cards/` 里挑气质最接近的一张卡，并向用户说明选了哪张、为什么。两张都不沾边才提取一张新卡（找个该调性的世界级站点按协议提取）

拿到卡后，从卡里读出：气质关键词、色板、字体配对、签名交互、禁忌。签名交互**每单一个**（spotlight / scroll-expand / 视差……）——这是「高级感和模板页」的分水岭。

**完成标准**：方向落定为一张卡（已有的或新提取的），且禁忌栏非空——写不出禁忌说明还没看懂这个方向。

**正式工单走并行，不串行赌方向**：交付对象是真实项目/个人品牌/要拿出去的场合（用户明说「正式工单」「当案例」等信号也算）时，不选一张卡闷头跑——起 2-3 个子代理，每个子代理各认领一张候选卡、按本流水线独立跑出整页（spec + HTML + shoot 截图），并行交付截图给用户挑方向，选中后再进入迭代。子代理只读本 SKILL.md 和卡文件即可独立跑通，不需要额外上下文。方向被否过一次的教训：串行返工 N 轮的代价远大于并行开 3 个子代理的代价。

### 1 · 素材阶梯（按顺序下，不许跳级）

1. **CC 免费图库**：`python3 scripts/fetch_images.py --query "英文关键词" --out 项目/assets/img --count 3`（Wikimedia）；命中率低时用 Openverse API 搜 Flickr CC（`https://api.openverse.org/v1/images/?q=...&license_type=all`，带合规 UA）。**每张肉眼审核**——图库结果混杂，实测淘汰率约 50%，无关图/滤镜图/水印图直接删
2. **Ark 生图（首选生图，套餐内零边际成本）**：`bash scripts/ark_image.sh 输出路径 "提示词" [尺寸] [optimize]`（Seedream 5.0，2K/3K，走 Agent Plan 配额，已内置 `--watermark false`——底层 generate.js 默认 watermark:true 会在右下角打「AI生成」标，2026-08-22 实测）。提示词写**具体视觉特征 + 项目色板色值 + 摄影参数 + 横竖版**；底层 generate.js 会自动追加画质增强词，两个实测坑（2026-08-27 赣鄱星图单）：①优化器关键词命中「插画」——即使出现在否定句——就会注入插画风格后缀，摄影/写实类提示词把第 4 个参数传 `false`；②Seedream 要求 ≥3.7MP，自定义像素尺寸 2560×1280（3.3MP）会被 HTTP 400 拒，用 2K/3K 档位或 ≥2880×1440
3. **Ark 生视频（hero loop）**：`bash scripts/ark_video.sh 输出.mp4 "提示词" [首帧图] [时长=5]`（Seedance 2.0，支持图生视频首帧）。提示词公式见 `references/media-recipes.md`：主体静止 + 微动 + 极慢推镜 + loop-friendly
4. **codex 生图兜底**：`bash scripts/gen_image.sh 输出路径 "提示词"`（gpt-image-2，复用本机 ChatGPT 登录）。Ark 不可用时的备用通道
5. **诚实 placeholder**：生图也不满意就留占位并标注「图待补」，不拿烂图凑数

**完成标准**：每个内容必需的图位都有审核通过的本地真图，路径写进 spec。

### 2 · 写工程级 spec

按 `references/spec-template.md` 写 `项目/spec.md`：资产清单（本地路径 verbatim）、常量（尺寸/色值/缓动/延迟全部写死成数值）、行为动画（逐条可实现）。**Spec 薄了后面必飘**。

**完成标准**：spec 里没有一个「高级感」「流畅」这种不可执行的词——每个设计意图都落成了参数。

### 3 · 构建单文件 HTML

按 spec 逐条实现，`项目/index.html` 单文件、双击直开（`file://` 可用，本地图相对路径，外部依赖仅 Google Fonts 且必须有系统字体 fallback）。**必须内置 `?shot=1` 兼容**：URL 带 `shot=1` 时所有 reveal/入场动画立即置为完成态（供确定性截图）。

**完成标准**：spec 的每条行为都能在代码里指认到实现位置。

### 4 · 验收

`node scripts/shoot.mjs 项目/index.html` → 输出首屏/中段/全页截图并报告 console 错误。肉眼过截图，对照 `references/quality-gates.md` 清单逐项过。

**评审前置（正式工单必做）**：`open` 给用户看之前，起一个评审子代理做独立质检——给它：三张截图路径、本单用的卡（重点看禁忌栏）、`quality-gates.md`、以及 step 0 查到的用户审美基准/否决记录。评审打回的先修完再交付，不把返工成本转嫁给用户。验收人自己给自己打分会看不见盲区，这条门专门堵这个。

**原创性审查（方向来自真实参考站/视频时必做，培训案例类交付加倍）**：评审子代理同时对照参考源做 originality audit，输出两栏清单——**拿走了什么**（色板/字体配对/签名交互机制等令牌级语法）与**没拿什么**（布局结构/文案/图像/段落顺序等课文）。规则：学语法不抄课文；布局与参考源逐屏雷同、hero 构图一眼可认出同源、文案句式照搬，任一命中即打回。灵感来源名单和最终差异点写进 spec 尾部，交付时能说清「这页从哪学的、哪里是我们自己的」。

**完成标准**：0 pageerror + 截图过了质量门清单 + 评审子代理放行 + `open` 给用户看动态效果。

### 5 · 部署（可选，需要用户本人完成一次 CLI 登录）

Netlify 免构建直发：`npx netlify-cli sites:create --name <站点名> --account-slug <团队slug> --json` 拿 site id → `npx netlify-cli deploy --dir=. --prod --site <id>`。两个实测坑：① 建站默认开团队登录墙（全站 401 跳 edge-access），必须 `netlify api updateSite --data '{"site_id":"<id>","body":{"sso_login":false}}'` 关掉再 curl 验证 200；② 登录态会过期，`netlify status` 报 not logged in 时让用户跑 `npx netlify-cli login` 走浏览器授权。

## 迭代

用户反馈修改时：改 spec 先，再改代码——spec 是这单的源代码。

每单结束后两件事，skill 靠这个升值：

1. **沉淀参考卡**：这单如果跑出了新美学方向，按 `_template.md` 把它蒸馏成 `references/cards/` 里的新卡（禁忌栏必填；新卡配 `demo/index.html` 最小签名交互演示 + `PROMPT.md` 复刻提示词——卡是语法书不是课文）
2. **回填新坑**：图库新噪音、生图提示词技巧、新交互参数配方，补进对应 references

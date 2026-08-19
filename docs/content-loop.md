# OpenFront Intel 每日执行账本

更新日期：2026-08-20。

本文件只回答“今天看到了什么、组成了什么执行批次、推进了哪些计划项、各 PR 的交付与验证结果是什么”。内容原则、当前战役、未来 6–8 周顺序和完成定义以 [`content-strategy.md`](content-strategy.md) 为准。

定时任务每次运行都必须先读项目级 `AGENTS.md`、内容战略和本账本。不得把临时信号直接升级为长期路线，也不得因为队列第一项未完成就机械地重复加工同一页面。

## 每日执行规则

每次运行围绕一个主要玩家结果组织内容批次，但可以同时推进多个计划 ID、多个页面和多个 PR。来源包、入口修复、旧页深度更新、新主答案、成组页面扩展、重复意图合并和发布后复盘都可以进入同一批次。紧急事实错误和正式版本发布可以调整批次顺序；其他成熟且无依赖冲突的候选不必等待当前战役完全结束。

### 1. 同步与检查状态

1. 阅读项目级 `AGENTS.md`、[`content-strategy.md`](content-strategy.md) 和本文件。
2. 在配置的本地项目目录中，从最新且干净的 `main` 创建独立主题分支；不得创建或复用 worktree，也不得直接改写 `main`。
3. 检查所有由内容循环创建但尚未合并的 PR，记录计划 ID、改动页面、依赖、评审状态和目标分支。
4. 若已有同一计划或重叠页面的 PR，优先继续或修正它，不创建重复 PR；其他互不冲突的计划可以建立新的独立 PR。
5. 检查上一轮每个进行中事项是否已经合并，并确认当前周目标、战役退出条件和可并行候选是否仍成立。

### 2. 收集当天信号

按以下顺序检查：

1. OpenFrontIO 正式 GitHub Release；正文为 TEST 时不得写版本笔记。
2. 上游机制、默认键位、地图、数值和占领规则变化。
3. `.cache/gsc/` 中最近的 7 天和 28 天 Search Console 意图报告。
4. GitHub Issues、Feedlog 和社区中重复出现的玩家问题。
5. `content-strategy.md` 当前战役与本文件的信号池。

Search Console 原始指标保持在本地缓存中，不写入仓库。本文件只记录搜索意图、主要落地页和行动结论。

### 3. 写当天编辑判断

执行前先在“今日编辑判断”写清：

1. 当前周目标、主要玩家结果和本批次承接的全部计划 ID。
2. 锚点交付是什么，以及它如何推进当前战役或响应事实错误 / 正式 Release。
3. 还会并行推进哪些配套更新和独立扩展；每项的证据成熟度、唯一主落地页和前置条件是什么。
4. 哪些项放在同一个 PR，哪些项拆成独立 PR；若有依赖，写清基线和合并顺序。
5. 为什么其他高优先候选继续等待，以及本次运行只有在什么条件下才停止。

候选必须先通过战略中的硬门槛。选择顺序是：

1. 已确认的事实错误。
2. 有真实正文的正式版本变化。
3. 当前战役中最接近退出条件的计划项。
4. 排名已有基础、只需改善答案或入口的现有页面。
5. 玩家反复提出但站内没有唯一答案的新问题。

不得按待办出现顺序、页面字数或总分自动决定。某项前置 PR 未合并或证据不足时，应暂停该项，但继续检查并执行其他无冲突、已通过硬门槛的候选；不得用薄内容填充批次，也不得因为第一个 PR 已就绪就提前结束整次运行。

### 4. 执行当天任务

内容必须从玩家决策出发：先回答“这一局怎么做”，再补必要的数据和来源。

1. 先列出本批次的锚点、配套更新和独立扩展；证据成熟时默认不止做一个小改动。
2. 为每个主答案明确唯一主落地页，以及不属于该页面的相邻意图。
3. 为每个计划项建立来源包：正式 Release、上游源码或生成数据、需要核验的数字与规则。
4. 先写直接答案，再写正确做法、失败反例、对手反制和下一步阅读。
5. 同一意图优先更新现有页面；多个独立意图可以在同一批次新增多个页面，不必强塞进一个旧页，也不必等待当前战役全部退出。
6. 常青内容默认同步 en、zh、fr、de、nl。紧急正式版本摘要可先发布 en + zh，但必须记录 fr/de/nl 的 72 小时补齐状态。
7. 至少为每个主落地页补两个相关入口，并避免与相邻页面争夺同一意图。
8. 不伪造截图；没有真实素材时使用可核验的数据表或代码原生解释图。
9. 受版本影响的旧攻略必须在正文顶部写明适用版本、最后核验日期和本版本最重要的变化。
10. 一个交付完成后，继续执行批次中其他独立项；只有剩余项全部被证据、依赖、冲突或验证能力阻塞时才停止。

### 5. 验证

按变更范围执行：

- 内容或 Markdown：`pnpm content:audit -- --strict`。
- 路由或内部链接：`pnpm check:links`。
- 新页面、MDX/frontmatter 或生成数据：`pnpm build`。
- 新增关键玩家事实：更新内容完整性 e2e。
- 任何交互变化：新增对应 e2e 并运行 `pnpm test:e2e`。

已知的全局基线错误必须与本次新增问题区分。测试失败时先诊断根因，不允许为了发布而删除有效断言。

多个 PR 时，每个 PR 都要独立完成与自身范围匹配的验证，不能用另一个分支的通过结果代替。若多个 PR 共同构成一个内容集，还要在最后一个集成基线上执行完整 build、link check 和必要的全套 e2e，并在各 PR 正文写明独立验证与集成验证的区别。

### 6. 更新账本与计划

结束前必须完成以下动作：

1. 将当天完成的事项标为 `[x]`；未完成则保留 `[ ]` 并说明阻塞点。
2. 将当天发现的新事项加入“信号池”，记录来源、玩家问题、候选主页面和是否有真实需求证据。
3. 更新“今日编辑判断”和“当前进行中”，允许多个计划项并行，但每项必须写明状态、分支 / PR、依赖和下一决策点。
4. 在“每日运行记录”按计划项或 PR 分行追加玩家结果、完成内容、验证结果和下一决策点，并补一行批次总览。
5. 只有用户明确调整执行口径、正式 Release、事实错误或每周/月复盘可以修改 `content-strategy.md`；普通每日信号不得随意重排 Now / Next / Later。
6. Feedlog 帖子进入计划时记录链接、票数和重复问题；发布后回链权威答案并更新状态。

### 7. 交付

1. 每次运行可以创建多个内容 PR，不设每日单 PR 上限；PR 数量由独立验证与合并边界、风险和依赖决定。
2. 分支名使用 `codex/daily-content-YYYY-MM-DD-<topic>`，同一天的不同主题使用不同 `<topic>`。
3. 一个 PR 只承担一个清晰主题。可独立合并的页面集拆成独立 PR；必须依赖前置代码或内容的 PR 要显式标注 base、顺序和阻塞关系。
4. PR 正文写明计划 ID、玩家结果、唯一主落地页、来源、语言状态、旧页同步范围、视觉证据、验证结果，以及战略退出条件推进了哪一步。
5. 创建一个 PR 后继续检查本批次其他成熟项，不把“已有一个 PR”当作停止条件。
6. 自动化自己创建或继续维护的 PR 不再等待人工审阅。只有同时满足以下门禁时才直接 squash merge：已同步并 rebase 最新 `main`；本 PR 范围要求的 audit、check、build、link check 和 e2e 全部通过；PR 为 `CLEAN / MERGEABLE`；已配置的 checks 全部成功，或仓库没有 checks 且 PR 正文记录了完整本地验证；没有未解决评论、重叠文件、依赖冲突或顺序阻塞；远端 head SHA 与本地提交一致。
7. 合并成功后核对 PR 状态与远端 `main` SHA，并更新账本；合并命令若遇网络瞬断，先查 PR 状态和远端 ref，只允许在确认未合并后重试一次。任一门禁不满足时保留 PR，记录阻塞并停止自动合并。
8. 定时任务不创建或使用 worktree。启动时用 `git status --porcelain --untracked-files=all` 检查本地项目，只豁免未跟踪的 `.cache/**` 本地缓存，并禁止把缓存加入提交；随后切到并 fast-forward-only 同步 `main`，再直接创建本地主题分支。每个 PR 合入后必须在同一目录切回并同步 `main`，确认当前分支为 main，且除 `.cache/**` 外工作区干净后才可继续下一项；若有用户改动或无法回到最新 main，则停止并报告，禁止自动 stash、reset 或 clean。
9. 若整个候选集都没有值得提交的内容，只更新发现结果和队列，不制造空 PR 或空页面。

## 定时任务

- 状态：启用。
- 自动化 ID：`openfront`。
- 频率：每天一次，本地时间 09:00。
- 执行位置：`openfront-intel` 本地项目。
- 执行方式：不创建 worktree；从干净、最新的本地 `main` 直接创建主题分支，PR 合入后回到并同步 `main`。
- 计划来源：[`content-strategy.md`](content-strategy.md)。
- 交付边界：可以修改和扩展多个页面、更新本文件并创建、验证、直接合并多个 PR；不得为了制造吞吐量创建重复页面、薄页或空 PR，任一自动合并门禁不满足时必须保留 PR 并报告。

## 当前周目标

- 战役：正式非 TEST `v0.33.6` 的 `FRESH-01` 已完成；`NUKE-01` 在首个有效后切片中达到退出条件，不再占 Monitoring。
- 玩家结果：旧对局可从版本不匹配路径跳到匹配构建的 replay shell；未改变的 v33.5 管理大厅、固定键位和 Water Nukes 边界继续明确区分。
- 当前计划项：Production 为空；Monitoring 为空；Incubation 为 `MAP-01` 与等待 #4237 或真实重复问题的 `ATTACK-01`。
- 完成条件：五语 v33 总览和首页版本入口已完成回放直接答案、来源和 e2e；地图与攻击比例不凭零需求或旧 PR 晋级，Doomsday 错落地先等下一稳定窗口复核。

## 今日编辑判断

- 日期：2026-08-20。
- 当前周目标 / 计划 ID：响应正式 `v0.33.6`，重开 `FRESH-01`，让玩家知道旧版本回放会自动切到匹配版本的 replay shell；`MAP-01` 与 `ATTACK-01` 继续 Incubation，不因零需求抢占 Production。
- 锚点交付：更新五语唯一 `/changelog/v33/` 主落地页，在顶部直接回答“旧对局还能不能回放、遇到版本不匹配怎么办”，并同步首页最新版本卡片与内容完整性 e2e；不新建回放薄页。
- 为什么今天做：官方 `v0.33.6` 于 2026-08-19 发布真实正文，新增旧版本对局回放能力。上游 tag 相对 v0.33.5 只有 3 个提交、11 个文件，正式源码把历史对局导向 `https://replay.<audience>/<gameId>`，由 CDN 提供匹配构建的 shell；这是会改变玩家下一步操作的版本事实。
- Release / 上游边界：`v0.33.6` 还降低 Luna 公共多人频率并限制每客户端每分钟 5 次 rejoin；这两项属于服务保护和匹配节流，不形成独立站内策略页。v33.5 的 featured/admin lobby、固定键位与 Water Nukes 未发布修复边界仍有效。
- GSC 状态：7 天报告为 2026-08-11 至 2026-08-17，971 个 Query / 1,942 条 Query x Page；28 天为 2026-07-21 至 2026-08-17，1,429 / 3,738。两份刷新均首次成功，来源为 `gsc-cli-oauth`，生成时间为 2026-08-19T23:02Z；截止日早于 v33.6 发布，不能用来评价本次回放入口。
- 需求与孵化：站点开放 Issues / PR 为 0；Feedlog feedback/roadmap 仍只有系统 welcome、1 帖、0 票、0 评论；上游 #4237 仍开放且无新讨论。`ATTACK-01`、`MAP-01` 没有新增真实重复问题或精确搜索意图，继续孵化、不建页。
- 配套范围与停止条件：同步五语 changelog frontmatter、v33.6 来源和回放边界；首页五语最新版本卡片改为 v33.6。FAQ、modes、shortcuts 与 Water Nukes 不需要改写，因为 v33.6 没有改变它们的玩家规则；完成内容审计、check、build、link check 与完整 e2e 后再决定合并。

## 当前进行中

- Production：当前为空。`FRESH-01` 的五语 v33.6 回放响应、来源映射、首页入口和完整回归已由 [PR #36](https://github.com/redreamality/openfront-intel/pull/36) 合并为 `62bb30f`。
- Monitoring：当前为空。`NUKE-01` 已在截止 2026-08-16 的 7 天窗口证明专页以 97 次展现和全部 3 次点击超过 hotkeys 的 64 次展现，达到退出条件。
- Incubation：`MAP-01` 的两张地图仍无精确 GSC 或玩家 Issue，继续孵化、不建页；`ATTACK-01` 仍等待 #4237 明确或真实重复需求；`SPAWN-01` 与 `ROOM-01` 均已合并取消。

## 计划承接表

这里不重复战略正文，只记录执行状态和下一决策点。

| ID | 状态 | 下一决策点 |
|---|---|---|
| `FRESH-01` | 已完成；正式 v33.6 的版本化 replay shell、Luna 公共多人频率 `6 → 2` 和每客户端每分钟 5 次 rejoin 限流已写入五语 v33 总览与首页入口；[PR #36](https://github.com/redreamality/openfront-intel/pull/36) 已合并为 `62bb30f` | 观察新回放查询和旧 v33.5 边界；只有新事实或玩家问题才重新打开 |
| `FRESH-02` | 已完成；[PR #5](https://github.com/redreamality/openfront-intel/pull/5) 已合并 | 在 `FRESH-03` 首页入口中自然连接版本与核心旧攻略 |
| `FRESH-03` | 已完成；[PR #6](https://github.com/redreamality/openfront-intel/pull/6) 已合并 | 首页入口已可承接刷新后的 v33 系列总览 |
| `DOOM-01` | 已完成并按用户反馈深度扩写；五语正文各 55 个 H2–H4，英文约 3,816 词、法语约 3,758 词、德语约 3,228 词、荷兰语约 3,416 词、中文约 5,453 汉字；相邻入口、来源包与 e2e 同批交付至已合并 [PR #8](https://github.com/redreamality/openfront-intel/pull/8) | 当前战役已关闭；后续只在规则或需求变化时复核 |
| `ECON-01` | 已完成并通过 [PR #9](https://github.com/redreamality/openfront-intel/pull/9) 合并；五语经济页、公式生成源、自然入口断言和新鲜度摘要已同批交付 | 观察 `/mechanics/economy/` 的人口增长查询排名与错落地变化 |
| `ATTACK-01` | Incubation；默认 20%、范围 1%–100%、默认步进 10% 与单次发送公式已核验；开放 #4237 记录高比例同 tick 双击可能 full-send | 等 #4237 被修复/明确，或出现真实重复需求；否则不建立五语独立页，也不写武断比例表 |
| `CTRL-01` | 已完成；五语 `/shortcuts/` 保留 6 组完整默认键位表，五语 `/guides/hotkeys/` 只保留 1 张场景决策表并专注训练、失败恢复与反制；[PR #15](https://github.com/redreamality/openfront-intel/pull/15) 已合并 | 观察 shortcuts/hotkeys/controls/keybinds 查询的错落地是否下降，不再复制第二套完整表 |
| `NUKE-01` | 已完成；五语入口、收录与唯一主答案均已交付，截止 2026-08-16 的有效 7 天窗口中专页获得 97 次展现和全部 3 次点击，高于 hotkeys 的 64 次展现 | 退出 Monitoring；只有新的错落地、索引或抓取证据才重新打开 |
| `SPAWN-01` | 已合并取消；五语 first-match 已覆盖海岸、半岛、中心、瓶颈、备用路线与停止线，独立页会重复主答案 | 只有出现 first-match 无法承接的真实重复问题才重新立项 |
| `ROOM-01` | 已晋级并合并进五语 `/mechanics/modes/`；FAQ 只做短答导流，取消独立私人房攻略候选 | 后续只在 Host UI、公开列房限制、preset 交付或真实重复问题变化时复核 |
| `MAP-01` | Incubation；正式 manifest 与 thumbnail 已确认 Caribbean 约 10% 陆地、Danish Straits 约 55% 陆地及不同海陆通道，但 GSC / Issues 均无精确问题，本轮不晋级 | 出现真实问题、搜索意图，或来源足以回答出生、港口、舰队与 chokepoint 的具体差异后，两图成组试点 |

## 信号池

- 2026-08-19｜`NUKE-01` 退出｜GSC 首次成功刷新到截止 2026-08-16 的有效窗口：7 天 966 Query / 1,967 Query x Page，28 天 1,419 / 3,694。7 天 Water Nukes 专页获得 97 次展现和全部 3 次点击，高于 hotkeys 的 64 次展现，主要落地页已转向唯一主答案，Monitoring 关闭。来源见 [`2026-08-19-nuke-monitoring-exit.md`](research/2026-08-19-nuke-monitoring-exit.md)。
- 2026-08-19｜Release / 上游｜最新正式非 TEST Release 仍为 `v0.33.5`；上游 main 从 `64b092a` 前进到 `0b0c765`。新结盟核弹保护、Port 商船生成率重算、封闭领土吞并和团队 Doomsday 门槛均未正式发布，只进入下一 Release 核验。
- 2026-08-19｜需求与孵化｜站点开放 Issues / PR 为 0，Feedlog 仍只有系统 welcome、0 票、0 评论，#4237 无更新。`ATTACK-01` 7 天精确需求 0、28 天 1 次展现；Caribbean / Danish Straits 两窗口均为 0，上游只命中旧地图 PR，继续 Incubation、不晋级。Doomsday 7 天错落地信号进入下一稳定窗口复核，不做重复改稿。
- 2026-08-20｜Release / 上游｜最新正式非 TEST Release 为 [`v0.33.6`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.6)，发布于 2026-08-19T18:14:29Z，tag commit `bebc953`。版本化 replay shell 通过 `https://replay.<domain>/<gameId>` 加载记录该局的构建；Luna 公共多人频率由 6 降至 2，每客户端 rejoin 每分钟限制 5 次。回放改变玩家下一步操作，`FRESH-01` 进入 Production；其余两项不晋级独立策略页。
- 2026-08-20｜Search Console / Issues / Feedlog｜7 天为 2026-08-11..17（971 Query / 1,942 Query x Page），28 天为 2026-07-21..08-17（1,429 / 3,738），均来自 `gsc-cli-oauth`；截止日早于 v33.6，不能评价新回放入口。站点 Issues 0；Feedlog feedback/roadmap 仍只有系统 welcome、1 帖、0 票、0 评论；#4237 无新讨论，`MAP-01` / `ATTACK-01` 继续 Incubation。

- 2026-08-16｜Release / 上游｜最新正式非 TEST Release 为 [`v0.33.5`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.5)，发布于 2026-08-15T02:24:47Z，tag commit `87f1a52`。受管 featured lobby 标签与展示窗口、adminbot 固定队伍、匿名固定队友互见和 Infinite Gold x5 ghost badge 触发 `FRESH-01`；普通 Host UI 未新增固定队伍控件。
- 2026-08-16｜正式与未发布边界｜v33.5 正式 `UserSettingModal.ts` 仍无 `resetGfx`、`selectAllWarships` 或 `boxSelectWarships` 设置项，`WaterManager.ts` 仍无 `c5c7d74` 修复；固定 `F`、图形重置 `R`、框选 `Shift` 与运输船绕开 Water-Nuked 水域的警告继续有效。来源包见 [`2026-08-16-v33-5-content-signals.md`](research/2026-08-16-v33-5-content-signals.md)。
- 2026-08-16｜Search Console / Feedlog / Issues｜7 天和 28 天刷新及各自唯一重试均未改写报告，明确回退 2026-08-13 生成、截止 2026-08-10 的 921 / 1,867 与 1,298 / 3,229；OAuth token 不存在，`NUKE-01` 未到可判定窗口。站点 Issues / 开放 PR 为 0，Feedlog 只有系统 welcome、0 票、0 评论；#4237 仍为 5 条评论且无更新，`MAP-01` 与 `ATTACK-01` 不晋级。

- 2026-08-15｜Release / 上游｜最新正式非 TEST Release 仍为 [`v0.33.4`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.4)，tag commit `20c813f`；上游 main 前进至 `64b092a`。未发布 `ead15d8` 明确补齐 `resetGfx`、`boxSelectWarships` 和 `selectAllWarships` 设置项，反证正式 v33.4 仍有三个固定键位流程；不能把 main 写成当前能力。
- 2026-08-15｜Search Console 7/28 天｜两份包装刷新与各自唯一直接 Node 重试均无日志、未改写缓存，进程已精确终止且无残留。回退 2026-08-13 生成、截止 2026-08-10 的 7 天 921 / 1,867 与 28 天 1,298 / 3,229；`NUKE-01` 未到门槛直接跳过。
- 2026-08-15｜Feedlog / GitHub｜站点开放 Issues / PR 为 0；Feedlog feedback 与 roadmap 仍只有系统 welcome，0 票、0 评论；#4237 仍开放、5 评论、无新进展，没有新候选晋级。
- 2026-08-15｜`FRESH-01` / `MAP-01`｜五语 shortcuts / hotkeys 的绝对重映射说法晋级为 Production 事实纠错。Caribbean 与 Danish Straits 的 manifest/thumbnail 已证明约 10% 与 55% 陆地及不同海陆决策，但精确需求仍为 0，`MAP-01` 继续 Incubation、不建模板页；来源见 [`2026-08-15-v33-4-keybinding-boundary.md`](research/2026-08-15-v33-4-keybinding-boundary.md)。

- 2026-08-14｜Release / 上游｜最新正式非 TEST Release 仍为 `v0.33.4`；上游 main 为 `19ca3a1`。正式 tag 与 main 的 `HostLobbyModal.ts`、`GameConfigSettings.ts`、`Schemas.ts` 关键 blob 相同，tag 后提交没有改写本次私人房设置结论；Water Nukes 修复与 F/Escape 取消战舰选择仍未进入新正式 Release。
- 2026-08-14｜Search Console 7/28 天｜两份刷新各执行一次并各唯一重试一次，均在无可用代理的 Google API 等待中超时，缓存未改写。明确回退 2026-08-13 生成、截止 2026-08-10 的报告：7 天 921 / 1,867，28 天 1,298 / 3,229；`NUKE-01` 未到门槛直接跳过，私人房相关 28 天只有 4 Query / 6 展现 / 0 点击，不支持新路由。
- 2026-08-14｜Feedlog / GitHub｜站点开放 Issues 与 PR 均为 0；Feedlog 公开反馈和 roadmap 仍只有系统 welcome，Other，0 票、0 评论。上游 #2489 的 preset 请求已获批准并进入 v34 milestone 但未交付，#4951 的临开局改规则报告尚未批准，二者只用于工作流边界，不夸大成当前能力或高频共识。
- 2026-08-14｜`ROOM-01`｜普通 Host UI 与五语 modes / FAQ 旧清单不一致；本轮将候选晋级为 Production，合并进五语 `/mechanics/modes/` 并取消独立 `/guides/private-room-settings/`。四种配置目标、失败反例、公开列房互斥、联盟时长、Random Spawn 与 preset 边界见 [`2026-08-14-private-lobby-settings.md`](research/2026-08-14-private-lobby-settings.md)；下一 Incubation 锚点为 `MAP-01`。

- 2026-08-13｜Release / 上游｜最新正式 Release 仍为非 TEST `v0.33.4`；上游 `c5c7d74` 修复 Water Nukes 转换后小地图 magnitude / ocean 标记错误，避免运输船对弹坑水域使用 3 倍路径成本和拒绝部分直线平滑。修复已合入 main、尚未正式发布；五语唯一主答案补 v33.4 当前绕路边界和官方前后截图，不把 main 写成已发布规则。
- 2026-08-13｜Search Console 7/28 天｜主动刷新成功并仍截止 2026-08-10：7 天为 921 个 Query、1,867 条 Query x Page；28 天为 1,298 个 Query、3,229 条 Query x Page。未到 `NUKE-01` 至少截止 8 月 11 日的决策点，保持 Monitoring；28 天攻击比例精确需求仍为 1 次展现，spawn / private-room / 地图试点精确查询为 0。
- 2026-08-13｜Feedlog / GitHub Issues｜站点 Issues 为 0；Feedlog 仍只有系统 welcome，Other，0 票、0 评论。#4237 没有新讨论，`ATTACK-01` 不晋级。
- 2026-08-13｜`SPAWN-01`｜上游出生源码没有海岸、半岛、中心或瓶颈隐藏加分；五语 first-match 已完整承接四类形状的出口、接敌面、备用路线与停止线。结论为合并进 first-match、取消独立 `/guides/best-starting-position/` 候选，下一孵化锚点转为 `ROOM-01`。

- 2026-07-31｜Search Console 7/28 天｜`water nukes` 仍落到 guides 索引或 hotkeys；专页在报告截止后才上线，归入 `NUKE-01` 观察，不立即重复改稿。
- 2026-07-31｜Search Console 7/28 天｜`shortcuts`、`hotkeys`、`controls`、`keybinds` 同时落到两页；归入 `CTRL-01`，先解决页面分工。
- 2026-07-31｜Search Console 7/28 天｜`population growth`、`money guide`、`economy guide` 需要唯一主答案；归入 `ECON-01`。
- 2026-07-31｜Search Console 7/28 天｜品牌词主要落到法语 About、德语首页或英文首页；保留观察，等首页 `FRESH-03` 上线后再判断。
- 2026-08-01｜Release / 上游｜最新已确认正式正文仍为 `v0.33.0-beta1`；本地 extract checkout `990eba6` 与 `_meta.upstreamCommit` 一致。在线 Release/compare 刷新连续 TLS 握手超时，不能把未刷新写成“绝无新变化”，因此今天只研究、不生产版本内容。
- 2026-08-01｜Search Console 7/28 天｜报告截止 2026-07-29；Water Nukes、controls/hotkeys、economy/growth 与品牌词错落地结论未改变，继续留在 `NUKE-01`、`CTRL-01`、`ECON-01` 和 `FRESH-03`，不越过当前战役。
- 2026-08-01｜Feedlog / GitHub Issues｜同日最近一次已确认状态为 Feedlog 只有系统 welcome、真实 Issues 为 0；本轮在线刷新受 GitHub API TLS 超时阻塞，该状态保持“待下次复核”，没有证据可升级新选题。
- 2026-08-02｜Release / 上游｜最新正式正文仍为 `v0.33.0-beta1`。tag 后 6 个提交中，`bf38c58` 修复普通核弹绕不可通行地形时的 Silo 与曲线选择；站内没有与新行为冲突的旧结论，因此记录为后续刷新信号，不打断 `FRESH-02`。
- 2026-08-02｜Search Console 7/28 天｜缓存仍截止 2026-07-29；Water Nukes、controls/hotkeys、economy/growth 和品牌词错落地判断未变化，继续留在原计划项，不越过当前战役。
- 2026-08-02｜Feedlog / GitHub Issues｜远端开放 Issues 为 0；Feedlog 仍只有系统 welcome，0 票、0 评论。没有真实重复玩家问题可升级为新选题。
- 2026-08-03｜Release / 上游｜最新正式正文仍为 `v0.33.0-beta1`。tag 后比较已到 `9f3423d`、共 15 个提交；`bf38c58` 的普通核弹路径选择仍是唯一会改变局内决策的机制修复，`5d01149` 只把拦截通知从 missile 改为 SAM，其他提交属于商店、账户、翻译、回放、图标或文档。没有与站内当前攻略冲突的事实，也不为小修复拆版本薄页。
- 2026-08-03｜Search Console 7/28 天｜已主动刷新至 2026-08-01：7 天范围为 2026-07-26 至 2026-08-01（811 个 Query、1,507 条 Query × Page），28 天范围为 2026-07-05 至 2026-08-01（1,080 个 Query、2,384 条 Query × Page）。Doomsday 两个核心 7 天查询共 106 次展现，仍主要落到 `/changelog/v32/`，进一步支持 `DOOM-01` 作为当前下一项；Water Nukes 仍错落到 hotkeys/guides，快捷键意图仍在 `/shortcuts/` 与 `/guides/hotkeys/` 间切换，经济 quick win 已正确落到 `/mechanics/economy/`。新数据强化现有排序但不构成事实错误或正式 Release 中断，`NUKE-01`、`CTRL-01`、`ECON-01` 继续等待。
- 2026-08-03｜Feedlog / GitHub Issues｜远端开放 Issues 仍为 0；Feedlog 在线反馈页与路线图仍只有系统 welcome，0 票、0 评论，没有真实重复玩家问题可升级为选题。
- 2026-08-04｜Release / 上游｜正式 [`v0.33.1`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.1) 于 2026-08-03T21:39:35Z 发布，`draft=false`、`prerelease=false`，正文不是 TEST。两项热修是回放 desync 与自定义 tribe 名称不显示在排行榜；它们恢复可靠性与可见性，不改变 MIRV、Doomsday、Ranked 2v2、战舰熟练度或地图结论。上游 clone 的 pull 外层虽超时，事后确认已干净快进到 `0668045`；`_meta.upstreamCommit` 已记录该 extraction checkout，本地未取得 Release tag，不把 checkout 误写成 tag 提交。
- 2026-08-04｜Search Console 7/28 天｜已主动刷新至 2026-08-02：7 天范围为 2026-07-27 至 2026-08-02（765 个 Query、1,411 条 Query × Page），28 天范围为 2026-07-06 至 2026-08-02（1,077 个 Query、2,370 条 Query × Page），两份报告均为本次成功刷新而非旧缓存。Doomsday 的 7 天窗口有 12 个相关 Query、152 次展现，仍主要落到 `/changelog/v32/`；它继续支持 `DOOM-01`，但不能越过正式 Release。Water Nukes、controls 与经济信号维持 `NUKE-01`、`CTRL-01`、`ECON-01` 原排序。
- 2026-08-04｜Search Console 7/28 天（`DOOM-01` 运行）｜再次主动刷新成功，数据稳定延迟仍保留 2 天：7 天为 2026-07-27 至 2026-08-02，生成于 2026-08-04T08:34:49.318Z（825 个 Query、1,563 条 Query × Page）；28 天为 2026-07-06 至 2026-08-02，生成于 2026-08-04T08:35:00.599Z（1,110 个 Query、2,479 条 Query × Page）。对应 Markdown 意图报告已复核；7 天共有 14 个 Doomsday Query、192 次展现，主落地仍是 `/changelog/v32/`，支持把独立主答案交付为当前战役最后一项。此次未回退缓存，也未改变 Next 排序。
- 2026-08-04｜Feedlog / GitHub Issues｜远端开放 Issues 为 0；Feedlog 与路线图仍只有系统 welcome，1 个 Other 帖子、0 票、0 评论。没有真实重复玩家问题，也没有同计划未合并 PR 可继续。
- 2026-08-04｜用户审阅反馈｜用户指出 Doomsday 初稿“太短”，要求写长。该反馈直接作用于现有 `DOOM-01` 唯一主答案，因此继续修正 [PR #8](https://github.com/redreamality/openfront-intel/pull/8)：补齐六轮时间线、门槛公式与取整、30 秒救场、四档速度、领土形状矩阵和 FAQ；不升级为新选题，不拆第二个页面。
- 2026-08-05｜Release / 上游｜最新正式 Release 仍为正文完整、非 TEST 的 [`v0.33.1`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.1)。上游 `main` 相比 extraction checkout `0668045` 多 9 个提交；其中出生阶段结束后的迟到落点修复堵住漏洞，Yangtze River 是新增地图，但两者都未改变现有守规玩家攻略结论。Yangtze 尚无正式 Release 或地图试点需求，不升级为选题。
- 2026-08-05｜Search Console 7/28 天｜两份报告均主动刷新成功，没有缓存回退；保留 2 天稳定延迟。7 天为 2026-07-27 至 2026-08-02，生成于 2026-08-04T23:07:31.785Z（825 个 Query、1,563 条 Query × Page）；28 天为 2026-07-06 至 2026-08-02，生成于 2026-08-04T23:07:58.489Z（1,110 个 Query、2,479 条 Query × Page）。对应 Markdown 意图报告已复核；经济意图 7 天 18 个 Query、109 次展现，28 天 24 个 Query、392 次展现，`openfront population growth` 已落到 `/mechanics/economy/`，但 7 天平均排名约 17.71，支持深度改好现有主答案而非新建页面。
- 2026-08-05｜事实错误｜对照 v0.33.1 `Config.ts` 确认真实人口上限是 `2 × (tiles^0.6 × 1000 + 50,000) + Σ(cityLevel × 250,000)`；站内生成源和五语经济页此前多写 `0.6 ×`。本轮已修正生成源、重新 extract，并把 35–50% 增长区、约 42% 峰值、50–70% 威胁储备和 80%+ 上限抑制写入五语主答案。
- 2026-08-05｜Feedlog / GitHub Issues｜开放 Issues 为 0；Feedlog 仍只有系统 welcome，1 个 Other 帖子、0 票、0 评论。系统帖、空内容与无真实重复问题均未升级为候选。
- 2026-08-05｜用户执行授权｜用户确认后续自动化 PR 在质量门禁通过后可以直接合入，无需再次人工审阅。该授权只改变合并等待步骤，不放宽内容证据、唯一主落地页、多语一致、完整验证、最新 main、无冲突和远端 SHA 核验要求。
- 2026-08-05｜用户工作区授权｜用户要求定时任务直接在本地主题分支修改，PR 合入后回到 main，不再创建 worktree。为保护用户改动，启动时工作区不干净即停止，不自动 stash/reset/clean。
- 2026-08-06｜Release / 上游｜最新正式 Release 仍为正文完整、非 TEST 的 [`v0.33.1`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.1)；extraction checkout 仍为 `0668045`，上游 main 为 `9bf6edf`、领先 16 个提交。迟到出生与队伍分配修复会影响边缘局面，Yangtze River 是新增地图，Silo 新声音不改变决策；没有站内事实错误或新正式版本需要打断 `CTRL-01`，Yangtze 也不在允许的五张地图试点内。
- 2026-08-06｜Search Console 7/28 天｜两份报告均主动刷新成功，没有缓存回退；保留 2 天稳定延迟。7 天为 2026-07-29 至 2026-08-04，生成于 2026-08-06T09:21:40.192Z（874 个 Query、1,704 条 Query × Page）；28 天为 2026-07-08 至 2026-08-04，生成于 2026-08-06T09:22:24.543Z（1,172 个 Query、2,711 条 Query × Page）。快捷键核心查询分别有 239、220、186、152、166 次展现并在 `/shortcuts/` 与 `/guides/hotkeys/` 间切换，支持 `CTRL-01`；Water Nukes 与 Doomsday 继续等待新主答案上线后的有效窗口。
- 2026-08-06｜Feedlog / GitHub｜开放 Issues 与 PR 均为 0；Feedlog 仍只有系统 welcome，1 个 Other 帖子、0 票、0 评论。系统帖、空反馈和品牌拼错均未升级为选题；没有同计划 PR 需要继续或去重。
- 2026-08-09｜Release / 上游｜正式 [`v0.33.2`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.2) 于 2026-08-07T18:53:39Z 发布，`draft=false`、`prerelease=false` 且正文不是 TEST；tag commit 为 `e9e1070`。七档领土门槛、40%→5% 下限衰减和 150 秒领土腐化会直接改变 Doomsday 恢复决策，触发 `FRESH-01`。本地上游 clone 的两次 `git pull --ff-only` 分别因连接重置与无法连接 GitHub 443 失败，仍停在 `0668045`；因此不运行 extract，也不把旧 checkout 写成 v33.2 tag 来源，玩家事实直接核验正式 tag 源码。
- 2026-08-09｜Search Console 7/28 天｜两份报告均主动刷新成功，没有缓存回退，并保留 2 天稳定延迟。7 天为 2026-07-31 至 2026-08-06（生成于 2026-08-08T23:04:56.048Z，880 个 Query、1,802 条 Query × Page）；28 天为 2026-07-10 至 2026-08-06（生成于 2026-08-08T23:05:09.537Z，1,225 个 Query、2,928 条 Query × Page）。Doomsday 7 天共有 17 个 Query、450 次展现、25 次点击，现有专页已是主答案；Water Nukes 28 天为 16 个 Query、515 次展现、4 次点击，但仍未满 14 天观察窗。
- 2026-08-09｜Feedlog / GitHub｜开放 Issues 与开放 PR 均为 0；Feedlog 仍只有系统 welcome，1 个 Other、0 票、0 评论。系统帖、空帖和品牌拼错未升级为选题；`ATTACK-01`、`SPAWN-01`、`ROOM-01` 的精确需求只有 0–1 次展现且来源包未成熟，本轮不制造第二个主题。
- 2026-08-10｜Release / 上游｜最新正式 Release 仍是正文真实、非 TEST 的 [`v0.33.2`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.2)。发布后的上游提交没有应抢先写成正式版规则的机制、键位、地图、数值或占领变化，因此本周校准关闭已完成的新鲜度战役，转向真实错落地问题；生成数据仍保持已核验的 `v33` / `0668045` extraction 基线，不把它误写成 release tag。
- 2026-08-10｜Search Console 7/28 天｜两份报告均主动刷新成功，没有缓存回退，并保留 2 天稳定延迟。7 天为 2026-08-02 至 2026-08-08（生成于 2026-08-10T02:10:25.341Z，855 个 Query、1,695 条 Query × Page）；28 天为 2026-07-12 至 2026-08-08（生成于 2026-08-10T02:10:40.943Z，1,239 个 Query、2,984 条 Query × Page）。Water Nukes 28 天有 15 个 Query、482 次展现、4 次点击，guides 索引承接 218 次、hotkeys 承接 176 次，英文专页仅 4 次；专页已上线超过 14 天，支持修复既有入口而不是重写正文或新增页面。
- 2026-08-10｜Feedlog / GitHub｜开放 Issues 与开放 PR 实际均为 0；PowerShell 把空数组包装后曾显示一个空对象，复核原始 JSON 后排除。Feedlog 在线仍只有系统 welcome，1 个 Other、0 票、0 评论；系统帖、空帖和拼错品牌词未升级为选题。`ATTACK-01` 只有 4 次宽泛展现，`SPAWN-01` 为 0，`ROOM-01` 为 1，均继续等待成熟来源和真实需求。
- 2026-08-11｜Release / 上游｜最新正式 Release 仍为正文真实、非 TEST 的 [`v0.33.2`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.2)；上游 main 为 `49d52b0`。未发布 main 新增同一 Silo 跨 tick 排队、MIRV/SAM 近距离拦截、拥挤地图出生间距放宽与 Las Vegas Strip 修复；它们没有推翻站内当前结论，也不能抢先写成 v33.2 正式事实，保留下次 Release 核验。
- 2026-08-11｜Search Console / URL Inspection｜两份报告主动刷新成功且未回退缓存：7 天为 2026-08-02 至 2026-08-08（897 个 Query、1,797 条 Query × Page），28 天为 2026-07-12 至 2026-08-08（1,258 个 Query、3,055 条 Query × Page）。Water Nukes 明确意图为 7 天 11 Query/137 展现/0 点击，28 天 16 Query/507 展现/4 点击；数据截止日早于 2026-08-10 入口修复，不能评价效果。五语专页均为 PASS、Submitted and indexed、抓取成功且 self-canonical，排除立即收录故障；详细来源见 [`2026-08-11-content-signals.md`](research/2026-08-11-content-signals.md)。
- 2026-08-11｜Feedlog / GitHub｜开放 Issues 与开放 PR 均为 0；Feedlog 仍只有系统 welcome，1 个 Other、0 票、0 评论。没有真实重复玩家问题或成熟 Next/Later 候选，今天不制造内容页。
- 2026-08-12｜Release / 上游｜正式 [`v0.33.4`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.4) 于 2026-08-11T17:25:41Z 发布，`draft=false`、`prerelease=false` 且正文不是 TEST；tag commit 为 `20c813f`，上游 main 为 `228143e`。已有建筑升级与 Atom Bomb 获得批量，且同一 Silo 逐 tick、不同 Silo 可同 tick 发射，直接触发 `FRESH-01`；v33.3 只有地图小修与单人归档修复，不拆薄页。
- 2026-08-12｜Search Console 7/28 天｜两份报告主动刷新成功且未回退缓存：7 天为 2026-08-03 至 2026-08-09（917 个 Query、1,855 条 Query × Page），28 天为 2026-07-13 至 2026-08-09（1,281 个 Query、3,152 条 Query × Page）。截止日仍早于 2026-08-10 的入口修复，`NUKE-01` 保持 Monitoring；详细来源见 [`2026-08-12-v33-4-content-signals.md`](research/2026-08-12-v33-4-content-signals.md)。
- 2026-08-12｜Feedlog / GitHub｜开放 Issues 与开放 PR 均为 0；Feedlog 仍只有系统 welcome，1 个 Other、0 票、0 评论。`ATTACK-01`、`SPAWN-01`、`ROOM-01` 和地图试点没有新增成熟证据，本轮不制造第二个主题。
- 2026-08-12｜自动化 PR 恢复｜上轮唯一开放 PR #25 通过 base/head、CLEAN/MERGEABLE、checks/statuses、reviews/comments 与单文件范围门禁后 squash 合并为 `4b25fc3`；远端主题分支已删除，本地 `main` 已 fast-forward-only 同步。没有借恢复流程修改玩家内容或 `.cache/**`。
- 2026-08-12｜Search Console 二次刷新｜7 天为 2026-08-04 至 2026-08-10（856 个 Query、1,689 条 Query × Page，生成于 `2026-08-12T05:42:30.460Z`）；28 天为 2026-07-14 至 2026-08-10（1,277 个 Query、3,119 条 Query × Page，生成于 `2026-08-12T05:43:05.771Z`）。Water Nukes 7 天为 11 Query / 124 展现 / 0 点击，hotkeys 承接 90 次，英文专页 1 次；但窗口有 6 天在 8 月 10 日入口修复前。额外 8 月 10 日单日报告因低量匿名化返回 0 Query，不能判定修复成败，`NUKE-01` 继续 Monitoring。
- 2026-08-12｜Release / 上游二次核验｜最新正式非 TEST Release 仍为 `v0.33.4`。上游 main 从 `228143e` 前进 5 个未发布提交到 `8e1d2fd`：出生倒计时边框、Sol/Archipelago 小修、管理员固定队伍、按账号保存外观、无限金币时显示 x5 幽灵徽标；均未改变站内已发布操作或机制结论。
- 2026-08-12｜Feedlog / GitHub 二次核验｜站点开放 Issues 与开放 PR 均为 0；Feedlog 仍只有系统 welcome，1 个 Other、0 票、0 评论。上游开放 #4237 则提供两段视频与 5 条讨论，表明高攻击比例的同 tick 双击可能意外 full-send；它是 `ATTACK-01` 的事实风险，不足以单独证明五语新页需求。
- 2026-08-12｜`ATTACK-01` 孵化决策｜v33.4 源码确认默认攻击比例 20%、范围 1%–100%、默认步进 10%，单次发送量为点击时当前兵力 × 比例；相同目标的并行地面攻击会合并。28 天精确 `openfront attack ratio` 只有 1 次展现，相关攻击/发兵/获胜泛意图合计 10 次展现。结论为继续 Incubation、不晋级；详细来源见 [`2026-08-12-attack-ratio-incubation.md`](research/2026-08-12-attack-ratio-incubation.md)。

## 本次合规自检（2026-08-20，`FRESH-01` v33.6 正式响应）

- 计划 ID：`FRESH-01`；正式非 TEST `v0.33.6` 重新打开 Production，`MAP-01` 与 `ATTACK-01` 继续 Incubation，不因零需求抢占生产锚点。
- 玩家结果与唯一主落地页：五语 `/changelog/v33/` 顶部直接回答旧对局如何从版本不匹配路径进入匹配构建的 replay shell，并说明缺少旧 shell 时的诚实失败边界；首页最新版本入口同步 v33.6。没有新建回放薄页。
- 版本与来源边界：正式 tag 的版本化 replay URL、shell 处理、Luna 频率 `6 → 2` 与每客户端每分钟 5 次 rejoin 限流均有源码链接；v33.5 受管大厅、v33.4 批量操作、固定键位和 Water Nukes 未发布修复边界继续保留，未把服务保护小修复升级为独立策略页。
- 语言与视觉证据：en、zh、fr、de、nl 五语 v33 总览同批更新；视觉证据为正式 Release、tag 源码和代码原生表格，没有生成或伪造游戏截图。
- 信号与验证：GSC 7 天为 2026-08-11..17（971 Query / 1,942 Query × Page），28 天为 2026-07-21..08-17（1,429 / 3,738），截止日早于 v33.6，不能评价新入口；严格内容审计 40/40；Astro check 0 errors、9 hints；build 230 页；内部链接 9,314 条无断链；完整 Playwright 257/257。
- 命令失败收口：首轮定向 e2e 145/146 失败，根因为 `ProvenancePanel` 对系列 `v33` 仍映射 `v0.33.5`，而正文已升级到 `v0.33.6`；已更新映射并补充 `AGENTS.md` 规则，定向 1/1 与完整 257/257 随后通过。构建产生的 `_meta.json.generatedAt` 仅时间戳噪声已按 HEAD 基线恢复。
- 阻塞与 PR：无内容、语言或验证阻塞；[PR #36](https://github.com/redreamality/openfront-intel/pull/36) 已通过最新 main、`CLEAN / MERGEABLE`、0 checks/statuses、无评论或 review threads 的门禁后 squash 合并为 `62bb30f`，精确远端分支已删除并同步回 `main`。

## 本次合规自检（2026-08-19，`NUKE-01` Monitoring 退出）

- 计划 ID：`NUKE-01`；本轮是达到既定退出门槛后的 docs-only 决策收口，不修改玩家正文、路由、生成数据或交互。
- 玩家结果与唯一主落地页：7 天有效窗口中 `/guides/water-nukes/` 以 97 次展现和全部 3 次点击超过 hotkeys 的 64 次展现，证明查询已主要进入唯一完整答案；不再继续扩写或新建第二个 Water Nukes 页面。
- Release 与上游边界：最新正式非 TEST Release 仍为 `v0.33.5`；上游 `0b0c765` 的核弹保护、Port 商船、封闭领土吞并和团队 Doomsday 变化只列入下一 Release 核验，没有抢先写成当前规则。
- 孵化与其他信号：`MAP-01` 的 GSC 精确需求和玩家 Issue 仍为 0，`ATTACK-01` 28 天仍只有 1 次展现且 #4237 无更新，两项继续 Incubation。Doomsday 错落地留待下一稳定窗口复核，不做重复内容或 canonical 猜测。
- 语言、旧页与视觉证据：en、zh、fr、de、nl 玩家页面改动均为 0；来源是 GSC Query x Page、正式 Release、上游 compare、GitHub Issues/PR 与 Feedlog API，没有截图或伪造游戏画面。
- 验证：严格内容审计 40/40；`git diff --check`、本地 Markdown 链接、UTF-8 BOM、终止换行和尾随空白检查通过。没有 Astro 输入、站点路由、内部站点链接或交互变化，因此不运行 Astro check、build、`pnpm check:links` 或 Playwright。
- 命令失败收口：`$CODEX_HOME` 缺失已有项目规则覆盖，未重复追加；只读 `gh api` 带 `-f` 默认切换 POST 并返回 pulls 422 是新的可复现模式，已在 `AGENTS.md` 增加显式 `-X GET` 规则。交付为 [PR #35](https://github.com/redreamality/openfront-intel/pull/35)。

## 本次合规自检（2026-08-16，`FRESH-01` v33.5 正式响应）

- 计划 ID：`FRESH-01`；正式非 TEST v33.5 重新打开 Production，`NUKE-01` 因 GSC 未刷新继续 Monitoring，`MAP-01` 与 `ATTACK-01` 没有新需求证据、不晋级。
- 玩家结果与唯一主落地页：五语 `/changelog/v33/` 继续承接版本意图，先直接回答 v33.5；五语 `/mechanics/modes/` 承接受管 featured/admin lobby 与普通 Host UI 的边界。首页和 FAQ 只做短答与入口，不新增 v33.5、管理员大厅或固定队伍薄页。
- 语言与旧页同步：en、zh、fr、de、nl 同批完成 v33 总览、首页、modes、FAQ、shortcuts、hotkeys 与 Water Nukes；v33.4 批量操作历史不被 v33.5 覆盖，固定键位与 Water Nukes 绕路警告推进为 v33.5 仍存在。
- 来源与视觉证据：正式 Release、tag commit、正式源码 blob 对比、代码原生表格和既有真实 Water Nukes 前后截图共同构成证据；不把 adminbot API 写成普通 Host 按钮，不把上游 main 能力写成当前规则，也没有生成或伪造游戏截图。
- 信号与验证：GSC 刷新失败后按规则回退截止 2026-08-10 的缓存；严格内容审计 40/40；Astro check 0 errors、9 个既有 hints；生产 build 230 页；内部链接 9,314 条、无断链；完整 Playwright 257/257。定向首轮 166/171 的五个失败均为首页测试仍锁定旧 x5 信号，修正测试契约后首页 5/5，随后完整套件通过；构建生成 JSON 噪声已恢复。
- 阻塞与 PR：无内容、语言或验证阻塞；[PR #33](https://github.com/redreamality/openfront-intel/pull/33) 经最新 main、`CLEAN / MERGEABLE`、0 checks/statuses、0 review/评论/thread、单提交、精确范围和远端 head 门禁后 squash 合并为 `29eea4ca6a1b60d5952417b79e487312a9feb49c`，精确远端分支已删除，本地已回到并 fast-forward-only 同步最新 `main`。

## 本次合规自检（2026-08-15，`FRESH-01` v33.4 键位边界纠错）

- 计划 ID：`FRESH-01`；当前正式版事实错误重新打开 Production，`MAP-01` 同轮完成第一轮 Incubation 来源决策。
- 玩家结果与唯一主落地页：五语 `/shortcuts/` 继续作为完整查键主答案，明确 v33.4 大多数设置项可重映射，但 `F` 全选战舰、图形重置 `R` 与框选 `Shift` 仍固定；五语 `/guides/hotkeys/` 只同步直接答案、故障恢复和 FAQ，不复制第二套表，也不新增路由。
- 版本与来源边界：最新正式非 TEST Release 仍为 `v0.33.4`、tag commit `20c813f`；正式 `UserSettingModal.ts` 没有三个设置项，未发布 `ead15d8` 才补齐。页面链接两方源码，不把上游 main 写成当前能力。
- 语言、旧页与孵化结论：en、zh、fr、de、nl 同批完成 shortcuts / hotkeys；两类既有页面互链与其余键位表不变。Caribbean 约 10% 陆地、Danish Straits 约 55% 陆地且地形决策不同，但精确 GSC / Issues 需求为 0，`MAP-01` 继续 Incubation、不建模板页。
- 视觉证据：五语 shortcuts 使用代码原生来源框、键位表和可核验文字，链接正式源码与未发布补齐提交；没有使用或伪造游戏截图，也没有交互变化。
- 信号与验证：GSC 7/28 天刷新及各自唯一重试均无输出，回退 2026-08-13 生成、截止 2026-08-10 的未刷新缓存；严格内容审计 40/40；Astro check 0 errors、9 个既有 hints；生产 build 230 页；内部链接 9,314 条、无断链；shortcuts / hotkeys 定向 e2e 20/20；完整 Playwright 257/257；构建生成 JSON 噪声已恢复。
- 阻塞与 PR：无内容、语言或验证阻塞；[PR #31](https://github.com/redreamality/openfront-intel/pull/31) 经最新 main、CLEAN/MERGEABLE、0 checks/statuses、0 review/评论/thread、单提交、精确范围和远端 head 门禁后 squash 合并为 `8926aad`，远端主题分支已删除。定向 e2e 首轮 18/20 仅暴露已有规则覆盖的多语断言差异；Git HTTPS push/fetch 各两次失败后按既有 API 恢复协议收口，本地重建 GitHub 签名 commit 时确认签名末尾空 continuation 行必须保留，对应新规则写入 `AGENTS.md`。

## 本次合规自检（2026-08-14，`ROOM-01` 私人房设置纠错）

- 计划 ID：`ROOM-01`；从 Incubation 晋级为一次 Production 事实纠错，并在同轮关闭独立页候选。
- 玩家结果与唯一主落地页：五语 `/mechanics/modes/` 继续作为模式与私人房决策唯一主答案，按公平朋友局、固定队伍训练、机制实验和赛事连续多局四种目标给出当前 Host UI 可执行配置、失败反例、对手反制和开局前复核；没有新增 `/guides/private-room-settings/` 或复制菜单字段的第二页。
- 版本与来源边界：最新正式非 TEST Release 仍为 `v0.33.4`；正式 tag 的 `HostLobbyModal.ts`、`GameConfigSettings.ts` 与 `Schemas.ts` 是当前设置边界，#2489 preset 已批准进入 v34 但尚未交付，#4951 尚未批准，均未写成当前能力。
- 语言与旧页同步：en、zh、fr、de、nl 同批重写 modes；五语 FAQ 改为短答导流，五语 mechanics 索引提供第二个自然入口。Water Nukes、Doomsday、联盟和 first-match 继续由既有主答案承接，不复制正文。
- 视觉证据：使用现有代码原生设置矩阵、警告框和决策表呈现可核验配置，没有使用或伪造游戏截图；来源包保留正式源码字段、界面边界、公开列房互斥和未发布计划证据。
- 信号与验证：GSC 7/28 天刷新及唯一重试均超时，明确回退到 2026-08-13 生成、截止 2026-08-10 的未刷新缓存；严格内容审计 40/40；Astro check 0 errors、9 个既有 hints；生产 build 230 页；内部链接 9,314 条、无断链；`ROOM-01` 五语定向 e2e 5/5；完整 Playwright 257/257；构建生成 JSON 噪声已恢复。
- 阻塞与 PR：无内容、语言或验证阻塞；本轮唯一内容 [PR #30](https://github.com/redreamality/openfront-intel/pull/30) 已创建，合并前按自动化自有 PR 门禁核对最新 main、checks、评论、冲突与远端 head。

## 本次合规自检（2026-08-13，Water Nukes 寻路边界与 `SPAWN-01` 决策）

- 计划 ID：`FRESH-01` + `SPAWN-01`；Production 修正当前正式版事实边界，Incubation 同轮完成候选合并取消决策。
- 玩家结果与唯一主落地页：五语 `/guides/water-nukes/` 继续承接唯一完整答案，明确 v33.4 水域可航行但运输船可能因小地图 magnitude / ocean 标记错误而绕路，并给出先观察首艘运输船、保留替代海岸或陆路的正确做法；没有新建第二个 Water Nukes 路由。
- 版本与来源边界：Issue #4760、PR #4975、提交 `c5c7d74` 和 PR 自带的两张真实前后截图共同证明当前缺陷与修复效果；正文明确修复只在上游 `main`，尚未进入最新正式 `v0.33.4` Release，不把未发布代码写成当前能力。
- 语言、旧页与孵化结论：en、zh、fr、de、nl 同批修正；现有 first-match 五语页已覆盖海岸、半岛、中心、瓶颈、备用路线与停止线，因此 `SPAWN-01` 合并进该主答案并取消独立页，下一 Incubation 锚点转为 `ROOM-01`。
- 视觉证据：使用上游 PR #4975 的两张真实游戏前后对比图；内容 e2e 断言每个五语主答案都渲染两张图片及 Issue / PR 来源链接，没有生成或伪造截图。
- 验证结果：GSC 7/28 天主动刷新成功且未回退缓存；严格内容审计 40/40；Astro check 0 errors、9 个既有 hints；生产 build 230 页；内部链接 9,289 条、无断链；Water Nukes 发现性定向 e2e 5/5；完整 Playwright 252/252。内容完整性首次 135/136，唯一失败是法语渲染将直撇号排版为 `’` 而测试仍期待 `'`；校准渲染文本契约后定向 1/1 与完整套件均通过，对应规则已写入 `AGENTS.md`。
- 阻塞与 PR：无内容、语言或验证阻塞；[PR #28](https://github.com/redreamality/openfront-intel/pull/28) 在最新 main、`CLEAN / MERGEABLE`、0 checks/statuses、无 review/评论/thread 且远端 head 等于本地提交后，通过 REST squash 合并为 `8be391b`。远端主题分支已删除，本地已回到并 fast-forward-only 同步最新 `main`。

## 本次合规自检（2026-08-12，`ATTACK-01` 孵化与三通道迁移）

- 计划 ID：`RUN-GOVERNANCE` + `ATTACK-01` Incubation；先收口上轮唯一自动化 PR #25，再执行本轮信号刷新与候选决策；本轮交付为 [PR #26](https://github.com/redreamality/openfront-intel/pull/26)。
- 战略推进：旧的活跃 `Now / Next / Later` 已迁移为 Production / Monitoring / Incubation。Production 当前为空；`NUKE-01` 留在 Monitoring 且设定可判定后切片门槛；`ATTACK-01` 成为首个孵化锚点并作出“继续孵化、不晋级”结论。
- 为何没有玩家页：Water Nukes 的 7 天窗口混入 6 天修复前数据，单日又因匿名化返回 0 Query；攻击比例精确需求只有 1 次展现，上游 #4237 还使高比例连续点击行为不稳定。现在写五语页会把未定风险包装成技巧，并增加薄页维护成本。
- 唯一主落地页与边界：Water Nukes 继续只由五语 `/guides/water-nukes/` 承接；经济与储备继续由五语 `/mechanics/economy/` 承接。`/guides/attack-ratio/` 只保留为候选，未来若晋级只回答滑杆、单次/连续发送与局势用量。
- 语言、旧页与视觉证据：en、zh、fr、de、nl 玩家内容均未修改，旧页同步范围为 0。研究只引用正式 v33.4 源码、上游 Issue、GSC 聚合和 Feedlog / GitHub 状态，没有截图或伪造游戏画面。
- 验证结果：GSC 7/28 天主动刷新成功，额外单日报告确认低量匿名化；严格 content audit 40/40；`git diff --check`、Markdown 本地/远端来源链接、UTF-8 BOM、终止换行、旧通道标题和文件范围审计通过。没有 Astro 输入、路由、生成数据、玩家正文或交互变化，因此不运行 Astro check、build、link check 或 Playwright。

## 本次合规自检（2026-08-12，`FRESH-01` v33.4 响应交付日）

- 计划 ID：`FRESH-01` v33.4 正式版本响应；`NUKE-01` 继续保留在 Monitoring，不让旧 GSC 窗口阻塞正式 Release。
- 是否推进当前战役退出条件：是。五语版本总览、首页入口、完整查键页、hotkeys 工作流、Water Nukes 主答案和核武机制已统一到 `v0.33.4` 的批量操作、上限与 Silo 发射时序，本轮正式版本响应达到完成定义。
- 为何未制造薄页：v33.3 只有地图小修与单人归档修复，没有独立玩家决策；v33.4 的变化由既有 v33 总览与常青主答案完整承接，因此没有建立 `/changelog/v33.3/`、`/changelog/v33.4/` 或第二个核武页面。
- 唯一主落地页：版本意图由五语 `/changelog/v33/` 承接；查键意图由五语 `/shortcuts/` 承接，训练与实战工作流由 `/guides/hotkeys/` 承接；Water Nukes 意图继续只由五语 `/guides/water-nukes/` 承接。首页和核武机制页只做入口与精确事实同步，不复制主答案。
- 语言状态：en、zh、fr、de、nl 同批完成，没有 24/72 小时待补项；五语一致说明热键 x1/x5、径向菜单数量、最多 50 次、递增升级成本、Silo 容量、同一 Silo 逐 tick、不同 Silo 同 tick，以及 Hydrogen Bomb / MIRV 仍为单次操作。
- 旧页同步范围：5 个 v33 总览、5 个首页入口、5 个 shortcuts、5 个 hotkeys、5 个 Water Nukes、5 个核武机制页及共享来源面板；未受影响的 first-match、Doomsday 与策略正文不做日期噪声更新。
- 视觉证据类型：正式 Release、v33.4 tag 源码、代码原生表格与文字解释；没有真实截图时未生成或伪造游戏画面。
- 验证结果：GSC 7/28 天主动刷新成功且未回退缓存；严格内容审计 40/40；Astro check 0 errors、9 个既有 hints；生产构建 230 页；内部链接 9,289 条、无断链；新鲜度定向 e2e 40/40；Water Nukes 发现性定向 e2e 5/5；完整 Playwright 247/247（`--workers=1`）；`git diff --check`、BOM、旧版本字面值与范围审计在提交前完成。首轮回归暴露 10 条旧摘要事实映射和 5 条旧版本断言，修正测试契约后全量通过，规避规则已写入 `AGENTS.md`。
- 阻塞与 PR：无内容、语言或验证阻塞；[PR #23](https://github.com/redreamality/openfront-intel/pull/23) 在 `CLEAN / MERGEABLE`、无 checks 配置、无 review/评论且远端 head 与本地一致后，通过 REST squash 合并为 `b59c840`。远端主题分支已删除，本地已回到并 fast-forward-only 同步最新 `main`。

## 本次合规自检（2026-08-11，`NUKE-01` 发布后观察）

- 计划 ID：`NUKE-01`。
- 是否推进当前战役退出条件：是。入口交付已经完成，本轮补齐五语 URL 级收录证据，并证明当前 GSC 截止日早于修复，避免用无效窗口误判成成功或失败。战役继续等待首个截止日至少为 2026-08-10 的稳定窗口。
- 为何未制造薄页：五语唯一主答案均已收录，正文已经覆盖定义、触发、进攻、防守、失败反例和对手反制；当前缺口只是发布后观测。继续扩写或新建第二页不会产生有效证据。
- 唯一主落地页：各语言 `/guides/water-nukes/`；guides 索引与 hotkeys 仍只负责导流。
- 语言状态：en、zh、fr、de、nl 全部已发布、已收录、允许抓取并采用 self-canonical，没有 24/72 小时待补项。
- 旧页同步范围：0。只更新研究来源包、本账本和 1 条与本轮失败对应的项目避坑规则；不改玩家正文、入口、路由、生成数据或交互。
- 视觉证据类型：正式 Release、GitHub commit、GSC Query × Page 聚合和 URL Inspection；没有截图或伪造游戏画面。
- 验证结果：严格 content audit 40/40；`git diff --check`、Markdown 链接目标、UTF-8 BOM 与工作区范围审计通过。没有站点输入、路由、生成数据或交互变化，因此不运行 build、link check 或 Playwright。
- 阻塞与 PR：可用 GSC 截止日为 2026-08-08，早于入口修复，这是数据等待条件而非内容阻塞。[PR #21](https://github.com/redreamality/openfront-intel/pull/21) 已通过最终门禁并由 REST squash 合并为 `8b9c04d`，远端主题分支已删除。

## 本次合规自检（2026-08-10，`NUKE-01` 入口交付日）

- 计划 ID：`NUKE-01`。
- 是否推进当前战役退出条件：是。五语 guides 索引和 hotkeys 两类真实错落地页已直接导向 Water Nukes 唯一主答案；索引按 `updatedDate ?? pubDate` 展示最近核验顺序和本地化更新时间，完成当前战役的交付侧退出条件。下一步只观察发布后的完整 GSC 窗口。
- 为何未制造薄页：现有五语专页已经直接回答定义、触发、进攻、防守、失败反例与对手反制；缺口是入口与旧发布时间排序，而不是答案不足。本轮没有新路由，也没有创建第二个 Water Nukes、控制或核武页面。
- 唯一主落地页：各语言 `/guides/water-nukes/`。`/guides/` 与 `/guides/hotkeys/` 只做明确意图分流，不复制地形转换、攻击时机或防守答案；专页原有机制、核武和海战等自然下一步入口继续保留。
- 语言状态：en、zh、fr、de、nl 全部完成，没有 24/72 小时待补项；五语入口职责、`v33.2` 适用范围、2026-08-10 核验日期、列表排序和 Water Nukes 结论一致。
- 旧页同步范围：5 个 guides 索引、5 个 hotkeys 旧攻略、5 个 Water Nukes 新鲜度摘要、2 个 e2e 文件、战略、本账本与 9 条本轮命令失败规避规则；没有修改路由、首页、导航、生成游戏数据或其它攻略正文。
- 视觉证据类型：正式 Release、上游提交核验、GSC Query × Page 数据、现有 HTML 列表与 Markdown 文本入口；没有使用或伪造游戏截图。
- 验证结果：GSC 7/28 天刷新成功且未回退缓存；严格 content audit 40/40；Astro check 0 errors、9 hints；生产 build 230 页；link check 9,279 条且无断链；Water Nukes 定向 e2e 5/5；hotkeys 定向 e2e 10/10；完整 Playwright 242/242；`git diff --check` 通过。完整套件首次 240/242：中文页面仅在完整并发中瞬时超时，单线程定向通过；荷兰语旧新鲜度断言仍锁定扩写前文案，改为稳定语义后完整复跑通过。
- 阻塞与 PR：内容、语言与验证无阻塞；prebuild 仅刷新生成时间戳和换行状态，核对业务数据无变化后已精确恢复 5 个生成 JSON。[PR #18](https://github.com/redreamality/openfront-intel/pull/18) 最终为 `CLEAN / MERGEABLE`、无 checks、review、评论或未解决 thread，远端 head 与本地一致，已由本轮通过 REST squash 合并为 `b51aff8` 并删除远端主题分支。合并后首次读取 main ref 瞬时 EOF；merge 响应和 PR 状态已确认成功，只重试该读操作一次后取得同一 SHA，未重复 merge。治理门禁中的 `gh pr view` 也曾一次 TLS handshake timeout，唯一重试成功；REST checks/status 首次误用短 SHA 返回 422/404，随后又因手抄完整 SHA 时单字符错误触发一次 422；最终改为从远端 ref 程序化传递完整 head，确认两类 checks 均为 0。对应避坑规则由治理 [PR #19](https://github.com/redreamality/openfront-intel/pull/19) 按同样门禁合并。最终清理复核中，内容 ref 的 matching-refs 首次 TLS handshake timeout；DELETE 先前已成功，只重试读操作一次后返回空数组，未重复删除；该规则由治理 [PR #20](https://github.com/redreamality/openfront-intel/pull/20) 按同样门禁合并。

## 本次合规自检（2026-08-09，`FRESH-01` v33.2 响应交付日）

- 计划 ID：`FRESH-01`。
- 是否推进当前战役退出条件：是。正式 v33.2 重新打开版本响应通道；五语版本总览、受影响的 Doomsday 主答案和首页最新版本入口已共同指向当前规则，恢复“始终是最新的”这一玩家结果。
- 为何未制造薄页：v33.2 的独立玩家决策集中在既有 Doomsday 主答案，五语 v33 系列总览已能承担版本导航；新建 `/changelog/v33-2/` 或第二篇 Doomsday 页会重复意图。本轮只深度更新现有页面，没有新路由。
- 唯一主落地页：版本影响为五语 `/changelog/v33/`；Doomsday 实战为五语 `/guides/doomsday-clock/`。首页只做入口，不复制完整答案；每篇保留版本总览、机制/相邻攻略等至少两个自然入口。
- 语言状态：en、zh、fr、de、nl 全部完成，没有 24/72 小时待补项；七档 `2/4/7/11/17/25/35%`、10 分钟宽限、30 秒警告、90 秒 40%→5% 下限、150 秒领土腐化、恢复条件和结局结论一致。
- 旧页同步范围：5 个 v33 总览、5 个 Doomsday 旧攻略、五语共享首页最新版本卡片、Release 来源面板、2 个 e2e 文件、战略、来源包和本账本；其它机制页、生成数据与路由未改。
- 视觉证据类型：正式 Release、v0.33.2 tag 源码、Markdown 数据表和现有 HTML/CSS 首页卡片；没有使用或伪造游戏截图。
- 验证结果：严格 content audit 40/40；Astro check 0 errors、9 hints；生产 build 230 页；link check 9,269 条且无断链；定向 v33 来源 1/1、五语新鲜度 5/5；完整 Playwright 237/237；diff check、18 个交付文件 BOM 和五语 Doomsday 旧 v0.33.1 来源零匹配审计通过。
- 阻塞与 PR：内容、语言和验证无阻塞；本地 OpenFrontIO clone 的唯一重试仍无法连接 GitHub 443，因此明确不刷新生成数据。内容分支首次直连 push 成功，最终账本 amend 直连两次失败后由用户指定的本地代理恢复；[PR #17](https://github.com/redreamality/openfront-intel/pull/17) 最终为 `CLEAN / MERGEABLE`、无 checks、review 或评论，远端 head 与本地一致，已由本轮通过 REST squash 合并并删除远端主题分支。

## 本次合规自检（2026-08-06，`CTRL-01` 交付日）

- 计划 ID：`CTRL-01`。
- 是否推进当前战役退出条件：恢复新鲜度战役早已退出，本轮不虚构退出进度；它推进 Next 的高价值玩家决策，并用 v33.1 版本摘要和当前源码核验巩固“答案适用于最新版本”的玩家结果。
- 为何未制造薄页：两个既有路由已经覆盖“查键”和“练操作”，问题是职责重叠而不是答案缺失；本轮没有新增 shortcuts、controls、keybinds 或 combo 页面，也没有为 Yangtze、Water Nukes 或 Doomsday 制造观察窗不足的页面。
- 唯一主落地页：五语 `/shortcuts/` 分别是本地化完整默认键位参考；五语 `/guides/hotkeys/` 只负责优先级、十分钟训练、实战序列、失败恢复和对手反制。两类页面双向连接但不复制两套完整键位表。
- 语言状态：en、zh、fr、de、nl 全部完成，没有 72 小时待补项；五语的版本范围、右键取消选中、数字键连发核弹、可重绑定、页面分工与后续入口一致。
- 旧页同步范围：5 个 shortcuts 静态页、5 个 hotkeys 旧攻略、3 个相关 e2e 文件和本账本；没有修改生成游戏数据、其它机制正文、首页或导航交互。
- 视觉证据类型：上游 `getDefaultKeybinds()` / `InputHandler` 源码、HTML 键位表、Markdown 场景决策表和文本训练序列；没有使用或伪造游戏截图。
- 验证结果：GSC 7/28 天刷新成功且未回退缓存；严格内容审计 40/40；Astro check 0 errors、9 hints；生产构建 230 页；内部链接 9,269 条、无断链；快捷键定向 e2e 20/20；右键事实定向 e2e 5/5；完整 Playwright 237/237；`git diff --check` 通过。完整套件首次 232/237，原因是旧精确文案断言仍锁定已移除表格的斜杠写法；保留事实断言并改到新正文语义后全量复跑通过。
- 阻塞与 PR：无内容、语言或验证阻塞；[PR #15](https://github.com/redreamality/openfront-intel/pull/15) 已按自动合并门禁 squash 合入。其余候选均受观察窗或来源包不足约束，因此不制造第二个内容主题。

## 本次执行规则自检（2026-08-05，自动合并授权）

- 授权来源：用户明确确认后续 PR 可以直接合入，不需要再次人工审阅。
- 自动合并范围：仅限内容循环自己创建或明确继续维护的 PR；用户分支、来源不明的 PR 和有重叠改动的 PR 不自动处理。
- 保留门禁：内容证据、唯一主落地页、多语一致、必要 audit/check/build/link/e2e、最新 main rebase、`CLEAN / MERGEABLE`、checks 状态、未解决评论、依赖顺序和远端 head SHA 全部继续核验。
- 合并方式：满足门禁后 squash merge 并删除远端分支；多个 PR 按依赖顺序逐个核对，不能用一个 PR 的验证结果代替另一个。
- 失败处理：网络或 GitHub 状态不确定时先核对 PR 状态、远端 ref 和 main SHA；确认未合并后最多重试一次，否则保留 PR 并报告。
- 工作区模式：定时任务只使用本地主题分支，不创建 worktree；启动和收尾都必须处于最新、干净的 main，多个 PR 逐个合入并逐次回 main。
- 本轮状态：[PR #9](https://github.com/redreamality/openfront-intel/pull/9) 已在本次规则调整前合并；自动合并规则已通过 [PR #10](https://github.com/redreamality/openfront-intel/pull/10) squash 合入，当前无开放内容 PR。本轮只同步定时任务与 Markdown，不改内容、路由或交互。

## 本次合规自检（2026-08-05，`ECON-01` 交付日）

- 计划 ID：`ECON-01`，同时通过事实错误优先通道修正人口上限公式。
- 是否推进当前战役退出条件：本轮开始时恢复新鲜度战役已经随 PR #8 合并达到全部退出条件，因此不伪造新的退出进度；本轮用 v33.1 新鲜度摘要、事实纠错和现有页深度刷新巩固“答案适用于最新版本”的玩家结果，并正式进入 Next。
- 为何未制造薄页：GSC 已把人口增长查询送到 `/mechanics/economy/`，该页通过扩写即可承接增长、储备、City 上限和停止扩张的同一决策链；没有拆 population、money、growth 或 worker-ratio 新路由，也没有为 Yangtze 制造无需求地图页。
- 唯一主落地页：en/zh/fr/de/nl 的 `/mechanics/economy/` 分别承接本地化经济与人口增长意图；`/strategies/economy-fundamentals/` 继续负责更广的投资选择，公式数据库只提供紧凑数据，不与主答案竞争。
- 语言状态：en、zh、fr、de、nl 全部完成，没有 72 小时待补项；五语均包含正确公式、30% 回兵警报、35–50% 增长区、约 42% 峰值、50–70% 威胁储备、80%+ 上限抑制、City 每级 +250,000 和三组相同示例。
- 旧页同步范围：修正 `scripts/extract-game-data.mjs` 的公式生成源并重新生成 `src/data/formulas.json`；五语经济页同步直接答案、版本摘要、场景、失败反例、反制和来源。现有五语 mechanics 索引与 first-match 已各提供一个自然入口，并由 e2e 锁定；无事实变化的相邻页不做噪声改稿。
- 视觉证据类型：v0.33.1 源码、生成公式数据、HTML 表格和文本局势；没有使用或伪造游戏截图。
- 验证结果：GSC 7/28 天刷新成功且未回退缓存；严格内容审计 40/40；Astro check 0 errors、9 个既有 hints；生产构建 230 页；内部链接 9,249 条、无断链；定向内容完整性 e2e 126/126；完整 Playwright 220/220（均 `--workers=1`）；`git diff --check` 与 UTF-8 BOM 审计通过。
- 阻塞与 PR：无内容阻塞；[PR #9](https://github.com/redreamality/openfront-intel/pull/9) 已于 2026-08-05 合并。Water Nukes 仍在上线后观察窗，controls/hotkeys 需要先完成两页分工设计，其他候选缺少可靠需求或来源，因此不制造第二个内容 PR。

## 本次合规自检（2026-08-04，`DOOM-01` 交付日）

- 计划 ID：`DOOM-01`。
- 是否推进当前战役退出条件：是。五语 Doomsday Clock 独立实战主答案、相邻入口、来源包和回归测试已完成，当前战役的四个计划项全部达到完成定义。
- 为何未制造薄页：Doomsday 的独立玩家问题原先错误落到版本总览，新增一个唯一主答案有真实 GSC 错落地证据；没有按速度、波次或小版本继续拆分第二个页面，v32/v33 只保留版本背景与自然入口。
- 唯一主落地页：en/zh/fr/de/nl 的 `/guides/doomsday-clock/` 分别承接本地化实战意图；版本总览不再承担完整操作答案。正文直接纠正“地理安全圈”误解，并覆盖宽限期、六档门槛、两张完整时间表、警告救场、速度档、领土形状、衰减、团队规则、反制和结算。
- 语言状态：en、zh、fr、de、nl 全部完成，没有 72 小时待补项；五语均有 55 个 H2–H4，英文约 3,816 词、法语约 3,758 词、德语约 3,228 词、荷兰语约 3,416 词、中文约 5,453 汉字。4/9/16/26/40/55%、10 分钟、30 秒、2%→5%、1%→50%、5% 下限、团队合计、领先方豁免与不自动判胜等事实一致。
- 旧页同步范围：五语 v32 与 v33 系列总览共 10 个相邻页面修正“抢中心/安全圈”错误并各补一个自然入口；核心内容审计新增五语 Doomsday 页面，内容完整性 e2e 同步验证主答案与两代版本入口。
- 视觉证据类型：源码与 Release 可追溯来源、Markdown 波次表、状态/决策表和文本场景；没有使用或伪造游戏截图。
- 验证结果：GSC 7/28 天成功刷新至 2026-08-02；深度扩写后严格内容审计 40/40；Astro check 0 errors、9 个既有 hints；生产构建 230 页；内部链接 9,224 条、无断链；Doomsday 定向 e2e 15/15；完整 Playwright 209/209（`--workers=1`）；`git diff --check` 通过。
- 阻塞与 PR：无内容阻塞；今天唯一的待审 [PR #8](https://github.com/redreamality/openfront-intel/pull/8) 已创建，不自动合并。

## 本次合规自检（2026-08-04，`FRESH-01` v33.1 响应交付日）

- 计划 ID：`FRESH-01`。
- 是否推进当前战役退出条件：是。五语 v33 系列总览已从 beta1 校准到正式 `v0.33.1`，受影响旧页也明确显示当前正式来源；本次重新打开的版本响应已完成，当前战役合并后恢复 `DOOM-01`。
- 为何未制造薄页：v33.1 只有两项可靠性与显示修复，不形成独立玩家决策；它们被吸收到既有 `/changelog/v33/` 系列总览，没有创建 `/changelog/v33.1/` 或其他新路由。
- 唯一主落地页：五语 `/changelog/v33/` 继续统一承接 v33.0 与 v33.1 玩家影响；机制、FAQ 与攻略页只同步版本新鲜度和相关来源，不复制版本总览意图。
- 语言状态：en、zh、fr、de、nl 全部完成，没有 72 小时待补项；两项热修、数字、键位、版本范围和“不改变既有实战结论”的判断一致。
- 旧页同步范围：5 个 v33 总览、15 个 first-match/hotkeys/water-nukes 指南、10 个 nuclear-deterrence/team-naval-control 策略页，以及 15 个 FAQ/mechanics/nukes 页面；共 30 个 MDX 文件刷新核验日期，15 个 Astro 页面同步正式版措辞。
- 视觉证据类型：Release 正文、源码链接、生成数据、现有数据表与 HTML/CSS 内容；没有新增或伪造游戏截图。
- 验证结果：GSC 7/28 天均成功刷新至 2026-08-02；严格内容审计 35/35；Astro check 0 errors、9 个既有 hints；生产构建 225 页；内部链接 8,979 条、无断链；定向内容 e2e 100/100；完整 Playwright 194/194（`--workers=1`）。
- 阻塞与 PR：无内容阻塞；今天唯一的待审 [PR #7](https://github.com/redreamality/openfront-intel/pull/7) 已创建，不自动合并。`DOOM-01` 等待该 PR 合并。

## 本次合规自检（2026-08-03，`FRESH-03` 交付日）

- 计划 ID：`FRESH-03`。
- 是否推进当前战役退出条件：是。五语首页的首屏按钮和首个内容区已突出最新版本变化、第一次玩、快捷键与经济增长，原始数字降为后续参考；`FRESH-03` 达到完成定义，当前战役只剩 `DOOM-01`。
- 为何未制造薄页：本次只重构五个既有首页并抽取共享入口组件，没有新增内容路由，也没有把 v33 小修复拆成版本薄页。
- 唯一主落地页：首页只承担分发，不复制答案；四个意图继续分别由 `/changelog/v33/`、`/guides/first-match/`、`/shortcuts/` 与 `/mechanics/economy/` 承接。
- 语言状态：en、zh、fr、de、nl 全部完成；四个入口的顺序、版本范围、链接目标和结论一致，没有待补语言。
- 旧页同步范围：同步五语首页、共享 `HomePriorityPaths` 组件和首页 i18n 文案；没有改动旧攻略正文或生成数据。
- 视觉证据类型：HTML/CSS 原生入口卡片与可核验文本；没有使用或伪造游戏截图。
- 验证结果：严格内容审计 35/35；Astro check 0 errors、9 个既有 hints；生产构建 225 页；内部链接 8,979 条、无断链；首页定向 e2e 5/5；完整 Playwright 194/194（`--workers=1`）。并行套件两次只在 `browserContext.newPage` 阶段出现资源争用，相关用例单线程复跑通过，业务断言无失败。
- 阻塞：无内容阻塞。今天唯一的待审 [PR #6](https://github.com/redreamality/openfront-intel/pull/6) 已创建，不自动合并；`DOOM-01` 等待该 PR 合并。

## 本次合规自检（2026-08-03，`FRESH-02` 待审复核日）

- 计划 ID：`FRESH-02`。
- 是否推进当前战役退出条件：今天没有新增内容交付；确认现有交付仍可合并，并保护它不被并行的 `FRESH-03` 基线冲突拖慢。退出条件仍需 PR #5 合并、`FRESH-03` 与 `DOOM-01` 完成。
- 为何未制造薄页：没有新正式 Release、已确认事实错误或独立玩家问题；tag 后修复不改变站内结论，不能据此拆小版本页。
- 唯一主落地页：仍由 PR #5 中的 7 个既有核心答案承接各自意图；今天没有新增或竞争路由。
- 语言状态：en、zh、fr、de、nl 的 `FRESH-02` 内容仍为 35/35 完成；今天没有新增待补语言。
- 旧页同步范围：今天未改旧攻略正文；待审范围仍为 7 个核心答案 × 5 语。
- 视觉证据类型：今天没有新增视觉；待审交付使用代码原生静态摘要和可核验文本，没有伪造截图。
- 验证结果：严格内容审计 35/35；`git diff --check` 通过；账本为 UTF-8 无 BOM、无尾随空白。今天只改执行账本，没有路由、正文事实或交互变化，因此不重复运行 build、link check 或 Playwright。
- 阻塞（早间复核时）：[PR #5](https://github.com/redreamality/openfront-intel/pull/5) 尚未合并，状态为 `CLEAN / MERGEABLE`；随后已由用户合并，`FRESH-03` 前置门禁解除。

## 本次合规自检（2026-08-02，`FRESH-02` 交付日）

- 计划 ID：`FRESH-02`。
- 是否推进当前战役退出条件：是。35 个核心五语页面已经在正文顶部显示适用版本、最后核验日期和本版本最重要变化，`FRESH-02` 达到完成定义；当前战役下一项转为 `FRESH-03`。
- 为何未制造薄页：新鲜度问题由现有 7 个主答案承接，共享组件和 frontmatter 字段解决展示与维护问题；没有新增内容路由。
- 唯一主落地页：`first-match`、`hotkeys`、`water-nukes`、`economy-fundamentals`、`ffa-opening`、`nuclear-deterrence`、`team-naval-control` 继续分别服务原有唯一意图；本次没有竞争页面。
- 语言状态：en、zh、fr、de、nl 全部完成，35/35 页面均为 `v33`、核验日期 `2026-08-02`，数字、键位、版本范围和结论一致。
- 旧页同步范围：7 个核心答案 × 5 语，共 35 页；hotkeys 五语正文中的核验参考同时从 v32 更新为 v33。
- 视觉证据类型：代码原生静态摘要组件与可核验文本；没有使用截图或生成游戏画面。
- 验证结果：严格内容审计 35/35；生产构建 225 页；内部链接 8,964 条；定向内容 e2e 100/100；完整 Playwright 189/189；提交前 `git diff --check` 通过。
- 阻塞：无内容阻塞。[PR #5](https://github.com/redreamality/openfront-intel/pull/5) 已创建并保持待审，不自动合并。

## 本次合规自检（2026-08-06，当前文件整理）

- 计划 ID：`RUN-GOVERNANCE`。这是用户在内容循环被脏工作区门禁阻止后直接要求的文件整理，不是新内容候选，也不声称推进已退出的当前战役。
- 文件处理：先把 11 个非缓存文件原样保存到仅本地的安全提交 `169700d`，再从 GitHub 当前 `main` 建立整理分支；最新版 `content-strategy.md`、本账本和两份已合入研究记录均未被旧副本覆盖，`.cache/**` 未 stage、修改或删除。
- 为何未制造薄页 / 唯一主落地页：没有创建玩家页面或路由；只校正 README 版本事实、标记历史文档、补内容维护入口与 Issue 模板，因此主落地页不适用。
- 语言状态 / 旧页同步范围：没有修改 en、zh、fr、de、nl 发布内容；范围仅为 README、三份历史文档、Search Console 流程文档、Issue 模板和项目避坑规则。
- 视觉证据类型：不适用；没有截图、解释图或游戏画面。
- 验证结果：严格内容审计 40/40；README 清单核对为 4 篇 guides、4 篇 strategies、v24–v33 与 v33 内置快照；Issue 模板 frontmatter、文档链接目标、UTF-8 BOM 和 `git diff --check` 均通过。没有 Astro 输入、路由、生成数据或交互变化，因此不运行 build、link check 或 e2e。
- 阻塞与 PR：原始文件已安全保留；网络恢复后 [PR #14](https://github.com/redreamality/openfront-intel/pull/14) 已于 2026-08-06 squash 合并为 `e620b97`，远端主题分支已删除，本地与远端 `main` 已核对一致。本次文件整理本身未刷新 GSC 或生产内容，也没有被写成玩家需求信号。

## 已完成

- [x] 2026-08-20：完成正式 `v0.33.6` 的 `FRESH-01` 响应；五语 v33 总览与首页入口直接回答版本化回放和版本不匹配边界，来源面板同步 v0.33.6，完整回归 257/257 通过；[PR #36](https://github.com/redreamality/openfront-intel/pull/36) 已合并为 `62bb30f`。`MAP-01` / `ATTACK-01` 继续 Incubation。
- [x] 2026-08-19：`NUKE-01` 在首个有效后切片中达到退出条件；7 天 Water Nukes 专页以 97 次展现和全部 3 次点击成为主要落地页，Monitoring 关闭。`MAP-01` / `ATTACK-01` 继续 Incubation；本轮只提交决策、来源包和一条新命令规避规则，交付为 [PR #35](https://github.com/redreamality/openfront-intel/pull/35)。
- [x] 2026-08-16：完成正式 `v0.33.5` 的 `FRESH-01` 响应；五语 v33 总览、首页与 modes 区分受管 featured/admin lobby 和普通 Host UI，shortcuts / hotkeys / Water Nukes 保留两个未发布修复的当前版本警告，完整回归 257/257 通过；[PR #33](https://github.com/redreamality/openfront-intel/pull/33) 已合并为 `29eea4c`。
- [x] 2026-08-15：完成 `FRESH-01` v33.4 键位重映射边界纠错；五语 `/shortcuts/` 与 `/guides/hotkeys/` 区分大多数可配置动作和固定的 `F` / 图形重置 `R` / 框选 `Shift`，正式与未发布来源可核验，完整回归 257/257 通过；[PR #31](https://github.com/redreamality/openfront-intel/pull/31) 已合并为 `8926aad`。`MAP-01` 继续 Incubation、不建页。
- [x] 2026-08-14：完成 `ROOM-01`；五语 `/mechanics/modes/` 按四种房间目标纠正普通 Host UI 设置边界，FAQ 与 mechanics 索引提供两个自然入口，独立私人房攻略候选取消；完整回归 257/257 通过，交付于 [PR #30](https://github.com/redreamality/openfront-intel/pull/30)。
- [x] 2026-08-13：完成 v33.4 Water Nukes 舰船绕路事实边界纠错；五语唯一主答案区分当前正式缺陷与未发布修复，加入两张真实前后截图，完整回归 252/252 通过；`SPAWN-01` 合并进 first-match 并取消重复独立页候选；交付于 [PR #28](https://github.com/redreamality/openfront-intel/pull/28)。
- [x] 2026-08-12：完成正式 `v0.33.4` 的 `FRESH-01` 响应；五语 v33 总览、首页、shortcuts、hotkeys、Water Nukes 与核武机制同步批量操作和 Silo 发射时序，没有新建小版本或重复核武页面，完整回归 247/247 通过；[PR #23](https://github.com/redreamality/openfront-intel/pull/23) 已合并。
- [x] 2026-08-11：完成 `NUKE-01` 发布后观察来源包；五语 Water Nukes 专页均为 PASS / Submitted and indexed，当前 GSC 截止日早于入口修复，因此保留唯一主答案并等待有效窗口，没有制造新页面；[PR #21](https://github.com/redreamality/openfront-intel/pull/21) 已合并。
- [x] 2026-08-10：完成 `NUKE-01`；五语 guides 索引与 hotkeys 均导向 Water Nukes 唯一主答案，索引按最近核验日期排序并显示本地化更新时间，没有新增路由或重复正文，完整回归 242/242 通过；[PR #18](https://github.com/redreamality/openfront-intel/pull/18) 已合并。
- [x] 2026-08-09：完成正式 `v0.33.2` 的 `FRESH-01` 响应；五语 v33 总览、Doomsday 主答案与首页入口已同步七档门槛、下限衰减和领土腐化，没有新建重复小版本页，完整回归 237/237 通过；[PR #17](https://github.com/redreamality/openfront-intel/pull/17) 已合并。
- [x] 2026-08-06：完成 `CTRL-01`；五语 `/shortcuts/` 成为 v33.1 唯一完整查键页，五语 `/guides/hotkeys/` 改为训练、实战序列、失败恢复与反制页，双向入口和 237 条完整回归通过；[PR #15](https://github.com/redreamality/openfront-intel/pull/15) 已合并。
- [x] 2026-08-06：安全整理启动门禁发现的本地文件；旧战略/账本保留最新版，仍有效的 README、历史状态、Issue 模板和避坑规则交付至 [PR #14](https://github.com/redreamality/openfront-intel/pull/14)。
- [x] 2026-08-05：定时任务改为直接在本地主题分支执行，PR 合入后回到 main，不再创建 worktree；脏工作区会停止并报告。
- [x] 2026-08-05：通过已合并 [PR #10](https://github.com/redreamality/openfront-intel/pull/10) 同步自动化与 Markdown 的合并权限；后续自动化 PR 在完整质量门禁通过后直接 squash merge，不再等待人工审阅。
- [x] 2026-08-05：完成 `ECON-01` 与人口上限事实纠错；五语 `/mechanics/economy/` 直接回答停止扩张、部队甜区、威胁储备和 City 上限，公式生成源同步修正，两个自然入口与完整回归通过；[PR #9](https://github.com/redreamality/openfront-intel/pull/9) 已合并。
- [x] 2026-08-04：完成 `DOOM-01` 并按用户审阅反馈深度扩写；五语独立实战攻略补齐六轮时间线、公式取整、四档速度、30 秒救场、领土形状矩阵和 FAQ，v32/v33 十个相邻页纠错并导流，当前战役退出条件全部满足；待审 [PR #8](https://github.com/redreamality/openfront-intel/pull/8)。
- [x] 2026-08-04：完成正式 `v0.33.1` 的 `FRESH-01` 响应；五语 v33 系列总览吸收回放 desync 与 tribe 排行榜修复，40 个相邻页面同步正式来源，未新建小版本薄页；[PR #7](https://github.com/redreamality/openfront-intel/pull/7) 已合并。
- [x] 2026-08-03：完成 `FRESH-03`，五语首页首屏和首个内容区依次突出 v33 玩家影响、第一局、快捷键与经济增长；栏目索引和数字卡降为次级浏览与参考，没有新增页面；待审 [PR #6](https://github.com/redreamality/openfront-intel/pull/6)。
- [x] 2026-08-03：完成本周首次校准与 PR #5 发布前复核；正式 Release、上游、GSC、Issues 和 Feedlog 均无打断理由；[PR #5](https://github.com/redreamality/openfront-intel/pull/5) 随后已由用户合并。
- [x] 2026-08-02：完成 `FRESH-02`，为 7 个核心答案 × 5 语补统一的新鲜度摘要、v33 适用范围、核验日期、严格审计和逐页 e2e；没有新增页面；[PR #5](https://github.com/redreamality/openfront-intel/pull/5) 已合并。
- [x] 2026-08-01：建立 [`content-strategy.md`](content-strategy.md)，把内容原则、当前战役、Next/Later、版本响应、多语节奏、Feedlog 选题池与停止规则从每日账本中分离。
- [x] 2026-08-01：更新自动化 `openfront`，令其先读战略、写每日编辑判断、按战役退出条件选任务，并允许无文章的研究/复盘日。
- [x] 2026-08-01：完成 `FRESH-02` 来源包与范围审计，确认 35 个核心本地化页面、共享布局缺口、语言状态和下一次验证门禁；今天未创建第二个 PR。
- [x] 2026-08-01：完成 OpenFrontIO `v0.33.0-beta1` 五语玩家版 Release Notes，并同步相关机制、快捷键、地图和策略；[PR #4](https://github.com/redreamality/openfront-intel/pull/4) 已合并。
- [x] 2026-07-31：依据 v0.32.18 修正 MIRV/SAM 五语事实错误并同步相邻页面；[PR #3](https://github.com/redreamality/openfront-intel/pull/3) 已合并。
- [x] 2026-07-31：刷新 Search Console 7 天与 28 天本地报告，并把 query 合并为玩家意图。
- [x] 2026-07-31：完成 OpenFront v32 五语内容升级并合并 [PR #2](https://github.com/redreamality/openfront-intel/pull/2)。
- [x] 2026-07-31：将内容循环改为每日执行，建立定时任务 `openfront`。
- [x] 2026-07-31：把旧的内容差距、上游差异和项目概览文档标记为历史资料。

## 每日运行记录

| 日期 | 计划 ID | 玩家结果与完成 | 新增或变化 | 验证 | 下一决策点 |
|---|---|---|---|---|---|
| 2026-07-31 | 运行体系 | 建立每日执行手册与定时任务 `openfront` | 频率由每周改为每天；新增品牌词错落地观察项 | `git diff --check` 通过 | 刷新 7 天和 28 天 Search Console 报告 |
| 2026-07-31 | 事实纠错 | 通过 [PR #3](https://github.com/redreamality/openfront-intel/pull/3) 修正 MIRV/SAM 事实，并同步现有主落地页和生成数据 | GitHub Issues/Feedlog 无真实重复问题；新增地图刷新和 controls 重复意图 | content audit 35/35；build 220 页；links 8,739；完整 e2e 142/142 | 响应下一正式 Release；否则推进当前战役 |
| 2026-08-01 | `FRESH-01` | 完成 `v0.33.0-beta1` 五语玩家影响总览和受影响页面同步；[PR #4](https://github.com/redreamality/openfront-intel/pull/4) 已合并 | 新增 Doomsday 独立攻略后续项；地图刷新并入版本任务 | content audit 35/35；build 225 页；links 8,964；完整 e2e 154/154 | 按战役顺序推进 `FRESH-02` |
| 2026-08-01 | 内容运行体系 | 将战略计划与每日账本分离，建立当前战役、计划 ID、退出条件、信号池和非机械选择门槛 | 多语改为紧急 en+zh / 72 小时补齐；Feedlog 改为按真实问题和票数维护的选题池；自动化 `openfront` 已同步新规则 | 自动化更新成功；文档链接与 Markdown 结构待本轮校验 | PR #4 合并后执行 `FRESH-02` |
| 2026-08-01 | `FRESH-02` | 完成研究日交付：确认 7 个核心答案 × 5 语的顶部新鲜度缺口、共享布局方案与验证门禁 | PR #4 已合并；GSC 候选顺序不变；在线 Release/Issues/Feedlog 刷新因 TLS 超时保持未确认 | 内容审计 35/35；diff check、UTF-8 无 BOM 与尾随空白检查通过；docs-only，未跑 build/link/e2e | 下一次从最新 main 实施 35 页统一摘要；`FRESH-03`、`DOOM-01` 继续等待 |
| 2026-08-02 | `FRESH-02` | 35 个五语核心页面已在直接答案前显示 v33、核验日期和页面专属变化摘要；没有新建页面；[PR #5](https://github.com/redreamality/openfront-intel/pull/5) 后于 8 月 3 日合并 | 最新 Release 不变；记录 tag 后核弹路径修复；Issues 为 0，Feedlog 仍为 0 票/0 评论 welcome | audit 35/35；build 225 页；links 8,964；定向 e2e 100/100；完整 e2e 189/189；diff check 通过 | 合并完成，执行 `FRESH-03` |
| 2026-08-03 | `FRESH-02` | 完成本周首次校准和早间待审复核；PR #5 当时为 `CLEAN / MERGEABLE`，随后由用户合并 | 最新 Release 不变；tag 后 15 个提交未形成站内事实错误；GSC 候选不变；Issues 为 0，Feedlog 仍只有 0 票/0 评论 welcome | audit 35/35；diff check、UTF-8 无 BOM 与尾随空白检查通过；docs-only，未重复跑 build/link/e2e | 前置门禁已解除，本轮完成 `FRESH-03` |
| 2026-08-03 | `FRESH-03` | 五语首页现在先引导玩家查看 v33 变化、第一局、快捷键和经济增长，数字与栏目索引后置；没有新增路由；[PR #6](https://github.com/redreamality/openfront-intel/pull/6) 待审 | 复用四个既有唯一主答案；Next/Later 不提前；`DOOM-01` 成为当前战役下一项 | audit 35/35；Astro check 0 errors、9 hints；build 225 页；links 8,979；首页 e2e 5/5；完整 e2e 194/194（单线程） | PR #6 合并后启动 `DOOM-01` |
| 2026-08-04 | `FRESH-01` | 正式 v33.1 已并入五语 `/changelog/v33/`，两项热修和正式来源同步到 40 个相邻页面；未新建小版本路由；[PR #7](https://github.com/redreamality/openfront-intel/pull/7) 待审 | GSC 成功刷新至 2026-08-02；Doomsday 7 天 12 个 Query、152 次展现；Issues 为 0，Feedlog 仍只有 0 票/0 评论 welcome；extraction checkout 更新到 `0668045` | audit 35/35；Astro check 0 errors、9 hints；build 225 页；links 8,979；定向 e2e 100/100；完整 e2e 194/194（单线程） | PR #7 合并后恢复 `DOOM-01` |
| 2026-08-04 | `DOOM-01` | 五语 `/guides/doomsday-clock/` 成为唯一实战主答案，纠正安全圈误解并给出波次、撤退、团队与海战决策；v32/v33 十个相邻页同步纠错与入口；待审 [PR #8](https://github.com/redreamality/openfront-intel/pull/8) | GSC 再次刷新至 2026-08-02：7 天 825/1,563，28 天 1,110/2,479；14 个 Doomsday Query、192 次展现；上游与 extraction checkout 同为 `0668045`，无新规则变化 | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,224；定向 e2e 15/15；完整 e2e 209/209（单线程）；diff check 通过 | PR #8 合并后关闭当前战役；下一次先评估 `ECON-01` 的现有页扩写方案 |
| 2026-08-04 | `DOOM-01` 审阅修订 | 根据用户“文章太短”的反馈继续更新同一主答案；五语各新增约 175 行，补齐完整时间线、公式取整、速度档、警告救场、领土形状和 FAQ，没有拆页或创建第二个 PR | 五语均达 55 个 H2–H4；英文约 3,816 词、法语约 3,758 词、德语约 3,228 词、荷兰语约 3,416 词、中文约 5,453 汉字；事实与来源边界不变 | 扩写后 audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,224；定向 e2e 15/15；完整 e2e 209/209（单线程）；diff check 通过 | 更新 PR #8 后继续等待审阅，不提前领取 Next |
| 2026-08-05 | `ECON-01` | 修正人口上限公式并深度刷新五语 `/mechanics/economy/`，直接回答停止扩张、35–50% 增长区、约 42% 峰值、威胁储备和 City 上限；没有新增路由；[PR #9](https://github.com/redreamality/openfront-intel/pull/9) 已合并 | GSC 成功刷新至 2026-08-02：7 天 825/1,563，28 天 1,110/2,479；经济意图分别 18 Query/109 展现和 24 Query/392 展现；最新正式 Release 仍为 v0.33.1，Issues 0，Feedlog 0 票/0 评论 | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,249；定向 e2e 126/126；完整 e2e 220/220（单线程）；diff/BOM check 通过 | 观察经济主答案的收录、平均排名和错落地变化 |
| 2026-08-05 | 自动合并授权 | 定时任务和战略/账本改为：自动化自有 PR 通过完整门禁后直接 squash merge，不再等待人工审阅；[PR #10](https://github.com/redreamality/openfront-intel/pull/10) 已按该门禁合并 | PR #9 与 PR #10 均已合并；当前无开放内容 PR；保留最新 main、独立验证、checks/评论/依赖、远端 SHA 和网络失败复核门禁 | docs-only：`git diff --check`、UTF-8 BOM、旧治理规则审计；自动化已核对为 ACTIVE、每日 09:00、本地项目执行 | 后续内容 PR 在门禁满足后当轮直接合入；使用 REST 合并并核对远端状态 |
| 2026-08-05 | 本地分支执行模式 | 定时任务不再创建 worktree；从干净、最新的本地 main 创建主题分支，PR 合入后切回并同步 main | 用户直接调整执行方式；不改变内容证据、验证或自动合并门禁；当前主工作区有用户改动，因此本次只更新治理规则，不在其中切分支 | docs-only：远端三文件精确 diff、UTF-8/BOM、自动化 prompt 和 PR 合并门禁 | 下一次启动若工作区仍不干净则停止并报告，不自动处理用户文件 |
| 2026-08-06 | `RUN-GOVERNANCE` | 把阻塞自动化的 11 个非缓存文件安全分流：旧副本不覆盖最新战略/账本，有效说明与模板进入 [PR #14](https://github.com/redreamality/openfront-intel/pull/14) | README 校准到 v33；历史文档增加权威入口；新增内容循环 Issue 模板；本地避坑规则并入最新版；后续账本提交因 GitHub 443 连接失败仍在本地 | audit 40/40；清单、模板、链接目标、BOM、diff check 全部通过；无站点或交互变更，未跑 build/link/e2e | 网络恢复后先推送并核对 PR head，再决定合并；不得基于旧远端 head 自动合并 |
| 2026-08-06 | `RUN-GOVERNANCE` 合并完成 | [PR #14](https://github.com/redreamality/openfront-intel/pull/14) 已按门禁 squash 合并为 `e620b97`，远端分支已删除，本地和远端 main 对齐 | GitHub 网络恢复；没有夹带 `.cache/**` 或旧战略文件 | PR `CLEAN / MERGEABLE`、无 checks、无未解决评论；远端 head 与本地提交一致 | 继续同日 `CTRL-01` 内容交付 |
| 2026-08-06 | `CTRL-01` | 五语完整查键页与实战工作流页完成非重复分工，v33.1 右键上下文、版本核验、双向入口和失败恢复一致；没有新建页面；[PR #15](https://github.com/redreamality/openfront-intel/pull/15) 已合并 | GSC 刷新至 2026-08-04：7 天 874/1,704，28 天 1,172/2,711；五类快捷键查询形成稳定需求；Issues/开放 PR 为 0，Feedlog 仍为 0 票/0 评论 welcome | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,269；定向 e2e 20/20 + 5/5；完整 e2e 237/237；diff check 通过 | 观察两类页面错落地；Water Nukes / Doomsday 等待有效窗口，ATTACK/SPAWN/ROOM 先补来源包 |
| 2026-08-09 | `FRESH-01` | 五语 v33 总览先解释 v33.2 对下一局的影响，五语 Doomsday 旧攻略同步七档时序、下限衰减、领土腐化、恢复与反制；首页最新版本入口改为 v33.2；没有新路由；[PR #17](https://github.com/redreamality/openfront-intel/pull/17) 已合并 | GSC 刷新至 2026-08-06：7 天 880/1,802，28 天 1,225/2,928；Doomsday 17 Query/450 展现/25 点击；正式 tag 为 `e9e1070`，本地 clone 因 GitHub 443 瞬断仍为 `0668045`，未运行 extract；Issues/开放 PR 0，Feedlog 0 票/0 评论 | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,269；定向 1/1 + 5/5；完整 e2e 237/237；diff/BOM/旧来源审计通过 | 继续观察 Water Nukes；ATTACK/SPAWN/ROOM 先补成熟来源包，等待下一正式 Release |
| 2026-08-10 | `NUKE-01` | 五语 guides 索引和 hotkeys 现在把 Water Nukes 错落地查询导向既有唯一主答案；索引改按最近核验日期排序并显示本地化更新时间，没有新路由或重复正文；[PR #18](https://github.com/redreamality/openfront-intel/pull/18) 已合并为 `b51aff8` | GSC 刷新至 2026-08-08：7 天 855/1,695，28 天 1,239/2,984；Water Nukes 15 Query/482 展现/4 点击，索引 218、hotkeys 176、英文专页 4；正式 Release 仍为 v0.33.2，Issues/开放 PR 0，Feedlog 0 票/0 评论 | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,279；定向 e2e 5/5 + 10/10；完整 e2e 242/242；diff/BOM check 通过 | 观察完整发布窗口；若专页仍非主落地，优先查收录而不复制正文 |
| 2026-08-11 | `NUKE-01` 发布后观察 | 五语 Water Nukes 专页均已收录且 self-canonical；当前数据窗口早于入口修复，因此不重复改稿、不建第二页；[PR #21](https://github.com/redreamality/openfront-intel/pull/21) 已合并为 `8b9c04d` | GSC 主动刷新至 2026-08-08：7 天 897/1,797，28 天 1,258/3,055；Water Nukes 为 11 Query/137 展现与 16 Query/507 展现；Issues/开放 PR 0，Feedlog 0 票/0 评论 | docs-only：严格 audit 40/40；diff/BOM/Markdown 链接和范围审计通过；无站点或交互变化 | 等首个截止日至少为 2026-08-10 的稳定窗口，再判断落地页是否转向专页 |
| 2026-08-12 | `FRESH-01` v33.4 响应 | 五语 v33 总览、首页、shortcuts、hotkeys、Water Nukes 与核武机制同步批量操作、50 次上限、递增成本及 Silo 时序；没有新增路由；[PR #23](https://github.com/redreamality/openfront-intel/pull/23) 已合并为 `b59c840` | 正式 v0.33.4 为非 TEST Release；GSC 刷新至 2026-08-09：7 天 917/1,855，28 天 1,281/3,152；Issues/起始开放 PR 0，Feedlog 0 票/0 评论 | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,289；定向 40/40 + 5/5；完整 e2e 247/247；diff/BOM 审计通过 | `NUKE-01` 等截止日至少为 2026-08-10 的稳定窗口；继续响应下一正式 Release |
| 2026-08-12 | `ATTACK-01` 孵化 / 三通道迁移 | 收口 PR #25；把外部等待移出 Production，并为攻击比例形成稳定事实、双击风险和页面边界来源包；没有玩家页；交付 [PR #26](https://github.com/redreamality/openfront-intel/pull/26) | GSC 刷新至 2026-08-10；Water Nukes 混合窗口仍不可判定；攻击比例精确需求 1 次展现，上游 #4237 有 5 条讨论 | docs-only：严格 audit 40/40；diff/BOM/Markdown 链接和范围审计通过；无站点或交互变化 | `NUKE-01` 等有行的 8 月 11 日后切片；`ATTACK-01` 等 #4237 明确或真实重复需求 |
| 2026-08-13 | `FRESH-01` Water Nukes + `SPAWN-01` | 五语 Water Nukes 唯一主答案补 v33.4 舰船绕路边界、未发布修复和真实前后截图；`SPAWN-01` 合并进 first-match 并取消重复独立页；交付 [PR #28](https://github.com/redreamality/openfront-intel/pull/28) | GSC 刷新至 2026-08-10：7 天 921/1,867，28 天 1,298/3,229；最新正式版仍为 v0.33.4；Issues 0、Feedlog 0 票/0 评论 | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,289；发现性 5/5；完整 e2e 252/252；生成 JSON 噪声已恢复 | 正式 Release 包含 `c5c7d74` 后移除当前警告；下一 Incubation 锚点为 `ROOM-01` |
| 2026-08-14 | `ROOM-01` | 五语 modes 按公平朋友局、固定队伍训练、机制实验和赛事连续多局提供当前 Host UI 可执行配置；FAQ 与 mechanics 索引导向唯一主答案，取消独立私人房页候选；交付 [PR #30](https://github.com/redreamality/openfront-intel/pull/30) | GSC 刷新及唯一重试均超时，回退到 2026-08-13 生成、截止 2026-08-10 的 7 天 921/1,867 与 28 天 1,298/3,229；最新正式版仍为 v0.33.4；Issues/开放 PR 0，Feedlog 0 票/0 评论 | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,314；定向 e2e 5/5；完整 e2e 257/257；生成 JSON 噪声已恢复 | Production 恢复为空；`MAP-01` 成为下一 Incubation 锚点，`NUKE-01` 等截止至少 8 月 11 日且后切片有行 |
| 2026-08-15 | `FRESH-01` 键位边界 + `MAP-01` 孵化 | 五语 shortcuts / hotkeys 纠正 v33.4 “全部可重映射”错误，固定 `F` / 图形重置 `R` / 框选 `Shift` 与未发布补齐提交分开；无新路由；[PR #31](https://github.com/redreamality/openfront-intel/pull/31) 已合并为 `8926aad` | GSC 刷新及唯一重试无输出，回退截止 2026-08-10 的 7 天 921/1,867 与 28 天 1,298/3,229；最新正式版仍为 v0.33.4；地图地形差异成立但精确需求为 0 | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,314；定向 20/20；完整 e2e 257/257；diff/BOM/旧绝对说法审计通过 | Release 含 `ead15d8` 后移除固定警告；`MAP-01` 等真实问题或搜索意图；`NUKE-01` 等有效后切片 |
| 2026-08-16 | `FRESH-01` v33.5 响应 | 五语 v33 总览先解释受管 featured/admin lobby，modes 区分普通 Host UI；首页、FAQ、shortcuts、hotkeys 与 Water Nukes 同步当前版本边界，没有新增路由；[PR #33](https://github.com/redreamality/openfront-intel/pull/33) 已合并为 `29eea4c` | 正式 v0.33.5 为非 TEST Release；GSC 回退截止 2026-08-10 的 7 天 921/1,867 与 28 天 1,298/3,229；Issues/起始开放 PR 0，Feedlog 0 票/0 评论，#4237 无更新 | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,314；完整 e2e 257/257；生成 JSON 噪声已恢复；PR 最终门禁通过 | Production 关闭；下一正式 Release 核验 `ead15d8`、`c5c7d74` 与 tag 后核弹保护 |
| 2026-08-19 | `NUKE-01` Monitoring 退出 | 首个有效 7 天窗口证明 Water Nukes 专页以 97 次展现和全部 3 次点击成为主要落地页，关闭 Monitoring；没有修改玩家页面；交付为 [PR #35](https://github.com/redreamality/openfront-intel/pull/35) | GSC 成功刷新至 2026-08-16：7 天 966/1,967，28 天 1,419/3,694；最新正式版仍为 v0.33.5；`MAP-01` / `ATTACK-01` 不晋级，Doomsday 错落地进入下一窗口复核 | docs-only：audit 40/40；diff/BOM/终止换行/本地 Markdown 链接通过；无站点或交互变化 | 等下一正式 Release、事实错误或成熟玩家问题 |
| 2026-08-20 | `FRESH-01` v33.6 响应 | 五语 v33 总览与首页最新版本入口直接回答版本化回放和版本不匹配边界；不新建回放薄页，v33.5 管理大厅和 v33.4 操作仍在同一总览；[PR #36](https://github.com/redreamality/openfront-intel/pull/36) 已合并为 `62bb30f` | 正式 v0.33.6 于 2026-08-19 发布；GSC 截止 2026-08-17，早于 Release，不能评价新入口；站点 Issues 0，Feedlog 仅 1 帖/0 票/0 评论，`MAP-01` / `ATTACK-01` 不晋级 | audit 40/40；Astro check 0 errors、9 hints；build 230 页；links 9,314；完整 e2e 257/257；生成 JSON 噪声恢复；PR 门禁通过并已同步 main | 观察回放查询与旧版本边界；只有新事实或玩家问题才重新打开 `FRESH-01` |

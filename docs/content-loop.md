# OpenFront Intel 每日执行账本

更新日期：2026-08-02。

本文件只回答“今天看到了什么、推进了哪个计划项、交付与验证结果是什么”。内容原则、当前战役、未来 6–8 周顺序和完成定义以 [`content-strategy.md`](content-strategy.md) 为准。

定时任务每次运行都必须先读项目级 `AGENTS.md`、内容战略和本账本。不得把临时信号直接升级为长期路线，也不得因为队列第一项未完成就机械地重复加工同一页面。

## 每日执行规则

每天最多推进一个主要玩家结果，但不要求每天发布文章。来源包、入口修复、重复意图合并、发布后复盘和停止错误选题都是有效进展。紧急事实错误和正式版本发布可以打断当前战役；其他发现进入信号池，等每周校准时再决定是否改变计划。

### 1. 同步与检查状态

1. 阅读项目级 `AGENTS.md`、[`content-strategy.md`](content-strategy.md) 和本文件。
2. 从最新 `main` 创建独立工作树，不直接改写主分支。
3. 检查是否已有由每日内容循环创建但尚未合并的 PR。
4. 若已有同一任务 PR，优先继续或修正它，不重复创建新 PR。
5. 检查上一轮的“进行中”事项是否已经合并，并确认当前周目标和战役退出条件是否仍成立。

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

1. 当前周目标和对应计划 ID。
2. 今天要改善的玩家结果，而不是要生产的文件名。
3. 为什么今天推进它；证据成熟度和前置条件是什么。
4. 为什么其他高优先候选继续等待。
5. 今天的产出类型：研究、刷新现有页、新主答案、入口修复或发布后复盘。

候选必须先通过战略中的硬门槛。选择顺序是：

1. 已确认的事实错误。
2. 有真实正文的正式版本变化。
3. 当前战役中最接近退出条件的计划项。
4. 排名已有基础、只需改善答案或入口的现有页面。
5. 玩家反复提出但站内没有唯一答案的新问题。

不得按待办出现顺序、页面字数或总分自动决定。若前置 PR 未合并或证据不足，应明确等待，不另找一篇薄内容填满当天。

### 4. 执行当天任务

内容必须从玩家决策出发：先回答“这一局怎么做”，再补必要的数据和来源。

1. 明确唯一主落地页，以及不属于该页面的相邻意图。
2. 建立来源包：正式 Release、上游源码或生成数据、需要核验的数字与规则。
3. 先写直接答案，再写正确做法、失败反例、对手反制和下一步阅读。
4. 能更新现有页面时不新建页面；只有意图独立且符合当前战役时才新增攻略。
5. 常青内容默认同步 en、zh、fr、de、nl。紧急正式版本摘要可先发布 en + zh，但必须记录 fr/de/nl 的 72 小时补齐状态。
6. 至少为主落地页补两个相关入口，并避免与相邻页面争夺同一意图。
7. 不伪造截图；没有真实素材时使用可核验的数据表或代码原生解释图。
8. 受版本影响的旧攻略必须在正文顶部写明适用版本、最后核验日期和本版本最重要的变化。

### 5. 验证

按变更范围执行：

- 内容或 Markdown：`pnpm content:audit -- --strict`。
- 路由或内部链接：`pnpm check:links`。
- 新页面、MDX/frontmatter 或生成数据：`pnpm build`。
- 新增关键玩家事实：更新内容完整性 e2e。
- 任何交互变化：新增对应 e2e 并运行 `pnpm test:e2e`。

已知的全局基线错误必须与本次新增问题区分。测试失败时先诊断根因，不允许为了发布而删除有效断言。

### 6. 更新账本与计划

结束前必须完成以下动作：

1. 将当天完成的事项标为 `[x]`；未完成则保留 `[ ]` 并说明阻塞点。
2. 将当天发现的新事项加入“信号池”，记录来源、玩家问题、候选主页面和是否有真实需求证据。
3. 更新“今日编辑判断”和“当前进行中”，确保最多一个计划项处于执行状态。
4. 在“每日运行记录”追加计划 ID、玩家结果、完成内容、验证结果和下一决策点。
5. 只有正式 Release、事实错误或每周/月复盘可以修改 `content-strategy.md`；普通每日运行不得随意重排 Now / Next / Later。
6. Feedlog 帖子进入计划时记录链接、票数和重复问题；发布后回链权威答案并更新状态。

### 7. 交付

1. 每天最多创建一个内容 PR。
2. 分支名使用 `codex/daily-content-YYYY-MM-DD-<topic>`。
3. PR 正文写明计划 ID、玩家结果、来源、语言状态、验证结果，以及战略退出条件推进了哪一步。
4. 不自动合并 PR；由用户审阅或明确授权后合并。
5. 若当天没有值得提交的内容，只更新发现结果和队列，不制造空 PR。

## 定时任务

- 状态：启用。
- 自动化 ID：`openfront`。
- 频率：每天一次，本地时间 09:00。
- 执行位置：`openfront-intel` 本地项目。
- 计划来源：[`content-strategy.md`](content-strategy.md)。
- 交付边界：可以修改内容、更新本文件并创建待审 PR；不得自动合并，也不得为了完成每日运行制造新页面。

## 当前周目标

- 战役：恢复“始终是最新的”印象。
- 玩家结果：从首页或旧攻略进入后，能立刻看见当前版本变化、适用版本和下一步实战答案。
- 当前计划项：`FRESH-01`、`FRESH-02`、`FRESH-03`、`DOOM-01`。
- 退出条件：版本系列总览、核心攻略顶部新鲜度摘要、首页四个高价值入口和 Doomsday 独立攻略全部交付。

## 今日编辑判断

- 日期：2026-08-02。
- 当前周目标 / 计划 ID：让旧攻略进入后即可判断是否仍适用；交付 `FRESH-02`。
- 玩家结果：玩家打开任一核心攻略时，不必翻到来源面板或页脚，就能直接看到适用版本、最后核验日期，以及 v33 对该页决策最重要的变化。
- 为什么今天做：`v33` 总览已经合并，远端没有未合并的同计划 PR；上一轮已确认 7 个核心答案 × 5 语的统一摘要缺口、共享布局方案和验证门禁，证据与前置均已成熟，且它是当前战役最接近退出条件的一项。
- 为什么其他候选等待：最新正式 Release 仍为有真实正文的 `v0.33.0-beta1`；Release 后的核弹路径修复没有与站内现有结论冲突。`FRESH-03`、`DOOM-01` 与 GSC 支持的快捷键、经济、Water Nukes 候选均按战略顺序等待，不用新页面填满今日产出。
- 产出类型：刷新现有页、共享展示组件、严格内容审计与五语 e2e；不新建页面。

## 当前进行中

- `FRESH-02`：内容与验证已完成并交付至待审 [PR #5](https://github.com/redreamality/openfront-intel/pull/5)。现有 7 个核心答案（`first-match`、`hotkeys`、`water-nukes`、`economy-fundamentals`、`ffa-opening`、`nuclear-deterrence`、`team-naval-control`）的 en/zh/fr/de/nl 版本共 35 页，均已显示适用版本、最后核验日期与页面专属 v33 变化摘要。

## 计划承接表

这里不重复战略正文，只记录执行状态和下一决策点。

| ID | 状态 | 下一决策点 |
|---|---|---|
| `FRESH-01` | `v32`、`v33` 均已完成；PR #4 已合并 | 在 `FRESH-02` / `FRESH-03` 中补齐旧页与首页入口 |
| `FRESH-02` | 已完成并提交 [PR #5](https://github.com/redreamality/openfront-intel/pull/5)：35 个核心本地化页面、共享摘要、严格审计和五语 e2e 已交付 | PR 合并后进入 `FRESH-03` |
| `FRESH-03` | 当前下一项 | 重构五语首页信息层级并补 e2e |
| `DOOM-01` | 待开始 | `FRESH-03` 交付后的第一篇独立攻略 |
| `ECON-01` | Next | 先判断扩写 `/mechanics/economy/` 是否足够承接人口甜区意图 |
| `ATTACK-01` | Next | 建立攻击比例的当前公式与两个局势例子来源包 |
| `CTRL-01` | Next | 明确 `/shortcuts/` 与 `/guides/hotkeys/` 的非重复提纲和互链 |
| `NUKE-01` | 观察中 | 专页上线满 14 天后检查收录与错落地 |
| `SPAWN-01` | Next | 选择海岸、半岛、中心、瓶颈四个真实地图场景 |
| `ROOM-01` | Next | 核验当前私人房设置和适用玩法 |
| `MAP-01` | Later | Caribbean 与 Danish Straits 两篇试点先验证需求，再决定是否继续其余地图 |

## 信号池

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

## 已完成

- [x] 2026-08-02：完成 `FRESH-02`，为 7 个核心答案 × 5 语补统一的新鲜度摘要、v33 适用范围、核验日期、严格审计和逐页 e2e；没有新增页面；待审 [PR #5](https://github.com/redreamality/openfront-intel/pull/5)。
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
| 2026-08-02 | `FRESH-02` | 35 个五语核心页面已在直接答案前显示 v33、核验日期和页面专属变化摘要；没有新建页面；[PR #5](https://github.com/redreamality/openfront-intel/pull/5) 待审 | 最新 Release 不变；记录 tag 后核弹路径修复；Issues 为 0，Feedlog 仍为 0 票/0 评论 welcome | audit 35/35；build 225 页；links 8,964；定向 e2e 100/100；完整 e2e 189/189；diff check 通过 | PR #5 合并后执行 `FRESH-03` |

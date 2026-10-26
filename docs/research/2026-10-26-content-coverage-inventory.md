# 2026-10-26 内容供给与搜索计划盘点

本记录只使用本地 Git、文章和项目计划，不声称已经取得最新 GSC 或当前搜索名次。主复盘另核验流量和竞争页面。本轮没有修改公开页面。

## 统计口径与数量

- 时间边界：2026-10-01 00:00，Asia/Vladivostok（UTC+10），截至本次本地 HEAD。
- 月初基线：`10465b9fcd81721e8ef6c3b125388dfaf4d0264a`，提交时间 2026-09-30 14:48:58 +10。
- 固定盘点 HEAD：`cdad85371a0a41307f4563bac42c7fa8fd6482c8`。
- 方法：两提交间 `git diff --name-status --no-renames -- src/content`；同一 slug 的五语翻译算一个主题、五个内容文件。Git 净增不等于已被 Google 收录，也不等于每个页面已在线。

| 类别 | 本月净新增 | 修改月初已有文件 | 解释 |
|---|---:|---:|---|
| Guides | 67 个主题、335 个五语文件 | 85 文件；其中英文 20、德/法/中各 16、荷兰语 17 | 新增后再次更新仍计新增；修改可能仅互链，不能理解为 85 篇大改 |
| Changelog | v35 一个系列、5 文件 | v34 五语、5 文件 | 是游戏版本说明，不算 5 个独立需求 |
| 合计 | 340 内容文件 | 90 文件 | 不含页面模板、索引、数据、研究文档 |

Git 历史期间曾新增 68 个 guide slug，其中 `stop-trading-with-enemies-v35` 随禁运答案合并撤销；因此当前净存新增是 67。当前英文 guides 共 149 篇，月初 82 篇，净增约 81.7%。按现存新增文章的 frontmatter `pubDate`，10 月 1–9 日 31 个主题，10 月 10–26 日 36 个主题。这是编辑标记日期，不能替代部署日期或收录日期。

## 内容已覆盖哪些任务

| 玩家任务 | 已有主答案/主题 | 本月扩展例子 | 复盘含义 |
|---|---|---|---|
| 新手、第一场、攻击与出生 | `first-match`、`attack-ratio`、`population-growth`、`threat-assessment` | `choose-your-spawn`、`early-expansion-rhythm`、`troop-bar-attack-timing`、`first-player-push`、`reading-the-board` | 先检查主教程是否直接解决问题、是否过时；不能把这些问题简单认定为缺文 |
| 经济、工厂与铁路 | `port-vs-factory`、`train-network`、`adaptive-build-order` | `factory-economy-commit`、`factory-upgrades`、`how-many-factories`、`what-do-factories-do`、`trade-ship-destinations` | 已有多个相邻解释；应明确基础解释、数量、升级、网络的各自主词 |
| 核武与终局 | `mirv`、`mirv-price-ladder`、`nuke-calculator`、`nuclear-stalemate-breaker`、`winning-overtime` | `nuclear-salvo-sizing`、`nuke-cut-territory-annexation`、`nuke-to-ground-transition`、`ffa-endgame-commit`、`ffa-focus-crown-endgame`、`ffa-runaway-leader` | 终局决策已很密；需要 query→page 证据决定是否合并或分工 |
| 手机、下载、操作 | `mobile-app-download`、`mobile-controls`、`hotkeys`、`mobile-alternatives` | 主要维护既有答案 | 10/9 已做入口治理，不能重复新建手机主题来解决错误落地 |
| 模式、账号与社群 | `ranked-1v1`、`ranked-2v2`、`impossible-singleplayer`、`list-lobbies` | `ranked-ffa`、`ranked-mode-rating-system`、`clan-wars`、`clan-membership`、`trusted-accounts`、`player-levels-xp-prestige`、`live-spectator-mode` | 有独立任务的潜力，但版本新增本身不证明搜索需求 |
| 地图与地图显示 | `map-size-compact-mode`、`map-strategy`、多张地图路线 | `cape-cod`、`madagascar-water-nuke-map`、`brainrot`、`ommatrypta`、`map-layers-space-terrain` | 优先验证实际地图查询和主落地；全图列表与单图打法职责不同 |

## 值得核对的相邻意图

下面仅为候选重叠，不是已证实的关键词内耗。需要主报告的相同 query、国家、设备下多 URL 展现与排名变化佐证，不能据标题相近批量删文。

1. `reading-the-board` ↔ `threat-assessment`：读取敌人数据与全局选目标应有明确边界；新页不应夺走既有“选择目标”的泛词。
2. `what-do-factories-do` ↔ `train-network` ↔ `how-many-factories` ↔ `factory-upgrades`：基础工厂解释、铁路网络、数量与升级要形成单一入口链；当前两篇基础段落均强调 factory 本身不直接产金，存在答案重复。
3. `nuke-to-ground-transition` ↔ `nuclear-stalemate-breaker` ↔ `ffa-endgame-commit`：核僵局、转地推、何时提交终局可能回答同一宽泛搜索，应检查实际查询分配。
4. `ffa-focus-crown-endgame` ↔ `ffa-runaway-leader`：追打头名和抑制失控领先者的任务边界应通过场景和 title 明确。
5. 禁运已有真实合并先例：`stop-trading-with-enemies-v35` 并入 `embargo-timing-and-trade-control`，说明“版本命名的新文章”有可能只是已有答案更新。

## 计划与执行没有闭环的部分

1. [10/9 搜索改善计划](../search-improvement-plan.md)已明确“现有答案优先、固定词簇、完整窗口评价”。它的评价窗口为 **2026-10-10 至 2026-11-06**，截至本次 10/26 尚未完整，更不能把本月总 click 变化全归因于这批入口改善。
2. 同一计划要求新独立页记录精确/邻近词、GSC 窗口、现有落地与缺口。[10/26 Reading the Board 来源包](2026-10-26-reading-the-board-community-source-pack.md)、[10/26 Nuke-to-Ground 来源包](2026-10-26-nuke-to-ground-transition-community-source-pack.md)、[Brain Rot](2026-10-24-brainrot-community-source-pack.md)和[Ommatrypta](2026-10-24-ommatrypta-community-source-pack.md)的文本检索均未找到 GSC、impressions 或搜索需求段落。本次仅为四份抽样，不能外推所有新增篇目都缺证据；但这四篇不能仅凭来源包视为满足搜索需求门禁。
3. [Reading the Board 来源包](2026-10-26-reading-the-board-community-source-pack.md)自述 Reddit 来自 search-index excerpts；这与 [内容战略](../content-strategy.md)“实际打开并分析至少 3 个相关 Reddit 讨论”的新长文门槛不一致。来源记录问题应先补证，不应把摘要当已核验全文。
4. `first-match` 的现有 freshnessSummary 仍描述 v33.11“one quarter of public FFA”，而 [content-loop](../content-loop.md)账本描述 v34.25 普通公开 FFA 默认启用 Overtime。两者至少存在内部版本表述不一致。应以正式版本核验旧主答案，再处理 SEO；本记录未进行源码核验，不能自行断言最终玩法。
5. [执行账本](../content-loop.md)仍把 LF-COMMUNITY-ROLLING 置于 Monitoring，但 10/10 之后新增 36 个主题。需补齐每篇属于已证明搜索需求、正式版本响应或教学探索哪一类；不能仅凭新增数量断言违反“每周最多一个无信号探索”，也不能让产出量代替这个分类。
6. 10/9 报告提及全站既有 83 项 SEO 问题单独跟踪、本批 URL 未命中。后续应重新定位具体问题及是否仍存在；本次没有把旧数量当作当前审计结果。

## 对主执行计划的建议

- 先以 GSC 证明退步的 query→page 对为单位排序，旧入口改善与新内容收益分开统计。
- 将净新增 67 个主题按首次发布日建立 cohort，统计已收录、获展现、获点击、无展现四种状态；10/24–26 的新篇不能与 10/1 的新篇等时长比较。
- 有现成答案的问题，优先修正过时事实、首屏直接回答、标题和内部链接；只把无法由已有页完整承接且有需求证据的任务放入新文队列。
- 对上述重叠候选仅做 query→page 核查；证据成立再决定改 title、强化主从职责或 301 合并，不做全站批量删除。
- 本轮只输出研究与计划，公开页面变更：无；未提交或发布。

## 验证记录

Git 基线、HEAD、新增/修改状态、五语计数与 frontmatter 日期均已本地复核；报告链接均以已存在的本地文件为依据。没有执行构建、e2e 或游戏版本发布核验，因为本任务没有修改产品或提交版本内容。

# OpenFront Intel 当前执行状态

更新日期：2026-08-25。

本文件只保留活动队列、最新来源锚点、统一度量与最近有效运行。选择原则和门槛见 [`content-strategy.md`](content-strategy.md)；当前长文路由与批次见 [`long-form-content-program.md`](long-form-content-program.md)；`What's New` 字段合同见 [`whats-new-content-plan.md`](whats-new-content-plan.md)。2026-07-31 至 2026-08-20 的完整信号、合规自检与逐 PR 记录已移至 [归档](archive/content-loop-through-2026-08-20.md)，定时任务不要读取归档。

## 定时任务

- 自动化：`openfront`，启用，每天本地时间 09:00，在当前项目目录运行。
- Scout：始终只读仓库；即使工作区脏也完成 Release、到期 GSC、Issues/Feedlog、现有自有 PR 与输入指纹核验，缓存写入 automation 自有目录。
- Monitoring：每日固定检查 `What's New` 的 Release/tag 与 upstream `main` 双游标、已跟踪 Issue/PR、`verifiedAt` / `reviewBy` 和状态转换；Issue/PR 只用于内部证据，不直接出现在公共文章；无实质变化时只写 automation memory，不刷新公共日期或制造内容 PR。
- Production：正式 Release 与事实错误门禁后，执行 `LF-COMMUNITY-ROLLING`。每轮必须实际分析至少 3 个 Reddit 讨论和 3 个 YouTube 视频或字幕，选出一个成熟玩家问题，并在同轮交付一篇英文正文至少 1000 词的五语 guide、来源包、自然入口和验证；不得把来源、写作、本地化或验证推迟到下一轮。写入前必须确认本地 `main` 最新且除当前任务改动外没有未知重叠，不创建 worktree，也不自动 stash/reset/clean。
- 热上下文：项目级 `AGENTS.md`、[`content-strategy.md`](content-strategy.md)、本文件，以及当前 Production 项直接链接的计划。提示词只保留短门禁、长文阶段接口与自动发布门禁，不复制候选、历史或平台避坑。
- 交付：同一主题的内容、测试与预期完成状态进入同一个 PR。PR 内预先写明“合并即完成/转入 Monitoring/Parked”及下一触发点；合并后不为勾选完成、补 SHA 或记录运行再开收口 PR。
- 纯运行记录：PR 状态、merge SHA、网络重试、无变化扫描和完整命令日志只写 automation memory，不追加到本文件。
- 结束报告：每轮必须用 `URL | 变更类型 | 原因` 表格列出全部受影响页面，每行写一个以 `https://openfront.fyi/` 开头的完整绝对 URL，并在标题写出去重 URL 总数；不能用语言标签、“对应路由”“同上”、相对路径或分组代替。报告同时给出本轮 guide 英文正文词数、Reddit/YouTube 有效来源数、来源包路径和验证结果。硬阻塞时页面列表写“无”并明确阻塞阶段，不能返回 `NO_CHANGE`。

## 当前活动队列

本轮 13 个长文主题已经全部完成并退出原 A–E 队列。版本监控继续作为短门禁，不占用主要生产预算；`LF-COMMUNITY-ROLLING` 现在是持续活动 Production，每轮从社区需求中批准并完成一个新主题。

| 通道 | ID | 当前状态 | 下一动作 / 触发点 |
|---|---|---|---|
| Monitoring | `WN-01` | 五语 `/whats-new/` 文章索引、v34 预发布文章、首页/导航入口、RSS Released 筛选和文章状态 e2e 已交付 | 每日维护 Release/tag 与 upstream `main` 双游标；状态转换或复核期限到期才触发文章同步，正式机制页只在 Release 后更新。 |
| Production | `LF-COMMUNITY-ROLLING` | 本轮 `/guides/winning-overtime/` 已达到五语内容与来源门槛；合并即完成本次滚动主题并继续活动 | 下一轮重新从社区信号批准唯一意图；不得把 Overtime 门槛、僵局收尾与领先/追赶决策换标题重复生产。 |
| Parked | `ATTACK-01` | 规则已核验，需求弱且 #4237 风险未定 | #4237 状态变化，或出现真实重复问题/精确需求后恢复；指纹不变则不读取来源包。 |
| Parked | `MAP-01` | Caribbean/Danish Straits 差异已核验，连续有效窗口精确需求为 0 | 出现真实问题、搜索意图或足够具体的布局来源后恢复。 |

`LF-NUKE-01/02`、`LF-ECON-01/02`、`LF-MAP-01/02/03/04`、`LF-LOBBY-01`、`LF-AI-01`、`LF-PLAY-01/02/03` 均已完成。`DOOM-SEO-01` 已完成并等待稳定 GSC 窗口；`FRESH-01` 的 v33.6 响应已由 PR #36 完成；`NUKE-01` 已退出 Monitoring；`SPAWN-01` 与 `ROOM-01` 已合并进既有主答案。已完成项不再逐轮复核，除非触发条件变化。

## 最新来源锚点

- 正式 Release：[`v0.33.11`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.11)，tag commit `0cb90ccb74787e8384f030517423826fe9f607a9`；Overtime 已正式上线，公开 FFA 独立 25% 随机，默认第 30 分钟后每 30 秒降低 1 个百分点。
- 上游 `main` 游标：`b71656c70fbc9773883668274fcc0e0b480988f2`；SAM 动态升级射程、地图预加载与外观 loadout 仍保持 Merged，不能越过正式 Release 边界。
- 历史边界：`v0.33.11...main` 已分叉（ahead 128 / behind 38），不能把 ahead/behind 当成线性“版本后新增”。
- GSC 7 天：2026-08-14..20，918 Query / 1,864 Query × Page。
- GSC 28 天：2026-07-24..08-20，1,465 Query / 3,928 Query × Page。
- 需求源：站点开放 Issues/PR 为 0；Feedlog 按自动化策略不访问；上游 #4237 无新讨论。
- 本轮 Overtime 社区与 tag 核验：[`2026-08-25-winning-overtime-community-source-pack.md`](research/2026-08-25-winning-overtime-community-source-pack.md)。

## What's New 跟踪摘要

| 玩家主题 | 当前状态 | 公开边界 | 下一转换 |
|---|---|---|---|
| Overtime 胜利门槛 | `Released` | v0.33.11：公开 FFA 25% 随机；默认 30:00 后每 30 秒降低 1 点，严格高于门槛才获胜；Host/Singleplayer 可设 1–120 分钟 | 已同步五语 v33 总览、modes 与主攻略；后续只随正式规则变化更新 |
| Team Doomsday 门槛 + wasteland | `Released` | v0.33.7：团队使用 3/6/10/15/21/28/35% 七档门槛，腐化地变为 wasteland | 已同步五语 v33 总览与 Doomsday 主答案；后续只随正式规则变化更新 |
| Water Nukes 运输船寻路 | `Merged` | P0；现有攻略仍正确标为未发布修复 | Release 收录后转 `Released`，移除旧绕路警告 |
| 完整大厅 Detailed View | `Merged` | P1 首发候选 | Release 后核对最终入口、筛选与公开队列行为 |
| Clan Treasury 捐赠 | `Merged` | P1；必须保留永久且不可退款警告 | Release 后核对货币 UI 与权限 |
| Spectator mode | `Released` | v0.33.7：可经大厅代码选择 Spectate，不出生、不占玩家席位 | 已同步五语 modes；后续核对正式入口变化 |
| SAM 动态升级射程 | `Merged` | 内部账本已记录；动态射程与预览尚未由正式 Release 确认，常青核武页不提前改写 | Release 收录后核对最终升级过程、范围预览与性能边界 |
| 地图预加载 | `Merged` | v34 预览只说明把加载提前，不承诺固定秒数 | Release 后核对实际出生窗口、失败回退与设备差异 |
| 外观 loadout | `Merged` | 内部账本记录十个槽与 Unequip all；尚未写成已上线能力 | Release 后核对最终选择器与账号行为 |
| 联盟操作盘、可区分颜色、商店预览 | `In development` | P1/P2 观察 | 评审稳定或合并后再判断玩家价值 |
| Ranked 2v2 固定队友 | `In development` | 外部依赖不可验证，只内部观察 | 依赖与服务端状态公开可验证后再判断 |
| 安全、滥用、私有依赖、未批准/DevOps/重构 | `Suppressed` | 不公开 | 正式安全修复发布后才重新评估 |

## 统一度量表

| ID / 结果 | 基线或最新值 | 成功/停车门槛 | 当前判断 |
|---|---|---|---|
| `WN-01` 栏目交付 | 五语版本文章、稳定 v34 URL、入口、RSS Released 筛选、文章状态 e2e 已上线 | 公共页面不暴露 Issue/PR；v34 发布时只切换 `releaseStatus`；无变化不刷新公共日期 | Monitoring |
| `NUKE-01` 唯一主答案 | 有效 7 天：专页 97 展现/3 点击；hotkeys 64 展现/0 点击 | 主意图转向专页且专页排名更高 | 已达标，关闭 Monitoring |
| `ATTACK-01` 需求 | 28 天精确需求 1 次展现；#4237 无新讨论 | 行为明确或真实重复需求出现 | Parked；只比较触发指纹 |
| `MAP-01` 需求 | 两图 GSC/Issues 精确需求 0 | 需求或可操作的地图专属来源出现 | Parked；只比较触发指纹 |
| v33.6 回放入口 | GSC 截止日 2026-08-17，早于 2026-08-19 Release | 首个完整发布后窗口再评价 query-to-page | 暂不下结论，不重复改稿 |
| `DOOM-SEO-01` 落地 | 2026-08-11..17：399 展现/0 点击；v33 180，五语主攻略 57 | 路径级 title、索引入口和摘要锚文本合并后，首个完整稳定窗口中主攻略份额与点击改善 | 本批次合并即进入 Monitoring；不扩写正文 |

## 最近有效运行

| 日期 | 计划 | 结果 | 验证 / 决策 |
|---|---|---|---|
| 2026-08-25 | v33.11 Release response + `LF-COMMUNITY-ROLLING` Overtime 决策 | 五语 v33 总览升级到 v33.11；新建五语 `/guides/winning-overtime/`，回答门槛、严格比较、fallout 分母、领先防守与追赶截止点，并接通 Guides、modes 与 first-match | 4 Reddit、3 YouTube、20 个官方来源；guide audit 五语与研究门槛通过；本批次合并即完成本轮主题并继续 Monitoring / 滚动 Production |
| 2026-08-23 | `LF-COMMUNITY-ROLLING` 陆战决策 | 新建五语 `/guides/land-combat/`，用实际攻击兵力、地形、Defense Post、接触面与反推抵消回答“兵多为何仍推不动”；同时修正五语军事短页的绝对化结论并接通恢复手册 | 4 Reddit、4 YouTube、7 个官方来源；guide audit 五语与研究门槛通过；本批次合并即完成本轮主题，滚动 Production 继续从新意图选择 |
| 2026-08-23 | v33.9 Release response + `WN-01` 事实修正 | 五语 v33 总览升级到 v33.9 并明确 v33.8/v33.9 不改变对局规则；v34 预览撤下已随 v33.7 发布的 spectator/Team Doomsday，改为不承诺固定秒数的地图预加载；loadout 与预加载进入内部 canonical 账本 | release contract 5/5；严格审计 95/95 + 8 internal/280 public；Astro check 0 errors；build 305 页；links 12,719；定向 e2e 149/149；合并即继续 Monitoring，正式 Release 前不改常青规则 |
| 2026-08-22 | 13 个长文主题全部交付 | A–E 五批完成五语主答案、五份来源包、核弹计算器、两张单图页、自然入口与相邻互链；全部退出活动 Production | 严格审计 95/95；Astro check 0 errors；build 305 页；links 12,719；完整 e2e 371/371；后续只在正式变化或事实错误时重开 |
| 2026-08-21 | `WN-01` 公共文章 MVP | What's New 改为五语版本文章索引；新增 v34 `Not released yet` 文章，复用 `/changelog/v34/` 稳定 URL；首页只展示文章摘要，RSS 过滤预发布版本，Issue/PR 仅留内部账本 | `pnpm content:audit -- --strict`、`pnpm check`、`pnpm build`、`pnpm check:links`、文章 e2e；正式 v34 发布时只切换 `releaseStatus` |

以后只保留最近 3–5 个改变活动通道、公共来源锚点或决策门槛的有效运行；被替换的行移入月度归档。无变化运行不得写入本文件。

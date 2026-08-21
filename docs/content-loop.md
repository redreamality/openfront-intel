# OpenFront Intel 当前执行状态

更新日期：2026-08-20。

本文件只保留活动队列、最新来源锚点、统一度量与最近有效运行。选择原则和门槛见 [`content-strategy.md`](content-strategy.md)；`What's New` 字段合同见 [`whats-new-content-plan.md`](whats-new-content-plan.md)。2026-07-31 至 2026-08-20 的完整信号、合规自检与逐 PR 记录已移至 [归档](archive/content-loop-through-2026-08-20.md)，定时任务不要读取归档。

## 定时任务

- 自动化：`openfront`，启用，每天本地时间 09:00，在当前项目目录运行。
- Scout：始终只读仓库；即使工作区脏也完成 Release、到期 GSC、Issues/Feedlog、现有自有 PR 与输入指纹核验，缓存写入 automation 自有目录。
- Production：只有明确触发才进入；写入前必须确认本地 `main` 最新且 tracked/staged/untracked 全部干净。不创建 worktree，不自动 stash/reset/clean，也不再依赖项目 `.cache` 例外。
- 热上下文：项目级 `AGENTS.md`、[`content-strategy.md`](content-strategy.md)、本文件，以及当前 Production 项直接链接的计划。提示词只保留阶段接口与自动发布门禁，不复制候选、历史或平台避坑。
- 交付：同一主题的内容、测试与预期完成状态进入同一个 PR。PR 内预先写明“合并即完成/转入 Monitoring/Parked”及下一触发点；合并后不为勾选完成、补 SHA 或记录运行再开收口 PR。
- 纯运行记录：PR 状态、merge SHA、网络重试、无变化扫描和完整命令日志只写 automation memory，不追加到本文件。

## 当前批次

主要玩家结果：玩家能区分“已上线、已合并待发布、开发中、观察中”，并从更新摘要进入正式版本历史或既有常青主答案。

| 通道 | ID | 当前状态 | 下一动作 / 触发点 |
|---|---|---|---|
| Production | `WN-01` | 来源研究、状态合同和首批候选已完成；公共页面尚未实现 | 按 [`whats-new-content-plan.md`](whats-new-content-plan.md) 同批交付共享 schema、五语 `/whats-new/`、首页/导航入口和状态 e2e。合并即关闭 Production，后续转为每日增量维护。 |
| Production | `DOOM-SEO-01` | 五语路径级 title、教程索引入口、v33 摘要锚文本和路由 e2e 已在本批次实现 | 本批次合并即转 Monitoring；首个完整稳定 GSC 窗口复核主攻略、v33 与 hotkeys 的展现/点击分布，不再扩写正文。 |
| Monitoring | — | 当前为空 | 新交付只有在预先定义观察指标时进入。 |
| Parked | `ATTACK-01` | 规则已核验，需求弱且 #4237 风险未定 | #4237 状态变化，或出现真实重复问题/精确需求后恢复；指纹不变则不读取来源包。 |
| Parked | `MAP-01` | Caribbean/Danish Straits 差异已核验，连续有效窗口精确需求为 0 | 出现真实问题、搜索意图或足够具体的布局来源后恢复。 |

`FRESH-01` 的 v33.6 响应已由 PR #36 完成；`NUKE-01` 已退出 Monitoring；`SPAWN-01` 与 `ROOM-01` 已合并进既有主答案。已完成项不再逐轮复核，除非触发条件变化。

## 最新来源锚点

- 正式 Release：[`v0.33.6`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.6)，tag commit `bebc953`。
- 上游 `main` 增量：`0b0c765 → 9c97e01`，8 个合并提交。
- 历史边界：`v0.33.6...main` 已分叉，不能把 ahead/behind 当成线性“版本后新增”。
- GSC 7 天：2026-08-11..17，971 Query / 1,942 Query × Page。
- GSC 28 天：2026-07-21..08-17，1,429 Query / 3,738 Query × Page。
- 需求源：站点开放 Issues/PR 为 0；Feedlog 只有 1 帖、0 票、0 评论；上游 #4237 无新讨论。
- 详细来源与排除项：[`2026-08-20-whats-new-upstream-source-plan.md`](research/2026-08-20-whats-new-upstream-source-plan.md)。

## What's New 跟踪摘要

| 玩家主题 | 当前状态 | 公开边界 | 下一转换 |
|---|---|---|---|
| Team Doomsday 门槛 + wasteland | `Merged` | P0 首发候选；合并上游 #5030/#5052 为一个主题 | 正式 Release 收录后转 `Released`，同步 Doomsday 主答案 |
| Water Nukes 运输船寻路 | `Merged` | P0；现有攻略仍正确标为未发布修复 | Release 收录后转 `Released`，移除旧绕路警告 |
| 完整大厅 Detailed View | `Merged` | P1 首发候选 | Release 后核对最终入口、筛选与公开队列行为 |
| Clan Treasury 捐赠 | `Merged` | P1；必须保留永久且不可退款警告 | Release 后核对货币 UI 与权限 |
| Spectator mode | `In development` | P0 开发中；#5031 review required | 合并后转 `Merged`；关闭或大改则撤下 |
| SAM 动态升级射程 | `In development` | 内部重点观察；#5040 blocked | 解除阻塞并合并后准备核武机制同步 |
| Loadout、地图预加载、联盟操作盘、可区分颜色 | `In development` | P1 观察 | 评审稳定或合并后才占公共位置 |
| Ranked 2v2 固定队友 | `In development` | 外部依赖不可验证，只内部观察 | 依赖与服务端状态公开可验证后再判断 |
| 安全、滥用、私有依赖、未批准/DevOps/重构 | `Suppressed` | 不公开 | 正式安全修复发布后才重新评估 |

## 统一度量表

| ID / 结果 | 基线或最新值 | 成功/停车门槛 | 当前判断 |
|---|---|---|---|
| `WN-01` 栏目交付 | schema、五语路由、入口、状态 e2e 均未上线 | 五语共享同一事实；状态不越过 GitHub 生命周期；入口和 e2e 同 PR 通过 | Production |
| `NUKE-01` 唯一主答案 | 有效 7 天：专页 97 展现/3 点击；hotkeys 64 展现/0 点击 | 主意图转向专页且专页排名更高 | 已达标，关闭 Monitoring |
| `ATTACK-01` 需求 | 28 天精确需求 1 次展现；#4237 无新讨论 | 行为明确或真实重复需求出现 | Parked；只比较触发指纹 |
| `MAP-01` 需求 | 两图 GSC/Issues 精确需求 0 | 需求或可操作的地图专属来源出现 | Parked；只比较触发指纹 |
| v33.6 回放入口 | GSC 截止日 2026-08-17，早于 2026-08-19 Release | 首个完整发布后窗口再评价 query-to-page | 暂不下结论，不重复改稿 |
| `DOOM-SEO-01` 落地 | 2026-08-11..17：399 展现/0 点击；v33 180，五语主攻略 57 | 路径级 title、索引入口和摘要锚文本合并后，首个完整稳定窗口中主攻略份额与点击改善 | 本批次合并即进入 Monitoring；不扩写正文 |

## 最近有效运行

| 日期 | 计划 | 结果 | 验证 / 决策 |
|---|---|---|---|
| 2026-08-20 | `DOOM-SEO-01` | 五语主攻略获得路径级 SEO title，五语教程索引和 v33 摘要明确导向完整攻略；新增路由契约 e2e | 定向 e2e 15/15；完整 e2e 272/272；Astro check 0 errors；build 230 页；links 9,319；合并即转 Monitoring |
| 2026-08-20 | `WN-01` 来源规划 | 建立 Released/Merged/In development/Watching 合同、双锚点和首批候选；没有提前改写正式机制 | 58 个官方来源链接；下一批实施公共 MVP |
| 2026-08-20 | `FRESH-01` v33.6 | 五语 v33 总览与首页回答版本化 replay shell；不建回放薄页；PR #36 已合并 | audit 40/40；Astro check 0 errors；build 230 页；links 9,314；e2e 257/257 |
| 2026-08-19 | `NUKE-01` | 主攻略承接主要 Water Nukes 意图并退出 Monitoring；没有重复改稿 | 7 天 97 展现/3 点击，高于 hotkeys 64/0；后续只在异常时重开 |

以后只保留最近 3–5 个改变活动通道、公共来源锚点或决策门槛的有效运行；被替换的行移入月度归档。无变化运行不得写入本文件。

# 2026-08-11 内容信号与 Water Nukes 观察来源

本文件记录本次内容循环使用的一手来源、判断边界和 `NUKE-01` 发布后观察结果。Search Console 原始 Query、点击、展现、CTR 与排名明细继续只保留在 `.cache/gsc/`，不提交到仓库。

## 今日判断

- 当前战役的交付侧已由 [PR #18](https://github.com/redreamality/openfront-intel/pull/18) 完成；今天的锚点是判断 Water Nukes 查询是否已经转向五语唯一主答案。
- 本轮 GSC 数据仍截止 2026-08-08，早于 2026-08-10 合并的入口修复，因此不能用于判定修复成功或失败。
- 五语 Water Nukes URL Inspection 均为 `PASS`、`Submitted and indexed`、允许抓取并采用各自 self-canonical，排除“专页未收录”这一立即故障。
- 今天不改正文、不建第二个 Water Nukes 页面。下一次只在稳定窗口包含 2026-08-10 之后的数据时比较落地页；若仍错落地，再查抓取与入口，而不是复制答案。

## Release 与上游状态

- 最新正式版本仍是 [`v0.33.2`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.2)，发布于 `2026-08-07T18:53:39Z`，`draft=false`、`prerelease=false`，正文不是 `TEST`。
- 核验时 GitHub `main` 为 [`49d52b0`](https://github.com/openfrontio/OpenFrontIO/commit/49d52b0a7d4c150e2c020724893dbb9959a61e7a)。与 `v0.33.2` tag 比较返回 `diverged`：main 侧 49 个提交、tag 侧 9 个提交，不能把该比较写成简单的“正式版之后领先多少”。
- main 上与玩家决策最接近的未发布变化包括：同一 Silo 的堆叠核弹跨 tick 排队、MIRV 弹头提前进入 SAM 可见队列、近距离 MIRV 弹头可被 SAM 正常选中，以及拥挤地图在 750 次出生尝试后放宽玩家间距。
- 这些提交尚无新的正式 Release 正文。站内当前“不同 Silo 仍可同时发射、齐射需要重叠 SAM、原子弹与氢弹保持装填”的结论没有被推翻，因此只进入下次正式版本核验池，不抢先改成 v33.2 事实。
- Las Vegas Strip 地图修复不属于战略限定的五张地图试点；Yangtze River 也不在允许范围内，均不升级为地图页。

## Search Console 7 / 28 天

- 两份报告均在本轮主动刷新成功，没有回退缓存，并保留 2 天数据稳定延迟。
- 7 天范围为 2026-08-02 至 2026-08-08，生成于 `2026-08-10T23:05:23.862Z`，共 897 个 Query、1,797 条 Query × Page。
- 28 天范围为 2026-07-12 至 2026-08-08，生成于 `2026-08-10T23:05:36.928Z`，共 1,258 个 Query、3,055 条 Query × Page。
- 以同时包含 `water` 与 `nuke` 的明确意图统计，7 天有 11 个 Query、137 次展现、0 次点击；28 天有 16 个 Query、507 次展现、4 次点击。
- 28 天错落地仍主要在英文 guides 索引（223 次展现）和 hotkeys（192 次）；英文专页只有 4 次，中文专页有 30 次。7 天窗口则以 hotkeys 的 97 次展现为主，英文专页只有 1 次。
- 这些数据全部早于 PR #18 的入口修复，属于发布前基线，不是发布后效果。下一次有效比较的报告截止日必须至少到 2026-08-10，且仍保留默认 2 天稳定延迟。

## URL Inspection

| 语言 | URL | 结果 | 最后抓取 | Canonical |
| --- | --- | --- | --- | --- |
| en | `/guides/water-nukes/` | PASS · Submitted and indexed | 2026-08-03T16:37:26Z | self |
| zh | `/zh/guides/water-nukes/` | PASS · Submitted and indexed | 2026-08-08T21:56:53Z | self |
| fr | `/fr/guides/water-nukes/` | PASS · Submitted and indexed | 2026-07-23T10:45:24Z | self |
| de | `/de/guides/water-nukes/` | PASS · Submitted and indexed | 2026-07-23T11:23:10Z | self |
| nl | `/nl/guides/water-nukes/` | PASS · Submitted and indexed | 2026-07-21T09:13:17Z | self |

五语页面的 `robotsTxtState` 均为 `ALLOWED`，`indexingState` 均为 `INDEXING_ALLOWED`，`pageFetchState` 均为 `SUCCESSFUL`。法语、德语和荷兰语最后抓取早于入口修复，但这不构成删除、改写或重复页面的理由。

## Issues、Feedlog 与候选

- `redreamality/openfront-intel` 开放 Issues 与开放 PR 均为 0，没有同计划 PR 可继续或需要去重。
- Feedlog 在线仍只有系统 welcome：1 个 Other、0 票、0 评论。系统帖不进入选题池。
- `ATTACK-01`、`SPAWN-01`、`ROOM-01` 仍没有足够的新需求与稳定来源越过硬门槛；地图试点也没有新增需求证据。

## 完成定义与停止条件

- 本次交付是当前战役的发布后观察来源包，不是新玩家页面。
- 唯一主落地页继续是五语 `/guides/water-nukes/`；语言状态为 en、zh、fr、de、nl 全部已发布且已收录。
- 旧页同步范围为 0；视觉证据仅使用正式 Release、GitHub commit、GSC Query × Page 聚合和 URL Inspection，没有截图或伪造游戏画面。
- 今天停止内容生产，因为可用 GSC 截止日早于修复、五语收录正常，其余候选证据不足。继续改正文或新建页面会制造重复意图，而不会验证入口修复。

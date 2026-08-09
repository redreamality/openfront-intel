# 2026-08-09 内容信号与 v0.33.2 响应来源

本文件记录本次内容循环使用的一手来源、判断边界和交付范围。Search Console 原始 Query、点击、展现、CTR 与排名明细继续只保留在 `.cache/gsc/`，不提交到仓库。

## 今日判断

- 正式 [`v0.33.2`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.2) 直接改变 Doomsday 的玩家决策，并使现有五语攻略的六档时序与“只降到 5%”结论过时，因此以事实错误和正式 Release 优先级恢复 `FRESH-01`。
- 版本意图唯一主落地页继续是五语 `/changelog/v33/`；Doomsday 实战意图唯一主落地页继续是五语 `/guides/doomsday-clock/`。v33.2 直接修订两页已有答案，不新建重复小版本页。
- 同步范围仅包括五语 v33 总览、五语 Doomsday 主答案、五语首页最新版本入口、内容完整性回归与执行账本。没有修改其它机制页、生成游戏数据或无关路由。

## Release 与上游状态

- `v0.33.2` 发布于 `2026-08-07T18:53:39Z`，`draft=false`、`prerelease=false`，tag commit 为 [`e9e1070`](https://github.com/openfrontio/OpenFrontIO/commit/e9e10703e8188f2a34defdeda9598778a934094a)。正文明确写有 “add territory rot, so a doomed side actually dies”，不是 `TEST` 占位。
- `v0.33.1...v0.33.2` 为 `ahead` 7 个提交；改变 Doomsday 规则的文件包括 `src/core/game/DoomsdayClock.ts`、`src/core/execution/DoomsdayClockExecution.ts`、`src/core/configuration/Config.ts`、HUD 与测试。
- 核验时 GitHub `main` 为 [`332e541`](https://github.com/openfrontio/OpenFrontIO/commit/332e5410ec57288752bf57225ef47463998e8ceb)。本地 `OpenFrontIO` clone 仍为 `0668045`：两次带 25 秒低速保护的 `git pull --ff-only` 分别因连接重置和无法连接 443 失败，按规则不再重试。
- 因 clone 未刷新，本轮不运行 `pnpm extract`，`src/data/_meta.json.upstreamCommit` 继续记录旧 extraction checkout `0668045`，`upstreamVersion` 继续表示 `v33` 编辑范围。Doomsday 数值直接引用正式 tag 源码，不暗示旧 checkout 等于 v0.33.2 tag。

## v0.33.2 Doomsday 事实

权威来源：

- [七档门槛与速度时序](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.2/src/core/game/DoomsdayClock.ts)
- [警告、单位损耗与领土腐化执行](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.2/src/core/execution/DoomsdayClockExecution.ts)
- [警告、下限和淘汰期限配置](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.2/src/core/configuration/Config.ts)
- [正式 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.2)

可直接用于玩家答案的结论：

1. 四档速度仍有 10 分钟宽限，门槛改为七档 `2/4/7/11/17/25/35%`。
2. 非领先阵营低于实时门槛时先收到 30 秒警告；重新过线或成为领土第一会清除 skull。
3. 警告结束后，部队保护下限在 90 秒内从 40% 线性下降到 5%；单位损失仍从每秒最大容量的 2% 增至 5%。
4. 战舰沿用同一条 40% 到 5% 的保护下限，损失曲线从 1% 增至 50%，doomed 时不能回血。
5. 被压在 5% 下限后进入 `Decaying`：领土先出现分散孔洞，再扩散移除；失去的 tile 变成无主地，路线与建筑不能保留。
6. 完整期限从第一次出现 skull 起算 150 秒；系统动态调整每秒领土移除量，使剩余领土在期限到达时归零。
7. 淘汰前仍可恢复；过线或成为第一会立即停止单位损耗和领土腐化，并重置下一次腐化路径。

## 四档关键时序

| 速度 | 七档目标全部到达 | 最终 35% 开始 / 到达 |
| --- | --- | --- |
| Slow | 14:00 · 19:10 · 24:20 · 29:30 · 34:40 · 39:50 · 45:00 | 41:00 / 45:00 |
| Normal | 12:48 · 16:30 · 20:12 · 23:54 · 27:36 · 31:18 · 35:00 | 32:12 / 35:00 |
| Fast | 11:42 · 13:55 · 16:08 · 18:21 · 20:34 · 22:47 · 25:00 | 23:18 / 25:00 |
| Very fast | 10:36 · 11:20 · 12:04 · 12:48 · 13:32 · 14:16 · 15:00 | 14:24 / 15:00 |

攻略中的完整表同时记录每次爬升开始与暂停长度；本表只保留最容易核验版本一致性的到达序列和终局窗口。

## Search Console 7 / 28 天

- 两份报告均在本轮主动刷新成功，没有回退旧缓存，保留 2 天数据稳定延迟。
- 7 天范围为 2026-07-31 至 2026-08-06，生成于 `2026-08-08T23:04:56.048Z`，共 880 个 Query、1,802 条 Query × Page。
- 28 天范围为 2026-07-10 至 2026-08-06，生成于 `2026-08-08T23:05:09.537Z`，共 1,225 个 Query、2,928 条 Query × Page。
- Doomsday 7 天共有 17 个 Query、450 次展现、25 次点击；现有独立攻略已是主要答案。正式版本造成事实错误时，正确动作是更新该页，不是新建第二个同意图页面。
- Water Nukes 28 天共有 16 个 Query、515 次展现、4 次点击，但专页尚未满战略规定的 14 天观察窗；保留 `NUKE-01` 观察，不与正式 Release 抢优先级。
- `ATTACK-01`、`SPAWN-01`、`ROOM-01` 的 28 天精确需求只有 0–1 次展现，且来源包未完成，不生产内容。

## Issues、Feedlog 与重复问题

- `redreamality/openfront-intel` 开放 Issues 与开放 PR 均为 0，没有同计划 PR 可继续或需要去重。
- Feedlog 仍只有系统 welcome：1 个 Other、0 票、0 评论。系统帖、空帖和品牌拼错不进入选题池。
- 本轮没有真实重复玩家问题能越过正式 Release 或已确认事实错误。

## 交付与完成定义

- 五语 v33 系列总览置顶 v0.33.2 玩家影响，同时保留 v33.1 热修与 v33.0 主功能上下文。
- 五语 Doomsday 主答案同步七档门槛、四档精确时序、`Collapsing` / `Decaying`、40% 到 5% 下限、150 秒腐化、恢复条件、实战计划、反制、实例与 FAQ。
- 五语首页最新版本卡片直接显示 `v33.2` 和领土腐化信号，继续导向唯一版本总览。
- 所有语言的数字、时间、来源路径与结论一致；旧六档 `4/9/16/26/40/55%`、旧 `40:10` 和“时钟不能自行淘汰”不再被写成当前规则。
- 视觉证据只使用官方源码、Release、Markdown 数据表和现有 HTML/CSS 卡片；没有使用或伪造游戏截图。
- 验证必须覆盖严格 content audit、Astro check、生产 build、内部 link check、定向内容与首页 e2e、完整 Playwright、diff/BOM 审计。

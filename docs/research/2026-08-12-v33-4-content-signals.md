# 2026-08-12 v33.4 内容信号与来源包

本文件记录本轮 `FRESH-01` 正式版本响应的一手来源、玩家影响、页面边界与外部信号。Search Console 的 Query、点击、展现、CTR 和排名明细继续只保留在 `.cache/gsc/`，不提交到仓库。

## 今日判断

- 最新正式版本是 [`v0.33.4`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.4)，正文包含真实 v33.4 / v33.3 条目而非 `TEST`；批量升级和原子弹批量会改变玩家操作与防守判断，因此立即重新打开 `FRESH-01`。
- 唯一版本主落地页继续是五语 `/changelog/v33/`。v33.4 的控制事实同步到五语 `/shortcuts/` 与 `/guides/hotkeys/`，核发射时序同步到五语 `/mechanics/nukes/`，Water Nukes 只补实战影响。
- 不建立 v33.3 或 v33.4 薄页。v33.3 只有 Las Vegas Strip 右上角地形修复与单人胜利及时归档，没有独立玩家意图；v33.4 的决策能由既有版本总览和三个常青主答案完整承接。
- `NUKE-01` 继续 Monitoring。最新 GSC 截止 2026-08-09，仍早于 2026-08-10 的入口修复，不能评价错落地是否改善。

## Release 与源码事实

- `v0.33.4` 发布于 `2026-08-11T17:25:41Z`，`draft=false`、`prerelease=false`，tag commit 为 [`20c813f`](https://github.com/openfrontio/OpenFrontIO/commit/20c813f06a403da294760fc6089b222179b6a66b)。核验时上游 `main` 为 [`228143e`](https://github.com/openfrontio/OpenFrontIO/commit/228143e32a99787cdaaae271d603789af4de7662)。
- 同一建造键再次按下时，只对已有建筑升级或 Atom Bomb 在 x1 / x5 间切换。新建建筑、Hydrogen Bomb 与 MIRV 仍是单次。来源：[`InputHandler.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/client/InputHandler.ts)。
- 径向菜单为建筑升级提供 x1/x5/x10/xMax，为 Atom Bomb 提供 x1/x2/x5/xMax。来源：[`RadialMenuElements.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/client/hud/layers/RadialMenuElements.ts)。
- 每批受金币与最多 50 次操作限制；建筑升级按每个后续等级的递增成本分别计价。Atom Bomb 还受所有 Silo 已装填发射管数限制。来源：[`Game.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/core/game/Game.ts)。
- 同一 Silo 的排队核弹逐 tick 发射；不同可用 Silo 可以在同一 tick 各发一枚。来源：[`NukeExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/core/execution/NukeExecution.ts)。
- 批量输入不会改变 Atom/Hydrogen/MIRV 的爆炸范围、SAM 弹道判定或 Water Nukes 的转换队列。它改变的是下达操作和形成多枚弹坑的速度。

## Search Console 7 / 28 天

- 两份报告均在本轮主动刷新成功，没有回退缓存，并保留默认 2 天数据稳定延迟。
- 7 天范围为 2026-08-03 至 2026-08-09，生成于 `2026-08-11T23:02:49.856Z`，共 917 个 Query、1,855 条 Query × Page。
- 28 天范围为 2026-07-13 至 2026-08-09，生成于 `2026-08-11T23:03:01.627Z`，共 1,281 个 Query、3,152 条 Query × Page。
- 两份对应 Markdown 意图报告已复核。截止日仍早于 PR #18 的 2026-08-10 入口修复，因此只把本次数据作为发布前基线，不把 `NUKE-01` 写成成功或失败。

## Issues、Feedlog 与候选

- `redreamality/openfront-intel` 开放 Issues 与开放 PR 均为 0；没有同计划 PR 需要继续、修正或去重。
- Feedlog 仍只有系统 welcome：1 个 Other、0 票、0 评论。系统帖、空帖和品牌拼错不升级为选题。
- `ATTACK-01`、`SPAWN-01`、`ROOM-01` 没有新增成熟需求包；地图试点也没有前两篇的需求证据。本轮不与 24 小时版本响应并行制造内容页。

## 页面边界与完成定义

- 版本唯一主落地页：五语 `/changelog/v33/`。它负责回答 v33.4 改了什么以及对下一局的影响。
- 控制分工：五语 `/shortcuts/` 负责紧凑查键，五语 `/guides/hotkeys/` 负责批量操作练习、失败恢复和对手反制。
- Water Nukes 唯一主答案仍是五语 `/guides/water-nukes/`；只说明多枚 Atom Bomb 如何改变造水节奏，不复制快捷键教程或核武机制全文。
- 五语 `/mechanics/nukes/` 负责 50 上限、Silo 容量、同一 Silo 逐 tick 与不同 Silo 同 tick 的精确机制及源码链接。
- 语言状态目标：en、zh、fr、de、nl 同批完成，数字、按键、版本范围与结论一致；没有 24/72 小时待补语言。
- 视觉证据使用正式 Release、tag 源码与代码原生表格/文字；没有截图，也没有生成或伪造游戏画面。

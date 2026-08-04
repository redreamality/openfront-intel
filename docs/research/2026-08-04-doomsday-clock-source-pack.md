# DOOM-01：Doomsday Clock 一手来源包

核验时间：2026-08-04T08:39:57Z

研究范围：最新正式 OpenFrontIO Release、`v0.33.1` Release tag、截至 `main` 的 Doomsday Clock 规则与变更。本文只整理可用于玩家攻略的事实，不替代最终编辑稿。

## 核验结论

- 最新正式 Release 是 [`v0.33.1`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.1)，发布于 `2026-08-03T21:39:35Z`，`draft=false`、`prerelease=false`，正文不是 `TEST`。它保留完整 v33.0 说明，并新增两项与 Doomsday 无关的 v33.1 修复：tribe 排行榜显示与 replay desync。
- Release tag 指向 `dcbfdbbdc91431a8442fb9e9cccd35f832acc82f`；当前上游 `main` 与本站 `src/data/_meta.json.upstreamCommit` 都是 `0668045fa926eaa6d6995561a8e13fd8126895b6`。
- tag 与 `main` 从共同基线 `7a7ca5be8ff8af4403595e4766b2669ab8124407` 各自包含等价的 tribe/replay 两个热修提交，因此 GitHub compare 显示 `diverged`；双向 compare 均没有 Doomsday、胜负、战舰、配置或公共轮换相关文件变化。也就是说，下文规则同时适用于正式 `v0.33.1` 与核验时的 `main`。
- Doomsday 所谓“zone”不是从地图边缘向中心收缩的几何安全圈。代码实现的是一个对所有 side 相同、随时间上升的“最低可用陆地占比”门槛；攻略应写“领土门槛/安全线”，不要写成中心圈或指定方向收圈。
- 所有速度档前 10 分钟门槛都是 0%。10:00 后门槛分六波从 0% 线性爬升至 4%、9%、16%、26%、40%、55%，每次爬升后短暂停住；四档只改变爬升和暂停时长，不改变目标百分比。
- 非领先 side 低于当时门槛才会进入危险状态；等于门槛是安全的。FFA 按单个玩家判断，团队模式按全队合计领土判断，团队面对的门槛与单人完全相同，不按队员数放大。
- 低于门槛后先有 30 秒警告。之后部队和战舰开始衰减，但时钟本身只压到各自最大值的 5%，不会直接清零、击沉或自动判负。重新达到门槛或成为领先 side 时，标记立即清除，衰减停止，连续受罚计时重置。
- Doomsday 不包含独立的“最后存活/55% 即获胜”结算调用。胜负仍由标准 `WinCheckExecution` 判定；最终 55% 门槛和领先方豁免的作用，是让至多一个挑战者能安全并把其余挑战者压到弱势，而不是立即弹出胜利。

## 正式 Release 与当前 main

### Release 事实

官方 `v0.33.1` 正文在 `Gameplay & Balance` 中明确列出：

- 新增 Doomsday Clock battle-royale zone 模式；
- 重做为 10 分钟宽限、波次挤压、较慢部队衰减、前期温和但后期更陡的战舰衰减；
- 战舰与部队一起衰减，并在最大值 5% 停止，而不是归零；
- 团队使用与单人 side 相同的门槛；
- 受罚战舰继续巡逻，不在港口闲置。

来源：[`v0.33.1` Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.1)。

### tag 与 main 的一致性边界

| 项目 | 已核验值 | 来源 |
| --- | --- | --- |
| Release tag | `v0.33.1` → `dcbfdbbdc91431a8442fb9e9cccd35f832acc82f` | [Git ref](https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.33.1) |
| 当前 `main` | `0668045fa926eaa6d6995561a8e13fd8126895b6` | [commit](https://github.com/openfrontio/OpenFrontIO/commit/0668045fa926eaa6d6995561a8e13fd8126895b6) |
| tag → main | `diverged`，双方各有 2 个等价热修；相关规则文件 0 个变化 | [compare](https://github.com/openfrontio/OpenFrontIO/compare/v0.33.1...main) |
| main → tag | 同上；相关规则文件 0 个变化 | [reverse compare](https://github.com/openfrontio/OpenFrontIO/compare/main...v0.33.1) |
| 本站生成元数据 | `upstreamVersion=v33`、`upstreamCommit=0668045...` | `src/data/_meta.json` |

`src/data/*.json` 中没有 Doomsday 参数；本站生成数据只能证明提取 checkout，具体规则必须引用上游源码，不能把攻略数值归因于生成 JSON。

## 玩家规则：宽限期与波次

权威实现：

- `src/core/game/DoomsdayClock.ts`：[`0668045` 固定版本](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/game/DoomsdayClock.ts#L17-L76)
- 相同正式版路径：[`v0.33.1`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.1/src/core/game/DoomsdayClock.ts)
- 精确阈值测试：[`tests/DoomsdayClockExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/tests/DoomsdayClockExecution.test.ts#L523-L597)

### 可直接用于攻略的事实

1. `slow`、`normal`、`fast`、`veryfast` 都从 10:00 开始第一段爬升；`elapsed <= 600` 时门槛仍为 0%。因此“前 10 分钟完全不受时钟衰减”准确，“10:00 整立刻跳到 4%”不准确。
2. 每一波不是瞬间跳档，而是在该档的 `rampSeconds` 内从上一档线性爬到新门槛；随后在 `pauseSeconds` 内保持不变。
3. 六个目标门槛固定为 4%、9%、16%、26%、40%、55%。
4. 门槛按 `floor(当前基点 × 可用陆地 / 10000)` 计算，因此实际显示的 tile 数是向下取整。
5. 可用陆地是 `numLandTiles - numTilesWithFallout`；核尘覆盖地块不进入当时门槛分母。

### 四档完整时刻表

表中的“开始爬升”是门槛离开上一平台的时刻，“到达”是达到本波目标的时刻；达到后进入表列暂停，再开始下一波。

| 速度 | 波次 | 目标 | 开始爬升 | 到达 | 到达后暂停 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Slow | 1 | 4% | 10:00 | 14:52 | 70 秒 |
| Slow | 2 | 9% | 16:02 | 20:54 | 70 秒 |
| Slow | 3 | 16% | 22:04 | 26:56 | 70 秒 |
| Slow | 4 | 26% | 28:06 | 32:58 | 70 秒 |
| Slow | 5 | 40% | 34:08 | 39:00 | 70 秒 |
| Slow | 6 | 55% | 40:10 | 45:00 | 无 |
| Normal | 1 | 4% | 10:00 | 13:28 | 50 秒 |
| Normal | 2 | 9% | 14:18 | 17:46 | 50 秒 |
| Normal | 3 | 16% | 18:36 | 22:04 | 50 秒 |
| Normal | 4 | 26% | 22:54 | 26:22 | 50 秒 |
| Normal | 5 | 40% | 27:12 | 30:40 | 50 秒 |
| Normal | 6 | 55% | 31:30 | 35:00 | 无 |
| Fast | 1 | 4% | 10:00 | 12:05 | 30 秒 |
| Fast | 2 | 9% | 12:35 | 14:40 | 30 秒 |
| Fast | 3 | 16% | 15:10 | 17:15 | 30 秒 |
| Fast | 4 | 26% | 17:45 | 19:50 | 30 秒 |
| Fast | 5 | 40% | 20:20 | 22:25 | 30 秒 |
| Fast | 6 | 55% | 22:55 | 25:00 | 无 |
| Very Fast | 1 | 4% | 10:00 | 10:40 | 12 秒 |
| Very Fast | 2 | 9% | 10:52 | 11:32 | 12 秒 |
| Very Fast | 3 | 16% | 11:44 | 12:24 | 12 秒 |
| Very Fast | 4 | 26% | 12:36 | 13:16 | 12 秒 |
| Very Fast | 5 | 40% | 13:28 | 14:08 | 12 秒 |
| Very Fast | 6 | 55% | 14:20 | 15:00 | 无 |

## 玩家规则：谁会被判为危险

权威实现：

- `src/core/execution/DoomsdayClockExecution.ts`：[`0668045` 固定版本](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/execution/DoomsdayClockExecution.ts#L42-L164)
- 分组与阈值测试：[`tests/DoomsdayClockExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/tests/DoomsdayClockExecution.test.ts#L184-L521)

每秒执行一次判断，逻辑顺序如下：

1. 只处理仍存活的 Human 与 Nation；小型地图 Bot 不受时钟影响。
2. FFA 中每个玩家各自构成一个 side；团队模式按 `team` 聚合所有存活成员的领土。
3. 计算全局统一门槛。团队不会因为有 2、3、4 个成员而获得更高或更低门槛；队员死亡也不会改变门槛本身。
4. 找出领土最多的 side。领先 side 永远豁免，即使它自己也低于当前门槛；领土并列时按固定 side 遍历顺序保留第一个为领先方。
5. 其他 side 只有在 `sideTiles < requiredTiles` 时才进入 Doomsday 标记；`sideTiles === requiredTiles` 安全。
6. 团队一旦低于门槛，全体存活成员一起被标记并分别衰减；队内某个小玩家只要全队合计安全，就不会单独受罚。
7. side 回到门槛以上、变成领先 side，或场上只剩一个 side 时，标记会清除；死亡玩家的 `inDoomsdayClock()` 也会返回 false。

### 玩家可执行结论

- 不要把“贴近中心”当成安全条件；真正安全条件是 side 的领土总量达到 HUD 红线。
- 团队局要看全队合计百分比，而不是每个人都达到门槛。最小队员无需单独补到红线，但任何队员丢地都会影响全队合计。
- 领先方豁免意味着“抢到当前第一”本身就是防衰减手段；但领先方仍需满足标准胜利条件才能结算。
- 在门槛附近时，短时反打并夺回足够地块可以立刻停止衰减；连续危险计时不会在解除后保留。

## 玩家规则：警告、部队衰减与恢复

权威实现与配置：

- `src/core/configuration/Config.ts`：[`warnSeconds` 与 drain 默认值](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/configuration/Config.ts#L87-L146)
- `src/core/game/DoomsdayClock.ts`：[`doomsdayClockDrain`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/game/DoomsdayClock.ts#L217-L274)
- `src/core/execution/DoomsdayClockExecution.ts`：[`警告、部队 floor 与恢复`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/execution/DoomsdayClockExecution.ts#L101-L148)
- 默认配置集成测试：[`tests/DoomsdayClockExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/tests/DoomsdayClockExecution.test.ts#L737-L786)

可直接用于攻略的精确事实：

- 进入危险状态后有 **30 秒**警告期，警告期内时钟不扣部队或战舰生命。
- 警告结束后，部队每秒损失量按该玩家当时的 `maxTroops` 计算，而不是按当前剩余部队计算。
- 部队衰减率从最大部队容量的 **2%/秒**开始，在 90 秒内线性上升到 **5%/秒**，之后维持 5%/秒。
- 每次移除都会被限制为“当前部队高于 5% floor 的部分”，因此时钟衰减本身不会把部队降到最大容量的 5% 以下。
- 正常部队收入没有被关闭；源码集成测试显示收入会让实际部队在 floor 附近略微浮动。
- `maxTroops` 会随玩家状态、尤其领土变化而重新计算，因此不应在攻略中承诺“从满兵固定 X 秒到 floor”。可安全写的是 30 秒预警、2%→5%/秒和 5% floor。
- 一旦 side 恢复安全，标记立即清除，扣兵停止；下次重新跌破门槛会重新开始 30 秒警告。

### 失败反例

- **错误：**低于红线会在 30 秒后立刻死亡。**正确：**30 秒后才开始逐秒衰减，且时钟在 5% 最大容量处停止；敌人仍需要实际夺地/击杀来完成淘汰。
- **错误：**只要囤够当前兵量就能硬扛。**正确：**扣除按最大容量计算，不按当前兵量按比例变轻；拖延只会让衰减率继续抬高。
- **错误：**短暂越线后回到安全区，旧衰减进度仍保留。**正确：**恢复安全会清除标记和连续计时。

## 玩家规则：战舰衰减、治疗与巡逻

权威实现与测试：

- `src/core/configuration/Config.ts`：[`1%→50%`、指数 8、共同 5% floor](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/configuration/Config.ts#L104-L114)
- `src/core/execution/DoomsdayClockExecution.ts`：[`战舰伤害计算`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/execution/DoomsdayClockExecution.ts#L123-L145)
- `src/core/execution/WarshipExecution.ts`：[`禁止治疗并返回巡逻`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/execution/WarshipExecution.ts#L69-L96)
- 战舰 floor 测试：[`tests/DoomsdayClockExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/tests/DoomsdayClockExecution.test.ts#L331-L415)
- 治疗/巡逻测试：[`tests/Warship.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/tests/Warship.test.ts#L72-L166)

可直接用于攻略的精确事实：

- 战舰与部队使用同一 side 标记和同一个 30 秒警告期。
- 战舰每秒伤害按每艘船自己的最大生命计算；该最大生命包含熟练度调整后的上限。
- 战舰衰减从 **1% 最大生命/秒**开始，90 秒内沿 **8 次方凸曲线**抬升到 **50% 最大生命/秒**。它不是线性 1%→50%；前段温和，后段陡增。
- 时钟伤害被限制在每艘船最大生命的 **5% floor**，环境衰减本身不会击沉战舰，也不会把伤害归功给某个攻击者。
- 被标记期间，战舰无法获得港口附近的被动治疗，也无法获得停靠治疗。
- 已经撤修或停靠的战舰会取消撤修并回到巡逻；低血战舰也不会新发起撤修。因此“把船拉回港口躲时钟”不是有效反制。
- 恢复安全后，正常治疗和撤修逻辑恢复。

### 玩家可执行结论

- 海军撤退决策必须在跌破红线前完成；进入危险后，港口不能抵消时钟伤害。
- 战舰不会被时钟单独击沉，但会停在约 5% 最大生命，极易被敌舰或其他伤害收掉；攻略可写“被打残”，不要写“时钟自动沉船”。
- 早期危险窗口仍有反夺领土的机会；长期低于门槛时，后置的高额凸曲线会迅速摧毁舰队战斗力。

## 结算与胜负规则

权威实现：

- `src/core/execution/WinCheckExecution.ts`：[`0668045` 固定版本](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/execution/WinCheckExecution.ts)
- `src/core/configuration/Config.ts`：[`percentageTilesOwnedToWin`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/configuration/Config.ts#L598-L603)
- `src/core/execution/DoomsdayClockExecution.ts`：全文件没有 `setWinner` 调用；只负责门槛、标记和衰减。

### 标准结算

- FFA：领土最多的玩家在占有 **严格大于 80%** 的非核尘陆地时获胜。
- 普通团队模式：领土最多的队伍在全队占有 **严格大于 95%** 的非核尘陆地时获胜。
- 若房间配置了 `maxTimerValue`，计时到点时当前领土第一方获胜。
- 所有模式另有 **170 分钟**硬上限；到点时当前领土第一方获胜。
- Ranked 1v1 在只剩一个仍连接的人类玩家时直接结算；Ranked 2v2 在只剩一个仍连接且有存活成员的人类队伍时直接结算。这些是 Ranked 特例，不是 Doomsday 独有规则。

### Doomsday 与结算的关系

- 最终门槛为 55%，按数学上限同时最多只有一个 side 能达到；领先 side 又始终豁免，因此其他挑战者最终都会被标记。
- 但达到最终 55% 波次不会自动调用胜利，低于门槛也不会被时钟直接淘汰。玩家仍要通过标准占领/淘汰条件结束对局，或等待房间计时/硬上限。
- 因此攻略应写“最终波次把非领先方压到 5% 战斗力，给领先方收局窗口”，不要写“55% 波次立刻判领先方获胜”。

## 设置与可见性

- wire 配置只允许 `enabled` 与 `speed`；警告、衰减率、曲线和 floor 都是服务端/模拟内部固定默认值，玩家不能在房间里分别调整。来源：[`src/core/Schemas.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/Schemas.ts#L305-L324) 与 [`Config.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/configuration/Config.ts#L87-L146)。
- 可选速度为 `slow`、`normal`、`fast`、`veryfast`。公共特殊修饰符轮到 Doomsday 时，会从四档中随机选择一档。来源：[`src/server/MapPlaylist.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/server/MapPlaylist.ts#L72-L101) 与 [启用配置](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/server/MapPlaylist.ts#L358-L378)。
- HUD 会显示当前红线、side 持有占比、下一次爬升/本波到达倒计时、Stable/Unstable/Collapsing 状态；安全但在红线 110% 以内时会给 near-danger 提示。来源：[`src/client/components/DoomsdayClockPanel.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/client/components/DoomsdayClockPanel.ts#L75-L159)。

## 截至当前 main 的相关变化时间线

| 日期 | commit | 玩家规则变化 | 主要路径 |
| --- | --- | --- | --- |
| 2026-07-02 | [`78ef7b5`](https://github.com/openfrontio/OpenFrontIO/commit/78ef7b56fd60cbd390fcb502989e280e56770150) | 初版 battle-royale style Doomsday Clock | `src/core/game/DoomsdayClock.ts`、`DoomsdayClockExecution.ts` |
| 2026-07-03 | [`66063d6`](https://github.com/openfrontio/OpenFrontIO/commit/66063d617833479806b2f6c27ad1f163590026e3) | 受罚 side 的战舰开始随部队衰减 | `DoomsdayClockExecution.ts`、战舰测试 |
| 2026-07-07 | [`4ce57ef`](https://github.com/openfrontio/OpenFrontIO/commit/4ce57efbe2145ae7bb4ee0def1df606a87a12253) | 重做为 10 分钟宽限、六波挤压、较慢部队衰减、后置陡升的战舰衰减 | `DoomsdayClock.ts`、`Config.ts`、执行与 HUD |
| 2026-07-13 | [`a2321eb`](https://github.com/openfrontio/OpenFrontIO/commit/a2321eb824b53ed908d41a33300f0fbcbed44fed) | 部队与战舰衰减改为在最大值 5% 停止，不再由时钟清零 | `DoomsdayClockExecution.ts`、`Config.ts`、测试 |
| 2026-07-13 | [`290d692`](https://github.com/openfrontio/OpenFrontIO/commit/290d6922ebcff2e7c0e8c76f089e0951b5f71606) | 加入公共游戏特殊修饰符轮换 | `src/server/MapPlaylist.ts` |
| 2026-07-13 | [`9b69b7f`](https://github.com/openfrontio/OpenFrontIO/commit/9b69b7f422b3cc72f47a8ae5f9be43ddcf9318bf) | 受罚战舰不再去港口闲置，保持巡逻；治疗被禁用 | `WarshipExecution.ts`、`tests/Warship.test.ts` |
| 2026-07-15 | [`4621084`](https://github.com/openfrontio/OpenFrontIO/commit/4621084500ba10bbfcf1de5a03d284b26d5f081f) | 房间 UI 暴露 Doomsday 预设与速度设置 | lobby/config UI |
| 2026-07-17 | [`95840a2`](https://github.com/openfrontio/OpenFrontIO/commit/95840a207429ff99b39d901cd4059c3ac3d981e9) | 团队改为按全队合计领土、使用与 solo 相同门槛，不按人数缩放 | `DoomsdayClockExecution.ts`、HUD、测试 |
| 2026-08-03 | `v0.33.1` tag / `main 0668045` | 两项热修只涉及 tribe/replay；没有 Doomsday 规则变化 | [tag→main compare](https://github.com/openfrontio/OpenFrontIO/compare/v0.33.1...main) |

截至 `0668045`，`git log --grep=Doomsday` 没有晚于 `95840a2` 的 Doomsday 规则提交；7 月 25 日的战舰 `randomTile` 防护修复与 Doomsday 决策无关。

## 可直接供英文母稿使用的事实句

以下句子控制在当前证据可支持的边界内：

1. **The clock does nothing for the first 10 minutes. After 10:00, the required territory share rises smoothly through 4%, 9%, 16%, 26%, 40%, and 55%.**
2. **This is a territory threshold, not a circle closing toward the map center. Hold enough non-fallout land; direction does not make you safe.**
3. **A non-leading side below the red line gets a 30-second warning, then loses troops from 2% to 5% of maximum capacity per second.**
4. **The clock stops at a 5% floor. It cripples you; it does not directly eliminate you.**
5. **In team games, the whole team's territory is compared with the same threshold used for a solo player.**
6. **Doomed warships cannot heal or hide at a port. Their clock damage starts at 1% of maximum health per second, rises steeply toward 50%, and stops at 5% health.**
7. **Recovering above the threshold clears the warning and drain immediately.**
8. **The final 55% wave does not award an instant win; normal victory rules still decide the match.**

## 不确定项与编辑警告

1. **不要承诺固定“几秒到 floor”。** 部队 `maxTroops` 会变化且收入继续；战舰有当前生命、熟练度、敌方伤害等变量。源码只支持警告时间、每秒率、曲线和 floor 的精确描述。
2. **不要把 zone 画成中心安全圈。** Release 使用 battle-royale zone 类比，但当前实现没有中心点、半径或方向判断，只有全图领土占比门槛。
3. **不要写“55% 自动获胜”。** 源码注释有“forces out / guarantees a finish”的设计表述，但执行器不调用 `setWinner`；这是压制机制，不是独立结算条件。
4. **忽略 `Schemas.ts` 的过时注释“troops drain to zero”。** 当前 Release、`Config.ts`、执行器与测试一致确认 5% floor，该注释没有同步更新，不能作为攻略事实来源。
5. **tag 与 main SHA 不同不代表规则漂移。** 两条线包含相同两个热修的不同提交 SHA；双向 compare 的相关路径均无变化。引用当前行为时优先使用完整 `0668045` blob URL，同时用正式 Release 证明版本状态。
6. **生成数据没有 Doomsday 字段。** `_meta.json` 只能证明本站提取 checkout；若未来上游修改这些常量，需要重新读源码和 Release，而不能只跑 `pnpm extract` 后假定规则已覆盖。

## 一手来源索引

- 正式版本：[`v0.33.1` Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.1)
- 当前上游基线：[`0668045`](https://github.com/openfrontio/OpenFrontIO/commit/0668045fa926eaa6d6995561a8e13fd8126895b6)
- 波次/门槛：[`src/core/game/DoomsdayClock.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/game/DoomsdayClock.ts)
- side 判断与衰减：[`src/core/execution/DoomsdayClockExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/execution/DoomsdayClockExecution.ts)
- 固定配置：[`src/core/configuration/Config.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/configuration/Config.ts)
- 战舰治疗/巡逻：[`src/core/execution/WarshipExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/execution/WarshipExecution.ts)
- 标准胜负：[`src/core/execution/WinCheckExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/core/execution/WinCheckExecution.ts)
- 公共轮换：[`src/server/MapPlaylist.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/src/server/MapPlaylist.ts)
- 规则测试：[`tests/DoomsdayClockExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/tests/DoomsdayClockExecution.test.ts)
- 战舰行为测试：[`tests/Warship.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/0668045fa926eaa6d6995561a8e13fd8126895b6/tests/Warship.test.ts)

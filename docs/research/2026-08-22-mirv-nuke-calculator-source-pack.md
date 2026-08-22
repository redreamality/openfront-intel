# MIRV 完整攻略与核弹计算器：v33.7 一手来源包

核验日期：2026-08-22

用途：为 `/guides/mirv/` 与 `/guides/nuke-calculator/` 提供可追溯事实。本文不是最终玩家文案；只整理 OpenFrontIO 正式 Release、正式 tag 源码/测试和本站生成数据能够支持的结论。

## 编辑结论

- 当前正式边界是 [`v0.33.7`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7)，tag commit 为 [`2d5baafdd0cc3f38ee1805d07ef15c1bc5bce09b`](https://github.com/openfrontio/OpenFrontIO/commit/2d5baafdd0cc3f38ee1805d07ef15c1bc5bce09b)。Release 发布于 2026-08-21 23:55:28 UTC，正文包含 v33.0 至 v33.7 的累计说明，且不是 `TEST` 占位。
- Atom Bomb 固定成本 750,000 Gold；Hydrogen Bomb 固定成本 5,000,000；人类玩家在普通金币规则下，第 `g+1` 枚全局 MIRV 的价格是 `25,000,000 + 15,000,000 * g`，其中 `g` 是全局已经发射的 MIRV 数，不是当前玩家自己的发射数。
- Missile Silo 固定成本 1,000,000，建造 100 ticks（10 秒）；每级提供一个独立发射槽。Silo 和 SAM 的单槽冷却都是 90 ticks（9 秒），升级新增的槽位也先经历一次 90-tick 装填。
- 普通核弹没有源码定义的最大射程。系统在所有可用 Silo 中选距离目标 Manhattan distance 最近的一座；限制来自可用槽位、金币、出生保护、禁用设置、目标合法性和团队保护，而不是距离上限。
- v33.7 的基础飞行速度为 Atom/Hydrogen 10 tiles/tick、MIRV carrier 15、MIRV warhead 22；每 tick 是 100 ms。MIRV warhead 还按生成次序获得 `0..4` 的附加速度，并随机等待 `0..14` ticks 才起飞。
- MIRV carrier 自身不在 SAM 目标白名单内；分裂后的每一枚 `MIRVWarhead` 都按普通飞行核弹接受 SAM 弹道检查。攻略必须写成“用弹头数量和时序压过可用拦截槽”，不能再写“载体绕过 SAM，所以整枚 MIRV 无法拦截”。
- MIRV 最多尝试生成 350 个目标，但只有中心目标必定进入列表。其余弹头只落在目标点 1,500-tile Euclidean 半径内、属于目标玩家的陆地上，并要求与已有目标至少 55 Manhattan tiles；小领土、海岛、地图边缘和目标稀疏时，实际弹头数可以明显少于 350。
- SAM 等级同时决定两个维度：射程 `150 - 480 / (level + 5)`，以及最多可同时占用的导弹槽数 `level`。单个满装 level-N SAM 在同一 tick 最多可向 N 个合格目标发射；每个槽随后独立冷却 90 ticks。
- SAM 不是“落点在圈内就 100% 拦截”的静态圆。它必须在核弹可被瞄准的轨迹段中找到一个位于实际射程内、且 SAM 导弹赶得上的交会点。核弹只在离发射点或落点小于 150 tiles 的轨迹段可被瞄准，中段可能存在不可瞄准区。
- 最适合首版客户端工具的是成本、MIRV 价格阶梯、Silo/SAM 槽位与冷却、SAM 等级射程和爆炸半径。精确飞行时间、SAM 拦截结果、MIRV 实际弹头数和伤亡不能只靠几个数字输入得出；要做到精确，必须复用正式版路径/轨迹、地图和执行顺序。

## 版本与来源边界

| 项目 | 本轮核验值 | 解释 |
| --- | --- | --- |
| 最新正式 Release | [`v0.33.7`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7) | 正式玩家行为边界；累计正文保留 v33.0 的 MIRV/SAM 重做与 v33.4 批量发射 |
| 正式 tag commit | [`2d5baaf`](https://github.com/openfrontio/OpenFrontIO/commit/2d5baafdd0cc3f38ee1805d07ef15c1bc5bce09b) | 最终玩家页的源码链接固定到 `v0.33.7`，避免 `main` 漂移 |
| 本站编辑范围 | `v33` | 来自 [`src/data/_meta.json`](../../src/data/_meta.json) 的 `upstreamVersion` |
| 本站提取 checkout | [`0668045`](https://github.com/openfrontio/OpenFrontIO/commit/0668045fa926eaa6d6995561a8e13fd8126895b6) | 来自 `_meta.upstreamCommit`；只是 2026-08-03 的提取源码，不是 v33.6 tag |
| checkout 到正式 tag | [`0668045...v0.33.7`](https://github.com/openfrontio/OpenFrontIO/compare/0668045fa926eaa6d6995561a8e13fd8126895b6...v0.33.7) 为 diverged | 正式 tag 在相关路径中增加了 v33.4 批量升级计价和同井发射错开逻辑；不能只依据生成数据描述批量行为 |
| v33.6 到 v33.7 | [`v0.33.6...v0.33.7`](https://github.com/openfrontio/OpenFrontIO/compare/v0.33.6...v0.33.7) | 官方比较中的 30 个文件没有核武、MIRV 或 SAM 执行文件；下文固定到 v0.33.6 的逐行审计证据仍适用于 v0.33.7 |
| 正式 tag 到当前 main | [`v0.33.7...main`](https://github.com/openfrontio/OpenFrontIO/compare/v0.33.7...main) | 未发布差异不能写成当前能力；最终玩家页只引用正式 tag |

本站 [`units.json`](../../src/data/units.json)、[`structures.json`](../../src/data/structures.json) 和 [`formulas.json`](../../src/data/formulas.json) 可作为结构化数值快照，但它们来自 `0668045`。成本、基础半径、速度和 v33 MIRV/SAM 语义与正式 tag 一致；v33.4 的批量 intent、累计升级价格与同井错开一 tick 必须引用正式 tag 源码。

## 武器与设施数值

### 核武一览

| 类型 | 普通金币成本 | 基础速度 | 爆炸 inner / outer | SAM 状态 | 备注 |
| --- | ---: | ---: | ---: | --- | --- |
| Atom Bomb | 750,000 | 10 tiles/tick | 12 / 30 | 可拦截 | 正常 UI 支持 x1/x2/x5/xMax 批量 |
| Hydrogen Bomb | 5,000,000 | 10 tiles/tick | 80 / 100 | 可拦截 | 正常 UI 为单次动作 |
| MIRV carrier | `25M + 15M * g` | 15 tiles/tick | 无直接爆炸 | **不可拦截** | 只负责飞到分离点并生成弹头；发射会占用 Silo 槽 |
| MIRV Warhead | 由 MIRV 生成 | 22..26 tiles/tick | 12 / 18 | 可拦截 | 单枚按普通 `NukeExecution` 飞行；另有 0..14 ticks 随机起飞等待 |

正式配置来源：[`Config.ts` 成本与设施](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/configuration/Config.ts#L401-L460)、[`Config.ts` 半径/速度/SAM](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/configuration/Config.ts#L920-L968)、[`NukeSpeed.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/tests/NukeSpeed.test.ts)。

#### MIRV 价格公式

设：

- `g` = 点击前全局已经成功发射的 MIRV 数；
- `k` = 从现在开始考虑购买的 MIRV 数。

则下一枚价格为：

```text
nextMirvCost = 25,000,000 + 15,000,000 * g
```

连续 `k` 枚的总成本为等差数列：

```text
totalMirvCost(k, g)
  = k * (25,000,000 + 15,000,000 * g)
    + 7,500,000 * k * (k - 1)
```

例：全局尚未发射 MIRV 时，前三枚依次为 25M、40M、55M，总计 120M；若全局已有 4 枚，下一枚为 85M。计数在成功构造 MIRV 后写入统计，因此失败的购买不应提前抬价。来源：[`Config.ts#L411-L421`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/configuration/Config.ts#L411-L421)、[`MIRVExecution.ts#L71-L104`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/MIRVExecution.ts#L71-L104)、[修复“先计数后购买”提交](https://github.com/openfrontio/OpenFrontIO/commit/9edf0349cb54db84d81f229091870242fabadce3)。

Infinite Gold 对人类玩家把这些成本归零；普通攻略和公开计算器默认不启用该例外。所有 Atom/Hydrogen/Silo/SAM 的普通成本通过 `costWrapper` 计算，MIRV 单独处理全局价格。来源：[`Config.ts#L550-L568`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/configuration/Config.ts#L550-L568)。

### Missile Silo：成本、等级和冷却

- 新建 Silo 固定 1,000,000 Gold，普通建造时间 100 ticks = 10 秒；Instant Build 房间为 0。
- Silo 可无限按现有 `upgradable` 检查继续升级；源码没有“最高 4 级”的上限。`MAX_UPGRADE_AMOUNT=50` 只是单个批量 intent 的数量上限，不是设施等级上限。
- 每次新建或升级的成本仍为 1,000,000。升级将 level 加一，也把当前 tick 压入 missile timer queue，所以新增槽位不是立刻装填完成，而是在 90 ticks 后准备好。
- `isInCooldown()` 的条件是 `timerQueue.length === level`。因此 level-N Silo 最多有 N 个独立槽；只要队列长度小于 N，至少还有一个可发射槽。
- 每个已用槽从自己的发射 tick 起等待 90 ticks。`MissileSiloExecution` 每次只移除队头中最早到期的槽；队列因此保存独立发射时间。
- 系统从所有“存活、建造完成、至少有一个空槽”的 Silo 中按目标距离排序，选择 Manhattan distance 最近者。源码没有最大射程检查。
- v33.4 后，同一 Silo 同 tick 接受多枚核弹时，飞行开始会依次错开至少 1 tick，即 0.1 秒；不同 Silo 可以同 tick 发射。
- MIRV carrier 发射后也调用 `silo.launch()`，与 Atom/Hydrogen 一样占用一个槽并进入 9 秒冷却。

来源：[`Config.ts#L434-L439`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/configuration/Config.ts#L434-L439)、[`PlayerImpl.ts#L1463-L1510`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/PlayerImpl.ts#L1463-L1510)、[`UnitImpl.ts#L456-L474`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/UnitImpl.ts#L456-L474)、[`UnitImpl.ts#L625-L629`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/UnitImpl.ts#L625-L629)、[`MissileSiloExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/MissileSiloExecution.ts)、[`NukeExecution.ts#L188-L260`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/NukeExecution.ts#L188-L260)、[`MIRVExecution.ts#L98-L104`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/MIRVExecution.ts#L98-L104)、[`MissileSilo.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/tests/MissileSilo.test.ts)。

### v33.4 批量操作边界

- Wire schema 的 `amount` 允许 1..50；设施升级使用逐级累计成本，核弹批量使用 `单价 * 数量`。
- Radial menu 只把 **Atom Bomb** 判定为 `isStackableNuke`，提供 x1、x2、x5、xMax；xMax 同时受金币、50 上限和当前全体 Silo 已装填槽数限制。
- Hydrogen Bomb 与 MIRV 的正常玩家 UI 仍为单次动作。核心 `ConstructionExecution` 对 Atom/Hydrogen 都能循环 `amount`，但普通页面不应把底层 schema 能力写成公开 UI 功能。
- 同井批量不会在同 tick 重叠飞行；`NukeExecution` 检查整条槽位队列并至少按 1 tick 递增等待。

来源：[`Game.ts#L156-L163`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/Game.ts#L156-L163)、[`Game.ts#L907-L934`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/Game.ts#L907-L934)、[`Schemas.ts#L549-L561`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/Schemas.ts#L549-L561)、[`RadialMenuElements.ts#L469-L550`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/client/hud/layers/RadialMenuElements.ts#L469-L550)、[`ConstructionExecution.ts#L100-L127`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/ConstructionExecution.ts#L100-L127)、[v33.4 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.4)。

## MIRV 的实际分裂模型

### 载体阶段

1. MIRV 只能把有 owner 的 tile 作为目标；Atom/Hydrogen 没有这条额外限制。所有核武都不能直接瞄准 impassable tile。
2. 发射时使用最近的可用 Silo，扣除当前 MIRV 价格，立刻记录全局发射统计，向目标玩家显示 `MIRV INBOUND`，并占用一个 Silo 槽。
3. carrier 以 15 tiles/tick 沿抛物线前往分离点。分离点不是目标点：`x` 是发射点与目标点 x 的中点，`y = max(0, targetY - 500) + 50`。
4. carrier 不在 SAM 目标列表中，因此防守方不能在分离前击毁它。

来源：[`PlayerImpl.ts#L1423-L1438`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/PlayerImpl.ts#L1423-L1438)、[`PlayerImpl.ts#L1463-L1510`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/PlayerImpl.ts#L1463-L1510)、[`MIRVExecution.ts#L49-L120`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/MIRVExecution.ts#L49-L120)、[`SAMMissileExecution.ts#L44-L55`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/SAMMissileExecution.ts#L44-L55)。

### 弹头阶段

正式常量：

```text
candidate radius from chosen target = 1,500 Euclidean tiles
minimum target spacing             = 55 Manhattan tiles
maximum requested targets          = 350
base warhead speed                 = 22 tiles/tick
per-order speed addition           = floor(i / 350 * 5)  // 0..4
random launch wait                 = integer 0..14 ticks
blast radius                       = inner 12 / outer 18
```

目标选择的精确边界：

- 目标列表从玩家点击的 `dst` 开始，因此中心弹头存在。
- 最多做 1,000 轮外层尝试；每轮内部最多做 100 次随机候选尝试。
- 候选必须在地图内、为 land、落在 1,500 半径内、当前 owner 与初始目标玩家完全相同，并与所有已选目标保持至少 55 Manhattan tiles。
- 达到 350 个目标就停止；若找不到更多合格 tile，也会提前结束。`warheadCount=350` 是上限，不是保证。
- 生成结果按“离中心 Manhattan distance 从远到近”排序，然后赋予逐渐增加的 0..4 速度增量。外圈弹头通常先被加入执行，但每枚仍叠加独立 0..14 tick 等待，因此实际到达顺序不能只按索引推断。
- 每个弹头都通过标准 `NukeExecution` 从分离点飞向自己的目标，拥有完整 trajectory、targetable 状态、SAM 拦截和单独爆炸。

来源：[`MIRVExecution.ts#L25-L28`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/MIRVExecution.ts#L25-L28)、[`MIRVExecution.ts#L123-L210`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/MIRVExecution.ts#L123-L210)、[`MIRVExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/tests/core/executions/MIRVExecution.test.ts)。

## SAM：射程、槽位、预判和优先级

### 建造与升级

- 第一座/第一级 SAM 成本 1,500,000 Gold；此后每新增一座或升一级为 3,000,000，因为公式是 `min(3,000,000, (n + 1) * 1,500,000)`。
- 普通建造时间 300 ticks = 30 秒；Instant Build 房间为 0。
- 每级新增一个导弹槽，并同时把新增槽放入 90-tick 装填。level-N、全装填的 SAM 可在同一 tick 向最多 N 个不同合格目标开火。
- 射程公式为：

```text
samRange(level) = 150 - 480 / (level + 5)
```

常用值：

| level | 射程（tiles） | 满装槽位 |
| ---: | ---: | ---: |
| 1 | 70.00 | 1 |
| 2 | 81.43 | 2 |
| 3 | 90.00 | 3 |
| 4 | 96.67 | 4 |
| 5 | 102.00 | 5 |
| 10 | 118.00 | 10 |
| 20 | 130.80 | 20 |
| 50 | 141.27 | 50 |

射程渐近 150，永远不因有限 level 达到 150。升级的战术价值既包括更多 ready shots，也包括更大几何覆盖；计算器必须同时展示这两个结果。

来源：[`Config.ts#L450-L460`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/configuration/Config.ts#L450-L460)、[`Config.ts#L953-L968`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/configuration/Config.ts#L953-L968)、[`UnitImpl.ts#L625-L629`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/UnitImpl.ts#L625-L629)、[`SAMLauncherExecution.test.ts#L345-L418`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/tests/core/executions/SAMLauncherExecution.test.ts#L345-L418)。

### 什么情况下会发射

SAM 的逻辑不是在核弹进入圆圈后立即发射，而是预先读取完整轨迹：

1. 搜索半径固定为 `maxSamRange * 4 = 600 tiles`，用于提前发现高速弹头；这不是实际拦截射程。
2. 候选类型只有 Atom Bomb、Hydrogen Bomb、MIRV Warhead；MIRV carrier 被明确排除。
3. 核弹必须属于敌方、尚未被其他 SAM 标记为目标，并且轨迹上存在一个 `targetable=true` 的 tile。
4. 该交会 tile 到 SAM 的 Euclidean distance 必须不超过当前等级射程。
5. 核弹到交会点的剩余 tick 数必须不少于 SAM 导弹以 12 tiles/tick、按 Manhattan distance 飞到该点所需的 `ceil(distance / 12)`。
6. 由于 `NukeExecution` 在同 tick 先执行，SAM 不能在核弹最终爆炸 tick 拦截。若落点位于 SAM 射程内，系统会尝试在倒数第二个轨迹 tile 完成最后机会拦截。
7. 如果预定开火 tick 时槽位仍在冷却，系统会重新寻找后续可行交会点；不保证还能赶上。

核弹本身只有在离发射点或落点 **严格小于 150 tiles** 的轨迹段 `targetable=true`。因此长航程核弹存在不可瞄准的中段；“轨迹穿过 SAM 圆”并不自动等于能拦截。

来源：[`NukeExecution.ts#L328-L365`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/NukeExecution.ts#L328-L365)、[`SAMLauncherExecution.ts#L67-L123`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/SAMLauncherExecution.ts#L67-L123)、[`SAMLauncherExecution.ts#L169-L240`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/SAMLauncherExecution.ts#L169-L240)、[`SAMMissileExecution.ts#L29-L84`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/SAMMissileExecution.ts#L29-L84)。

### 多目标优先级

同一 tick 有多个合格目标时，SAM 按以下 score 从高到低排序：

```text
typeBonus     = Hydrogen Bomb ? 70,001 : 0
distanceBonus = max(0, 200,000 - manhattan(SAM, targetTile) * 1,000)
urgencyBonus  = max(0, 10,000 - ticksToExplode * 100)
score         = typeBonus + distanceBonus + urgencyBonus
```

可用于攻略的安全表述：

- Hydrogen Bomb 获得专门的类型优先加分。
- 更接近 SAM 的落点通常优先；更早爆炸只作为较小的 tie-breaker。
- 两座 SAM 不会同时浪费导弹打同一枚核弹：第一座锁定后写入 `targetedBySAM`，其他 SAM 会过滤它；正式测试也确认只有一座进入冷却。
- 一座 level-N SAM 可以在同一 tick 处理 N 个目标，但每一发只摧毁一枚 Atom/Hydrogen/Warhead。v33 已删除旧版“一发批量清除 MIRV 弹头”的特殊路径。

来源：[`SAMLauncherExecution.ts#L125-L166`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/SAMLauncherExecution.ts#L125-L166)、[`SAMLauncherExecution.ts#L309-L340`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/SAMLauncherExecution.ts#L309-L340)、[`SAMLauncherExecution.test.ts#L200-L218`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/tests/core/executions/SAMLauncherExecution.test.ts#L200-L218)、[v33 MIRV 标准核弹提交](https://github.com/openfrontio/OpenFrontIO/commit/ca5ed2416c50924a06fd39f638eba654b7b502a5)。

## 爆炸与伤亡：可算边界

### 地块与设施

- 普通非 Water Nukes 规则下，inner 半径内且非 impassable 的可达 tile 必定进入影响集合；inner 到 outer 之间通过 seeded pseudo-random `chance(2)` 形成不规则外圈。它不是一个完整实心 outer 圆，也不应在计算器中显示为“outer 内 100% 清除”。
- Water Nukes 使用 16 个角度样本的随机半径并做一次 60%/20%/20% 平滑，形成不规则边界；同样跳过 impassable tile。
- 玩家地块只在实际 `toDestroy` 集合中被放弃；这是后续部队伤亡所使用的 impacted tile 数。
- 非核武单位/设施的销毁判定不同：只要到爆心的 Euclidean distance **严格小于 outer radius** 就会删除，不依赖外圈地块的随机 50% 选择。Atom/Hydrogen/MIRV/MIRVWarhead/SAMMissile 被这一设施清除循环排除。

来源：[`NukeExecution.ts#L55-L126`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/NukeExecution.ts#L55-L126)、[`NukeExecution.ts#L376-L460`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/NukeExecution.ts#L376-L460)、[`WaterNukes.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/tests/nukes/WaterNukes.test.ts)。

### 部队伤亡

每个实际受影响 tile 都会依次对本土部队、外出攻击部队和 transport ship troops 应用伤亡函数：

```text
Atom / Hydrogen per impacted tile:
  deaths = 5 * currentHumans / max(1, tilesLeft)

MIRV Warhead per impacted tile:
  targetTroops = 0.03 * maxTroops
  excess       = max(0, currentHumans - targetTroops)
  deaths       = 500 * (1 - exp(-2 * excess / maxTroops))
```

重要边界：

- 伤亡按每个 impacted tile 顺序重复，且每一步都使用扣除后的 current humans 和变化的 `tilesLeft`；不能简单写成“半径 * 固定百分比”。
- Atom 与 Hydrogen 使用相同的每 tile 伤亡函数，差异主要来自实际覆盖 tile 数与 outer 半径。
- MIRV warhead 的专用公式只削减超过 `3% * maxTroops` 的部分；源码提交说明其设计方向是把部队推向 3% 上方，而不是按 Atom/Hydrogen 公式处理。
- 若工具不知道正式模拟选中的 impacted tile 数、玩家当前 tiles、maxTroops、外出攻击和运输船状态，就不能给出精确伤亡。

来源：[`Config.ts#L970-L986`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/configuration/Config.ts#L970-L986)、[`NukeExecution.ts#L397-L443`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/NukeExecution.ts#L397-L443)、[v33 MIRV 标准核弹提交的“不改专用人口公式”说明](https://github.com/openfrontio/OpenFrontIO/commit/ca5ed2416c50924a06fd39f638eba654b7b502a5)。

## 攻略可以安全给出的决策框架

### MIRV 不是穿透弹，而是弹头饱和攻击

v33 的正确心智模型：

```text
不可拦截 carrier
  -> 在高空分离
  -> 最多 350 枚、实际数量取决于目标领土几何的真实弹头
  -> 每枚弹头独立飞行
  -> 每枚弹头独立接受 trajectory + range + travel-time + ready-slot 检查
```

因此，进攻方要估计的是“本次轨迹集合穿过多少座 SAM 的有效交会区、这些 SAM 当时共有多少 ready shots”，而不是只数地图上的 SAM 图标。防守方要同时维护覆盖和槽位；只升级射程但全部槽位刚刚发射过，仍可能漏弹。

### 齐射与诱饵

可直接用于玩家文章的规则：

- level-N SAM 的理论瞬时拦截上限是 N 枚合格目标；多座 SAM 的上限是当时所有相关 SAM ready slots 的合计。但这是上限，不是保证，因为交会点、targetable 区、飞行时间和去重锁定仍会限制实际发射。
- v33.4 的 Atom x2 是对单个满装 level-1 SAM 最直接的 UI 内饱和动作；x5/xMax 适合更高槽位或多 SAM 网络。来源代码甚至把 x2 注释为“the standard play against a single SAM”。
- 单井 Atom 批量每枚错开 1 tick；多井同时发射可以形成更紧的波次。计算器应把“总 ready Silo tubes”和“来自几座 Silo”分开显示。
- Hydrogen 获得 SAM 类型优先级，因此它可改变同一 tick 的拦截顺序；但是否应把 5M Hydrogen 当诱饵属于局面判断，不能由固定公式自动推荐。
- MIRV carrier 不消耗防守 SAM 槽；只有分离后的 warheads 消耗。进攻方所谓“压 SAM”发生在弹头下落阶段。
- 目标边缘、狭长领土、群岛和小岛可能大幅减少实际 warhead 数；MIRV 不是对任意小目标都能兑现 350 个弹头。
- SAM 的 range 随 level 增加，并且多个 SAM 各自拥有独立 range/slots。重叠部署的价值是增加交会机会和 ready-shot 总量，不是把数值简单相加成一个更大的圆。

### 防守配置

- 建第一座 SAM 的即时成本是 1.5M；第二座或第一次升级都通常是 3M。玩家在“横向新增 1 级 SAM”与“纵向把既有 SAM 升一级”之间，不能只比较同样的 3M：新建增加一个独立 70-tile 圆但要等 30 秒施工；升级立即提高现有点位的 level/range，但新槽先装填 9 秒。
- level 5 的射程约 102，刚超过 Hydrogen outer radius 100；这不等于能保证截下以 100 范围威胁设施的 Hydrogen，因为最终仍看核弹轨迹、SAM 导弹赶到时间和槽位状态。
- 进攻警报出现后，要看具体哪些 SAM 仍有空槽。一个刚处理完 Atom 波次的高等级 SAM 可能比远处低级但满装的 SAM 更脆弱。
- SAM 会优先 Hydrogen、再偏向落点更近和更早爆炸的合格目标。把所有高价值设施聚在一个 SAM 周围，会让落点距离优先级集中，但也把 Hydrogen 的 outer-100 设施清除风险集中在一起。

这些是从实现推导出的决策框架，不是正式 Release 自己给出的胜率结论。页面应把“源码规则”与“战术建议”在视觉上分开。

## 核弹计算器产品范围

### MVP：可以精确、稳定地算

建议输入：

- 当前 Gold；
- 全局已发射 MIRV 数 `g`；
- 计划购买的 Atom/Hydrogen/MIRV 数；
- 各 Silo 的 level、当前已占用槽数和最早槽位剩余 cooldown；
- 各 SAM 的 level、当前已占用槽数；
- 是否 Infinite Gold、Instant Build（默认关闭）。

建议输出：

1. 下一枚 MIRV 价格、未来每枚价格、连续 k 枚总价。
2. Atom/Hydrogen/MIRV 组合总价，以及剩余 Gold。
3. Silo 总 level、当前 ready tubes、单井批量的最早发射序列（每枚至少间隔 1 tick）和 9 秒逐槽恢复。
4. SAM 每级精确射程、总槽位、当前 ready shots、升级后新槽 9 秒装填提示。
5. 三类爆炸 inner/outer 半径对照；明确 outer 是边界而非领土地块 100% 清除区。
6. 仅作为“shot budget”的饱和提示：`incoming eligible projectiles - ready SAM slots`。标签必须写“理论槽位差”，不能叫“保证穿透数”。

### 可直接复用的公式

```ts
const TICK_MS = 100;
const SILO_COOLDOWN_TICKS = 90;
const SAM_COOLDOWN_TICKS = 90;

function mirvCost(globalMirvsLaunched: number): number {
  return 25_000_000 + 15_000_000 * globalMirvsLaunched;
}

function mirvSeriesCost(globalMirvsLaunched: number, count: number): number {
  return (
    count * (25_000_000 + 15_000_000 * globalMirvsLaunched) +
    7_500_000 * count * (count - 1)
  );
}

function samRange(level: number): number {
  return 150 - 480 / (level + 5);
}

function readySlots(level: number, cooldownQueueLength: number): number {
  return Math.max(0, level - cooldownQueueLength);
}
```

计算器应对 `level`、数量和 `g` 做非负整数校验，并用整数/`bigint` 处理 Gold，避免 50 次升级或高全局 MIRV 计数产生展示舍入。正式 intent 的单次批量上限为 50；规划工具可以允许更长系列，但必须说明这不是一次 UI 操作。

### 第二阶段：有地图与轨迹后才能精确

精确 SAM 拦截预览至少需要：

- 地图宽高与合法 `TileRef`；
- 发射 Silo、目标、curve direction；
- 正式 `ParabolaUniversalPathFinder` 生成的逐 tick trajectory；
- 每个 trajectory tile 的 source/target 150-tile targetable 标志；
- 所有 SAM 的坐标、level、slot queue 和执行顺序；
- 每枚核弹类型、速度、wait ticks、是否已被其他 SAM 锁定。

随后才能逐轨迹复现 `computeInterceptionTile()`、priority score 和槽位队列。简单使用 `straightLineDistance / speed` 会错，因为正式路径是按曲线长度近似匀速行进；正式提交明确使用 lookup table 近似曲线距离。来源：[`PathFinder.Parabola.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/pathfinding/PathFinder.Parabola.ts)、[curved nuke trajectory 提交](https://github.com/openfrontio/OpenFrontIO/commit/7c163e23613b929c2825f4139286353405c6ff7f)。

### 不应在首版声称精确

- **MIRV 实际弹头数：**必须知道目标玩家的真实陆地、owner、地图边缘和 seeded random。
- **某个 SAM 一定拦截：**必须模拟 targetable 轨迹、交会时间、槽位、优先级和其他 SAM 的锁定。
- **精确飞行秒数：**不能只除 Euclidean/Manhattan 直线距离。
- **精确被毁地块数：**outer 区域为 seeded irregular selection，Water Nukes 另有边界算法，impassable tile 会被跳过。
- **精确伤亡：**必须知道实际 impacted tiles、每个玩家当前 tiles/maxTroops/兵力、外出攻击和运输船。
- **MIRV 固定 350 次爆炸：**350 是候选上限，实际数量由目标领土几何决定。
- **SAM coverage circle 等于保护区：**圈只表达交会点 range；它不包含导弹赶到时间和核弹 targetable 区。

## 版本变化时间线

| 正式版本 | 与本文相关的正式变化 | 一手来源 |
| --- | --- | --- |
| v24 | MIRV 削弱；地块间隙更快重占；City/Port/SAM/Silo 可升级；SAM 只打威胁附近区域；核弹速度 4 -> 6 | [`v0.24.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.24.0) |
| v25 | SAM smart targeting；MIRV warhead spacing 调整 | [`v0.25.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.25.0) |
| v27 | 堆叠/升级 SAM 增加射程，可覆盖 Hydrogen 威胁 | [`v0.27.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.27.0) |
| v28 | MIRV 价格改为 25M 起、全局每次发射 +15M；客户端显示 SAM 交会预览 | [`v0.28.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.28.0) |
| v29 | 结盟时销毁双方在途核弹；高难 Nation 更精确避开 SAM | [`v0.29.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.29.0) |
| v30 | SAM 冷却 7.5s -> 12s；修复 stacked SAM 只处理一枚核弹；Impossible Nation 会齐射压 SAM | [`v0.30.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.30.0) |
| v31 | SAM 冷却 12s -> 9s；Silo 冷却 7.5s -> 9s；核弹速度 6 -> 8 | [`v0.31.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.31.0) |
| v32 | 默认 Atom/Hydrogen 速度 8 -> 10 | [`v0.32.18`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.32.18) |
| v33 | MIRV warheads 改成真实飞行核弹，正常 SAM 一发拦一弹头；carrier 仍不可拦；MIRV/SAM 修复；MIRV 发射占 Silo 冷却 | [`v0.33.7`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7) |
| v33.4 累计项 | 设施与 Atom bulk 操作；同井核弹不再同 tick 重叠发射 | [`v0.33.4`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.4)、[`45c942e`](https://github.com/openfrontio/OpenFrontIO/commit/45c942e328189e73dbba69fa320293c199e0759e) |

注意：v24 Release 的提交列表同时出现过“increase MIRV to 35M”，但 v28 正式重做和 v33.7 `Config.ts` 已明确覆盖为 25M + 全局 15M 阶梯。最终页面只展示当前 v33.7 公式，不把历史 35M 当现行值。

## 可直接供英文母稿使用的事实句

1. **In v33.7, a MIRV carrier cannot be targeted by SAMs, but every warhead it releases becomes a normal in-flight nuke that costs one SAM missile to intercept.**
2. **A MIRV starts at 25 million Gold and every MIRV already launched by any player adds 15 million to the next price.**
3. **A MIRV can attempt to create up to 350 warheads, but only valid land owned by the selected player and spaced at least 55 Manhattan tiles apart can receive extra targets.**
4. **Atom and Hydrogen Bombs fly at 10 tiles per tick; the MIRV carrier flies at 15, and its warheads start at 22 before their per-warhead speed stagger.**
5. **A level-N SAM has N missile slots and a range of `150 - 480 / (N + 5)` tiles; every fired slot takes 90 ticks, or 9 seconds, to reload.**
6. **SAM coverage is not a guaranteed interception circle. The missile still needs a targetable point on the nuke's trajectory and enough time to reach it.**
7. **The first SAM costs 1.5 million Gold. Later SAM builds and upgrades cost 3 million each under the capped scaling formula.**
8. **Each Missile Silo level adds one tube. A bulk Atom launch from one Silo is spaced by at least one tick per bomb, while separate ready Silos can launch together.**
9. **The outer blast radius is a limit, not a promise that every territory tile inside it will be removed; normal fallout uses an irregular seeded outer ring.**
10. **Treat the difference between incoming eligible warheads and ready SAM slots as a pressure estimate, not a guaranteed penetration count.**

## 编辑警告与反例

1. **错误：MIRV 有 350 枚保证命中的弹头。** 正确：目标列表最多 350，中心目标之外都受地图、land、owner、1,500 半径、55 spacing 和随机尝试限制。
2. **错误：MIRV 不能被 SAM 拦截。** 正确：carrier 不能拦；warhead 在 v33 中按普通核弹逐枚拦截。
3. **错误：SAM 圆覆盖落点就一定安全。** 正确：还要满足 targetable 轨迹、射程内交会点、12-speed 导弹赶到时间和 ready slot。
4. **错误：升级 SAM 只是增大射程。** 正确：level 同时增加射程和一个导弹槽；新增槽先装填 9 秒。
5. **错误：Silo 升级缩短统一冷却。** 正确：固定 90-tick 单槽冷却不变，升级增加并行槽位。
6. **错误：核弹有固定最大射程。** 正确：当前 `nukeSpawn` 没有距离上限，选最近 ready Silo；飞行时间随正式曲线路径变化。
7. **错误：outer radius 内所有地块和设施按同一随机规则删除。** 正确：领土地块 outer ring 不规则；普通单位/设施在严格小于 outer 半径时直接删除。
8. **错误：用 `distance / speed` 就能精确算 ETA。** 正确：速度沿抛物线路径推进，必须复用 pathfinder 才能精确。
9. **错误：v24 的 35M MIRV 仍是当前价格。** 正确：v28 以后为 25M + 全局每发 +15M，v33.7 源码确认。
10. **错误：Hydrogen/MIRV 也有 Atom 的 x5 UI。** 正确：正式 Radial menu 只把 Atom 暴露为 stackable nuke。

## 一手来源索引

- 正式版本：[`v0.33.7 Release`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7)
- 正式 tag commit：[`2d5baaf`](https://github.com/openfrontio/OpenFrontIO/commit/2d5baafdd0cc3f38ee1805d07ef15c1bc5bce09b)
- 核武路径版本差异：[`v0.33.6...v0.33.7`](https://github.com/openfrontio/OpenFrontIO/compare/v0.33.6...v0.33.7) 未改动下列核武、MIRV 或 SAM 执行文件，因此保留的 v0.33.6 逐行链接仍是有效的固定证据。
- 成本、速度、半径、冷却、伤亡公式：[`Config.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/configuration/Config.ts)
- 建造、升级成本和最近可用 Silo：[`PlayerImpl.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/PlayerImpl.ts)
- Silo/SAM 槽位队列：[`UnitImpl.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/UnitImpl.ts)
- 普通核弹轨迹、同井错开与爆炸：[`NukeExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/NukeExecution.ts)
- MIRV carrier 与弹头生成：[`MIRVExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/MIRVExecution.ts)
- Silo 逐槽装填：[`MissileSiloExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/MissileSiloExecution.ts)
- SAM 弹道预判、优先级和开火：[`SAMLauncherExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/SAMLauncherExecution.ts)
- SAM 导弹白名单与命中：[`SAMMissileExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/SAMMissileExecution.ts)
- 批量计价与上限：[`Game.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/game/Game.ts)
- Atom 批量 UI：[`RadialMenuElements.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/client/hud/layers/RadialMenuElements.ts)
- 核武批量执行：[`ConstructionExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/src/core/execution/ConstructionExecution.ts)
- 正式测试：[`MissileSilo.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/tests/MissileSilo.test.ts)、[`MIRVExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/tests/core/executions/MIRVExecution.test.ts)、[`SAMLauncherExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/tests/core/executions/SAMLauncherExecution.test.ts)、[`NukeExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.6/tests/core/executions/NukeExecution.test.ts)
- 本站生成数据：[`_meta.json`](../../src/data/_meta.json)、[`units.json`](../../src/data/units.json)、[`structures.json`](../../src/data/structures.json)、[`formulas.json`](../../src/data/formulas.json)

## 核验过程备注

- 本地 `OpenFrontIO` clone 只有 `v0.33.0` 系列 tag，没有 `v0.33.6` 或 `v0.33.7`。根因是 checkout/tag 不完整，而不是正式 Release 不存在；本轮恢复方式是通过 GitHub 官方 API 读取固定源码、测试、Release、tag ref 与 compare。
- 一次 `rg` 同时传入不存在的 `test` 目录，以及另一次传入不存在的 `src/core/Intent.ts`/PowerShell 不支持的 `Intent*` 路径，分别返回路径不存在。恢复方式是先用 `rg --files` 确认真实目录和文件，再只读取 `tests/`、`Schemas.ts` 与 `ExecutionManager.ts`。
- 最终校验中，`rg` 默认 Rust regex 不支持 negative look-ahead，且把 `tests/PseudoRandom*` 当路径参数不会在 PowerShell 中展开，分别导致正则解析和路径错误。恢复方式是用 PowerShell `[regex]` 做链接提取，并直接读取已确认存在的 `src/core/PseudoRandom.ts`；其注释与实现确认 `nextInt(min, max)` 的 `max` 为 exclusive。
- 受任务“只新建本文件”的明确范围限制，本轮没有修改 runbook；以上失败模式保留在本来源包供父任务交接。

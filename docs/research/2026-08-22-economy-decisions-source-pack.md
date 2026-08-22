# OpenFront 人口增长与经济决策长文来源包

研究日期：2026-08-22（Asia/Vladivostok）
主题：人口增长、部队上限、Workers 边界，以及 City / Port / Factory / Train / Trade Ship 的经济决策
来源限制：仅使用 OpenFrontIO 正式 Release、正式 tag 源码与测试、本地 OpenFrontIO checkout，以及本站 `src/data` 的生成数据。

## 结论摘要

长文应把问题写成“当前瓶颈是什么”，而不是给出固定建筑顺序：

- **City** 购买的是确定的部队上限。每个已完工 City level 固定增加 250,000 上限；它不是直接金币引擎。
- **Port** 购买的是海上、跨玩家、按实际航程结算的随机现金流。长航程价值高，但需要同水域的非禁运外方 Port，且全局 Trade Ship 数量会抑制生成。
- **Factory** 购买的是陆上网络入口。它本身不结算金币；Factory 生成 Train，Train 在 City / Port 停靠时才结算。
- **Port 与 Factory 共用成本阶梯，City 使用独立阶梯**。先解锁哪一种经济引擎，会把另一种的下一次购买推高一档。
- 游戏中的 **Workers 不是一个可调配人口池**。源码把固定被动金币记为 `goldWork` / “Gold earned by workers”，但玩家模拟状态只有 Gold 与 Troops，没有独立 worker 数量；出兵不会减少 worker 收入。
- City 新建与 City 升级在同一 City 成本阶梯上都只增加一个 level、提供同样的 +250,000 上限。升级即时生效；新建需要 20 ticks，但能增加一个可接入铁路的空间节点。

这些结论来自当前正式 tag 的 [Config.ts][src-config]、[PlayerExecution.ts][src-player-execution]、[PlayerImpl.ts][src-player]、[PortExecution.ts][src-port]、[TrainStationExecution.ts][src-train-station-exec] 与 [TrainStation.ts][src-train-station]。

## 版本与证据边界

### 当前正式版本

截至研究时，GitHub 最新的非 draft、非 prerelease 正式 Release 是 **v0.33.7**，发布于 2026-08-21 23:55:28 UTC；tag 指向 commit `2d5baafdd0cc3f38ee1805d07ef15c1bc5bce09b`。[正式 Release][release-337] [tag ref][tag-ref-337]

本站的 `src/config/openfront-release.ts` 已同步为 `v0.33.7`。当前正式版本仍以 GitHub Release 与固定 tag 为权威，站内展示配置只负责让版本入口保持一致。

### 提取 checkout 与编辑验证范围

本站 [`src/data/_meta.json`](../../src/data/_meta.json) 记录：

- `upstreamVersion: "v33"`：生成快照与编辑说明的验证系列，不是 tag 或精确 patch 版本。
- `upstreamCommit: "0668045fa926eaa6d6995561a8e13fd8126895b6"`：实际执行 extract 时使用的源码 checkout。
- 本地 Git 将该 checkout 描述为 `v0.33.0-2-g0668045`，不是 v0.33.7 tag。

提取脚本也明确把两者分开：`SNAPSHOT_VERSION = 'v33'`，同时单独读取 checkout commit；脚本注释说明较新的 checkout 不会自动把每个快照字段升级成更高版本声明。[`scripts/extract-game-data.mjs`](../../scripts/extract-game-data.mjs)

从 `0668045...` 比较到 v0.33.7，本文涉及的经济执行文件没有行为变更；相关 diff 只有 `Config.ts` 的批量升级成本预计算参数，以及 `PlayerImpl.ts` 的批量升级价格数组。人口、Train、Trade Ship、City / Port / Factory 的核心公式不变。[正式比较][compare-extract-337]

因此本文采用以下证据优先级：

1. v0.33.7 tag 源码与测试，代表当前正式行为。
2. 正式 Release 正文，确认版本身份与版本间变化。
3. `src/data` 作为本站已生成的数据视图；若它的编辑性 notes 与 v0.33.7 执行代码冲突，以正式 tag 代码为准并列入纠错清单。

## 可直接用于长文的“直接答案”

> 当部队条接近上限、恢复空间才是瓶颈时，买 City；当你有安全海岸、同水域外方 Port 和足够长的可存活航线时，买 Port；当 Factory 未被禁用、核心区能连接 City / Port、陆路比海路安全时，买 Factory。Port 与 Factory 共用价格阶梯，所以第一笔 125,000 应解锁当下就能运作的网络，而不是为未来可能出现的路线占位。

这段答案的事实基础分别是 City 上限公式、共享成本 wrapper、海贸目的港过滤和铁路交易站逻辑。[Config.ts][src-config] [PortExecution.ts][src-port] [FactoryExecution.ts][src-factory] [TrainStation.ts][src-train-station]

## 人口、部队上限与 Workers

### 1. 玩家人口上限公式

普通 Human 的部队上限为：

```text
maxTroops = 2 * (tiles^0.6 * 1000 + 50,000)
          + 250,000 * sum(completed City levels)
```

City 施工中不计入加成；代码过滤 `isUnderConstruction()` 后才累加 City level。Bot 的上述结果再除以 3；Nation 根据难度乘 0.5 / 0.75 / 1 / 1.25；Human 的 infinite troops 配置会改用 1,000,000,000。[Config.ts L204-L205、L841-L872][src-config]

土地项使用 `tiles^0.6`，所以领土提供递减的边际上限；City level 提供固定增量。下表由正式公式计算，取整仅用于展示：

| 已占 tiles | 无 City 上限 | +1 City level | 单 level 相对增幅 |
|---:|---:|---:|---:|
| 1 | 102,000 | 352,000 | +245% |
| 100 | 131,697 | 381,697 | +190% |
| 1,000 | 226,191 | 476,191 | +111% |
| 10,000 | 602,377 | 852,377 | +41.5% |
| 50,000 | 1,419,507 | 1,669,507 | +17.6% |
| 100,000 | 2,100,000 | 2,350,000 | +11.9% |
| 200,000 | 3,131,433 | 3,381,433 | +8.0% |

编辑含义：City 的绝对收益恒定，但它占现有上限的百分比会随领土变大而下降。不能把“晚期百分比下降”写成 City level 自身发生 diminishing return；真正递减的是相对增幅与成本效率。

### 2. 部队增长曲线

每个 simulation tick 的 Human 增量为：

```text
troopIncrease = (10 + troops^0.73 / 4) * (1 - troops / maxTroops)
```

最后再 clamp，保证本 tick 不越过 `maxTroops`。Bot 的增长乘 0.5；Nation 另按难度乘 0.9 / 0.95 / 1 / 1.05。[Config.ts L875-L906][src-config]

simulation tick 为 100 ms，所以常规速度是每秒 10 ticks。[Config.ts 的 tick 注释][src-config] 每个存活玩家每 tick 都先调用 `troopIncreaseRate()` 加部队，再调用 `goldAdditionRate()` 加金币。[PlayerExecution.ts L86-L92][src-player-execution]

以 10,000 tiles、无 City 的 `M = 602,377` 为例，按公式计算：

| 当前部队 / M | 每 tick 增长 | 每秒约增长 |
|---:|---:|---:|
| 10% | 703 | 7,032 |
| 25% | 1,137 | 11,368 |
| 42% | 1,281 | 12,812 |
| 50% | 1,254 | 12,537 |
| 75% | 842 | 8,419 |
| 90% | 385 | 3,846 |
| 95% | 200 | 2,000 |

数值扫描的峰值约在 42.1% 上限处。这个峰值随上限略变，不应写成所有局面的强制持兵比例；敌情会让即时防御储备比理论增长峰值更重要。

### 3. Workers 与部队没有“此消彼长”关系

`PlayerImpl` 的经济人口状态是 `_gold` 与 `_troops`，没有独立 `_workers` 数量。[PlayerImpl][src-player] `PlayerExecution` 中的 `goldFromWorkers` 来自固定 `goldAdditionRate()`：Bot 是 50 / tick，其他玩家是 100 / tick，再乘 `goldMultiplier`。[Config.ts L909-L917][src-config]

“Workers”只出现在统计口径：`GOLD_INDEX_WORK` 被定义为 “Gold earned by workers”，`goldWork()` 把上述固定被动收入记入这一栏。[StatsSchemas.ts L81-L87][src-stats-schema] [StatsImpl.ts L253-L254][src-stats-impl]

因此长文可以明确回答：

- 派出或损失 Troops 不会减少 worker 数，也不会降低基础 100 Gold / tick。
- City 增加的是 `maxTroops`，不是 worker 数或基础 Gold / tick。
- 普通 Human 在 1x multiplier 下，基础被动收入约为 1,000 Gold / 秒、60,000 Gold / 分钟。
- “工人收入”应解释为统计标签，不应构造“总人口 = 工人 + 军队”的不存在模型。

## City、Port、Factory 的成本与升级

### 1. 两条成本阶梯

City 独立计数；Port 与 Factory 把两个类型传入同一个 `costWrapper`，因此共享有效 level 计数。两条阶梯都使用：

```text
cost(n) = min(1,000,000, 2^n * 125,000)
```

对应的边际价格为 125,000、250,000、500,000、1,000,000，之后保持 1,000,000。[Config.ts L389-L398、L463-L483][src-config] 生成数据也记录了相同公式。[`src/data/structures.json`](../../src/data/structures.json)

`costWrapper` 对每个参与类型取 `min(unitsOwned, unitsConstructed)` 后求和。`unitsOwned` 对完工结构按 level 计数、对施工中结构按 1 计数；每次新建和每次升级都会增加 `unitsConstructed`。因此 level 与新建筑都会推进阶梯，而单纯俘获的高等级结构不会无限抬高玩家从未亲自构建过的价格。[Config.ts L550-L568][src-config] [PlayerImpl L435-L474、L1231-L1254、L1334-L1338][src-player] [ConstructionCost.test.ts][test-construction-cost]

### 2. 新建与升级效果

| 动作 | 施工 / 生效 | 直接效果 | 对下一次成本 |
|---|---|---|---|
| 新建 City | 20 ticks（2 秒） | 完工后 +250,000 cap；可成为新的 Train 交易站 | City 阶梯 +1 |
| 升级 City | 源码中即时 `increaseLevel()` | 立即 +250,000 cap；不增加站点数量 | City 阶梯 +1 |
| 新建 Port | 50 ticks（5 秒） | 新海贸发船点；有 Factory 时可成为 Train 交易站 | Port / Factory 共享阶梯 +1 |
| 升级 Port | 即时 | 每次检查增加一次生成 chance；作为目的港时按 level 增加权重 | 共享阶梯 +1 |
| 新建 Factory | 20 ticks（2 秒） | 创建 Train station、连接附近 City / Port / Factory、开始生成 Train | 共享阶梯 +1 |
| 升级 Factory | 即时 | 总 Factory levels 增加，且该 Factory 每 tick 多一次生成 chance | 共享阶梯 +1 |

施工时长与 upgradable 标记来自 [Config.ts][src-config]；即时升级路径来自 [PlayerImpl][src-player]。Port level 的两种作用来自 [PortExecution.ts L71-L82、L123-L141][src-port]。Factory level 的生成作用来自 [TrainStationExecution.ts L53-L62][src-train-station-exec]。

### 3. City 没有 4 级硬上限

v0.33.7 的 `canUpgradeUnit()` 只检查类型可升级、单位有效、玩家存活/可建造与金币；没有 City level 上限判断。`increaseLevel()` 也只是递增 level。[PlayerImpl L1304-L1338][src-player] [UnitImpl.ts L625-L630][src-unit]

因此现有 structures 页面里的“max 4 levels”不能进入新长文。正确表达是：第 4 个总 City level 起边际价格已触及 1,000,000 上限，而不是 level 4 后无法继续升级。

### 4. City 的“容量 ROI”

City 不直接产生 Gold，所以不能用传统现金回收期评价；可比较每 Gold 购买的确定 cap：

| 总 City level 的边际档位 | 边际成本 | 新增 cap | cap / Gold |
|---:|---:|---:|---:|
| 第 1 | 125,000 | 250,000 | 2.00 |
| 第 2 | 250,000 | 250,000 | 1.00 |
| 第 3 | 500,000 | 250,000 | 0.50 |
| 第 4 及以后 | 1,000,000 | 250,000 | 0.25 |

在没有起始 Gold 和额外收入时，1x Human 基础收入攒出这四档分别约需 2 分 5 秒、4 分 10 秒、8 分 20 秒、16 分 40 秒。这个时间只是机会成本，不是 City 的金币回本时间。

## Port 与 Trade Ship

### 1. 一艘船何时会生成

已完工且 active 的 Port 每 10 ticks 检查一次，即常速下约每秒一次。每个 Port level 都会执行一次 chance；任一次成功即生成，全部失败则给本 Port 的 `tradeShipSpawnRejections` 逐次 +1。[PortExecution.ts L24-L60、L71-L84][src-port]

生成 odds 是：

```text
base = 1 - sigmoid(globalTradeShips, ln(2)/50, 400)
rejectionModifier = 1 / (rejections + 1)
odds = floor((100 * rejectionModifier) / base)
P(one trial succeeds) = 1 / odds
```

`sigmoid(x,r,m) = 1 / (1 + exp(-r * (x-m)))`，`chance(odds)` 的实现确实是概率 `1 / odds`。[Config.ts L340-L353][src-config] [Util.ts L440-L446][src-util] [PseudoRandom.ts L92-L95][src-random]

这里的 `globalTradeShips` 是整个 game 对各玩家 `unitCount(TradeShip)` 的求和，不是某个玩家或某个 Port 的船数。[GameImpl.ts L350-L355][src-game] `rejections` 是这个 Port 连续随机 trial 失败次数；更多 rejections 会让 odds 变小、下一次成功率提高。它是 pity timer，**不是禁运惩罚，也不是玩家主动拒收贸易的次数**。

固定全局船数、始终存在有效目的港时，按源码逐 trial 计算的 level-1 Port 期望等待如下。这是便于写 ROI 场景的派生值，不是硬性计时器：

| 全局 active Trade Ships | 无 pity 时首 trial 概率 | 含 pity 的期望检查数 | 常速约秒数 |
|---:|---:|---:|---:|
| 0 | 1 / 100 | 12.0 | 12.0 s |
| 200 | 1 / 106 | 12.3 | 12.3 s |
| 300 | 1 / 125 | 13.3 | 13.3 s |
| 400 | 1 / 200 | 17.2 | 17.2 s |
| 500 | 1 / 500 | 27.4 | 27.4 s |
| 600 | 1 / 1,699 | 51.0 | 51.0 s |

level 2 / 3 Port 在全局 400 艘时，按同样假设约需 8.8 / 6.1 次每秒检查。文章应写“升级提高生成尝试与吞吐”，不要承诺固定 spawn interval。

### 2. 有效目的港与选择权重

源 Port 只考虑：

- 属于其他玩家；
- 双方没有任一方向的 embargo；
- 与源 Port 邻接水域属于同一 water component。

`canTrade()` 对任意不同玩家默认成立，只有任一方向 embargo 才阻断；因此海贸不要求 alliance。[PlayerImpl L1075-L1082][src-player] [PortExecution.ts L99-L121][src-port]

候选按 Manhattan distance 排序，再扩成权重列表：目的 Port 每个 level 占一个权重；距离不低于 300 的前若干近邻会再加一份；friendly 目的港在距离不低于 300 时再加一份。[PortExecution.ts L123-L141][src-port]

实现顺序有一个重要边界：Port 先完成 spawn chance，再查询 `tradingPorts()`。如果没有有效目的港，本次 tick 不会创建船；而一次已成功的 chance 已把 pity 计数清零。[PortExecution.ts L47-L60、L71-L82][src-port] 所以“先有可交易目的港”不是编辑建议，而是避免浪费生成机会的机制条件。

### 3. 航程结算

Trade Ship 每移动一个 water tile，`tilesTraveled` 增加 1；到达时按实际 traveled tiles 结算：

```text
G(d) = floor((75,000 / (1 + exp(-0.03 * (d - 300)))
             + 50 * d) * goldMultiplier)
```

正常抵达时，源 Port owner 与目的 Port owner **各自**获得完整的 `G(d)`；不是两人平分。被 Warship 俘获的船改道并抵达俘获者 Port 时，只有当前船主获得一份 `G(d)`。[TradeShipExecution.ts L128-L203][src-trade-ship]

1x multiplier 的单方每次正常抵达收入与第一档 Port 的静态回本次数：

| 实际航程 d | 单方 G(d) | 125,000 / G(d) | 至少完整抵达数 |
|---:|---:|---:|---:|
| 50 | 2,541 | 49.2 | 50 |
| 100 | 5,185 | 24.1 | 25 |
| 200 | 13,556 | 9.2 | 10 |
| 300 | 52,500 | 2.4 | 3 |
| 400 | 91,443 | 1.4 | 2 |
| 600 | 104,990 | 1.2 | 2 |
| 1,000 | 124,999 | 1.0 | 2 |

表格只计算 Port owner 自己拿到的抵达收入，忽略等待、航行、俘获、毁船、目的港变化、Gold multiplier 与 Port / Factory 的共享机会成本。若把两方总收入当成己方回本，会把 ROI 错算成两倍。

### 4. Port level 不直接提高单船收入

`tradeShipGold()` 的参数只有距离与收款玩家，未读取源 Port level 或目的 Port level。Port 升级通过更多生成 trial、以及目的港权重间接提高网络收入；它不为同一条已完成航程乘单船奖金。[Config.ts L332-L337][src-config] [PortExecution.ts][src-port]

因此本站生成数据中的“Higher level = better trade ship spawn rate and revenue”只能解释为总吞吐的编辑摘要；新长文应改成“更高 level 提高发船尝试和目的港选择权重，单船结算仍只看实际航程与 Gold multiplier”。

## Factory、Train 与铁路

### 1. Factory 如何形成网络

Factory 完成后总会成为 Train station，并把 110 tiles 范围内的 City、Port、Factory 加入 station network；反过来，City / Port 只有附近已经存在 Factory 时才创建 station。[FactoryExecution.ts L34-L46][src-factory] [CityExecution.ts L34-L42][src-city] [PortExecution.ts L86-L94][src-port]

直接铁路连接要求：station 距离大于 15、邻居搜索半径不超过 110、寻路结果非空且 path length 小于 `110 * 1.4142 = 155.562`。放置预览最多显示 5 条候选 ghost paths。[Config.ts L322-L329][src-config] [RailNetworkImpl.ts L243-L314、L317-L389][src-rail]

这意味着 Factory 不是“摆下就有收入”：它至少需要 cluster 中有一个可交易的 City / Port destination。Factory 自己是生成站，不是结算站。

### 2. Train 生成

源码把 `F` 定义为 owner 的 `unitCount(Factory)`；该计数是所有 Factory levels 之和。生成 odds 为：

```text
R(F) = (F + 10) * 15
```

每个会发车的 Factory 在每 tick 对自己的每个 level 做一次 `1 / R(F)` chance，单个 Factory 一 tick 最多成功一次；每次成功后该 Factory 有 10 ticks 的最小 cooldown。只有 cluster 存在可交易 City / Port，才进入生成 chance。[PlayerImpl L451-L459][src-player] [Config.ts L292-L295][src-config] [TrainStationExecution.ts L53-L98][src-train-station-exec]

当所有 Factory 都是 level 1 时，代码注释给出的全网期望发车率是 `F / R(F)` trains / tick：

| F（总 Factory levels） | R(F) | 理论平均发车间隔 |
|---:|---:|---:|
| 1 | 165 | 16.5 s |
| 2 | 180 | 9.0 s |
| 3 | 195 | 6.5 s |
| 5 | 225 | 4.5 s |
| 10 | 300 | 3.0 s |
| 20 | 450 | 2.25 s |

若 levels 集中在少数高等级 Factory，因同一 Factory 每 tick 最多发一列车，精确值会略低于 `F/R(F)`；成功后的 1 秒 cooldown 也会进一步限制高密度情况。文章可用表格做低密度估算，但不能把它写成保证 interval。

### 3. 目的地、路线与结算

Factory 从 cluster 中随机选择一个 `tradeAvailable()` 的 City / Port 作为 destination；实现使用 reservoir sampling，所以每个 eligible trade station 等概率，不按 level、距离或利润加权。[TrainStation.ts L158-L235][src-train-station] [TrainStationExecution.ts L70-L96][src-train-station-exec]

Train 以 2 tiles / tick 行驶。它沿 station path 前进，每到一个 City 或 Port 就先结算，再把 `tradeStopsVisited` 加 1；经过 Factory 不结算。[TrainExecution.ts L15-L27、L245-L273][src-train] [TrainStation.ts L15-L55][src-train-station]

每个 trade stop 的 train owner 收入为：

```text
base = ally 35,000 | team 25,000 | other 25,000 | self 10,000
penaltyStops = max(0, tradeStopsVisited - 9)
G = max(5,000, base - 5,000 * penaltyStops) * goldMultiplier
```

前 10 个 stop index（0 到 9）不罚；第 11 个 stop 开始每站减 5,000，最低 5,000。测试覆盖了 self、ally、team 与 other 的边界。[Config.ts L297-L319][src-config] [TrainStation.test.ts L208-L264][test-train-station]

外方 station 的 owner 与 train owner 各获得完整一份 `G`；self station 因两者是同一 player，只记一份。`ally` 的 35,000 高于 teammate / other 的 25,000，是当前代码事实，不要按直觉“修正”成 teammate 最高。[TrainStation.ts L21-L37][src-train-station]

Train 收入没有直接距离奖金。更长路线只会增加抵达时间；只有它确实经过更多有效 City / Port stop 时，才可能增加本列车总结算，而且超过 10 站开始衰减。玩家也不是手选每趟最赚钱目的地，destination 是随机的。

### 4. 可复用 Train ROI 示例

场景 A：已有一个可用 self City，只增建第一档 level-1 Factory，成本 125,000。

- 每次只到一个 self stop：10,000 / train，需要 13 次抵达覆盖 Factory 成本。
- 低密度理论平均约 16.5 秒发一列，忽略旅行时间和失败路线时，约 214.5 秒（3 分 35 秒）生成 13 列。
- 若 Factory 与 City 相距 100 path tiles，Train 速度 2 tiles / tick，单程约再加 5 秒，但列车可以并发，长期吞吐主要由发车率决定。

场景 B：从零新建第一档 City + 第一档 Factory，总投入 250,000。

- 单 stop self 收入需要 25 次抵达。
- 单 stop ally 收入需要 8 次抵达；单 stop team / other 收入需要 10 次抵达。
- 若是外方 stop，外方 station owner 同时得到同额收入，但这不是 train owner 的额外回款。

场景 C：已有一个 Port 后才建 Factory。共享阶梯使 Factory 成本变为 250,000；若目的 City 已是 sunk cost，则上述 Factory-only 回本次数翻倍为 self 25、ally 8、team / other 10。

这些都只是 steady-state 算术：没有计入 Factory / station 被占领、disabledUnits、铁路寻路失败、随机 destination、多个中间 stop、Gold multiplier 或前线风险。它们适合文章中的“同一假设下比较”，不适合作为保证几分钟回本的承诺。

## 经济引擎决策框架

### 选择 City

选择信号：当前 Troops 已长期在高 cap ratio，恢复受上限而不是战争损耗限制；需要不扩边界就增加军力容量；或铁路网络需要一个新的安全 trade station。

优先升级旧 City：只需要 cap、前线不适合新增脆弱节点、希望立即生效。优先新建 City：同价位下还需要另一个空间站点、网络冗余或更好的站间距离。两者每 level 的 cap 与成本推进完全相同。[Config.ts][src-config] [PlayerImpl][src-player]

不选 City：Troops 远低于现有 cap，真正问题是持续战损、前线暴露或缺 Gold。City 不会增加基础 worker income。

### 选择 Port

选择信号：存在同 water component 的外方 Port；路线实际航程最好接近或超过 300；海面可控；全局 Trade Ship 数尚未让等待恶化到无法接受；第一笔共享阶梯投资能立即发船。[PortExecution.ts][src-port] [TradeShipExecution.ts][src-trade-ship]

优先升级现有 Port：当前目的港集合可靠，希望提高生成 trials，又不需要新的水域入口。优先新建 Port：需要进入另一个 water component、提高空间冗余或建立不同航程；但它会与 Factory 一起推进共享价格。

不选 Port：没有外方目的港、双方 embargo、路线过短、航线无法保护，或海上布局会把建筑直接送给对手。源码没有“4 到 6 个 Port 必然最优”的局部数量规则。

### 选择 Factory

选择信号：Factory 未在 `disabledUnits`；核心区可用 15–110 的 station 间距连接 City / Port；陆地网络比海路稳定；当前共享阶梯价格与预期 stop 收入匹配。[Config.ts L219-L220][src-config] [RailNetworkImpl.ts][src-rail]

优先升级现有 Factory：网络 topology 已足够，只缺发车吞吐。优先新建 Factory：需要把另一组 City / Port 拉入网络、增加不同位置的发车点或减少单点失守风险。

不选 Factory：没有 eligible City / Port，rail path 超长/不可达，Factory 被 lobby 禁用，或所有站都在即将失守的边界。当前正式公共 playlist 的默认 `disabledUnits` 为空，不能再写“Train 只存在于单人和私人大厅”；自定义 lobby 仍可单独禁用 Factory。[MapPlaylist.ts][src-playlist] [Schemas.ts][src-schemas]

### Port vs Factory 的共享成本机会

| 当前已支付的 Port + Factory levels | 下一档成本 | 最值得先解锁的条件 |
|---:|---:|---|
| 0 | 125,000 | 哪个网络现在已经有有效 partner / station，就先买哪个 |
| 1 | 250,000 | 第二引擎必须解决第一引擎解决不了的路线风险 |
| 2 | 500,000 | 要求已有可观察的成功抵达，而非只看按钮可买 |
| 3+ | 1,000,000 | 多数情况下先比较升级现有吞吐、保护网络或保留流动性 |

一个 Port → Factory → Port 的总成本是 875,000；Factory → Port → Factory 也是 875,000。总价相同，但首笔 125,000 解锁的现金流类型不同，因此顺序的价值来自启动时点与地图适配，而不是折扣。

## 正文可采用的数字场景

### 场景 1：10,000 tiles、当前 90% cap

无 City 时 cap 约 602,377，当前 Troops 约 542,139，每秒自然增长约 3,846。增加一个 City level 后 cap 变为 852,377；在 Troops 不变时，cap ratio 立刻降到 63.6%，增长 headroom 显著恢复。

这是 City 最有说服力的用法：不是“多 250k 看起来很大”，而是把接近饱和的军力条重新拉回可增长区间。若当前只有 25% cap，City 则不会解决低兵力的主因。

### 场景 2：短海贸与跨海贸

100 tiles 航程每方只结算约 5,185，第一档 Port 静态需要 25 次抵达；400 tiles 航程每方约 91,443，静态只需 2 次。即使长线航行时间约多 30 秒，它仍可能拥有更高的单船收益，但只有能存活抵达时才成立。

这组对比适合解释 300 的 sigmoid midpoint 是收入曲线转折，不是“300 以下不能交易”。

### 场景 3：安全内陆 self Train

第一档 Factory 接入已有 City：125,000 / 10,000 = 12.5，因此第 13 次单站抵达覆盖建筑成本。它的优点是确定的陆路拓扑和不需要外方关系；缺点是 self stop 单价最低，且 Factory 没有 City / Port 就完全不结算。

### 场景 4：与 ally 的 Train network

同样的第一档 Factory，单 ally stop 为 35,000，4 次抵达即可超过 125,000；但 station owner 每次也拿 35,000。它是双方同时增长的网络，不是单方面套利。Alliance 结束并不自动阻断 trade；真正阻断条件是 embargo，不过关系改变会把以后 stop 的 base 从 ally 35,000 改成 other 25,000。[PlayerImpl][src-player] [TrainStation.ts][src-train-station]

## 现有内容的纠错与去重清单

新长文不应原样继承以下说法：

| 旧说法 | v0.33.7 事实 | 处理建议 |
|---|---|---|
| Port level 提高 per-ship revenue | 单船公式只读航程与收款方 multiplier | 改为提高生成 trials 和目的港权重 |
| 更多 `rejections` 让 spawn 更慢 | `1/(rejections+1)` 让 odds 下降、chance 上升 | 明确称为随机失败 pity timer |
| `rejections` 是 embargo mercy / 拒收次数 | 它只在 `shouldSpawnTradeShip()` trial 失败时增加 | embargo 单独解释为目的港资格过滤 |
| Trade spawn 公式 midpoint 写 200 | 正式代码为 400 | 公式与正文统一写 400 |
| City max 4 levels | 当前 upgrade 路径无 City level cap | 改成“第 4 个总 level 起价格封顶 1M” |
| Factory rail max 120 tiles | 当前 station max range 110，path length 必须 `<155.562` | 分开写空间半径与实际 path limit |
| Train 只在单人 / 私人大厅 | v0.33.7 公共 playlist 默认 `disabledUnits: []` | 改成“Factory 可由 lobby 禁用，先检查设置” |
| Train 的 5k 是 distance penalty | 代码按已经访问的 trade stop 数惩罚，没有距离项 | 改称 long-route / stop-count penalty |
| 更多 City 天然提高 Train destination 权重 | Train eligible station 等概率，不看 City level | 写成“更多空间节点改变 destination pool 与路径” |
| 固定“4–6 Ports 最优” | 源码只有全局船数抑制、共享成本与逐 Port pity | 删除固定数量，改用边际条件判断 |

相关现有页面为 `/mechanics/trade/`、`/mechanics/structures/` 与五语版本；生成 JSON 本身不得手改，纠错应回到 extraction snapshot 或消费页面。此来源包只记录事实，不修改这些文件。

## 推荐的长文结构与页面职责

建议把新长文定位为“经济决策页”，避免复制现有 mechanics 公式表或通用 `economy-fundamentals`：

1. **直接答案**：用当前瓶颈选择 City / Port / Factory。
2. **人口真相**：cap、增长曲线、Workers 不是独立人口池。
3. **共同预算**：City 独立阶梯，Port / Factory 共享阶梯；新建与升级的机会成本。
4. **City 决策**：何时 cap-limited，升级与新建如何选。
5. **Port 决策**：有效 partner、水域、航程收入、pity 与全局抑制。
6. **Factory 决策**：station topology、随机 destination、relation payout、生成吞吐。
7. **四个数字场景**：本文前述 10k tiles、100 vs 400 海贸、self Train、ally Train。
8. **失败模式与反制**：短航线、无目的港 Factory、裸露节点、共享阶梯误判、把双方总收入算成己方收入。
9. **版本来源面板**：正式 v0.33.7 与 extract `0668045...` 分开显示。

推荐页面内部工具：

- 输入 tiles、current troops、City levels，输出 cap、cap ratio、当前每秒增长与增加一 City level 后的变化。
- 输入 Trade Ship 实际航程与 multiplier，输出双方各自结算额，而不是只显示“总产出”。
- 输入 Factory total levels、关系与 stop 数，输出低密度发车估算、单 stop payout 和静态回本 arrivals。
- Port / Factory 共享阶梯 stepper，显示下一 level 对另一个类型价格的影响。

工具必须把随机生成、路线存活和 destination 选择标注为假设，不能把公式输出包装成保证收益。

## 写作核验清单

- [ ] 标题或来源面板写 v0.33.7，而不是把 `_meta.upstreamCommit` 说成 v0.33.7 tag。
- [ ] 同时披露 extract commit `0668045...` 与 `upstreamVersion: v33` 的不同含义。
- [ ] 所有 Gold / tick 换算使用 10 ticks / 秒，并注明 multiplier 假设。
- [ ] City cap 只统计已完工 levels；不写 4 级硬上限。
- [ ] Port / Factory 价格使用共享总 levels；City 使用自己的总 levels。
- [ ] 单船结算写源、目的双方各拿 `G(d)`；captured voyage 另列。
- [ ] 把 pity 与 embargo 分开；更多随机失败提高后续 chance。
- [ ] Trade Ship spawn suppression 写全局 active ships、midpoint 400。
- [ ] Train 收入按 stops，不按 travel distance；先写 stop relation，再写 penalty。
- [ ] Factory 的 `F` 是总 Factory levels，不只是实体建筑数。
- [ ] 区分静态 arrivals 回本与真实时间回本；真实时间必须包含等待、行驶和风险假设。

## 一手来源索引

### 正式版本与比较

- [v0.33.7 正式 Release][release-337]
- [v0.33.7 tag ref / commit][tag-ref-337]
- [提取 checkout 到 v0.33.7 的 compare][compare-extract-337]

### 正式 tag 源码

- [Config.ts：成本、cap、增长、Train、Trade Ship][src-config]
- [PlayerExecution.ts：每 tick 独立增加 Troops 与 worker Gold][src-player-execution]
- [PlayerImpl.ts：level 计数、成本计数、upgrade、canTrade][src-player]
- [PortExecution.ts：检查周期、pity、目的港过滤与权重][src-port]
- [TradeShipExecution.ts：航程与双方结算][src-trade-ship]
- [FactoryExecution.ts / CityExecution.ts][src-factory] [src-city]
- [TrainStationExecution.ts / TrainExecution.ts / TrainStation.ts][src-train-station-exec] [src-train] [src-train-station]
- [RailNetworkImpl.ts：station 范围与 path 限制][src-rail]
- [GameImpl.ts：全局 unit count][src-game]
- [StatsSchemas.ts / StatsImpl.ts：Workers 是金币统计来源][src-stats-schema] [src-stats-impl]
- [PseudoRandom.ts / Util.ts：chance 与 sigmoid][src-random] [src-util]
- [MapPlaylist.ts / Schemas.ts：默认与可配置 disabledUnits][src-playlist] [src-schemas]
- [UnitImpl.ts：level 递增][src-unit]

### 正式 tag 测试

- [ConstructionCost.test.ts：施工中与俘获 City 的成本边界][test-construction-cost]
- [TrainStation.test.ts：stop penalty 和 relation payout][test-train-station]
- [PortExecution.test.ts：目的 Port level 权重、近距离边界][test-port]
- [TradeShipExecution.test.ts：抵达双方得金与俘获改道][test-trade-ship]
- [RailNetwork.test.ts：path 长度、min range 与 ghost path][test-rail]

### 本站生成数据

- [`src/data/_meta.json`](../../src/data/_meta.json)
- [`src/data/formulas.json`](../../src/data/formulas.json)
- [`src/data/structures.json`](../../src/data/structures.json)

[release-337]: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7
[tag-ref-337]: https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.33.7
[compare-extract-337]: https://github.com/openfrontio/OpenFrontIO/compare/0668045fa926eaa6d6995561a8e13fd8126895b6...v0.33.7
[src-config]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/configuration/Config.ts
[src-player-execution]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/PlayerExecution.ts
[src-player]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/PlayerImpl.ts
[src-port]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/PortExecution.ts
[src-trade-ship]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/TradeShipExecution.ts
[src-factory]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/FactoryExecution.ts
[src-city]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/CityExecution.ts
[src-train-station-exec]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/TrainStationExecution.ts
[src-train]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/TrainExecution.ts
[src-train-station]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/TrainStation.ts
[src-rail]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/RailNetworkImpl.ts
[src-game]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/GameImpl.ts
[src-stats-schema]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/StatsSchemas.ts
[src-stats-impl]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/StatsImpl.ts
[src-random]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/PseudoRandom.ts
[src-util]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/Util.ts
[src-playlist]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/server/MapPlaylist.ts
[src-schemas]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/Schemas.ts
[src-unit]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/UnitImpl.ts
[test-construction-cost]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/economy/ConstructionCost.test.ts
[test-train-station]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/core/game/TrainStation.test.ts
[test-port]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/PortExecution.test.ts
[test-trade-ship]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/core/executions/TradeShipExecution.test.ts
[test-rail]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/core/game/RailNetwork.test.ts

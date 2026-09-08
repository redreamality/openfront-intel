# OpenFront Team 经济空间官方核验笔记

访问日期：2026-09-09
核验范围：OpenFrontIO 官方 GitHub `v0.33.14` release/tag，以及当日 API 可见的 `main`。
适用边界：`v0.33.14` tag 对应提交 [`577819ba0e1e13ecdbc8dede2ba33de542c88a67`](https://github.com/openfrontio/OpenFrontIO/commit/577819ba0e1e13ecdbc8dede2ba33de542c88a67)，正式发布页为 [`v0.33.14`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.14)。当前 `main` API head 为 [`2052d9f87ea7c295fbfb2a5adbf80cd104934541`](https://github.com/openfrontio/OpenFrontIO/commit/2052d9f87ea7c295fbfb2a5adbf80cd104934541)，后者是未发布开发状态，不能反写成 v0.33.14 能力。

## 结论速览

| 主题 | 可写事实 | 版本与局限 |
| --- | --- | --- |
| teammate/friendly | `isOnSameTeam` 只认双方同一非 Bot team；`isFriendly` = 同队或联盟，断线玩家默认不 friendly；自己虽 friendly，但不能向自己捐赠 | v0.33.14 与 main 逻辑一致；`ColoredTeams.Bot` 特殊排除 |
| Team donation | Team 公共配置把 Gold/Troop donation 设为 `true`；接收人为 Human 时才检查这两个开关；每个发送者-接收者共享 100 ticks（10 秒，100 ms/tick）冷却 | 私人房间可自定义开关；不能把“Team 模式”概括为任何房间都可捐 |
| City/Factory/Port 成本 | City 独立计数；每个玩家自己的 Port 与 Factory 共享计数：`min(1,000,000, 2^n × 125,000)`；首栋 125,000、第二栋 250,000、第三栋 500,000、第四栋及以后封顶 1,000,000 | 成本按该玩家已建造数量（`min(unitsOwned, unitsConstructed)`）计；仅捕获而未建造的结构不会抬高下一栋价格，队友之间不共用 n |
| Train | Train 单位成本 0；每列 5 节车厢（加前后引擎共 7 个 Train 单位）；生成率 `(Factories + 10) × 15` ticks，每站每级独立 roll，站间最小冷却 10 ticks | 具体产量受 RNG、站点和可交易目的地影响；不要把快照产量当固定每分钟承诺 |
| Team rail payout | Train 停在 teammate 的 City/Port 时，关系档位是 `team`，基础 25,000 Gold；列车拥有者与站点拥有者各得同额 | 与 `other` 同档，不是 `ally` 的 35,000；前 10 个贸易站点不扣距离罚金，之后每站 -5,000，最低 5,000 |
| 结构所有权 | City/Factory/Port/SAM/Silo/Warship 等非 Defense Post 结构在领土易主时转给新占领者并保留等级；Defense Post 被摧毁 | v0.33.14 的官方测试直接锁定 City 转移和 Defense Post 销毁；铁路对象本身没有 owner 字段 |

## 1. Team、teammate 与 friendly 的边界

来源：[`PlayerImpl.isOnSameTeam/isFriendly`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/PlayerImpl.ts#L1151-L1176)，[`Team.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/Team.test.ts#L12-L71)。

- `isOnSameTeam(other)` 对自己、任一方没有 team、或任一方属于 `ColoredTeams.Bot` 都返回 `false`；否则只比较同一 team 值。因而“都是 Bot”不等于可享受 teammate 关系，官方测试明确验证 Bot team 仍可互相攻击。
- `isFriendly(other)` 对自己返回 `true`；断线对手在默认 `treatAFKFriendly=false` 时返回 `false`；其余情况只有“同队”或“已结盟”才 friendly。不要把地图相邻、同一联盟请求、或同一公共房间写成自动 teammate。
- 捐赠与部分贸易入口调用的是 `isFriendly`、`isOnSameTeam` 或 `canTrade`，三者不是同义词：`canTrade` 只拒绝双方任一方存在 embargo 且不要求同队/联盟（[`PlayerImpl.canTrade`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/PlayerImpl.ts#L1100-L1104)）。因此 teammate 可以交易，但解除联盟不必然关闭贸易，除非出现 embargo。

## 2. Donation：共享资源不是无条件按钮

来源：[`MapPlaylist.gameConfig`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/server/MapPlaylist.ts#L138-L189)、[`MapPlaylist.get2v2Config`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/server/MapPlaylist.ts#L438-L467)、[`GameConfigSchema`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/Schemas.ts#L387-L392)、[`PlayerImpl.canDonateGold/canDonateTroops`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/PlayerImpl.ts#L963-L1021)、[`Config.defaultDonationAmount/donateCooldown`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/configuration/Config.ts#L593-L598)。

- 自动 Team 公共配置（包括 2v2 ranked）将 `donateGold` 与 `donateTroops` 设为 `true`；FFA 1v1 配置将两者设为 `false`。Schema 注释写明两个开关“configures donations to humans only”，所以不能把关闭开关解释成禁止向所有 AI/Nation 关系捐赠。
- 两类捐赠都要求 sender 与 recipient 存活、recipient 不是自己、`isFriendly(recipient)` 为真；Human recipient 还要求对应开关为真。发送后同一 `sentDonations` 列表记录双方，Gold 与 Troop 共用 recipient 冷却，不是各自独立计时器。
- `donateCooldown()` 是 `10 * 10 = 100` ticks；`msPerTick()` 是 100，因此正常 tick 速度约为 10 秒。冷却是每个发送者到每个接收者的配对限制，不是全队共享一个全局池。
- Troop donation 的 null 数量默认为 `floor(sender.troops()/3)`，并在执行初始化时截断到 `recipient.maxTroops - recipient.troops()`；小于等于 0 的有效数量直接取消（[`DonateTroopExecution`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/DonateTroopExecution.ts#L31-L52)）。因此“捐三分之一”是默认请求值，不保证实际到账三分之一。
- Gold donation 的 null 数量默认为 sender 当前 Gold 的三分之一；显式数量必须为正，实际扣除不会超过 sender 现有余额（[`DonateGoldExecution`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/DonateGoldExecution.ts#L28-L57)、[`PlayerImpl.donateGold`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/PlayerImpl.ts#L1043-L1060)）。
- 官方 [`Donate.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/Donate.test.ts#L8-L127) 验证结盟后 5,000 Troops/Gold 可到账；同文件 [`non ally` 测试](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/Donate.test.ts#L129-L240)验证未结盟时捐赠不发生；[`AllianceDonation.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/AllianceDonation.test.ts#L38-L127)验证同一 tick 接受联盟后可立即捐赠。

## 3. City、Factory、Port 的共享成本与建造时长

来源：[`Config.unitInfo`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/configuration/Config.ts#L411-L421)、[`City/Factory` cost](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/configuration/Config.ts#L485-L507)、[`Config.costWrapper`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/configuration/Config.ts#L572-L590)、[`ConstructionCost.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/economy/ConstructionCost.test.ts#L11-L76)。

- City：成本 `min(1,000,000, 2^n × 125,000)`，`n` 只统计该玩家已经建造的 City；普通建造时长 20 ticks（2 秒）。每级 City 另加 `+250,000` troop cap（[`Config.cityTroopIncrease`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/configuration/Config.ts#L226-L228)）。
- Port：成本公式中的 `n` 与同一玩家的 Factory 共享（该玩家 Port + Factory 的已建造数），普通建造时长 50 ticks（5 秒）。
- Factory：与同一玩家的 Port 共享同一个 `n`，普通建造时长 20 ticks（2 秒）。因此例子是：该玩家已有 1 Port 后再建 Factory = 250,000；该玩家已有 Port+Factory 共 3 栋后下一栋两类任一 = 1,000,000 封顶。队友各自的计数不会互相抬价。
- `costWrapper` 对每类结构把 `min(player.unitsOwned(type), player.unitsConstructed(type))` 累加。官方回归测试明确写出首个 City 125k、第二个 250k、第三个 500k，并验证“捕获的 City 不会抬高建造价格”。这是共享成本的关键边界：捕获会增加 owned，但不会伪装成 constructed。
- Train 的 `unitInfo` 成本为 0；不要从 City/Factory/Port 的 Gold 阶梯推导“每列火车还要额外付费”。列车生成和移动仍受站点、铁路和交易关系限制。

## 4. 铁路连接、站点和所有权

来源：[`Config.trainStation* / railroadMaxSize`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/configuration/Config.ts#L344-L351)、[`RailNetworkImpl.computeGhostRailPaths`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/RailNetworkImpl.ts#L243-L315)、[`RailNetworkImpl.connectToNearbyStations`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/RailNetworkImpl.ts#L317-L361)、[`RailNetwork.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/core/game/RailNetwork.test.ts#L240-L310)。

- `trainStationMinRange()` = 15 tiles；`trainStationMaxRange()` = 110 tiles；`railroadMaxSize()` = `110 × 1.4142 = 155.562`，实际判断为 `path.length > 0 && path.length < railroadMaxSize()`，等于或超过上限都会被跳过。官方 v0.33.14 release 的累计说明也明确提到修复铁路网络 path-length limit 并恢复相关测试（[`v0.33.14 release`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.14)）。
- Ghost 预览只考虑 City/Port/Factory；每次最多返回 5 条候选路径。距离小于等于 15 的邻站会跳过。City/Port 只有在 110 格范围已有 Factory 时才会加入网络；Factory 则可在没有预先 Factory 的情况下拉入附近结构（`RailNetwork.test.ts` 的对应测试）。
- Factory 创建自己的 TrainStation，并为 110 格内尚未有 station 的 City/Port/Factory 创建 station；City/Port 自己只有发现附近 Factory 才注册 station（[`FactoryExecution`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/FactoryExecution.ts#L34-L47)、[`CityExecution`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/CityExecution.ts#L34-L43)、[`PortExecution`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/PortExecution.ts#L86-L95)）。
- `Railroad` 只保存 `from`、`to`、tile path 与 id，没有 `owner`/team 字段（[`Railroad`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/Railroad.ts#L6-L21)）。因此“共享铁路”在代码层是共享连接图，不是某个 teammate 购买后拥有的道路；可用性由端点 station 的 unit owner、`canTrade`、站点 active 状态决定。

## 5. Train 的 Team 收益数字

来源：[`Config.trainGold/trainSpawnRate`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/configuration/Config.ts#L314-L342)、[`TrainStation.onTrainStop` 与 `rel`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/TrainStation.ts#L15-L37)、[`TrainStation.tradeAvailable`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/TrainStation.ts#L74-L77)、[`TrainStationExecution`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/TrainStationExecution.ts#L6-L98)、[`TrainExecution`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/TrainExecution.ts#L239-L273)。

- `trainSpawnRate(numPlayerFactories) = (numPlayerFactories + 10) × 15`。这是每次站点检查的分母；`TrainStationExecution` 还要求两次列车至少间隔 10 ticks，并按 station level 重复 roll。每列默认 5 节车厢；`TrainExecution.createTrainUnits` 实际创建前引擎、尾引擎和 5 节车厢，共 7 个免费 Train 单位。
- 目的地关系由 `rel(trainOwner, stationOwner)` 精确分档：自己 `self` = 10,000；同队 `team` = 25,000；联盟但非同队 `ally` = 35,000；其他可交易关系 `other` = 25,000。前 10 个 trade stops（`citiesVisited` 0–9）不扣罚；从第 10 个起每多一站 -5,000，最低 5,000；Gold multiplier 再乘在最后。
- 外部站点停靠时，`stationOwner` 与 `trainOwner` 各获得同额 `gold`，不是从队友账户转账。`TrainStation` 的测试验证外部站点双方都调用 `addGold(500n)`，并分别记录 external/self trade（[`TrainStation.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/core/game/TrainStation.test.ts#L84-L146)）。
- Team 目的地默认可交易：`tradeAvailable` 对同 owner 放行，否则调用 station owner 的 `canTrade`；`canTrade` 只检查 embargo。列车移动每一段都会再次检查 destination 可交易，途中出现 embargo、站点失活或铁路断开时会终止，不能把“曾经连通”写成永久收益保证。
- v0.33.14 官方测试给出可复述的公式快照：`team` 在 0、9 个站点均为 25,000；第 10/11/12/13 个站点分别为 20,000/15,000/10,000/5,000；之后保持 5,000（[`TrainStation.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/core/game/TrainStation.test.ts#L233-L263)）。

## 6. Port 的共享贸易边界

来源：[`PortExecution.tradingPorts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/PortExecution.ts#L97-L142)、[`TradeShipExecution.complete`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/TradeShipExecution.ts#L173-L203)、[`PortExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/PortExecution.test.ts#L15-L97)。

- Port 的贸易目的地筛选为“不是自己且 `canTrade`”，并要求同一 water component；teammate 不需要额外开关，但任一方向 embargo 会阻断。Port level 会把目的地重复加入权重；非过近且 friendly 时还会额外加权一次。过近距离会取消 proximity bonus。
- Trade ship 自身成本为 0；正常抵达时，源 Port owner 与目标 Port owner 各获得同额 `tradeShipGold(distance)`，并记录一次跨方到达。若船在途中被捕获，完成收益只给捕获后船主，不再给原/目标 Port 双方。
- 这意味着 Team Port 可以作为共享收入节点，但“队友 Port 互通”不是资源池合并：两边各自收到同额 Gold，且路线仍受水域连通、embargo、目标 Port active 状态和航程公式限制。

## 7. 结构易主与 Defense Post 例外

来源：[`PlayerExecution` 领土变化处理](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/PlayerExecution.ts#L45-L67)、[`UnitImpl.setOwner`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/UnitImpl.ts#L205-L224)、[`PlayerExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/core/executions/PlayerExecution.test.ts#L34-L85)。

- 每个 tick，若结构 tile 的地图 owner 已变更，`PlayerExecution` 对 Defense Post 调用 `delete(true, captor)`；其它 Structures 调用 `captor.captureUnit(u)`。非 Defense Post 的 City/Port/Factory/SAM/Silo/Warship 因而转移给新 owner，不降级。
- 官方测试验证：City 易主后仍 active、仍 level 1、全局数量不变，但 `city.owner()` 变为新玩家；Defense Post level 1 和 level 2+ 均被摧毁。这是写“共享建设”时必须保留的反制边界：队友不能靠领土易主保留 Defense Post。
- `UnitImpl.setOwner` 只更新 unit 所属玩家列表、last owner 和统计；`Railroad` 没有 owner 字段。结构捕获后，列车可否继续使用仍由 station active、rail graph 和 `tradeAvailable` 再检查决定；源码没有“道路自动归新 owner/新 team”的独立转移规则。

## 8. main 的新增核验（未发布，不得写成 v0.33.14）

当前 main head [`2052d9f87ea7c295fbfb2a5adbf80cd104934541`](https://github.com/openfrontio/OpenFrontIO/commit/2052d9f87ea7c295fbfb2a5adbf80cd104934541) 保留上述数值，同时新增以下可用于未来验证的官方测试/计数：

- [`TradeTrainGolden.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/2052d9f87ea7c295fbfb2a5adbf80cd104934541/tests/TradeTrainGolden.test.ts#L81-L128) 将 `trainGold` 的关系 × stops 网格和 `trainSpawnRate` factory sweep 固定为快照；例如 `team, stops=0/9/10/11/12/13` = 25,000/25,000/20,000/15,000/10,000/5,000，Factories `0/1/2/5/10` 的分母 = 150/165/180/225/300。
- [`TradeTrainScenarios.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/2052d9f87ea7c295fbfb2a5adbf80cd104934541/tests/TradeTrainScenarios.test.ts#L388-L512) 在真实 `plains` 地图、无 worker income、固定 ticks 下验证端到端经济。快照显示单 Factory + 单 City、3,000 ticks 观察到 98 个 Train unit、self trade 140,000、约 28,000 Gold/min；加入一个外部 City 时，A 侧总增量 260,000、B 侧 external trade 200,000。它们是确定性回归基准，不是所有地图/随机种子的保证。
- main 的 [`TrainStation.ts`](https://github.com/openfrontio/OpenFrontIO/blob/2052d9f87ea7c295fbfb2a5adbf80cd104934541/src/core/game/TrainStation.ts#L15-L39) 额外调用 `addTrainGold`，而普通 `addGold` 仍然执行；这只是收入分类/统计计数，不能据此写成新的可消费货币。main 的 `PlayerImpl` 提供 `trainGold()` 查询但本笔核验未发现把它从 Gold 余额中分离消费的建设规则。

## 写作限制

1. v0.33.14 正式 release 的版本边界应以 tag 源码和 release 页为准；main 的新快照、`addTrainGold` 或其它统计字段必须标为“main 未发布”。
2. “队友能共享建设”应具体写成：队友结构可作为同一 rail cluster 的站点、Train 在无 embargo 时可驶入、停靠时双方各得 payout；不能写成 Gold/结构/铁路 owner 合并成一个 team treasury。
3. 成本数字必须注明 Port/Factory 共享 `n`，City 不与它们共享；捕获结构不抬高下一栋建造价格；Defense Post 是领土易主即销毁的例外。
4. 所有收益场景需注明 map、ticks、站点数、关系和是否有 embargo/worker income。官方测试的快照只证明实现回归，不替代当前对局中的路径、RNG、站点 active 和模式配置核验。

# OpenFront 建筑时机五语攻略来源包

> 调研日期：2026-08-23（Asia/Vladivostok）。
>
> 核验版本：正式版 [v0.33.9][release-339]。v0.33.8 与 v0.33.9 只改了网络 / 桌面发布相关代码，没有改动建筑玩法；可在官方 [v0.33.7...v0.33.9 compare][compare-337-339] 中核对。
>
> 本文是供编辑核验的技术来源包，不是面向普通玩家的最终正文。玩家版已发布为 [English](/guides/building-timing/)、[中文](/zh/guides/building-timing/)、[Français](/fr/guides/building-timing/)、[Deutsch](/de/guides/building-timing/) 和 [Nederlands](/nl/guides/building-timing/)；五语正文使用日常语言，本文继续保留机制事实、策略推论与一手来源的边界。

## 先给答案

OpenFront 里不应该因为“钱刚好够”就立即造建筑。下面是一组瓶颈检查清单，不是所有对局都固定照排的优先级：

1. 正在守一个能稳定维持的陆地缺口：考虑 **Defense Post**。
2. 对手已经有核打击能力，而你的核心资产值得保护：提前造 **SAM**。
3. Troops 经常接近上限，和平期也长不动：造或升级 **City**。
4. 已经存在能实际结算的铁路或海贸网络：在 **Factory** 与 **Port** 中选一个。
5. 已有明确核打击目标，同时付得起 Silo 和弹药：造 **Missile Silo**。
6. 上述条件都不满足：保留 Gold 往往比造一栋暂时不工作的建筑更好。

| 建筑 | 应该建的信号 | 应该暂缓的信号 |
| --- | --- | --- |
| City | Troops 长时间接近 cap，且你还要囤兵或恢复 | 兵少是因为持续进攻、战损或刚被重创，而不是 cap 太低 |
| Factory | 安全范围内已有可接入的 City / Port，铁路能形成有效 cluster | 没有贸易站、线路不可达、大厅禁用 Factory，或节点就在易失守前线 |
| Port | 需要在该水域造 Warship；或同一水域已有可交易的外方 Port | 小湖里没有外方 Port、双方 embargo、航线过短或海面完全失控 |
| Defense Post | 战线会在同一狭口、桥头或边界停留，并能让 30 tiles 防区持续覆盖交战点 | 战线快速移动，或建筑本身会马上被踩掉 |
| Missile Silo | 你能同时承担 Silo、核弹和必要的防守成本，并已有高价值目标 | 只有 1,000,000 Gold，建完后连 Atom Bomb 都买不起 |
| SAM | 对手已有 Silo / 足够核弹预算，且核心建筑或兵力集群值得保护 | 没有可见核威胁，或 30 秒建造窗口已经来不及覆盖当前来袭 |

上表里的“长时间接近 cap”“高价值目标”等是**策略判断**。游戏没有写死“第几分钟必须造 City”或“必须有多少 Port”；地图尺寸、Gold multiplier、玩家关系和大厅禁用项都会改变答案。

## 当前版本的成本、时间与升级链

普通速度下 1 tick = 100 ms。以下成本假设正常 Gold、没有 `instantBuild` / `infiniteGold` 设置，并按玩家正常自建、持有建筑的常见情况列出。[Config.ts][src-config]

| 建筑 | 下一个 level / 新建筑的成本 | 新建时间 | 是否可升级 | 每个 level 的核心收益 |
| --- | ---: | ---: | --- | --- |
| City | 125k、250k、500k，之后每级 1M | 2 秒 | 是 | 已完工后 +250k Troops cap |
| Factory | 与 Port 共用：125k、250k、500k，之后每级 1M | 2 秒 | 是 | 多一次 Train 生成尝试；新建筑还能改变铁路拓扑 |
| Port | 与 Factory 共用同一阶梯 | 5 秒 | 是 | 多一次 Trade Ship 生成尝试；作为目的港时增加选择权重 |
| Defense Post | 50k、100k、150k、200k，之后每座 250k | 5 秒 | 否 | 新增一个 30-tile 防区；重叠防区不叠乘倍率 |
| Missile Silo | 每个 level 固定 1M | 10 秒 | 是 | 多一个独立导弹发射槽 |
| SAM Launcher | 第 1 level 1.5M；第 2 level 起每级 3M | 30 秒 | 是 | 多一个拦截槽，并提高拦截范围 |

成本公式分别是：

```text
City:             min(1,000,000, 2^n * 125,000)
Port / Factory:   min(1,000,000, 2^n * 125,000)  # 两类共用 n
Defense Post:     min(250,000, (n + 1) * 50,000)
Missile Silo:     1,000,000
SAM:              min(3,000,000, (n + 1) * 1,500,000)
```

这里的 level 不只来自新建；每次升级同样会推进相应的成本阶梯。当前 `canUpgradeUnit()` 没有为 City、Factory、Port、Silo 或 SAM 设置硬性等级上限；Defense Post 则根本没有 `upgradable` 标记。[PlayerImpl.ts][src-player] [UnitImpl.ts][src-unit]

升级路径本身是即时的，但只能升级己方、已完工、未标记删除且付得起下一档价格的结构。新建则必须等待表中的施工时间。[PlayerImpl.ts][src-player] [ConstructionExecution.ts][src-construction]

俘获和施工中计数存在一个源码边界：价格使用“当前有效持有 level”和“本人累计建造 level”两者的较小值。这个处理避免一次俘获高等级建筑就永久把自建价格推到很高；因此实战 UI 显示的下一档价格应优先于玩家手算。[Config.ts][src-config] [ConstructionCost.test.ts][test-construction-cost]

## City：被人口上限卡住时建，不是兵少就建

### 机制事实

普通 Human 的 Troops cap 是：

```text
maxTroops = 2 * (tiles^0.6 * 1,000 + 50,000)
          + 250,000 * 已完工 City level 总数
```

施工中的 City 不计入 cap。City 也不会提高基础 Gold 收入；它购买的是容量。领土项随 tiles 增长但边际递减，每个 City level 则固定增加 250,000。[Config.ts][src-config]

升级旧 City 与新建同价位 City level 都增加同样的 250,000 cap。区别在于：升级即时生效且不增加地图上的资产点；新 City 完工后可以成为新的铁路贸易站点，但只有附近存在 Factory 时才会接入 Train 网络。[PlayerImpl.ts][src-player] [CityExecution.ts][src-city]

### 策略判断

把 City 当作“解除 cap 瓶颈”的按钮：

- 当前 Troops 在没有持续战损时仍经常高于约 80%，而且你准备继续囤兵，可以开始考虑 City。
- 当前 Troops 已在 90% 左右且还在增长，City 通常比另一栋收入建筑更紧急。
- 当前 Troops 只有 cap 的 20% 至 50%，问题通常是战损、出兵过度或经济不足；City 不会让空掉的兵力立刻回来。

80% 与 90% 是便于决策的**经验阈值**，不是源码规则。真正的判断是：不提高 cap，接下来一段和平恢复是否会被上限截断。

只需要容量时，优先升级核心区旧 City：生效快，也不会新添一个可被占领的节点。只有新位置能改善铁路连接、分散单点失守风险，或者旧 City 不在安全位置时，才值得新建。

## Factory：先确认“有站可到”，再购买发车能力

### 机制事实

Factory 完工后成为 Train 生成站，并尝试连接附近 City、Port 和 Factory。直接铁路连接要求站点间距大于 15 tiles、搜索半径不超过 110 tiles，而且实际寻路长度必须小于 `110 * 1.4142`，约 155.562 tiles。[FactoryExecution.ts][src-factory] [RailNetworkImpl.ts][src-rail]

Factory 自己不是金币结算站。所属 cluster 至少要有一个可以交易的 City 或 Port，才会进入 Train 生成流程；目的地从合格站点中随机选择，并不按距离或利润自动挑最优路线。[TrainStationExecution.ts][src-train-station-exec] [TrainStation.ts][src-train-station]

若 `F` 是玩家拥有的 Factory level 总数，每个 level 的生成 chance denominator 为：

```text
R(F) = (F + 10) * 15
```

一个 level-1 Factory 在低密度下平均约 16.5 秒得到一次成功生成机会，但这是随机期望，不是固定班次；每个实体 Factory 成功后还有至少 10 ticks（1 秒）的发车 cooldown。[Config.ts][src-config] [TrainStationExecution.ts][src-train-station-exec]

Train 在 self City / Port 停站时给 Train owner 10,000 Gold；ally 是 35,000，teammate 或其他未 embargo 玩家是 25,000。外方 station owner 也各得一份，而不是与列车 owner 平分。结算看站点关系和已经访问的 stop 数，不看铁路距离。[Config.ts][src-config] [TrainStation.ts][src-train-station]

### 策略判断

付款前检查三件事：

1. 放置预览确实能连到至少一个 City 或 Port，而不只是连到另一个 Factory。
2. 这组站点大概率能在几分钟后仍由你或可交易对象控制。
3. 已经把 Port level 算进下一档 Factory 价格。

如果已有一个安全 self City，第一档 125,000 Factory 的静态成本需要 13 次 10,000 停站收入才能覆盖。这个数字只比较毛收入，不包含随机等待、行驶、占领、线路变化和机会成本，不能理解成“固定 3 分多钟回本”。

已有网络能稳定到站、只是列车太少时，升级现有 Factory。新位置能接入另一组 City / Port、绕开高风险区域或提供发车冗余时，才新建第二个 Factory。

没有任何 City / Port 贸易站时不要先造 Factory。铁路看起来存在，不等于会产生 Gold。

## Port：海军需求可以先行，纯经济则先看目的港和航程

### 机制事实

Port 只能放在己方海岸附近；点击点周围会搜索可用 shore。已完工 Port 是建造 Warship 的必要基地，Warship 会从目标水域同一连通水体内的可用 Port 出发。普通 Transport Ship 攻击不要求 Port。[PlayerImpl.ts][src-player] [TransportShipUtils.ts][src-transport-utils]

自动海贸还需要另一名玩家的 Port：两港必须邻接同一 water component，并且任一方向都没有 embargo。Alliance 不是必要条件。[PortExecution.ts][src-port]

已完工 Port 大约每秒检查一次 Trade Ship。每个 Port level 增加一次随机生成尝试；作为目的港时，该 Port 也按 level 增加候选权重。[PortExecution.ts][src-port]

单船正常抵达时，出发方和目的方各自获得完整的：

```text
G(distance) = floor((75,000 / (1 + exp(-0.03 * (distance - 300)))
                    + 50 * distance) * goldMultiplier)
```

Port level **不参与这个单船结算公式**。在 1x multiplier 下，100 tiles 航程每方约得 5,185；400 tiles 航程每方约得 91,443。升级 Port 提高的是预期吞吐，不是把同一趟船的收益放大。[Config.ts][src-config] [TradeShipExecution.ts][src-trade-ship]

### 策略判断

如果你必须在该水域造 Warship，Port 的军事价值可以独立于海贸成立。这时第一座 Port 可能应该早于 Factory，即使附近贸易路线不理想。

如果目的只是经济，至少满足以下条件再建：

- 同一连通水域已经有外方 Port；
- 关系没有被 embargo，且对方 Port 不会马上失守；
- 航线有生存机会，最好不是被 300-tile 短航程曲线明显压低的近距离往返；
- 你接受 Port 与 Factory 共用下一档价格。

当前水域已经验证能稳定到港、只缺发船量时升级旧 Port。新 Port 只有在它能打开另一片水域、提供新的 Warship 基地、改变航程或分散失守风险时才更值。

不要在孤立小湖里为了“被动收入”盲造 Port。没有合格目的港时，生成检查即使通过也不会创建 Trade Ship。

## Defense Post：给稳定战线买时间，不要插在马上会丢的格子上

### 机制事实

Defense Post 在 30 tiles 内影响己方被攻击的 land tile：防御计算中的 `mag` 乘 5，`speed` 乘 3。查到一个己方 Defense Post 后代码就停止搜索，所以多个防区重叠不会把倍率继续乘成 25 倍或更高。[Config.ts][src-config]

当前 v0.33.9 的 `DefensePostExecution` 没有启用对船只发射 shell 的逻辑；相关目标选择整段仍被注释。它的可靠作用是改变范围内的陆地防御计算，不应把它当成会主动射击 Warship 或 Transport Ship 的炮塔。[DefensePostExecution.ts][src-defense-post]

Defense Post 不能升级。第 1 至第 5 座的边际价格分别是 50,000、100,000、150,000、200,000、250,000，之后每座保持 250,000；新建需要 5 秒。[Config.ts][src-config]

它与其他结构的占领规则不同：一旦建筑所在 tile 被敌人取得，Defense Post 会直接销毁，不会转移给新 owner。官方测试同时覆盖 level 1 和内部构造的高 level Defense Post。[PlayerExecution.ts][src-player-execution] [PlayerExecution.test.ts][test-player-execution]

### 策略判断

Defense Post 最值得出现在“你确定要守、而且守得住”的位置：狭窄陆桥、山口、首都外围、重要铁路入口，或敌军必须反复穿过的边界。

不要把它放在最外沿那一格。更稳妥的经验做法是向己方腹地退若干 tiles，同时让 30-tile 半径仍覆盖预期交战面。这样敌人必须先打过受加成区域，才可能踩掉建筑本身。

第一座只要 50,000，适合为真正关键的接触面买时间；但后续价格线性上涨，且重叠不叠乘，所以不要在同一小区域机械堆叠。优先扩展防区覆盖、保护第二个缺口，或把 Gold 留给兵力与反攻。

5 秒施工意味着它是“提前布防”，不是已经被突破后才按下的急救按钮。防御计算使用的 `nearbyUnits` 默认排除施工中单位，所以应按完工后生效来规划。[UnitGrid.ts][src-unit-grid]

## Missile Silo：有弹、有目标、有余钱时建

### 机制事实

每个 Missile Silo level 固定花费 1,000,000，新 Silo 施工 10 秒。已完工且有空槽的 Silo 才能发射核弹；发射代码从可用 Silo 中选择离目标最近的一座。[Config.ts][src-config] [PlayerImpl.ts][src-player]

Silo 本身不包含弹药：

| 从零开始的计划 | Silo | 弹药 | 最低合计 |
| --- | ---: | ---: | ---: |
| 第一枚 Atom Bomb | 1,000,000 | 750,000 | 1,750,000 |
| 第一枚 Hydrogen Bomb | 1,000,000 | 5,000,000 | 6,000,000 |
| 全场尚无人发射 MIRV 时的第一枚 MIRV | 1,000,000 | 25,000,000 | 26,000,000 |

MIRV 价格还会按全场已经发射的数量，每枚再增加 15,000,000。表格没有计入 SAM、防御、经济建筑或发射后现金储备。[Config.ts][src-config]

Silo 的固定 cooldown 是 90 ticks，也就是 9 秒。升级不是缩短这 9 秒，而是增加一个独立发射槽；level 2 装填完成后可以在两个槽都空闲时连续发射两枚，然后各槽按自己的发射时点等待 9 秒。[UnitImpl.ts][src-unit] [MissileSiloExecution.ts][src-silo] [MissileSilo.test.ts][test-silo]

升级会立即增加 level，但新槽会从升级时刻开始进入一次 90-tick 装填。因此“敌人已经露出目标，临时升级就能立刻多打一枚”并不成立。[UnitImpl.ts][src-unit]

### 策略判断

从零建 Silo 前，至少问四个问题：

1. 施工结束时还能买得起计划中的那枚核弹吗？
2. 目标价值是否高于弹药和暴露 Silo 的机会成本？
3. 对方 SAM 覆盖、队友结构保护限制和航迹会不会让这枚弹失去价值？
4. 花完之后是否还留得下守住 Silo 的 Gold 与兵力？

只够 1,000,000 时通常不要裸造第一座 Silo。它不会被动产生收益，也不会自动送一枚 Atom Bomb。

已有一座位于安全腹地的 Silo，只需要提高齐射容量时升级：同样花 1,000,000，且不用等另一座 10 秒施工。需要降低单点被占领 / 核毁的风险，或者希望另一条更短航迹时才新建。Silo 没有通过 level 扩大射程的机制，level 买的是槽位。

## SAM Launcher：在核弹升空前 30 秒做决定

### 机制事实

第一座 level-1 SAM 需要 1,500,000，施工 300 ticks，也就是 30 秒。第二个总 SAM level 起，每个 level 都是 3,000,000。[Config.ts][src-config]

SAM 的拦截范围随 level 使用：

```text
range(level) = 150 - 480 / (level + 5)
```

| SAM level | 拦截范围（tiles） |
| ---: | ---: |
| 1 | 70.0 |
| 2 | 81.4 |
| 3 | 90.0 |
| 4 | 96.7 |
| 5 | 102.0 |

范围会逐渐接近 150，但不会因为一次高等级升级突然跳到 150。当前升级路径没有硬性 level cap。[Config.ts][src-config] [PlayerImpl.ts][src-player]

每个 level 还对应一个拦截槽。level 1 SAM 装填完成时能拦一枚；高 level SAM 可以在同一 tick 对多个合格目标发射，直到所有槽都进入 cooldown。每枚拦截弹的固定 cooldown 同样是 90 ticks（9 秒），升级新增的槽从升级时刻开始装填，并不会立即 ready。[UnitImpl.ts][src-unit] [SAMLauncherExecution.ts][src-sam] [SAMLauncherExecution.test.ts][test-sam]

SAM 的目标列表是 Atom Bomb、Hydrogen Bomb 和飞行中的 MIRVWarhead。它不会在 MIRV 母弹分裂前直接拦截母弹；v33 的变化是分裂后的 MIRV warheads 现在按普通飞行核弹接受 SAM 拦截。[v0.33.0 Release notes][release-330] [SAMLauncherExecution.ts][src-sam]

### 策略判断

SAM 是威胁驱动投资，不是默认经济开局。以下信号出现时应该提前买：

- 对手已经完成 Silo，且余额或战局表明 Atom / Hydrogen / MIRV 很可能很快出现；
- 你的高等级 City、Factory / Port 网络、Silo 和主力兵力集中在一个可覆盖区域；
- 一次核打击造成的损失明显高于 1.5M，并且你能提前留出 30 秒施工窗口。

level 1 SAM 面对单枚 Atom 或 Hydrogen 已有价值，但会被近时间窗的多枚核弹或 MIRV 多弹头压满一个槽。威胁是“同一核心区的饱和攻击”时，升级现有 SAM 可以同时提高范围和齐射容量；威胁来自不同方向或资产相距超过当前覆盖时，分散建新 SAM 更合理。

不要等核弹已经进入最后航段才开始建第一座 SAM。30 秒施工远长于许多短程核弹的剩余飞行时间。

SAM 不是绝对护盾：拦截器可能在 cooldown，目标可能超出可计算的交会范围，多枚弹会占满槽位，而直接落在范围内的核爆也会删除 SAM 本身。

官方英文 tooltip 仍写“100 pixel range、7.5 second cooldown”，但 v0.33.9 core runtime 与正式测试使用的是 level-1 70 tiles 和 90 ticks。本文以可执行 core / tests 为准，不沿用这条过时文案。[English locale][src-en-locale] [Config.ts][src-config]

## 新建还是升级？

除 Defense Post 外，当前五类结构都可升级。相同边际 level 的成本由同一条公式计算，但新建与升级买到的空间价值不同：

| 建筑 | 优先升级 | 优先新建 |
| --- | --- | --- |
| City | 只缺 cap，希望立即生效，旧 City 在安全腹地 | 需要新铁路站点、空间冗余或分散资产 |
| Factory | 铁路拓扑已好，只缺 Train 吞吐 | 需要接入另一组 City / Port 或另一个安全发车点 |
| Port | 当前水域与伙伴可靠，只缺 Trade Ship 吞吐 | 要进入另一 water component、提供新 Warship 基地或创造新航程 |
| Missile Silo | 只缺更多发射槽，已有 Silo 足够安全 | 要分散被占领 / 核毁风险，或改变发射位置 |
| SAM | 核心区已在覆盖内，需要更大范围和更多拦截槽 | 资产分散，现有 SAM 无法覆盖另一片高价值区域 |

这是**策略判断表**。一个很实用的原则是：升级解决“同一地点吞吐不足”，新建解决“位置、连接或单点风险”。

## 建筑为什么不能都堆在首都？

### 机制事实：放置限制

官方 `Structures` 集合正好包含本文六类：City、Defense Post、SAM Launcher、Missile Silo、Port 和 Factory。[Game.ts][src-game]

陆地建筑必须落在己方领土，并与其他结构保持至少 15 tiles 的欧氏距离。点击位置周围只搜索己方连通 tiles；Port 还要在点击点 20 tiles 内找到己方 shore。[Config.ts][src-config] [PlayerImpl.ts][src-player]

### 机制事实：占领与核爆

当建筑所在 tile 易主时：

- Defense Post 被摧毁；
- City、Factory、Port、Missile Silo 和 SAM 保持原 level，整栋转移给新 owner。

这不是“降一级”或“停用一段时间”。官方 `PlayerExecution` 与测试直接覆盖了 Defense Post 销毁和其他结构完整转移。[PlayerExecution.ts][src-player-execution] [PlayerExecution.test.ts][test-player-execution]

核弹在外圈爆炸半径内会直接删除建筑和其他普通单位。高 level 结构不会逐级掉 level；一旦落在删除范围内就是整栋消失。[NukeExecution.ts][src-nuke] [NukeExecution.test.ts][test-nuke]

### 策略判断：集中与分散

把 City、Factory、Silo 和 SAM 全放在一个小核心，平时容易保护和连铁路，但一次成功 Hydrogen / MIRV 或一次核心突破会同时夺走大量投资。

分得太开则会失去 SAM 覆盖、铁路连接和局部防御效率。更好的做法是：

- 把 Defense Post 放在能覆盖前线但不直接接触敌人的纵深；
- 让 SAM 覆盖最贵的一组资产，而不是追求覆盖所有空地；
- 经济网络保留至少一个不与主 Silo / 主 City 同点集中的替代节点；
- 高 level 升级前，把“整栋被转移或核毁”的损失计入机会成本。

## 一局中的实用决策流程

下面是基于前述机制的**策略推论**，不是固定开局脚本。

### 扩张期

- 不要因为第一档 City / Factory / Port 都显示 125,000 就全部购买；Port 与 Factory 会互相抬价。
- Troops 还远低于 cap 时，用兵力和领土解决问题，不急着 City。
- 只有确定会长期争夺的 chokepoint 才放第一座 Defense Post。
- 第一座 Port 如果是为了 Warship 进入关键水域，可以早建；如果只为贸易，先找目的港。

### 网络成形期

- 观察一次真实 Trade Ship 或 Train 是否能完成结算，再买 500,000 / 1,000,000 的后续经济 level。
- 铁路拓扑已工作就升级 Factory；需要新 cluster 才新建。
- 海贸水域已工作就升级 Port；需要新水域入口才新建。
- Troops 反复顶 cap 时，City 的确定容量通常比尚未验证的第二套贸易网更直接。

### 核威胁期

- 对手完成 Silo 后就开始评估 SAM，不要等看到来袭提示才开始 30 秒施工。
- 第一座 SAM 保护最高价值资产；可能遭齐射时提前增加槽位或第二覆盖点。
- 进攻方先预留“建筑 + 弹药 + 防守”的完整预算，再建 Silo。
- 高 level Silo / SAM 集中在一处前，重新检查核爆半径和陆地突破路线。

## 常见误区

### “Troops 很少，所以我要 City”

错误。City 增加 cap，不补回已经损失或派出去的 Troops。只有恢复被 cap 截断时，它才解决当前问题。

### “Factory 铺出铁路就会赚钱”

错误。Factory 需要 cluster 里有合格 City / Port 贸易站；Factory 本身不是结算站。

### “Port level 越高，每条 Trade Ship 越值钱”

错误。单船金额只读取实际航程和收款人的 Gold multiplier。Port level 增加生成尝试和目的港权重。

### “更多 Defense Post 可以把同一格的倍率一直相乘”

错误。防御计算命中一个己方 Defense Post 后就停止搜索。重叠主要提供覆盖冗余，不提供倍率叠乘。

### “升级 Silo 会缩短 reload”

错误。每个槽仍是固定 90 ticks。升级增加独立发射槽，而且新槽先经历一次装填。

### “来核弹了再造 SAM”

通常太晚。第一座 SAM 的标准施工时间是 30 秒；它必须作为提前部署的威慑和保险。

### “有 SAM 就不会吃 MIRV”

错误。SAM 拦的是分裂后的 MIRV warheads，每个已装填 level 只提供一个槽。多弹头可能造成饱和。

## 最短版结论

- **City**：cap 快满且你仍需要囤兵时建；只缺 cap 就升级，需要铁路节点才新建。
- **Factory**：已经有安全可达的 City / Port 时建；先验证到站，再买昂贵后续 level。
- **Port**：需要该水域 Warship，或已有可靠外方目的港时建；短航线和无伙伴 Port 不适合纯经济投资。
- **Defense Post**：战线稳定、30-tile 防区能长期覆盖交战面时建；放在后方，不要放在马上易主的 tile。
- **Missile Silo**：同时有弹药、目标和防守余量时建；升级增加槽位，不缩短 9 秒装填。
- **SAM**：对手核能力成形前至少 30 秒部署；升级买范围与槽位，新建买覆盖与冗余。

不存在通用的“第 X 分钟建筑顺序”。最好的建筑，是当前能够立刻解除真实瓶颈、而且在下一阶段仍能存活并工作的那一栋。

## 一手来源

### 正式版本

- [v0.33.9 正式 Release][release-339]
- [v0.33.7 到 v0.33.9 官方 compare][compare-337-339]
- [v0.33.0 Release：MIRV warheads 与 SAM][release-330]

### 正式 tag 源码

- [Game.ts：六类 Structures 集合][src-game]
- [Config.ts：成本、施工、City cap、Defense Post、Silo / SAM cooldown 与 range][src-config]
- [PlayerImpl.ts：放置、升级、核弹选择 ready Silo、Port / Warship 条件][src-player]
- [UnitImpl.ts：level、发射 / 拦截槽与 cooldown queue][src-unit]
- [UnitGrid.ts：范围查询默认排除施工中单位][src-unit-grid]
- [ConstructionExecution.ts：结构施工流程][src-construction]
- [PlayerExecution.ts：占领时 Defense Post 销毁、其他建筑转移][src-player-execution]
- [CityExecution.ts / FactoryExecution.ts][src-city] [src-factory]
- [TrainStationExecution.ts / TrainStation.ts / RailNetworkImpl.ts][src-train-station-exec] [src-train-station] [src-rail]
- [PortExecution.ts / TradeShipExecution.ts][src-port] [src-trade-ship]
- [TransportShipUtils.ts：Transport Ship 不要求 Port][src-transport-utils]
- [DefensePostExecution.ts：当前无主动射击逻辑][src-defense-post]
- [MissileSiloExecution.ts / SAMLauncherExecution.ts][src-silo] [src-sam]
- [NukeExecution.ts：爆炸范围内删除建筑][src-nuke]
- [官方英文 locale：当前过时的 SAM tooltip][src-en-locale]

### 正式 tag 测试

- [ConstructionCost.test.ts：施工中与俘获结构的成本计数][test-construction-cost]
- [PlayerExecution.test.ts：Defense Post 销毁与其他结构转移][test-player-execution]
- [MissileSilo.test.ts：Silo cooldown 与升级][test-silo]
- [SAMLauncherExecution.test.ts：单槽、多槽、MIRV warhead 和固定 cooldown][test-sam]
- [NukeExecution.test.ts：核弹删除范围内建筑][test-nuke]

[release-339]: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.9
[compare-337-339]: https://github.com/openfrontio/OpenFrontIO/compare/v0.33.7...v0.33.9
[release-330]: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.0
[src-game]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/game/Game.ts
[src-config]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/configuration/Config.ts
[src-player]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/game/PlayerImpl.ts
[src-unit]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/game/UnitImpl.ts
[src-unit-grid]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/game/UnitGrid.ts
[src-construction]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/ConstructionExecution.ts
[src-player-execution]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/PlayerExecution.ts
[src-city]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/CityExecution.ts
[src-factory]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/FactoryExecution.ts
[src-train-station-exec]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/TrainStationExecution.ts
[src-train-station]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/game/TrainStation.ts
[src-rail]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/game/RailNetworkImpl.ts
[src-port]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/PortExecution.ts
[src-trade-ship]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/TradeShipExecution.ts
[src-transport-utils]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/game/TransportShipUtils.ts
[src-defense-post]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/DefensePostExecution.ts
[src-silo]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/MissileSiloExecution.ts
[src-sam]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/SAMLauncherExecution.ts
[src-nuke]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/NukeExecution.ts
[src-en-locale]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/resources/lang/en.json
[test-construction-cost]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/tests/economy/ConstructionCost.test.ts
[test-player-execution]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/tests/core/executions/PlayerExecution.test.ts
[test-silo]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/tests/MissileSilo.test.ts
[test-sam]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/tests/core/executions/SAMLauncherExecution.test.ts
[test-nuke]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/tests/core/executions/NukeExecution.test.ts

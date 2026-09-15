# Adaptive Build Order 一手来源包

研究日期：2026-09-16（Asia/Vladivostok）
研究主题：v0.34.3 下的 adaptive build order：攻击速度版本边界、Human Gold/workers/人口增长，以及 City、Port、Factory 的成本、施工和收益启动条件。
来源限制：规则事实只使用 OpenFrontIO 正式 Release、固定 tag v0.34.3 / v0.34.2 源码与测试，以及本站已生成数据。Reddit 与 YouTube 只用于证明玩家问题、语言和脚本冲突，不作为机制证据；社区说法与 tag 冲突时一律以正式一手来源为准。

## 版本锚点与直接答案

- [Release v0.34.3](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.3) 发布于 2026-09-15；其正文同时包含 v0.34.2 的 meta: speed up attacks ~10% 和 v0.34.0 的经济/战斗总览。v0.34.3 tag commit 为 222e4078982e6c21c620a69c82de0392c17385bf；[v0.34.2 tag](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.2) commit 为 8ab4aa2f57859a596acc0daeb5b26524c564e997。
- “Adaptive”不等于固定开局顺序：先识别瓶颈，再把第一笔 125,000 Gold 买成当局能在施工完成后真正工作的 cap、海贸或铁路节点。接近 troop cap 且需要确定容量时优先 City；有安全海岸、同水域可交易外方 Port、且航线能存活时才优先 Port；已有可连通 City/Port、Factory 未禁用并能形成 rail cluster 时才优先 Factory。Port/Factory 共用成本阶梯，因此第一笔选择也会抬高另一类的下一档价格。
- 两个可用于正文的数字场景见“场景”。所有回本数字都只是“静态收入除以边际成本”的筛选工具，不是保证的秒数或收益：施工、路径、随机 spawn、全球舰队/列车饱和、敌方俘获和 Gold multiplier 都可能改变结果。

## 社区需求与实战语境

以下六个页面均在 2026-09-16 实际打开并分析。Reddit 的发布日期来自当前 embed 页面内的 `created_timestamp`；YouTube 的标题、作者与上传日期由页面元数据和视频提取结果交叉核对。它们说明玩家为什么需要自适应顺序，也展示互相冲突的固定建议，但不负责本文的成本、增长、攻击或收益数字。

### Reddit

1. **“How do I get better at multiplayer?”**
   - URL: [Reddit discussion](https://www.reddit.com/r/Openfront/comments/1jv1kmn/how_do_i_get_better_at_multiplayer/)
   - Published: 2025-04-09.
   - 玩家问题：发帖者能够稳定击败 bot，但进入 multiplayer 后很快被多方包围，说明单线环境里可重复的开局无法处理真人第三方、边界数量与反击窗口。
   - 可用观察：guide 应把“保留反应兵力”和“新边界出现即重算”放在建筑顺序之前。玩家需要的不是另一个 bot script，而是一个能在第一项假设失效后切换的程序。
   - 局限：帖子不能证明固定进攻比例、最佳 City 时间或当前 v0.34.3 伤亡公式。它只证明迁移问题和多人压力。

2. **“My best strategy in openfront.io”**
   - URL: [Reddit discussion](https://www.reddit.com/r/Openfront/comments/1qt4cz8/my_best_strategy_in_openfrontio/)
   - Published: 2026-02-01.
   - 玩家问题：讨论围绕固定军队比例、何时保留增长空间，以及 City、Port 和其他开局消费的顺序展开。不同回复对同一套脚本并没有形成稳定共识。
   - 可用观察：百分比与建筑名称只是输入；必须先区分 current Troops、maximum Troops、Gold 与路线资格。guide 可以把争议转成可观察的 cap、route、border 和 reserve 条件。
   - 局限：个人胜局与评论不能证明某个百分比普遍最优，也不能把旧版本经验直接升级为 v0.34.3 规则。

3. **“Any tips for beginners?”**
   - URL: [Reddit discussion](https://www.reddit.com/r/Openfront/comments/1sewfo1/any_tips_for_beginners/)
   - Published: 2026-04-07.
   - 玩家问题：新手难以把建议迁移到随机地图与在线大厅；邻居数量、海岸、空间和真人节奏改变后，记住的顺序无法重现。
   - 可用观察：正文必须在 map/lobby 分支上明确说明何时 Port、Factory 或 Defense Post 根本没有前提，并把液态 Gold 视为等待证据的有效选项。
   - 局限：帖子提供需求语境，不提供 unit availability、价格、施工时间或正式 route 资格。

### YouTube

1. **Enzo Plays — “How to Dominate the Early Game in OpenFront.io”**
   - URL: [YouTube video](https://www.youtube.com/watch?v=fRP48Dl3Cnw)
   - Uploaded: 2025-10-15.
   - 实际分析：视频用约 41% 的增长区间、快速吞并邻近目标和早期基础设施解释节奏。它清楚展示玩家如何把 troop percentage 与 building timing 合成一条可执行脚本，也显示脚本需要在新邻居出现时重新判断。
   - 编辑用途：用作“固定比例很容易记住”的真实语境，并在 guide 中以官方增长公式、具名 reserve 和最小 probe 替代绝对化数字。
   - 局限：视频版本与房间状态不等于 v0.34.3；41% 不能当作官方最优值，旁白数字不能替代 fixed-tag source。

2. **Ash — “The Fastest Way to Build an Economy in OpenFront”**
   - URL: [YouTube video](https://www.youtube.com/watch?v=8ult82qmiAg)
   - Uploaded: 2026-08-14.
   - 实际分析：视频主张先 City，再按地图与位置在 Port、Factory 之间切换。这一分支比单一路线更接近玩家真实问题，但旁白还提到未经官方 v0.34.3 tag 或测试验证的 City reset 利用说法。
   - 编辑用途：保留“地图决定第二节点”的实战语言，同时要求 City 先通过 cap 测试、Port 先通过 destination/survival 测试、Factory 先通过 station/cluster 测试。
   - 局限：reset 说法不得进入公开机制结论；视频演示不能证明成本计数、施工或收益公式。

3. **Sinful73 — “How to Snowball Every OpenFront Game – Best Early Game Guide”**
   - URL: [YouTube video](https://www.youtube.com/watch?v=Z0gUv3gyfms)
   - Uploaded: 2026-07-19.
   - 实际分析：视频给出较固定的攻击比例脚本，并把前三座 City 放在 Port/Factory 之前。这种规则易于执行，也适合展示一个开局如何形成明确节奏；它同样暴露固定顺序对 cap 使用率、海岸收益和前线压力缺少条件判断。
   - 编辑用途：作为 LIMIT 的反例边界。正文不能宣称前三座 City 错误，而应要求每一座都证明新增容量将被使用，并在生存或路线成为瓶颈时停止 City branch。
   - 局限：一个 creator 的成功场景不证明“前三座”或其进攻比例适合所有地图、模式、starting Gold 与对手。

跨六个来源反复出现的成熟问题是：玩家需要决定下一笔资源投给 Troops 的安全上限、City 容量、Port 海贸、Factory 铁路还是防御，并需要知道何时停止继续同一分支。它与 `economy-fundamentals` 的系统概览、`port-vs-factory` 的静态投资比较和 `land-combat` 的接触战公式不同；新 guide 独占“每一步重新识别当前约束”的 build-order 意图。

## 官方逐项核验表

下表中的 claim 是可写入 guide 的事实；source 给出固定 tag 的官方 URL；limitation 说明不能从该事实推出的结论。v0.34.3 boundary 是本文可以承诺的版本范围。

| Claim | Source | Limitation | v0.34.3 boundary |
| --- | --- | --- | --- |
| v0.34.2 的约 10% 攻击加速来自 SPEED_COST_DIVISOR 从 7.77 改为 8.55；tickFraction 中分母增大使同一输入约少 9.1% tick fraction，速度约快 10%。 | [v0.34.1 Config.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/core/configuration/Config.ts#L139-L140)、[v0.34.2 Config.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.2/src/core/configuration/Config.ts#L143-L146)、[v0.34.3 Config.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L930-L950)；[v0.34.2 AttackScenarios snapshot](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.2/tests/__snapshots__/AttackScenarios.test.ts.snap#L3-L18) | 这是速度项，不是攻击损失项；实际 tiles/sec 还受 terrain、borderSize、troop ratio、territory bonus、Defense Post、traitor/fallout 与 tick rounding 影响，不能承诺每场刚好 +10%。 | 改动在 v0.34.2 引入，v0.34.3 保持；适用于 defender != null 的普通玩家目标路径（Player/Nation/Bot target），不适用于 Terra Nullius 的独立 tickBudget 分支，也不改变无接触建地的成本。 |
| AttackExecution 每个有效目标 tile 调用 Config.attackLogic，tileCost 才进入该速度分母；Defense Post 先把 mag 乘 5、tileCost 乘 3。 | [AttackExecution.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/AttackExecution.ts#L268-L319)、[Config.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L861-L950) | Golden formula 解释单 tile 的代价，不能替代 live border 的队列、边界宽度、并发攻击或反推判断。 | v0.34.3 的正式战斗边界；guide 只能把 10% 写成“相同输入下的速度项变化”。 |
| Human maxTroops = 2 × (tiles^0.6 × 1000 + 50,000) + 250,000 × 完工 City levels；施工中的 City 不计入 cap。 | [Config.maxTroops](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L1003-L1013)、[Config.cityTroopIncrease](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L355-L357) | 土地项是递减幂函数；City 的 +250,000 是确定 cap，不是 Gold 收入，也不能据此推出一场战斗的胜负。Bot/Nation 有额外倍率。 | 仅 Human、普通非无限 troops、已完成 City levels；大厅 infiniteTroops、Bot/Nation 难度和特殊 host cheat 需另算。 |
| Human 每 simulation tick 的增长为 (10 + troops^0.73 / 4) × (1 - troops / maxTroops)；tick 为 100 ms。 | [Config.troopIncreaseRate](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L1037-L1068)、[Config.msPerTick](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L364-L366)、[PlayerExecution](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/PlayerExecution.ts#L82-L92) | 这是无战斗、无上限变化的即时曲线；攻击、捐赠、被攻击、Doomsday 等会改变实际 troops。 | Human 不乘 Bot/Nation 倍率；goldMultiplier 不影响 troops。 |
| “Workers”不是独立可调人口池。模拟资源没有 workers 计数；Human goldAdditionRate 固定 100 Gold/tick，PlayerExecution 每 tick 加 Gold 并计入 GOLD_INDEX_WORK。 | [Config.goldAdditionRate](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L1071-L1080)、[PlayerExecution](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/PlayerExecution.ts#L86-L92)、[StatsSchemas GOLD_INDEX_WORK](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/StatsSchemas.ts#L80-L87)、[ConstructionGold.test](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/economy/ConstructionGold.test.ts#L40-L66) | 100/tick 是基础 worker 统计流，不含贸易、列车、海盗、征服、捐赠或大厅 goldMultiplier；不要写成“每个 worker 100 Gold”或“军队占用 worker”。 | 1x multiplier、普通 Human 时约 1,000 Gold/s、60,000 Gold/min；Bot 是 50/tick。v0.34.0 Release 的“early higher, mid-late slower”是总版本概述，v0.34.3 可执行代码的基础 worker 流仍是固定 100/tick。 |
| City、Port、Factory 的边际成本是 min(1,000,000, 2^n × 125,000)。City 独立计数；Port 与 Factory 通过同一 costWrapper 共用计数。 | [Config.unitInfo](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L576-L585)、[City cost](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L649-L657)、[Factory cost](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L659-L668)、[costWrapper](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L734-L752)、[generated structures.json](../../src/data/structures.json#L1-L20) | n 不是地图上所有权的简单数量：wrapper 对每类取 min(unitsOwned, unitsConstructed)；被俘获但未亲自构建的结构不会单独抬高你的建造阶梯。升级同样推进 constructed 计数。 | 普通 1x、无 infinite Gold 时的档位为 125k、250k、500k、1m，之后封顶 1m；v0.34.3 没有可引用的 City level-4 硬上限。 |
| 新建结构先扣 Gold、立即登记 constructed，再进入施工；City/Factory 施工 20 ticks（2 秒），Port 50 ticks（5 秒）。施工中的 City 不给 cap，施工中的 Port 不 spawn 船，完成后才挂相应 execution。 | [ConstructionExecution](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/ConstructionExecution.ts#L46-L79)、[completeConstruction](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/ConstructionExecution.ts#L100-L152)、[PlayerImpl.buildUnit](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/game/PlayerImpl.ts#L1368-L1396)、[PortExecution](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/PortExecution.ts#L24-L45) | instantBuild、单位被摧毁或中途失去 ownership 会改变体验；2/5 秒是 100 ms tick 下的默认施工时长，不是网络或 UI 延迟。 | City/Factory 默认 20 ticks；Port 默认 50 ticks；费用已在 buildUnit 创建时扣除，不是完工时才扣。 |
| City 每个 level 只增加 +250,000 cap；完成后只有在 110 格内有 Factory 才创建 Train station。 | [CityExecution](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/CityExecution.ts#L15-L43)、[Config train range](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L492-L500) | City 本身不产生 Gold；没有 Factory 或不可连 rail 时，它仍是 cap 节点而不是 train 收入节点。 | v0.34.3 默认 trainStationMaxRange=110、minRange=15、最大 rail path <155.562（110×1.4142）。 |
| Factory 完工后总是成为 train-spawning station，并把 110 格内的 City/Port/Factory 拉入网络；只有 cluster 有可交易 City/Port 时才会尝试发车。 | [FactoryExecution](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/FactoryExecution.ts#L15-L47)、[TrainStationExecution](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/TrainStationExecution.ts#L32-L100)、[TrainStation/Cluster](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/game/TrainStation.ts#L163-L227) | Factory 自己经过 train stop 不结算 Gold；目的地由 reservoir sampling 随机选择，不按距离/利润优化。路径失败、断 rail 或没有目的地时没有收入。 | v0.34.3 trainSpawnRate 还受全球 Train units 饱和；golden test 在 0 Train units 时 factories=1 的 spawnRate=123（约 12.3 秒的期望检查间隔），不是旧资料里的固定 165 ticks。 |
| Train 在 City/Port stop 结算，self=10k、team/other=25k、ally=35k；前 10 个 stop 不罚，第 11 个后每个多出的 stop 减 5k，最低 5k。 | [Config.trainGold](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L467-L490)、[TrainStation stop handler](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/game/TrainStation.ts#L14-L58)、[TradeTrainGolden](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/TradeTrainGolden.test.ts#L137-L183) | 这是每次 stop 的名义 Gold；要乘 Gold multiplier，并受 travel time、随机目的地、断线、敌对 ownership 和全球 saturation 影响。 | v0.34.3；不要把 Factory 建成即刻收入或把长 rail distance 本身当作距离奖金。 |
| Port 每 10 ticks 检查；每个 Port level 各 roll 一次，pity rejection 会改变下一次 spawn rate；成功 roll 后仍需有有效 tradingPorts 才创建船。有效目的港必须是其他玩家、无任一方向 embargo、同 water component。 | [PortExecution](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/PortExecution.ts#L24-L84)、[tradingPorts](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/PortExecution.ts#L97-L142)、[Player.canTrade](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/game/PlayerImpl.ts#L1204-L1208)、[PortExecution.test](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/PortExecution.test.ts#L29-L115) | Spawn 是随机网络产出，不是固定间隔；成功 roll 但无目的港会浪费该次机会。Port level 提高 rolls/目的港权重，不直接提高同一航程 Gold。 | v0.34.3 使用 tradeShipSaturation：golden test 的 0 active ships spawnRate=71、400=418（rejections=0），与旧版 100/200 表格不可混用。 |
| Trade Ship 每移动一格累加 tilesTraveled；正常抵达时 source 与 destination owner 各拿完整 tradeShipGold(d)；被俘后改道抵达时仅当前船主拿 piracy Gold。 | [TradeShipExecution](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/TradeShipExecution.ts#L129-L209)、[Config.tradeShipGold](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts#L502-L506)、[TradeTrainGolden](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/TradeTrainGolden.test.ts#L1-L21) | 航程收入不是 Port level bonus；航线可能被俘获、删除、改道或失去目的港。 | 1x 的 golden values：d=100 为 5,185、d=200 为 13,556、d=300 为 52,500、d=400 为 91,443、d=1,000 为 124,999。 |

## 关键公式与可复用场景

### 场景 A：内陆 cap 瓶颈，City 先于经济引擎

假设 Human 占有 10,000 tiles、无 City、1x multiplier、无战斗损失。公式给出的 cap 为约 **602,377**；troops 在 50% cap（约 301,189）时，增长约 **1,253.7/tick = 12,537/s**。第一档 City 价格 125,000，默认施工 20 ticks；完工后 cap 变成 **852,377**，而基础 worker Gold 仍是 100/tick，不会因为 City 增加。这个场景适合说明：当军队已经顶住 cap、且没有安全海贸/铁路网络时，City 买的是确定的容量，不是现金回本。若只为“收入”建 City，结论不成立。

### 场景 B：同一笔 125,000 的 Port/Factory 分叉

假设已有安全海岸和同一水域、无 embargo 的外方 Port，实际航程 d=300，且船能存活抵达。v0.34.3 golden value 为 **52,500 Gold/次/每个正常两端 owner**，静态边际成本 125,000 约需 **3 次完整抵达**；但 Port 仍要等待每 10 ticks 的随机 roll，受全球 fleet saturation 和目的港变化影响。相反，若已有可连接的 self City，第一档 Factory 费用同为 125,000；golden test 的 1 Factory、0 Train units spawnRate 为 **123**，但必须完成 rail cluster、存在可交易 City/Port，并让 Train 实际到站。每次 self City stop 只有 **10,000 Gold**，静态上至少需 **13 次 stop** 才覆盖成本；Train 的 travel time、随机目的地和 global Train saturation 使这不是保证回本时间。若港口没有合法目的港，或 Factory 没有 trade destination，二者都不应按计划中的收入引擎购买。

### 其他可复述数字

| 输入 | v0.34.3 派生值 | 正确用法 |
| --- | ---: | --- |
| 100 tiles，无 City | maxTroops 131,698 | 说明土地项的递减增长，不能把 City 的相对增幅固定化。 |
| 1,000 tiles，无 City | maxTroops 226,191；+1 City = 476,191 | City level 的绝对 +250k 恒定。 |
| 10,000 tiles，troops=25% cap | 约 11,368/s | 只作无战斗增长快照，不是“最佳进攻比例”。 |
| trainGold：self 第 1–10 个 stop | 10,000/stop | 第 11 个 stop（citiesVisited=10）开始下降，最低 5,000。 |
| tradeShipGold：d=50/100/200/300/400 | 2,541 / 5,185 / 13,556 / 52,500 / 91,443 | 距离是实际 water tiles traveled；别用 Manhattan 预估直接承诺收入。 |

## 与既有页面的职责边界

| 页面 | adaptive build order 可以引用什么 | 本新 guide 不应重复什么 |
| --- | --- | --- |
| [first-match](/guides/first-match/) | 只接收“出生后先确认 cap、海岸、Factory/City 可连性”的快速检查。 | 不重写完整新手前五分钟、出生和基础 UI 流程。 |
| [economy-fundamentals](/strategies/economy-fundamentals/) | 引用预算、基础 Gold、cap 与保留应急金的总框架。 | 不重新解释完整经济系统或替代本页的条件化建筑选择。 |
| [population-growth](/guides/population-growth/) | 引用 troop cap、增长曲线和 City 的容量含义。 | 不重复人口机制百科；本页只把 cap 瓶颈转成 build-order 分叉。 |
| [port-vs-factory](/guides/port-vs-factory/) | 引用 Port/Factory 投资比较、航线/rail 的回报风险。 | 不再制作静态“永远 Port”或“永远 Factory”排行榜；本页只负责开局条件满足时的顺序切换。 |
| [land-combat](/guides/land-combat/) | 当建筑选择受边境压力影响时，链接到实际 attackTroops、terrain、Defense Post 和 reserve 判断。 | 不在本页推导逐 tile 战斗、反推或撤退公式。 |
| [threat-assessment](/guides/threat-assessment/) | 在购买 Port/Factory 前检查第三方、Embargo、暴露边界和扩张停止线。 | 不把建筑收益当成全局目标选择，也不重复 threat scan。 |

## 生成数据与限制

本站 [src/data/_meta.json](../../src/data/_meta.json) 当前标记 upstreamVersion: v34、upstreamCommit: 5f6c8fad19ab2e7ab5edfc91c9edc8b685f4c293；它是提取 checkout / 系列视图，不等同于 v0.34.3 tag。src/data/formulas.json 提供相同的 troop cap、troop growth、100/tick worker 和 trade-ship 公式；src/data/structures.json 提供 City/Port/Factory 成本摘要。若生成摘要与固定 tag 执行代码冲突，以 v0.34.3 tag 与 golden tests 为准。不要把站内既有页面或旧 v33 表格当作 v0.34.3 证据。

## 官方来源清单

1. [Release v0.34.3（含 v0.34.2/v0.34.0 正文）](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.3)
2. [Release v0.34.2](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.2)
3. [Config.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts)
4. [Config.ts v0.34.2](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.2/src/core/configuration/Config.ts)
5. [AttackExecution.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/AttackExecution.ts)
6. [PlayerExecution.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/PlayerExecution.ts)
7. [PlayerImpl.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/game/PlayerImpl.ts)
8. [ConstructionExecution.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/ConstructionExecution.ts)
9. [CityExecution.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/CityExecution.ts)
10. [FactoryExecution.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/FactoryExecution.ts)
11. [PortExecution.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/PortExecution.ts)
12. [TrainStationExecution.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/TrainStationExecution.ts)
13. [TrainStation.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/game/TrainStation.ts)
14. [RailNetworkImpl.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/game/RailNetworkImpl.ts)
15. [TradeShipExecution.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/TradeShipExecution.ts)
16. [StatsSchemas.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/StatsSchemas.ts)
17. [AttackScenarios golden snapshot v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/__snapshots__/AttackScenarios.test.ts.snap)
18. [AttackLogicGolden.test.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/AttackLogicGolden.test.ts)
19. [ConstructionCost.test.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/economy/ConstructionCost.test.ts)
20. [ConstructionGold.test.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/economy/ConstructionGold.test.ts)
21. [PortExecution.test.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/PortExecution.test.ts)
22. [TradeTrainGolden.test.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/TradeTrainGolden.test.ts)
23. [TradeTrainScenarios.test.ts v0.34.3](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/tests/TradeTrainScenarios.test.ts)
24. [本站 formulas.json](../../src/data/formulas.json)
25. [本站 structures.json](../../src/data/structures.json)

核验结论：本来源包支持写 adaptive build order 的条件化决策和两个数字场景；不支持固定“第几分钟必须建哪栋”、固定 Port/Factory 回本秒数，或把 v0.34.2 的攻击约 10% 加速外推到 Terra Nullius、建筑收益或所有历史版本。

# 2026-08-22 Nation AI 行为与反制来源包

本来源包服务于 `LF-AI-01`（计划路由 `/mechanics/nations/`）。它只使用 OpenFrontIO 正式 `v0.33.7` tag 的源码、测试与正式 Release，不把未发布 `main`、代码注释中的愿望或玩家经验当成现行机制。

## 版本与核验方法

- 截至 2026-08-22，最新正式非 TEST Release 是 [`v0.33.7`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7)，发布于 2026-08-21T23:55:28Z。
- 本轮将本地 checkout `0668045fa926eaa6d6995561a8e13fd8126895b6` 的 Nation 运行时模块和相关测试逐文件与 `v0.33.7` Git blob SHA 对照。下文引用的 `NationExecution`、攻击、联盟、建筑、舰船、核武、MIRV、表情与伪随机代码，以及 7 个核心测试文件均逐文件相同。
- 正式 v33 Release 的累计说明明确记录 Nation 的结构、Port、MIRV/SAM、地图坐标和行为修复；精确当前行为仍以固定 tag 源码为权威。见 [`v0.33.7 Release`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7) 的 “Nations & Bots” 与 “Map Fixes & Improvements”。
- 本地上游 clone 没有安装 `vitest`，因此本轮无法执行测试。测试源码和断言已按 tag blob 核验，但“测试存在”不能表述成“本轮测试运行通过”。

## 首屏直接答案

OpenFront 的 Nation AI 不是一条固定脚本。每个 Nation 在出生后组合运行攻击、联盟、建筑、舰船、普通核武和 MIRV 行为器；游戏难度会改变决策间隔、目标策略顺序、保留兵力、联盟门槛、建筑评分和特殊反制。每个 Nation 又有按 game ID 与 Nation ID 播种的确定性伪随机序列，所以同一份规则会产生不同阈值、抽样和行为时点。

玩家可以通过兵力、关系、联盟/背叛、攻击压力、结构密度、海军数量与来袭方向影响某些决策分支，但不能让 Nation “必然友好”或“永不攻击”。文章应写成可观察条件和风险管理，而不是破解一个固定 AI 循环。

## 调度、难度与随机性

[`NationExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/NationExecution.ts#L27-L88) 用 `simpleHash(nation ID) + simpleHash(game ID)` 建立每个 Nation 的伪随机流，并在初始化时抽取三个个体参数：

| 参数           | 每个 Nation 的范围 | 用途                                          |
| -------------- | -----------------: | --------------------------------------------- |
| `triggerRatio` |   50%-59% 最大兵力 | 通常达到后才进入主动目标选择                  |
| `reserveRatio` |   30%-39% 最大兵力 | 低于该值时停止常规攻击                        |
| `expandRatio`  |   10%-19% 最大兵力 | 扩张无主地、夺回带结构 Bot 土地时使用较低储备 |

同一文件的行动间隔按难度抽取，整数上界不包含在内：Easy 65-99 ticks、Medium 55-69、Hard 45-59、Impossible 30-49。结构行为还会在两个三分之一间隔点额外运行，主行动点则依次处理表情、关系、联盟、MIRV、结构、Warship、embargo、攻击、海军泛滥反制和普通核武。见 [`NationExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/NationExecution.ts#L90-L210)。

[`PseudoRandom.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/PseudoRandom.ts#L1-L105) 说明这些选择是跨平台一致的确定性伪随机，不是每次调用操作系统随机数。因此可以说“对玩家而言存在随机性”，不能说“AI 没有规则”或“相同局面必定给出相同行为”；调用历史也会改变后续随机流位置。

## 行为事实矩阵

| 主题           | v0.33.7 可核验行为                                                                                           | 难度 / 随机边界                                                                                                              | 玩家可观察信号                        | 不能扩写成                     |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------ |
| 初始扩张       | 行为初始化后先强制向 Terra Nullius 发出一次攻击；常规循环优先攻击相邻、非 fallout 的无主可通行陆地           | 后续攻击仍受个体 reserve / trigger 阈值与路线条件约束                                                                        | 边界向无主地扩张                      | “Nation 总是先占完全部空地”    |
| 主动目标       | 策略可包括 Bot、还击、援助盟友、traitor、AFK、背叛、受围攻者、极弱者、hostile、最弱邻居和岛屿敌人            | 四难度的优先顺序不同；多个分支含抽样                                                                                         | 攻击线、运输船、攻击表情              | “AI 永远打最弱者”              |
| 防守 / 还击    | 最大敌方来袭被优先识别；Hard / Impossible FFA 平时保留邻居兵力地板，但正在受攻时允许至少按来袭兵力还击       | Team 与普通 Bot 不使用该 FFA 兵力地板                                                                                        | 反向攻击、前线 Defense Post           | “只要强于 Nation 就不会被反击” |
| 建筑           | 以 City 数推导 Port、Factory、SAM、Silo 目标数；按黄金、密度、可建格、禁用设置和储蓄目标决定建造或升级       | 建筑候选从领土抽样；评分与难度均会改变结果                                                                                   | 建筑类型、位置、升级                  | “固定第 N 秒造固定建筑”        |
| Port / Warship | Port 只考虑可与其他玩家共享的水体；Nation 可从 Port 建首艘 Warship，并对运输、贸易船损失或海军泛滥作概率反制 | 首舰尝试有 1/50 gate；船只反制在 Easy 关闭，其他难度有概率和资源/Port条件                                                    | Port、Warship、船表情、巡逻移动       | “有 Port 就一定出 Warship”     |
| 联盟           | 收到请求后按 traitor、关系、威胁、Team、已有联盟、早期时段与实力判断；也可能主动请求、续约或背叛             | 多处为按难度的随机门槛；Easy 还有“confused”随机决定                                                                          | 联盟请求、接受/拒绝、续约、关系与背叛 | “好感达到某值就永久结盟”       |
| embargo        | 别人 embargo Nation 会给该关系一次 -20；Nation 对 hostile 对象启动 embargo，恢复门槛随难度变化               | Hard 不会在 Neutral 就解除；Impossible 即使 Friendly 也不走自动解除分支                                                      | 贸易停止、关系变化                    | “停止攻击就立刻恢复贸易”       |
| 核武           | 需要 Silo、启用弹种、目标和足够黄金；优先级含还击、领先者、盟友目标、hostile 与 Team 强队                    | 1/3 Nation 偏向只等 Hydrogen；Hard / Impossible 避开可被敌 SAM 拦截的轨迹；Impossible 可尝试 atom salvo / 升级 Silo 处理 SAM | Silo、发射轨迹、核武表情              | “SAM 会让 Nation 永远不发射”   |
| MIRV           | 有 Silo、MIRV 启用且够钱后，依次考虑反 MIRV、阻止胜利和压制城市滚雪球；同一目标有 300-tick Nation 共享冷却   | Easy/Medium/Hard/Impossible 的 hesitation odds 为 1/2、1/4、1/8、1/16；领土与城市阈值也逐级提前                              | MIRV 轨迹、全图核武表情               | “领先就必吃 MIRV”              |

## 扩张与攻击目标

[`AiAttackBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/utils/AiAttackBehavior.ts#L53-L111) 先扫描真实陆地邻接与 `nearby()`，将友军和敌人按兵力升序排列。只要存在非 fallout 的无主陆地，就先尝试扩张；若没有接壤敌人，有 1/5 的随机机会尝试一次抽样跨海攻击；有接壤敌人时则有 1/10 机会先试跨海并结束本轮，否则可能发联盟请求再进入目标策略。

进入常规目标策略前，Nation 必须至少达到 30%-39% 的个体 reserve。若未达到 50%-59% trigger，仍有 1/10 机会继续。四档策略顺序见 [`AiAttackBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/utils/AiAttackBehavior.ts#L231-L379)：

| 难度       | 从高到低的主要策略顺序                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Easy       | nuked land -> Bots -> retaliation -> assist -> betray -> hated -> weakest                                                              |
| Medium     | Bots -> nuked land -> retaliation -> assist -> betray -> hated -> AFK -> traitor -> weakest -> island -> donate                        |
| Hard       | Bots -> retaliation -> assist -> betray -> nuked land -> traitor -> AFK -> hated -> very weak -> victim -> weakest -> island -> donate |
| Impossible | retaliation -> Bots -> very weak -> assist -> traitor -> AFK -> betray -> victim -> nuked land -> hated -> weakest -> island -> donate |

这里的列表是“首个成功执行者获胜”的优先队列，不保证每项都有合格目标。Bot 目标还会优先带结构者，再按 troop/tile 密度排序；并行上限为 Easy 1、Medium 随机 1 或 2、Hard 3、Impossible 100。见 [`AiAttackBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/utils/AiAttackBehavior.ts#L381-L485)。

可精确解释的目标标签：

- `victim`：其总来袭兵力超过自身现有兵力 50%，FFA 中还不能比 Nation 强 20% 以上。
- `very weak`：现有兵力低于自身最大兵力 15%，FFA 中也不能比 Nation 强 20% 以上。
- `weakest`：当前接壤敌人中兵力最少者；FFA 仍要求其兵力低于 Nation。
- `island`：按领土中心曼哈顿距离寻找实际可通航的最近两个候选，并有 1/3 机会选择第二近；FFA 排除兵力高于 Nation 的候选。

见 [`AiAttackBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/utils/AiAttackBehavior.ts#L577-L687)。不能把这些局部候选规则当成全图胜率模型。

### 对人类的难度差异

[`shouldAttack`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/utils/AiAttackBehavior.ts#L849-L890) 对 Terra Nullius、非人类、traitor、普通 Bot 攻击者或 Humans vs Nations 模式直接允许；对于一般人类目标，Easy 每次判断只有 25% 通过，Medium 有 75% 通过，Hard 与 Impossible 不加这层宽容 gate。联盟、兵力、路线和目标策略仍可能在此前或此后阻止攻击，所以这些不是“每回合攻击概率”。

Hard / Impossible 的普通 FFA Nation 还应用两个防止自毁的限制：攻击后分别保留至少最强非友好、非 Bot 邻居兵力的 75% / 90%；若最终可派兵力低于目标兵力 20%，则不攻击。Team、普通 Bot 以及正在受攻击的 Nation 例外；受攻时派兵上限至少提高到总来袭兵力。实现见 [`AiAttackBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/utils/AiAttackBehavior.ts#L873-L999)，回归断言见 [`AiAttackBehavior.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/AiAttackBehavior.test.ts#L173-L338) 与 [`AiAttackBehavior.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/AiAttackBehavior.test.ts#L412-L603)。

## 防守与结构选择

### Defense Post 是响应式例外

Defense Post 不走常规建造冷却，且不会是第一座结构。Easy 不建这种响应式 Defense Post；Medium 每次有 50% gate 且同一前线最多 1 座；Hard / Impossible 在陆地来袭总兵力达到自身兵力 35% 后，允许数量为 `ceil(来袭/自身 / 0.4)`，并在实际攻击前线附近采样位置。海上攻击不计入该阈值。见 [`NationStructureBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationStructureBehavior.ts#L153-L250)；边界测试见 [`NationStructureBehavior.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationStructureBehavior.test.ts#L317-L590)。

这支持玩家建议“低于 35% 的单次陆攻不会触发该需求分支”，但多笔陆攻会累加；而一旦达到阈值，即使 Nation 暂时买不起或找不到位置，该轮也会阻止其他常规建筑。不能声称小额骚扰没有其他后果：攻击仍影响关系、还击和联盟。

### 常规结构配比与储蓄

[`NationStructureBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationStructureBehavior.ts#L33-L130) 与 [`NationStructureBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationStructureBehavior.ts#L431-L704) 给出当前目标：Port 和 Factory 各为每 City 0.75，临海且 Port 可用时 Factory 比例再乘 0.33；SAM 为 Easy 0.15、Medium 0.20、Hard 0.25、Impossible 0.30；Missile Silo 通常为每 City 0.20，第一座用 0.40，且硬上限 3 座。

这些是 `floor(cityCount * ratio)` 的目标数量，不是每局承诺。建筑被禁用、没有有效格、黄金不足或结构密度过高都会改变结果。结构密度超过 1/1500 时，AI 倾向升级而非继续铺新建筑；在达到核武储蓄目标前，同类结构越多，其“感知成本”越高。FFA 会按启用弹种为 MIRV + Hydrogen、5 枚 Hydrogen 或 20 枚 Atom 储蓄；Team 只储蓄到一枚 Hydrogen 的成本。

两个明确的首建例外：

- 初始黄金至少 3,000,000 的 Hard / Impossible Nation，在 Atom、Silo、SAM 都启用时优先尝试 SAM。
- Nation 密度超过每 7,500 land tiles 一个 Nation 且尚无 City 时，优先 Port；无共享海岸则 Factory。这主要服务于高 Nation 数私人 HvN。

### 选址不是纯随机

候选来自领土抽样，但按结构类型评分。Silo 偏好高地、内陆和与同类分散；Port 偏好与已有 Port 分散；City / Factory 偏好高地、内陆、分散和彼此错开；SAM 偏好高地、内陆、分散并覆盖 City、Factory、Silo、Port。Hard / Impossible 的 SAM 还按被保护结构等级加权。见 [`NationStructureBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationStructureBehavior.ts#L891-L1034) 与 [`NationStructureBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationStructureBehavior.ts#L1190-L1353)。

City / Factory 使用铁路连通性评分的概率为 Easy 0%、Medium 60%、Hard 75%、Impossible 100%。它考虑自己以及可贸易、非 Bot 邻居的已注册站点，排除 embargo 对象，并按 self / neutral-or-team / ally 贸易价值加权；tag 测试覆盖 0/60/75/100 边界和邻居过滤。见 [`NationStructureBehavior.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationStructureBehavior.test.ts#L82-L313)。

## Port、运输与 Warship

Port 候选必须位于 Nation 岸线，并接触可与其他玩家共享的水体；ocean 始终视为共享，内陆水体则需另一玩家可接触同一 component。除 Easy 外，小于 3,000 水格的内陆 component 被跳过。见 [`NationStructureBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationStructureBehavior.ts#L829-L889) 与 [`SharedWaterCache.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/SharedWaterCache.ts)。因此“有海岸”不等于“AI 会在那里建 Port”。

常规首艘 Warship 尝试还需要：Warship 未禁用、通过 1/50 gate、至少一个 Port、当前没有 Warship、黄金严格大于成本，并在 Port 周围 250 格抽到实际可建水格。见 [`NationWarshipBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationWarshipBehavior.ts#L36-L89)。

舰船事件反制只在非 Easy 且 Nation 已有 Port 时被主循环持续追踪。运输船被敌方摧毁、贸易船被夺或敌方运输船朝 Nation 领土航行，可能让 Nation 新建或调动 Warship；新建概率为 Medium 15%、Hard 50%、Impossible 80%，且自己的 Warship 达到 10 艘后只尝试调动。距离登陆点不足 20 格的来袭运输被视为太近；目标 90 格内已有己方 Warship 或巡逻点时也不会再为它新建。见 [`NationExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/NationExecution.ts#L90-L101) 与 [`NationWarshipBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationWarshipBehavior.ts#L91-L281)。

Hard / Impossible 还有海军泛滥反制，但前置条件很多：全图 Warship 超过 10、自己有 Port、买得起、自己少于 10 艘，并且 Nation 是 FFA 全部非人类玩家或本队非人类玩家中黄金前三。FFA 目标需单个敌人超过 10 艘；Team 需敌队合计超过 15 艘。正式测试分别构造 FFA 与 Team 成功案例。见 [`NationWarshipBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationWarshipBehavior.ts#L284-L460) 与 [`NationCounterWarshipInfestation.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationCounterWarshipInfestation.test.ts)。

## 联盟、关系、embargo 与背叛

### 请求与接受

Nation 每次处理接壤敌人时，对每个候选只有 1/30 的主动请求 gate；除 Easy 外不会主动向普通 Bot 请求。出生阶段创建、到首个出生后 tick 才执行的请求会被拒绝。收到请求或考虑主动请求时，决策依次考虑随机 confused、traitor、对方联盟数量、威胁、Team 模式、关系、己方联盟数量、早期时段和实力相近。见 [`NationAllianceBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationAllianceBehavior.ts#L29-L148)。

几个容易误读的边界：

- traitor 通常被拒绝，但仍有 10% 穿过该拒绝分支，后续条件仍可能拒绝。
- 更强者可能被当作“威胁”而接受结盟，不等于 AI 喜欢强者；Easy 完全不走威胁判断。
- Team 模式额外拒绝概率为 Easy 25%、Medium 50%、Hard 75%、Impossible 100%。
- Early-game 接受窗口/概率为 Easy 前 5 分钟 90%、Medium 前 3 分钟 70%、Hard 前 3 分钟 50%、Impossible 前 1 分钟 30%，但只有前序条件都未返回时才走到这里。
- Hard / Impossible 会限制与“联盟过多”的玩家合作，也倾向不给自己所有邻居都结盟。

精确实现见 [`NationAllianceBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationAllianceBehavior.ts#L150-L369)。测试验证首 tick 请求拒绝、正常接受、traitor/hostile 拒绝、明显强者接受和联盟过多拒绝，见 [`NationAllianceBehavior.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationAllianceBehavior.test.ts#L19-L189)。

### 背叛不是计时器

[`NationAllianceBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationAllianceBehavior.ts#L371-L434) 只在当前确实结盟时检查：

- Hard / Impossible：盟友总兵力（现有 + 外派）低于其最大兵力 20%，且现有兵力低于 Nation 时可背叛。
- Medium：当 Nation 兵力达到盟友 10 倍时可背叛；Easy 对普通 Bot 可走同一条件，但明确不因此背叛人类。
- 非 Easy：traitor 盟友兵力低于 Nation 的 1.2 倍时可背叛。
- 非 Easy：若该盟友是唯一接壤玩家，且 Nation 兵力超过其 3 倍，可背叛。

这些条件在攻击策略中的 `betray` 位置才会被评估，还受 reserve / trigger、候选顺序和其他更高优先策略影响。不能写成达到阈值立即背叛。

### 玩家能直接影响关系

另一玩家对 Nation 开 embargo 会给 Nation 对该玩家的关系一次 -20，解除后撤销这次 malus。Nation 对 hostile 对象自动 embargo；Easy / Medium 在关系恢复 Neutral 后可解除，Hard 要到 Friendly，Impossible 没有该自动解除分支。见 [`NationExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/NationExecution.ts#L294-L362)。

表情也不是纯装饰：向 Nation 发送中指会使其关系 -100，小丑 -10；和平、白旗、爱心或鼓掌只在 Easy 给 +15。Nation 的攻击、求援、联盟、核武和海军反制表情本身有概率和 300-tick 对人冷却。见 [`NationEmojiBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationEmojiBehavior.ts#L224-L327)。

## 普通核武与 MIRV

普通核武在目标选择上优先最大来袭者；随后可能考虑 Impossible 的高结构密度目标、领土 crown、盟友标记目标、hostile、FFA 领先者或 Team 最强队。Impossible 中只有当前最富有的 Nation 以 50% gate 检查高密度目标，门槛为结构等级总和至少 5 且每 tile 等级密度超过 1/75。见 [`NationNukeBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationNukeBehavior.ts#L166-L293)。

Hard / Impossible 会跳过可被敌方 SAM 拦截的候选轨迹；Impossible 找不到正收益候选时会尝试用 Atom Bomb salvo 消耗敌 SAM，或把有帮助的 Silo 升到最多 5 级。正式测试构造了 Impossible Nation 对 SAM 发出 atom salvo 的路径，见 [`NationNukeSamOverwhelm.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationNukeSamOverwhelm.test.ts)。因此分散结构、覆盖 SAM 和避免成为密度异常值能降低某些候选评分，但不能提供核免疫。

MIRV 只有在启用、已有 Silo、买得起且未触发 hesitation 时才继续。其目标优先为：对向 Nation 来袭的 MIRV 发射者、接近胜利阈值者、城市数显著领先者。个体胜利阻止阈值为 Easy 75%、Medium 65%、Hard 55%、Impossible 40% 总 land；Team 阈值为 90% / 80% / 70% / 60%，并只选最大队员。城市滚雪球最低领先城市数为 20 / 10 / 10 / 8，且需相对第二名达到 2.0 / 1.5 / 1.25 / 1.15 倍。见 [`NationMIRVBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationMIRVBehavior.ts#L39-L237)。

同一目标被任一 Nation MIRV 后有 300-tick 共享冷却。测试覆盖反 MIRV、阻止个人/团队胜利、城市滚雪球与不满足城市门槛时不发射，见 [`NationMIRV.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationMIRV.test.ts)。

## 人类可观察信号与可验证反制

| 玩家可见信号              | 最稳妥的解释                                             | 可尝试的反制                                                           | 仍不能保证                       |
| ------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| Nation 兵力长期接近最大值 | 可能尚未过个体 trigger，或没有成功目标                   | 保持邻接兵力、路线与外交，不把“没动”当永久和平                         | 下一轮不攻击                     |
| Nation 发联盟请求 / 续约  | 当次通过了概率和多层资格                                 | 维持至少 Neutral/Friendly、避免 traitor 与过多联盟；尽早请求通常更有利 | 必然接受或永久续约               |
| Nation embargo            | 当前关系或 Team 高难规则阻止贸易                         | 提升关系；Easy/Medium 到 Neutral、Hard 到 Friendly 才可能自动解除      | Impossible 自动解除              |
| 前线出现 Defense Post     | 累计陆地来袭至少达到其兵力 35%，且通过难度/资源/位置条件 | 分散或暂停陆地攻势；海上攻击不计入该结构阈值                           | Nation 不还击或不建别的防御      |
| 岸边出现 Port / Warship   | 有共享水体，或发生常规/事件反制                          | 避免无掩护运输；现有 Warship 可能被调往来袭点                          | 一个 Port 等于全海封锁           |
| 船表情或 Warship 转向     | 可能是运输/贸易损失或来袭运输触发                        | 缩短暴露航程、先处理 Port/Warship、不要假设重复攻击仍无反制            | 每次都触发新舰                   |
| Silo / 核武轨迹           | AI 有合格目标、黄金与可用路径                            | 降低结构密度、分散高等级结构、布置 SAM、避免成为 crown/最大来袭者      | SAM 永久阻止高难 AI              |
| MIRV 与全图核表情         | 可能是反 MIRV、胜利阻止或城市领先                        | 避免单人/单队越过难度阈值，控制城市领先幅度                            | 低于某一阈值就绝不被其他分支选中 |

最重要的战术表达边界：玩家是在改变候选资格、优先级和成本，不是在输入一个会得到固定输出的口令。

## 建议页面结构

1. **60 字直接答案**：Nation 是多个行为器加确定性伪随机，不是固定建造顺序。
2. **先分清 Nation 与普通 Bot / Tribe**：二者共享部分攻击代码，但 Nation 才有联盟、结构、核武与专属关系行为；不能混称所有 AI。
3. **决策循环图**：出生 -> 空地扩张 -> 储备门槛 -> 难度策略队列 -> 结构/外交/海军/核武并行行为。
4. **四档难度表**：行动间隔、对人攻击 gate、兵力地板、Defense Post、铁路评分、海军反制和联盟差异。
5. **攻击目标拆解**：retaliate、very weak、victim、weakest、island 各给一个满足/不满足例子。
6. **建筑与海军**：目标比率、首建例外、选址原则、Port 水体资格、Warship 的概率门槛。
7. **联盟与背叛**：把关系、traitor、实力、联盟数量和唯一邻居条件做成检查表。
8. **玩家读信号与反制**：用上表回答“我为什么突然被打/被背叛/被核”。
9. **FAQ 与版本来源**：明确随机 gate 不是整局概率，测试源码未等于真人胜率。

页面不宜把所有内部常量平铺成百科。主文优先解释会改变玩家决策的阈值，其余细节折叠到“源码注”或 FAQ。

## 当前不可声称

- **“AI 总会做 X”**：绝大多数分支受候选、资源、禁用设置、路线、关系、难度或伪随机 gate 约束。
- **固定建造顺序或时间表**：目标比率、感知成本、抽样位置、首建例外和结构冷却共同改变结果。
- **精确的每分钟攻击概率**：行为间隔、随机流调用历史、reserve/trigger 和目标可用性都参与。
- **Easy 不攻击人类**：Easy 只是每次一般人类 `shouldAttack` 判断有 75% 被挡；还击、HvN、traitor 和非人类分支不同。
- **Impossible 无随机性**：它仍有个体阈值、候选抽样、目标抽样、1/50 首舰 gate、核武 gate 等随机行为。
- **Nation 坐标就是固定出生点**：manifest 坐标只是附近抽样锚点；无坐标 Nation 走随机出生。
- **保持 Friendly 就不会被背叛**：背叛检查基于联盟、实力、traitor 和邻接条件，不只看 relation。
- **达到某个兵力或关系值立即触发**：策略只有在行为循环走到该分支且前序策略未成功时才执行。
- **Port 一定带来 Warship / 控制整个水体**：建造、黄金、随机 gate、可建水格和水体连通均是前置条件。
- **SAM 使高难 Nation 放弃核武**：Hard / Impossible 会避开可拦截路径，Impossible 还可能尝试压制 SAM。
- **低于 MIRV 胜利阈值就安全**：反 MIRV与城市滚雪球是独立目标分支，普通核武也有另一套选择逻辑。
- **源码阈值等于胜率或最佳策略**：没有正式对局遥测、玩家水平控制或多局实验，不能生成胜率 tier list。
- **未发布 `main` 行为属于 v0.33.7**：后续 commit 即使改进 AI，也必须等正式 Release 或明确另设版本边界。

## 一手来源索引

- 正式版本：[`v0.33.7 Release`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7)、[`v0.33.7 tree`](https://github.com/openfrontio/OpenFrontIO/tree/v0.33.7)。
- 调度与随机：[`NationExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/NationExecution.ts)、[`PseudoRandom.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/PseudoRandom.ts)。
- 攻击：[`AiAttackBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/utils/AiAttackBehavior.ts)、[`AiAttackBehavior.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/AiAttackBehavior.test.ts)、[`AiAttackBehaviorNukedTerritory.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/AiAttackBehaviorNukedTerritory.test.ts)。
- 联盟与信号：[`NationAllianceBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationAllianceBehavior.ts)、[`NationAllianceBehavior.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationAllianceBehavior.test.ts)、[`NationEmojiBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationEmojiBehavior.ts)。
- 建筑：[`NationStructureBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationStructureBehavior.ts)、[`NationStructureBehavior.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationStructureBehavior.test.ts)、[`SharedWaterCache.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/SharedWaterCache.ts)。
- 舰船：[`NationWarshipBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationWarshipBehavior.ts)、[`NationCounterWarshipInfestation.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationCounterWarshipInfestation.test.ts)。
- 核武：[`NationNukeBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationNukeBehavior.ts)、[`NationNukeSamOverwhelm.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationNukeSamOverwhelm.test.ts)、[`NationMIRVBehavior.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/nation/NationMIRVBehavior.ts)、[`NationMIRV.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/NationMIRV.test.ts)。

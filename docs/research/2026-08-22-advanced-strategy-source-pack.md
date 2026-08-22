# OpenFront 高阶局势长文来源包

研究日期：2026-08-22（Asia/Vladivostok）
主题：败局恢复、团队角色协作、外交与背叛
目标页面：`recovery-playbook`、`team-roles`、`diplomacy-betrayal`
来源限制：仅使用 OpenFrontIO 正式 Release、v0.33.7 tag 源码与官方测试；战术框架必须与引擎事实分栏呈现。

## 结论摘要

这三篇不能写成通用 tips 合集，应分别回答三个不同的下一步决策：

- **Recovery Playbook：**先停止不可逆损失，再利用撤退、自然增长、友方支援和 Doomsday Clock 的恢复窗口；不存在对所有局面都正确的固定持兵比例。
- **Team Roles：**角色不是游戏锁定的职业，而是围绕前线承压、资源转移、目标标记、铁路贸易、海上支援和核威慑建立的团队决策框架。
- **Diplomacy & Betrayal：**结盟、续约、禁运和背叛都有明确计时器与状态后果；页面应帮助玩家比较退出成本，而不是把背叛包装成固定最优解。

三篇共同的写作边界：源码可以证明规则、时间、倍率与状态转换，但不能证明某个阵容、时点或持兵比例具有固定胜率。

## 版本与证据边界

### 当前正式版本

截至研究时，GitHub 最新非 draft、非 prerelease 正式 Release 是 **v0.33.7**，发布于 2026-08-21 23:55:28 UTC；tag 指向 commit `2d5baafdd0cc3f38ee1805d07ef15c1bc5bce09b`。[正式 Release][release-337] [tag ref][tag-ref-337]

本文所有 GitHub 源码链接固定到 `blob/v0.33.7`，不以默认分支代表已发布行为。

### 本地 checkout 与正式 tag

本站 [`src/data/_meta.json`](../../src/data/_meta.json) 的 `upstreamCommit` 是 `0668045fa926eaa6d6995561a8e13fd8126895b6`，本地 OpenFrontIO clone 也停在这个 commit；它不是 v0.33.7 tag。`upstreamVersion: "v33"` 表示本站验证系列，不是精确 patch tag。

正式比较显示，本来源包涉及的 `Config.ts`、`PlayerImpl.ts`、Doomsday 与 Nuke 文件在该 checkout 到 v0.33.7 之间存在变化。因此涉及这些文件的现行数值与分支以 GitHub v0.33.7 tag 内容为准；未变化的执行文件也统一链接到同一正式 tag。[checkout 与 v0.33.7 比较][compare-extract-337]

证据优先级：

1. v0.33.7 tag 源码，确认当前执行路径。
2. v0.33.7 tag 官方测试，确认边界条件和预期行为。
3. 正式 Release 与 tag API，确认发布身份和版本边界。

## 三个页面的唯一职责

| 页面                              | 直接回答                                               | 必须覆盖                                                 | 不应复制                                     |
| --------------------------------- | ------------------------------------------------------ | -------------------------------------------------------- | -------------------------------------------- |
| `/strategies/recovery-playbook/`  | 落后、被夹击或遭核打击后，下一步如何止损并恢复行动能力 | 撤退、增长曲线、支援入口、Doomsday 紧急门槛、恢复顺序    | `first-match` 的新手操作流程、完整经济百科   |
| `/strategies/team-roles/`         | 团队如何分配职责并通过捐赠、标记、贸易与火力协作       | 角色切换、共同冷却、支援上限、目标标记、团队与 ally 差异 | 单独的海军玩法、完整铁路机制、固定职业表     |
| `/strategies/diplomacy-betrayal/` | 何时请求、续约、禁运或主动破盟，以及怎样评估代价       | 请求窗口、续约、embargo、traitor、核武破盟               | `alliances` 规则百科、不可核验的心理博弈保证 |

# Recovery Playbook 来源包

## 可直接用于长文的直接答案

> 在 v0.33.7 的败局里，恢复顺序应是先停止继续损失，再恢复部队增长，最后才重建进攻能力。能退出的不利进攻应尽早撤退；把当前部队从接近上限降到有增长空间，会提高自然恢复速度，但储备必须服从眼前威胁。若 Doomsday Clock 已标记你或你的团队，第一目标是重新达到当前领土门槛，因为达标会立即清除 drain 与 territory rot，而不是等待固定倒计时结束。

其中“撤退损失”“增长公式”和“重新达标立即清除”是引擎事实；“先止损、再恢复、后反攻”是基于这些规则的编辑性决策框架。[RetreatExecution.ts][src-retreat] [Config.ts][src-config] [DoomsdayClockExecution.ts][src-doomsday-exec]

## 1. 先识别仍在扩大的损失

### 默认出兵与扣除时点

Human 与 Nation 的默认陆地攻击量是当前 Troops 的 `1/5`，Bot 默认是 `1/20`；boat attack 的默认值也是 `1/5`。攻击开始时，派出的 Troops 会从 owner 当前兵力中扣除。[Config.ts][src-config] [PlayerExecution.ts][src-player-execution] [AttackExecution.ts][src-attack-exec]

这个默认值只是未手动指定时的执行参数，不是“最佳出兵比例”。文章可提醒玩家确认仍在进行的攻击，但不能从默认值推导出 20% 永远安全。

### 主动撤退的真实代价

`RetreatExecution` 在收到撤退后等待 20 simulation ticks，即常速约 2 秒，再处理返回兵力。对玩家目标的攻击，执行撤退时仍存活的攻击 Troops 扣除 25%，其余 75% 返回；对 Terra Nullius 撤退不应用这项 malus。[RetreatExecution.ts][src-retreat] [Attack.test.ts][test-attack]

应精确写成“执行撤退时剩余兵力的 75%”，不能写成“原始出兵的 75%”。这 2 秒内，攻击仍可能继续交战或受到核武影响，所以最终返回值可低于点击撤退时的画面数字。[RetreatExecution.ts][src-retreat] [AttackImpl.ts][src-attack]

两个例外应在失败模式中说明：

- 若进行中的双方在攻击期间成为 alliance，攻击会无 malus 撤回。
- 相向攻击相遇时会先相互抵消，因此另开反向攻击不是凭空保存部队的方法。

来源：[AttackExecution.ts][src-attack-exec] [AttackImpl.ts][src-attack] [Attack.test.ts][test-attack]

### 编辑性止损清单

页面可以把下列顺序作为决策框架，但必须标成建议而非隐藏机制：

1. 盘点仍在进行且无法取得领土价值的攻击。
2. 比较继续交战的预期损失与撤退的 25% malus。
3. 检查 2 秒撤退窗口内是否仍会遭到夹击或核伤。
4. 只有在边界稳定后，才把 Gold 投入扩大上限、贸易或反攻网络。

## 2. 用增长曲线恢复，而不是等待固定时间

Human 每 tick 的自然 Troop 增长为：

```text
growth = (10 + troops^0.73 / 4) * (1 - troops / maxTroops)
```

simulation tick 为 100 ms，常速每秒约 10 ticks。增长会在接近 `maxTroops` 时显著放慢；它不是线性补满计时器。[Config.ts][src-config] [PlayerExecution.ts][src-player-execution]

以 10,000 tiles、无 City 的 Human 为例，`maxTroops` 约为 602,377。按正式公式计算：

| 当前兵力占上限 | 常速每秒约增长 | 编辑含义                             |
| -------------: | -------------: | ------------------------------------ |
|            25% |         11,368 | 有较大恢复空间，但未说明前线是否安全 |
|            50% |         12,537 | 接近该示例的增长高位，不代表强制目标 |
|            90% |          3,846 | 接近上限时自然恢复明显放慢           |

这张表只展示同一上限下的增长差异。文章可以说“适度留出增长空间”，不能规定所有地图、模式和敌情都应固定维持某个百分比。

普通 Human 的基础 Gold 为每 tick 100，1x 常速约 1,000 Gold / 秒。City 增加 `maxTroops`，不会直接把当前 Troops 治疗或补满；扩大上限后仍需按增长公式积累。[Config.ts][src-config] [PlayerExecution.ts][src-player-execution]

## 3. 把友方支援写成条件分支

恢复页可以简要导向团队协作页，但不要复制完整捐赠规则。可直接写入的边界是：

- 同队或 alliance 玩家都属于 `friendly`；支援是否可用还取决于当前模式的 donation 配置。
- Troop donation 会受 recipient 的 `maxTroops` 剩余空间限制，不能越过 troop cap。
- 对同一 recipient 的 Gold 与 Troop donation 共用 10 秒冷却，因此紧急支援要先决定最缺哪一种资源。

来源：[PlayerImpl.ts][src-player] [DonateGoldExecution.ts][src-donate-gold] [DonateTroopExecution.ts][src-donate-troop] [Donate.test.ts][test-donate] [AllianceDonation.test.ts][test-alliance-donation]

恢复页只需给一个动作问题：“现在缺的是能立刻守线的 Troops，还是能解除上限、建防御或恢复网络的 Gold？”具体角色分工留给 `team-roles`。

## 4. Doomsday Clock 是紧急门槛，不是固定死亡倒计时

### 门槛推进

前 10 分钟门槛为 0。之后，FFA 的七档门槛是 2%、4%、7%、11%、17%、25%、35%；Team 模式是 3%、6%、10%、15%、21%、28%、35%。Normal speed 下，每档 ramp 为 168 秒，档间 pause 为 54 秒。[DoomsdayClock.ts][src-doomsday] [DoomsdayClockExecution.ts][src-doomsday-exec] [DoomsdayClockExecution.test.ts][test-doomsday]

FFA 按单个玩家的 usable land percentage 判断；Team 模式按全队合计领土判断，并让所有成员共享该结果。当前 leader side 永远不会被标记。[DoomsdayClock.ts][src-doomsday] [DoomsdayClockExecution.ts][src-doomsday-exec]

### 低于门槛后的状态

低于当前门槛时：

- 先有 30 秒 warning。
- drain 从每秒 `maxTroops` 的 2% 线性升到 5%，用 90 秒完成 ramp。
- troop floor 从 `maxTroops` 的 40% 降到 5%，同样用 90 秒完成。
- territory rot 在 skull 出现后推进，并在 150 秒达到领土归零。

重新达到门槛会立即 clear 当前警告、drain 与 rot，相关 rot 状态也会重置。[DoomsdayClockExecution.ts][src-doomsday-exec] [DoomsdayClockExecution.test.ts][test-doomsday]

因此不能把它概括成“固定两分钟后死亡”或“只要等到某个时点就会恢复”。恢复动作应围绕当前门槛差额展开。

## 5. 可复用数字场景

### 场景 A：撤退保存的是剩余兵力

假设一支攻击在撤退执行时还剩 100,000 Troops，且随后的处理没有其他变化：

```text
returned = 100,000 * (1 - 0.25) = 75,000
```

若最初出兵 160,000，但执行撤退时只剩 100,000，返回值仍是 75,000，而不是 120,000。这个场景应同时写明“20 ticks 的等待仍可能改变剩余兵力”。[RetreatExecution.ts][src-retreat]

### 场景 B：相同土地，不同兵力状态的恢复速度

在 10,000 tiles、无 City、1x Human 的同一上限下：25% cap 每秒约增长 11,368，90% cap 每秒约增长 3,846。这个差异说明接近上限会压低自然增长，不证明 25% 是实战最优储备。[Config.ts][src-config]

### 场景 C：第一档 Doomsday 门槛

假设地图有 1,000,000 usable land，Normal speed 的第一段 ramp 已完成：

- FFA 第一档 2%，需要 20,000 tiles。
- Team 第一档 3%，全队合计需要 30,000 tiles。

Team 不是要求每名成员各有 30,000 tiles；引擎按全队合计，并把判断应用于全体成员。[DoomsdayClock.ts][src-doomsday] [DoomsdayClockExecution.ts][src-doomsday-exec]

## 6. 明确禁止写入的推断

- 不写固定“最佳持兵百分比”或统一恢复配比。
- 不写“撤退必返原始出兵的 75%”。
- 不写“City 会治疗 Troops”或“升级 City 立即补满新增容量”。
- 不写“Doomsday 固定两分钟可恢复/必死”。
- 不写“等待一定能翻盘”或任何恢复胜率保证。
- 不把 leader exemption 写成永久身份；leader side 会随游戏状态变化。
- 不把 Team 合计门槛写成每名成员的个人门槛。

## 7. 页面结构建议

1. 40–80 words 的直接答案：止损、恢复、重建三个阶段。
2. “你现在是哪一种败局”分流：兵力亏空、领土门槛、Gold 断裂、遭核打击、被夹击。
3. 仍在扩大的损失：攻击、撤退与 2 秒风险窗口。
4. 恢复速度：增长公式、cap 与 City 边界。
5. 友方支援：Troops / Gold 的二选一检查。
6. Doomsday 紧急处置：当前档位、差额、团队合计。
7. 三个数字场景与“何时该停止恢复、重新进攻”。
8. 失败模式、反制和来源面板。

# Team Roles 来源包

## 可直接用于长文的直接答案

> OpenFront 没有锁定职业。团队角色应随边界、资源和基础设施变化而切换：前线玩家承压并报告目标，经济玩家把 Gold 或 Troops 送到真正的瓶颈，铁路与海军玩家保持跨区域支援，核威慑玩家保存足够的响应能力。v0.33.7 中，捐赠有模式开关、recipient 容量和 10 秒共同冷却；target 标记持续 10 秒，但它不等于共享全部视野。

“没有职业锁定”和 donation / target 规则是引擎事实；六类角色及其切换条件是编辑性协作框架。[PlayerImpl.ts][src-player] [DonateGoldExecution.ts][src-donate-gold] [DonateTroopExecution.ts][src-donate-troop] [TargetPlayerExecution.ts][src-target]

## 1. 先定义 friendly，再讨论支援

`friendly` 的引擎定义是 self、same team 或 alliance。玩家不能对 friendly player 发起普通陆地攻击。[PlayerImpl.ts][src-player] [AttackExecution.ts][src-attack-exec]

但 teammate 与 ally 不是完全相同的关系：

- team membership 由模式决定，不是限时 alliance。
- alliance 有请求、时长、续约和破盟状态。
- Train 对 ally stop 的基础 payout 是 35,000，对 teammate 和 other stop 都是 25,000。

因此正文可以统称“友方”描述不可攻击或可捐赠的共同分支，但涉及外交状态、计时器和贸易收益时必须区分 teammate 与 ally。[PlayerImpl.ts][src-player] [TrainStation.ts][src-train-station]

## 2. 捐赠不是无限资源管道

### 模式开关

Public playlist 的默认配置中：

| 模式       | Donate Gold | Donate Troops |
| ---------- | ----------- | ------------- |
| Team       | 开启        | 开启          |
| FFA        | 关闭        | 关闭          |
| Ranked 1v1 | 关闭        | 关闭          |
| Ranked 2v2 | 开启        | 开启          |

自定义房间仍可能改变能力开关。页面应写“Team 与 ranked 2v2 默认可捐赠”，不要写“所有 alliance 都能捐”或“FFA 永远不能通过自定义设置开启”。[MapPlaylist.ts][src-map-playlist]

### 可执行条件与共同冷却

Gold / Troop donation 都要求 sender 与 recipient 存活且属于 friendly；Human 还必须满足对应 config 开关。对同一 recipient 的捐赠冷却为 10 秒。[DonateGoldExecution.ts][src-donate-gold] [DonateTroopExecution.ts][src-donate-troop] [Donate.test.ts][test-donate] [AllianceDonation.test.ts][test-alliance-donation]

两类捐赠共用 sender 的 `sentDonations` 记录。也就是说，对某个 recipient 送出 Troops 后，紧接着送 Gold 会被同一个 10 秒冷却阻止，反之亦然。[PlayerImpl.ts][src-player] [Donate.test.ts][test-donate]

这是团队页面最重要的操作约束之一：紧急时不要让小额捐赠先占掉同一 recipient 的共同冷却。

### Troop donation 的数量边界

默认 Troop donation 量是 sender 当前 Troops 的 `1/3`。实际转移量还会：

- capped 到 recipient 的 `maxTroops - troops` headroom；
- capped 到 sender 实际可扣除的数量；
- 不把 recipient 推过 `maxTroops`。

Gold donation 同样只能转移 sender 实际可扣除的余额。[DonateTroopExecution.ts][src-donate-troop] [DonateGoldExecution.ts][src-donate-gold] [Donate.test.ts][test-donate]

因此角色协作应先问“recipient 还有多少 troop headroom”，不能把一个固定的大额 Troop call 当成保证到账。

## 3. Target caller 共享意图，不共享完整情报

一个 target 标记持续 10 秒；同一 sender 的标记能力有 15 秒 cooldown。客户端会把 ally 和 teammate 发出的 target markers 合并显示。[TargetPlayerExecution.ts][src-target] [PlayerView.ts][src-player-view]

这能证明团队可共享“现在集中处理谁”的短时意图，不能证明：

- 队友共享完整战争迷雾；
- 队友自动获得目标的全部单位和资源信息；
- 10 秒标记结束后立即可以无冷却重标同一目标。

页面可以把 target caller 定义为轮换职责：在 10 秒可见窗口内只维护一个当前优先级，并在 15 秒 cooldown 期间依赖语音、ping 或其他已有信息继续协调。后半句是协作建议，不是游戏内通信保证。

## 4. 铁路与贸易角色的现行收益

Train 每到一个 City 或 Port stop，基础 payout 取决于 station owner 与 Train owner 的关系：

| stop 关系 | Train owner 基础收入 | 外方 station owner 基础收入 |
| --------- | -------------------: | --------------------------: |
| ally      |               35,000 |                      35,000 |
| teammate  |               25,000 |                      25,000 |
| other     |               25,000 |                      25,000 |
| self      |               10,000 |          同一玩家，只记一份 |

外方 stop 的双方各得完整 payout，不是平分一份。实际结果还受 Gold multiplier 和长路线 stop penalty 影响。[TrainStation.ts][src-train-station]

团队页应把铁路角色写成“维持可用连接和站点”，而不是“teammate 路线收益最高”。当前代码恰恰给 ally stop 35,000，teammate 与 other 都是 25,000。

## 5. 六类编辑性角色框架

下列角色不对应引擎职业、权限或强制阵容。它们只是把可验证动作组织成团队检查表。

| 角色                   | 主要问题                               | 可验证动作                                     | 切换信号                                      |
| ---------------------- | -------------------------------------- | ---------------------------------------------- | --------------------------------------------- |
| Frontline / anchor     | 谁在吸收当前陆地压力                   | 守住关键接触面、发 target、报告 Troop headroom | 边界缩短、邻敌改变、进入 Doomsday 风险        |
| Donor / economy        | 哪名玩家的 Gold 或 Troops 边际价值最高 | 在共同冷却前选择 donation 类型与 recipient     | recipient 接近 cap、前线已稳定、自己成为目标  |
| Target caller          | 当前 10 秒窗口集中谁                   | 标记单一优先目标、避免多人重复占用注意力       | target 结束或 15 秒 cooldown 期间出现更高威胁 |
| Rail / trade logistics | 支援网络是否仍能结算                   | 维持 Factory、City、Port 路径与外方 stop       | 路线被切断、禁运、stop owner 关系变化         |
| Naval support          | 海峡、运输和 Port 是否需要保护         | 护航、控制水路、支援沿岸边界                   | 地图拓扑转为陆战或无有效海路                  |
| Nuclear deterrence     | 谁保存足够 Gold、Silo 与响应槽位       | 避免无目标消耗，保护核设施，报告可用火力       | ally 状态变化、SAM 压力、关键设施暴露         |

“角色切换”应是页面的核心原创价值：同一玩家可以在一局中从 donor 变成 frontline，也可能因铁路断裂而从 logistics 转为守线。不要用卡牌式固定职位呈现。

## 6. 可复用数字场景

### 场景 A：Troop headroom 截断捐赠

recipient 的 `maxTroops` 为 200,000、当前为 185,000。即使请求 30,000 Troops，实际最多只能收到：

```text
headroom = 200,000 - 185,000 = 15,000
```

随后 sender 对同一 recipient 的 Gold 与 Troop donation 都受 10 秒共同冷却。场景应强调“先检查容量，再决定资源类型”。[DonateTroopExecution.ts][src-donate-troop] [PlayerImpl.ts][src-player]

### 场景 B：target 的显示窗口与重标间隔

在 `t = 0` 标记敌人后，marker 持续到约 `t = 10s`；同一 sender 的 cooldown 到约 `t = 15s` 才结束。因此存在约 5 秒“旧 marker 已消失、sender 尚不能再次标记”的窗口。[TargetPlayerExecution.ts][src-target]

### 场景 C：ally stop 与 teammate stop

在 1x multiplier、未触发 stop penalty 时，同一外部 Train stop：

- teammate 的 Train owner 与 station owner 各得 25,000。
- ally 的 Train owner 与 station owner 各得 35,000。

这不是 alliance 全面优于 team 的证明；它只说明当前 Train stop payout 的这一条分支。[TrainStation.ts][src-train-station]

### 场景 D：共同冷却下的资源选择

前线同时缺 Troops 与 120,000 Gold。若 donor 先送一笔很小的 Troop donation，就会占用对该 recipient 的 10 秒共同冷却，Gold 不能紧接着补上。页面应引导团队按“未来 10 秒内哪一种资源解除的瓶颈更大”排序，而不是机械双击两种 donation。[DonateGoldExecution.ts][src-donate-gold] [DonateTroopExecution.ts][src-donate-troop]

## 7. 明确禁止写入的推断

- 不写“角色由游戏锁定”或角色自带增益、权限。
- 不写“队友共享完整视野/战争迷雾”。
- 不写“捐赠无限、即时、始终启用”。
- 不写“Gold 和 Troops 各有独立 10 秒冷却”。
- 不写“teammate Train stop 支付 35,000”。
- 不写“alliance 与 team 是同一种关系”。
- 不写“固定六人配置”“固定捐赠顺序”保证获胜。
- 不把 target marker 当成强制队友攻击或自动同步战术。

## 8. 页面结构建议

1. 40–80 words 的直接答案：角色可变、支援有冷却、标记不等于视野。
2. 团队状态表：谁承压、谁有 headroom、谁有 Gold、哪些网络仍在线。
3. 六类角色卡，但每张都必须有“切换信号”，不能做固定职业介绍。
4. donation 决策树：recipient、headroom、资源类型、共同 cooldown。
5. target 的 10 秒 / 15 秒时间轴。
6. ally、teammate、other 的 Train payout 对照。
7. 四个数字场景、失败模式与反制。
8. 导向 naval control、rail/economy、nuclear deterrence 与 diplomacy 页。

# Diplomacy & Betrayal 来源包

## 可直接用于长文的直接答案

> 在 v0.33.7，外交决策首先是计时器与退出成本管理：alliance request 只持续 20 秒，对同一玩家 30 秒后才能重发；默认 alliance 为 5 分钟，续约需要双方同意。自然到期不会制造 traitor，但主动破盟通常会带来 30 秒 traitor 状态和 relation penalty。普通攻击产生约 5 分钟 temporary embargo，手动 embargo 则持续存在；接受 alliance 只清除 temporary embargo。

时长、状态与倍率是引擎事实；“何时值得承担退出成本”只能作为情境化决策框架，不能写成固定背叛时点。[AllianceRequestExecution.ts][src-alliance-request] [AllianceExtensionExecution.ts][src-alliance-extension] [BreakAllianceExecution.ts][src-break-alliance] [EmbargoExecution.ts][src-embargo]

## 1. Alliance 从请求开始，不是即时永久和平

### 能否结盟

`customAllianceDuration: 0` 会禁用 alliance；legacy `disableAlliances` 也会阻止请求。默认 alliance duration 为 5 分钟，自定义时长允许 1–15 分钟。[AllianceRequestExecution.ts][src-alliance-request] [CustomAllianceDuration.test.ts][test-custom-alliance]

文章应先提示玩家确认当前 lobby 规则，不能把默认 5 分钟写成所有房间不可改变的常量。

### 请求窗口与重试

alliance request 持续 20 秒。对同一玩家的 request cooldown 是 30 秒，并从原 request 创建时开始计算；不是从 20 秒请求失效后再等 30 秒。[AllianceRequestImpl.ts][src-alliance-request-impl] [AllianceRequestExecution.ts][src-alliance-request] [AllianceRequestExecution.test.ts][test-alliance-request]

若对方已经向你发出 incoming request，你向对方发 counter-request 会接受这份联盟，而不是创建两份并行请求。[AllianceRequestExecution.ts][src-alliance-request] [AllianceRequestExecution.test.ts][test-alliance-request]

### 续约

alliance extension 需要双方同意。客户端在到期前 30 秒开放 extension window；一旦双方完成续约，期限从当前 tick 重新计算完整 alliance duration，而不是只在旧期限上增加 30 秒。[AllianceExtensionExecution.ts][src-alliance-extension] [AllianceImpl.ts][src-alliance] [AllianceExtensionExecution.test.ts][test-alliance-extension]

自然 expiry 只结束 alliance，不会触发 traitor 标记。页面必须把“让联盟到期”和“主动 break”写成不同退出路径。[AllianceImpl.ts][src-alliance] [BreakAllianceExecution.ts][src-break-alliance]

## 2. Embargo 与 alliance 是两套状态

### Temporary 与 manual embargo

普通攻击会使 target 对 attacker 建立 temporary embargo；该 temporary embargo 约 5 分钟后自动结束。玩家手动发起的 embargo 是 persistent，不会使用同一自动到期路径。[PlayerExecution.ts][src-player-execution] [AttackExecution.ts][src-attack-exec] [EmbargoExecution.ts][src-embargo] [PlayerImpl.ts][src-player]

mutual alliance acceptance 只清除双方的 temporary embargo，不清除 manual embargo。因此不能写“结盟自动解除所有禁运”。[GameImpl.ts][src-game] [AllianceRequestExecution.test.ts][test-alliance-request]

`canTrade()` 只要发现任一方向存在 embargo 就返回 false；反过来，没有 embargo 的不同玩家可以交易，不要求双方先成为 ally。[PlayerImpl.ts][src-player]

### Embargo All

Embargo All 会排除 self、Bot 与 teammate，并有 10 秒 cooldown。[EmbargoAllExecution.ts][src-embargo-all]

这个动作可以作为“快速切断多个外部贸易关系”的机制说明，但不能写成对所有敌人的永久自动封锁；具体目标仍受排除条件和后续状态变化影响。

## 3. 主动背叛的可验证代价

手动 break active alliance 时，若被背叛者仍连接且当前不是 traitor，breaker 会被标记为 traitor，持续 30 秒。[BreakAllianceExecution.ts][src-break-alliance] [AllianceImpl.ts][src-alliance]

relation 变化为：

- 被背叛的 recipient 对 breaker：`-100`。
- 附近、且不与 recipient 同队的其他玩家：`-40`。

来源：[BreakAllianceExecution.ts][src-break-alliance]

relation 是引擎状态，不能直接翻译成“真人玩家一定会报复”或固定外交反应。它可以解释 AI/关系系统看到的事件强度，但人的选择仍不可预测。

### 攻击 traitor 的战斗修正

当 defender 正处于 traitor 状态时：

- attacker 的损失乘 `0.5`。
- tile processing cost 乘 `0.8`。

来源：[execution Util.ts][src-execution-util] [AttackExecution.ts][src-attack-exec]

可以写“同条件下，攻击 traitor 的推进成本更低、攻击方损失倍率更低”。不要把 `0.8` 直接换算成固定“快 20%”或固定完成时间，因为实际推进还受路径、兵力、抵消、tick 状态等因素影响。

## 4. 核武可能先终止 alliance

### 触发阈值

v0.33.7 的 `nukeAllianceBreakThreshold()` 为 100。对爆炸影响范围内 allied territory 的加权计数：

- inner radius 内每个 allied tile 权重 1。
- outer ring 内每个 allied tile 权重 0.5。
- weighted count 必须严格 `> 100`，不是 `>= 100`，才仅凭 territory 触发破盟。

此外，只要爆炸 outer radius 内存在会被摧毁的 allied structure，就会触发破盟，不受上述 tile threshold 限制。[Config.ts][src-config] [NukeExecution.ts][src-nuke-exec] [NukeExecution.test.ts][test-nuke]

### 发射与接受联盟时的处理

发射会破坏 alliance 的核弹时，执行路径会拒绝相关 pending requests、break alliance，并沿正常 break 逻辑处理 traitor。[NukeExecution.ts][src-nuke-exec] [BreakAllianceExecution.ts][src-break-alliance]

接受 alliance 时，游戏会删除双方仍在飞行、且按同一规则会破坏新 alliance 的 nukes。这是“新联盟不应立刻被已有在途核弹打破”的保护逻辑，不等于所有第三方核弹或所有伤害被取消。[GameImpl.ts][src-game] [AllianceAcceptNukes.test.ts][test-alliance-nukes]

`NukeExecution` 对 `MIRVWarhead` 跳过上述 alliance-break 检查。这个局部分支只能支持“该 warhead 执行路径不在此处触发破盟”，不能扩写成“MIRV carrier、所有 MIRV 阶段或整个 MIRV 永远不会破盟”。[NukeExecution.ts][src-nuke-exec]

### Team 不是 alliance

team membership 不通过 alliance 状态实现，手动 break alliance action 不能拆散队伍；普通陆攻也会被 friendly 规则阻止攻击 teammate。[PlayerImpl.ts][src-player] [BreakAllianceExecution.ts][src-break-alliance] [AttackExecution.ts][src-attack-exec]

这些事实不能进一步推导为“核武对 teammate 无伤害”。当前研究只证明 team 不会经 alliance-break 状态被拆散，没有对全部核伤分支作出无伤结论。

## 5. 情境化决策框架

页面可以用四问比较外交动作，但要把它标为编辑模型：

1. **时间：**request、到期、extension window、temporary embargo 和 traitor 还剩多久？
2. **退出成本：**自然到期是否足够，还是必须立即 break 并承受 traitor？
3. **网络：**任一方向 embargo 会切断哪些 Port / Train 关系？
4. **火力：**已有核弹是否会因新 alliance 被删除，计划中的落点是否会先触发破盟？

由此可以形成三个不带胜率承诺的策略分支：

- **等待自然到期：**适合不需要立即攻击、希望避免 traitor 的情形。
- **协商续约：**适合双方仍需要共同缓冲区或贸易网络，且能在到期前完成双向同意的情形。
- **主动破盟：**只在立即行动价值高于 30 秒 traitor 暴露与 relation penalty 时考虑。

## 6. 可复用数字场景

### 场景 A：请求与默认 alliance 时间轴

```text
t = 0s    发出 request
t = 20s   request 窗口结束
t = 30s   对同一玩家可再次发 request
接受后   默认 alliance duration = 300s
到期前 30s 进入 extension window
```

请求 cooldown 从 `t = 0` 计算，所以失效后约再等 10 秒，而不是再等完整 30 秒。[AllianceRequestExecution.ts][src-alliance-request] [AllianceExtensionExecution.ts][src-alliance-extension]

### 场景 B：自然到期与手动背叛

让 alliance 自然走完 300 秒不会触发 traitor；手动 break 符合条件的 active alliance，则 breaker 进入 30 秒 traitor 状态。这个对照只描述状态代价，不判断哪种选择更好。[AllianceImpl.ts][src-alliance] [BreakAllianceExecution.ts][src-break-alliance]

### 场景 C：核武 territory threshold 的严格大于

- 101 个 inner allied tiles：加权 101，超过阈值，会触发破盟。
- 正好 100 个 inner allied tiles：加权 100，仅靠 tile count 不触发。
- 200 个 outer allied tiles：加权 100，仅靠 tile count 同样不触发。

来源：[Config.ts][src-config] [NukeExecution.ts][src-nuke-exec] [NukeExecution.test.ts][test-nuke]

### 场景 D：少量领土但命中结构

即使 outer radius 内只有 3 个 allied tiles，只要爆炸会摧毁其中的 allied Port，structure 条件仍会触发破盟。页面应把“领土加权阈值”和“任何 allied structure”画成并列的 OR 分支。[NukeExecution.ts][src-nuke-exec] [NukeExecution.test.ts][test-nuke]

## 7. 明确禁止写入的推断

- 不写“alliance 是永久和平”或默认永远持续。
- 不写“接受 alliance 自动解除所有 embargo”。
- 不写“普通攻击后的 embargo 永久存在”。
- 不写“自然到期属于 betrayal”或一定产生 traitor。
- 不写“背叛一定最佳”“背叛一定失败”或固定最佳时点。
- 不把 relation penalty 等同于人类玩家的必然反应。
- 不把 `0.8` tile processing cost 写成固定 20% 更快完成。
- 不写“MIRV 整体绝不会破盟”。
- 不写“teammate 与 ally 机制完全相同”。
- 不写“核武对 teammate 无伤害”；本来源包未证明这一命题。

## 8. 页面结构建议

1. 40–80 words 的直接答案：计时器、退出成本、embargo 与 traitor。
2. alliance 生命周期：request、accept、extension、expiry、break。
3. 一条 0–300 秒的默认时间轴，标出 20 秒、30 秒和最后 30 秒。
4. embargo 状态表：temporary、manual、任一方向阻断贸易、结盟时清除范围。
5. betrayal 代价：30 秒 traitor、relation penalty、攻击倍率。
6. 核武破盟 OR 决策图：weighted tiles `> 100` 或 allied structure。
7. 四个数字场景、反制与“等待自然到期”的替代路径。
8. 导向 alliances 规则页、nuclear deterrence 和 team roles。

# 五语保留术语

以下是母稿与本地化的编辑词表，不声称当前五语客户端逐字采用这些译法。页面首次出现时应保留英文 UI / 源码 token，并用本地语言解释；公式标识 `maxTroops` 不翻译。后文可以使用自然译名，但同一页不要在 ally、teammate 与 friendly 之间混用。

| EN token              | zh                     | fr                               | de                         | nl                          | 编辑规则                              |
| --------------------- | ---------------------- | -------------------------------- | -------------------------- | --------------------------- | ------------------------------------- |
| Troops                | 部队                   | troupes                          | Truppen                    | troepen                     | 首次保留 `Troops`；不是 workers       |
| Gold                  | 金币                   | or                               | Gold                       | goud                        | 数值与乘数保持一致                    |
| City                  | 城市                   | ville                            | Stadt                      | stad                        | 不写成直接治疗                        |
| Port                  | 港口                   | port                             | Hafen                      | haven                       | 与海上贸易语境绑定                    |
| Factory               | 工厂                   | usine                            | Fabrik                     | fabriek                     | 与 Train network 区分                 |
| Train                 | 火车                   | train                            | Zug                        | trein                       | 保留单位名大小写                      |
| Trade Ship            | 贸易船                 | navire marchand                  | Handelsschiff              | handelsschip                | 不与 Warship 混用                     |
| Warship               | 战舰                   | navire de guerre                 | Kriegsschiff               | oorlogsschip                | 保留单位名                            |
| Defense Post          | 防御哨所               | poste de défense                 | Verteidigungsposten        | verdedigingspost            | 首次保留英文单位名                    |
| SAM Launcher          | 防空导弹发射器         | lanceur SAM                      | SAM-Werfer                 | SAM-lanceerder              | `SAM` 不翻译                          |
| Missile Silo          | 导弹井                 | silo à missiles                  | Raketensilo                | raketsilo                   | 与 SAM Launcher 区分                  |
| Doomsday Clock        | 末日时钟               | horloge de l'apocalypse          | Weltuntergangsuhr          | doomsdayklok                | 首次保留完整英文名                    |
| alliance              | 联盟                   | alliance                         | Bündnis                    | alliantie                   | 限时外交状态，不等于 team             |
| ally                  | 盟友                   | allié                            | Verbündeter                | bondgenoot                  | 只用于 active alliance                |
| teammate              | 队友                   | coéquipier                       | Teammitglied               | teamgenoot                  | 只用于 same team                      |
| friendly              | 友方                   | joueur ami                       | verbündeter Spieler        | bevriende speler            | 上位集合：self / team / alliance      |
| embargo               | 禁运                   | embargo                          | Embargo                    | embargo                     | 任一方向均阻断贸易                    |
| temporary embargo     | 临时禁运               | embargo temporaire               | vorübergehendes Embargo    | tijdelijk embargo           | 与 manual embargo 分开                |
| traitor               | 叛徒                   | traître                          | Verräter                   | verrader                    | 状态名；不要泛化成道德判断            |
| betrayal              | 背叛                   | trahison                         | Verrat                     | verraad                     | 用于主动破盟语境                      |
| target                | 目标标记               | cible                            | Zielmarkierung             | doelmarkering               | 不翻译成共享视野                      |
| retreat               | 撤退                   | retraite                         | Rückzug                    | terugtrekking               | 按执行时剩余 Troops 计算              |
| donation              | 捐赠                   | don                              | Spende                     | donatie                     | Gold / Troops 共用 recipient cooldown |
| cooldown              | 冷却                   | délai de récupération            | Abklingzeit                | afkoeltijd                  | 时间单位必须五语一致                  |
| troop cap / maxTroops | 部队上限 / `maxTroops` | plafond de troupes / `maxTroops` | Truppenlimit / `maxTroops` | troepenlimiet / `maxTroops` | 公式标识不翻译                        |

# 写作与发布核验清单

## 三篇共同检查

- [ ] 直接答案为 40–80 words，并明确 `v0.33.7` 与最后核验日期。
- [ ] 每一组机制数值都链接到 v0.33.7 tag 源码或官方测试。
- [ ] 源码事实与编辑性建议使用不同标题、提示框或表格列。
- [ ] 至少两个带明确假设的数字场景；不把派生场景写成固定结果。
- [ ] en / zh / fr / de / nl 的版本、数字、公式、时间与否定边界一致。
- [ ] 所有源码链接是 `blob/v0.33.7`，不存在指向默认分支的源码链接。
- [ ] ally、teammate、friendly 不混用；Gold、Troops、maxTroops 大小写一致。
- [ ] 结尾导向相邻唯一主答案，不复制 first-match、alliances 或 economy 全文。

## Recovery 专项检查

- [ ] 撤退写成“执行时剩余 Troops 的 75%”，并披露 20 ticks 等待。
- [ ] Terra Nullius 和结盟后无 malus 撤回的例外已说明。
- [ ] City 只增加 maxTroops，不写直接治疗。
- [ ] Doomsday 的 FFA / Team 门槛、30 / 90 / 150 秒状态没有混淆。
- [ ] Team Doomsday 按全队合计，leader side exemption 没有写成固定玩家身份。
- [ ] 没有固定最佳持兵比例、恢复时间或翻盘保证。

## Team Roles 专项检查

- [ ] 角色明确标为编辑框架，不是游戏锁定职业。
- [ ] Public Team / FFA / ranked 1v1 / ranked 2v2 默认 donation 开关正确。
- [ ] Gold 与 Troop donation 的 10 秒共同 recipient cooldown 已说明。
- [ ] Troop headroom 和 sender 实际余额边界已说明。
- [ ] target 的 10 秒显示与 15 秒 cooldown 分开。
- [ ] 没有声称共享完整视野。
- [ ] ally 35,000 与 teammate / other 25,000 的 Train stop payout 未写反。

## Diplomacy 专项检查

- [ ] request 20 秒、同对象 cooldown 30 秒、默认 alliance 300 秒。
- [ ] extension 需要双方同意，且从续约 tick 重置完整 duration。
- [ ] natural expiry 与 manual break 分开；只有后者在条件满足时制造 traitor。
- [ ] temporary embargo 约 5 分钟、manual embargo persistent。
- [ ] 接受 alliance 只清除 temporary embargo。
- [ ] traitor 的 30 秒、`-100` / `-40` relation、`0.5` / `0.8` 修正没有扩写成胜率。
- [ ] 核武破盟写成 weighted tiles `> 100` **或** allied structure。
- [ ] MIRVWarhead 的局部分支没有扩写成整个 MIRV 永不破盟。
- [ ] 没有声称 teammate 对核伤免疫。

# 一手来源索引

## 正式版本

- [v0.33.7 Release][release-337]
- [v0.33.7 tag ref][tag-ref-337]
- [提取 checkout 到 v0.33.7 的正式比较][compare-extract-337]

## Recovery

- 默认攻击、增长、Gold 与 Doomsday 配置：[Config.ts][src-config]
- 每 tick 自然增长、临时禁运入口：[PlayerExecution.ts][src-player-execution]
- 攻击派兵与 friendly / alliance 分支：[AttackExecution.ts][src-attack-exec]
- 撤退等待、25% malus 与返回兵力：[RetreatExecution.ts][src-retreat]
- 攻击 Troops 与反向攻击抵消：[AttackImpl.ts][src-attack]
- Doomsday 门槛状态：[DoomsdayClock.ts][src-doomsday]
- Doomsday warning、drain、floor、rot 与 clear：[DoomsdayClockExecution.ts][src-doomsday-exec]
- 官方边界测试：[Attack.test.ts][test-attack]、[DoomsdayClockExecution.test.ts][test-doomsday]

## Team Roles

- friendly、donation 记录、troop cap 与 canTrade：[PlayerImpl.ts][src-player]
- Gold donation：[DonateGoldExecution.ts][src-donate-gold]
- Troop donation：[DonateTroopExecution.ts][src-donate-troop]
- Public playlist 默认开关：[MapPlaylist.ts][src-map-playlist]
- target 时长与 cooldown：[TargetPlayerExecution.ts][src-target]
- ally / teammate marker 展示：[PlayerView.ts][src-player-view]
- Train stop payout：[TrainStation.ts][src-train-station]
- 官方边界测试：[Donate.test.ts][test-donate]、[AllianceDonation.test.ts][test-alliance-donation]、[Team.test.ts][test-team]

## Diplomacy & Betrayal

- 请求、counter-request 与接受：[AllianceRequestExecution.ts][src-alliance-request]
- 请求对象与请求窗口：[AllianceRequestImpl.ts][src-alliance-request-impl]
- 请求拒绝：[AllianceRejectExecution.ts][src-alliance-reject]
- 双向续约：[AllianceExtensionExecution.ts][src-alliance-extension]
- alliance duration 与自然到期：[AllianceImpl.ts][src-alliance]
- 手动破盟、traitor 与 relation：[BreakAllianceExecution.ts][src-break-alliance]
- embargo：[EmbargoExecution.ts][src-embargo]、[EmbargoAllExecution.ts][src-embargo-all]
- 接受 alliance 时清除 temporary embargo / 在途核弹：[GameImpl.ts][src-game]
- traitor 战斗修正：[execution Util.ts][src-execution-util]
- 核武破盟阈值与 MIRVWarhead 边界：[NukeExecution.ts][src-nuke-exec]
- 官方边界测试：[AllianceRequestExecution.test.ts][test-alliance-request]、[AllianceExtensionExecution.test.ts][test-alliance-extension]、[CustomAllianceDuration.test.ts][test-custom-alliance]、[AllianceAcceptNukes.test.ts][test-alliance-nukes]、[NukeExecution.test.ts][test-nuke]

# 研究过程备注

- 本地 OpenFrontIO clone 没有 `v0.33.7` tag/object，`git rev-parse v0.33.7` 因此失败。根因是本地 clone 的 tag/object 不完整，而不是正式 Release 不存在；研究改用 GitHub 官方 tag API 与 Contents API 固定读取 v0.33.7。
- 并行读取 `raw.githubusercontent.com` 时远端重置连接。恢复方式是降低并发，并使用 GitHub Contents API；最终引用仍指向公开的 v0.33.7 permalink。
- 一次按猜测读取不存在的 `tests/TargetPlayerExecution.test.ts` 返回路径错误。恢复方式是先用 `rg --files` 确认真实文件；target 的执行事实来自 `TargetPlayerExecution.ts`，展示合并事实来自 `PlayerView.ts`。
- 首次 `pnpm exec prettier --check` 报告新文件未格式化。根因是内容刚由分批 patch 生成；运行项目既有 Prettier 写入后，复检通过。
- 以上失败没有修改页面、索引、配置或生成数据；本轮唯一写入是本来源包。

[release-337]: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7
[tag-ref-337]: https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.33.7
[compare-extract-337]: https://github.com/openfrontio/OpenFrontIO/compare/0668045fa926eaa6d6995561a8e13fd8126895b6...v0.33.7
[src-config]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/configuration/Config.ts
[src-player-execution]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/PlayerExecution.ts
[src-attack-exec]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/AttackExecution.ts
[src-retreat]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/RetreatExecution.ts
[src-attack]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/AttackImpl.ts
[src-doomsday]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/DoomsdayClock.ts
[src-doomsday-exec]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/DoomsdayClockExecution.ts
[src-player]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/PlayerImpl.ts
[src-donate-gold]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/DonateGoldExecution.ts
[src-donate-troop]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/DonateTroopExecution.ts
[src-map-playlist]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/server/MapPlaylist.ts
[src-target]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/TargetPlayerExecution.ts
[src-player-view]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/client/view/PlayerView.ts
[src-train-station]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/TrainStation.ts
[src-alliance-request]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/alliance/AllianceRequestExecution.ts
[src-alliance-request-impl]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/AllianceRequestImpl.ts
[src-alliance-reject]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/alliance/AllianceRejectExecution.ts
[src-alliance-extension]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/alliance/AllianceExtensionExecution.ts
[src-alliance]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/AllianceImpl.ts
[src-break-alliance]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/alliance/BreakAllianceExecution.ts
[src-embargo]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/EmbargoExecution.ts
[src-embargo-all]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/EmbargoAllExecution.ts
[src-game]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/GameImpl.ts
[src-execution-util]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/Util.ts
[src-nuke-exec]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/NukeExecution.ts
[test-attack]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/Attack.test.ts
[test-doomsday]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/DoomsdayClockExecution.test.ts
[test-donate]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/Donate.test.ts
[test-alliance-donation]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/AllianceDonation.test.ts
[test-team]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/Team.test.ts
[test-alliance-request]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/AllianceRequestExecution.test.ts
[test-alliance-extension]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/AllianceExtensionExecution.test.ts
[test-custom-alliance]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/CustomAllianceDuration.test.ts
[test-alliance-nukes]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/AllianceAcceptNukes.test.ts
[test-nuke]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/tests/core/executions/NukeExecution.test.ts

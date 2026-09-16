# 2026-09-16 下一轮社区选题 Scout：Ranked 1v1

研究日期：2026-09-16（Asia/Vladivostok）
候选路由：`/guides/ranked-1v1/`
候选状态：**建议批准进入 Production**
来源门槛：3 个 Reddit 讨论、3 个 YouTube 视频/可核验字幕、v0.34.3 官方 Release 与固定 tag 源码已实际打开并分析。

## 唯一玩家问题

**Ranked 1v1 与公开 FFA 不是同一套开局：玩家怎样从合法出生点、可争夺的 Bot/海岸、对手的下一条路线和 10/15 分钟计时器出发，决定下一笔 Gold、军力、City、Defense Post、Boat 或核压力，并在失去目标后停止原分支？**

这不是“怎样赢所有模式”的重写，也不是把一个创作者的 40% Troops 或“三座 City”脚本写成定律。它是一个二人对局的运营闭环：出生几何决定双方可获得的 Bot 与海岸；对手的占位会改变可行路线；短计时器让等待本身成为成本；最后必须把领先的土地、容量或核压力转成胜利，而不是把 FFA 的外交、第三方和 Overtime 假设带进来。

## 为什么不是重复页面

现有页面的职责边界已经清楚：

- `first-match` 负责跨模式新手的出生和前五分钟，不负责 Ranked 的二人路线封锁和结束时钟。
- `land-combat` 负责已接触边境的兵力、地形、Defense Post、反推和撤退；不负责在出生阶段选择哪一块 Bot 或何时把经济转成终局。
- `adaptive-build-order` 负责一般地图上下一笔 Gold 的条件化分配；不负责 Ranked 的固定玩家数、地图轮换、短计时器和对手专属否定。
- `winning-overtime` 负责公开 FFA 的 Overtime 领土门槛；Ranked 1v1 应先读取该模式的 `maxTimerValue` 和胜利检查，不能把公共 FFA 的阈值下降写进本页。
- `replay-review` 负责赛后公开 profile/history、证据标签和单变量复盘；Ranked 1v1 页面负责当局实时决策，可链接复盘页但不替代它。

完成定义应是：读者能把出生标成 `open`、`contested` 或 `cut off`，写出第一条有截止时间的扩张路线，保留可命名的 Troop/Gold 余量，识别当前 Ranked 时钟，并为 City、Port、Factory、Silo、Boat 或攻击分支写出停止信号。

## 社区来源（已实际打开）

Reddit 与 YouTube 只证明需求、玩家语言和实战情境；所有数值和模式规则回到官方 Release/tag。访问日期均为 2026-09-16。

### Reddit

1. **1v1 is a completely different game and I love it.**
   URL：[Reddit permalink](https://www.reddit.com/r/Openfront/comments/1qmauy4/1v1_is_a_completely_different_game_and_i_love_it/)；发布于 2026-01-25。作者把 1v1 描述成没有外交第三方的简化 RTS，讨论出生位置、五秒开局停战、Bot 包围、限制对手扩张、Boat 绕后和后期城市狙击，并提到约 40% Troops 的个人经验。可用观察是“否定对手下一选项”而非“最大化己方土地”；局限是旧版本个人估计，不能证明 40%、三座 City、Silo 回本或当前胜利条件。

2. **1v1 ranked.**
   URL：[Reddit permalink](https://www.reddit.com/r/Openfront/comments/1qpb6en/1v1_ranked/)；发布于 2026-01-28。原帖询问 Ranked 体验并报告 1850 Elo；回复讨论 1750/1815/2000 等个人分数、连续 5% Boat 压力、约十分钟的短局和希望加入 Nations。可用观察是小额重复压力会消耗注意力，且短时限本身改变决策；局限是个人分数和“八分钟/十分钟”不能推出匹配区间、Elo 算法或当前统一计时。

3. **Is th ranked 1v1 full of sweats or do I suck?**
   URL：[Reddit permalink](https://www.reddit.com/r/Openfront/comments/1ukgv5f/is_th_ranked_1v1_full_of_sweats_or_do_i_suck/)；发布于 2026-07-01。作者能在公开大厅生存，却在 Ranked 中因对手 Gold 领先和核交换反复失败；回复建议提供 replay，追溯第一个失去的路线或资源假设。可用观察是玩家把终局核交换误认为独立问题，而真正需要的是开局到终局的可证伪复盘；局限是没有 replay、地图、Gold 或核配置，不能说明对手作弊或存在隐藏倍率。

### YouTube

1. **How to win Ranked 1v1 matches | OpenFront.io**（deshack，2026-09-01，22:58）。
   URL：[YouTube](https://www.youtube.com/watch?v=BfPJf9WK3NM)。英文自动字幕已导出并按时间读取：00:06 Australia Ranked；00:53 出生在两个 Bot 之间；01:36 首座 City；02:38 明说 Ranked；05:27 Defense Post；10:49 Boat 登陆；后段切到 Europe Classic。可用观察是 Bot 入口、City/容量、Defense 和 Boat 是同一条时钟上的选择；局限是单个创作者的现场决策，不能把“三座 City 后 Silo”当成规则。

2. **Can I Win This 1v1 Ranked? | OpenFront.io**（deshack，2026-01-30，39:38）。
   URL：[YouTube](https://www.youtube.com/watch?v=9yjK24XA1vA)。英文自动字幕已导出并按时间读取：00:00 Australia 1v1；00:18 报告约 1615 Elo；01:59 Bot/City；02:27 Boat；05:21 大规模 Boat；05:31 Defense Post；06:53 剩余约 3.5 分钟；13:47 等待 Troops 后再推；14:05 穿过 Defense Posts。可用观察是落后时用容量、海岸和等待重建路线，领先时也要给终局留下时间；局限是有“对手可能 AFK”的现场判断，字幕会错写单位和地名，不支持固定收益或胜率。

3. **【OpenFront】アプデでランクマッチが実装！ ELOレートを競い合う日々が始まる！？**（MizuUmiAoE，2026-01-20，12:49）。
   URL：[YouTube](https://www.youtube.com/watch?v=1_xPnpZAdZg)。日语自动字幕已导出并翻译核读：00:00 Ranked alpha；00:16 初始 Elo 1500；00:25 Italy；00:40 出生选择；00:52 Bot；02:43 看到 10 分钟倒计时；03:10 Factory；05:27 比较理想出生；07:04/07:08 讨论 250k 与 Factory。可用观察是早期版本已经暴露“地图/出生、Bot、City/Factory、10 分钟终局”这一组玩家决策；局限是早期 Ranked 实现且非中文/英文字幕，不能证明 v0.34.3 的地图权重、时钟或胜利合同。

## v0.34.3 官方事实边界

当前公开版本锚点是 [OpenFront v0.34.3 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.3)，发布于 2026-09-15，tag commit 为 `222e4078982e6c21c620a69c82de0392c17385bf`。Release 说明修复 Ranked matchmaking bugs；v0.34.2 的上一条说明把普通有防守方攻击的速度项提高约 10%。这些版本事实不能外推成“每局都快 10%”或“Ranked 有固定最佳脚本”。

Ranked 1v1 的可核验配置来自固定 tag：

- [`MapPlaylist.get1v1Config`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/server/MapPlaylist.ts#L489-L517) 使用 Australia（列表中两次，约 40%）、Iceland、Asia、EuropeClassic（各约 20%）；`maxPlayers=2`、`rankedType=OneVOne`、`gameMode=FFA`、Nations disabled、`randomSpawn=false`、`spawnImmunityDuration=30*10` ticks，Bot 数为 Compact 100 / Normal 400，Compact 概率为 20%，`maxTimerValue` 为 Compact 10 分钟、Normal 15 分钟。
- [`RankedCheckin`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/server/RankedCheckin.ts#L27-L46) 明确队列模式只有 `1v1` 与 `2v2`，匹配分配后给玩家 15,000 ms 的连接/开局截止窗口；该 15 秒不是对局计时器，也不能写成“Ranked 只有 15 秒”。
- [`RankedModal`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/client/components/RankedModal.ts#L60-L73) 将个人 ELO 分开显示为 `oneVone` 与 `twoVtwo`；[`resources/lang/en.json`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/resources/lang/en.json) 的 Ranked 文案标注 ALPHA、要求登录、显示 queue size，并提示免费 Ranked 场次按日补充。UI 文案说明玩家入口，不足以推出配对算法或付费细则。
- [`Matchmaking.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/client/Matchmaking.ts#L271-L318) 显示队列按 `mode`、页面 build commit 和 site 分区，并在匹配后按服务器版本打开游戏；这解释了版本不一致或队列断线的用户症状，但不公开 ELO 匹配窗口。
- [`Schemas.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/Schemas.ts#L478-L541) 规定 `rankedType` 只在 Ranked 游戏配置中出现；地图、计时、FFA/Team、Nations 和单位设置仍需回到具体 `GameConfig`，不能从视频标题推断。

官方源码与测试支持写入 guide 的配置事实，但不支持以下断言：Elo 计算公式、匹配搜索半径、隐藏信任/反作弊阈值、固定的 40% Troops、固定的三座 City/一座 Silo、每张地图的永远最佳出生点、某个创作者的胜率，或把 10/15 分钟之外的个人“约十分钟”报告写成统一规则。

## 生产建议与下一门槛

**建议批准 `/guides/ranked-1v1/` 进入本轮 Production。** 它有独立入口和清晰完成定义，社区来源跨语言、跨创作者地重复出现相同决策：出生几何、Bot/海岸的否定、短时钟下的 City/Defense/Boat 分叉，以及核交换前的经济假设。它不会复制 `adaptive-build-order`，因为 Ranked 页从二人地图和结束时钟开始；也不会复制 `replay-review`，因为主要答案是当局实时动作。

母稿必须完成以下门槛后才算交付：

1. 以 v0.34.3 tag 的 Ranked config、spawn、WinCheck、attack/build 代码为事实边界，逐项标注视频/Reddit 的旧版本局限。
2. 至少给出两个可核验场景：Compact 10 分钟与 Normal 15 分钟各一个，分别说明出生、Bot/海岸、容量/防御、最后提交窗口和停止信号。
3. 明确失败与反制：被对手切断 Bot、5% Boat 反复骚扰、错误投资 Factory/Port、过早 Silo、低 Troops 进入终局、以及版本/队列不一致。
4. 五语正文保持同一数字与结论，英文达到长文计划的 2000 词门槛；自然入口只链接已有的 first-match、land-combat、adaptive-build-order、winning-overtime 与 replay-review。

本轮的 trusted-lobby 线索（“Trusted accounts - what are they and why”“pissed”“Unlock icon”）不作为下一篇：虽然 v0.34.3 有锁图标和公开队列轮换，但信任阈值未公开，玩家页更接近政策/访问 FAQ，不如 Ranked 1v1 形成可执行的战局决策。它保留为 Monitoring 信号，不应扩成反作弊政策页。

## 来源清单

- 社区：3 Reddit + 3 YouTube（上文逐项记录 URL、日期、问题、观察、局限和访问日期）。
- 官方：v0.34.3 Release、`MapPlaylist.ts`、`RankedCheckin.ts`、`RankedModal.ts`、`Matchmaking.ts`、`Schemas.ts`、`resources/lang/en.json`，以及相关 Ranked matchmaking/queue tests。
- 关联研究文件：[`2026-09-16-ranked-1v1-community-source-pack.md`](2026-09-16-ranked-1v1-community-source-pack.md)。

结论：**来源门槛已满足，Ranked 1v1 是本轮唯一建议晋级的社区候选；下一步是完成五语 guide 和固定 tag 的 WinCheck/Spawn/Attack 事实核验，而不是继续扩大候选扫描。**

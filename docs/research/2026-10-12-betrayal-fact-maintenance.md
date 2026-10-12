# 背叛反应主答案事实维护（2026-10-12）

## 任务与搜索口径

本轮类型为既有五语主答案事实维护，不新增独立页面。玩家任务是在盟友解盟后的短暂惩罚窗口内，判断是否反攻、止损或接受对方让出的土地；维护重点是避免把惩罚对象、战斗公式、贸易条件和团队胜利条件说错。

固定词簇为 `reacting to ally betrayal` / `how to counter traitor`。搜索数据口径为 schemaVersion 2、`byProperty`、final/web，窗口为 2026-09-12 至 2026-10-09。词簇需求目前未知，不能解释为零需求。`queryPage` 只用于 `byPage` 落地页诊断，不求和重建词簇排名，不使用通用 CTR 曲线估算收益。已有主答案可以承接本次事实修正，因此不需要新增独立页。

唯一主答案路由：

- https://openfront.fyi/guides/reacting-to-ally-betrayal/
- https://openfront.fyi/zh/guides/reacting-to-ally-betrayal/
- https://openfront.fyi/fr/guides/reacting-to-ally-betrayal/
- https://openfront.fyi/de/guides/reacting-to-ally-betrayal/
- https://openfront.fyi/nl/guides/reacting-to-ally-betrayal/

保留相邻文章入口：`alliance-break-timing`、`diplomacy-betrayal`、`recovery-playbook`；德语另保留 `afk-teammate-takeover`。本轮不把尚未交付的本地维护当作线上结果。

## 版本边界与访问方法

事实核验日期为 2026-10-12。唯一源码版本为官方仓库 `openfrontio/OpenFrontIO` 的 `v0.34.24`，tag 日期 2026-10-06，commit `3f5633b92c9508461e6e2b9e1f926487a1804c9f`。通过本地缓存 clone 的 `git show v0.34.24:<path>` 实际读取源码。下列链接指向同一个官方 tag；本报告没有以 upstream main 代替发布版本。

GitHub 网页读取未获得可用正文，因此本报告不声称已读过正式 Release 正文，也不生成版本笔记。正式 Release 是否包含可用发布说明由本轮主任务 Gate 另行核验。本次维护只改变已经由 tag 源码确认的具体事实。

历史社区包为 [2026-10-11-reacting-to-ally-betrayal-community-source-pack.md](./2026-10-11-reacting-to-ally-betrayal-community-source-pack.md)。它提供玩家情境，不能替代数字与机制的官方证据；其中对战斗损失方向及旧攻击/接受联盟竞争行为的解释，不能不加版本核验地沿用。本轮不重复采集社区材料。

## 已确认事实与正文措辞

| 事实 | 可交付边界与应修正表述 | 官方源码 |
| --- | --- | --- |
| traitor 持续时间 | 默认 30 秒；只对仍有 traitor 剩余 ticks 的防守方应用相关系数。 | [Config.ts:287](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts#L287)、[PlayerImpl.ts:851](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/PlayerImpl.ts#L851) |
| 战斗损失方向 | 攻击 traitor 时攻击者的损失乘以 0.5；不能写 traitor 防守者损失减半，也不能把整场战斗成本机械等同于任何固定百分比。 | [Config.ts:933](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts#L933) |
| 推进时间 | 对 traitor 每格推进的 tick 成本系数为 0.8；不是船只航速增加 20%，也不是所有动作提速。 | [Config.ts:287](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts#L287)、[Config.ts:933](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts#L933) |
| 优惠不会被发令锁定 | 每格结算读取当前防守者是否 traitor；在 30 秒内发起的攻击不会永久保留优惠。 | [AttackExecution.ts:323](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/AttackExecution.ts#L323) |
| 谁被标记 | 解盟对象既非 traitor 又未断线时，breaker 才被标记；对已经是 traitor 或断线对象解盟不触发同一标记条件。 | [GameImpl.ts:836](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/GameImpl.ts#L836) |
| 联盟与队伍 | 解盟删除联盟关系，不会把成员移出 team；不能把临时联盟解散等同于队伍身份改变。 | [GameImpl.ts:836](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/GameImpl.ts#L836) |
| 关系下降 | 被解盟者对 breaker 的关系减 100；breaker 附近符合条件的玩家对 breaker 减 40，排除与被解盟者同队的玩家。关系修改为 delta 后 clamp 到 [-100,100]，不是直接设置绝对值或自动双向修改。 | [BreakAllianceExecution.ts:38](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/alliance/BreakAllianceExecution.ts#L38)、[PlayerImpl.ts:951](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/PlayerImpl.ts#L951) |
| 临时禁运触发 | 解盟函数本身不创建禁运。攻击初始化时双方均非 Bot，target 对 attacker 添加临时禁运；因此“解盟即自动冻结贸易”过度概括。攻击同盟或同队玩家在更早的 friendly 检查被拒绝。 | [AttackExecution.ts:85](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/AttackExecution.ts#L85)、[GameImpl.ts:836](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/GameImpl.ts#L836) |
| 禁运期限与方向 | 默认临时禁运 3000 ticks，即约五分钟；过期检查使用严格大于 duration。任一方向禁运即可阻断交易。重复添加临时禁运可刷新其起点，永久禁运不被临时禁运覆盖。 | [Config.ts:813](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts#L813)、[PlayerExecution.ts:100](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/PlayerExecution.ts#L100)、[PlayerImpl.ts:1210](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/PlayerImpl.ts#L1210) |
| 重结盟与贸易 | 互相发送请求的接受路径使双方关系各加 100，并结束双方临时禁运；永久禁运保留。`GameImpl.acceptAllianceRequest` 本身仅建立联盟，所以不要把特定执行路径扩大为“任何重结盟都自动解除禁运并把关系设置为 100”。 | [AllianceRequestExecution.ts:43](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/alliance/AllianceRequestExecution.ts#L43)、[GameImpl.ts:401](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/GameImpl.ts#L401)、[PlayerImpl.ts:1250](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/PlayerImpl.ts#L1250) |
| 捐赠不等于贸易 | 捐赠资格检查存活、friendly、非自身、主机设置和冷却等条件，没有直接 embargo 判断；不能写禁运会冻结所有经济和所有捐赠。 | [PlayerImpl.ts:1067](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/PlayerImpl.ts#L1067) |
| AI 并非全图集火 | AI 通常拒绝 traitor 联盟，但有 confused 与随机例外；非 Easy AI 对已结盟 traitor 的特定检查路径还看双方兵力，不能泛写所有 AI 自动围攻。 | [NationAllianceBehavior.ts:89](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/nation/NationAllianceBehavior.ts#L89)、[NationAllianceBehavior.ts:374](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/nation/NationAllianceBehavior.ts#L374) |
| 红色警示边框 | 当前玩家是被背叛者且启用 alertFrame 设置时才激活；不是所有玩家都必然看到的独立证据。 | [AlertFrame.ts:122](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/client/hud/layers/AlertFrame.ts#L122) |
| 联盟时限 | 默认联盟五分钟，主机配置可改变；不要写为所有房间的不可变规则。 | [Config.ts:813](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts#L813) |
| 胜利门槛 | 普通领土胜利默认严格超过 80%，分母排除 fallout 土地；配置、加时、时间上限及 ranked 特殊判定使其不能泛化为所有模式。70% 涉及断线成员胜利资格，不是 Team 模式领土门槛。 | [Config.ts:255](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts#L255)、[Config.ts:827](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts#L827)、[WinCheckExecution.ts:115](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/WinCheckExecution.ts#L115)、[GameImpl.ts:997](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/GameImpl.ts#L997) |

以上事实只说明反攻时的机制优势，不保证反攻有利。玩家仍需比较可投入兵力、接触面、地形、第三方风险以及占地后的恢复能力。游戏使用玩家兵池；不能写成把逐块土地的驻军搬运到边境。正文应保留可操作的判断，例如降低外向进攻投入、保留兵力和控制攻击规模。

## 维护验收

本轮验收要求五语对惩罚对象、损失方向、每格时间、禁运触发、关系增量、AI 条件及队伍身份表达一致。保留一个主答案及相关互链，不新增复制意图的页面，不伪造 SEO 版本核验日期，不在玩家正文中加入研究或审计元话语。

维护任务不适用新增长文的至少 3 个 Reddit、3 个 YouTube、每语 1500 词要求。本报告不把历史社区包的条目数当作本轮新采集数量。项目每个正文 `##` / `###` 小节至少 401 words 的要求仍由本轮主任务检查；删除错误段落后的字数也需重审。

主任务负责五语交付审计、`pnpm content:audit`、`pnpm check`、生产构建、`pnpm check:links`、`pnpm seo:audit`、`git diff --check`，并按实际入口交互变化决定 e2e。研究文件完成不代表正文已通过这些检查，也不代表已提交或部署。发布后才按计划进入 Monitoring，以实际部署日 T 确定后续完整 final 数据窗口。

## 命令恢复记录

两次 `git show` 读取失败的原因均为猜测 tag 内目录：`AlertFrame.ts` 实际位于 `src/client/hud/layers/`，`AllianceRequestExecution.ts` 实际位于 `src/core/execution/alliance/`。已用 `git ls-tree -r --name-only v0.34.24` 定位真实路径，再读取成功；无证据遗失，没有修改 AGENTS.md。主任务交接时应把此次明确复发记录合并到适用 runbook，不添加新的全局规则。

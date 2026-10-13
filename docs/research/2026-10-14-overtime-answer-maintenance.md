# Overtime 主答案事实维护

访问与核验日期：2026-10-14，Asia/Vladivostok。任务类型：既有答案维护，五语同步，不新增独立页面。

## 玩家任务与唯一答案

- 词簇：OpenFront Overtime、what is overtime in OpenFront、Overtime OpenFront。
- 玩家任务：确认这一局是否会降低胜利门槛，以及如何在下一次下降前守住领先或阻止第一名。
- 唯一主答案：`/guides/winning-overtime/` 及五语版本。`doomsday-vs-overtime` 负责比较两个修正器，不承接完整 Overtime 终局策略。
- 数据窗口：2026-10-05 至 2026-10-11，web/final，schemaVersion 2，站点属性 `sc-domain:openfront.fyi`。query 指标直接来自 byProperty，queryPage/byPage 仅诊断落地。数据覆盖所有国家和设备，未用于编辑因果判断。
- 当前落地：既有 Overtime 主攻略和模式比较页均有词簇信号。样本很小，不预测 CTR 收益，不累加页面行重建查询排名。词级明细只保存在 automation cache。
- 缺口：主攻略仍使用 v0.33.11 的 25% 随机启用说明，误导玩家用大厅徽标判断默认规则；自定义 Team 门槛仍写 95%；两人示例的领土占比合计 120%。
- 自然入口：已有 Strategies 终局链接、Guides 目录和首页最新攻略。真实事实核验日期更新会自动更新后两者的排序，不增加重复答案。

## 官方来源与事实边界

| 一手来源 | 核验内容 | 局限 |
| --- | --- | --- |
| https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.25 | 2026-10-13T12:39:31Z 发布，非 draft、非 prerelease；tag 指向 `dfd9e478b64d92fa25f95597b8cb81d8adee004d` | 当次新增是 Steam 权益、广告和音乐修复；不把此前机制当成本次新增 |
| https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/server/MapPlaylist.ts | 普通公开配置的 FFA 设置 `overtime.enabled=true`；注释明确默认启用、不展示独立 lobby badge | Team 和 Special 不自动套用普通 FFA 默认；不推断 Ranked 配置 |
| https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/core/configuration/Config.ts | 基础门槛为 80；默认开始 30 分钟；每分钟降低 2 点，按每 30 秒整点下降；最低为 0 | 自定义开始时间按具体房间设置，不把默认时间强加给所有房间 |
| https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/core/execution/WinCheckExecution.ts | FFA 和 Team 使用同一 `hasWon`；Team 先合计领土；非 fallout 陆地分母；严格大于比较 | 不修改 Ranked 淘汰规则或早于 Overtime 的独立计时器 |
| https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/client/components/OvertimePanel.ts | 面板在设定开始时间前隐藏，领先占比显示整数下取整 | 面板整数不证明精确小数已越线 |

来源通过 GitHub REST 的 Release、tag/ref 和 Contents API 实际读取，数字由对应 tag 核验。示例修为 60.2% 与 39.8%，两人合计 100%；39:30 的 61% 与 40:00 的 60% 门槛不变。

独立游标：上游 main 为 `c6cc59986e84936087457dba24c368df6ee78f25`。Release 列表还包含名为 `v0.35.0-beta1` 的 beta tag，指向 `ab5cc6115080f19b4e65b43fbfd396aaf6150e4f`，发布时间为 2026-10-13T15:27:33Z，API 的 prerelease 字段为 false。保留这一元数据差异，不把 beta 名称或 main 提交当作本次 v34 稳定玩法依据。

## 验收与后续状态

五语同步默认启用、无独立徽标、Team 80%、示例占比、来源与真实核验日期。保留未改变的 30:00 起点、30 秒步进、严格大于和 fallout 分母；不泛化到 Ranked。运行内容审计、Astro 检查、生产构建、内部链接、SEO 基线对照、渲染事实检查、入口 e2e 和 diff 检查。

这是维护任务，新长文的 1500 词、3 Reddit + 3 YouTube 及研究词数配额不适用；不为凑数扩写既有小节。本次发布即完成事实维护并回到 Monitoring。只有正式规则变化、事实错误或完整 GSC final 观察窗口触发下一次编辑。

# v36.4 正式维护：建造倍率开关与联盟续期

核验日：2026-11-19，UTC+10。类型：正式 Release 响应及既有答案维护。没有新增长文；新 guide 的五语各 1500 词、3 Reddit + 3 YouTube 配额不适用。本轮只核验所改事实，不把旧版数值与设置全部重新认证。

## 玩家任务、缺口与唯一答案

- 词簇：OpenFront v36.4、release notes、build hotkey multiplier、stop cycling build amount、alliance renewal。
- 玩家任务：确认本次补丁改变什么；选择重复建造键是否增加数量；辨认需要本人确认的联盟续期。
- 现有落地：五语 `/changelog/v36/` 是系列唯一版本主答案；五语 `/shortcuts/` 是查键及建造输入的速查主答案。不为同一补丁新建独立页面。
- 缺口：本轮开始时最新配置为 v0.36.3，版本页和首页没有 .4 增量；快捷键速查将重复按键循环写成无设置条件的操作。
- 需求类型与数据：正式 Release 响应，不依赖流量证明需求，不预测 CTR 或收益。GSC 本周到期刷新成功，schemaVersion 2、web/final，窗口为 2026-10-20 至 2026-11-16，生成时间为 2026-11-18T23:04:11Z；私有词级指标仅保存在外部 cache/manifest。站点和 query 采用 byProperty，queryPage 仅作 byPage 落地诊断，锚点单列。本周维护尚未满各自完整 28 天窗口，不能提前归因或评价成效。缺失或陈旧的数据是未知，不是零需求。
- 自然入口：既有首页最新版本、优先阅读卡、版本索引、导航中的快捷键入口，以及版本页至快捷键速查的本语链接。
- 验收定义：五语直答、本次六项变化、设置条件、旧版边界及官方来源一致；首页当前版本及入口同步；速查保留原表格和其他键位；生成数据精确不变；完成版本、内容、类型、构建、链接、真实渲染、SEO 差异及所需浏览器回归。

## 正式来源与事实矩阵

主依据为 [官方 v0.36.4 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4)，`draft=false`、`prerelease=false`，不是 TEST 占位。API `published_at=2026-11-18T21:03:09Z`，正文标 November 18, 2026；本地访问日在次日，不能把本地日期写成正式发布时间。tag 为轻量 commit 引用，指向 `dd85bcfb8b20e599fae15298bf56db1e92947f61`。

正式正文含 .4 及 .3/.2/.1/.0 累积内容。.3 的公开自建房间任意地图最多 500 人继续保留；.4 没有宣布新的容量、战斗伤害、联盟时长或评分算法。upstream main 作为独立监测游标，不替代正式 tag；运行身份、双游标及远端交付证据保存在外部 manifest。

| .4 正式变化 | 可交付事实及边界 | 主来源 |
| --- | --- | --- |
| Gameplay 设置可阻止重复建造热键循环倍率 | 英文名 `Cycle Build Multiplier on Hotkey`，默认开启；关闭影响重复热键循环，不表示所有批量输入失效 | [Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4)、[英文文案](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/resources/lang/en.json)、[设置存储](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/src/client/UserSettings.ts) |
| 联盟延长请求只在续期提示期间有效 | 不能由盟友提前发送请求而替本人默许后续续期；不推导新的联盟期限或外交能力 | [Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4)、[联盟执行逻辑](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/packages/engine/src/execution/alliance/AllianceExtensionExecution.ts) |
| World 10000 等巨图长局多次水上核爆后的崩溃修复 | 特定稳定性修复，不是伤害、陆地转移、手机适用性或帧率承诺 | [Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4) |
| 关闭通知或打开版本笔记时私人大厅误弹 leave lobby 提示修复 | 改善误提示，不代表真正离开大厅不再确认，不改变公开列出资格 | [Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4) |
| 排行榜接近底部时闪烁及本人重复行修复 | 显示修复，不宣布重复计分、奖励或排名算法变化 | [Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4) |
| Terms of Service 与 Privacy Policy 覆盖 clan fund sends | 只陈述正式政策覆盖，不从补丁说明推导法律解释、转账限额、退款或新权限 | [Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4) |

设置实现另由 [UserSettingModal](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/src/client/UserSettingModal.ts) 与 [InputHandler](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/src/client/InputHandler.ts) 核验：关闭开关时，若已有 UI state，当前 `upgradeMultiplier` 重置为 1；`GUIclick` 和 `hotkey` 循环分支检查开关，`increase` / `decrease` 滚轮分支不依赖开关，仍按 1 调整。玩家文案因此应区分“关闭重复热键循环”和“禁止任何批量数量”。没有必要在正文密集引用源码。

本轮正式事实使用上述固定 tag，而不把 upstream main 的开发状态写成发布承诺。结构化快照及 Footer 继续保留自身提取版本，不运行无关 extract。

## English Evidence Notes

The official release owns the six patch claims in this maintenance. Its metadata marks it as neither a draft nor a prerelease, and its first section has substantive player facing notes rather than a TEST placeholder. The exact publication timestamp is November 18 at 21:03:09 UTC. This research was accessed on November 19 in the local timezone. Those dates describe different events and are retained separately. The release tag resolves directly to commit dd85bcfb8b20e599fae15298bf56db1e92947f61. The fixed tag is used for implementation details, while the independently monitored main branch is not treated as a substitute for released behavior.

The build control is the most actionable change for the shortcut answer. The official release says that a Gameplay setting can stop repeated build hotkey presses from cycling the multiplier. The English localization file supplies the visible label, Cycle Build Multiplier on Hotkey. UserSettings reads its stored boolean with a default value of true. Existing users who have not changed the preference therefore retain the familiar repeated key behavior. The site should not describe the patch as removing quantity cycling globally or changing everyone's default controls. Instead, the existing quantity sequence remains useful when the setting is enabled, and the new sentence explains how players can opt out.

The settings modal provides an additional distinction that matters when explaining accidental large orders. Turning the preference off resets the current multiplier to one when an active UI state is available. This avoids leaving an already selected large amount solely because the hotkey cycle has been disabled. However, that action is not a permanent lock to a single item. InputHandler checks the preference in the GUIclick and hotkey cases of the multiplier selection logic. The increase and decrease cases are separate and still adjust the value by one, with the existing maximum and minimum clamps. The established Alt and scroll workflow can therefore remain in the shortcut reference. It would be inaccurate to tell players that disabling this preference disables all batch construction or every method of changing quantity.

The alliance fix concerns consent during a renewal window. The release explicitly says that an extension request only counts while the prompt is showing. The execution code returns before registering a request when the alliance expiration is farther away than the configured prompt offset. That supports a concise player instruction: respond to the current renewal prompt instead of treating an earlier or repeated request as lasting permission for another cycle. It does not announce a new universal alliance duration, a different betrayal penalty, a changed donation rule, or an automatic extension benefit. Numerical details about the prompt interval are not needed for this maintenance and are not newly asserted.

The giant map correction is deliberately narrow. The release names long games on World 10000 and other giant maps after many water nukes as the crashing situation. This is a stability fix for that situation, and the series summary should make it discoverable for players deciding whether to resume long sessions on large maps. Nothing in this patch changes the previously stated device burden of World 10000 or promises that every phone can run it. Nor does a crash fix establish a change in blast damage, transport routes, annexation outcomes, missile prices, or a guaranteed frame rate. Those subjects keep their separately verified boundaries.

Two other fixes concern interface presentation. Closing notifications or opening release notes inside a private lobby should no longer trigger the mistaken leave lobby prompt described by the release. That does not mean a genuine attempt to leave never asks for confirmation. Similarly, the leaderboard correction addresses flickering and a duplicated player row near the bottom of the table. It does not establish duplicated rating awards or any change in the FFA rating calculation. The player answer can distinguish the visible symptom from an imagined progression rule without reproducing the implementation details of the upstream interface.

The policy note says that the Terms of Service and Privacy Policy now cover sends from the clan fund. The preceding patch already introduced leaders sending Plutonium to members with visibility to every member. The new note is a policy coverage statement, not another introduction of sending or a source for transfer limits, additional sender roles, refund eligibility, or legal advice. The existing five hundred player hosted lobby rule likewise remains attributed to the preceding patch. Cumulative release bodies repeat earlier sections, but repetition does not make those changes newly introduced in this version.

The delivery unit is an update to existing answers, not a new independent article. The series page answers what changed in the current release; the shortcut reference answers how to choose and use the input preference. Home links and version labels expose those answers through the site's existing entry points. Older strategy and control details retain their stated dates and evidence scopes. Validation should inspect the rendered title, first answer, local language links, official source destination, quantity setting, historic limits, and preserved series features, rather than merely searching for a new version number in source files.

## 收口与复盘

本 PR 合并即完成并转 Monitoring。仅当相关正式变化、确认事实错误或本批完整观察窗口触发时重开；不为补日期再次生产相同答案。验证、生成文件 SHA256、普通产物差异、SEO 完整诊断差异、PR/合并/部署与线上核验保存至 automation cache 和 manifest。

实际部署日为 T；固定词簇仅在 T+1 至 T+28 全窗口成为 GSC final 后复盘。国家与设备固定或分别报告，不将混合维度变化或单日波动归因于本次编辑。

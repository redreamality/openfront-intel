# v36.5 正式响应与 Nation 联盟续期答案维护

访问与核验日期：2026-11-20，UTC+10。类型：v36.5 正式响应及既有五语主答案维护，不新建玩家页面。五语既有 v36 版本页与首页同步 .5；Nation 续期事实仍按固定 .4 核验。新长文的五语各 1500 词及 3 Reddit + 3 YouTube 配额不适用；没有为本次维护重新认证旧 AI 概率、请求冷却、联盟时长、背叛或核武数值。

## 玩家任务与交付边界

- 词簇：OpenFront Nation alliance、alliance renewal、extend alliance、联盟续期。玩家任务是在临时友好边界到期前决定是否依赖续约，避免把提前请求当成下个周期的同意。
- 唯一答案：既有五语 `/guides/nation-alliance-decisions/`。通用外交规则仍由 `/strategies/diplomacy-betrayal/` 承接，正式补丁由 `/changelog/v36/` 承接；不复制新的联盟攻略。
- 缺口：现有 Nation 主答案讨论到期和续约，但首屏没有 v36.4 对过早续期请求的限制；其原始 v0.34.9/2026-09-18 范围需与新增事实明确区分。
- 数据口径：最后有效 GSC 为 schemaVersion 2、web/final、2026-10-20 至 2026-11-16，昨日已刷新，周周期未到期。站点与 query 使用 byProperty，queryPage 仅作 byPage 落地诊断，锚点单列；本轮不公开私有词级指标、不估算 CTR 收益。本次由正式变化触发，不依赖搜索流量证明事实修正的必要性。
- 自然入口：保留既有 Guides 与外交相邻页入口及本语互链；首屏指向既有本语 v36 版本答案，不增加重复路由。
- 验收定义：五语首屏准确说明有效续期窗口、双方同意和确认新到期时间；原 AI 与数字范围保持历史日期；逐节、内容、构建、链接、实际渲染及 SEO 差异检查通过。五语 e2e 从首页最新指南进入正文，再点击本语版本入口；德语旧表格另加可聚焦、带名称的局部横向滚动区，修复 390px 手机视口下 392px 的页面溢出，保留页面宽度断言并运行完整回归。

## 正式一手来源

| 来源 | 日期与观察 | 局限 |
| --- | --- | --- |
| [v0.36.4 正式 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4) | `published_at=2026-11-18T21:03:09Z`，非 draft、非 prerelease；正文说续期请求只在提示显示期间计入 | 未宣布新的联盟时长或 Nation 接受概率 |
| [固定 tag 联盟续期执行](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/packages/engine/src/execution/alliance/AllianceExtensionExecution.ts) | 到期时间远于当前 tick 加提示偏移时，在登记请求之前直接返回；双方同意才调用 extend | 这是请求处理路径，不证明 Nation AI 必然发出同意 |
| [固定 tag 官方续期测试](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/tests/AllianceExtensionExecution.test.ts) | 分别覆盖真人双方、真人与 Nation、单方请求提示、提示窗口外拒绝；过早双向请求不调用 extend 且不记录双方同意 | 测试人工提交双方执行，不等于 AI 的自然决策概率 |

正式 tag commit 为 `dd85bcfb8b20e599fae15298bf56db1e92947f61`。独立监测到的 upstream main `204d06768ef07b07f2cd158b393dc11e608734e4` 不替代正式发布事实。旧事实继续沿用 [2026-09-18 来源包](2026-09-18-nation-alliance-decisions-community-source-pack.md) 的明确范围。

## English Evidence Notes

The maintained player task is deciding whether a temporary Nation alliance can safely support the next commitment. The existing article already discusses invitations, the useful interval after acceptance, preparation for expiry, and a defensive exit. The released renewal correction belongs inside that existing sequence. It does not establish another independent player intent that needs a separate answer page. The official patch explains why the consent step matters: an extension request now counts only while the renewal prompt is showing. A player should therefore answer the active prompt and verify the resulting expiry rather than treating an earlier request as authorization for another alliance cycle. This is a maintenance of an existing decision, not a new alliance feature guide. Source: [official v0.36.4 release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4), accessed November 20, 2026.

The official release metadata and its displayed heading refer to November 18, 2026. The precise API publication timestamp is 21:03:09 UTC on that date. The access and editorial verification date for this maintenance is November 20 in UTC+10. These describe different events. Neither the later access date nor a later upstream main commit changes when the patch was released. The formal release is neither a draft nor a prerelease, and its renewal note is substantive rather than a TEST placeholder. Its cumulative body also contains earlier series changes, so those older items must not be presented as additional changes introduced by this maintenance. Source: [official v0.36.4 release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4), accessed November 20, 2026.

The fixed release implementation provides a precise boundary for the early request. AllianceExtensionExecution first checks that the target exists, both participants are alive, and an alliance exists between them. It then compares the alliance expiry with the current game tick plus the configured renewal prompt offset. When the expiry lies farther away, execution returns immediately. Crucially, that return occurs before addExtensionRequest is called. The request is therefore not stored as a future vote to be consumed when the prompt eventually appears. This supports the short player statement that early requests do not count toward renewal. It does not require the article to reproduce source names or explain internal tick scheduling. Source: [fixed-tag execution](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/packages/engine/src/execution/alliance/AllianceExtensionExecution.ts), accessed November 20, 2026.

Once the timing guard passes, the execution records the sending participant's request. It calls extend only when bothAgreedToExtend is true. When only one participant has agreed and that is a new transition, the other receives a renewal request message. Repeating the same unilateral request does not turn it into mutual approval. The player-facing instruction should retain the distinction between requesting renewal and completing renewal. A visible prompt is an opportunity to decide; it is not a guarantee of another protected interval. Until the active agreement or expiry actually updates, the defender should keep the original end time in the plan. This last preparation is tactical advice grounded in the difference between one recorded request and a completed extension, not a promised AI response. Source: [fixed-tag execution](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/packages/engine/src/execution/alliance/AllianceExtensionExecution.ts), accessed November 20, 2026.

The official tests separate the two most useful cases. A human-to-human alliance extends only after both extension executions are submitted within the allowed interval. A human-to-non-human case uses a Nation participant and verifies the same mutual requirement. The latter test supports using the timing and consent distinction in the Nation article, but it manually submits the Nation's action. It does not demonstrate that an autonomous Nation will choose renewal in every match, or establish a probability of acceptance. The maintained answer must continue to treat acceptance as conditional and the former allied border as a position that still needs a reserve. Source: [official extension tests](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/tests/AllianceExtensionExecution.test.ts), accessed November 20, 2026.

The regression named Rejects extension outside prompt window creates an alliance and immediately submits requests from both sides. It expects extend never to be called and bothAgreedToExtend to remain false. That is direct evidence against banking early mutual requests. Other tests verify a single request message and suppress duplicate notifications from repeated unilateral requests. Together with the execution order, these tests justify the narrow addition without rechecking every older diplomatic timer, embargo branch, traitor modifier or nuclear alliance rule. The article should preserve those historical evidence boundaries rather than imply a complete v36 recertification. Source: [official extension tests](https://github.com/openfrontio/OpenFrontIO/blob/v0.36.4/tests/AllianceExtensionExecution.test.ts), accessed November 20, 2026.

## 发布门禁新增：v0.36.5

运行期间出现新正式 [v0.36.5 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.5)，API `published_at=2026-11-19T23:06:22Z`，即本地 2026-11-20 09:06:22 +10；`draft=false`、`prerelease=false`，正文标 November 19, 2026。tag commit 为 `b863d48df10f3b3a1460d57096d6447adf856315`。版本响应优先于原维护的发布收口，因此同一 PR 同步五语既有 `/changelog/v36/`、首页版本与最新摘要；不另外创建补丁薄页。访问日：2026-11-20。

| .5 正式正文 | 可公开事实 | 不作的推导 |
| --- | --- | --- |
| Fix a blank space under the homepage footer when ads are on | OpenFront 游戏首页在启用广告时，页脚下方空白被修复 | 不是本站页脚变更，也不证明所有广告、浏览器或设备问题已解决 |
| The clan map's staff-lock messages can now be translated, and it explains when land that's being annexed can't be unclaimed | 氏族地图 staff-lock 提示可翻译，并说明正在被吞并的土地无法取消认领的情况 | 不宣布新的土地所有权、认领权限、吞并计时或战斗/经济规则 |

两项事实均直接来自上述正式 Release 本轮 .5 小节。该正文包含累计的 .4 与更早系列说明；联盟续期仍是 .4 的修复，本次 .5 不重新引入。首页与版本页保留原 .4 建造倍率、联盟同意等已发布边界，生成数据快照仍保留自身提取版本。

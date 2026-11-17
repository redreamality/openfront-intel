# v36.3 正式维护：公开自建容量与氏族基金

核验日：2026-11-18，UTC+10。类型：正式 Release 响应及既有答案维护。仅修改所列事实；没有新增长文，不适用新 guide 五语各 1500 词和 3 Reddit + 3 YouTube 配额。

## 玩家任务、缺口与唯一答案

- 词簇：OpenFront v36.3、release notes、hosted lobby player limit、private/custom game。
- 玩家任务：确认当前补丁改变什么，以及公开列出的自建房间能容纳多少玩家。
- 现有落地：五语 `/changelog/v36/` 为系列唯一主答案；五语 `/guides/create-private-custom-game/` 为自建设置主答案。继续沿用既有路由，不复制独立补丁页。
- 缺口：站点最新配置仍为 v0.36.2；版本页和自建指南首屏仍将按地图上限当作现行规则。
- 自然入口：现有首页版本展示、最新版本 CTA、优先阅读卡、changelog 和 What's New 索引；版本页直接链接本语自建指南，自建指南回链本语版本页。
- 数据口径与窗口：本任务由正式发布触发，不以流量或 CTR 预估作依据。最后有效 GSC 为 schemaVersion 2、web/final、2026-10-14 至 2026-11-10，2026-11-12 获取；每周刷新尚未到期。站点和 query 使用 byProperty，queryPage 只作 byPage 诊断，锚点单列。未重建排名或公开私有词级数据。
- 验收定义：五语首屏明确新上限和适用对象，旧上限标历史，六项正式变化完整一致；首页版本及链接同步；生成数据精确不变；版本、内容、类型、构建、链接、渲染、SEO 差异和浏览器回归完成。

## 正式来源与版本边界

实际执行 `gh api -X GET 'repos/openfrontio/OpenFrontIO/releases?per_page=10'`，排除 draft、prerelease 和 TEST。最新有效条目为 [v0.36.3](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.3)，API `published_at=2026-11-17T13:50:53Z`，正文日期 November 17, 2026，tag 为 commit `295829ac34a4e7043af1759be238438783720a4e`。

已完整读取官方正文，包含 .3 以及 .2/.1/.0 的累计记录。原有 [.2](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.2)、[.1](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.1)、[.0](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0) 来源链接保留，不把新补丁误写成旧系列功能首次上线。

独立读取 upstream main，记录 `8f1a0addc4b3ca7863dd370ba06dcafa17ba1f94`，2026-11-17T22:09:02Z。它包含氏族基金条款与隐私文案后续，不作为正式发布机制或私有服务端细节的替代证据。本文不提供法律解释，也不根据 main 扩写未在正式正文承诺的权限、等待期或金额限制。

| .3 正式变化 | 五语交付与必要限制 |
| --- | --- |
| 领袖可从 clan fund 给成员发送 Plutonium，每个成员可见 | 不推导金额上限、官员权限或私密发送；分配应先对齐用途 |
| 公开列出的自建大厅任意地图最多 500 人，替换 .2 按地图上限 | 不是所有自动排期公共局的统一目标；The Box 210 和较小地图上限保留为 .2 历史，不继续作为现行操作 |
| World 10000 等巨图内存更低、渲染更流畅 | 不承诺固定帧率，不撤销系列公告的手机负担边界 |
| 氏族地图 Activity、榜单、兵力条可翻译，ship 统一改 boat | 可翻译不等于每语全部译文已经完成；不新增奖励或战斗属性 |
| 页头全宽广告皮肤不再挤压加入大厅等页面 | 是上游页面布局修复，不是本站广告或导航行为变更 |
| 部分单人局因 ID 冲突未进 history 的修复 | history 记录不等于手动 save，不承诺恢复全部历史缺失 |

私人房间指南主要更新 description、新鲜度摘要与首屏直答。下方设置、场景和按地图限制的操作明确保留 2026-11-15 / v0.36.2 的历史范围，不宣称本轮重新核验其余所有设置。保留原始逐节结构与既有互链，新增本语版本主答案入口。

另修正五语旧人数比较例子：原文以 30 人说明从统一 100 到 The Box 210 的容量解锁，逻辑不成立。改为 150 人，明确 30 原已低于 100；这项有限修正直接依据 .2 正式正文的 flat 100 与 The Box 210，不保留未经本轮确认的社区反应推论。

首页和共享正式版本标识从 `src/config/openfront-release.ts` 单一配置派生；本轮推进到 v0.36.3。结构化快照仍为 v35、checkout `f33d0049076b2931b73d06ac79d076799e54e8ac`。不运行 extract，不手改生成 JSON，Footer 按既有快照与 `{version}` 合同继续工作。

## 收口与复盘

### English evidence notes

The official release is the authority for this maintenance. Its first section is explicitly labelled v0.36.3 and dated November 17, while the GitHub release metadata gives the exact publication time recorded above. The body also repeats older sections. Those cumulative sections are useful for preserving context, but their presence does not make every sentence a new patch change. The implementation therefore keeps the original series material and replaces the opening answer and the current hosting recommendation. It does not create a second article for the same series intent.

The hosting change has a particularly important object boundary. The release refers to publicly listed hosted lobbies. It explicitly replaces the map dependent cap introduced in the immediately preceding patch and supplies a new maximum of five hundred on any map. This supports correcting the existing host guide and the series summary. It does not support changing the scheduled public matchmaking formula, every map card's expected population, the ordinary team rounding rules, or the private room's entire configuration model. Those other systems are outside this evidence review.

Retaining historical host settings needs more than changing the date. The host walkthrough was written against the earlier patch and contains several map capacity examples and instructions. Its new opening explicitly says those listing ceilings and instructions are historical, identifies the previous verification date, and points to the current maximum before readers reach them. Its freshness summary repeats the limited scope. This makes the older material legible as a versioned explanation instead of silently certifying it as current. A full revision of every unrelated host setting would require separate evidence and is not claimed here.

Clan fund sending is another bounded statement. The release names clan leaders as senders and clan members as recipients, and says every member can see where the fund went. The player copy describes that visibility and recommends agreeing on a purpose before distribution. It does not invent transaction fees, daily limits, minimum membership time, officer permissions, refunds, or a private transfer mode. Later upstream main includes policy text, but the independent main cursor is not a license to extend the published feature description with implementation or policy details beyond the release.

The performance statement is qualitative: less memory and smoother rendering on giant maps, specifically including World 10000. The page keeps that wording qualitative. The older series warning about the load on phones remains relevant because the patch does not state that all devices can now handle the largest map. The same distinction prevents a rendering improvement from becoming a combat balance claim. No new damage, simulation speed, missile interception chance, or minimum frame rate is inferred. Players still need to choose a map appropriate to their device and group.

The translation change concerns the clan map's Activity feed, leaderboard, and troop bar being translatable. That is a capability statement, not proof that every supported language now has a finished translation. The terminology change from ship to boat is included in each localized summary. The advertising fix concerns the upstream game's layout when a full width header skin loads. It does not describe a change to this site's own ad integration, consent behavior, navigation, or browser storage. The browser tests remain focused on the site's actual release links and rendered content.

Finally, the solo fix is about games missing from history because an identifier collided with an older game. History recording and a player's manually saved campaign are different tasks. The text preserves that distinction and makes no recovery promise for all historical missing games or all saved files. Validation checks the current direct answer, official source links, historical limits, existing series facts, home discovery, and localized host cross links. The generated data baseline remains byte identical, so this limited release response does not disguise a new extraction or a blanket revalidation of older strategy tables.

本 PR 合并即完成并转 Monitoring。正式版本配置、五语正文、首页摘要和自建答案边界进入同一 PR；实际 SHA、合并、CI 和线上核验写 automation memory/manifest，不另开纯状态 PR。

本轮验收结果由外部 cache 保存完整命令日志、普通生产前后 HTML/XML 哈希、生成 JSON 哈希、SEO 完整诊断集合、浏览器测试及逐行 URL 表。只有验收和实际远端交付证据同时成立才报告 DELIVERED。

实际部署日为 T；固定词簇只有在 T+1 至 T+28 完整窗口成为 GSC final 后复盘，国家与设备固定或分别列明。新正式 Release 或确认事实错误可提前重开；不根据单日流量或本文更新时间宣称编辑因果。

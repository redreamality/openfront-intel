# 核弹切地答案：v36 当前边界与 v35 历史清单

日期：2026-11-21，UTC+10。类型：五语既有答案维护，不新增独立页。

## 任务与验收

- 词簇与任务：nuke cut、nuke annexation、coastal empire；玩家判断切断后是否可能发生兼并，以及旧录像的条件是否适用于当前版本。
- 唯一答案：五语既有 `/guides/nuke-cut-territory-annexation/`。缺口是页面首屏、摘要及所有详细清单仍以 v0.35.0..v0.35.2 为范围，没有 v36 的正式修正。
- 数据：最后有效私有 GSC `gsc-20261119-28d.json`，schemaVersion 2，web/final，2026-10-20..11-16；生成于 2026-11-18T23:04:11.939Z，周刷新未到期。站点/query 使用 byProperty，queryPage 仅作 byPage 诊断，锚点分列。本次由正式事实差异触发，不推测搜索收益。
- 修改：首屏与摘要说明 v36；新增完整当前版本解读小节；原 v35 小节全部用标题明确历史范围，不把旧“无水边”清单继续包装为当前完整算法。保留旧案例、来源日期与数字的历史边界。
- 自然入口：保留 Guides 和现有相邻互链，不新建路由。元数据更新可能改变首页、索引、相关推荐及 RSS；按实际普通产物哈希差异列全 URL。
- 验收：五语维护 guide 审计及每节门槛、内容审计、Astro check、普通生产构建、链接、SEO 完整集合差异、渲染标题/历史范围/canonical/hreflang、生成 JSON 精确 SHA256、diff 检查。本次没有本站交互变化，新长文 1500 词和 3+3 社区配额不适用。

## 官方来源与观察

访问日期均为 2026-11-21。只读取真实正式 Release 正文，不据 upstream main 推导已发布玩法。

| 来源 | 日期与观察 | 局限 |
| --- | --- | --- |
| https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0 | API 发布 2026-11-09T16:58:23Z，正式非 TEST；Gameplay & Balance 的兼并重做含三项变化 | 正文没有给出当前完整捕获者排序或全部几何判定 |
| https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.5 | API 发布 2026-11-19T23:06:22Z，最新正式版；累计正文保留 v36.0 三项变化，.5 自身只有广告留白和氏族提示修复 | .5 不是兼并变化首次引入版本 |
| [既有 v35 来源记录](2026-10-20-nuke-cut-stable-maintenance.md) | 2026-10-20 的固定 v35 tag 与测试说明仅支撑旧章节 | 不重新认证这些条件在 v36 中完全相同 |

独立 upstream main 游标：`ed81b500b32623c702d43a235cf36d5963c020be`，提交于 2026-11-20T21:53:24Z，主题是大厅 Boosted 提示；不能据其改变正式兼并答案。本站配置 v0.36.5，五语 v36 changelog 与首页已同步；生成数据/Footer 保留 v35/f33d004 的独立来源边界，不运行无关 extract。

## English Evidence Notes

The existing answer owns a precise player task: deciding whether a nuclear cut can transfer the separated territory and whether the expected recipient makes the shot worthwhile. It already contains a detailed v35 walkthrough, a recipient discussion, two hypothetical scenarios, and a checklist. Creating another page for the same nuclear-cut question would split the answer rather than resolve its version problem. The maintenance therefore keeps the existing route and its language variants. It changes the first answer and the metadata that readers see before reaching the old details. The older material remains useful for historical matches, provided its version limit is visible in every section heading rather than buried in a source paragraph.

The official v0.36.0 release contains an explicit annexation rework in Gameplay and Balance. Its first item says that a nuked-off arm is annexed even when the crater stands between it and the sea. That is enough to invalidate a universal present-day inference from the old v35 checklist: a crater facing water is not, by itself, proof that the released v36 cut cannot transfer. It does not say that every coastal district automatically transfers, that any shoreline is irrelevant, or that every missile creates a valid cut. The maintained answer must express the specific changed case while retaining the practical need to check the surviving route and actual ownership after the explosion.

The second released correction prevents a nation cut in two from being annexed twice in one tick. The wording is about duplicate processing of a nation during that event. It does not create a player ability to demand two territorial rewards, promise two kills, or prove that two separate nations cannot lose land during one tick. The player-facing implication is narrower: do not price a strike on the assumption that the same nation will pay out twice because two disconnected regions are visible. Confirm which land actually changed owner and whether the defender remains alive before committing the reserve to a follow-up front.

The third released correction says that inland empires stop losing small border tips. This is also a limit on an overbroad tactical promise. A small projecting tile group is not a guaranteed annexation opportunity merely because its outline resembles an older example. Ordinary combat can still take land, and destruction can still have value, but the release gives no universal minimum area, percentage, or tile threshold for such a tip. Adding one would invent a numerical rule. The maintained section therefore tells the reader to separate a valuable destroyed connection from a speculative automatic transfer and to verify the result before paying for another missile.

The current formal cursor is v0.36.5. Its published body includes the earlier v0.36.0 section and the same three annexation corrections, while its own top section concerns homepage ad spacing and clan map messages. The answer should identify v36.0 as the introduction of this rework and avoid describing it as a new v36.5 mechanic. The access date and maintenance date are November 21 in UTC+10; the original v36.0 API publication time is November 9 at 16:58:23 UTC. Those dates describe different events. The latest upstream main commit is monitored separately and is not evidence of a further formal annexation change.

The source deliberately supports a change summary rather than a complete new algorithm. In particular, it does not establish current tie-breaking, all recipient priority details, a full list of coast or map-edge exclusions, a processing interval, or guaranteed economic returns. Those precise claims in the retained walkthrough belong to the previously researched v0.35.0 through v0.35.2 implementation. A clear historical label prevents the page from silently extending that earlier verification. It also avoids discarding useful old replay explanations. The new section supplies two practical situations and a conservative decision sequence without inventing thresholds: inspect the connection, value destruction separately, observe ownership, and protect the reserve against whichever new front actually appears.

Verification must assess the public output, since changed title and summary values can appear outside the five articles. Production HTML and XML hashes are compared against a build from the exact remote-main baseline. The resulting route list includes index cards, recent-content ordering, related recommendations and RSS only where their output actually changes. Canonical and alternate-language links must still point to the existing answer routes. The local generated game data is held at its exact baseline hashes, so this maintenance cannot accidentally imply a fresh data extraction or a complete v36 recertification. Search impact is evaluated only after the real deployment day and the complete following twenty-eight-day final-data window, with the fixed query cluster and country/device scope kept consistent.

## 收口

本 PR 合并即完成并转 Monitoring。下一触发仅为相关正式变化、确认错误或实际部署日 T 后 T+1..T+28 完整 GSC final 窗口。不因本次维护把旧数字和例子重新认证为 v36；不使用未发布 main 作为玩法依据。

# What's New 栏目与每日来源计划

更新日期：2026-08-21。

本文定义公开 `What's New` 栏目的编辑边界、数据结构、首批候选和每日维护流程。GitHub 一手资料详见 [`2026-08-20-whats-new-upstream-source-plan.md`](research/2026-08-20-whats-new-upstream-source-plan.md)；每日状态与执行结果仍写入 [`content-loop.md`](content-loop.md)，长期内容原则仍以 [`content-strategy.md`](content-strategy.md) 为准。

## 决策摘要

1. 新建五语 `/whats-new/` 栏目，但它不是 OpenFrontIO GitHub 活动镜像。
2. 公共栏目只展示按版本写成的玩家文章；版本状态只有 `Released` 和 `Not released yet` 两种公开状态。
3. `changelog` 继续负责版本文章的稳定 URL。正式发布前可先写 v34 预览，发布后只切换文章 frontmatter 的 `releaseStatus`，不更换 URL。
4. GitHub Issues 和 PRs 只属于内部内容账本与证据核验，绝不在终端页面、文章、首页摘要或 RSS 中展示编号、标题或链接。
5. 首版只做一个可扫描的索引页和首页摘要，不为每个 PR 建薄详情页。改变机制或操作的项目仍应更新对应常青主答案。
6. GitHub 没有实质变化时只记录扫描结果，不刷新公开条目的日期，也不制造内容 PR。

## 与现有内容的分工

| 内容层 | 回答的问题 | 可用来源 | 时间边界 |
|---|---|---|---|
| `What's New` | 最近上线了什么；下一版本值得期待什么 | 五语版本文章；内部以 Release、PR、Issue 和 tag 源码核验 | 可以早于 Release，但必须标注 `Not released yet` |
| `changelog` | 某个正式版本究竟发布了什么 | 非 TEST GitHub Release 正文和正式 tag | 只写已发布事实 |
| 常青机制 / 攻略 | 这条变化会怎样改变我的下一局 | 正式 tag 源码、生成数据、真实问题 | 默认只按正式版本给确定建议 |
| 内部内容账本 | 今天发现了什么、为何披露或不披露 | 全部可访问的一手信号 | 可以记录未公开、受限或被排除项目 |

`What's New` 负责把版本变化整理成玩家能直接理解的文章，不复制提交流。一个预览版本进入正式 Release 后，只需把对应文章的 `releaseStatus` 改为 `released`，并按正式事实核对正文；稳定 URL、文章结构和站内入口保持不变。没有独立玩家价值的维护提交只留在内部账本。

## 状态契约

| 状态 | 最低证据 | 允许的公开表述 | 状态转换 |
|---|---|---|---|
| `Released` | 非 TEST 正式 Release；必要时再核对 tag 源码 | “已上线于 vX.Y.Z” | 新 Release 明确包含该变化后晋级 |
| `Merged` | 公开 PR 已合并，且尚未由正式 Release 确认 | “已合并，尚未确认发布版本” | Release 收录后转 `Released`；回退后转内部观察 |
| `In development` | 公开 PR 仍开放，玩家结果清晰，正文 / diff / 测试足以说明边界 | “开发中，最终行为可能变化” | 合并后转 `Merged`；关闭未合并后撤下 |
| `Watching` | 公开 Issue 已获 `approved`，并有 milestone、负责人或成熟讨论之一 | “已批准提案，不代表承诺上线” | 有实现 PR 后转 `In development`；失去依据后撤下 |

附加规则：

- `main` 与正式 tag 可能分叉。`compare/<release>...main` 只能作为线索，不能把 `main` 上已合并提交判成已发布。
- PR 的 `MERGED` 状态也不能证明它进入了当前生产版本。正式状态只由 Release 正文和 tag 共同确认。
- Draft、`changes requested`、冲突、外部依赖未确认的 PR 默认只进内部账本；只有极高玩家价值且正文稳定时才例外公开为 `In development`。
- `not-approved` Issue、DevOps、翻译整理、纯重构和普通小修默认不公开。
- 涉及作弊、可复现漏洞、认证绕过、资源复制或滥用路径的 Issue / PR，在修复正式发布前只做内部记录。发布后只说明玩家影响和修复结果，不提供利用步骤。
- 私有或当前账号不可见仓库可以作为内部复核线索，但公开页面不得泄露仓库名、标题、URL 或实现细节。

## 玩家价值门槛

公开候选至少满足一项：

1. 新增玩家此前做不到的动作、模式或入口。
2. 改变胜负判断、资源分配、战斗时序或地图阅读。
3. 修复会让现有攻略给出错误操作的行为。
4. 显著改善可发现性、无障碍、移动端操作、卡顿或开局失败恢复。
5. 对不可逆行为增加玩家必须知道的警告或确认流程。

同时必须能写出一句具体的“对玩家意味着什么”。只能复述提交标题、无法指出受影响玩家决策、或只能描述内部实现时，不进入公开栏目。

## 2026-08-20 来源快照

- 最新正式非 TEST Release 是 [`v0.33.14`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.14)，发布于 2026-09-04；它修复模态框滚动，且累计记录 v0.33.13 将 Overtime 设为公开 FFA 默认。
- 上一轮内容账本记录的上游 `main` 是 `0b0c765`；本轮核验到 `9c97e01`。这段增量只有 8 个合并提交，适合作为每日差量。
- `v0.33.6...main` 返回 `diverged`，`main` ahead 104 / behind 20。禁止把这 104 个提交解释成“v33.6 之后新增”。
- 当前开放 PR 约 27 个，开放 Issue 约 132 个。数量不是发布队列；绝大多数应被状态和玩家价值门槛过滤。

## 首批候选

### 公开首发候选

| 优先级 | 玩家主题 | 当前状态 | 一手来源 | 编辑动作 |
|---|---|---|---|---|
| P0 | Team Doomsday 使用更高的七档门槛，腐化领土变为需要主动攻取的 wasteland | `Merged` | [PR #5030](https://github.com/openfrontio/OpenFrontIO/pull/5030)、[PR #5052](https://github.com/openfrontio/OpenFrontIO/pull/5052) | 合并成一个玩家主题；正式发布后同步五语 Doomsday 主答案和版本总览 |
| P0 | Water Nukes 后运输船可正确穿过新水域，不再因 minimap 数据绕路 | `Merged` | [Issue #4760](https://github.com/openfrontio/OpenFrontIO/issues/4760)、[PR #4975](https://github.com/openfrontio/OpenFrontIO/pull/4975) | 当前攻略已保留未发布警告；Release 收录时转 `Released` 并移除警告 |
| P1 | Detailed View 可浏览完整公开大厅队列并按模式、队伍和人数筛选 | `Merged` | [PR #5022](https://github.com/openfrontio/OpenFrontIO/pull/5022) | 作为独立功能条目；正式发布后核对真实 UI 和入口名称 |
| P1 | Clan 成员可把普通或 premium currency 永久捐入 treasury | `Merged` | [PR #5041](https://github.com/openfrontio/OpenFrontIO/pull/5041) | 条目必须突出“永久、不可退款”，不得弱化 premium currency 风险 |
| P1 | 高等级 Port 的每次商船生成尝试都会使用最新 pity rate | `Merged` | [Issue #5013](https://github.com/openfrontio/OpenFrontIO/issues/5013)、[PR #5015](https://github.com/openfrontio/OpenFrontIO/pull/5015) | 优先同步经济 / trade 常青页；除非 Release 给出玩家可感知描述，否则不单独占首页位 |
| P1 | SAM 可拦截范围内的核弹显示更准确的拦截指示 | `Merged` | [PR #5044](https://github.com/openfrontio/OpenFrontIO/pull/5044) | 作为较小的操作反馈条目，Release 后再确认是否值得公开 |

### 开发中观察

| 优先级 | 玩家主题 | 当前状态 | 一手来源 | 下一决策点 |
|---|---|---|---|---|
| P0 | 无需占玩家槽即可中途加入并旁观对局 | 开放、review required | [PR #5031](https://github.com/openfrontio/OpenFrontIO/pull/5031) | 合并后进入公开 `Merged`；当前可作为首批 `In development` 候选 |
| P0 | SAM 升级时射程连续增长，并改善范围预览与大量目标性能 | 开放、blocked | [Issue #4527](https://github.com/openfrontio/OpenFrontIO/issues/4527)、[PR #5040](https://github.com/openfrontio/OpenFrontIO/pull/5040) | 等评审解除 blocked；合并后准备核武机制页同步 |
| P1 | 10 个外观 loadout 槽与 `Unequip all` | 开放、blocked | [PR #5050](https://github.com/openfrontio/OpenFrontIO/pull/5050) | 等评审和最终 UI；公开时只解释玩家操作，不复述存储实现 |
| P1 | 在大厅阶段预加载地图，缩短开局等待 | 开放、review required | [Issue #5010](https://github.com/openfrontio/OpenFrontIO/issues/5010)、[PR #5046](https://github.com/openfrontio/OpenFrontIO/pull/5046) | 合并后评估是否能用真实玩家体验描述，而不是承诺固定秒数 |
| P1 | 主操作盘显示联盟请求 / 冷却 | 开放、review required | [Issue #4970](https://github.com/openfrontio/OpenFrontIO/issues/4970)、[PR #4974](https://github.com/openfrontio/OpenFrontIO/pull/4974) | 合并后核对最终交互与联盟机制页 |
| P1 | 大厅为色觉缺陷玩家分配更可区分的颜色 | 开放、changes requested | [Issue #4928](https://github.com/openfrontio/OpenFrontIO/issues/4928)、[PR #4932](https://github.com/openfrontio/OpenFrontIO/pull/4932) | 等评审结论；保留无障碍价值，但不提前引用最终算法数字 |
| P2 | 商店内预览 skin 与 effects | 开放、review required | [Issue #3682](https://github.com/openfrontio/OpenFrontIO/issues/3682)、[PR #5008](https://github.com/openfrontio/OpenFrontIO/pull/5008) | 只有合并或进入稳定评审时再公开 |
| P2 | Ranked 2v2 排队前选择固定队友 | 开放、外部依赖未确认 | [PR #4788](https://github.com/openfrontio/OpenFrontIO/pull/4788) | 依赖仓库当前不可验证；只内部观察，不进入首批页面 |

### 只进内部账本

- adminbot、内部 API、构建、依赖升级、翻译去重和纯重构：普通玩家没有独立下一步。
- 未获批准的提案：标题不等于产品计划。
- 玩家资源复制、多账号绕过、认证与滥用问题：修复发布前避免放大利用路径。
- Draft、长期 stale、存在冲突或 `changes requested` 且玩家结果仍大幅变化的 PR：保留状态，不用作公开承诺。
- 地图小修和视觉微调：只有改变地图决策、入口或玩家判断时才晋级。

## 公共文章 MVP

首版范围：

1. 新增 `/whats-new/`、`/zh/whats-new/`、`/fr/whats-new/`、`/de/whats-new/`、`/nl/whats-new/`。
2. 页面按 `Released` 和 `Not released yet` 两组展示，内容是版本文章而不是 Issue/PR 条目。
3. 每篇只显示版本状态、玩家影响、文章日期和相关站内主答案；Issue/PR 编号、标题、URL 和来源列表只保留在内部账本。
4. 主导航用 `What's New` 取代直接 `Changelog` 入口，页面顶部保留“完整版本历史”链接；旧 changelog 路由、RSS 和 SEO 继续存在。
5. 首页在现有四个优先路径之后增加最多三篇文章摘要，预发布版本明确标为 `Not released yet`。
6. 首版不增加客户端筛选、标签页或自动刷新；静态分组可减少交互与维护风险。
7. 每个版本只有一个稳定文章 URL，例如 `/changelog/v34/`；预发布文章和正式版本文章复用同一 URL。

内部来源账本继续使用 Astro data collection 保存条目。公开正文改用五语 `src/content/changelog/{lang}/vXX.mdx` 版本文章，避免把来源记录误当成读者内容：

```yaml
id: doomsday-team-wasteland
status: merged
impact: gameplay
firstSeenAt: 2026-08-18
verifiedAt: 2026-08-20
sources:
  - type: pull
    number: 5030
    url: https://github.com/openfrontio/OpenFrontIO/pull/5030
locales:
  en: { title: ..., summary: ... }
  zh: { title: ..., summary: ... }
  fr: { title: ..., summary: ... }
  de: { title: ..., summary: ... }
  nl: { title: ..., summary: ... }
```

正式 schema 至少约束内部条目的 `id`、`status`、`impact`、`firstSeenAt`、`verifiedAt`、`sources`、`relatedPath` 和五种语言；公开 changelog schema 额外约束 `releaseStatus: released | not-released`。v34 正式发布时只把对应文章的 `releaseStatus` 改为 `released`。

## 后续每日任务

### 每轮增量扫描

1. 读取账本中的 `lastReleaseTag`、`lastUpstreamMain`、已跟踪 Issue / PR ID 和上次 `verifiedAt`。
2. 先查最新非 TEST Release，再查上游 `main`。Release 分支与 `main` 分叉时，分别保存两个锚点，不做线性领先假设。
3. 拉取自上次扫描以来新合并的 PR、更新过的开放 PR、更新过的已批准 Issue，以及所有已跟踪条目的当前状态。
4. 对每个变化记录状态转换：`Watching → In development → Merged → Released`，以及 `closed`、`reverted`、`stale` 或 `blocked`。
5. 先执行安全和私有来源排除，再判断玩家影响。只对通过门槛的条目写公开文案。
6. 对 `Released` 版本文章核对 Release 正文和 tag 源码；预发布文章只写玩家可理解的影响，不承诺日期、版本或最终数值。
7. 更新 `content-loop.md` 的来源快照、候选状态和下一决策点。没有实质变化时写一条批次总览后停止，不触碰公共条目的 `verifiedAt`。
8. 有实质变化时，把同一玩家主题的多个 PR 合并成一个条目；同步受影响的 changelog、常青页、首页摘要和多语状态。

建议每日快照记录以下字段：

| 字段 | 用途 |
|---|---|
| `scannedAt` | 本轮 GitHub 查询时间 |
| `lastReleaseTag` / `releasePublishedAt` | 正式上线边界 |
| `releaseCommit` | tag 事实核验 |
| `lastUpstreamMain` | 下一轮增量基线 |
| `trackedIssues` / `trackedPulls` | 防止只看新列表而漏掉状态转换 |
| `decision` | `publish`、`monitor`、`evergreen-only`、`suppress` |
| `decisionReason` | 玩家影响、证据、风险和页面边界 |
| `nextCheck` | 合并、Release、评审、milestone 或复核日期 |

### 发布触发器

- 正式 Release：24 小时内把已包含条目转为 `Released`，同步 en + zh；72 小时内完成其余语言和受影响常青页。
- 高影响 PR 合并：只更新内部账本；如果能形成稳定玩家主题，再写入对应预发布版本文章。
- 高影响开放 PR：只作为内部证据，不能直接产生公共状态或文章。
- Issue 获批准或进入 milestone：只进入内部观察；只有形成玩家文章后才影响版本预览。
- PR 关闭未合并、回退或长期停滞：从内部候选撤下或标记原因，公共文章不展示过程流水。

### 每周清理

1. 复核所有预发布条目的公开 PR 状态和最后活动时间。
2. 将多个实现同一玩家结果的 PR 合并成一个主题，避免流水账。
3. 检查公开页是否仍把任何 `Merged` / `In development` 项暗示为当前能力。
4. 检查 `Watching` 是否超过三项；优先保留能改变玩家选择且交付信号最强的项目。
5. 检查已发布条目是否已连接唯一主答案；完成后从首页短列表自然轮换，但保留版本归档。

## 实施批次

后续每日任务不需要机械地“一天只做一步”。只要工作树、来源和验证门禁允许，可在同一内容批次完成多个阶段；PR 仍按可独立验证的主题拆分。

### 批次 A：结构与数据合同

- 在 `src/content/config.ts` 增加 `whatsNew` data collection 和状态 schema。
- 建立 3–5 个首批 canonical YAML 条目，五语共享事实、分别维护短文案。
- 增加静态审计：五语齐全、GitHub URL 只指向允许公开的 `openfrontio/OpenFrontIO` 来源、状态必需字段完整、预发布复核期限存在。
- 完成定义：错误状态或缺语言时构建 / 审计明确失败；数据层不依赖构建时访问 GitHub。

### 批次 B：五语栏目与入口

- 新增五语静态索引页和一个共享展示组件。
- 主导航将直接 changelog 入口替换为 `What's New`；栏目内保留完整版本历史入口。
- 五语首页增加最多三条的紧凑更新摘要，`Released` 与预发布状态在视觉和文字上明显区分。
- 同步 SEO、sitemap、RSS 决策；RSS 首版只收 `Released`，不把开发计划当成已发布新闻。
- 完成定义：桌面和移动端无导航溢出，五语状态文案与链接一致，不出现嵌套卡片或重复导航 DOM。

### 批次 C：内容同步与日常维护

- 把高影响 `Merged` 条目连接到现有 Doomsday、Water Nukes、economy / trade 等唯一主答案，但不提前改写正式规则。
- 新 Release 出现时完成状态晋级、changelog 与常青页同步，并移除对应旧警告。
- 每日只处理状态或玩家结果发生变化的条目；无变化时不提交。
- 完成定义：内容账本能从上次 `main` 锚点解释本轮所有公开变化、排除项和下一决策点。

## 验证门禁

- 静态数据 / 内容：`pnpm content:audit -- --strict`。
- 新 collection、路由或 frontmatter：`pnpm build`。
- 内链和正式来源链接：`pnpm check:links`，另对 canonical 条目的 GitHub URL 做静态格式审计。
- 导航、首页摘要或状态展示：新增 `e2e/whats-new.spec.ts`，覆盖五语路由、单一导航、状态标签、正式版本历史入口和移动端布局。
- 关键玩家事实：更新 `e2e/content-integrity.spec.ts`，但未发布规则只在 `What's New` 状态页断言，不写进正式机制断言。
- 完整交付：`pnpm test:e2e`；若仅出现 `browserContext.newPage` 资源争用，按项目规则先单线程定向复跑，再完成全套回归。

## `WN-01` 完成定义

1. 五语 `/whats-new/` 可访问，并能一眼区分已上线、已合并和开发中。
2. 每个公开条目都有玩家影响、状态、核验日期、公开一手来源和相关站内主答案。
3. changelog 仍是正式版本事实的唯一归档，不被预发布内容污染。
4. 每日账本保存 Release 与 `main` 两个锚点、跟踪 ID、披露判断和下一决策点。
5. 安全 / 私有来源、未批准提案和开发噪声不会出现在公共页面。
6. 五语事实字段共享并由 schema / 测试防漂移；导航、首页和路由 e2e 全部通过。

# 2026-10-09 搜索答案改善实施报告

状态：DELIVERED。八项搜索改善提交 `73b4347b133af8aa304b966ea4a9ec2f3754aed5` 已推送 main，部署 [37914968649](https://github.com/redreamality/openfront-intel/actions/runs/37914968649) 于 2026-10-09T10:03:23Z 成功，转入 Monitoring。全站 SEO 仍有已核验的 83 项既有问题。当前批次为既有答案维护，不新增攻略。

## 八项实施

| 项目 | 已实现行为 | 验证依据 |
|---|---|---|
| GSC 聚合 | 站点总数和 query 原始 byProperty；queryPage 使用 byPage，锚点单列，点击/展现最多页分列，取消通用 CTR 收益预测 | 聚合回归测试与真实 OAuth 28 天拉取 |
| 新手 | First Match 五语标题、摘要与官方游戏入口明确 how to play；Guides 首屏直达 | 五语入口与渲染标题 e2e |
| 移动端 | 首屏导向官方安装答案；其他游戏/社区标题和回主答案入口区分职责 | 五语移动意图与新路由 e2e |
| MIRV | 最终 title 保留成本和涨价，单位数据库接价格阶梯 | 五语 title、点击与本地化首档价格断言 |
| 地图 | 列表直达总网格/可用土地、最大地图与 Compact 答案 | 五语数据库点击及标题断言 |
| 策略 | Strategies 首屏按开局、经济、战斗、终局给行动与下一篇 | 五语入口可见性与目的路由 |
| 长文发现 | 五个支柱页接入 Threat Assessment、Tall vs Wide、Annexation、Four Islands、Island Defense | 五语实际点击与目标 H1 |
| 内容循环 | 维护已有答案优先；新页验证需求，教学探索每周最多一个；按发布后完整 28 天复盘 | 战略/执行文档及既有日更任务保存核验 |

## 事实与自动化边界

移动安装页原核验范围为 v0.34.12，本轮用正式 v0.34.22 Release、tagged README 与 iOS 字符串重新核验，五语更新日期为 2026-10-09。Release 发布日期为 2026-10-01，附件为空；这只证明该 Release 不提供 APK 安装附件，不推断未来原生应用或其他平台商店状态。其余成熟攻略的事实核验日期未因 SEO 编辑刷新。

官方来源：

- https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/README.md
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/resources/lang/en.json

既有 `openfront` 日更任务已通过应用工具更新提示词，保持 ACTIVE、每日 09:00、gpt-5.6-sol、xhigh、本地运行项目及既有提交/推送授权。保存文本见 [automation-content-prompt.md](../automation-content-prompt.md)。本轮只更新任务，不额外触发执行。更新方式参考 [Codex 官方 Scheduled tasks 文档](https://developers.openai.com/codex/app/automations)。

Hermes 的 `openfront`（Job ID `4777a6e26b00`）亦已通过 `hermes cron edit --prompt` 同步相同内容策略；保留 Hermes 原有 AGENTS 自动注入、共用 memory 路径，并明确旧运行输出的强制新文指令被覆盖。读取持久化记录逐字段比较，只有 `prompt` 改变；启用状态、每 360 分钟、工作目录、推理与模型、交付设置、其他任务及下一运行时间均与更新前一致。未手动触发执行。原提示词备份、有效新提示词与验证 JSON 均存于私有 `.cache/gsc/retro-2026-10-09/hermes-openfront-*`。

Hermes 列表复核另显示最近一次已有运行的通知投递失败：`deliver=all` 没有解析到投递目标（`delivery_failed: no delivery target resolved for deliver=all`）。本次提示词更新成功；通知路由配置未改，投递问题仍待处理。

私有基线为 schemaVersion 2、2026-09-10 至 2026-10-07，保存在 `.cache/gsc/retro-2026-10-09/implementation-baseline.json`，不提交词级流量。GSC 展现是本站获得的展现，不能当全网搜索量；平均排名不是每次搜索固定名次。发布后以 [search-improvement-plan.md](../search-improvement-plan.md) 的固定词簇和完整窗口评价。

## 验证及恢复记录

- GSC 回归：2/2 通过，重复 URL/锚点不放大 property 展现和排名。
- 真实 OAuth：28 天拉取成功，JSON 与 Markdown 生成。
- 内容严格审计：95/95 核心页通过；What's New 12 条内部记录、790 个公开文件通过。
- Astro 检查：262 文件，0 errors、0 warnings、9 既有 hints；生产构建完成。
- 链接审计：815 HTML、38,845 个内部 href，无坏链。
- 首轮完整 e2e：428/430 通过，新增 20 项全部通过。两条旧地图数/sitemap 频率断言已按当前数据和既有配置校准；最终全套重跑 **430/430 通过（3.5 分钟）**。
- 全站 SEO 审计退出 1：72 个生成省略号标题、1 个双 H1、10 个需跳转链接，共 83 项。用旧 HEAD 的 SEO 函数与对应旧文章逐项核验，72 个标题输出相同，其余 11 项源码未改，本批 76 个影响 URL 无命中；私有证据为 `seo-audit.log` 和 `seo-baseline-check.json`。未把全站失败描述成通过，遗留项待独立修复。
- 读取不存在的 `e2e/seo.spec.ts` 后，经真实文件枚举恢复定位。
- 初次类型检查扫描并发任务未完成的临时 `cache/zh-s2.mjs`；排除临时目录后恢复。
- 并行 Astro check/build 触发共享 data-store 临时文件重命名 EPERM；改顺序执行。具体失败与恢复已写入相应 runbook，未修改 AGENTS.md。
- 构建后五个生成 JSON 的业务数据、上游 commit 与版本均与任务开始基线一致；仅时间戳/换行噪声已从精确备份恢复。最终 `git diff --check` 通过。

此前的五语 sub-hundred-elimination、costly-elimination/threat-assessment 与来源包已由父提交 `9feb17c396ca372633315dc6f0ff850b698e4f71` 收口。接续维护为德语 Threat Assessment 的模式/地图小节补充双边界不确定时的核心路线与预备队判断，397 词提升至 423 词；不新增机制数字，保留原版本与事实核验日期。依据既有 [来源包](2026-09-01-threat-assessment-community-source-pack.md)，其他四语无需重复补句。新长文总字数及 3+3 社区配额不适用于此次维护。

接续维护验证：Threat Assessment 单篇五语审计 PASS；content:audit 与 check 通过（262 文件、0 errors、0 warnings、9 hints），构建 815 页，38,845 个内部 href 无坏链。SEO 仍为相同 83 项既有问题，Threat Assessment 无命中。五个生成 JSON 已核验为本轮时间戳/换行噪声并恢复精确基线，diff 检查通过。接续修改没有交互变化，无需重复 e2e；入口批次已有 430/430 完整通过证据。

## 受影响 URL（去重 77 条）

直接修改 70 条五语路由，另有 5 个首页最新内容排序、1 个荷兰语推荐卡片和接续维护的 1 个德语 Threat Assessment 页面。基于 815 个生成 HTML 核验实际受 First Match 元数据影响的渲染引用；未命中的共用布局页面不计入。

| URL | 变更类型 | 原因 |
|---|---|---|
| https://openfront.fyi/de/guides/threat-assessment/ | 内容维护 | 补足模式与地图判断小节 |
| https://openfront.fyi/ | 首页 | 移动答案实际核验更新进入最新内容排序 |
| https://openfront.fyi/database/maps/ | 入口 | 直达最大地图及 Compact 尺寸解释 |
| https://openfront.fyi/database/units/ | 入口 | MIRV 成本行接价格阶梯 |
| https://openfront.fyi/de/ | 首页 | 移动答案实际核验更新进入最新内容排序 |
| https://openfront.fyi/de/database/maps/ | 入口 | 直达最大地图及 Compact 尺寸解释 |
| https://openfront.fyi/de/database/units/ | 入口 | MIRV 成本行接价格阶梯 |
| https://openfront.fyi/de/guides/ | 入口 | 新手/手机主答案首屏与卡片元数据 |
| https://openfront.fyi/de/guides/first-match/ | 答案/SEO | 新手标题、摘要、官方游戏入口与后续判断 |
| https://openfront.fyi/de/guides/land-combat/ | 入口 | 接入 Annexation/Enclosure |
| https://openfront.fyi/de/guides/map-size-compact-mode/ | SEO | 保留最大地图与 Compact 关键词 |
| https://openfront.fyi/de/guides/mirv/ | SEO | 保留成本与涨价关键词 |
| https://openfront.fyi/de/guides/mobile-alternatives/ | SEO/入口 | 其他 Android 游戏职责，回官方玩法入口 |
| https://openfront.fyi/de/guides/mobile-app-download/ | 事实维护 | v0.34.22 正式来源与核验日期 |
| https://openfront.fyi/de/guides/mobile-reddit-community/ | SEO/入口 | 社区求助职责，回官方玩法入口 |
| https://openfront.fyi/de/strategies/ | 入口 | 按开局、经济、战斗、终局直达行动 |
| https://openfront.fyi/de/strategies/economy-fundamentals/ | 入口 | 接入 Tall vs Wide |
| https://openfront.fyi/de/strategies/team-naval-control/ | 入口 | 接入 Island Defense |
| https://openfront.fyi/de/strategies/team-roles/ | 入口 | 接入 Four Islands 分工 |
| https://openfront.fyi/fr/ | 首页 | 移动答案实际核验更新进入最新内容排序 |
| https://openfront.fyi/fr/database/maps/ | 入口 | 直达最大地图及 Compact 尺寸解释 |
| https://openfront.fyi/fr/database/units/ | 入口 | MIRV 成本行接价格阶梯 |
| https://openfront.fyi/fr/guides/ | 入口 | 新手/手机主答案首屏与卡片元数据 |
| https://openfront.fyi/fr/guides/first-match/ | 答案/SEO | 新手标题、摘要、官方游戏入口与后续判断 |
| https://openfront.fyi/fr/guides/land-combat/ | 入口 | 接入 Annexation/Enclosure |
| https://openfront.fyi/fr/guides/map-size-compact-mode/ | SEO | 保留最大地图与 Compact 关键词 |
| https://openfront.fyi/fr/guides/mirv/ | SEO | 保留成本与涨价关键词 |
| https://openfront.fyi/fr/guides/mobile-alternatives/ | SEO/入口 | 其他 Android 游戏职责，回官方玩法入口 |
| https://openfront.fyi/fr/guides/mobile-app-download/ | 事实维护 | v0.34.22 正式来源与核验日期 |
| https://openfront.fyi/fr/guides/mobile-reddit-community/ | SEO/入口 | 社区求助职责，回官方玩法入口 |
| https://openfront.fyi/fr/strategies/ | 入口 | 按开局、经济、战斗、终局直达行动 |
| https://openfront.fyi/fr/strategies/economy-fundamentals/ | 入口 | 接入 Tall vs Wide |
| https://openfront.fyi/fr/strategies/team-naval-control/ | 入口 | 接入 Island Defense |
| https://openfront.fyi/fr/strategies/team-roles/ | 入口 | 接入 Four Islands 分工 |
| https://openfront.fyi/guides/ | 入口 | 新手/手机主答案首屏与卡片元数据 |
| https://openfront.fyi/guides/first-match/ | 答案/SEO | 新手标题、摘要、官方游戏入口与后续判断 |
| https://openfront.fyi/guides/land-combat/ | 入口 | 接入 Annexation/Enclosure |
| https://openfront.fyi/guides/map-size-compact-mode/ | SEO | 保留最大地图与 Compact 关键词 |
| https://openfront.fyi/guides/mirv/ | SEO | 保留成本与涨价关键词 |
| https://openfront.fyi/guides/mobile-alternatives/ | SEO/入口 | 其他 Android 游戏职责，回官方玩法入口 |
| https://openfront.fyi/guides/mobile-app-download/ | 事实维护 | v0.34.22 正式来源与核验日期 |
| https://openfront.fyi/guides/mobile-reddit-community/ | SEO/入口 | 社区求助职责，回官方玩法入口 |
| https://openfront.fyi/nl/ | 首页 | 移动答案实际核验更新进入最新内容排序 |
| https://openfront.fyi/nl/database/maps/ | 入口 | 直达最大地图及 Compact 尺寸解释 |
| https://openfront.fyi/nl/database/units/ | 入口 | MIRV 成本行接价格阶梯 |
| https://openfront.fyi/nl/guides/ | 入口 | 新手/手机主答案首屏与卡片元数据 |
| https://openfront.fyi/nl/guides/first-match/ | 答案/SEO | 新手标题、摘要、官方游戏入口与后续判断 |
| https://openfront.fyi/nl/guides/land-combat/ | 入口 | 接入 Annexation/Enclosure |
| https://openfront.fyi/nl/guides/map-size-compact-mode/ | SEO | 保留最大地图与 Compact 关键词 |
| https://openfront.fyi/nl/guides/mirv/ | SEO | 保留成本与涨价关键词 |
| https://openfront.fyi/nl/guides/mobile-alternatives/ | SEO/入口 | 其他 Android 游戏职责，回官方玩法入口 |
| https://openfront.fyi/nl/guides/mobile-app-download/ | 事实维护 | v0.34.22 正式来源与核验日期 |
| https://openfront.fyi/nl/guides/mobile-reddit-community/ | SEO/入口 | 社区求助职责，回官方玩法入口 |
| https://openfront.fyi/nl/guides/spawn-kill-adjacent/ | 推荐元数据 | 实际渲染的 First Match 推荐标题/摘要随主答案同步 |
| https://openfront.fyi/nl/strategies/ | 入口 | 按开局、经济、战斗、终局直达行动 |
| https://openfront.fyi/nl/strategies/economy-fundamentals/ | 入口 | 接入 Tall vs Wide |
| https://openfront.fyi/nl/strategies/team-naval-control/ | 入口 | 接入 Island Defense |
| https://openfront.fyi/nl/strategies/team-roles/ | 入口 | 接入 Four Islands 分工 |
| https://openfront.fyi/strategies/ | 入口 | 按开局、经济、战斗、终局直达行动 |
| https://openfront.fyi/strategies/economy-fundamentals/ | 入口 | 接入 Tall vs Wide |
| https://openfront.fyi/strategies/team-naval-control/ | 入口 | 接入 Island Defense |
| https://openfront.fyi/strategies/team-roles/ | 入口 | 接入 Four Islands 分工 |
| https://openfront.fyi/zh/ | 首页 | 移动答案实际核验更新进入最新内容排序 |
| https://openfront.fyi/zh/database/maps/ | 入口 | 直达最大地图及 Compact 尺寸解释 |
| https://openfront.fyi/zh/database/units/ | 入口 | MIRV 成本行接价格阶梯 |
| https://openfront.fyi/zh/guides/ | 入口 | 新手/手机主答案首屏与卡片元数据 |
| https://openfront.fyi/zh/guides/first-match/ | 答案/SEO | 新手标题、摘要、官方游戏入口与后续判断 |
| https://openfront.fyi/zh/guides/land-combat/ | 入口 | 接入 Annexation/Enclosure |
| https://openfront.fyi/zh/guides/map-size-compact-mode/ | SEO | 保留最大地图与 Compact 关键词 |
| https://openfront.fyi/zh/guides/mirv/ | SEO | 保留成本与涨价关键词 |
| https://openfront.fyi/zh/guides/mobile-alternatives/ | SEO/入口 | 其他 Android 游戏职责，回官方玩法入口 |
| https://openfront.fyi/zh/guides/mobile-app-download/ | 事实维护 | v0.34.22 正式来源与核验日期 |
| https://openfront.fyi/zh/guides/mobile-reddit-community/ | SEO/入口 | 社区求助职责，回官方玩法入口 |
| https://openfront.fyi/zh/strategies/ | 入口 | 按开局、经济、战斗、终局直达行动 |
| https://openfront.fyi/zh/strategies/economy-fundamentals/ | 入口 | 接入 Tall vs Wide |
| https://openfront.fyi/zh/strategies/team-naval-control/ | 入口 | 接入 Island Defense |
| https://openfront.fyi/zh/strategies/team-roles/ | 入口 | 接入 Four Islands 分工 |

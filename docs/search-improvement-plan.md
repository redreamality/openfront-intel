# 搜索答案改善计划

更新：2026-10-09。用户已批准本批八项实施，目标是准确度量需求、让查询落到直接答案，并优先改善已有内容。

## 本批交付

| 项目 | 具体行为 | 主要实现 |
|---|---|---|
| GSC | 总数、词级指标使用 byProperty；页面诊断使用 byPage；锚点单列；点击最多和展现最多页分列；移除通用 CTR 收益预测 | fetch-search-console、Python bridge、search-console-report |
| 新手 | 五语 First Match 明确 How to Play/Tutorial；Guides 首屏直达具体步骤 | first-match、SEO 专用标题、SearchAnswerPaths |
| 移动端 | Guides 首屏直达官方浏览器/app 答案；替代游戏与社区页首屏回到正确任务；标题区分各自职责 | SearchAnswerPaths、ArticleAnswerRoutes、SEO |
| MIRV | 最终标题保留成本与涨价；单位数据库 MIRV 行链接价格阶梯解释 | SEO、UnitTable |
| 地图 | 列表首屏区分最大总网格与可用陆地，直达已有尺寸/Compact 解释；标题保留最大地图语义 | 地图数据库、SearchAnswerPaths、SEO |
| 策略 | 首屏按开局、经济、战斗、终局提供行动和阅读路径 | 五语 Strategies、SearchAnswerPaths |
| 长文入口 | 用玩家问题把五个成熟细分主题接入对应支柱页 | ArticleAnswerRoutes |
| 流程 | 已有答案维护优先；新页记录需求与缺口；无信号探索限制投入；完整窗口评价 | strategy、loop、long-form program、日更提示词 |

本批已进入 Monitoring，详细结果见 [实施报告](research/2026-10-09-search-improvements.md)。提交 `73b4347b133af8aa304b966ea4a9ec2f3754aed5` 已推送 main，[部署 37914968649](https://github.com/redreamality/openfront-intel/actions/runs/37914968649) 于 2026-10-09T10:03:23Z 成功。评价窗口为 2026-10-10 至 2026-11-06，须等待完整 GSC final 数据，固定词簇与国家/设备口径。全站 SEO 的既有 83 项问题单独记录，本批影响 URL 未命中。

## 唯一答案与相邻职责

| 查询意图 | 主答案 | 相邻职责 |
|---|---|---|
| 怎么玩 / tutorial / beginner | guides/first-match/ | guides/ 是发现入口，ffa-opening 是模式开局 |
| 手机玩 / app / download / APK | guides/mobile-app-download/ | mobile-controls 负责操作，alternatives 负责其他游戏，community 负责求助 |
| MIRV 基础与成本 | guides/mirv/ | price-ladder 解释动态价格，database/units 保留数据速查 |
| 最大地图 / Compact | guides/map-size-compact-mode/ | database/maps 是列表，maps/ 是单图攻略 |
| 通用策略 | strategies/ | 按阶段导向已有主答案，不再创建泛 tips 重复页 |

低回报文章的自然入口：First Match→Threat Assessment；Economy Fundamentals→Tall vs Wide；Land Combat→Annexation/Enclosure；Team Roles→Four Islands Team Coordination；Team Naval Control→Island Defense。现阶段保留正文，不按零点击批量删除或合并。

## 需求记录与投入门槛

新增独立页的来源包必须记录：

- 目标词簇与玩家任务；精确词和邻近词分别列明。
- GSC 属性、日期、schemaVersion、展现、点击、平均排名及数据是否有效。
- 当前落地页、现有主答案为什么无法完整承接、拟定唯一主路由。
- 一手事实来源、所需社区观察、自然入口和可验证完成定义。
- 需求类型：搜索已有信号 / 正式版本响应 / 教学探索。缓存缺失或过旧属于未知。

已有页完全承接时优先更新。只有字数不足、页面数少或日更配额不能成为新页理由。教学探索每周最多一个独立主题，仍满足新长文的来源、多语、字数与事实门槛。

## 基线与完整窗口

本批实施前的 schemaVersion 2 基线：2026-09-10 至 2026-10-07，私有文件 `.cache/gsc/retro-2026-10-09/implementation-baseline.json` 与同名 Markdown。原复盘的对照数据保存在同一忽略目录。公开仓库只记录方法和截止日，不提交词级流量明细。

实际部署日为 T；T+1 至 T+28 是第一个完整发布后窗口。等该窗口成为 GSC final 数据后再取数。各主题同时保存原查询拼写和同义词组，不临时换词制造增长。

| 主题 | 固定观察词簇 | 验收信号 |
|---|---|---|
| 新手 | guide、tutorial、how to play、对应五语入门词 | 词簇总点击与 First Match 承接改善 |
| 移动端 | mobile、app、download、APK、iPhone/Android | 官方入口承接改善；平台词、国家和 MOBILE 设备维度分别判断 |
| MIRV | MIRV cost/price、对应五语成本词 | 渲染 title 保留成本；成本主答案承接清楚，小样本继续观察 |
| 地图 | biggest/largest map、Compact、对应五语词 | 尺寸解释页承接提高，同时看词簇总点击 |
| 策略 | strategy、tips、对应五语词 | 词簇点击与相关答案的发现路径改善 |
| 细分主题 | 五个主题的精确/邻近词 | 有效曝光、点击及支柱入口；不能据缺查询判定全网无需求 |

站点级总数、查询级排名和 CTR 直接读取 byProperty。页面份额使用相同窗口、相同筛选的 byPage 数据，不与 property 分母混用。分析时固定或分别报告国家/设备范围；总体组合变化不能当作单次编辑的因果证据。

## 验证与状态

本批验证包含 GSC 聚合回归测试与真实 OAuth 拉取、核心内容审计、Astro 检查、生产构建、链接/SEO 审计，以及五语入口点击和渲染标题 e2e。已有正文的版本核验日期不因 SEO 编辑虚假刷新。

日更任务保留既有 09:00、模型、推理强度、运行项目和交付授权；只同步目标、选题与验收口径。新长文继续完整研究与多语交付，维护任务按实际差异验收。

执行提示词保存在 [automation-content-prompt.md](automation-content-prompt.md)，已同步到既有 `openfront` 日更任务。

Hermes 的 `openfront` 定时任务（`4777a6e26b00`）也已同步同一业务提示词，并保留原有 AGENTS 注入和 memory 说明。通过 `hermes cron edit` 更新后逐字段复核，仅 `prompt` 改变；每 360 分钟、启用状态、工作目录、模型/工具/通知配置及下一次运行时间保持更新前原值，未手动触发运行。

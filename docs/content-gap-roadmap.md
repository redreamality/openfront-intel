# OpenFront Intel 内容差距与扩写路线图

> 状态：历史调研基线。竞品证据和页面分工仍可参考；当前优先级、节奏与滚动计划以 [`content-strategy.md`](content-strategy.md) 为准，每日状态见 [`content-loop.md`](content-loop.md)。

审计日期：2026-07-16。

## 基线

- 我方：210 个可索引页面，5 个语言各 42 页。
- 75 篇 MDX 的英文正文合计约 7,176 words；最长常青文章约 751 words。
- OpenFront Pro sitemap 约 58 URL，擅长把地图、建筑和单一问题拆成独立落地页。
- OpenFront Wiki sitemap 约 143 URL，优势是 Nation AI、百科实体、赛事与社区档案。
- Mintlify 文档约 24 URL，覆盖本地开发、自托管、架构、寻路和地图生成器。

我方的差异化优势是五语覆盖、源码提取数据、版本与来源透明度。扩写应强化这些优势，而不是复制竞品的旧版本正文。

## 竞品证据

### OpenFront Pro

- [Beginner's Guide](https://openfrontpro.com/beginners-guide/)：约 2,200 words，覆盖前 10 分钟完整流程。
- [Attack Ratio](https://openfrontpro.com/mechanics/attack-ratio/)：独立承接“最佳攻击比例”搜索意图。
- [Population Growth](https://openfrontpro.com/mechanics/population-growth/)：增长甜区、工人/军队比例与城市上限。
- [Port](https://openfrontpro.com/buildings/port/)：成本、贸易公式与距离例子。
- [Hotkeys](https://openfrontpro.com/mechanics/hotkeys/)：按场景拆成多张速查表。

其地图与建筑实体页数量多，但不少仅 70–600 words，且抽样仍引用 v23/2024。我们的机会是用当前源码数据、验证日期、公式和实战例子做更可靠的实体页。

### OpenFront Wiki

- [Attacking Guide](https://openfront.wiki/Attacking_Guide/)：攻击公式与人口增长推导，但资料版本偏旧。
- [Nations](https://openfront.wiki/Nations/)：AI 关系值、结盟、背叛、建筑顺序与难度阈值。
- [Communication](https://openfront.wiki/Communication/)：表情与 Nation 关系分、AI 事件回应。
- [Terrain](https://openfront.wiki/Terrain/)：地形倍率与战术影响。
- [Game Settings](https://openfront.wiki/Game_Settings/)：私人大厅设置。
- [Update History](https://openfront.wiki/Update_History/)：版本历史入口。

其优势是百科互链、搜索、赛事档案和社区记忆；弱点是版本新鲜度不一。任何 AI、赛事或设置内容都必须在我方标注源码位置、适用版本和最后核验日期。

### Mintlify 文档

- [Quick Start](https://mintlify.wiki/openfrontio/OpenFrontIO/quickstart)
- [Strategies](https://mintlify.wiki/openfrontio/OpenFrontIO/guides/strategies)
- [Pathfinding](https://mintlify.wiki/openfrontio/OpenFrontIO/systems/pathfinding)
- [Intent / Execution](https://mintlify.wiki/openfrontio/OpenFrontIO/systems/intents-executions)
- [Server Architecture](https://mintlify.wiki/openfrontio/OpenFrontIO/technical/server)
- [Map Generator](https://mintlify.wiki/openfrontio/OpenFrontIO/map-generator/usage)

它覆盖开发者长尾，但部分端口与命令描述互相冲突。开发者专区只能基于当前 upstream 文件实测后编写。

## P0 内容集群

| 集群 | 建议路由 | 核心搜索意图 | 建议篇幅 |
|---|---|---|---:|
| 新手支柱 | `/guides/first-match/` | how to play OpenFront、beginner guide、first 10 minutes | 8k–12k 支柱页 |
| 攻击比例 | `/guides/attack-ratio/` | best attack ratio、casualties、attack efficiency | 2k–4k |
| 人口增长 | `/guides/population-growth/` | population growth、worker ratio、sweet spot | 2k–4k |
| 出生点 | `/guides/best-starting-position/` | best spawn、coast vs inland、expansion room | 2k–4k |
| 包围吞并 | `/guides/annexation-enclosure/` | annex、enclose、capture territory | 2k–4k |
| Nation AI | `/mechanics/nations/` | bot vs nation、alliance refusal、betrayal、difficulty | 4k–8k |
| 地图实体 | `/maps/{slug}/` | map name + strategy/spawn/naval | 每图 1.5k–3k |
| 单位实体 | `/units/{slug}/` | unit cost/stats/how to use/counter | 每单位 1.5k–3k |
| 建筑实体 | `/structures/{slug}/` | building cost/upgrade/formula/when to build | 每建筑 1.5k–3k |

## P1 / P2 内容集群

- 私人大厅设置百科：模式、AI 数量、地图、队伍、随机修饰符和胜利条件。
- 经源码验证的地图制作教程：资源格式、生成器、预览、测试与提交。
- 开发者专区：确定性 tick、Intent/Execution、Web Worker、服务器消息转发、寻路和测试。
- 贸易与铁路工具页：Port 收益、Train ROI、贸易船上限与路线对比。
- 赛事、Clan、创作者与旗帜档案：只有建立稳定数据来源和更新责任后再上线。

## 关键词边界

为避免页面互相竞争，以下页面必须明确分工：

- `/shortcuts/`：可打印、可扫描的即时按键表。
- `/guides/hotkeys/`：连续建造、选中、镜头和实战操作工作流。
- `/database/units/`：全单位横向数值速查。
- `/mechanics/units/`：单位类别、互动规则与系统解释。
- `/units/{slug}/`：单个单位的成本、用途、克制与 FAQ。
- `/mechanics/nukes/`：核武和 SAM 的系统规则。
- `/guides/water-nukes/`：Water Nukes 的触发、用法与误解。
- `/strategies/nuclear-deterrence/`：核威慑、二次打击和 SAM 布局决策。

## 篇幅策略

竞品并不支持“所有页面统一 10,000 words”：Pro 多数专项页约 70–600 words，Wiki 多数约 400–900，Mintlify 多数约 600–1,700。统一灌长会稀释答案、增加翻译漂移，并让相近页面争夺同一关键词。

建议采用两层结构：

1. 少数支柱页达到 8,000–12,000 words，完整覆盖用户旅程。
2. 大量单一意图专题页保持 1,500–4,000 words，以信息增量、公式、例子、FAQ 和内链为完成标准。

不纳入 10,000-word 目标：索引页、数据库速查、法律页、联系页、404，以及只能依据官方 Release 正文的 changelog。

中文应按“汉字/有效内容长度”单独计量，不应把空格分词规则直接套到中文。

## 每篇常青文章的统一结构

1. 40–80 words 的直接答案。
2. 适用版本、数据来源和最后核验日期。
3. 核心概念与前置知识。
4. 决策规则、公式与数据表。
5. 分步实战流程。
6. 至少两个数字化场景例子。
7. 常见失败模式与反例。
8. 对手反制与调整方法。
9. 长尾 FAQ。
10. 下一步阅读路径。

每段尽量控制在 240 个字符以内，先写英文事实母稿，再本地化到 fr/de/nl/zh，并逐语种检查术语和数字一致性。

## Search Console 驱动流程

1. 运行 `pnpm gsc:queries -- --days 7`。
2. 将同义 Query 合并为“搜索意图”，而不是逐词新建页面。
3. 排名 1–3 且低 CTR：优先改 title/description。
4. 排名 4–10：在现有页增加精准答案、FAQ 与内部链接。
5. 排名 11–30：判断是扩写现有支柱页，还是创建独立专题页。
6. 每个意图只能有一个主落地页；其他页面用内部链接支持它。

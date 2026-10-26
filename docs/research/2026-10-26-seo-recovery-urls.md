# SEO 恢复：实际生产 URL 变更清单

基线 1010 个 HTML；最终 1010 个 HTML。按完整生产 HTML 比较，变更 URL 去重总数：**1005**；其中内容结构变化 102，仅资源指纹/格式变化 903。

比较范围为两个构建目录中的全部 HTML，包含错误页与重定向 HTML（若存在）；URL 按实际输出文件映射，不把 canonical 目的地重复算作本页。每个 URL 只出现一次；同页可以同时有多个变更类型，因此分类数不可相加。

类型：直接内容 35；入口 20；相关推荐 15；共享组件 938。

内容结构比较保留文案、链接、属性与 DOM 层级，忽略注释、空白、Astro scope 标识与构建资源指纹；完整字节变化仍全部列出。相关推荐通过包含 data-continue-reading 的 section 识别。归因是输出区域差异，不代表排名因果。

| 绝对 URL | 变更类型 | 原因 |
| --- | --- | --- |
| https://openfront.fyi/404.html | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/about/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v24/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v25/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v26/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v27/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v28/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v29/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v30/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v31/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v32/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v33/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v34/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/changelog/v35/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/contact/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/database/formulas/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/database/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/database/maps/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/database/structures/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/database/units/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/de/404/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/about/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v24/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v25/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v26/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v27/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v28/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v29/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v30/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v31/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v32/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v33/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v34/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/changelog/v35/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/contact/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/database/formulas/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/database/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/de/database/maps/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/database/structures/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/de/database/units/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/de/editorial-policy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/faq/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/glossary/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/adaptive-build-order/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/afk-teammate-takeover/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ai-nation-nuke-targeting/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/alliance-break-timing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/annexation-enclosure/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/attack-ratio/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/attacker-regrow-advantage/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/black-sea-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/brainrot/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/building-timing/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/de/guides/bulk-structure-upgrades/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/cape-cod/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/caps-vs-plutonium/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/choose-your-spawn/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/clan-membership/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/clan-treasury-donations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/clan-wars/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/coastal-boat-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/conquest-gold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/costly-elimination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/crown-position-mirv-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/defense-posts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/doomsday-clock/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/doomsday-endgame-recovery/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/doomsday-vs-overtime/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/early-expansion-rhythm/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/embargo-retaliation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/embargo-timing-and-trade-control/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/europe-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/factory-economy-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/factory-upgrades/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/de/guides/ffa-deterrence-posture/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ffa-endgame-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ffa-focus-crown-endgame/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ffa-midgame-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ffa-runaway-leader/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ffa-trapped-middle/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/first-match/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/de/guides/first-player-push/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/four-islands-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/four-islands-team-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/frontload-port-factory-investment/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/hotkeys/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/how-many-factories/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/de/guides/how-many-ports-to-build/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/impossible-singleplayer/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/in-game-gold-rates/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/in-match-gold-donation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/de/guides/island-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/land-combat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/list-lobbies/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/live-spectator-mode/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/lobby-pool-routing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/lobby-size-map-driven/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/madagascar-water-nuke-map/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/map-layers-space-terrain/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/map-size-compact-mode/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/de/guides/map-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/micro-boat-spam/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/midgame-island-comeback/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/midgame-survival-low-threat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/mirv-launch-timing-cold-war/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/mirv-price-ladder/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/mirv/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/de/guides/mitochondria-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/mobile-alternatives/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/mobile-app-download/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/de/guides/mobile-controls/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/mobile-reddit-community/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/multi-front-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nation-alliance-decisions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nation-beachhead-doctrine/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nation-difficulty/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nation-strike-protocol/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nations-pressure/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/naval-stalemate-blockade-anti-blockade/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/near-parity-combat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/no-alliances-mode/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/no-mans-land-fallout/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nuclear-salvo-sizing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nuclear-stalemate-breaker/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nuke-alliance-threshold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nuke-barrage-vs-sam-wall/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nuke-calculator/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nuke-cut-territory-annexation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nuke-defense-protocol/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nuke-evacuation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nuke-flight-trajectory/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/nuke-to-ground-transition/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ommatrypta/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/openfront-public-profile-privacy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/outgunned-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/overtime-yolo-fullsend/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/pay-queue-placement/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/player-levels-xp-prestige/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/population-growth/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/port-vs-factory/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/de/guides/post-mirv-recovery/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/post-nuclear-port-sustain/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/public-special-lobbies/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/quick-chat-team-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ranked-1v1/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ranked-2v2/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ranked-ffa/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/ranked-mode-rating-system/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/reacting-to-ally-betrayal/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/reading-the-board/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/recall-or-cancel-attacks/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/replay-review/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/de/guides/sam-launchers/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/sam-targeting-priority/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/seekable-replay-viewer/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/de/guides/sit-at-max-troops/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/spawn-kill-adjacent/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/stack-vs-spread/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/steam-early-access/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/strait-of-gibraltar-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/structure-capture-denial/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/sub-hundred-elimination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/tall-vs-wide/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/team-economy-space/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/team-spawn-formation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/team-trade-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/team-victory-threshold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/terra-nullius-capture/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/terrain-systems/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/territory-attack-speed/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/threat-assessment/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/trade-route-chokepoint/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/trade-ship-destinations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/trade-vs-piracy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/train-network/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/transport-landings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/tribes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/troop-bar-attack-timing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/trusted-accounts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/v035-ai-alliance-behavior/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/v035-new-maps-overview/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/v035-small-economy-spawn-boost/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/v35-nations-naval-doctrine/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/warship-fleet-decisions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/warship-veterancy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/water-nukes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/what-do-factories-do/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/de/guides/which-nuke-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/win-conditions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/winning-overtime/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/world-map-ffa-spawns/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/guides/yangtze-river-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/de/maps/dyslexdria/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/maps/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/maps/svalmel/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/alliances/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/basics/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/economy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/military/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/modes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/nations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/nukes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/structures/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/de/mechanics/trade/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/trains/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/mechanics/units/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/privacy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/shortcuts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/strategies/diplomacy-betrayal/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/strategies/economy-fundamentals/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/strategies/ffa-opening/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/strategies/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/de/strategies/nuclear-deterrence/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/strategies/recovery-playbook/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/strategies/team-naval-control/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/strategies/team-roles/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/de/whats-new/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/editorial-policy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/faq/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/404/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/about/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v24/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v25/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v26/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v27/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v28/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v29/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v30/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v31/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v32/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v33/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v34/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/changelog/v35/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/contact/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/database/formulas/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/database/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/fr/database/maps/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/database/structures/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/fr/database/units/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/fr/editorial-policy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/faq/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/glossary/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/adaptive-build-order/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/afk-teammate-takeover/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ai-nation-nuke-targeting/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/alliance-break-timing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/annexation-enclosure/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/attack-ratio/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/attacker-regrow-advantage/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/black-sea-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/brainrot/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/building-timing/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/fr/guides/bulk-structure-upgrades/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/cape-cod/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/caps-vs-plutonium/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/choose-your-spawn/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/clan-membership/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/clan-treasury-donations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/clan-wars/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/coastal-boat-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/conquest-gold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/costly-elimination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/crown-position-mirv-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/defense-posts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/doomsday-clock/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/doomsday-endgame-recovery/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/doomsday-vs-overtime/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/early-expansion-rhythm/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/embargo-retaliation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/embargo-timing-and-trade-control/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/europe-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/factory-economy-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/factory-upgrades/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/fr/guides/ffa-deterrence-posture/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ffa-endgame-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ffa-focus-crown-endgame/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ffa-midgame-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ffa-runaway-leader/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ffa-trapped-middle/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/first-match/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/fr/guides/first-player-push/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/four-islands-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/four-islands-team-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/frontload-port-factory-investment/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/hotkeys/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/how-many-factories/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/fr/guides/how-many-ports-to-build/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/impossible-singleplayer/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/in-game-gold-rates/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/in-match-gold-donation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/fr/guides/island-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/land-combat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/list-lobbies/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/live-spectator-mode/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/lobby-pool-routing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/lobby-size-map-driven/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/madagascar-water-nuke-map/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/map-layers-space-terrain/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/map-size-compact-mode/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/fr/guides/map-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/micro-boat-spam/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/midgame-island-comeback/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/midgame-survival-low-threat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/mirv-launch-timing-cold-war/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/mirv-price-ladder/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/mirv/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/fr/guides/mitochondria-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/mobile-alternatives/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/mobile-app-download/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/fr/guides/mobile-controls/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/mobile-reddit-community/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/multi-front-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nation-alliance-decisions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nation-beachhead-doctrine/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nation-difficulty/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nation-strike-protocol/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nations-pressure/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/naval-stalemate-blockade-anti-blockade/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/near-parity-combat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/no-alliances-mode/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/no-mans-land-fallout/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nuclear-salvo-sizing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nuclear-stalemate-breaker/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nuke-alliance-threshold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nuke-barrage-vs-sam-wall/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nuke-calculator/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nuke-cut-territory-annexation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nuke-defense-protocol/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nuke-evacuation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nuke-flight-trajectory/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/nuke-to-ground-transition/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ommatrypta/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/openfront-public-profile-privacy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/outgunned-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/overtime-yolo-fullsend/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/pay-queue-placement/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/player-levels-xp-prestige/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/population-growth/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/port-vs-factory/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/fr/guides/post-mirv-recovery/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/post-nuclear-port-sustain/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/public-special-lobbies/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/quick-chat-team-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ranked-1v1/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ranked-2v2/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ranked-ffa/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/ranked-mode-rating-system/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/reacting-to-ally-betrayal/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/reading-the-board/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/recall-or-cancel-attacks/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/replay-review/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/fr/guides/sam-launchers/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/sam-targeting-priority/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/seekable-replay-viewer/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/fr/guides/sit-at-max-troops/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/spawn-kill-adjacent/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/stack-vs-spread/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/steam-early-access/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/strait-of-gibraltar-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/structure-capture-denial/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/sub-hundred-elimination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/tall-vs-wide/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/team-economy-space/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/team-spawn-formation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/team-trade-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/team-victory-threshold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/terra-nullius-capture/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/terrain-systems/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/territory-attack-speed/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/threat-assessment/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/trade-route-chokepoint/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/trade-ship-destinations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/trade-vs-piracy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/train-network/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/transport-landings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/tribes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/troop-bar-attack-timing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/trusted-accounts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/v035-ai-alliance-behavior/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/v035-new-maps-overview/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/v035-small-economy-spawn-boost/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/v35-nations-naval-doctrine/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/warship-fleet-decisions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/warship-veterancy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/water-nukes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/what-do-factories-do/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/fr/guides/which-nuke-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/win-conditions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/winning-overtime/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/world-map-ffa-spawns/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/guides/yangtze-river-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/fr/maps/dyslexdria/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/maps/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/maps/svalmel/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/alliances/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/basics/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/economy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/military/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/modes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/nations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/nukes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/structures/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/fr/mechanics/trade/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/trains/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/mechanics/units/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/privacy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/shortcuts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/strategies/diplomacy-betrayal/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/strategies/economy-fundamentals/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/strategies/ffa-opening/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/strategies/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/fr/strategies/nuclear-deterrence/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/strategies/recovery-playbook/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/strategies/team-naval-control/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/strategies/team-roles/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/fr/whats-new/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/glossary/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/adaptive-build-order/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/afk-teammate-takeover/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ai-nation-nuke-targeting/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/alliance-break-timing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/annexation-enclosure/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/attack-ratio/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/attacker-regrow-advantage/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/black-sea-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/brainrot/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/building-timing/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/guides/bulk-structure-upgrades/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/cape-cod/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/caps-vs-plutonium/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/choose-your-spawn/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/clan-membership/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/clan-treasury-donations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/clan-wars/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/coastal-boat-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/conquest-gold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/costly-elimination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/crown-position-mirv-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/defense-posts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/doomsday-clock/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/doomsday-endgame-recovery/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/doomsday-vs-overtime/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/early-expansion-rhythm/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/embargo-retaliation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/embargo-timing-and-trade-control/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/europe-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/factory-economy-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/factory-upgrades/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/guides/ffa-deterrence-posture/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ffa-endgame-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ffa-focus-crown-endgame/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ffa-midgame-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ffa-runaway-leader/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ffa-trapped-middle/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/first-match/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/guides/first-player-push/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/four-islands-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/four-islands-team-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/frontload-port-factory-investment/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/hotkeys/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/how-many-factories/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/guides/how-many-ports-to-build/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/impossible-singleplayer/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/in-game-gold-rates/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/in-match-gold-donation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/guides/island-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/land-combat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/list-lobbies/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/live-spectator-mode/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/lobby-pool-routing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/lobby-size-map-driven/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/madagascar-water-nuke-map/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/map-layers-space-terrain/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/map-size-compact-mode/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/guides/map-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/micro-boat-spam/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/midgame-island-comeback/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/midgame-survival-low-threat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/mirv-launch-timing-cold-war/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/mirv-price-ladder/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/mirv/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/guides/mitochondria-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/mobile-alternatives/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/mobile-app-download/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/guides/mobile-controls/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/mobile-reddit-community/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/multi-front-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nation-alliance-decisions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nation-beachhead-doctrine/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nation-difficulty/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nation-strike-protocol/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nations-pressure/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/naval-stalemate-blockade-anti-blockade/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/near-parity-combat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/no-alliances-mode/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/no-mans-land-fallout/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nuclear-salvo-sizing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nuclear-stalemate-breaker/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nuke-alliance-threshold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nuke-barrage-vs-sam-wall/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nuke-calculator/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nuke-cut-territory-annexation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nuke-defense-protocol/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nuke-evacuation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nuke-flight-trajectory/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/nuke-to-ground-transition/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ommatrypta/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/openfront-public-profile-privacy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/outgunned-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/overtime-yolo-fullsend/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/pay-queue-placement/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/player-levels-xp-prestige/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/population-growth/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/port-vs-factory/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/guides/post-mirv-recovery/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/post-nuclear-port-sustain/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/public-special-lobbies/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/quick-chat-team-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ranked-1v1/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ranked-2v2/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ranked-ffa/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/ranked-mode-rating-system/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/reacting-to-ally-betrayal/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/reading-the-board/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/recall-or-cancel-attacks/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/replay-review/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/guides/sam-launchers/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/sam-targeting-priority/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/seekable-replay-viewer/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/guides/sit-at-max-troops/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/spawn-kill-adjacent/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/stack-vs-spread/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/steam-early-access/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/strait-of-gibraltar-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/structure-capture-denial/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/sub-hundred-elimination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/tall-vs-wide/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/team-economy-space/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/team-spawn-formation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/team-trade-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/team-victory-threshold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/terra-nullius-capture/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/terrain-systems/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/territory-attack-speed/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/threat-assessment/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/trade-route-chokepoint/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/trade-ship-destinations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/trade-vs-piracy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/train-network/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/transport-landings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/tribes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/troop-bar-attack-timing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/trusted-accounts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/v035-ai-alliance-behavior/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/v035-new-maps-overview/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/v035-small-economy-spawn-boost/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/v35-nations-naval-doctrine/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/warship-fleet-decisions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/warship-veterancy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/water-nukes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/what-do-factories-do/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/guides/which-nuke-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/win-conditions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/winning-overtime/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/world-map-ffa-spawns/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/guides/yangtze-river-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/maps/dyslexdria/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/maps/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/maps/svalmel/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/alliances/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/basics/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/economy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/military/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/modes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/nations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/nukes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/structures/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/mechanics/trade/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/trains/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/mechanics/units/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/404/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/about/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v24/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v25/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v26/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v27/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v28/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v29/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v30/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v31/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v32/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v33/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v34/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/changelog/v35/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/contact/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/database/formulas/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/database/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/nl/database/maps/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/database/structures/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/nl/database/units/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/nl/editorial-policy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/faq/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/glossary/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/adaptive-build-order/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/afk-teammate-takeover/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/ai-nation-nuke-targeting/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/alliance-break-timing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/annexation-enclosure/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/attack-ratio/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/attacker-regrow-advantage/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/black-sea-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/brainrot/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/building-timing/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/nl/guides/bulk-structure-upgrades/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/cape-cod/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/caps-vs-plutonium/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/choose-your-spawn/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/clan-membership/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/clan-treasury-donations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/clan-wars/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/coastal-boat-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/conquest-gold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/costly-elimination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/crown-position-mirv-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/defense-posts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/doomsday-clock/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/doomsday-endgame-recovery/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/doomsday-vs-overtime/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/early-expansion-rhythm/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/embargo-retaliation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/embargo-timing-and-trade-control/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/europe-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/factory-economy-commit/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/factory-upgrades/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/nl/guides/ffa-deterrence-posture/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ffa-endgame-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ffa-focus-crown-endgame/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ffa-midgame-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ffa-runaway-leader/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ffa-trapped-middle/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/first-match/ | 相关推荐、直接内容 | 继续阅读/相关推荐卡片的链接、文案或顺序变化；文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/nl/guides/first-player-push/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/four-islands-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/four-islands-team-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/frontload-port-factory-investment/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/hotkeys/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/how-many-factories/ | 相关推荐、直接内容 | 继续阅读/相关推荐卡片的链接、文案或顺序变化；文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/nl/guides/how-many-ports-to-build/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/impossible-singleplayer/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/in-game-gold-rates/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/in-match-gold-donation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/nl/guides/island-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/land-combat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/list-lobbies/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/live-spectator-mode/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/lobby-pool-routing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/lobby-size-map-driven/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/madagascar-water-nuke-map/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/map-layers-space-terrain/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/map-size-compact-mode/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/nl/guides/map-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/micro-boat-spam/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/midgame-island-comeback/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/midgame-survival-low-threat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/mirv-launch-timing-cold-war/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/mirv-price-ladder/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/mirv/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/nl/guides/mitochondria-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/mobile-alternatives/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/mobile-app-download/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/nl/guides/mobile-controls/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/mobile-reddit-community/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/multi-front-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nation-alliance-decisions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nation-beachhead-doctrine/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nation-difficulty/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nation-strike-protocol/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nations-pressure/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/naval-stalemate-blockade-anti-blockade/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/near-parity-combat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/no-alliances-mode/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/no-mans-land-fallout/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nuclear-salvo-sizing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nuclear-stalemate-breaker/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nuke-alliance-threshold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nuke-barrage-vs-sam-wall/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nuke-calculator/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nuke-cut-territory-annexation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nuke-defense-protocol/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nuke-evacuation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nuke-flight-trajectory/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/nuke-to-ground-transition/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ommatrypta/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/openfront-public-profile-privacy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/outgunned-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/overtime-yolo-fullsend/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/pay-queue-placement/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/player-levels-xp-prestige/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/population-growth/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/port-vs-factory/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/nl/guides/post-mirv-recovery/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/post-nuclear-port-sustain/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/public-special-lobbies/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/quick-chat-team-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ranked-1v1/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ranked-2v2/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ranked-ffa/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/ranked-mode-rating-system/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/reacting-to-ally-betrayal/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/reading-the-board/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/recall-or-cancel-attacks/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/replay-review/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/nl/guides/sam-launchers/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/sam-targeting-priority/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/seekable-replay-viewer/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/nl/guides/sit-at-max-troops/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/spawn-kill-adjacent/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/stack-vs-spread/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/steam-early-access/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/strait-of-gibraltar-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/structure-capture-denial/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/sub-hundred-elimination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/tall-vs-wide/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/team-economy-space/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/team-spawn-formation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/team-trade-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/team-victory-threshold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/terra-nullius-capture/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/terrain-systems/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/territory-attack-speed/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/threat-assessment/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/trade-route-chokepoint/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/trade-ship-destinations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/trade-vs-piracy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/train-network/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/transport-landings/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/tribes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/troop-bar-attack-timing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/trusted-accounts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/v035-ai-alliance-behavior/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/v035-new-maps-overview/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/v035-small-economy-spawn-boost/ | 相关推荐 | 继续阅读/相关推荐卡片的链接、文案或顺序变化 |
| https://openfront.fyi/nl/guides/v35-nations-naval-doctrine/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/warship-fleet-decisions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/warship-veterancy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/water-nukes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/what-do-factories-do/ | 相关推荐、直接内容 | 继续阅读/相关推荐卡片的链接、文案或顺序变化；文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/nl/guides/which-nuke-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/win-conditions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/winning-overtime/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/world-map-ffa-spawns/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/guides/yangtze-river-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/nl/maps/dyslexdria/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/maps/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/maps/svalmel/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/alliances/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/basics/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/economy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/military/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/modes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/nations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/nukes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/structures/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/nl/mechanics/trade/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/trains/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/mechanics/units/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/privacy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/shortcuts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/strategies/diplomacy-betrayal/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/strategies/economy-fundamentals/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/strategies/ffa-opening/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/strategies/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/nl/strategies/nuclear-deterrence/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/strategies/recovery-playbook/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/strategies/team-naval-control/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/strategies/team-roles/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/nl/whats-new/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/privacy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/shortcuts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/strategies/diplomacy-betrayal/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/strategies/economy-fundamentals/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/strategies/ffa-opening/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/strategies/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/strategies/nuclear-deterrence/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/strategies/recovery-playbook/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/strategies/team-naval-control/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/strategies/team-roles/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/whats-new/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/404/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/about/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v24/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v25/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v26/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v27/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v28/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v29/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v30/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v31/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v32/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v33/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v34/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/changelog/v35/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/contact/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/database/formulas/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/database/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/zh/database/maps/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/database/structures/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/zh/database/units/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/zh/editorial-policy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/faq/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/glossary/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/adaptive-build-order/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/afk-teammate-takeover/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ai-nation-nuke-targeting/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/alliance-break-timing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/annexation-enclosure/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/attack-ratio/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/attacker-regrow-advantage/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/black-sea-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/brainrot/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/building-timing/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/zh/guides/bulk-structure-upgrades/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/cape-cod/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/caps-vs-plutonium/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/choose-your-spawn/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/clan-membership/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/clan-treasury-donations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/clan-wars/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/coastal-boat-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/conquest-gold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/costly-elimination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/crown-position-mirv-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/defense-posts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/doomsday-clock/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/doomsday-endgame-recovery/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/doomsday-vs-overtime/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/early-expansion-rhythm/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/embargo-retaliation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/embargo-timing-and-trade-control/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/europe-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/factory-economy-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/factory-upgrades/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/zh/guides/ffa-deterrence-posture/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ffa-endgame-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ffa-focus-crown-endgame/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ffa-midgame-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ffa-runaway-leader/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ffa-trapped-middle/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/first-match/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/zh/guides/first-player-push/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/four-islands-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/four-islands-team-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/frontload-port-factory-investment/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/hotkeys/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/how-many-factories/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/zh/guides/how-many-ports-to-build/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/impossible-singleplayer/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/in-game-gold-rates/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/in-match-gold-donation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/zh/guides/island-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/land-combat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/list-lobbies/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/live-spectator-mode/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/lobby-pool-routing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/lobby-size-map-driven/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/madagascar-water-nuke-map/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/map-layers-space-terrain/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/map-size-compact-mode/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/zh/guides/map-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/micro-boat-spam/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/midgame-island-comeback/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/midgame-survival-low-threat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/mirv-launch-timing-cold-war/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/mirv-price-ladder/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/mirv/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/zh/guides/mitochondria-strategy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/mobile-alternatives/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/mobile-app-download/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/zh/guides/mobile-controls/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/mobile-reddit-community/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/multi-front-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nation-alliance-decisions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nation-beachhead-doctrine/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nation-difficulty/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nation-strike-protocol/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nations-pressure/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/naval-stalemate-blockade-anti-blockade/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/near-parity-combat/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/no-alliances-mode/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/no-mans-land-fallout/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nuclear-salvo-sizing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nuclear-stalemate-breaker/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nuke-alliance-threshold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nuke-barrage-vs-sam-wall/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nuke-calculator/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nuke-cut-territory-annexation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nuke-defense-protocol/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nuke-evacuation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nuke-flight-trajectory/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/nuke-to-ground-transition/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ommatrypta/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/openfront-public-profile-privacy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/outgunned-defense/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/overtime-yolo-fullsend/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/pay-queue-placement/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/player-levels-xp-prestige/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/population-growth/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/port-vs-factory/ | 共享组件 | 正文之外的答案组件、数据库表格、布局或共享标记变化 |
| https://openfront.fyi/zh/guides/post-mirv-recovery/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/post-nuclear-port-sustain/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/public-special-lobbies/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/quick-chat-team-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ranked-1v1/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ranked-2v2/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ranked-ffa/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/ranked-mode-rating-system/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/reacting-to-ally-betrayal/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/reading-the-board/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/recall-or-cancel-attacks/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/replay-review/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/zh/guides/sam-launchers/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/sam-targeting-priority/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/seekable-replay-viewer/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/zh/guides/sit-at-max-troops/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/spawn-kill-adjacent/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/stack-vs-spread/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/steam-early-access/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/strait-of-gibraltar-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/structure-capture-denial/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/sub-hundred-elimination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/tall-vs-wide/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/team-economy-space/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/team-spawn-formation/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/team-trade-coordination/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/team-victory-threshold/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/terra-nullius-capture/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/terrain-systems/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/territory-attack-speed/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/threat-assessment/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/trade-route-chokepoint/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/trade-ship-destinations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/trade-vs-piracy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/train-network/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/transport-landings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/tribes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/troop-bar-attack-timing/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/trusted-accounts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/v035-ai-alliance-behavior/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/v035-new-maps-overview/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/v035-small-economy-spawn-boost/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/v35-nations-naval-doctrine/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/warship-fleet-decisions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/warship-veterancy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/water-nukes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/what-do-factories-do/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/zh/guides/which-nuke-commit/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/win-conditions/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/winning-overtime/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/world-map-ffa-spawns/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/guides/yangtze-river-ffa-openings/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/zh/maps/dyslexdria/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/maps/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/maps/svalmel/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/alliances/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/basics/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/economy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/military/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/modes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/nations/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/nukes/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/structures/ | 直接内容 | 文章正文、文章头部元数据或 SEO title 变化 |
| https://openfront.fyi/zh/mechanics/trade/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/trains/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/mechanics/units/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/privacy/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/shortcuts/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/strategies/diplomacy-betrayal/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/strategies/economy-fundamentals/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/strategies/ffa-opening/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/strategies/ | 入口 | 首页或栏目索引的内容入口、卡片、标题或更新时间发生变化 |
| https://openfront.fyi/zh/strategies/nuclear-deterrence/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/strategies/recovery-playbook/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/strategies/team-naval-control/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/strategies/team-roles/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |
| https://openfront.fyi/zh/whats-new/ | 共享组件 | 仅构建资源指纹、Astro scope 标识、注释或空白变化；未检测到内容结构变化 |

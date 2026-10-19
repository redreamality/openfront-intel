# 核弹切地攻略：正式 v35 边界与捕获条件维护

研究日期：2026-10-20（Asia/Vladivostok）。任务类型：已有主答案事实维护 / 正式版本响应。生产与交付状态由主任务记录；本文不把本地编辑当作线上交付。

## 需求与唯一答案

- 玩家任务：判断核弹切下的敌方领土能否被吞并、由谁接收，以及适用版本。目标词簇：nuke annexation、nuke cut territory、severed territory，以及五语对应意图；本轮不声称已有精确查询流量。
- 唯一主答案：`/guides/nuke-cut-territory-annexation/`，对应 en/zh/fr/de/nl 五语已有页。现有页面已覆盖问题，不新建独立页。`annexation-enclosure` 继续负责一般包围，核弹计算器继续负责核打击成本。
- 缺口：原文把机制限定为 v0.35.0-beta1/beta2，并称当前稳定版本仍为 v0.34.25。正式 v0.35.0 已于 2026-10-16 发布，因此需要维护；进一步核验发现捕获优先级、辐射归属、单位地块黄金收入与最后领土场景也存在错误。
- GSC：沿用父任务已核对的 schemaVersion 2 缓存，数据窗口 2026-10-06 至 2026-10-12，下次刷新日 2026-10-22，今日未到期。本轮不刷新、不把未知当零需求。站点与查询指标只取 byProperty，queryPage 只用于 byPage 落地页诊断，锚点单列。本文不复制私有词级指标。
- 既有 2026-10-09 搜索改善批次的 T+1..T+28 窗口为 2026-10-10 至 2026-11-06，尚未完整，不能把本次维护前后差异解释成编辑因果。
- 自然入口：保留既有攻略入口及与一般包围、核弹计算器、无人区/辐射、MIRV 的互链；只在现有入口含过时 beta 说法时修正文案。
- 投入边界：本轮不是新长文，不适用新增 3 Reddit + 3 YouTube 来源配额、600 英文研究词配额或新页 1500 词交付门槛。既有正文被改动的小节仍需遵守项目正文小节门槛，并按实际差异审计。

## 一手证据与版本

2026-10-20 使用官方 GitHub REST API 读取 Release 与 tag ref，并与本地 `../OpenFrontIO` 现存 tag 对照：

| Tag | 官方 ref 的 commit SHA（与本地一致） | 正式 Release |
|---|---|---|
| v0.34.25 | `dfd9e478b64d92fa25f95597b8cb81d8adee004d` | 仅作为旧源码比较基线，本轮未重新研究其 Release 正文 |
| v0.35.0 | `dfd420fd7836ae023504a9440d9d68897745b7b4` | `draft=false`、`prerelease=false`；`published_at=2026-10-16T17:06:49Z` |
| v0.35.2 | `08b63c054897c030e6516e0731ab7cc62b2998b7` | `draft=false`、`prerelease=false`；`published_at=2026-10-17T05:34:47Z` |

官方来源：

1. [v0.35.0 正式 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0)：真实正文的 “Nukes annex again” 和 Gameplay & Balance 均明确描述核弹切下领土再次交给周围敌方；不是 TEST 占位。
2. [v0.35.2 正式 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.2)：顶部补丁为建造预览与踢人修复，下面保留 v0.35.0 的核弹吞并说明。页面日期写 October 16；API 发布时刻实际是 October 17 UTC，涉及发布时间时使用 API 具体时刻。
3. [v0.35.0 官方 tag ref](https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.35.0)。
4. [v0.35.2 官方 tag ref](https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.35.2)。
5. [v0.34.25 官方 tag ref](https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.34.25)。
6. [v0.35.2 PlayerExecution.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/execution/PlayerExecution.ts)。
7. [v0.35.0 PlayerExecution.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.35.0/packages/engine/src/execution/PlayerExecution.ts)。
8. [v0.35.0-beta2 PlayerExecution.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.35.0-beta2/packages/engine/src/execution/PlayerExecution.ts)。
9. [v0.34.25 PlayerExecution.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/core/execution/PlayerExecution.ts)。
10. [v0.35.2 官方核切吞并测试](https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/tests/core/executions/NukeSeveredAnnexation.test.ts)。
11. [v0.35.2 getMode](https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine-lib/src/Util.ts#L187-L199)。
12. [v0.35.2 基础黄金增长](https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/configuration/EngineConfig.ts#L668-L677)。
13. [v0.35.2 PlayerImpl.isFriendly](https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/game/PlayerImpl.ts#L1303-L1311)。

已确认 `git diff v0.35.0-beta2 v0.35.0 -- packages/engine/src/execution/PlayerExecution.ts` 和 `git diff v0.35.0 v0.35.2 -- packages/engine/src/execution/PlayerExecution.ts` 均为空。以下捕获优先级在 beta2 已存在，不能把纠正原文误读描述成正式 v35 才新增的行为。v0.34.25 有旧 `getCapturingPlayer`，没有新增 `annexSeveredClusters` / `severedTerritory` 路径；不能声称旧版完全不存在任何包围吞并。

## 精确条件与正文修正依据

### 连通性与辐射

`severedLand`（约 L395-L530）以真实领土面积选主体，不以边界长度选主体；沿原主四邻接土地识别领土，只有角接触不等于连通。没有辐射格时直接跳过新增切地路径。

`severedTerritory`（约 L896-L972）遍历该块原主土地，拒绝到达主体、海岸、图边或非辐射的未占领邻格；周围必须同时存在至少一个其他玩家邻格与至少一个辐射邻格。其他玩家邻格在此阶段并不全要敌对，真正捕获候选随后排除对原主友好的玩家。因此“边缘只能全是敌方”比源码更严格；更准确是“其他玩家与辐射包围，且存在可捕获的敌方邻居”。

辐射邻格通过 `ownerId === 0` 且 `map.hasFallout(n)` 特判。辐射不属于投弹者，不给投弹者增加边界票数；也不是暂时把原主地块标成投弹者以完成连通性检查。正文应说爆炸后原主实际剩下的地块与辐射缺口造成分离，避免虚构额外“辐射扩大爆炸半径”的规则。

### 接收者优先级

`getCapturingPlayer`（L1237-L1279）按以下顺序：

1. 遍历整块待吞并土地的四邻接边，统计与其接壤、且不对原主友好的玩家。这里只检查与原主的关系，没有排除“投弹者友方圈”的额外判断。
2. 在这些相邻候选的所有 `outgoingAttacks()` 中，只看 `attack.target() === this.player` 的攻击；最大**单次进行中攻击**的兵数胜出。没有相加该玩家所有攻击；大军也必须来自接壤候选。
3. 仅当没有符合条件的进行中攻击时，调用 `getMode(neighbors)`，由接触边计数最多的候选接收。这不是独立的待吞并地块计数；一格的两条边同时接触同一候选时贡献两次。
4. 比较均使用严格 `>`；相同最大攻击兵数或相同最大接触边数时保留先遇到的候选。不能把平局包装成可靠的玩家获胜策略。

没有候选就不转移。可以给“无任何候选正在攻击原主”的明确假想局势，用 14 条对 11 条接触边说明后备规则；不能用它推导“只要边界更多便能压过进行中大攻击”。

### 最后土地与收益

`annexSeveredClusters`（L819-L861）在每次转移前比较 `numTilesOwned() === territory.length`，相等才调用 `conquerPlayer`。但候选是相对这一轮识别的另一主体选出的，不能据此说“玩家开局只剩一个孤立首都，核掉一条路就必然触发核切吞并”。

官方测试 “losing the last land to a severed-piece annex conquers the player”（约 L193-L234）明确先由旧包围规则拿走主体，再在同轮把被切块作为最后领土吞并。另有 “two severed pieces as the last land conquer the player once, by the last captor”。可把场景写成同一轮陆地丧失后剩余待吞并块成为最后领土；捕获者接收最后土地不等于必然赢得整场游戏，场上仍可能有其他玩家。

`EngineConfig.goldAdditionRate`（L668-L677）对 Bot 取 `50n`，其他玩家取 `100n`，再乘设置系数；没有按土地格数给每格 0.5 gold/tick 的规则。因此 18 格 = 9 gold/tick 的例子应删除，改谈地形、战略位置和仍然存活的建筑等具体可确认价值。不能把虚构数字仅改成“约数”保留。

## 原文冲突定位

定位以本轮读取的 EN / zh 文件为代表；主任务并发编辑会改变行号，以下是修订前或正在修订时的定位，交付前须重新搜索五语。其他三语需同步纠正同义断言。

| 原文位置 | 冲突断言 / 原句片段 | 处理 |
|---|---|---|
| EN frontmatter 与 L24-L25；zh L2、L9、L21；版本小节与表格 | “beta-only”、当前 stable=v0.34.25 | 更新为已核验正式 v0.35.0..v0.35.2；旧版只作历史边界，不推断所有服务器部署 |
| EN 开头图解；EN L166；zh L25、L31、L49 | “fallout counts as your land”；“辐射区算作投弹者的领土” | 改为未占领辐射边界特判 |
| EN L96-L99；zh L37 | “as is the nuker's own friendly circle”；“边界格数最多…直接赢得捕获” | 删除投弹者友方圈判断；补充接壤候选最大单次进行中攻击优先，再用接触边数 |
| EN L108-L118；zh L39 | 单一首都被孤立就可全征服；仅由边界最多者获得 | 明确同轮原主其他土地已失去，转移前最后土地检查及真实接收优先级 |
| EN L166-L185；zh L49-L51 | 辐射额外加宽有效切断、第四步只数边界 | 实际剩余土地判断；接收者先看进行中攻击，后看接触边 |
| EN L207-L218；zh L57 | “half a gold per tile per tick”；18 格等于 9 gold/tick | 删除不存在的按格固定黄金收益；场景声明为假想几何 |
| EN L220-L248；zh L59-L63 | “only remaining land”却同时说另有道路农地；14 vs 11 便决定征服和整局胜利 | 重写为同轮主体丧失场景，声明无候选进行中攻击才比边；不保证整局胜利 |
| EN L268-L284；zh L69-L71 | 只要边界最多便接收；“移动单位”便抬高边界计数 | 增补优先级；边数来自真实地块所有权，不能只移动单位 |
| EN L297-L315；zh L75-L77 | 湖泊必然使本机制更频繁；MIRV 成本只有吞并才合理；最后首都必然是终局结算 | 不作未核验频率与成本断言，保留同一条件的地图读法与真实范围限制 |
| EN L320-L349；zh L81-L92 | stable 永不触发、旧 beta 表格；only-land 作为必须通过的硬闸门 | 改为旧版本检查；接收者双层优先级；最后土地只影响征服结算，不是所有吞并的必要条件 |
| EN 末尾；zh L94 | 旧规则“仍统治当前 stable” | 表述为一般包围规则仍适用，v34 是历史实现 |

## 验收与 Monitoring

验收定义：五语既有主答案与含旧版说明的相邻入口同时修正；没有新增重复路由。渲染 title、摘要、frontmatter 版本范围、直接答案、版本小节与表格一致；没有把 Release 存在等同全部线上服务器已部署；没有保留上述接收优先级、辐射归属、固定土地黄金收益或最后一块必胜的冲突。

本轮源码证据是阅读与 tag 对比，不声称运行过上游测试。主任务应完成适用的内容审计、Astro 检查、生产构建、链接、SEO 与差异校验，并按项目要求保护实际变化的入口。具体运行结果、commit、push 和部署 CI 以交付报告为准，不能预填通过。

实际部署成功即转 Monitoring。以部署日为 T，保存本轮固定词簇和查询原拼写，等待 T+1 至 T+28 完整窗口成为 GSC final 后复盘，国家/设备固定或分别报告，不把组合变化或尚未发布的本地修改当线上收益。该事实维护的首要成功标准是消除错误答案，不预测 CTR 收益。

## 命令恢复记录

第一次沿旧路径 `git grep ... v0.35.2 -- src/core` 返回 1、没有匹配。用 `git ls-tree -r --name-only v0.35.2` 确认上游已迁移到 `packages/engine/src`，改用真实路径读取后完成核验；并非网络失败或 tag 缺失。部分后续 `git grep` 对特定函数/关键词无匹配也返回 1，这是查询无结果，不能据此断言基础设施故障。父任务统一把适用复发记录写入 runbook，本子任务不修改 AGENTS.md 或其他文件。

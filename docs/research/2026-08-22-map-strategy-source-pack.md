# 2026-08-22 地图尺寸、Compact Map 与地图战略来源包

本来源包只使用以下一手材料：OpenFrontIO 正式 Release、本地 OpenFrontIO checkout 中的运行时地图资产与源码，以及本站生成的 `src/data/maps.json` / `_meta.json`。文中所有离线指标都可由公开的 `manifest.json`、`map.bin` 和相应加载代码复算；没有把地图名称、缩略图观感或现实地理面积当成游戏机制。

## 编辑结论

建议把地图方向拆成四个职责不同的页面，而不是一篇同时回答所有问题的超长文：

1. **地图尺寸与 Compact Map**：直接回答“最大地图是哪张”“Compact 到底改变什么”，并提供尺寸、可通行陆地与公开大厅容量三种口径。
2. **地图拓扑战略**：教玩家从连续陆块、跨海分割、狭长程度、可通行陆地占比和不可通行地形读图；只解释决策框架，不伪造每张图的固定开局。
3. **Svalmel 试点**：以少数大型岛群、单一连通海域、5 个官方 Nation 为核心，验证岛群地图模板。
4. **Dyslexdria 试点**：以超宽世界拼贴、多大陆分割、不可通行地形和大量 Nation 名单为核心，验证大型复杂地图模板。

推荐页面首屏直接答案：

- “最大地图”没有唯一口径。按完整网格单元数是 **Sol**（11,204,096 格）；按服务器用于公开大厅容量的可通行陆地数是 **The Box**（4,194,304 格）。名为 Giant World Map 的地图按完整网格排第 3，按可通行陆地排第 11。
- Compact Map 不是把正常地图裁掉一圈，也不只是镜头缩放。游戏改载同一地图的 `map4x.bin`：宽、高各减半，网格总量变为四分之一；小地图再改用 `map16x.bin`。固定 Nation、Tribe 与团队出生区域的坐标也按 2 缩放。
- 公开大厅的 Compact 玩家数不是直接读取 `map4x.num_land_tiles`，而是先用完整地图 `map.num_land_tiles` 算容量档位，再取 25%。因此页面应把“地图实际 Compact 陆地数”和“公开大厅 Compact 容量公式”分成两个字段。

## 版本与证据边界

- 本站 [`src/data/_meta.json`](../../src/data/_meta.json) 记录的提取 checkout 是 [`0668045`](https://github.com/openfrontio/OpenFrontIO/commit/0668045fa926eaa6d6995561a8e13fd8126895b6)，生成时间为 2026-08-04；`upstreamVersion: v33` 是编辑验证范围，不是该 commit 对应的 Release tag。
- 截至 2026-08-22，最新正式非 TEST Release 是 [`v0.33.7`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7)，发布于 2026-08-21T23:55:28Z。
- 本轮通过 Git tree/blob SHA 对照确认：两张试点地图的 `manifest.json`、`map.bin`、`map4x.bin`、`thumbnail.webp`，以及 `TerrainMapLoader.ts`、`GameMap.ts`、`NationCreation.ts`、`TribeSpawner.ts`、`GameConfigHelpers.ts`、`MapLandTiles.ts`、`MapPlaylist.ts`，在 checkout `0668045` 与正式 `v0.33.7` 中逐文件相同。因此下文地图指标可标注为 **v0.33.7 已核验**，不需要把 checkout 冒充 Release tag。
- [`src/data/maps.json`](../../src/data/maps.json) 当前列出 117 张地图，并含 Svalmel 与 Dyslexdria 的五语显示名；它不含网格尺寸、陆地数、连通性、Nation 数或玩家容量。其 `category` 来自本站 [`scripts/extract-game-data.mjs`](../../scripts/extract-game-data.mjs) 内的 `MAP_CATEGORIES`，不是上游官方分类，不能用作“官方称该图为 Regional”的证据。

## “地图尺寸”的三个口径

以下排名遍历 `v0.33.7` [`resources/maps/*/manifest.json`](https://github.com/openfrontio/OpenFrontIO/tree/v0.33.7/resources/maps) 的全部 117 张地图。完整网格数是 `map.width * map.height`；可通行陆地数采用 `map.num_land_tiles`，也正是服务器 [`MapLandTiles.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/server/MapLandTiles.ts#L44-L58) 交给公开大厅容量公式的值。

| 问法 | 可核验答案 | 数值 | 应怎样解释 |
|---|---:|---:|---|
| 完整地图网格最大 | Sol | 4,432 x 2,528 = 11,204,096 | 包含水域与不可通行背景，主要反映运行时网格规模 |
| 可通行陆地最多 | The Box | 4,194,304 | 2,048 x 2,048 全部为可通行陆地；最接近“可争夺空间最大” |
| 横向跨度最大 | Passage | 6,000 x 400 | 极端横向长条，不能仅凭总格数判断接敌方式 |
| 纵向跨度最大 | Las Vegas Strip | 2,036 x 4,428 | 极端纵向长条 |
| Giant World Map | 网格第 3；陆地第 11 | 8,002,384 网格；2,335,403 陆地 | 名称不是排名规则 |
| Svalmel | 网格第 68；陆地第 76 | 2,686,000 网格；1,011,623 陆地 | 中等网格、偏少陆地的岛群图 |
| Dyslexdria | 网格第 16；陆地第 21 | 4,763,520 网格；2,103,254 陆地 | 大型、超宽、多陆块地图 |

页面不要把格数换算成平方公里。地图网格是游戏离散坐标，不带统一现实比例；相同格数在长条图、全陆地图和群岛图上会产生完全不同的接敌与航海结构。

## 公开大厅玩家容量

本地 checkout 与 `v0.33.7` 相同的 [`MapPlaylist.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/server/MapPlaylist.ts#L704-L764) 给出完整公式：

```text
base = max(round_to_nearest_5(map.num_land_tiles / 1,000,000 * 50), 5)
tiers = [base, round_to_nearest_5(base * 0.75), round_to_nearest_5(base * 0.5)]
FFA 抽取概率 = [30%, 30%, 40%]
Compact = max(3, floor(chosen_tier * 0.25))
最终性能上限 = 125
```

Team 会在 Compact 前先把抽中的基础档位乘以 1.5、但不超过最大档，再按 Duos / Trios / Quads / 固定队数调整为可整除人数；Humans vs Nations 只返回人类一侧的槽位。小型图的 Crowded modifier 另走 125 人、Compact + Crowded 60 人的特殊上限。因此下表只写 **普通公开 FFA** 的三档候选，不承诺下一局一定出现某个数字。

| 地图 | 正常 FFA 三档 | Compact FFA 三档 | 公式输入 |
|---|---:|---:|---:|
| Svalmel | 50 / 40 / 25 | 12 / 10 / 6 | 1,011,623 个完整图可通行陆地格 |
| Dyslexdria | 105 / 80 / 55 | 26 / 20 / 13 | 2,103,254 个完整图可通行陆地格 |

正式 [`v0.29.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.29.0) 首次明确宣布公开游戏改为按 land tiles 动态计算玩家数、最高 125 人，并把 Compact Map 列为公开 modifier。源码是当前精确数字的权威，Release 用于解释该行为何时成为正式功能。

## Compact Map 的精确定义

[`TerrainMapLoader.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/TerrainMapLoader.ts#L63-L121) 的运行时选择为：

| 模式 | 实际游戏地图 | 小地图 | 固定坐标处理 |
|---|---|---|---|
| Normal | `map.bin` + `manifest.map` | `map4x.bin` + `manifest.map4x` | 原坐标 |
| Compact | `map4x.bin` + `manifest.map4x` | `map16x.bin` + `manifest.map16x` | Nation、additional Nation、团队出生矩形的 x/y/宽/高按 2 缩放 |

全部 117 个 manifest 的 `map4x` 宽、高都等于完整图的一半，所以总网格严格是四分之一。但 land tile 不是机械除以 4：下采样会改变细小海岸与岛屿；正式 [`v0.31.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.31.0) 还明确写明“所有 Compact 地图上的小岛被移除”。

| 地图 | Normal 网格 / 可通行陆地 | Compact 网格 / 可通行陆地 | Compact 陆地保留率 |
|---|---:|---:|---:|
| Svalmel | 1,700 x 1,580 / 1,011,623 | 850 x 790 / 248,032 | 24.52% |
| Dyslexdria | 3,308 x 1,440 / 2,103,254 | 1,654 x 720 / 508,102 | 24.16% |

Compact 还连带改变默认负载，而不只是地形：

- 普通公开轮换在 Compact 时使用 100 bots，Normal 使用 400；[`MapPlaylist.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/server/MapPlaylist.ts#L138-L186) 还会在团队太少、无法保证至少两队且每队至少两人时排除 Compact。
- 公开游戏使用默认 Nation 时，Compact 只随机取 manifest Nation 数的 25%，至少 1 个；Humans vs Nations 和显式自定义数量走别的分支。见 [`NationCreation.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/NationCreation.ts#L15-L88)。
- 有固定坐标的 custom Tribe 也在 Compact 时把 x/y 除以 2；见 [`TribeSpawner.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/TribeSpawner.ts#L89-L118)。
- Host 与单机界面都暴露 Compact 开关；当 bots 正好是默认 400 时切到 100，默认 Nation 数按 25% 调整，但玩家手动改过的非默认值不会被无条件覆盖。见 [`GameConfigHelpers.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/client/utilities/GameConfigHelpers.ts#L91-L123)。

因此玩家文案可以说“Compact 通常提高相对接触密度、减少默认 bots / Nations 并缩短空间尺度”，但不能只凭开关保证固定的首次接敌秒数；玩家数档位、出生点、模式与队伍仍会改变结果。

## 拓扑审计方法

地图二进制每格 1 byte。[`GameMap.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/GameMap.ts#L121-L130) 定义 bit 7 为 land、bit 6 为 shoreline、bit 5 为 ocean、低 5 bit 为 magnitude；land 且 magnitude 31 是 impassable。该类还明确说明 impassable 不能被占领、攻击或核击，核弹轨迹也不能穿过。

本轮直接读取两张地图的 `map.bin` 与 `map4x.bin`，按游戏自己的无环绕 N/S/W/E 邻接顺序计算；邻接实现见 [`GameMap.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/GameMap.ts#L312-L327) 与 [`GameMap.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/GameMap.ts#L372-L404)。指标定义如下：

- **可通行陆地**：land bit 为 1 且 magnitude 不为 31；两张地图都与 manifest `num_land_tiles` 精确相等。
- **陆地连通块**：可通行陆地按四邻接形成的 component；地图边缘不横向或纵向环绕。
- **水域连通块**：land bit 为 0 的格子按四邻接形成的 component。
- **临水陆地**：至少有一个四邻接水格的可通行陆地；用于描述海岸暴露度，不等于可建 Port 数。
- **大块**：本报告为减少像素级小岛噪声，额外列出至少 1,000 格的 component 数；这只是报告阈值，不是游戏规则。

这些指标可证明空间是否被水或不可通行地形分割，却不能独立证明某条通道是“最佳 chokepoint”。要判断实战瓶颈，还需出生分布、通道宽度、地形 cost、邻居数量和多局回放。

## Svalmel 试点

正式 [`v0.28.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.28.0) 将 Svalmel 定义为 Christmas-themed map with 5 nations。当前 [`manifest.json`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/resources/maps/svalmel/manifest.json) 仍列出 Santa Claus、Svalbard、Melville、Bathurst、Nordaustlandet 五个带坐标 Nation；这五个 Nation 不是五个玩家槽位。

| 指标 | Normal | Compact |
|---|---:|---:|
| 网格 | 1,700 x 1,580 | 850 x 790 |
| 可通行陆地 | 1,011,623（37.66% 网格） | 248,032（36.94% 网格） |
| impassable | 0 | 0 |
| 陆地连通块 | 26；其中 13 个至少 1,000 格 | 24；其中 9 个至少 1,000 格 |
| 最大陆块占可通行陆地 | 35.28% | 35.42% |
| Normal 前四大陆块累计 | 91.48% | 不跨分辨率复用该比例 |
| 临水陆地占比 | 2.80% | 5.46% |
| 水域连通块 | 1 | 1 |
| manifest Nations | 5，全部有固定坐标 | 普通公开 default 路径随机取 1 个 |

可以写入成稿的战略结论：

- Svalmel 不是“几十个同等小岛”的均匀群岛。Normal 的前四大陆块已占 91.48% 可通行陆地，前两块占 66.21%；宏观上更像四个主战区加卫星岛。
- 所有水格形成一个连通水域，且两档数据中所有水格都带 ocean bit。跨陆块扩张必然涉及运输，海军与 Port 可以围绕同一海域网络竞争；但源码指标不能保证任意两处 Port 的路线都同样短或安全。
- 最大两块分别占 35.28% 与 30.93%，不能在未做出生与对局测试前宣传“完全对称”或“绝对平衡”。
- Compact 保留主要四块结构，但移除了部分小岛；它适合写成“同一岛群骨架、更少边缘小岛与更短尺度”，不要写成单纯 50% zoom。

建议文章结构：直接答案 -> 五个 Nation 与主题来源 -> 四大主陆块 -> 海上转场与 Port 风险 -> Normal / Compact 对照 -> 三种出生复盘清单。出生清单只教读图，不给未经实测的固定坐标 tier list。

## Dyslexdria 试点

正式 [`v0.31.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.31.0) 将 Dyslexdria 定义为 returning April Fools map、a large map based on a recolored World。`v0.33.7` 的累计正式说明又记录 v33 更新了 Dyslexdria；因此成稿应以当前 v33 资产为准，而不是把 v31 首发图当成未变版本。

当前 [`manifest.json`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/resources/maps/dyslexdria/manifest.json) 有 82 个主 Nation，其中 69 个带坐标、13 个不带坐标；另有 189 个无坐标 additional Nations，只有请求数量超过主列表时才作为后备名称池。Nation 名单规模仍不等于玩家容量。

| 指标 | Normal | Compact |
|---|---:|---:|
| 网格 | 3,308 x 1,440 | 1,654 x 720 |
| 可通行陆地 | 2,103,254（44.15% 网格） | 508,102（42.67% 网格） |
| impassable land-bit 格 | 175,320 | 43,913 |
| 陆地连通块 | 224；其中 52 个至少 1,000 格 | 142；其中 24 个至少 1,000 格 |
| 最大陆块占可通行陆地 | 16.77% | 16.78% |
| Normal 前十大块累计 | 85.78% | 不跨分辨率复用该比例 |
| 临水陆地占比 | 4.15% | 7.24% |
| 水域连通块 | 1 | 1 |
| manifest Nations | 82（69 定位、13 随机） | 普通公开 default 路径随机取 20 个 |

可以写入成稿的战略结论：

- Dyslexdria 没有一个统治全图的主大陆：最大块只占 16.77%，前十块合计 85.78%。与 Svalmel 相比，它更适合“多战区、跨海转场、区域胜利不等于全图控制”的框架。
- 224 个 Normal 陆地连通块中只有 52 个至少 1,000 格，说明小岛噪声明显；Compact 降至 142 / 24，与正式 Release 的“小岛移除”方向一致。正文应优先讨论前十大块，不要逐岛枚举。
- 175,320 个 impassable land-bit 格不会计入服务器 `num_land_tiles` 容量输入。缩略图中的黑色或背景形状不能自动当作“可占领陆地”；需要按 tile 规则区分。
- 水域在四邻接下仍是一个网络，但路线距离可能极长；“水域连通”只证明存在连续水路，不证明某个海军开局有正收益。
- 普通公开、非 Compact、非 HvN 且使用 default Nations 时，源码会使用全部 82 个主 Nation；Compact default 为 20。私人或单机显式设置数量时可以不同。

建议文章结构：直接答案 -> April Fools / recolored World 官方定位 -> 宽幅与十大主陆块 -> impassable 读图 -> 海军长距离转场 -> 82 / 20 Nation 边界 -> Normal / Compact 对照。不要把戏仿名单翻译成现实国家权威名称，也不要把地图笑话延伸成针对真实疾病或玩家的描述。

## 单图页的出生证据边界

两张地图的 v0.33.7 manifest 都没有 `teamGameSpawnAreas`。因此它们没有地图作者定义的团队出生矩形，manifest Nation 坐标也不是人类玩家出生点。人类在普通出生阶段选择自己的格子；Random Spawn 或未手选时，[`SpawnExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/SpawnExecution.ts#L114-L190) 会在整张地图抽取 land、未占领且非边缘的候选，要求半径 4 的出生区域全部有效，并与已有出生中心保持 [`Config.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/configuration/Config.ts#L618-L633) 规定的至少 30 格曼哈顿距离，最多尝试 1,000 次。不能把 “Santa Claus 附近”“某个 Dyslexdria 国家附近”写成人类固定出生区。

带坐标的 Nation 也不是精确落在 manifest 的单个点上。[`NationExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/NationExecution.ts#L107-L160) 与 [`NationExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/NationExecution.ts#L263-L291) 会在坐标锚点 x/y 各正负 25 格的窗口内最多抽取 50 次，避开越界、水域、已占领和 impassable；没有坐标的 Nation 则走通用随机出生。Compact 会先把锚点坐标除以 2，但不会把锚点变成人类出生位。

- Svalmel 的五个锚点窗口都完整落在单一可通行陆块上，并分别对应前五大陆块：Melville（第 1）、Svalbard（第 2）、Bathurst（第 3）、Nordaustlandet（第 4）、Santa Claus（第 5）。这可以描述 **NPC 分布设计**，不能据此给人类出生点排名。
- Dyslexdria 的 69 个带坐标 Nation 中，多数锚点窗口只覆盖一个陆块，但 Irap、Bangledash、Jina、Vitamen、Bafiling、Madalplascar 的正负 25 格窗口横跨多个陆块；Cuda 的锚点本身还是水格，实际出生依赖附近抽取。另 13 个 Nation 没有坐标。故单图页可以展示代表性锚点，却不能把锚点画成保证精确落点。
- 普通公开 Compact 会先随机打乱 manifest Nations 再截取 25%；所以 Svalmel 的 1 个、Dyslexdria 的 20 个是**数量**，并非每局固定的同一组名称或固定覆盖每个主陆块。

## 单图页的航线、失败与反制边界

基础跨海进攻使用 Transport Ship，不要求先建 Port。[`TransportShipUtils.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/TransportShipUtils.ts#L5-L50) 会寻找攻击者已拥有的岸线、目标拥有且处于同一可达水体的岸线以及实际水路；[`SpatialQuery.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/pathfinding/spatial/SpatialQuery.ts#L106-L175) 会拒绝只有不连通内陆水体可达的目标岸线。相反，[`PlayerImpl.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/PlayerImpl.ts#L1513-L1552) 要求 Warship 从目标水体旁一个已完成且 active 的己方 Port 出发，[`PlayerImpl.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/PlayerImpl.ts#L1610-L1613) 也要求 Trade Ship 以己方 Port 为端点。

Svalmel 与 Dyslexdria 各自只有一个四邻接水域 component，因此“不同水体互不连通”不是这两图的主要失败原因；但单一水域只证明水路拓扑上相连，不证明航程短、安全或有收益。运输仍可能因为没有己方岸线、点击处附近 50 格内没有合规目标岸线、外交关系禁止攻击、已有 3 艘 Transport Ship 达到 [`Config.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/configuration/Config.ts#L631-L636) 的上限，或路径/出生岸线校验失败而无法发出。

源码可以支持两项明确反制：[`TransportShipExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/TransportShipExecution.ts#L109-L159) 在 Transport Ship 建立后会向目标显示来袭海军入侵提示；[`WarshipExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/WarshipExecution.ts#L232-L337) 的自动目标优先级是 Transport Ship、Warship、Trade Ship。因此可以写“来袭运输可被预警，Warship 会优先处理运输船”，但不能把它扩写成“某条固定航线必被截获”或“建一个 Port 就能封锁整个共享水域”。最短路线、登陆成功率、Port 投资回收和具体反制时机仍需对局或回放验证。

## 可复用的拓扑战略框架

全站地图长文可用以下顺序，且每一步都有明确的数据边界：

1. **先看可通行陆地，而非画布面积**：决定可争夺空间与公开容量量级。
2. **再看大连通块份额**：一个大块主导、多块均分、还是长条单走廊，会改变陆军扩张是否能覆盖全局。
3. **把水域连通和陆地连通分开**：陆地断开意味着要运输；水域断开则可能形成互不相通的舰队与贸易系统。正式 [`v0.31.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.31.0) 已确认 Ports、Trade Ships、Warships 可在所有水体运作，不再只限 ocean，但不同水体仍不自动相连。
4. **单独标记 impassable**：它是源码级阻挡，不是普通山地或未占领荒地。
5. **最后加入出生与模式**：Random Spawn、Team spawn areas、Compact、Water Nukes、Nations 和玩家容量会改变同一骨架的实战节奏。

这一框架适合做“如何读图”，不适合自动生成“最佳出生点”。批量地图页若只显示 component 数和 land share，会成为数据薄页；至少还需一张真实图、两个局面例子和一条失败反例。

## 实际可用的地图图片与许可

当前站点 `public/` 没有 Svalmel 或 Dyslexdria 图片。可直接使用的一手视觉资产都在 OpenFrontIO `/resources` 下：

| 地图 | 本地资产 | v0.33.7 固定来源 | 原始尺寸 |
|---|---|---|---:|
| Svalmel | `../OpenFrontIO/resources/maps/svalmel/thumbnail.webp` | [`thumbnail.webp`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/resources/maps/svalmel/thumbnail.webp) | 425 x 395，10,774 bytes |
| Dyslexdria | `../OpenFrontIO/resources/maps/dyslexdria/thumbnail.webp` | [`thumbnail.webp`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/resources/maps/dyslexdria/thumbnail.webp) | 827 x 360，29,538 bytes |

两张缩略图的尺寸都与各自 `manifest.map16x` 一致。`map.bin` / `map4x.bin` 是每格 1 byte 的地形数据，不是浏览器可直接显示的图片；若要生成带连通块、主陆块或航线标注的高清图，应把生成图明确视为地图资产的改作，而不是“原创无来源插图”。

OpenFrontIO [`README.md`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/README.md#license) 与 [`LICENSE-ASSETS`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/LICENSE-ASSETS) 明确：`/resources` 资产采用 **CC BY-SA 4.0**，包括 level/map data；需署名 “OpenFront” 或 “OpenFront Inc.”。实际发布时建议在图片 caption 或来源面板保留：

> Map asset: OpenFront / OpenFront Inc. and Contributors, CC BY-SA 4.0. Source: OpenFrontIO v0.33.7. Annotated/cropped by OpenFront Intel（如有改动）。

改作还应链接许可证、标明修改，并按 CC BY-SA 4.0 处理相应衍生资产。不要改用 `/proprietary` 下的 Logo 或品牌资产；它们不受该开放资产许可覆盖。本段是内容生产边界，不替代法律意见。

## 当前不能可靠得出的指标

- **现实面积、公里尺度或真实投影比例**：manifest 没有地理坐标系或统一比例。
- **固定首次接敌时间 / 平均局长**：缺少出生样本、真人行为和对局遥测；Compact 也有多个玩家容量档。
- **最佳出生点或胜率 tier list**：静态地图不含玩家实力、邻居分布、队伍和对局结果。
- **真正的 chokepoint 排名**：component 只判断通不通，不衡量通道宽度、地形 cost、可守方向或核武影响。
- **Port 数量、贸易收益或最佳航线**：临水格不等于合法 Port 位；收益还依赖结构、同水体对象、距离、所有权和局势。
- **下一局确切玩家数**：公开大厅会随机选容量档、调整 Team、应用 Compact / Crowded 等 modifier，并受 125 上限约束。
- **`multiplayer_frequency: 8` 的直观百分比**：两个 manifest 都有该元数据，但没有把完整 playlist、轮换状态和其他权重一起计算前，不能写成“8% 出现率”。
- **Nation 数等于玩家容量**：Svalmel 的 5 与 Dyslexdria 的 82 / 189 都是 AI Nation 配置；人类槽位由大厅容量逻辑决定。
- **本站 `Regional` 是官方类型**：它是本站 extractor 的编辑分类；上游 manifest 对 Svalmel 标 `fictional/europe/north_america`，对 Dyslexdria 标 `world/fictional`。

## 成稿事实清单

在四个页面进入五语本地化前，英文事实母稿至少应保留以下不变量：

- 同时给出 grid cells、playable land tiles 和 public FFA tiers，禁止只写“largest”。
- 明写 Compact 使用 `map4x.bin`、宽高减半、总格数四分之一，并说明小岛/海岸会改变。
- Svalmel：5 个 manifest Nations、Normal 26 个陆块、前四块 91.48%、无 impassable、单一连通水域。
- Dyslexdria：82 个主 Nations + 189 additional、Normal 224 个陆块、175,320 个 impassable、最大块 16.77%、单一连通水域。
- Nation 数不是玩家数；Normal / Compact 公开 FFA 容量使用三档候选而非单值。
- 图片 caption 保留 OpenFront 来源、CC BY-SA 4.0、固定版本链接与修改说明。
- 所有战略句明确区分“源码/地图可证明”与“需要对局验证的建议”。

## 一手来源索引

- 正式 Release：[`v0.28.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.28.0)、[`v0.29.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.29.0)、[`v0.31.0`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.31.0)、[`v0.33.7`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7)。
- 地图资产：[`Svalmel`](https://github.com/openfrontio/OpenFrontIO/tree/v0.33.7/resources/maps/svalmel)、[`Dyslexdria`](https://github.com/openfrontio/OpenFrontIO/tree/v0.33.7/resources/maps/dyslexdria)。
- 加载与 tile 语义：[`TerrainMapLoader.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/TerrainMapLoader.ts)、[`GameMap.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/GameMap.ts)。
- 容量与 Compact 配置：[`MapLandTiles.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/server/MapLandTiles.ts)、[`MapPlaylist.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/server/MapPlaylist.ts)、[`NationCreation.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/NationCreation.ts)、[`TribeSpawner.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/TribeSpawner.ts)、[`GameConfigHelpers.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/client/utilities/GameConfigHelpers.ts)。
- 出生与航线：[`SpawnExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/SpawnExecution.ts)、[`NationExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/NationExecution.ts)、[`TransportShipUtils.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/TransportShipUtils.ts)、[`SpatialQuery.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/pathfinding/spatial/SpatialQuery.ts)、[`PlayerImpl.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/game/PlayerImpl.ts)、[`TransportShipExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/TransportShipExecution.ts)、[`WarshipExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/src/core/execution/WarshipExecution.ts)。
- 资产许可：[`README.md`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/README.md)、[`LICENSE-ASSETS`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/LICENSE-ASSETS)。
- 本站生成数据：[`src/data/maps.json`](../../src/data/maps.json)、[`src/data/_meta.json`](../../src/data/_meta.json)、[`scripts/extract-game-data.mjs`](../../scripts/extract-game-data.mjs)。

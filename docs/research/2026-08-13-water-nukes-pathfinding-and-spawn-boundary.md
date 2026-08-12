# 2026-08-13 Water Nukes 寻路边界与出生点候选结论

本记录保存本轮改变玩家页面与计划状态的一手证据。Search Console 原始 Query x Page 数据仍只保留在 `.cache/gsc/`。

## 编辑结论

- 最新非 TEST 正式 Release 仍是 [`v0.33.4`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.4)。
- 五语 `/guides/water-nukes/` 继续作为唯一主答案，但需修正“海军寻路会重算”的绝对表述：v33.4 的新水域可航行，运输船却可能因小地图水深与 ocean 标记错误而绕开弹坑。
- 上游 [Issue #4760](https://github.com/openfrontio/OpenFrontIO/issues/4760) 与 [PR #4975](https://github.com/openfrontio/OpenFrontIO/pull/4975) 提供生产复现、修复后对比图和实现解释。提交 [`c5c7d74`](https://github.com/openfrontio/OpenFrontIO/commit/c5c7d74c6f7b687ca9c72fe0570a26469913b8d2) 已合入 `main`，但尚未进入正式 Release，正文必须保持这一版本边界。
- `SPAWN-01` 合并进五语 `/guides/first-match/`，取消独立 `/guides/best-starting-position/` 候选。四类出生形状属于第一局地图阅读流程，现有页面已经覆盖，不应建立重复主答案。

## Water Nukes 寻路事实

修复前，Water Nukes 将小地图 tile 变水时会留下 `magnitude=0` 并清除 ocean bit。上游提交说明 `AStarWaterBounded` 对 magnitude 小于 3 的 tile 使用每步 400 而非 100 的成本，路径平滑也会拒绝穿过部分低 magnitude tile。结果是运输船仍能移动，却可能明显绕开转换水域。

修复在转换后执行两项小地图重算：把 ocean bit 传播到连接海洋的新水域，并从新海岸做 BFS 重建 magnitude。正文使用 PR 自带的两张真实游戏截图作为视觉证据：

1. [v33.4 生产现状](https://github.com/user-attachments/assets/13fd48ae-f538-45a7-ace2-e1b9583c5337)：加拿大到马达加斯加的运输线绕开被 Water Nukes 改造的非洲。
2. [未发布修复后的结果](https://github.com/user-attachments/assets/bf6fecee-8096-4871-a87d-b1b0032fdbb0)：重算 ocean 与 magnitude 后，路线直接穿过新水域。

玩家决策不是“弹坑不能通航”，而是“v33.4 先看第一艘运输船的实际路线，并保留替代海岸或陆路”。正式 Release 包含该修复后，再移除当前版本警告并更新版本摘要。

## `SPAWN-01` 页面边界

上游 v33.4 的出生逻辑只检查 land、owner、map border、impassable 与玩家最小距离，没有海岸、半岛、中心或瓶颈的隐藏加分。地图形状改变的是合法扩张空间、出口数量和未来接敌面。

五语 `first-match.mdx` 已同步承接：

- 海岸是否形成有用海军或贸易路线；
- 半岛减少入口但可能被堵住唯一出口；
- 中心位置获得多方向土地，也面对更多邻居；
- 瓶颈只有在真实可通行且愿意防守时才有价值；
- 主路线、备用路线、停止线与扩张后边界形状。

GSC 没有 spawn / starting-position 查询，站点 Issues 为 0，Feedlog 只有系统 welcome、0 票、0 评论。独立页会重复现有完整决策模块，因此 `SPAWN-01` 以“合并进 first-match、取消独立页”结束；未来只有出现不能由该页承接的重复玩家问题才重新立项。

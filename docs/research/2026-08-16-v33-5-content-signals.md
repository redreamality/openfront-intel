# 2026-08-16 `FRESH-01` v33.5 内容信号与来源包

本文件记录正式 v33.5 的玩家影响、正式与未发布边界，以及本轮外部信号。Search Console 的 Query、点击、展现、CTR 和排名明细继续只保留在 `.cache/gsc/`，不提交到仓库。

## 编辑结论

- 最新有真实正文、非 TEST 的正式 Release 是 [`v0.33.5`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.5)，发布于 `2026-08-15T02:24:47Z`，tag commit 为 [`87f1a52`](https://github.com/openfrontio/OpenFrontIO/commit/87f1a5278c8e1409ce0cdcf183d30a6d806364d2)。正式版本变化足以重新打开 `FRESH-01`。
- 唯一版本主落地页继续是五语 `/changelog/v33/`。受管活动与普通私人房的边界由既有五语 `/mechanics/modes/` 承接；FAQ 与首页只做短答和入口同步，不创建 v33.5 或管理员大厅薄页。
- v33.5 为 featured lobby 增加自定义标签和更长展示窗口；管理员机器人创建对局时可以固定队伍；匿名名称模式下，预先固定的队友现在彼此可见。Infinite Gold 的零成本状态会显示 x5 ghost badge。
- 这些变化不等于普通 Host 菜单新增“固定队伍”按钮。普通 [`HostLobbyModal.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.5/src/client/HostLobbyModal.ts) 在 v33.4 与 v33.5 的 blob 都是 `88fd150d327b41ef45ddbe2738d0c42ec6770164`。

## 正式版本边界

| 玩家问题 | v33.5 正式答案 | 不能推断的内容 |
|---|---|---|
| featured lobby 会怎样显示 | 受管 featured lobby 可带自定义标签，并保持更长的大厅曝光窗口 | 普通玩家创建的所有房间都会自动 featured |
| 能否预先固定队伍 | adminbot 创建游戏时可提交固定队伍；匿名模式下固定队友彼此可见 | 普通 Host 菜单出现了新的固定队伍控件 |
| Infinite Gold 有什么显示变化 | 费用为零时可见 x5 ghost badge | 建造数量、资源规则或普通批量上限改变 |
| v33.4 批量核武是否失效 | 没有；x5 键盘批量、径向批量和同 Silo 逐 tick 时序仍是现行规则 | v33.5 重写了核武批量机制 |

正式 tag 的 [`UserSettingModal.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.5/src/client/UserSettingModal.ts) blob 仍为 `428afd95dd9dbf2fe10b2e7c618b8c5e4196a68a`，没有 `resetGfx`、`selectAllWarships` 或 `boxSelectWarships` 设置项。上游 [`ead15d8`](https://github.com/openfrontio/OpenFrontIO/commit/ead15d8d1428697d8fc0d1221b849892bbb8c163) 仍未进入正式 Release，因此 `F`、图形重置 `R` 和框选 `Shift` 的固定键警告要推进为“v33.5 仍存在”，不能删除。

正式 tag 的 `WaterManager.ts` blob 为 `218d34e1fdb0a17efd3f89cce451ee664fc696a2`，仍未包含 [`c5c7d74`](https://github.com/openfrontio/OpenFrontIO/commit/c5c7d74c6f7b687ca9c72fe0570a26469913b8d2) 的 Water Nukes 海洋标记与 minimap 深度重算；修复后的 blob 为 `c491e765247fb2cb7911c469f22891fe70307a38`。因此运输船可能绕开 Water-Nuked 水域的警告在 v33.5 仍有效。

本轮核验时上游 `main` 为 [`b6c194e`](https://github.com/openfrontio/OpenFrontIO/commit/b6c194e9a5a62feb52df6ec24474b46992e220f4)。v33.5 tag 之后只有“同盟结束后 0.5 秒核弹保护”会改变玩家决策，但它尚未正式发布，不写成当前规则。

## 搜索与需求信号

- 7 天和 28 天 GSC 包装刷新均未返回新报告，各自唯一直接 Node 重试也没有改写缓存。当前 OAuth token 不存在，无头自动化不能完成交互授权。
- 本轮明确回退 2026-08-13 生成、截止 2026-08-10 的缓存：7 天 921 个 Query / 1,867 条 Query x Page，28 天 1,298 / 3,229。`NUKE-01` 未得到截止至少 8 月 11 日且含后切片行的新窗口，继续 Monitoring，不评价入口修复。
- 站点开放 Issues 与开放 PR 均为 0。Feedlog feedback / roadmap 仍只有系统 welcome、0 票、0 评论；welcome、空帖和品牌拼错不构成玩家需求。
- `ATTACK-01` 的上游 Issue #4237 仍开放、5 条评论且没有新进展。`MAP-01` 没有新的精确搜索或重复问题；两项都继续 Incubation，不晋级。

## 页面与验证边界

- 五语 v33 总览先直接回答 v33.5，再保留 v33.4 批量操作、Doomsday、MIRV、Ranked 2v2、战舰熟练度和地图的历史章节。
- 五语 modes 增加受管 featured/admin lobby 与普通 Host UI 的对照，继续保留公平局、训练、机制实验、赛事工作流和内部字段警告。
- 五语 shortcuts、hotkeys 与 Water Nukes 只推进“当前正式版”为 v33.5；v33.4 引入批量操作的历史归属和 v33.4 生产截图说明不变。
- 视觉证据使用正式 Release、tag 源码、blob 对比与代码原生表格。没有生成或伪造游戏截图，也没有交互变化。
- 内容 e2e 必须锁定五语 v33.5 受管大厅结论、普通 Host 边界，以及两个未发布修复在 v33.5 仍未落地。

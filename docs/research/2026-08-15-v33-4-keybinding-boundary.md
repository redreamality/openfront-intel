# 2026-08-15 `FRESH-01` v33.4 键位重映射边界来源包

## 编辑结论

- `FRESH-01` 重新进入 Production，修正五语 `/shortcuts/` 与 `/guides/hotkeys/`，不新增路由。
- v33.4 的 **Settings → Keybindings** 能修改大多数动作，但没有 `selectAllWarships`、`resetGfx` 或 `boxSelectWarships` 三个设置项；当前正式版应继续使用 `F` 全选战舰、`Alt` + `R` 图形重置中的 `R`，以及 `Shift` + 拖动框选战舰。
- 上游 main 已加入这三个可配置键位，但该提交尚未进入正式 Release，只能作为当前边界的反证和下一次版本复核点，不能写成 v33.4 能力。
- 完整键位仍由 `/shortcuts/` 承接；`/guides/hotkeys/` 只同步直接答案、故障恢复和 FAQ，避免维护第二套键位表。

## 正式版本与未发布边界

最新有真实正文、非 TEST 的正式 Release 仍是 [`v0.33.4`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.4)，tag commit 为 `20c813f06a403da294760fc6089b222179b6a66b`。

- 正式 [`UserSettingModal.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/client/UserSettingModal.ts) 的 blob 为 `428afd95dd9dbf2fe10b2e7c618b8c5e4196a68a`，没有上述三个设置项。
- 未发布提交 [`ead15d8`](https://github.com/openfrontio/OpenFrontIO/commit/ead15d8d1428697d8fc0d1221b849892bbb8c163) 的标题为 `Feat: add missing keybinds F, R and box-select-warship to customizable keybinds`，并新增 `resetGfx`、`boxSelectWarships` 与 `selectAllWarships` 设置 UI；提交后的同文件 blob 变为 `ef7a405c399e281cdd492aed313e86caa097ce3c`。
- 本轮核验时上游 main 为 `64b092aeb0f99d9d87eba7dce86944f89057890a`，比 2026-08-14 记录的 `19ca3a1` 前进 10 个未发布提交；这些提交不改变最新正式版仍为 v33.4 的发布边界。

因此，旧文案“每个键都可以重映射”会让正式版玩家在设置页寻找不存在的选项。正确答案是“大多数设置项可重映射；`F`、图形重置 `R` 和框选 `Shift` 在 v33.4 仍固定”。

## 页面与验证边界

| 玩家问题 | 唯一主答案 | 本轮处理 |
|---|---|---|
| 默认键是什么、能否改键 | 五语 `/shortcuts/` | 顶部直接说明三个固定流程，链接正式源码与未发布提交，表尾同步限制 |
| 按键不工作如何恢复 | 五语 `/guides/hotkeys/` | 设置页只用于可配置动作；固定流程先测试默认键，FAQ 不再绝对回答“全部可改” |
| 未发布提交何时可用 | 下一正式 Release | 不做预测；Release 包含 `ead15d8` 后重新核验并移除固定键警告 |

内容 e2e 必须在五语页面中锁定固定边界，并确认 `/shortcuts/` 的正式 tag 和未发布提交来源链接。页面只增加代码原生文字来源框，没有伪造游戏截图，也没有交互变化。

## 同轮信号与 `MAP-01`

GSC 7 天与 28 天刷新及各自唯一重试均未返回日志，缓存没有刷新；本轮回退到 2026-08-13 生成、截止 2026-08-10 的最后有效报告：7 天 921 个 Query / 1,867 条 Query × Page，28 天 1,298 / 3,229。`NUKE-01` 未到至少截止 8 月 11 日且后切片有行的最早决策点，直接跳过。

`MAP-01` 完成第一轮正式数据核验，但继续 Incubation：

- [`Caribbean manifest`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/resources/maps/caribbean/manifest.json) 为 3,200 × 1,808、577,573 个陆地 tile，约 10.0% 陆地；真实 [`thumbnail.webp`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/resources/maps/caribbean/thumbnail.webp) 显示群岛与跨海通道。
- [`Danish Straits manifest`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/resources/maps/danishstraits/manifest.json) 为 872 × 1,224、587,312 个陆地 tile，约 55.0% 陆地；真实 [`thumbnail.webp`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/resources/maps/danishstraits/thumbnail.webp) 显示狭长海峡、半岛和岛屿通道。
- 两图有足以形成不同决策的地形差异，但 GSC 与上游 Issues 都没有两图的精确玩家问题。证据支持继续研究，不支持立即创建模板化双页。

下一轮只有在出现真实问题、搜索意图，或来源足以回答出生、港口、舰队与 chokepoint 的具体决策时，才让两图成组晋级；否则继续 Incubation。

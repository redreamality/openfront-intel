# v34.24 正式 Release 维护来源包

访问日期：2026-10-11（Asia/Vladivostok）。任务类型：既有版本答案维护，不新增独立攻略主题。

## 编辑结论

- 最新正式版本为 v0.34.24，非 TEST、非 draft、非 prerelease。本轮五语版本笔记应补充它修复的兵力上限漏洞，并保留 v0.34.23 的自动地图恢复说明。
- v0.34.24 修复反复攻击不接壤目标可能使兵力超过 troop cap 的漏洞。这是漏洞修复，不代表兵力上限数值调整，也不代表正常攻击规则重新设计。
- v0.34.23 在游戏内图形崩溃导致地图空白时自动恢复地图。不能扩写为所有图形崩溃已消失、服务器状态回滚或所有设备均不再遇到空白画面。
- 最新 Release 正文包含早期版本累积历史，须按各自版本标题归属事实。v0.34.22 的计费、私人大厅、Firefox Android、白闪及 telemetry 条目不能归到 v0.34.24。

## 官方来源与版本游标

| 来源 | 日期或游标 | 支持的事实 |
|---|---|---|
| [v0.34.24 正式 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.24) | 发布于 2026-10-06T18:21:55Z；Release ID `405019130` | 修复反复攻击不接壤目标造成兵力超过上限的漏洞 |
| [v0.34.24 Release API](https://api.github.com/repos/openfrontio/OpenFrontIO/releases/tags/v0.34.24) | tag commit `3f5633b92c9508461e6e2b9e1f926487a1804c9f` | 正式发布状态与真实正文；正文按版本标题组织累积历史 |
| [v0.34.23 正式 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.23) | 发布于 2026-10-05T15:29:46Z；Release ID `403868178` | 图形崩溃造成空白地图时自动恢复 |
| [v0.34.23 Release API](https://api.github.com/repos/openfrontio/OpenFrontIO/releases/tags/v0.34.23) | tag commit `71154c52c2a236ab04b08d9b2041f9ea8252a58c` | 核验对应版本的发布元数据与正文 |
| [upstream main](https://github.com/openfrontio/OpenFrontIO/commit/a15138358930c10241e9ceb4be1ce3389477e970) | 独立 main 游标 `a15138358930c10241e9ceb4be1ce3389477e970` | 记录未发布开发状态；不作为正式 Release 能力的替代依据 |

正式 Release/tag 与 upstream main 使用独立游标。不能因 main 前进而把未正式发布的变化写成 v0.34.24 功能。

## 核验方法与局限

本轮使用 GitHub REST CLI 读取正式 Release 元数据、真实正文和 tag/ref。v0.34.24 的再次读取确认正文开头依次为 v0.34.24、v0.34.23、v0.34.22，因此维护必须只提取对应标题下的新增事实。

网页读取工具打开 Release/API 时返回空白，但 REST CLI 已成功取得官方响应；空白网页不表示不存在可用官方来源，也不构成本轮网络硬阻塞。事实边界仅以正式 Release 的明示内容为依据，不对未提供的漏洞触发细节、设备覆盖率、恢复耗时或兵力上限数值作推断。

本任务维护既有答案，不适用新长文的 3 个 Reddit、3 个 YouTube、600 英文研究词及每语 1500 词来源配额。五语内容的事实一致性、来源链接及对应 Release 审计由交付主任务完成；此来源包不代表页面已验证或已部署。

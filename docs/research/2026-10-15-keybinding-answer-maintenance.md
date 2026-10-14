# 默认键位与改键设置维护

核验日期：2026-10-15，Asia/Vladivostok。类型：既有答案事实维护，不新增独立页面。

## 玩家任务、需求与唯一答案

- 词簇：OpenFront shortcuts、keyboard shortcuts、hotkeys、keybinds，以及五语对应词。
- 玩家任务：查默认按键，并在按键无反应时找到真正可用的改键设置。
- 唯一查键答案：五语 `/shortcuts/`。五语 `/guides/hotkeys/` 继续负责练习与故障恢复，不能保留与速查页相反的设置说明。
- GSC：`sc-domain:openfront.fyi`，schemaVersion 2，web/final，2026-10-06 至 2026-10-12，所有国家和设备。query 指标使用 byProperty；queryPage/byPage 只诊断落地，锚点单列。
- 已有搜索信号：相关词簇已有点击与排名，当前落地为既有速查页及教程。私有明细保存在 automation cache，不提交词级流量。没有新建独立页的理由。
- 缺口：页面仍称全选战舰、图形重置和框选战舰没有独立设置，并把已发布的设置入口称为未发布变化。故障排查和 FAQ 也重复该错误。
- 自然入口：现有导航、速查页与教程互链、五语首页最新攻略和攻略目录。保留已有答案职责，真实维护日期允许更新已有列表排序。

## 一手证据与版本边界

| 来源 | 实际核验 | 边界 |
| --- | --- | --- |
| https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.25 | Release API：2026-10-13T12:39:31Z，非 draft、非 prerelease、非 TEST | 本次维护以稳定版为默认表格边界，不宣称这些设置首次在此版本出现 |
| https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/client/UserSettingModal.ts | 实际读取 tag 源码；`selectAllWarships`、`resetGfx`、`boxSelectWarships` 均有独立 setting-keybind | 只核验被修改的三个动作，不保证每种输入都可重映射 |
| https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/core/game/UserSettings.ts | 默认分别为 KeyF、KeyR、ShiftLeft；图形重置保留修饰键 | 默认值不是用户必须使用的键位 |
| https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/client/InputHandler.ts | 三种动作实际读取 keybinds，确认设置不只是可见入口 | 不重审未改动的核弹成本、批量或鼠标机制 |
| https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0-beta2 | 实际读取完整 Release 正文：X 全选战舰、F 表情、R 快捷聊天 | 2026-10-14T14:56:00Z 发布，prerelease=true；五语明确标为 beta，不覆盖稳定版默认表 |

稳定 tag commit：`dfd9e478b64d92fa25f95597b8cb81d8adee004d`。较新 beta tag commit：`0dc1f9e4ed008f2880eedf07b41741b12835cdf8`。独立 upstream main 游标：`43fd3d63e7059a5299847a4293d16808928112d1`。

本轮 API 中 beta1 与 beta2 的 prerelease 均为 true；此前记录的 beta1 false 已变化，不沿用旧元数据。中心正式版本配置仍是独立待维护项，本轮不把 beta 默认值推广为全站稳定版。

## 验收与退出条件

五语直接答案、排查和 FAQ 同步：三个动作已可改键；保留 v34 默认表；清楚披露 beta 的 X/F/R。速查页链接到真实稳定 tag 设置及 beta Release。更新既有 e2e 的旧固定键断言，保护五语边界、默认 F 行和自然互链。

运行内容审计、Astro 检查、完整 e2e、生产构建、链接审计、SEO 编辑前后问题集合对照、渲染影响路由比较与 diff 检查。生成 JSON 在构建前保留精确字节基线，核验本轮 extract 产物与并发状态后恢复，最终生产渲染使用基线数据。

维护任务不套用新长文各语 1500 词、逐节扩写、3 Reddit + 3 YouTube 和研究词数门槛，不编造计数。发布即完成并转 Monitoring；下次只在正式控制变化、已确认事实错误或完整 GSC final 窗口出现有效信号时重开。

## 验收与恢复记录

- 严格内容审计 95/95 通过，What's New 审计通过；Astro 检查 271 文件，0 errors、0 warnings、10 hints。
- 完整浏览器回归最终 450/450 通过（2.6 分钟）。复跑使用同一已构建测试产物，只修正测试路径，没有修改生产交互。
- 首轮内容审计 93/95：英、法新增段落各超出 240 字符，按设置入口与默认值拆段后通过。
- 首轮 e2e 445/450：Overtime 测试错误地把文章永久锁在首页最新五篇。改为首页“全部攻略”进入目录再打开原答案，保留全部事实、日期和来源断言；最新五篇仍由动态排序测试保护。
- 两次补丁因英文尾行和中文来源标签的猜测上下文不匹配而整体回滚；重读实际物理行并拆批后成功。没有覆盖用户改动，也未修改 AGENTS.md。
- 本轮 `pnpm build` 的 extract 带入上游 clone 的地图与元数据变化；任务开始时五个 JSON 字节基线已备份，核验后完整恢复。e2e 的私有配置在该基线上构建，避免把无关数据升级带入交付。
- 测试环境的 Feedlog 配置会增加全站路线图页脚入口，不能将其算成编辑影响。公开影响清单须以普通生产环境与编辑前生产快照比较。
- 最终普通生产构建 905 页，80.18 秒；43,127 个内部 href 无坏链。生成 JSON 与构建前字节基线一致，diff 检查通过。
- SEO 命令退出 1：编辑前与最终均为 87 个标题截断和 1 个 NL 双 H1，完整 88 项问题集合相同，十个维护答案均未命中。全站审计未通过，本轮没有新增问题。

## 受影响 URL（去重 25 个）

| URL | 变更类型 | 原因 |
| --- | --- | --- |
| https://openfront.fyi/shortcuts/ | 事实维护 | 修正可改键说明，区分稳定版与 beta |
| https://openfront.fyi/zh/shortcuts/ | 事实维护 | 修正可改键说明，区分稳定版与 beta |
| https://openfront.fyi/fr/shortcuts/ | 事实维护 | 修正可改键说明，区分稳定版与 beta |
| https://openfront.fyi/de/shortcuts/ | 事实维护 | 修正可改键说明，区分稳定版与 beta |
| https://openfront.fyi/nl/shortcuts/ | 事实维护 | 修正可改键说明，区分稳定版与 beta |
| https://openfront.fyi/guides/hotkeys/ | 事实维护 | 同步直接答案、故障排查、FAQ 与核验摘要 |
| https://openfront.fyi/zh/guides/hotkeys/ | 事实维护 | 同步直接答案、故障排查、FAQ 与核验摘要 |
| https://openfront.fyi/fr/guides/hotkeys/ | 事实维护 | 同步直接答案、故障排查、FAQ 与核验摘要 |
| https://openfront.fyi/de/guides/hotkeys/ | 事实维护 | 同步直接答案、故障排查、FAQ 与核验摘要 |
| https://openfront.fyi/nl/guides/hotkeys/ | 事实维护 | 同步直接答案、故障排查、FAQ 与核验摘要 |
| https://openfront.fyi/ | 阅读入口 | 真实维护日期更新最新五篇排序 |
| https://openfront.fyi/zh/ | 阅读入口 | 真实维护日期更新最新五篇排序 |
| https://openfront.fyi/fr/ | 阅读入口 | 真实维护日期更新最新五篇排序 |
| https://openfront.fyi/de/ | 阅读入口 | 真实维护日期更新最新五篇排序 |
| https://openfront.fyi/nl/ | 阅读入口 | 真实维护日期更新最新五篇排序 |
| https://openfront.fyi/guides/ | 目录 | 同步 Hotkeys 维护日期与列表顺序 |
| https://openfront.fyi/zh/guides/ | 目录 | 同步 Hotkeys 维护日期与列表顺序 |
| https://openfront.fyi/fr/guides/ | 目录 | 同步 Hotkeys 维护日期与列表顺序 |
| https://openfront.fyi/de/guides/ | 目录 | 同步 Hotkeys 维护日期与列表顺序 |
| https://openfront.fyi/nl/guides/ | 目录 | 同步 Hotkeys 维护日期与列表顺序 |
| https://openfront.fyi/nl/guides/clan-membership/ | 相关推荐 | 既有推荐随 Hotkeys 日期更新 |
| https://openfront.fyi/nl/guides/map-size-compact-mode/ | 相关推荐 | 既有推荐随 Hotkeys 日期更新 |
| https://openfront.fyi/nl/guides/ranked-mode-rating-system/ | 相关推荐 | 既有推荐随 Hotkeys 日期更新 |
| https://openfront.fyi/nl/guides/steam-early-access/ | 相关推荐 | 既有推荐随 Hotkeys 日期更新 |
| https://openfront.fyi/nl/guides/transport-landings/ | 相关推荐 | 既有推荐随 Hotkeys 日期更新 |

# 正式 v35 操作答案维护

日期：2026-10-21，Asia/Vladivostok。任务类型：既有搜索答案的正式版本与事实维护。没有新增页面。

## 玩家任务与唯一答案

词簇为 OpenFront shortcuts、keyboard shortcuts、hotkeys、keybinds 及五语对应词。玩家需要查当前默认键位，并在保存的旧绑定与新动作冲突时找到真正的设置入口。查键主答案仍是五语 `/shortcuts/`，五语 `/guides/hotkeys/` 负责练习与输入恢复；现有主答案能完整承接，不需要再建一篇 v35 tips。

历史有效需求依据沿用 [10 月 15 日维护记录](2026-10-15-keybinding-answer-maintenance.md)：GSC 属性 `sc-domain:openfront.fyi`，schemaVersion 2，web/final，2026-10-06 至 2026-10-12，所有国家和设备，byProperty 用于词指标，byPage 仅作落地诊断。该窗口已有相关点击与排名；本轮不虚构最新数值，也不把缓存年龄当成零需求。按既定周刷新，下次到期为 10 月 22 日。本轮由正式 Release 和已确认的过时操作说明触发，无需提前刷新 GSC。

缺口是 v0.35.0 已正式发布，但两组答案仍把 X/F/R 描述为 beta，表格、练习、场景和 FAQ 仍指导玩家用 F 全选舰队。改动同步五语，保留既有导航和两组页面的互链，并让真实维护日期进入首页与目录的既有排序。

## 一手证据与事实边界

实际读取 GitHub Releases API 及本地不可变 tag 源码；未以 upstream main 证明已发布行为。

| 来源 | 核验事实 |
| --- | --- |
| https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.2 | API 标记非 draft、非 prerelease，发布于 2026-10-17T05:34:47Z；累计正文的 v0.35.0 部分明确 X/F/R 和表情收藏键 |
| https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0 | 正式基础版本于 2026-10-16T17:06:49Z 发布；X 替代旧全舰队 F，F 打开表情，R 打开快捷聊天 |
| https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/src/client/UserSettings.ts | `getDefaultKeybinds`：selectAllWarships=KeyX、emojiMenu=KeyF、quickChat=KeyR、retaliateAttack=Shift+KeyR、resetGfx=KeyR、boxSelectWarships=ShiftLeft；自定义绑定合并优先，冲突的新默认键可被解绑 |
| https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/src/client/InputHandler.ts | 全舰队、快捷聊天、图形重置分别分派；图形重置要求默认 Alt 修饰键；表情菜单打开时收藏键不再驱动镜头 |
| https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/src/client/UserSettingModal.ts | 设置中仍有全舰队、图形重置与框选的独立绑定入口 |

正式 tag commit 为 `08b63c054897c030e6516e0731ab7cc62b2998b7`。独立 upstream main 游标为 `56586aa9b9141d8bef449bc396e3a37e3173790d`，后续未发布变更只作线索。

本轮核验范围是所改键位、绑定优先级和菜单输入上下文；没有重审旧核武成本、批量、建筑与对战数字，正文明确保留其各自引用的版本边界。没有把游戏界面迁移实现细节写成玩家机制。

## 验收与退出条件

五语正文、速查表、舰队场景和 FAQ 均使用 X；F 只用于当前表情或明确的 v34 历史/保存设置语境。保留 Alt+R 图形重置、Shift+R 反击、Shift 框选。为 F/R 增加速查行，镜头区说明 Q W E A S D 在表情菜单打开时的收藏语境。浏览器回归锁定动作所在行、正式来源、保存设置优先与两页互链。

本次交付推送并实际部署后即完成，转 Monitoring。以实际部署日 T 的 T+1 至 T+28 完整 GSC final 窗口评价固定词簇；国家/设备固定或分别报告，不能将组合变化或未完整窗口归因于编辑。正式操作变化、已确认错误可提前重开。

维护任务不适用新长文五语各 1500 词、每节扩写、3 Reddit + 3 YouTube 或 600 研究词配额。本轮没有新采集社区来源，不将历史来源冒充新研究。

首轮内容审计 90/95 的原因是审计器仅允许 v33/v34，五语 hotkeys 的 version/fresh 失败，正文长度与段落检查通过。同步允许已核验正式 v35 后完整内容审计通过。恢复已记入内容 runbook，未修改 AGENTS.md。

最终验收：content:audit 95/95，What's New 审计通过；Astro 检查 285 文件、0 errors、0 warnings、11 个既有 hints；完整 e2e 450/450，通过正式构建预览验证；普通生产构建 935 页；链接审计 44,563 个 href、935 HTML、0 坏链；git diff --check 通过。

SEO 全站审计仍退出 1：编辑前后均为 97 个标题截断和 1 个 NL 双 H1，完整 98 项诊断集合没有增减。十个直接维护答案均无命中；相邻 NL ranked-mode-rating-system 的既有标题截断未改变。普通生产渲染比较排除了测试环境的 Feedlog 页脚，生成 JSON 的字节 hash 保持基线，没有 extract 或数据恢复。

## 受影响 URL（去重 27 个）

| URL | 变更类型 | 原因 |
| --- | --- | --- |
| https://openfront.fyi/shortcuts/ | 事实维护 | 正式 X/F/R、改键、菜单上下文及来源 |
| https://openfront.fyi/zh/shortcuts/ | 事实维护 | 同步中文默认键位与设置边界 |
| https://openfront.fyi/fr/shortcuts/ | 事实维护 | 同步法语默认键位与设置边界 |
| https://openfront.fyi/de/shortcuts/ | 事实维护 | 同步德语默认键位与设置边界 |
| https://openfront.fyi/nl/shortcuts/ | 事实维护 | 同步荷兰语默认键位与设置边界 |
| https://openfront.fyi/guides/hotkeys/ | 事实维护 | 直接答案、舰队练习、FAQ 和摘要 |
| https://openfront.fyi/zh/guides/hotkeys/ | 事实维护 | 同步中文练习与故障排查 |
| https://openfront.fyi/fr/guides/hotkeys/ | 事实维护 | 同步法语练习与故障排查 |
| https://openfront.fyi/de/guides/hotkeys/ | 事实维护 | 同步德语练习与故障排查 |
| https://openfront.fyi/nl/guides/hotkeys/ | 事实维护 | 同步荷兰语练习与故障排查 |
| https://openfront.fyi/ | 阅读入口 | 真实维护日期改变最新攻略顺序 |
| https://openfront.fyi/zh/ | 阅读入口 | 中文最新攻略顺序与摘要更新 |
| https://openfront.fyi/fr/ | 阅读入口 | 法语最新攻略顺序与摘要更新 |
| https://openfront.fyi/de/ | 阅读入口 | 德语最新攻略顺序与摘要更新 |
| https://openfront.fyi/nl/ | 阅读入口 | 荷兰语最新攻略顺序与摘要更新 |
| https://openfront.fyi/guides/ | 目录入口 | 攻略元数据与排序更新 |
| https://openfront.fyi/zh/guides/ | 目录入口 | 中文攻略元数据与排序更新 |
| https://openfront.fyi/fr/guides/ | 目录入口 | 法语攻略元数据与排序更新 |
| https://openfront.fyi/de/guides/ | 目录入口 | 德语攻略元数据与排序更新 |
| https://openfront.fyi/nl/guides/ | 目录入口 | 荷兰语攻略元数据与排序更新 |
| https://openfront.fyi/nl/guides/clan-membership/ | 相关推荐 | 按维护日期重排相关教程 |
| https://openfront.fyi/nl/guides/map-size-compact-mode/ | 相关推荐 | 按维护日期重排相关教程 |
| https://openfront.fyi/nl/guides/ranked-mode-rating-system/ | 相关推荐 | 按维护日期重排相关教程 |
| https://openfront.fyi/nl/guides/steam-early-access/ | 相关推荐 | 按维护日期重排相关教程 |
| https://openfront.fyi/nl/guides/terra-nullius-capture/ | 相关推荐 | 按维护日期重排相关教程 |
| https://openfront.fyi/nl/guides/transport-landings/ | 相关推荐 | 按维护日期重排相关教程 |
| https://openfront.fyi/rss.xml | 订阅摘要 | 五语教程描述改为正式 v35 |

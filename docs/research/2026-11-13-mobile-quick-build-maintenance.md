# 移动端快捷建造：既有答案维护

访问日期：2026-11-13，Asia/Vladivostok。类型：正式版本触发的既有五语答案维护，不新增独立页。

## 玩家任务和唯一答案

- 词簇：OpenFront mobile controls、mobile build、touch build、手机建造、平板操作。
- 玩家任务：在手机或平板上区分选项目、移动放置预览和实际购买或发射。
- 数据口径与窗口：不以流量证明本轮选题；触发是正式 v36 操作已改变而旧指南仍要求环形菜单建造。最后有效 GSC 为 schemaVersion 2、web/final、2026-10-14..11-10，昨日刷新，常规刷新尚未到期；不把未知词级需求记成零。该滚动窗口不用于代替搜索计划固定窗口复盘。
- 既有主答案与唯一目标路由：`/guides/mobile-controls/` 及五语对应路由。安装下载页负责获取游戏，hotkeys 负责桌面键盘，版本页负责跨功能摘要，均不复制本操作答案。
- 缺口：旧建造小节要求打开动作菜单、选择 Build 再放置，且首屏缺少 v36 常驻栏的二次点按确认规则。
- 自然入口：保留既有安装页、First Match、移动意图入口及正文互链；不增加新导航或交互。
- 验收：五语相同操作顺序，保留攻击、外交的上下文菜单职责；单篇维护审计、逐节门槛、核心内容、Release 契约、类型、生产构建、内链、SEO 差异及精确生成文件哈希通过相应检查。
- 本 PR 合并即完成并转 Monitoring；下一触发为新的正式触控变化、已确认事实错误或自身完整 GSC final 窗口。实际部署日 T 由交付记录保存，效果窗口为 T+1..T+28，国家和设备固定或分列。

## 官方证据与版本边界

正式来源：

1. https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.2
2. https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/src/client/controllers/BuildPreviewController.ts

本轮按指定 `gh api -X GET 'repos/openfrontio/OpenFrontIO/releases?per_page=10'` 读取并筛选正式非 TEST 条目，最新仍为 v0.36.2，发布时间 2026-11-11T22:09:39Z。其完整正文中的 v0.36.0 Overview 和 Controls 段明确：

- 手机和平板有常驻建造栏，覆盖 structures、warships、missiles。
- 不再需要通过 radial menu 执行这些购买。
- 第一次点按预览，点其他位置移动，再点预览建造或发射。

同时读取对应正式 tag 的 BuildPreviewController，确认 touch placement 有独立预览状态、位置移动和确认事件。正文只采用 Release 明确的操作，不引入实现内部的确认距离数值、未经完整复核的升级数量规则或新快捷键。

独立 upstream main 游标为 `cd3c6048bb543a9f24ec3fc2fc40e0fc263829bc`，最新提交为修复 Android WebView 打开菜单的原始点按再次命中菜单。该提交不是新的正式 Release；本轮不把它写成已发布修复，也不据此更改指南对菜单故障的承诺。

站点配置仍为正式 v0.36.2；五语首页和 v36 changelog 已有对应入口，生成数据 `_meta.json.upstreamVersion` 仍为明确的 v35 快照。没有 extract，没有手改生成 JSON，没有把旧玩法数字标成已全量核验。

本次 `version: v36` 表示页面已包含 v36 建造栏，五语 freshnessSummary 明确仅此流程于本次复核。800 ms、10 client pixels、舰队选择及其余历史细节继续保留原 v0.33.14 事实边界，不声称所有操作都已验证到 v36。旧来源包继续保留原社区研究及观察日期，本次仅追加正式维护边界。

新长文的每语 1500 词及 3 Reddit + 3 YouTube 来源配额不适用于维护。未重复采集社区材料；本轮新核验官方来源为上述两个，旧研究来源不冒充本轮重新访问。

## 验证结果

维护单篇审计五语通过，全部九个正文小节各至少 401 词；德语最小 402，中文另按 Intl.Segmenter isWordLike 核对，各节 638/632/683/617/596/672/522/519/614。五语生产 HTML 均有本地化建造栏、移动预览与二次确认句，单 H1，title 无生成省略号。核心审计 95/95、What's New、正式 Release 契约 5/5、类型检查 0 errors/0 warnings、1115 页普通生产构建及 53,399 内链零断链检查通过。生成 JSON 精确 SHA256 全部不变，未执行恢复覆盖。全站 SEO 前后相同的 119 标题截断和 84 跳转链接问题，新增零；本轮目标五页无诊断。本站交互没有变化，未触发交互 e2e 要求。

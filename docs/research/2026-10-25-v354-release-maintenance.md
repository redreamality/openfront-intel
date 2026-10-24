# v0.35.4 公共对局保存修复：五语主答案维护

核验日期：2026-10-25（Asia/Vladivostok）。任务类型：正式 Release 响应、既有答案维护。发布后转 Monitoring，仅相关正式变化、确认错误或完整 final 观察窗口触发重开。

## 需求、缺口与唯一答案

目标词簇为 OpenFront v35 update / release notes 及五语对应版本变化查询；玩家任务为理解公共对局结束后 XP、统计与奖励缺失，以及跨设备等级不一致。已有五语 `/changelog/v35/` 负责版本主答案，足以承接需求，不新增页面。首页、What's New 与版本目录继续使用稳定路由。

Gate：干净 main `0d394e04b9348342902e96dfadd55ef982d9e0ed`，远端相同，自有开放 PR 为零。已有 v35.3 主答案尚未包含新正式补丁，首页版本配置仍为 v0.35.3。元数据 `upstreamVersion: v35` 是系列值；`upstreamCommit: f33d0049076b2931b73d06ac79d076799e54e8ac` 是提取 checkout，不冒充正式 tag。

GSC 沿用 2026-10-23 最近有效 schemaVersion 2 缓存，web/final 2026-10-14..20，全部国家与设备；每周刷新尚未到期，下次 2026-10-30。站点和 query 指标来自 byProperty，queryPage 仅用于 byPage 落地诊断，锚点单列。本轮由正式版本变化触发，不声称新增搜索需求或流量改善。原搜索批次等待 2026-10-10..11-06 完整 final 窗口。

## 官方来源与事实边界

实际读取固定上游仓库的 `gh api -X GET 'repos/openfrontio/OpenFrontIO/releases?per_page=10'`、单篇 Release 和 tag ref，确认：

- [正式 v0.35.4 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.4)：`draft=false`、`prerelease=false`、非 TEST；`published_at=2026-10-24T20:08:23Z`。
- [官方 tag ref](https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.35.4)：commit `14ba82badb1e945ef2e758999238339404fdb788`。
- upstream main 独立游标 `2e779e235b24fe5d531996efb28254e8e7b360ca`，不作为正式发布证明。

v0.35.4 的唯一新增条目说明：服务器过早放弃保存大型对局，导致自 v0.35.3 起多数公共对局没有发放 XP、统计或奖励，等级可能跨设备不同。补丁修复此问题；没有宣布历史补发、赔偿、XP 倍率或奖励速率调整。累计正文中的 v35.0 功能与 v35.3 地图、同盟、临时 XP 展示仍保留各自首次版本，不归入 v35.4 新增。

## 实施与验收定义

更新五语主答案标题、描述、直接答案、玩家行动与来源边界；最新正式 tag 的单一配置推进 v0.35.4，五语首页展示、最新入口和来源面板从配置派生。共享 FreshnessSummary 的“站点当前基线”同步新 tag，其他单篇适用版本与核验日期保持原值，不声称重新核验所有常青事实。元数据系列保持 v35，不运行无关 extract。

版本审计保护五语 XP、统计、奖励信号与 v0.35.0..4 来源。浏览器测试保护新直接答案、来源及首页版本入口。内容审计、Astro 检查、生产构建、链接、SEO 诊断比较、逐节计数与生成 JSON 精确 hash 验收；完整交付日志和逐行影响 URL 报告保存在 automation cache，并由当轮 memory 引用。

本任务没有新增独立长文，新增页的每语 1500 词和 3 Reddit + 3 YouTube 配额不适用。没有将社区旧研究冒充当轮采集。正文三个小节继续逐节核验至少 401 words，中文另用 Intl.Segmenter 的 isWordLike 计数。

# v0.36.9 正式 Release 响应维护

核验日期：2026-11-27，Asia/Vladivostok。任务类型：正式版本响应、五语既有答案维护。

## 意图与边界

- 目标词簇：OpenFront v36.9 / release notes / Featured store / sale banner；玩家任务是了解当前商店入口和为什么有时没有促销横幅。
- 唯一答案：既有 `/changelog/v36/` 及其 zh/fr/de/nl 版本；不新增薄补丁页。自然入口为五语首页现有最新版本卡片、版本索引和来源面板。
- 缺口：本站当前版本仍是 v0.36.8，首页未说明 Featured 默认入口和没有可购买商品时的横幅修复。
- GSC 本轮到期刷新成功：schemaVersion 2、web/final、2026-10-28 至 2026-11-24。站点与查询取 byProperty，queryPage 只用于 byPage 诊断，锚点单列。本轮由正式 Release 触发，不以缺查询判零需求，不推算 CTR 收益。
- 新长文的五语各 1500 词、3 Reddit + 3 YouTube 和 600 英文研究词配额不适用。保留既有三节结构，release 审计仍逐语核验每节至少 401 词，中文使用 Intl.Segmenter isWordLike。

## 官方来源

| URL | 日期、观察与局限 |
| --- | --- |
| https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.9 | 2026-11-27 实际读取完整 GitHub Release API 正文。draft=false、prerelease=false、非 TEST，published_at=2026-11-26T15:03:47Z。最新小节仅两项：默认 Featured 商店页；没有可购买促销商品时横幅修复。后续累积 v36.8 及更早章节不当作本次新增。 |
| https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.36.9 | 2026-11-27 核验为 commit 5004a6420d1ba5743291c56ed688b42b5f9e8e10。仅证明 tag 指向，没有运行上游测试或声称读取全部 tag 源码。 |
| https://github.com/openfrontio/OpenFrontIO/commit/32b10caebb17230ab7c5a6027f17d3b2427c3481 | 2026-11-27 通过 git ls-remote 取得 upstream main 独立游标；不作为本次公开机制事实来源。 |

Featured 首先显示当前闪购及倒计时，后面是新商品行和促销商品行，各带 See all 按钮。横幅修复的条件是玩家在该促销中没有任何可购买商品，已拥有闪购商品是正式正文给出的例子；不能扩写为所有已拥有商品必然隐藏全部促销。没有给出新折扣幅度、库存、购买权益或长期促销保证，也没有战斗、经济、地图、人数上限或权限变化。

v36.8 的最近 14 天 New 标记、Cosmetics New 页和 Steam Awards 临时横幅保留历史归属，不更换原发布日期。生成数据和 Footer 的 v35 范围不因商店补丁而变化，不运行 extract。

## 验收与观察

验收定义：五语首页卡片、配置、H1、description、直接答案和正式来源均推进到 v36.9；Featured 默认入口、闪购顺序、See all、无可购买商品及已拥有商品例子一致。维护 release 审计和现有五语浏览器流转断言，保护旧 v35 和自建房间范围。

运行 release/content 审计、Astro check、普通生产构建、内链、完整 SEO 诊断差异、生成 JSON SHA256 和 diff 检查；普通构建前后比较全部 HTML/XML，列全受影响 URL。实际结果与 PR/部署证据由 automation manifest 记录，不预写通过。

本 PR 合并并实际部署成功后转 Monitoring。固定本次版本/商店词簇；实际部署日 T 的 T+1 至 T+28 完整窗口成为 GSC final 后再复盘，国家和设备固定或分别报告，不把版本更新和组合变化归因于单次编辑。

# v35.9 教程范围五语补全

日期：2026-11-02。类型：已有正式版本答案事实维护；不新增独立页。

## 任务与选题

- 玩家任务：知道当前 Tutorial 是否覆盖核武器及征服 Nations，以及何时加入这些课程。
- 词簇：tutorial / how to play / v35.9 的版本子问题；由已确认事实遗漏触发，不预估点击收益。
- 唯一版本答案：五语 `/changelog/v35/`。初次上手的既定主答案仍为 `/guides/first-match/`；本轮不新增同义教程页。
- 当前落地及缺口：五语版本笔记已写 v35.9 捐赠榜与商店余额，却遗漏正式 Release 的教程扩充。原维护来源记录也错误地只列出两项变化。
- 自然入口：首页最新版本、What's New 与既有第一局互链；入口无需修改。
- GSC：沿用 2026-10-30 schemaVersion 2、web/final 缓存；7 天为 2026-10-21..27，28 天为 2026-09-30..10-27，下次刷新 2026-11-06。未到期不刷新；没有独立课程词指标不等于零需求。站点/query 为 byProperty，queryPage/byPage 仅诊断落地，锚点单列。

## 一手证据与边界

本轮实际通过 GitHub REST 读取[正式 v0.35.9 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.9)，发布时间 2026-10-30T22:56:37Z，非 draft、非 prerelease、非 TEST。正文第一条明确写入新玩家教程现已覆盖 nukes 与 conquering nations。其余两条是 Top donors 与捐赠后 Store 余额修复。本轮只依照 Release 确认课程范围，不从教程扩充推断核武器价格、伤害或 Nation AI 平衡改变。

教程本身、独立地图与 Poki/CrazyGames 新玩家入口来自[正式 v0.35.7 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.7)。五语原说明保留，新增课程明确归于 v35.9。未重新认证其他常青机制，也不刷新全篇事实核验日期。

Gate：干净 main `47e2a72ccaf998fd55bbb9188193600e3668b776`；REST 远端同 SHA，自有开放 PR 为空。正式最新版本仍 v0.35.9，统一配置为该 tag，生成元数据为 v35；五语版本笔记和从配置派生的首页版本展示/最新入口一致。未 extract。What's New 的独立 upstream main 游标从 `030274df6e377a57e784a9f6f9865720b0dfbbba` 前进到 `103bba550d3a39ceb623179a04687719cf8a051b`，仅为移除 v35 地图 New 分类的未发布改动；不视为正式上线，不改公开地图事实。

## 验收与退出

同轮补齐五语直接摘要、练习建议、来源边界，并更正原维护记录。维护不适用新长文五语各 1500 词与新增 3 Reddit + 3 YouTube 配额；继续通过版本审计保护三个小节各至少 401 的既有合同。新增版本审计检查明确保护 v35.9 的两项课程，避免再次遗漏。

按实际差异运行 release/content/check、普通生产构建、链接、SEO 前后诊断及 diff 检查；核验五语渲染单 H1、title、canonical、hreflang、首页版本与最新入口。构建前后保存所有生成 JSON 精确哈希及 HTML/XML 哈希，不触发无关 extract。纯正文维护，无交互行为改变，不要求 e2e。

结果：release 5/5，三节计数 en 829/945/768、fr 894/966/835、de 758/861/667、nl 805/890/693；zh 1152/1350/1128 汉字，均满足既有版本审计门槛。核心 95/95 与 What's New 通过；check 0 errors、0 warnings、11 hints；普通生产构建 1085 页，1090 HTML 的 51907 内链无断链。五语单 H1、title、canonical、hreflang 和首页最新版本入口通过。1093 个 HTML/XML 哈希仅五个版本页改变，五个生成 JSON 哈希完全不变。SEO 前后同为 115 个标题截断及 30 个跳转链接，完整诊断差异为 0，仍退出 1；根因和结果写入 build-test runbook，不声称全站 SEO PASS。

推送并部署成功即完成本维护并转 Monitoring；下一触发为正式教程变化、确认错误或自身完整 GSC final 窗口。部署日为 T，等待 T+1..T+28 完整 final 数据后复盘固定词簇及国家/设备；与其他搜索维护重叠，不作单次编辑因果归因。提交、远端和发布证据保存在 automation memory/cache，不另建纯状态提交。

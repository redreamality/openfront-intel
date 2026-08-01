# 2026-08-01 内容信号与 FRESH-02 来源包

本文件记录本次内容循环使用的一手来源、能够确认的结论和未能在线刷新的项目。Search Console 原始指标继续保留在 `.cache/gsc/`，这里不复制点击、展现、CTR 或排名数字。

## 编辑结论

- 今天不生产新文章，也不创建第二个内容 PR。
- `v33` 玩家影响总览 PR #4 已合并，当前战役下一项是 `FRESH-02`：为现有核心答案增加正文顶部新鲜度摘要。
- 本轮没有确认新的事实错误，也没有取得一个比 `v0.33.0-beta1` 更新且正文可用的正式 Release 证据。由于 GitHub API 后续连续 TLS 握手超时，不能把“在线未刷新”写成“绝对没有新版本”；因此本轮只研究和定范围。
- GSC 继续支持快捷键分工、经济增长和 Water Nukes 等候选，但这些属于 Next/观察池，不能越过当前战役。

## Release 与上游事实

### 最新已确认正式 Release

最新已确认、且已经进入站点主线的正式 Release 是 [`v0.33.0-beta1`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.0-beta1)。官方标签带 beta 名称，但 Release 元数据在已合并的来源包中核验为 `draft=false`、`prerelease=false`，正文包含真实改动而不是 `TEST` 占位。

玩家决策变化包括：

- MIRV 载体不是 SAM 目标，但分离后的弹头按普通核弹轨迹与 SAM 时序检查；发射还会令对应 Missile Silo 进入冷却。
- Doomsday 有 10 分钟宽限期，之后按波次提高领土门槛，并把失败方部队与战舰生命压到 5% 下限。
- Ranked 2v2 有 1 分钟出生保护；Warship 增加 3 级熟练度；右键可取消战舰/船只选择。
- 地图池增加 22 张地图并支持 impassable terrain，站点生成数据记录 117 张地图。

一手来源：

- [官方 v0.33.0-beta1 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.0-beta1)
- [SAM targeting](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.0-beta1/src/core/execution/SAMLauncherExecution.ts)
- [MIRV execution](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.0-beta1/src/core/execution/MIRVExecution.ts)
- [Doomsday schedule](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.0-beta1/src/core/game/DoomsdayClock.ts)
- [Warship veterancy configuration](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.0-beta1/src/core/configuration/Config.ts)
- [站点 v33 交付 PR #4](https://github.com/redreamality/openfront-intel/pull/4)

### 上游 checkout 状态

本地 `OpenFrontIO` clone 为干净的 `main`，HEAD 是 [`990eba61340f0b30dfa5f0611b4de8fe6eb08fee`](https://github.com/openfrontio/OpenFrontIO/commit/990eba61340f0b30dfa5f0611b4de8fe6eb08fee)，与 [`src/data/_meta.json`](../../src/data/_meta.json) 的 `upstreamCommit` 一致；该快照已经被 v33 extract 与完整回归使用。

本轮尝试在线刷新 Release 列表、Issues 和上游差异时，GitHub API 连续出现 TLS handshake timeout。没有可靠远端 compare 就不声称 `990eba6` 之后绝无变化，也不据此更新机制、键位、地图、数值或占领规则。

## Search Console 7/28 天意图

来源：本地 `.cache/gsc/top-queries-7d.md` 与 `.cache/gsc/top-queries-28d.md`，数据截止 2026-07-29；缓存不提交到仓库。

- Water Nukes 查询仍曾落到 guides 索引或 hotkeys；专页在报告截止后才上线，继续归入 `NUKE-01` 的 14 天观察，不重复建页或立即改稿。
- shortcuts、hotkeys、controls、keybinds 同时落到 `/shortcuts/` 与 `/guides/hotkeys/`；继续归入 `CTRL-01`，目标是明确“找键”和“练操作”的分工与互链。
- population growth、money guide、economy guide 指向 `/mechanics/economy/`；继续归入 `ECON-01`，优先扩写现有主答案，不拆成多个薄页。
- 品牌词错落到法语 About、德语首页等页面，等待 `FRESH-03` 首页入口重构后再判断，不追逐拼错品牌词。

## Issues 与 Feedlog

- 本次在线刷新因 GitHub API TLS 握手超时未完成；不能把网络失败当成“零 Issues”。
- 同日最近一次已确认状态仍是：GitHub Issues 没有真实玩家问题，Feedlog 只有系统 welcome；welcome、空帖和拼错品牌词均不得升级为选题。
- 项目公开入口由 [`src/config/feedback.ts`](../../src/config/feedback.ts) 控制：配置 `PUBLIC_FEEDLOG_URL` 时使用 Feedlog，否则回退到 GitHub Issues。当前仓库内没有可离线验证的新玩家帖子数据。

## FRESH-02 页面边界

唯一主落地页不变，不创建新路由。范围是现有 7 个核心答案的 en/zh/fr/de/nl 版本，共 35 页：

- guides：`first-match`、`hotkeys`、`water-nukes`
- strategies：`economy-fundamentals`、`ffa-opening`、`nuclear-deterrence`、`team-naval-control`

现状：这些页面已有 `version` 和 `updatedDate` frontmatter，但 [`DocLayout.astro`](../../src/layouts/DocLayout.astro) 只把日期放在标题元信息行，正文顶部没有统一展示“适用版本、最后核验日期、本版本最重要变化”。

下一次实施应：

1. 在内容 schema 中增加每页本地化的新鲜度摘要字段，并明确 `version` 表示当前适用版本，而不是功能最初引入版本。
2. 在 `DocLayout` 标题后、正文直接答案前渲染统一的静态摘要组件；不增加交互，不伪造截图。
3. 为 35 个页面填写一致的 v33 适用范围与页面专属变化；英文为事实母稿，中文重点编辑，fr/de/nl 同批同步。
4. 扩展 `scripts/audit-core-content.mjs`，严格检查所有核心页都有当前版本、核验日期和非空变化摘要。
5. 在 `e2e/content-integrity.spec.ts` 增加五语展示断言，并运行 content audit、build、link check 与完整 e2e。

## 等待理由

今天已创建并合并一个内容 PR，按每日上限不再创建第二个 PR。`FRESH-03` 与 `DOOM-01` 等待 `FRESH-02`；Next/Later 没有事实错误或正式 Release 级别的中断证据，因此继续等待。

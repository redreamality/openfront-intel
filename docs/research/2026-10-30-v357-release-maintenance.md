# v0.35.7 五语正式版本维护

日期：2026-10-30。类型：正式 Release 响应，维护既有五语 `/changelog/v35/` 与首页最新入口，不新增独立页面。

## 玩家任务与唯一答案

- 玩家任务：找到正式引导教程，理解氏族地图的 alpha 状态，识别加载失败时的新反馈，并正确理解商店的 AI 使用标签。
- 固定词簇：OpenFront v35 / v35.7 / update / release notes 与五语版本词。正式版本响应具有独立触发依据，无需先证明搜索需求；查询缓存缺失或过旧仍属于未知，不能当作零需求。
- 当前落地与唯一主答案：`/changelog/v35/`、`/zh/changelog/v35/`、`/fr/changelog/v35/`、`/de/changelog/v35/`、`/nl/changelog/v35/`。既有系列文章足以承接四项补丁变化，无需新增教程、氏族地图或 AI 标签独立页。
- 自然入口：五语首页最新版本卡片及已有版本索引。仅同步本轮受影响的入口与正式版本内容，不将其他常青攻略的核验日期批量刷新。

## 一手来源与游标

访问日期：2026-10-30。实际读取官方 GitHub REST 返回的 Release 完整正文，再按 `# v0.35.7` 至下一版本标题之间的内容识别本轮增量。新 Release 下重复列出的旧版本内容仍保留原始引入边界。

- [官方 v0.35.7 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.7)：通过 `gh api -X GET 'repos/openfrontio/OpenFrontIO/releases?per_page=10'` 核验，最新正式条目为 `v0.35.7`，`draft=false`、`prerelease=false`，非 TEST。四项新增事实均来自这一正式正文。
- [Release API](https://api.github.com/repos/openfrontio/OpenFrontIO/releases/tags/v0.35.7)：`published_at=2026-10-29T18:41:06Z`，对应本地 2026-10-30 04:41:06 +10；`created_at=2026-10-29T18:39:28Z`。正文日期为 October 29, 2026，不能把本地访问日期当作上游发布日期。
- [正式 tag ref](https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.35.7)：直接指向 commit `c144d134d1503191b4c3fd9a866fc583b9ecea4a`，`object.type=commit`；与 Release 的 `target_commitish` 一致。
- [上游 main API](https://api.github.com/repos/openfrontio/OpenFrontIO/commits/main)：独立游标为 `d968c421dc25159f884182e6a22c129b9cdd0a53`，committer 日期 `2026-10-29T21:45:13Z`。该提交是公开 API 文档同步，不能替代正式 Release 判断或当成已发布玩法变化。
- 本站生成数据沿用既有 v35 系列与 checkout `f33d0049076b2931b73d06ac79d076799e54e8ac`。本轮只做 Release 正文维护，不运行 extract，不把数据 checkout 冒充正式 v0.35.7 tag。

## 四项正式增量及事实边界

1. **氏族领土地图。** 正式正文宣布氏族菜单的 Map 标签页已开放 clan territory map，并明确标为 alpha。可告诉玩家去哪里看以及仍是早期功能；不推导领土计算方法、更新频率、奖励、争夺规则或全部氏族的可用性。
2. **引导教程。** Tutorial 按钮提供独立地图，带新玩家学习出生、扩张、兵力和首次攻击；Poki 与 CrazyGames 的新玩家从这个教程开始。可指引初学者先用该按钮练习；不声称所有平台的所有既有玩家都会被强制进入，也不推导教程地图的完整机制、胜利门槛、账户条件或奖励。
3. **加载失败反馈。** 加入大厅或开始单人游戏时，如果游戏加载失败，现在会显示错误消息，取代反复退回菜单的情况。此项改变错误可见性，不代表全部加载原因已消除，也不保证重连、进度恢复或自动修复成功。
4. **商店 AI 标签。** 外观商品现在也会显示 `No AI used` 或 `AI use unknown`，不再仅有 `Made with AI assistance`。转述三种标签的区别；`AI use unknown` 表示使用情况未知，不能解释为确定使用或确定未使用，不推导第三方审计、作者资质或版权保证。

本补丁的新段落未列出战斗、核武、经济数值或地图地形平衡变化。既有 v35.6 的 Poki 准备、大厅加入画面修复、扩展条款说明，v35.5 的团队出生与动态轮换，以及 v35.4 的保存修复继续保留各自版本边界；不将本轮教程自动进入机制外推为此前所有 Poki 集成承诺均已完成。

## 实施验收与退出

五语同步 title、description、直接答案、下一局操作建议及官方来源。统一版本配置推进至 v0.35.7，五语首页最新入口与摘要同步。版本文章没有独立 freshnessSummary 字段；不向其他常青页写入虚假的核验日期。保留三节结构与原有历史事实，不通过制造新页、刷新无关日期或重复社区采集满足配额。

2026-10-30 到期 GSC 刷新成功：7 天窗口为 2026-10-21 至 2026-10-27，28 天为 2026-09-30 至 2026-10-27，均为 schemaVersion 2、web、final，国家/设备未筛选。站点与查询指标取 byProperty，queryPage 的 byPage 仅作落地诊断，锚点单列；私有响应仅保存在 automation cache。10/9 搜索改善的完整观察窗口尚未结束，本轮不据新缓存推断编辑成效，也不以本地修改代替部署结果。

验收按维护差异检查四项事实、alpha 与 unknown 边界、五语一致性、内部及官方链接、渲染 title/单 H1/canonical/hreflang、每节至少 401 词，以及 release/content 审计、check、生产构建、链接和 SEO 审计。首页入口摘要变化同步 e2e，并执行完整回归。构建前后核对生成数据精确基线，仅在确认本轮产生噪声且无并发修改时恢复。

本轮是既有答案维护，新独立长文的五语各 1500 词、3 Reddit + 3 YouTube 与 600 英文研究词门槛不适用；不编造社区来源数量。中文正文仍另按 `Intl.Segmenter('zh', { granularity: 'word' })` 的 `isWordLike` 核验实际分词。

成功部署即完成本轮正式版本响应并转 Monitoring。真实部署日为 T，T+1 至 T+28 的完整窗口成为 GSC final 数据后再复盘固定版本词簇，国家/设备固定或分别报告；与既有搜索恢复包的重叠维护不作单次改动因果归因。后续只由新正式版本、已确认事实错误或自身完整观察窗口触发重开。

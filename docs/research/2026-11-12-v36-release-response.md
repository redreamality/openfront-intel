# v36 正式版本响应：事实边界与交付定义

访问与核验：2026-11-12，UTC+10。任务类型：正式 Release 响应，维护五语系列版本主答案及已有首页入口，不新增独立机制攻略。

## 选题与唯一答案

- 玩家任务：理解 v36 的存档、回放接管、FFA Rating、地图和操作变化，以及 v36.2 对核弹预览和公开托管房间的修正。
- 词簇：OpenFront v36、v36.2、release notes、更新、版本笔记；属于正式版本响应，不依赖搜索量证明。
- 当前落地：五语首页仍指向 `/changelog/v35/`，最新配置为 v0.35.10，无法把 v36 能力清晰交代为一个独立系列。
- 唯一主答案：`/changelog/v36/`，语言对应路由为 `/zh/changelog/v36/`、`/fr/changelog/v36/`、`/de/changelog/v36/`、`/nl/changelog/v36/`。保留 v35 历史版本页。
- 自然入口：五语首页最新版本 CTA、优先阅读卡片、What's New 文章列表与 changelog 索引；不复制泛 tips 答案。
- 数据窗口/口径：本任务未以 GSC 流量作选题依据；搜索数据缺失或陈旧不解释为零需求。由主流程判断到期刷新与固定词簇复盘。
- 验收定义：五语事实一致，明确 .0/.1/.2 覆盖关系，首页当前版本与链接一致，Release 契约、内容、类型、构建、链接、SEO 和必要 e2e 完成；提交与部署证据由主流程另行记录。
- 新 guide 的每语 1500 词、3 Reddit + 3 YouTube 配额不适用于此正式版本维护。每个正文小节仍遵守项目逐节门槛，不以此记录替代正文审计。

## 正式来源与双游标

按要求执行 `gh api -X GET 'repos/openfrontio/OpenFrontIO/releases?per_page=10'`，过滤 `draft=false`、`prerelease=false` 并排除 TEST 占位；最新有效条目为 **v0.36.2**。完整读取其官方正文，其中包含 v0.36.2、v0.36.1 与 v0.36.0 各节。三个 tag ref 均直接指向 commit，而非 annotated tag。

| 正式 Release | GitHub API `published_at`（UTC） | tag commit | 正文日期 |
|---|---|---|---|
| [v0.36.0](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0) | 2026-11-09T16:58:23Z | `0211f17b71efa762242b620b91ffa5d8439522e6` | November 9, 2026 |
| [v0.36.1](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.1) | 2026-11-10T02:14:08Z | `bc3e3334c573c4959ec6a6745df6826d07233b4d` | November 9, 2026 |
| [v0.36.2](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.2) | 2026-11-11T22:09:39Z | `8b5d071eed95f07c701b32e4c64e95b03f8577c1` | November 11, 2026 |

注意：v0.36.1 正文日期与 API 发布时间不同；不能把正文的 November 9 直接说成 API 发布日。

独立读取 `gh api -X GET 'repos/openfrontio/OpenFrontIO/git/ref/heads/main'`：本轮 upstream main 为 `906d93ffa56d1810998de249d92d67457ce7c6d4`。它只作为 What's New 上游 main 游标，不能替代正式 Release/tag 或被当成已上线机制。

## 事实矩阵

以下事实直接来自 [v0.36.2 正式 Release 的对应版本段落](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.2)，不依据社区转述。

| 玩家决策 | 正式版本与事实 | 必须保留的边界 |
|---|---|---|
| 保存和分享单人局 | v0.36.0：登录玩家可从对局菜单保存，在 Solo 的 Saved games 栏恢复、重命名、删除或分享；分享链接或代码可用于 Steam 和游戏门户 | 游客可以玩分享存档；不能把这句话扩大成游客拥有完整保存/账户管理能力，也不承诺任意门户账户间权益自动同步 |
| 从回放重试 | v0.36.0：新回放器成为默认；暂停后 Continue，选仍存活的玩家和其他真人对应的难度，进入该时刻的单人分支；Settings 保留经典回放开关 | 这是单人接管，不会恢复原公共多人对局，也不证明改变原局成绩或奖励 |
| 查看 FFA Rating | v0.36.0：OFstats 的 FFA Rating 取代 ranked FFA queue；公共 FFA 计入，展示评分与 uncertainty；完成十局校准后定级 | 八个段位从 Iron 到 Grandmaster，各榜最多列该段位 top 250；这些是展示与校准边界，不能推导未公布的评分公式或保证每局固定增减分 |
| 选新地图 | v0.36.0：Paris、London、Mexico、Canada、Türkiye、Ottoman Empire (1683)、Zealandia、Brahmaputra；Atlas 为 100+ 现实世界地图提供地图针与预览 | v0.36.1 才把 Turkiye、Ottoman 和 Zealandia 加入 New 分类与 Atlas 并微调地图针；不能把 .1 分类补齐说成首次加入所有地图 |
| 判断 World 系列与设备 | v0.36.0：World 重新构建，World 4000 取代已退役 Giant World；World 10000 宽 10,000 pixels、377 Nations，面向自定义局和锦标赛 | 官方明确 World 10000 对手机过重；不能把“大地图性能改善”说成手机已适合运行这张图，也不能沿用旧 Giant World 的入口或旧地形作当前推荐 |
| 手机建造 | v0.36.0：手机和平板拥有常驻建造栏，含结构、战舰、导弹；首次点按预览，点别处移动，再点预览确认建造/发射 | 双阶段位置确认仍然存在；不能说首次点击就直接执行 |
| 默认新快捷键 | v0.36.0：J 给鼠标下盟友送兵，O 打开送金窗口，I 切换玩家面板，按住 H 新建而非升级附近建筑 | 建造键同点重复为 1→5→10→15，最多 50；Alt+scroll 每次调 1；布局提示跟随键盘，例如 AZERTY 为 ZQSD，Settings 可改键。不能把默认值当成覆盖自定义绑定 |
| 私人局胜利门槛 | v0.36.0：私人对局 host 可把门槛设为 10%–99.9%，默认仍 80%，Overtime 从所选门槛倒数 | 这是私人局选项，不是所有公共局改成任意门槛；预设保存 Create Game/Solo 设置也不表示公共匹配规则随意改变 |
| 公开列出的托管房间人数 | v0.36.2：publicly listed hosted lobbies 的上限从统一 100 改为地图决定，与公共大厅一致；The Box 为 210，小地图更少 | 此人数改动与私人局胜利百分比是两个不同范围，不能说全部房间都是 210，也不能把 210 当私人房间的统一硬上限 |
| 核弹叛徒警告 | v0.36.0 的说明为黄圈表示仅结束与叛徒或掉线盟友的联盟，叛徒惩罚警告闪红；v0.36.2 把会标记自己为叛徒的范围圈恢复成实心红色 | 当前 .2 答案以实心红色为准，不能继续把闪红白当成最新版提示；预览颜色说明不等于宣布更改所有背叛、伤害或核武数值 |
| 切地和路径 | v0.36.0：核弹切断的突出部即使弹坑隔在海岸间也会被兼并，Nation 同 tick 不重复兼并，内陆小边角不再误丢；弯折河流船只路径修复 | 只写官方宣布的行为；不能借此重述未经核验的接收者、18 格或金币公式 |
| 火车和贸易 | v0.36.0：火车从首 tick 起恢复每 tick 2 格（此前首 tick 为 3）；修复超高港口等级导致贸易相关崩溃，trade odds 不变 | 性能与稳定性修复不证明贸易概率增加，也不升级整个旧经济快照的验证范围 |
| Nation 应对 | v0.36.0：同 tick 双攻击不再让 Nation 派出全军；岛屿 Nation 先渡海打 bots 再打玩家；禁用原子弹时会为氢弹储蓄 | 不能把“禁用原子弹”误写成禁用全部核武，或推导所有难度、模式采取完全相同策略 |
| 其他 .2 操作入口 | v0.36.2：促销 banner/倒计时点入商店 On sale；姓名骰子和 Tribe/Anon 设置；Clans 的 Map 全屏与返回按钮，所有成员可见侧栏；地图提示更宽居中 | 地图全屏与成员侧栏没有公布新的占领评分、奖励或刷新频率，不能补造公式 |

## 版本与数据范围

研究开始时 `src/config/openfront-release.ts` 为 v0.35.10，`src/data/_meta.json.upstreamVersion` 为 v35，提取 checkout 为 `f33d0049076b2931b73d06ac79d076799e54e8ac`，`generatedAt` 为 `2026-10-22T05:58:55.636Z`。

本轮正式版本配置和首页入口应推进至 v0.36.2 与 v36；数据元信息仍表示旧结构化快照和验证范围。不得手改生成 JSON，把 v35 改成 v36 或刷新所有常青文章核验日期。Footer 按项目合同仍从元信息取快照版本，并保留五语 `{version}`；首页最新正式版本须从正式 Release 配置派生，以免把快照范围冒充最新游戏版本。

旧指南仍按各自日期与版本负责具体数值；本系列页承担跨版本变化摘要。后续如维护快捷键、手机建造、FFA、World 或切地专题，应只复核涉及的事实和对应正式来源，不能把本次 Release 阅读视为所有专题全面复核。

## 验收与下一触发

本批五语版本页与首页发布即完成并回到 Monitoring；下一次由新正式 Release、确认事实错误或自身完整 GSC final 窗口触发。实际提交、远端与部署状态记录在 automation memory，不为运行叙事另开提交。

验证结果：

- `pnpm release:audit` 五语 5/5；三个小节词数分别为 en 465/483/469、zh 503/519/466、fr 494/494/479、de 449/458/460、nl 473/484/480，均超过逐节 401 门槛；中文使用 `Intl.Segmenter` 的 `isWordLike`，不是汉字抵扣。
- `pnpm content:audit` 核心 95/95 与 What's New 通过；`pnpm check` 为 0 errors、0 warnings、11 个既有 hints。
- `pnpm exec astro build` 普通生产构建 1115 页、1120 HTML；`pnpm check:links` 检查 53,399 内链，零断链。
- `pnpm test:e2e` 通过 521/521。外置缓存配置保留生产环境测试开关，只改绝对工作路径、输出路径、独立端口及跳过无关 extract；包含五语首页当前版本、跳转、当前 .2 事实、v35 历史来源和手机宽度。
- `pnpm seo:audit -- --verbose` 编辑前后均退出 1，119 个既有标题截断和 84 个跳转链接的完整诊断集合相同，新增/消除均为 0。本批五语 v36 页无命中，不宣称全站 SEO PASS；五语最终渲染 title 均包含 v36.2。
- 普通生产 HTML/XML 从 1118 增至 1123，逐文件 SHA256 比较确认 932 个受影响 URL（包括共享站点基线、相邻导航与索引）。完整逐行清单保存在 automation cache 的 `v36-delivery-report.md`，不把所有影响缩成五篇文章；全部生成 JSON 精确哈希不变，未运行 extract、未恢复或覆盖数据。
- 到期 GSC 刷新成功：schemaVersion 2，web/final，2026-10-14 至 2026-11-10；站点与 query 使用 byProperty，queryPage 为 byPage，锚点单列。仅为新鲜数据缓存，不用于本批正式版本响应的选题证明，也不把混合国家/设备总体变化当编辑因果。完整固定窗口复盘另按搜索计划执行。

本研究来源命令均成功。主流程一次猜测不存在的 HomeHero 路径、一次 runbook 标题上下文不匹配均已恢复，失败模式记入 tooling-filesystem runbook；全站 SEO 的既有非零结果记入 build-test runbook。未修改 AGENTS.md，未访问 archive 或 Feedlog。

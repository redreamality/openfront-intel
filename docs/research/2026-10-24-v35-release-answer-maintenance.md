# v35 版本主答案维护：清除旧版正文与来源误归属

研究日期：2026-10-24，Asia/Vladivostok。任务类型：既有答案事实维护 / 正式 Release 响应。本地编辑和验收不等于发布；提交、远端与部署结果记录在本轮交付报告及 automation memory。

## 玩家任务与唯一答案

- 目标词簇：OpenFront v35、v35 update、v35 release notes、对应五语版本变化查询。玩家任务是在进入下一局前判断 v35 已发布的变化、v35.3 的新增修复及相关攻略入口。
- 唯一主答案：已有的 `/changelog/v35/`、`/zh/changelog/v35/`、`/fr/changelog/v35/`、`/de/changelog/v35/`、`/nl/changelog/v35/`。五语首页、What's New 与版本索引继续导向这些稳定路由；不新建重复独立页。
- 已确认缺口：五语 v35 正文保留了大量 v34 文章段落，并把 v0.34.18、v0.34.22 等旧补丁称为当前正式边界。英文直接答案标题仍只写到 v35.2。新版标题和开头不足以纠正后文的相互矛盾。
- 来源误归属：旧文称本站数据库从正式 tag 提取，实际 `src/data/_meta.json.upstreamCommit` 为 `f33d0049076b2931b73d06ac79d076799e54e8ac`，不是 v0.35.3 tag commit。`upstreamVersion: v35` 是系列级编辑边界，不能证明 checkout 就是正式 tag。
- 自然入口：保留现有首页、What's New、版本索引，以及到 Nation、核切、经济、Ranked、操作和回放主答案的站内阅读路径。历史 v34 规则若需要解释，导向 v34 版本文章，不继续占据 v35 的直接答案。
- GSC：本轮由已确认事实错误和正式版本响应触发，不声明新增搜索需求。沿用最近有效 schemaVersion 2 缓存，窗口为 2026-10-14 至 2026-10-20，web/final；站点与 query 指标为 byProperty，queryPage 仅作 byPage 落地诊断，锚点单列。原搜索改善批次 2026-10-10 至 2026-11-06 的完整窗口尚未结束，不能作编辑因果判断。
- 维护边界：没有新增独立长文，不适用新增页的 3 Reddit + 3 YouTube、600 英文研究词及逐语 1500 词配额。被维护正文仍遵守项目每个正文小节至少 401 words 的要求；五语事实、官方来源、实际链接和渲染结果需一致。

## 正式版本与一手来源

本轮通过固定仓库的 `gh api -X GET` 实际读取官方 Release JSON，并打开官方 v0.35.0 / v0.35.3 Release 页面。以下四项均为 `draft=false`、`prerelease=false` 且正文不是 TEST。

| 正式版本 | GitHub API published_at（UTC） | 证据 |
|---|---|---|
| v0.35.0 | 2026-10-16T17:06:49Z | [官方 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0) |
| v0.35.1 | 2026-10-17T00:05:52Z | [官方 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.1) |
| v0.35.2 | 2026-10-17T05:34:47Z | [官方 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.2) |
| v0.35.3 | 2026-10-23T16:01:39Z | [官方 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.3) |

v0.35.1 和 v0.35.2 的正文日期均写 October 16；涉及实际发布时间时以 API 的上述 UTC 时间为准。v0.35.3 的 Release 正文包含累计 v0.35.0–v0.35.2 说明，不能把全部累计功能都归为 v35.3 新增。

官方 tag ref 直接返回 commit：

- [v0.35.0 ref](https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.35.0)：`dfd420fd7836ae023504a9440d9d68897745b7b4`。
- [v0.35.3 ref](https://api.github.com/repos/openfrontio/OpenFrontIO/git/ref/tags/v0.35.3)：`a2d20f8e5f32573c7a6a7e0b8900dcfeac4357e7`。

本轮玩法摘要以真实 Release 正文为依据，不重新解释未涉及的引擎数字，不把 upstream main 状态当作发布证明，也不刷新生成数据来制造来源一致。

## v35.0 功能线与写作边界

以下事实直接来自 [v0.35.0 正式 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0)，访问日期均为 2026-10-24：

| 玩家主题 | 正文明确支持的变化 | 不应扩大为 |
|---|---|---|
| Nation 压力 | 更晚攒钱、持续建造、进攻前筑防、反击、海战、登陆防守与压制 FFA 领先者；Easy 保留旧行为 | 所有难度都使用完全相同的新策略 |
| 滩头与海路 | Hard / Impossible 派 1% 兵力滩头船，登陆 tick 接地面攻击；船路上限 300 / 500 格；战舰编队清理封锁 | 每次小运输船都是可忽略骚扰，或任何海岸都有安全运输线 |
| 经济 | 少量 Port / Factory 的商船和 Train 生成更快；更多建筑仍会带来更多总体贸易 | 每座 Factory 固定增加某比例黄金，或所有对局有固定回本时间 |
| 核切 | 核弹切断敌方领土后，断块可再次交给周边敌人，修复原先沿海帝国的失效路径 | 任意切断都保证归投弹者；精确捕获条件仍由核切主答案解释 |
| Ranked | 新 Ranked FFA 为 4–10 人，按 ELO 匹配，20 分钟计时，最后一名真人存活时结束；Clan Wars 每方 2–5 人、最多四个氏族，以氏族计评级；需要 trusted account | 所有 FFA 都只容纳 4–10 人，或普通公共房间也一律采用 Ranked 条件 |
| 等级 | 每局获得 XP；等级 100 可 Prestige，经 P10 到 Legend；每 25 级有 Plutonium 奖励；trusted 前扣住等级 Plutonium | 临时 XP 已结算，或购买/等级直接改变一局内战斗强度 |
| 回放 | 浏览器内处理并支持时间轴跳转；正文 Overview 明示默认关闭并逐步推出 | Release 发布当天所有账号立即可用，或约 20 ms 是所有设备保证值 |
| 默认快捷键 | R 快捷聊天，F 表情菜单，X 全选战舰；收藏表情 Q W E A S D；K/L 同盟、N 目标、B 船攻 | 已自定义映射的玩家也必须使用相同键位 |
| 大厅 | 取消原 125 人上限，按地图土地规模确定；Release 示例 The Box 210、Alps 185、Middle East 170 | 每个模式、队数、Compact 设置都固定采用这些示例人数 |
| 地图 | Madagascar、Horn of Africa、Vancouver Island、Cape of Good Hope、Canary Islands、Bab el-Mandeb Strait、Rio de Janeiro、Pulicat Lake、Benelux、Brain Rot、Ommatrypta；Maps 小节另列 New Zealand | Ommatrypta 是永久地图；正文将其限定为 Halloween |
| 性能 | 首页首次压缩下载从 661 KB 逐步降到 220 KB，客户端与模态内容按需加载 | 所有设备每局速度固定提升某比例 |

## v35.1、v35.2 与 v35.3 增量

[v0.35.1](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.1) 的独立新增说明是：资料卡使用最近对局的氏族标签、Antarctica / Deglaciated Antarctica 的部落主题，以及在游戏门户隐藏商店、Steam 宣传和资料分享链接。它们不能被写成新的战斗公式。

[v0.35.2](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.2) 恢复建造预览跟随鼠标。吸附到实际建造格的行为成为 Gameplay 中的 Snap Build Preview 设置，默认关闭；另修复重进同局的多标签页或多设备玩家未被正确踢出。该说明属于 v35.2，不是 v35.3 新增。

[v0.35.3](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.3) 的顶部新增正文包括：

- 部落会和成为叛徒的相邻对象断盟并攻击；Hard / Impossible Nation 在小型对局中不再每次拒绝续盟。“不再总拒绝”不能改成“必然接受”。
- Settings > Graphics 的 Map Layers 可统一隐藏装饰图层；按住空格的 alternate view 也隐藏陆地图层，帮助看清 Brain Rot / Ommatrypta 下方地形。
- 增加十条快捷聊天短语，主要涉及同盟和核武。
- 对局结束时仍存活的玩家立即看到临时 XP；回放可在处理尚未结束时观看。两者不能推导出最终结算已经完成或所有账号的回放开关已统一开启。
- 修复底部大厅广告覆盖游戏操作、部分语言手机攻击比例滑块出屏，以及 Water Nuke 使 Port / Warship 周边无水时的崩溃。
- Steam overlay 无法显示的桌面环境可在浏览器完成购买批准，返回游戏后接续处理；说明特别涉及 Wayland 下的 Linux。
- 防止大厅公开过程中的非法配置竞态，修复兵力重复漏洞；版本文章只说明修复结果，不描述复现与利用步骤。
- 未验证用户名按 Name#1234 显示；服务端执行 20 字符用户名限制。
- Brain Rot 增加渡口并降低中央高峰，Ommatrypta 水域与不可通行区域显示改善，两张 Halloween 地图偏好更多队伍；翻译更新到 mls v5.21。

## 验收定义与下一触发点

五语版本文章应完整解释 v35 功能线与 v35.1–v35.3 的增量，删去旧 v34 当前边界、假 tag 提取和旧地图新增归属。Release 审计必须检查实际 v35 事实，而非要求复制 v34 的 10% 战速、39% tick benchmark 或旧地图名单。保留 frontmatter 的 `version: v35`、Released 状态、规范标签与各语种栏目分类。

本轮发布即完成并回到 Monitoring。原搜索改善批次继续等待既定完整 final 窗口；此维护批次以实际部署日 T 另记 T+1 至 T+28。只有新的正式 Release、确认的事实错误或完整观察窗口触发重开；不因单日流量或日更配额继续扩写。

# 2026-08-20 `What's New` 上游情报源调研与每日扫描方案

本文件回答三个问题：OpenFrontIO 的 GitHub Issues、PR 与 Releases 中，哪些信号值得面向玩家披露；如何避免把开发进度误写成已上线功能；如何把这条来源接入 `content-loop.md` 的每日执行账本。调查只使用 [`openfrontio/OpenFrontIO`](https://github.com/openfrontio/OpenFrontIO) 的官方 Issue、PR、Release、commit、milestone 与源码记录。

## 编辑结论

- 建议在每日账本新增内部 section `What's New 上游雷达`，再由 `WN-01` 按 [`whats-new-content-plan.md`](../whats-new-content-plan.md) 实现五语公共 `/whats-new/`。公共页是经过筛选的状态视图，不是把所有开放 Issue 自动发布到站点的 GitHub 活动流。
- 只有正式 Release 或正式 tag 源码已经证明功能上线，才能对玩家使用“已上线”的现在时。公共页可以把高价值 PR 显示为 `Merged` 或 `In development`，但必须直接写“尚未确认发布版本”或“最终行为可能变化”；Issue 带 `approved`、进入 milestone，也不能单独证明已经上线。
- 当前最值得进入准备队列的是 Doomsday 两项规则变化、Water Nukes 寻路修复、Port 商船生成修复、Detailed View 大厅浏览器与 clan treasury 捐赠。它们都已合并到 `main`，但没有进入 [`v0.33.6`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.6)，只能写成“已合并，等待正式 Release”。
- 当前最值得持续跟踪的开放 PR 是 spectator、SAM 动态升级范围、地图预加载、cosmetic loadouts、skin/effects preview、联盟冷却显示、色觉无障碍配色与 ranked 2v2 固定队友。玩家结果和评审状态足够稳定的少数项可进入公共 `In development`，其余只做内部准备；任何一项都不能写成当前玩法。
- exploit、反作弊和身份绕过类 Issue 单独进入受限监控。即使 Issue 本身公开，也不应由攻略站扩大传播可执行复现步骤；修复正式发布后只披露玩家需要知道的结果与防护边界。
- 纯后台 adminbot/API、i18n 去重、store refactor、依赖与作者明确标为“不必公告”的整理项，不进入玩家 `What's New`。

## 调查快照与来源质量

截至 2026-08-20，本轮通过 GitHub 官方 API 核验到：

- 仓库默认分支为 `main`，GitHub 仓库计数为 159 个开放 Issue/PR；其中 REST Pulls 列表有 27 个开放 PR，Issue 搜索有 132 个开放 Issue。仓库未启用 Discussions，因此不能把 Discussions 当成每日来源。
- 最新正式、非 draft、非 prerelease 且正文不是 `TEST` 的 Release 是 [`v0.33.6`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.6)，发布于 `2026-08-19T18:14:29Z`，tag commit 为 [`bebc953`](https://github.com/openfrontio/OpenFrontIO/commit/bebc953804e5ef2834642a21bb602eb9014a3a12)。正文的 v0.33.6 段只列出旧版本回放、Luna 公共多人频率降低和 rejoin 限流三项。
- 当前 `main` 为 [`9c97e01`](https://github.com/openfrontio/OpenFrontIO/commit/9c97e01dab7cee5b702706f00f10a944f9b84a38)。从账本上一轮记录的 [`0b0c765`](https://github.com/openfrontio/OpenFrontIO/commit/0b0c7653f0bb016f52c9974c5367ba72d58f8f2a) 到当前 `main` 是 8 个真实日增量，见[精确 compare](https://github.com/openfrontio/OpenFrontIO/compare/0b0c7653f0bb016f52c9974c5367ba72d58f8f2a...9c97e01dab7cee5b702706f00f10a944f9b84a38)。
- v34 milestone 是 [`#15`](https://github.com/openfrontio/OpenFrontIO/milestone/15)，v35 milestone 是 [`#16`](https://github.com/openfrontio/OpenFrontIO/milestone/16)。Milestone 表达规划归属，不是交付日期保证。
- 官方 [`Development Roadmap #3694`](https://github.com/openfrontio/OpenFrontIO/issues/3694) 自称 living document，但正文标注最后更新于 2026 年 4 月，且包含后来已上线的旧项目。因此它适合发现候选，不适合作为当前状态真相；状态必须回查具体 Issue、PR 和 Release。

## 发布边界：为什么 `merged` 不等于 `released`

### 当前仓库的实际分叉

`v0.33.6` 的 `target_commitish` 是维护分支 `v33`，不是 `main`。官方 tag 历史在 v33.5 之后只有：

1. [`88c3bfe`](https://github.com/openfrontio/OpenFrontIO/commit/88c3bfe44c979a322c9e4feb6844fe324f5f35c6)：降低 Luna 公共多人频率。
2. [`44bded9`](https://github.com/openfrontio/OpenFrontIO/commit/44bded90e15b78a0aa49b004776f2c09c38314cf)：rejoin 限流。
3. [`bebc953`](https://github.com/openfrontio/OpenFrontIO/commit/bebc953804e5ef2834642a21bb602eb9014a3a12)：旧版本回放 shell。

与此同时，`main` 继续吸收其他 PR。因此 [`v0.33.6...main`](https://github.com/openfrontio/OpenFrontIO/compare/v0.33.6...main) 是分叉比较，而不是“正式版之后新增内容”：本轮 API 返回 `diverged`、`ahead_by=104`、`behind_by=20`。若把这 104 个提交直接当成待发布清单，会把旧主线历史和未发布功能混在一起。

### 每日核验规则

1. **Release 轨道**：先读取最新非 draft、非 prerelease Release，确认正文不是 `TEST`，记录 `tag_name`、`published_at`、tag commit 和正文。
2. **Main 轨道**：只用账本保存的 `lastMainSha...currentMainSha` 扫描日增量，不用 `latestTag...main` 代替。
3. **候选轨道**：每个 PR 独立保存 `mergeCommitSha`；合并后状态为 `main_merged`，而不是 `released`。
4. **Release 归属**：新 Release 出现时，先用正文匹配候选；正文省略细节时，再核对 tag 的 commit 历史或受影响文件在 tag 上的源码。只有证据落入 tag 才写入 `releaseTag` 并转为 `release_verified`。
5. **措辞门禁**：内部 `main_merged` 可映射为公共 `Merged`，稳定的 `pr_open` 可映射为公共 `In development`，交付信号较强的 `issue_approved` 可映射为公共 `Watching`；它们必须带预发布免责声明。“已上线”“现在可以”“当前规则”只允许 `release_verified` 映射为公共 `Released`。

建议使用以下固定状态，避免自由文本逐日漂移：

```text
issue_proposed -> issue_approved -> pr_open -> main_merged
-> release_verified -> content_ready -> content_published

任一步都可转为 paused / rejected / superseded。
安全敏感项从任一步转入 restricted_monitor，修复正式发布后再回到 release_verified。
```

公共页状态与内部状态一一映射，但是否公开还要再过玩家价值、证据成熟度、状态准确性和安全边界四道门槛：

| 内部状态 | 公共状态 | 允许措辞 |
|---|---|---|
| `release_verified` | `Released` | “已上线于 vX.Y.Z” |
| `main_merged` | `Merged` | “已合并，尚未确认发布版本” |
| 稳定且公开的 `pr_open` | `In development` | “开发中，最终行为可能变化” |
| 交付信号较强的 `issue_approved` | `Watching` | “已批准提案，不代表承诺上线” |

Draft、blocked、changes requested、长期 Stale 或外部依赖不可核验的条目默认只留内部账本，除非其玩家价值极高且公开文案边界已经稳定。

## 候选主题：已合并到 `main`，尚未正式发布

这些候选可以提前建立来源包、确定受影响页面与本地化词汇，但不能改写当前正式规则。

| 优先级 | 候选与官方证据 | 玩家影响 | 正式发布后的内容动作 |
|---|---|---|---|
| P0 | Doomsday team ladder：[`PR #5030`](https://github.com/openfrontio/OpenFrontIO/pull/5030)，merge commit [`0b0c765`](https://github.com/openfrontio/OpenFrontIO/commit/0b0c7653f0bb016f52c9974c5367ba72d58f8f2a) | 团队模式门槛从 FFA 的 `2/4/7/11/17/25/35%` 提高为 `3/6/10/15/21/28/35%`，直接改变何时撤退、扩张和保队友 | 与下一项合成一个 Doomsday 版本包，更新 v33/v34 版本页、五语 Doomsday 主攻略和内容 e2e，不拆两个薄页 |
| P0 | Doomsday rot wasteland：[`PR #5052`](https://github.com/openfrontio/OpenFrontIO/pull/5052)，merge commit [`0d80bf8`](https://github.com/openfrontio/OpenFrontIO/commit/0d80bf8c8ef932f4f649a9706f6dede5b8d165be) | 腐化领土变为带 fallout 的 wasteland，不能再被领土第一被动免费吸收；夺回需要承担 fallout 防御惩罚 | 与 #5030 同批改写扩张、淘汰、反制和失败反例；这是会使旧攻略误导玩家的高优先事实 |
| P0 | Water Nukes pathfinding：[`Issue #4760`](https://github.com/openfrontio/OpenFrontIO/issues/4760)、[`PR #4975`](https://github.com/openfrontio/OpenFrontIO/pull/4975)、commit [`c5c7d74`](https://github.com/openfrontio/OpenFrontIO/commit/c5c7d74c6f7b687ca9c72fe0570a26469913b8d2) | 重算新水域的 ocean 标记和 minimap magnitude，运输船不再因错误成本绕开 Water-Nuked 水域 | Release 验证后移除当前 v33.6 警告，更新 Water Nukes、海战与版本总览；使用 PR 的真实 before/after 截图 |
| P1 | Port trade ship spawn：[`PR #5015`](https://github.com/openfrontio/OpenFrontIO/pull/5015)，commit [`5ee20b8`](https://github.com/openfrontio/OpenFrontIO/commit/5ee20b83776f6f4a3ec04ae0b3b6b6fc62aa4222) | 高等级 Port 的每次 roll 会使用更新后的 rejection pity rate，修复其没有获得预期递增概率的问题 | 在版本摘要说明“高等级 Port 的商船生成判定修复”，复核 economy/naval 中是否存在依赖旧行为的建议；没有独立搜索意图时不建页 |
| P1 | Detailed View lobby browser：[`PR #5022`](https://github.com/openfrontio/OpenFrontIO/pull/5022)，commit [`c6ce479`](https://github.com/openfrontio/OpenFrontIO/commit/c6ce479ff961ea4b760cee3352bd60cfe6a51972) | 玩家可浏览全部公开队列，按类型、来源、队伍和人数筛选，并保存 filter profile，不再只看到每类首张卡 | 适合作为玩家 `What's New` 短项，并同步 modes/FAQ 的找房入口；它改变发现流程，但不需要独立攻略 |
| P1 | Clan treasury donations：[`PR #5041`](https://github.com/openfrontio/OpenFrontIO/pull/5041)，commit [`0a4302a`](https://github.com/openfrontio/OpenFrontIO/commit/0a4302a09946ba5cc0ef723faa56b1637ceb694e) | Clan 成员可捐 soft/hard currency，捐赠永久且不可退款，UI 有余额、二次警告和幂等保护 | Release 后应披露“谁能捐、两种货币、不可退款”，但不要把 API 实现细节写成玩家说明 |
| P2 | SAM interception preview：[`PR #5044`](https://github.com/openfrontio/OpenFrontIO/pull/5044)，commit [`2861289`](https://github.com/openfrontio/OpenFrontIO/commit/28612894837079de88a4becfa2d8765f89150316) | 修正导弹进入 SAM 范围后拦截轨迹的视觉提示；PR 提供真实 before/after 图 | 与 SAM 动态范围或同版本核武修复合并成短项，不建立独立页；不能把视觉修复误写为拦截规则重做 |

## 候选主题：开放 PR，仍在开发

| 优先级 | 开放 PR 与前置证据 | 值得跟踪的玩家结果 | 风险与晋级门槛 |
|---|---|---|---|
| P0 | Spectator：[`PR #5031`](https://github.com/openfrontio/OpenFrontIO/pull/5031)，对应 approved [`Issue #2488`](https://github.com/openfrontio/OpenFrontIO/issues/2488) | 不占玩家 slot、只读地观看未结束对局；满房仍可观战，并有 `?spectate` 链接 | 大功能，待 PR 合并后仍只能转 `main_merged`；正式 Release 后更新 modes、赛事/回放边界和直接入口 |
| P0 | SAM dynamic range：[`PR #5040`](https://github.com/openfrontio/OpenFrontIO/pull/5040)，对应 approved v34 [`Issue #4527`](https://github.com/openfrontio/OpenFrontIO/issues/4527) | SAM 升级中的范围连续增长，并能重新捕获原先在范围外的核弹；同时加入范围预览 | 会改变升级时机和核防守，需要 tag 源码确认实际数值与动画语义后再改 mechanics/nukes |
| P1 | Lobby map preload：[`PR #5046`](https://github.com/openfrontio/OpenFrontIO/pull/5046)，对应 approved [`Issue #5010`](https://github.com/openfrontio/OpenFrontIO/issues/5010) | 进入 lobby 后预载地图，减少大地图开局卡顿和错过 spawn window | 性能与可用性短项，正式发布后可进 `What's New`，通常不改策略主答案；需避免承诺所有网络环境“即时开局” |
| P1 | Cosmetic loadouts：[`PR #5050`](https://github.com/openfrontio/OpenFrontIO/pull/5050) | 10 个编号外观 loadout、自动同步当前 slot、Unequip all | 当前没有关联 approved Issue，开放 PR 本身不代表接受；只跟踪状态，Release 后再写 store/account 短项 |
| P1 | Skin/effects preview：[`PR #5008`](https://github.com/openfrontio/OpenFrontIO/pull/5008)，对应 approved [`Issue #3682`](https://github.com/openfrontio/OpenFrontIO/issues/3682) | 购买前在真实地图比例预览 skin/effect，减少选购误判 | Issue 当前同时带 Stale，说明标签不是线性状态；以 PR 是否合并、Release 是否包含为准 |
| P1 | Alliance cooldown radial：[`PR #4974`](https://github.com/openfrontio/OpenFrontIO/pull/4974)，对应 approved v34 [`Issue #4970`](https://github.com/openfrontio/OpenFrontIO/issues/4970) | 主径向菜单直接显示再次发送联盟请求的剩余冷却 | UI 会改变玩家下一步操作；Release 后同步联盟机制的“在哪里看”，不要推断冷却数值改变 |
| P1 | Colour-vision distinctness：[`PR #4932`](https://github.com/openfrontio/OpenFrontIO/pull/4932)，对应 approved [`Issue #4928`](https://github.com/openfrontio/OpenFrontIO/issues/4928) | 大厅最多 125 人时不再重复分配人类颜色，并按色觉模型优化玩家、国家、bot 的可区分度 | 重要无障碍改进，正式发布后适合 `What's New` 与 settings/accessibility 说明；不要把 PR benchmark 当正式性能承诺 |
| P2 | Ranked 2v2 chosen teammate：[`PR #4788`](https://github.com/openfrontio/OpenFrontIO/pull/4788) | 玩家在排队前输入朋友 public id，双方互选后组成 2v2 队伍 | PR 带 Stale，且正文明确依赖 `openfrontio/infra#484`；只有前后端都交付并进入 Release 才能晋级 |

开放 PR 的优先级只表示编辑跟踪价值，不预测合并概率，也不构成发布时间承诺。

## 候选主题：approved Issue 与 milestone 提案

这组来源能帮助预先识别未来内容缺口。`approved` 表示维护者允许推进，milestone 表示规划归类；两者都可能延后、改形或取消，因此不能写成“即将推出”。只有同时具备明确玩家价值，以及 milestone、负责人或成熟讨论之一的少数项，才可进入公共 `Watching`，并明确写“已批准提案，不代表承诺上线”；其余只留内部账本。

| 主题 | 官方状态 | 内容准备价值 |
|---|---|---|
| Host 离开后的公开房自动开局 | [`Issue #5023`](https://github.com/openfrontio/OpenFrontIO/issues/5023)，approved、qol-improvement、v34、已有 assignee | 解决 host 离开后满房被困的问题。若实现，更新 modes 中公开 hosted lobby 的失败恢复；目前只能记录提案 |
| 攻击自动跨河 | [`Issue #4443`](https://github.com/openfrontio/OpenFrontIO/issues/4443)，approved、v34、已有 assignee | 会改变河流地图上的操作和攻击中断判断。待出现 PR 后跟踪具体寻路边界 |
| Attack meta 渐进调整 | [`Issue #2405`](https://github.com/openfrontio/OpenFrontIO/issues/2405)，approved、v34 | 直接关联 `ATTACK-01`，但正文只给方向，没有公式、数值或 PR；继续 Incubation，不提前写比例建议 |
| 保存与复用 lobby presets | [`Issue #2489`](https://github.com/openfrontio/OpenFrontIO/issues/2489)，Feature、approved、v34、已有 assignee | 已有页面明确“当前没有 preset”。等 PR 和 Release 后移除警告并更新赛事连续开房流程 |
| Public achievements | [`Issue #3144`](https://github.com/openfrontio/OpenFrontIO/issues/3144)，reopened、approved、Stale、v34 | 状态混合且没有当前交付证据，低优先监控；只有活跃 PR 出现才升级 |
| Trusted accounts/lobbies | [`Issue #5021`](https://github.com/openfrontio/OpenFrontIO/issues/5021)，approved、v34、已有 assignee，但正文为空 | 反作弊方向存在，产品边界未公开。不得自行补全资格、认证或匹配规则 |

## 受限监控：安全、反作弊与可滥用复现

- [`Issue #5042`](https://github.com/openfrontio/OpenFrontIO/issues/5042) 说明接受联盟时不会取消飞行中的 MIRV/warhead；[`PR #5054`](https://github.com/openfrontio/OpenFrontIO/pull/5054) 已开放修复。它会改变联盟与核威慑边界，但在修复正式发布前不应写可执行利用步骤。发布后只写“结盟会取消双方所有在途核武，包括 MIRV 与已分裂弹头”。
- [`Issue #4948`](https://github.com/openfrontio/OpenFrontIO/issues/4948) 公开了利用同 tick 小数攻击生成免费部队的完整步骤，状态为 approved、Backlog，尚无修复 PR。内部标为高优先事实风险，但攻略站不得转载 payload、频率或复现流程。
- [`Issue #4950`](https://github.com/openfrontio/OpenFrontIO/issues/4950) 报告跨平台多账号加入同一局，当前带 `not-approved` 和 `Stale`。它既未获维护者确认，也含可滥用路径，只保留链接和状态，不面向玩家放大。

受限项仍应每日刷新，因为一旦修复进入正式 Release，现有联盟、攻击或公平性页面可能需要纠错；“不公开 exploit”不等于“不跟踪事实”。

## 不进入玩家 `What's New` 的信号

| 信号 | 排除原因 |
|---|---|
| [`PR #5038`](https://github.com/openfrontio/OpenFrontIO/pull/5038) adminbot roster API | 只供持 key 的 adminbot/赛事后台读取 roster，不是普通玩家能力；只有站点未来建立赛事主办方专区时再考虑 |
| [`PR #5048`](https://github.com/openfrontio/OpenFrontIO/pull/5048) duplicate sign-in 提示 | 是有用的账号支持修复，但不改变玩法；可在 Release 中作为一行 support note，不占玩家内容生产队列 |
| [`PR #5045`](https://github.com/openfrontio/OpenFrontIO/pull/5045) 移除 v33 地图 `New` 分类 | PR 作者明确写明“不必在 changes 中公告”，且只是分类清理；最多在新地图正式出现时复核分类 |
| [`commit 388f7aa`](https://github.com/openfrontio/OpenFrontIO/commit/388f7aa68593b82a44eaf7b7092f906124d14d42) i18n key 去重 | 内部维护，无玩家新能力 |
| [`commit 6e5cddf`](https://github.com/openfrontio/OpenFrontIO/commit/6e5cddfc84d89e2e40456b4f47b860d0d431897d) store refactor | 删除 dead USD purchase path，不应被包装为新商店功能 |
| Dependabot、CI、format、test-only、translation-key-only | 默认过滤；只有最终改变玩家可见文案、兼容性或安全边界时才恢复人工审查 |

## 与现有 changelog 的边界

| 来源状态 | `What's New 上游雷达` | 站点 changelog / 常青页 |
|---|---|---|
| 正式 Release，正文真实 | 进入“已发布待响应”，记录玩家影响、受影响页和 24/72 小时动作 | 可用现在时发布；按玩家决策决定更新版本总览、独立影响页或常青主答案 |
| 正式 Release 正文是 `TEST` | 记录为占位并等待 | 不写版本说明，不根据 commit 猜测补丁内容 |
| PR 已合并到 `main` | 进入“已合并未发布”，准备来源包和页面映射；高价值项可公开为 `Merged` | 不修改当前正式规则；公共页必须写“已合并，尚未确认发布版本” |
| PR 开放 | 进入“开发中观察”，记录 linked Issue、draft、依赖和最后活动；状态稳定的高价值项可公开为 `In development` | 必须写“开发中，最终行为可能变化”，不承诺日期/版本，也不为单个 PR 创建薄详情页 |
| approved Issue / milestone | 进入“提案观察”；交付信号较强的最多少量项可公开为 `Watching` | 必须写“已批准提案，不代表承诺上线”，不承诺功能细节、数值、版本或日期 |
| 安全敏感 Issue | 进入 `restricted_monitor` | 修复正式发布前不传播复现；发布后只写安全的结果摘要 |
| 纯内部/噪声 | 记录过滤原因，之后只在状态发生实质变化时重开 | 不进入玩家页面 |

因此，changelog 继续回答“这个正式版本实际上改变了什么”；内部雷达回答“上游出现了什么信号、证据成熟到哪一步、下一次 Release 应复核哪些页面”；公共 `/whats-new/` 则用 `Released`、`Merged`、`In development`、`Watching` 的明确标签，把其中少量高价值信号安全地解释给玩家。三者不可互相替代。

## 建议写入账本的 section

建议放在 `content-loop.md` 的“今日编辑判断”之后、“当前进行中”之前。它只保存活跃状态和游标，完整论证继续放在 `docs/research/`，避免每日账本无限膨胀。

```md
## What's New 上游雷达

- 扫描时间：YYYY-MM-DDTHH:mm:ssZ
- 正式游标：release `vX.Y.Z` / tag SHA / published_at
- 主线游标：previous main SHA -> current main SHA
- 发布边界：release branch 是否与 main 分叉；本轮采用何种 tag 证据

### 已发布待响应

| 主题 | Release 证据 | 玩家结果 | 主落地页 | 动作 / 期限 |
|---|---|---|---|---|

### 已合并未发布

| PR | merge SHA | 玩家结果 | 受影响页 | 下次 Release 核验 |
|---|---|---|---|---|

### 开放 PR / approved Issue

| 来源 | 状态 | 最后更新 | 依赖 / 风险 | 下一状态触发器 |
|---|---|---|---|---|

### 受限与排除

| 来源 | 分类 | 不公开 / 排除原因 | 重新评估条件 |
|---|---|---|---|
```

不要在此 section 复制 PR 正文。每项用稳定的 `owner/repo#number` 去重，并链接当日来源包。

## 每日增量扫描字段

### 全局游标

| 字段 | 用途 |
|---|---|
| `scannedAt` | 证明本轮观察时间，统一使用 UTC ISO 8601 |
| `latestReleaseTag` / `releasePublishedAt` | 判断是否触发正式版本响应 |
| `releaseTagSha` / `targetCommitish` | 固定正式源码边界，识别维护分支 |
| `lastMainSha` / `currentMainSha` | 只扫描两次运行之间的主线增量 |
| `compareStatus` / `aheadBy` / `behindBy` | 识别 fast-forward、force push 或分叉；分叉时禁止用 tag-to-main 解释发布差异 |

### Issue / PR 记录

| 字段 | 用途 |
|---|---|
| `sourceKey`, `number`, `url`, `title` | 稳定去重与人工追溯 |
| `sourceType` | `release`、`pr`、`issue`、`commit` |
| `state`, `stateReason`, `draft` | 开放、关闭、合并、草稿、reopened 等生命周期 |
| `labels`, `milestone`, `assignees` | 判断 approved、Stale、Roadmap 与是否有人推进，但不代替发布证据 |
| `createdAt`, `updatedAt`, `closedAt`, `mergedAt` | 增量过滤与状态变化检测 |
| `headSha`, `mergeCommitSha`, `baseRef` | 合并后与新 Release tag 对照 |
| `linkedIssues`, `dependencies` | 保存 `Resolves #...`、infra 前置和被 supersede 关系 |
| `comments`, `reactions` | 只作为需求强度提示；零互动不能证明没有玩家影响 |
| `playerArea`, `playerOutcome`, `audience` | gameplay、map、UI/UX、accessibility、account、clan、tournament 等编辑分类 |
| `affectedPages`, `planId`, `uniqueLandingPage` | 对接现有 Production/Monitoring/Incubation 和唯一主答案 |
| `sensitivity` | `normal`、`exploit`、`security`、`privacy`，决定是否进入受限监控 |
| `evidenceState`, `releaseTag` | 固定使用前述状态机，并保存首次正式归属 |
| `decision`, `decisionReason`, `nextTrigger` | 公开、准备、观察、排除，以及下次何时重评 |

### 每日查询顺序

1. 拉取 Releases，比较 `latestReleaseTag`、正文和 tag SHA。新正式 Release 优先于其他信号，并立即重新核验所有 `main_merged` 候选。
2. 读取当前 `main`，用 `lastMainSha...currentMainSha` 取得 commits 和关联 PR；成功记录新游标前不得覆盖旧游标。
3. 刷新所有活跃候选的 Issue/PR 状态，优先检测 `draft -> ready`、`open -> closed`、`open -> merged`、`milestone/labels` 变化。
4. 搜索自上次 `scannedAt` 后新建或更新的开放 PR、Issue，先按玩家可见 area 和 approved/qol/gameplay/maps/UI 标签筛选，再人工读正文和评审状态；只有稳定、高价值项才生成公共预发布文案。
5. 单独扫描安全/反作弊词，但将结果直接放入 `restricted_monitor`，不进入公开候选表。
6. 对新信号做去重和页面映射；同一玩家结果的多个 PR 合成一个内容包，例如 #5030 + #5052 的 Doomsday 包、#5044 + #5040 的 SAM 包、#5050 + #5008 的 cosmetics 包。
7. `main_merged`、稳定的 `pr_open` 和高信号 `issue_approved` 可以更新公共状态索引；只有 `release_verified` 才进入“已发布待响应”，并触发 changelog、常青规则和“已上线”措辞。
8. 写回新游标、状态变化、排除理由和 `nextTrigger`；没有状态变化的低优先项不重复扩写。

## 状态转换与动作

| 变化 | 账本动作 | 玩家内容动作 |
|---|---|---|
| 新 Issue，无 approved | `issue_proposed`；记录问题、证据质量和敏感度 | 无 |
| Issue 加 approved / milestone | `issue_approved`；补候选页面和具体缺失事实 | 仅交付信号强的少量项可公开为 `Watching`，写明“不代表承诺上线” |
| 出现关联开放 PR | `pr_open`；记录 draft、评审、依赖、head SHA、玩家行为变化 | 稳定高价值项可公开为 `In development`；不修改正式机制结论 |
| PR closed 未合并 | `rejected` 或 `superseded`；检查替代 PR | 无；清理过期准备项 |
| PR merged | `main_merged`；保存 merge SHA，加入下一 Release 核验 | 可公开为 `Merged`，但必须写“尚未确认发布版本”；不改写当前机制结论 |
| 新正式 Release 包含候选 | `release_verified`；记录 tag、Release/源码证据和发布时刻 | 触发 24/72 小时内容响应，按玩家价值合并成内容包 |
| 新正式 Release 不包含候选 | 保持 `main_merged`，更新“已核验未包含 tag” | 无，继续等待，不反复准备同一内容 |
| 正式发布且完成页面更新 | `content_published`；记录站点 PR、语言、验证和复盘日期 | 进入常规监测；不继续占 Production |
| exploit/security 出现 | `restricted_monitor` | 不复制复现；修复正式发布后写泛化结果 |

## 后续每日任务规划

### 阶段一：建立内部雷达与双游标

1. 在账本建立 `What's New 上游雷达`，以 `v0.33.6` / `bebc953` 作为正式游标，以 `9c97e01` 作为主线游标。
2. 把本文件中 6 个 `main_merged` 主题包、8 个开放 PR 候选、6 个 approved/milestone 提案和 3 个受限项播种到账本，保留分组而不是复制长说明。
3. 固定公开状态映射和安全排除规则。当前没有比 `v0.33.6` 更新的 `Released` 事实；账本已有 v33.6 玩家响应，但这不阻止高价值预发布项以正确标签进入公共栏目。

### 阶段二：`WN-01` Production 公共 MVP

按 [`whats-new-content-plan.md`](../whats-new-content-plan.md) 实现五语 `/whats-new/`、共享事实 schema、3-5 个首批 canonical 条目、首页/导航入口和状态 e2e：

1. 页面分为 `Released`、`Merged`、`In development`，首版 `Watching` 最多三项；首屏直接解释状态含义并链接完整 changelog。
2. `Merged` 项写“已合并，尚未确认发布版本”，`In development` 项写“开发中，最终行为可能变化”；它们不得污染 changelog、RSS 的已发布流或常青机制的当前规则。
3. 首批优先从 Team Doomsday + wasteland、Detailed View、Clan Treasury、Water Nukes 和 Spectator 中选 3-5 个状态边界最清晰的主题；blocked、changes requested、外部依赖不可核验和安全敏感项继续只留内部。
4. 任何导航、首页摘要和状态展示都是交互/可见行为变化，必须按项目约定增加五语与移动端 e2e，并完成计划规定的 audit、build、link check 和完整 Playwright。

### 常规每日运行

1. Release/tag 有变化时先做发布归属核验；若没有正式 Release，只更新雷达状态，不为了保持频率制造内容。
2. 主线增量优先寻找改变玩家决策、操作入口、地图、可用性、无障碍和重要修复的 PR；后台与机械改动按排除规则收口。
3. 对 `pr_open` 只处理状态跃迁和实质性新讨论。纯 push、CI 重跑、机器人 label 不应每天重写账本。
4. 安全项只记录状态、修复 PR、正式归属和受影响页面，不保留可执行 payload 摘要。

### 下一正式 Release 的预组装内容包

- `DOOM-WN`：#5030 + #5052，最高优先，受影响页为版本总览与 Doomsday 主攻略。
- `WATER-WN`：#4975，正式进入 tag 后立即解除 v33.6 的运输船绕路警告。
- `LOBBY-WN`：#5022；若 #5031、#5046 或 #4974 同时进入同一 Release，再按“找房 / 观战 / 开局 / 联盟入口”拆分，不强塞成一个大厅大杂烩。
- `ECON-WN`：#5015，先复核生成公式和现有 economy/naval 文案，再决定版本短项或常青页纠错。
- `CLAN-WN`：#5041，面向 clan 成员写不可退款边界；不扩写 admin API。
- `SAM-WN`：#5044；若 #5040 同时发布，合并视觉提示、升级中范围和策略影响，否则只做短修复摘要。
- `COSMETIC-WN`：#5050 + #5008，只有各自实际进 tag 的功能进入摘要，不能因主题相近提前捆绑未发布项。

## 风险与停止条件

- **Release 正文可能省略小修复**：不能只凭“没有列出”断言未发布。对会改变旧攻略的候选，必须进一步检查 tag commit 历史或 tag 源码；证据不足时保持 `main_merged`，不猜。
- **PR 正文是作者陈述，不是最终产品合同**：性能数字、截图和行为说明要在合并 commit 与正式 tag 上复核，尤其是 #5040、#4932 这类大改。
- **标签可相互矛盾**：#3682 同时为 approved 和 Stale，#3144 为 reopened、approved、Stale。状态机必须用 Issue/PR 的真实 state、merge 和 Release 证据，不按单一标签自动晋级。
- **Milestone 会漂移**：v34/v35 只能提示复核窗口，不能出现在玩家页面的承诺文案中。
- **跨仓库依赖不可见于单仓库 merge**：#4788 依赖 infra#484。涉及 server、infra、desktop 或 API 的功能必须记录依赖仓库和完成状态，不能只看 OpenFrontIO 客户端 PR。
- **安全披露会制造新的风险**：对 #4948、#4950、#5042 等项，站点内容只在修复发布后提供不可操作化的玩家结论。
- **网络/API 瞬断会制造假空列表**：本轮 `gh api` 并发请求出现 TLS handshake timeout。每日扫描必须逐条保存退出码；任何来源请求失败时保留旧游标和旧候选，不得把失败结果写成“0 个 Issue/PR”。
- **停止条件**：没有新正式 Release、没有候选状态跃迁、没有新高价值 Issue/PR 时，只记录扫描成功和游标不变，不创建内容 PR，也不重复改写同一候选。

## 本轮最终判断

`What's New` 值得成为内容账本的新来源，但它的价值不在于增加发文频率，而在于把上游的四种时间尺度分开：正式上线、主线已合并、正在实现、仅有提案。按本方案接入后，下一正式 Release 出现时可以立刻知道哪些旧攻略会失真、哪些 UI 新功能只需短讯、哪些开放 Issue 必须继续等待，以及哪些安全细节不应传播。

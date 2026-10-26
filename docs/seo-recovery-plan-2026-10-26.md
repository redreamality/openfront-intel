# 搜索点击恢复与需求验证计划

拟定及实施日期：2026-10-26。范围：依据本月 GSC、实际 Google 搜索与竞争页正文检查，修复已存在的核心答案并验证新需求。用户已批准 A–F 一次性实施，代码与内容位于独立 worktree、分支 `codex/seo-recovery`。本地完成不等于上线，T 仍以真实部署日为准；定时任务配置未变更。

私有基线与完整分析保存在 `.cache/gsc/retro-2026-10-26/report.md`，原始响应、国家/设备切片、页面和查询对照 CSV 同目录。该目录已忽略，不提交私有流量指标。公开依据见 [内容盘点](research/2026-10-26-content-coverage-inventory.md) 和 [竞争页正文](research/2026-10-26-competitor-content-review.md)。

## 决策

未来两周建议将工作量分为：70% 修复已有主答案，20% 检查发现与收录，10% 验证新需求。暂停没有需求证据的批量独立长文；正式版本响应、已确认事实修正继续。已有新文并非全部无效，不批量删除，不依据题目相近直接认定内耗。

依据：本月内容供给显著增加，但搜索损失集中于原入口与部分核心词。实际搜索前排常见视频、社区问答、Wiki；实读竞争页并不都更新或更深，优势是任务动作更直接、版式更快、视频/图像可对照。本站应保留事实核验能力，补齐“从结果点击进来立即完成任务”的环节。

本轮将三类问题分开处理：同词同国家/设备排名下降；排名未下降但点击/展现变化；新答案尚未有完整观察时间。品牌导航、旧版本生命周期和 Reddit 导航不列为长文增长主战场。

## 工作包与顺序

下表日期保留原优先级排期供追溯；用户随后批准合并实施，全部包在本次独立 worktree 交付。T 指真实部署日，效果窗口不得提前从本地修改日开始计算。

| 包 | 建议时间/优先级 | 交付 | 完成定义 | 观察指标 |
|---|---|---|---|---|
| A 基线与索引诊断 | 10/27，P0 | 固定目标 query→主 URL 表；按首次发布日期建立新文 cohort；检查 8–12 个重点 URL 的索引、Google 选定 canonical、抓取时间和 sitemap | 明确“已索引/未索引/数据不可得”，不能把无展现等同未收录；保留 raw 响应与筛选 | 后续每包有同口径基线；发现技术阻塞先解决 |
| B 英/法第一场上手 | 10/27–10/30，P0 | 更新 first-match 当前事实；首屏桌面/手机操作步骤，当前 UI 真实标注图或原生示意；guides 入口优先级；法语自然表达 | 从搜索进来能找到练习入口、选出生、第一次扩张、调比例、建筑入口、停止扩张的信号；英文/法语先验收，五语事实同步 | guide/how-to/tutorial/tuto 固定词簇点击、同市场排名、first-match 承接 |
| C 工厂基础答案与路径 | 10/30–11/2，P1 | 10/23 已新增 what-do-factories-do 做基础主答案；从建筑数据库、建筑时机、港口对比等自然指向它；建立用途/数量/升级/网络职责表 | 首屏用玩家语言与可理解示意回答用途和不产金原因；正文事实复核；不再新建 factory basics 同义页 | 基础 factory 词簇的正确落地和点击；新文索引/抓取状态 |
| D 当前策略与 meta | 11/2–11/4，P1 | strategies 的当前版本决策摘要；按开局、落后、领先、终局提供行动/不适用场景；日志只导出相关玩法变化 | 每条建议有情境、动作、适用版本和现有深入答案；不把更新列表包装成策略 | strategy/tips/meta 词簇点击、strategies 主承接；不以文章数验收 |
| E 手机/应用入口 | 11/4–11/6，P1 | mobile-app-download 首屏平台选择、官方启动/安装路径；手机操作与桌面 Steam 任务分开；法国移动/桌面分看 | 先核验官网/官方仓库/官方商店关系与当前支持；不能从 Release 无 APK 推导所有渠道无 app；去掉妨碍操作的首屏研究叙述 | mobile/app/download 词簇，固定 MOBILE 与法国切片；点击和任务出口 |
| F 长尾与中文诊断 | 11/6 后，P2 | replay 的播放/复盘职责；地图尺寸、MIRV 基础页面；中文入口按国家细分，tracker 仅验证 | 有独立未满足任务和可核验需求才排新开发；小样本不扩成大改版 | 达到观察样本后再晋级；不追拼错品牌词 |

实施负责人建议：研究/编辑维护主答案和来源；开发负责版式、图解与入口；QA 负责实际任务完成和回归；同一执行者可兼任，不需创建新协作任务。

## 页面与查询合同

| 用户任务 | 固定种子词 | 唯一主答案 | 相邻页面职责 |
|---|---|---|---|
| 初次上手 | openfront guide、open front guide、how to play openfront、openfront tutorial；法语 openfront tuto、tuto open front | `/guides/first-match/` 及本地化版本 | `/guides/` 发现内容；策略页承接决策，快捷键页承接速查 |
| 工厂基础用途 | what do factories do in openfront、how do factories work in openfront、openfront what do factories do | `/guides/what-do-factories-do/` | how-many-factories 数量；factory-upgrades 升级；train-network 网络；port-vs-factory 对比 |
| 当前打法与胜利 | openfront strategy、openfront tips、openfront best strategy、openfront meta | `/strategies/` | changelog 记录正式变化，专项文章给案例；meta 先放策略页，不先建新页 |
| 手机启动/安装 | open front mobile、openfront mobile、openfront app、open front app、openfront download | `/guides/mobile-app-download/` | mobile-controls 操作；mobile-alternatives 替代游戏；community 社区出口 |
| 录像操作 | openfront replay、openfront replays | `/guides/seekable-replay-viewer/` | replay-review 学习如何复盘 |
| 地图大小 | biggest map in openfront、openfront biggest map、biggest openfront map | `/guides/map-size-compact-mode/` | database/maps 数据清单，maps 单图打法 |
| MIRV 基础 | openfront mirv、mirv openfront | `/guides/mirv/` | mirv-price-ladder 动态价格；防御专题具体反制 |

上述是执行前需冻结的种子词，不是把不同 query 的 byPage 展现相加当作全网需求。新发现词加入独立探索栏，不回填旧基线制造增长。宽泛 guide 可合法显示目录，不要求所有 guide 查询都强行换成正文；重点改善 how-to/tutorial 等操作意图的正文承接。

## 具体内容要求

1. first-match 先核对 v33 freshness 与现有版本规则的差异，再更新真实改变的事实与日期。首屏给动作、反馈、下一步；不只是“稳健扩张、注意邻居”的原则，也不再靠标题增加 tutorial 同义词。
2. 图像使用真实当前 UI 或清楚标注的原生示意图，不伪造截图。可复用官方创作者视频作为学习出口，但先核查版本、许可/嵌入可用性；无需为了本轮 SEO 维护强造视频或凑来源数量。
3. 法语版需独立审读操作词和 UI 标签，参考 Mychromebook 的短动作/建筑表表达；其旧机制不能作为当前游戏事实依据。中文按实际样本独立诊断，不把法语结论机械复制。
4. 工厂新页已存在且很年轻。检查其状态、可发现性、首段可理解性，保留数量/升级等独立意图；只有同市场同查询的 URL 切换和重复答案证据成立，才另提 301 合并方案。
5. 长文既有逐节字数合同仍执行；速查可以通过正文前的摘要/独立 UI 组件实现，不为凑小标题字数稀释首屏。长文删除/改写后运行对应 guide:audit；不擅改 AGENTS.md。
6. 新独立主题需补齐精确/邻近词、日期、现有落地、为何不能复用现有页以及来源门禁。当前四份来源包抽样缺需求记录，只能作为待补证，不外推所有新文有问题。

## 验证与观测

实施前：重新读取相关 runbook；如涉及版本事实或准备发布，按项目规则读取上游正式 Release，并对照统一版本配置/首页/五语 changelog。不能引用旧 Wiki 的版本数字直接修改本项目事实。

实施验收：

- 内容与对应单篇审计、五语事实一致性、自然内部链接。
- 渲染 title/description、canonical、hreflang、robots、状态码与 sitemap；不是仅看源文件字符串。
- 有用户交互变化的入口、平台选择、图解控件新增/更新 e2e，并执行 `pnpm test:e2e`。纯研究/计划不要求构建或 e2e。
- 第一次操作任务分别以桌面和手机视口验证：用户不用先读长文便能找到步骤与正确出口。版本数字和真实按钮按核验结果决定，不预先写死。

效果评价：

- T 记录真实上线、变更 URL、固定词簇、国家/设备和前 28 天 final 基线。不能把当前用于诊断的 24 天窗口直接当所有包的上线前基线。
- T+7/T+14 检查抓取、索引、主答案承接与技术异常；不以短期零点击判失败，也不反复换标题污染观察。
- T+1 至 T+28 作为完整效果窗口，待 final 后比较。主结果为词簇点击与主答案承接；辅助看展现、CTR、同 query 国家设备排名。页面份额分子/分母均使用同一 byPage 窗口，锚点单列。
- 单词少于 30 次展现标小样本；词簇完整 28 天少于 100 次展现则延长观察，不承诺排名或预计新增点击。样本足够后若点击和正确承接都改善，保留；如未改善，先复查 SERP、市场/设备和任务完成，再决定一次迭代。
- 10/9 已有计划保留 10/10–11/6 窗口，11/9 起核查 final 是否齐全。重叠修改会污染该实验，必须记录，不能将结果归因于单次改动。事实错误立即修，不为实验保留错误。

## 明确暂缓

- 不为 openfront / Reddit / 旧 v34 导航需求继续堆长文。
- 不用第三方页面停留在前排推断其外链或域名权重更强；未取得这些数据。
- 不因单次 Google 快照、无查询行、无点击或标题重叠批量删除/合并。
- tracker 实查已发现 OFstats 的玩家/战队搜索、公开对局及排行榜，数据库提供明确标注非官方的工具出口；没有证据支持另建同类产品，本轮不开发 tracker。
- 不自动修改日更任务。内容策略与内容循环文档已改为优先验收上述包，暂停无需求证据的批量新主题至 11/9；调度器配置保持原样。

## 本轮状态

实施与验收记录见 [完整交付记录](research/2026-10-26-seo-recovery-delivery.md)。A 已完成 28 天 final 基线、335 URL cohort 与 12 个重点页面索引核查；B–F 已交付五语首屏操作、工厂事实修复、策略决策表、平台入口、长尾互链与第三方工具出口。本批 PR 合并即完成实施并转入 Monitoring，生产部署成功后记录 T；自动化配置未修改。索引数据与流量原始响应仅保留在忽略的私有缓存。

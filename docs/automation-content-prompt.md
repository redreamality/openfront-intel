# OpenFront 日更执行提示词

在配置的 openfront-intel 本地项目执行持续内容改善。优先修正事实错误、改善已有搜索答案及阅读入口；新增独立页先证明现有主答案无法承接需求。每轮交付一个完整、可验证的改善任务，可为既有答案维护、正式 Release 响应或符合选题门槛的新五语长文。不要为日更配额强制新建页面。

授权与边界：ACTIVE 日程是用户对每次触发的持续委托，保留来源研究、五语内容及入口修改、验证、提交和推送 main 或 PR 交付的授权，不要求逐次批准。当轮只含 AGENTS.md 的消息不撤销委托。不得 stash/reset/clean/覆盖其他任务的改动；确认无法安全隔离的脏工作区时报告 BLOCKED_DIRTY_WORKTREE。若非缓存脏文件指纹与前两轮相同，只复核本地指纹并暂停重复网络扫描，直到指纹改变或用户处置。权限或基础设施确实阻止操作时，说明具体规则、动作和证据，不编造交付。

热上下文：读取项目 AGENTS.md、docs/content-strategy.md、docs/content-loop.md、docs/search-improvement-plan.md、当前 Production 直接链接的计划与来源包、automation memory；新长文再读 docs/long-form-content-program.md，按任务加载 runbook。缓存只写 C:\Users\Remy\.codex\automations\openfront\cache，不读取 archive 或 Feedlog。

1. Gate：记录分支、SHA、工作区、已有自有 PR 和 Production。核验相关正式非 TEST Release；What's New 保留 release/tag 与 upstream main 双游标。只在到期时刷新 GSC，网络失败最多重试一次并保留最后有效缓存；缓存缺失或陈旧属于未知，不能当零需求。schemaVersion 2 的站点与 query 指标来自 byProperty，queryPage 只用于 byPage 落地页诊断，锚点单列，不再求和重建查询排名，不用通用 CTR 曲线预测收益。

2. 选题：优先维护已有信号的主答案。记录词簇、玩家任务、数据窗口/口径、当前落地页、缺口、唯一答案路由、事实来源、自然入口和验收定义。新增独立页须为有搜索信号、正式版本响应或教学探索；无搜索信号的教学探索每周最多一个独立主题。同一意图已有完整答案时更新该页，不复制泛 tips 页面。若当前维护批次尚未发布，不把本地改动当线上结果；发布后按计划转 Monitoring。

3. 证据：维护任务只核验所改事实与相关来源，不为凑数重复采集社区材料。新增长文实际打开并分析至少 3 个 Reddit 讨论、3 个 YouTube 视频或可核验字幕；来源包包含 URL、标题、日期、观察、局限、访问日期、至少 1 个官方一手 URL 和 600 英文研究词。不可访问时换可核验来源，只有没有可用替代时报告 BLOCKED_NETWORK。数字与版本边界回到正式 Release、tag 源码、生成数据或官方测试。

4. 实施：同轮完成任务的五语一致性、唯一主答案、必要索引入口和相邻互链。维护只改实际需要的内容，SEO 修改不伪造版本核验日期。新增长文须完成直接答案、版本边界、决策框架、两个明确局势场景、失败与反制、模式/地图调整和原创表格/解释图/真实资产/工具。每语正文至少 1500 词，中文按 Intl.Segmenter('zh', { granularity: 'word' }) 的 isWordLike 计词，不能用汉字数抵扣；遵守项目每个正文小节至少 401 words 的门槛。

5. 验收：维护按实际差异检查事实、链接、渲染标题和五语一致性；不把新长文总字数、3+3 社区来源要求机械套到维护。新增长文在五语稳定后运行 pnpm guide:audit -- --slug <slug> --source-pack <path>，另核验五语各 1500 词（排除 frontmatter、代码块和 URL），审计 PASS 不能代替更高门槛。正式版本内容运行对应 release 审计。按变更执行 pnpm content:audit、pnpm check、生产构建、pnpm check:links、pnpm seo:audit、git diff --check；UI/入口交互改变时更新 e2e 并运行 pnpm test:e2e。构建前保存生成文件精确基线，确认只有本轮噪声才恢复，不覆盖并发修改。失败先修复、重跑并写对应 runbook，不自动改 AGENTS.md。

6. Delivery：验证通过后沿既有授权提交并推送 main，核对远端提交及部署 CI；或创建 codex/ 分支与 PR，按 CLEAN/MERGEABLE、checks 和远端 head 的条件完成既有授权的 REST squash merge。现有仓库不改 visibility。工作区和发布状态均须复核，不能以只读研究、GSC 刷新、memory 更新替代交付。网络瞬断最多重试一次，真实硬阻塞保留全部产物。

7. 复盘与报告：实际部署日为 T，等 T+1 至 T+28 的完整窗口成为 GSC final 数据后复盘固定词簇，国家/设备固定或分别报告，不把组合变化当编辑因果。只用 DELIVERED、BLOCKED_DIRTY_WORKTREE、BLOCKED_NETWORK、FAILED_INFRA、FAILED_CONTENT_TARGET、NEEDS_REVIEW；DELIVERED 要有实际提交、推送/合并和对应验证证据。报告给出任务类型、改动与事实边界、来源、验证、commit/PR、远端与发布结果，并逐行列出所有受影响的 https://openfront.fyi/ 绝对 URL、变更类型和原因，标题写去重总数。新长文额外逐语给词数/门槛、社区与官方来源数量；维护明确不适用，不编造计数。缺验证或交付证据先补齐，无法补齐如实报告阻塞。

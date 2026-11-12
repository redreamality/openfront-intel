# 自动化工作区与中断恢复

适用于 Codex `openfront` 和 Hermes `4777a6e26b00`。本文件取代旧的“共享项目目录生产、禁止 worktree、重复脏文件停止版本扫描”流程。

## 隔离与单一生产者

- Codex 调度配置必须为 `executionEnvironment=worktree`，每轮从已核对的远端 main 基线建立唯一 `codex/` 分支。确认实际 cwd 与用户项目主目录不同；若调度器仍落在主目录，只读检查后报告基础设施配置错误，不在主目录开工。
- 用户主目录中的 tracked/staged/untracked 改动全部保留，不切它的分支，不移动文件、不 stash/reset/clean。历史 worktree 也按独立任务对待。
- Hermes 保留 360 分钟频率，使用 `no_agent=true` 加 `openfront-release-watch.py`。脚本仅 GitHub GET 和 `git status`，写入外部 automation cache，不运行模型、修改内容或发布。
- 每轮正式 Release 与 upstream main 双游标检查独立于本地修改状态。重复指纹可减少重复调查与社区采集，不能关闭版本监测。查询失败保留最后有效数据并标未知，最多重试一次。

## 编辑前的归属记录

在 `C:\Users\Remy\.codex\automations\openfront\cache\runs\<run-id>.json` 登记：

| 字段 | 内容 |
| --- | --- |
| runId / threadId / startedAt | 本轮唯一身份和开始时间 |
| workspace / branch / baseSha | 实际 worktree 绝对路径、唯一分支及已验证 main |
| intent / status | 唯一玩家意图；started、editing、checkpoint、delivered、superseded |
| files | 拟改精确路径及编辑前 SHA256，新文件记 missing；新增范围先更新记录 |
| checkpointSha / checks / pr / remoteHead | 已有保存点、实际验证结果和交付证据 |

先读取未完成 manifest 和自有开放 PR；同意图已有工作时优先恢复，不能新建重复答案。恢复仅在 runId、路径、分支和哈希足以证明归属时进行。正式版本已变或意图过时，标 superseded 并保留分支，不把旧草稿直接发布。

## 正常结束与强制中断

- 正常结束时检查本轮差异。验收失败或基础设施阻塞但仍有自有修改时，对 manifest 中的精确文件本地提交 `WIP: <intent> checkpoint`，登记 checkpoint SHA、已过/未过检查和恢复命令；不得推送 main，不声明 DELIVERED。
- checkpoint 不是内容验收豁免；仅用于可恢复地保存草稿。无法提交则登记当前逐文件哈希并保留目录，说明具体失败。
- 进程崩溃、被终止或工具循环退出，可能来不及执行 checkpoint；编辑前的 manifest 和独立 worktree 仍保留文件。下一轮先核对它们，而非将主工作区永久判脏。
- 绝不删除脏 worktree，不为“变干净”覆盖草稿。无明确归属时保留并隔离，继续在新的干净 worktree 处理其他不重叠任务。

## 发布与收口

完成所需验收后提交并推送本轮 `codex/` 分支，创建 PR；标签仅在存在时使用。按现有 REST squash 的 CLEAN/MERGEABLE、checks、远端 head 门禁合并。并发发布导致远端基线变化时，先更新并重新验证受影响范围，不强推覆盖 main。

核对远端和对应部署结果后将 manifest 标为 delivered。自动化只归档自己已交付且干净的 worktree；不要求在用户主目录切回 main。任何 WIP、未知改动或未核对的远端交付都不自动清理。

## 安装与验收

- Hermes 安装副本位于 `HERMES_HOME/scripts/openfront-release-watch.py`，来自仓库同名脚本；通过 `hermes cron edit 4777a6e26b00 --script openfront-release-watch.py --no-agent` 配置，保留频率、模型设置和其他任务。
- 脚本测试：`uv run --no-project scripts/tests/release-watch.test.py`。覆盖正式非 TEST Release 筛选、脏目录和遗留草稿不影响读取、失败不覆盖最后有效缓存。
- 工作区隔离测试同上，使用临时 Git 仓库模拟第一轮未完成、下一轮另建工作区；检查用户目录和遗留草稿逐字节保留。
- 审计真实本地调度配置：`uv run --no-project C:\Users\Remy\.codex\automations\openfront\cache\audit-openfront-isolation.py`。本机安装证据只写 automation memory/cache，不回填此文。
- Codex 更新 worktree 自动化时，若配置工具拒绝潜在的本地 setup script，明确设置 `localEnvironmentConfigPath=null` 以禁用该脚本，再更新配置；不把未获核准的 setup script 随隔离改动一并启用。依赖在实际 worktree 中按需显式安装。

## 本次排障记录

配置审计在修复前明确失败：Codex `execution_environment=local`，Hermes `no_agent=false`。因此只改口头约定不能解决共用目录的第二写入者。

历史归属调查首次枚举了不存在的 `.codex` 可选目录，`rg` 报路径错误；恢复为先确认路径再读取。配置/脚本回归在实现前的失败属于预期红灯，不能记为内容或网络故障。未修改 AGENTS.md。

隔离回归的初次运行受本机 `core.autocrlf` 影响，将新 worktree 的已提交 LF 文件检出为 CRLF；这是测试环境差异，非工作区污染。临时 fixture 仓库单独设置 `core.autocrlf=false` 后重跑，不修改用户或项目的 Git 配置。测试命令退出码应独立检查，后续检查成功不能覆盖前一项失败。

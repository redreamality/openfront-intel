# 数据更新与离线抽取 runbook

仅在任务涉及本主题时读取。规则从 2026-08-20 的项目级 `AGENTS.md` 逐条迁移；原始快照见 [归档](../archive/AGENTS-through-2026-08-20.md)。

来源范围：`数据更新 / 离线 extract` 原章节。

## 规则

- 本环境到 github.com:443 的 **git 传输不稳定**：`git fetch/pull` 常报 `Connection was reset` 或 `Failed to connect ... port 443`（有时挂起），但 `gh` API 与有时的 `git push` 仍可用。需要看上游 diff 时优先走 `gh api repos/openfrontio/OpenFrontIO/compare/<base>...main`，不要依赖 `git pull`。git 命令一律加 `-c http.lowSpeedLimit=1000 -c http.lowSpeedTime=25` 快速失败，避免无限挂起。
- **PR 合并前 `git fetch origin` 若以 `Recv failure: Connection was reset` 失败，使用 GitHub API 核对基线**：通过 `gh api repos/<owner>/<repo>/branches/main --jq .commit.sha` 取得远端 main SHA，并与本地 `origin/main`/PR base SHA 比较；只有 SHA 一致或 GitHub 明确判定 PR 可合并时才继续。不要把一次 fetch 失败等同于远端没有更新。
- **`git push` 报 `Recv failure: Connection was reset` 后先核对远端 ref，再决定是否重试**：用 `gh api repos/<owner>/<repo>/git/ref/heads/<branch> --jq .object.sha` 与本地 `HEAD` 比较，避免服务端其实已接收时重复操作；远端仍是旧 SHA 才使用相同低速超时参数重试一次，连续失败则停止并报告网络阻塞。
- **`pnpm extract` 的地图来自目录名，不是目录内容**：`readMapDirs()` 只对 `OpenFrontIO/resources/maps/` 做 `readdirSync` + `isDirectory()` 过滤，地图的名称/分类全部来自本脚本的 `MAP_I18N`/`MAP_CATEGORIES`。因此当 `git pull` 不通、又要把新地图录进 `maps.json` 时，可在 clone 里 `mkdir` 对应的**空目录**作为占位 —— 产出的 `maps.json` 与真实 pull **逐字节相同**，且 git 恢复后 pull 会用真实内容覆盖（可逆）。
- 光在 `MAP_CATEGORIES` 里加 id **不够**：clone 目录里若没有该地图目录，`readMapDirs()` 不会列出它（除非 `!HAS_SOURCE` 走 fallback）。必须保证目录存在（真实或空占位）。
- 用 bash 写临时文件给 node 读时，**不要用 `/tmp`**：MSYS 的 `/tmp` 与 node 的 `C:\tmp` 不是同一路径，会 ENOENT。改用一条 node 管道（`... | node -e`）或写到项目内相对路径。
- 校验 maps.json 条目时注意结构是 `i18n.{lang}.name`（不是 `x.zh.name`）。

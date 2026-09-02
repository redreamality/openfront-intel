# 外部服务与认证 runbook

仅在任务涉及本主题时读取。规则从 2026-08-20 的项目级 `AGENTS.md` 逐条迁移；原始快照见 [归档](../archive/AGENTS-through-2026-08-20.md)。

来源范围：`路径与验证` 原章节。

## 规则

- **gopass 的 `cloudflare` 条目当前是 Bearer API Token，不是 Global API Key**：使用 `/user/tokens/verify` 可能返回 401，改成 `X-Auth-Email` / `X-Auth-Key` 会返回 400；不要据此反复切换认证格式。对实际目标端点直接使用 `Authorization: Bearer <token>` 做最小权限探测。
- **Cloudflare Token 能读取 Workers 与 DNS 不代表具备 Hyperdrive/R2 权限**：当前 token 访问 Hyperdrive 和 R2 API 会返回 `code 10000 Authentication error`。部署前分别探测 `/accounts/{id}/hyperdrive/configs` 与 `/accounts/{id}/r2/buckets`；缺权限时应先扩展 token 权限，不能把认证失败误判为资源尚未开通。
- **Neon CLI 调用项目命令时显式传 `--org-id`**：省略组织会打开交互式组织选择，自动化环境中可能未创建任何资源却仍以退出码 0 结束；必须再用项目列表或 API 核对结果。
- **Neon CLI 帮助中列出的区域不代表当前组织实际可用**：创建项目前以 API 返回的 `available_regions` 为准；例如 CLI 展示 Azure 区域，但组织仅开放 AWS 时，创建仍会被服务端拒绝。
- **`gopass find <name>` 没有匹配项时会无输出并返回退出码 10**：这表示条目不存在，不是 GPG 解密或 pinentry 失败；先按“凭据未配置”处理，不要重复触发解密或排查 recipient。

## 复发记录

- **2026-09-01 Codex Desktop 更新通道**：MSIX 内置 CLI 执行 `codex update` 可能报“Could not detect the Codex installation method”，因为 Desktop 由 Windows Store 管理；随后 `winget ... --source msstore` 若报 `WinHttpSendRequest: 12029` / `0x80072efd`，以及 `codex doctor` 报 `desktop update and runtime CDN is unreachable`，应判定为商店/CDN 网络不可达，不能误判为仓库或 schedule 脚本失败。npm registry 仍可单独核验 CLI 版本，但全局 CLI 升级不会替换 Desktop 内置运行时。

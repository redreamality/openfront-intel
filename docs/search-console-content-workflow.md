# Search Console → 内容机会工作流

> 本文只说明数据获取与机会分类。选题门槛、周/月节奏和当前战役见 [`content-strategy.md`](content-strategy.md)；每日执行状态见 [`content-loop.md`](content-loop.md)。

`pnpm gsc:queries` 读取 `sc-domain:openfront.fyi` 最近 7 个已稳定数据日的 Query × Page 数据，并生成：

- `.cache/gsc/top-queries.json`：完整本地数据，供脚本分析。
- `.cache/gsc/top-queries.md`：前 100 个可编辑机会，供内容排期。

两个文件都被 gitignore，不会把点击、展现或查询数据提交到公开仓库。

## 使用本机 gsc-cli OAuth（推荐）

默认会自动查找兄弟目录 `../gsc-cli`，复用其中的 OAuth 客户端和用户配置目录里的 token：

```powershell
pnpm gsc:queries -- --days 7
```

目录不在默认位置时，设置 `GSC_CLI_DIR` 或传入参数：

```powershell
$env:GSC_CLI_DIR = 'C:\path\to\gsc-cli'
pnpm gsc:queries -- --days 7
```

Windows 使用系统代理时，`gsc-cli` 的虚拟环境还需要 `PySocks`，否则 `httplib2` 会忽略代理并直接连接 Google：

```powershell
Set-Location C:\path\to\gsc-cli
uv pip install --python .venv\Scripts\python.exe PySocks
```

桥接脚本会读取 Windows 用户代理并把 `localhost` 规范为 `127.0.0.1`；不会读取、输出或提交 OAuth token。

## 服务账号或 Access Token

1. 在 Google Cloud 创建服务账号并启用 Search Console API。
2. 在 Search Console 的 `sc-domain:openfront.fyi` 属性中，把服务账号邮箱添加为用户。
3. 将服务账号 JSON 保存在仓库之外，并在当前 PowerShell 会话设置：

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\secure\openfront-gsc.json'
pnpm gsc:queries -- --days 7
```

也可以使用短期 `GSC_ACCESS_TOKEN`，或在 CI 中提供 `GSC_CLIENT_EMAIL` 与 `GSC_PRIVATE_KEY`。这些原生认证方式优先于 `gsc-cli`。不要把凭据写入仓库。

## 机会分类

- `title-ctr`：平均排名 1–3，但 CTR 低于同排名预期。优先重写 title 与 description。
- `quick-win`：平均排名 4–10。给现有落地页补精准答案、FAQ、示例和内部链接。
- `content-gap`：平均排名 11–30。扩写支柱页，或在搜索意图明显不同的情况下新建专题页。

默认跳过最近 2 天，以避免 Search Console 未完成聚合的数据扰动判断。需要对齐 UI 的更新鲜范围时，可运行：

```powershell
pnpm gsc:queries -- --days 7 --lag-days 0
```

编辑内容前，先按 Query 的主要落地页合并同义词，避免 `/shortcuts/` 与 `/guides/hotkeys/` 等页面互相争夺同一关键词。

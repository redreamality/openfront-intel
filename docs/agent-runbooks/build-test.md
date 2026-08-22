# 构建、Astro 与 Playwright runbook

仅在任务涉及本主题时读取。规则从 2026-08-20 的项目级 `AGENTS.md` 逐条迁移；原始快照见 [归档](../archive/AGENTS-through-2026-08-20.md)。

来源范围：`路径与验证` 原章节。

## 规则

- 若 `pnpm exec astro check` 报 `src/components/FormulaBlock.astro` 中 `ItemInput` 不能赋给 `{ name: string; expr: string }`，这是当前全局基线类型错误；不要误判为无关页面改动引入。仍应确认本次文件没有新增诊断，并可用 `pnpm exec astro build` 验证静态路由是否能完整生成，同时将该基线错误另行修复。
- **静态链接审计要把 Astro 的顶层 404 当作特殊产物**：即使 `trailingSlash: 'always'`，`/404/` 仍可能生成 `dist/404.html` 而不是 `dist/404/index.html`。解析尾斜杠路由时应同时接受两种候选文件。
- **Cookie 设置从“允许统计”改回“仅必要功能”时必须立即停止当前页 Analytics**：不能只改 `localStorage` 等待下次导航。应设置 `ga-disable-<MEASUREMENT_ID>`、发送 denied consent update、移除动态 Google tag，并用 e2e 覆盖 allow → essential 的撤回路径。
- **`astro check` 会一起检查 `e2e/*.ts` 的 TypeScript**：Playwright 的 `page.evaluate` 即使运行正常，直接访问 `window['自定义属性']` 仍会触发 `ts(7015)`。对 `ga-disable-*` 等自定义全局属性使用局部交叉类型声明后再读取，不要依赖运行时宽松行为。
- **补攻略视觉内容时不得伪造游戏截图**：优先用真实可核验截图；没有真实素材时，可基于现有数据和编辑规则制作 HTML/CSS 代码原生解释图，并为五语页面增加内容完整性 e2e。
- **最终回归的 prebuild 会反复刷新 `_meta.json.generatedAt`**：若数据、`upstreamVersion`、`upstreamCommit` 与配置值都没变化，最终 amend 前应移除仅时间戳变化的噪声；不要手改生成 JSON，使用针对该文件的已知基线恢复，并确认首次有效 extract 的 commit/版本元数据仍保留。
- **`pnpm <script> -- --flag` 可能把独立的 `--` 原样传给 Node 脚本**：自有 CLI 的参数解析应容忍独立 `--`；验证时也可用 `pnpm run <script> --flag`，不要假设分隔符一定会被 pnpm 吃掉。
- **Astro 内联脚本若渲染在目标 DOM 之前，不能立即 `querySelector` 后据此自删或绑定行为**：组件放在 `<main>`/`<article>` 前时，脚本会先执行并把“尚未解析”误判为“不存在”。统一在 `DOMContentLoaded` 后初始化，或把脚本移到目标 DOM 之后；对应 e2e 必须覆盖组件实际出现和交互绑定。
- **多语 SEO title 的长度保护不能直接回退到原始 H1，或把点击利益点一起丢掉**：长标题先去掉破折号/冒号后的副标题，再重新套用对应栏目模板；e2e 同时断言本地化利益短语和最大长度，避免“长度合格但搜索意图退化”。
- **MDX frontmatter 的纯文本值只要包含冒号加空格，就必须用引号包裹**：例如法语 `description: "... trains : ..."`；否则 YAML 会把冒号后的内容解析成嵌套映射，`astro check` 报 `bad indentation of a mapping entry`。
- **本环境访问 `support.google.com` 可能在浏览器和 `curl.exe` 两条链路同时超时**：做 AdSense/Publisher 政策审计时先使用短超时探测；若重复超时，不要循环重试，明确记录无法在线刷新官方正文，并使用项目内最近一次注明日期的官方来源快照，提醒申请前在可访问网络中复核。
- **临时 Node 调试代码不能用 `eval()` 执行静态 `import`**：`eval` 不支持模块级静态导入；改用 `await import()`，并从项目实际安装的 `@playwright/test` 导入浏览器能力，不要假设存在可直接导入的顶层 `playwright` 包。
- **Playwright webServer 不要复用本机通用 `localhost:4321`**：IPv4 与 IPv6 可能各被不同项目监听，测试会在错误页面、正确页面和 `ERR_CONNECTION_REFUSED` 之间漂移。使用项目专用的 `127.0.0.1` 端口（默认 4327，可用 `PLAYWRIGHT_PORT` 覆盖），并令 `reuseExistingServer: false`，确保每次测试启动自己的生产预览。
- **重写核心文章标题后要同步检查既有内容 e2e 的精确文案**：旧测试可能仍锁定扩写前的问句，导致正文事实正确但回归失败。对必须存在的概念优先断言稳定的语义短语或本地化正则，并在五语改稿完成后统一运行全套 e2e。
- **完整 Playwright 套件若只在 `browserContext.newPage` 建页阶段超时，且没有进入页面断言，先按资源争用处理**：用 `--workers=1 --grep <用例>` 单线程复跑失败用例；目标用例通过后再重跑完整套件。不要把 fixture 建页超时误判为对应页面内容回归，也不能仅凭定向通过就跳过最终全套回归。
- **临时 Node 调试脚本不要假设项目根目录存在可直接导入的 `node_modules/playwright` 或 `node_modules/playwright-core`**：pnpm 可能只在 `node_modules/.pnpm/` 中保存真实包目录；优先从项目已安装的 `@playwright/test` 导入浏览器能力，或先用 `pnpm why playwright` / `require.resolve()` 确认解析路径。
- **完整 Playwright 并行套件若阅读进度用例只表现为 `data-progress` 始终为 `0`，先排查首批 worker 的资源竞争/滚动帧调度**：`ReadingProgress` 用 `requestAnimationFrame` 合并滚动更新，并发长页面可能被 headless Chromium 后台节流。先用正斜杠路径执行 `pnpm test:e2e e2e/article-engagement.spec.ts --workers=1`；若单线程全过，不要改业务组件，应把这组依赖帧调度的断言放进 `test.describe.configure({ mode: 'serial' })`，再跑完整套件。
- **Feedlog v0.4.0 在 pnpm 严格依赖布局下缺少直接的 `@nuxt/kit` 声明**：其 `nuxt.config.ts` 顶层 `import { createResolver } from '@nuxt/kit'` 会让 `pnpm install` 的 `nuxt prepare` 报 `Cannot find module '@nuxt/kit'`。部署该版本时先添加与 Nuxt 匹配的精确 `@nuxt/kit` devDependency，再更新锁文件和构建。
- **e2e 已限定到某个 section 后，后代 `h2` 仍可能命中嵌套组件标题**：例如数值参考区内还包含来源面板，`[data-home-reference] h2` 会触发 strict-mode。断言区块自身标题时使用 `getByRole('heading', { level: 2, name, exact: true })` 或 `:scope > h2`，不要假设 section 内只有一个同级标题。
- **完整 Playwright 的 `browserContext.newPage` 资源争用在 `--workers=2` 下也可能换一批用例复发**：失败仍发生在 fixture 建页、且单线程定向用例通过时，不要继续试不同的中间并发；直接用 `pnpm test:e2e --workers=1` 做最终全套，避免反复生成随机三项超时。
- **`pnpm check:links` 只审计已有的 `dist/`，不会自动构建**：新工作树或清理产物后必须先运行 `pnpm build`，否则会以 `dist/ does not exist` 退出；不要把它误判为链接内容失败。
- **多语 e2e 核验严格数值或否定边界时要允许该语种的明确同义表达**：例如德语 `< 50` 可写 `weniger als 50` 或 `unter 50`；“不保证同一动作”也可能因单复数、`same` / `identical`、本地化词序或直/弯撇号而变化。用有限的本地化正则枚举等价表达，同时保留数字、比较或否定语义，不要为满足单一字面断言改坏自然正文。
- **`pnpm content:audit -- --strict` 的 240 字符限制按空行分隔的 Markdown 段落块计算**：仅插入软换行不会缩短审计段落；新增五语核心内容后若 `>240` 失败，应在自然句界处加入真正的空行拆段，并保留完整事实与断言。
- **MDX 渲染会把部分直撇号转换成弯引号**：Playwright 对法语 `d'abord` 等带撇号整句做 `toContainText` 精确字符串断言时，源码 ASCII 撇号可能渲染为 `d’abord` 而失败。优先断言不跨撇号的稳定语义片段，仍保留关键事实保护。
- **重分配相邻页面职责时同步更新既有内容完整性断言**：若完整按键表从攻略迁到速查页，旧测试可能仍锁定原表格中的斜杠、大小写或精确文案。应把断言迁到新的事实承载位置并补“表格数量/互链”合同，不能删除有效事实断言或为旧测试保留重复内容。
- **运行内容审计前先用 `rg --files scripts` 核对真实脚本名**：本项目的实现是 `scripts/audit-core-content.mjs`，不存在 `scripts/content-audit.mjs`。`pnpm content:audit` 已把核心审计固定为 strict；不要在由 `&&` 串联的 npm script 后追加 `-- --strict`，因为参数只会传给最后一个命令。需要绕开 pnpm 时运行 `node scripts/audit-core-content.mjs --strict`。
- **Astro content collection schema 位于 `src/content/config.ts`，不是 `src/content.config.ts`**：审计 schema 或 SEO 字段前先用 `rg --files src/content` 确认真实路径；不要把猜错的旧式路径与有效搜索根一起交给 `rg`，否则会以路径错误退出 2。
- **核心页更新 `freshnessSummary` 后必须同步内容 e2e 的摘要事实映射**：正文仍保留旧事实不代表顶部摘要还应断言旧关键词；`e2e/content-integrity.spec.ts` 应锁定当前版本最重要变化，并另用正文级断言保护未改变的历史事实，避免把正确的新鲜度更新误报成回归。
- **多语浏览器断言要以渲染后的排版字符为准**：Astro 的 Markdown 排版可能把法语源码中的直撇号 `'` 转成 `’`；Playwright 的 `toContainText()` 读取的是渲染文本，新增精确断言前先核对浏览器输出，避免把正确内容误报为回归。
- **局部 Astro 语法验证不要假设 Prettier 或传递依赖可直接使用**：本项目未配置 Astro Prettier parser，pnpm 也不会在根目录暴露传递依赖 `@astrojs/compiler`。优先用 `pnpm check` 或 `pnpm build` 验证 `.astro`；只有诊断脚本确有必要时才从已确认的 `.pnpm` 实际路径导入 compiler。
- **`astro dev` 首次请求若报 `Cannot split a chunk that has already been edited (... "import.meta")`，先区分开发态转换器与生产产物**：若同一工作树的 `pnpm check`、`pnpm build` 和 Playwright 生产预览均通过，这是 Astro/Vite 的按需转换故障，不是内容或静态构建失败。最终验收改用新鲜 `dist/` 上的 `pnpm preview`；只有任务明确要求修复开发服务器时，才单独诊断插件/缓存，不要为此改写正文或回滚有效内容。

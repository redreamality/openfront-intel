import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PLAYWRIGHT_PORT ?? 4327);
const baseURL = `http://127.0.0.1:${port}`;

// 复用系统已缓存的 Playwright 浏览器（%LOCALAPPDATA%\ms-playwright），无需重新下载。
// webServer 用 `build && preview` 服务生产构建产物：astro dev 在本机命中一个 Vite 的
// "Cannot split a chunk ... import.meta" 报错，preview 服务静态 dist 可稳定绕开。
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm build && pnpm preview --host 127.0.0.1 --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});

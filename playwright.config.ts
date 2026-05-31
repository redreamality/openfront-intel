import { defineConfig, devices } from '@playwright/test';

// 复用系统已缓存的 Playwright 浏览器（%LOCALAPPDATA%\ms-playwright），无需重新下载。
// webServer 用 `build && preview` 服务生产构建产物：astro dev 在本机命中一个 Vite 的
// "Cannot split a chunk ... import.meta" 报错，preview 服务静态 dist 可稳定绕开。
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm build && pnpm preview --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});

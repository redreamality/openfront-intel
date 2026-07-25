import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PLAYWRIGHT_PORT ?? 4327);
const baseURL = `http://127.0.0.1:${port}`;
const webServerEnv: Record<string, string> = {};
for (const [key, value] of Object.entries(process.env)) {
  if (value !== undefined) webServerEnv[key] = value;
}

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
    env: {
      ...webServerEnv,
      PUBLIC_GOOGLE_CMP_ENABLED: 'true',
      PUBLIC_GOOGLE_CMP_SCRIPT_SRC: 'data:text/javascript,window.__openfrontGoogleCmpStubLoaded%3Dtrue',
    },
    reuseExistingServer: false,
    timeout: 180_000,
  },
});

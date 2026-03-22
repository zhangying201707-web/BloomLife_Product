const { defineConfig, devices } = require('@playwright/test');

const externalBaseUrl = process.env.E2E_BASE_URL;
const headedMode = process.env.E2E_HEADED === 'true';
const slowMo = Number(process.env.E2E_SLOWMO || 0);
const visualMode = headedMode || slowMo > 0;
const fixedViewport = { width: 1440, height: 960 };
const fixedScreen = { width: 1440, height: 960 };
const localBackendUrl = 'http://127.0.0.1:3100';

module.exports = defineConfig({
  testDir: './tests',
  timeout: visualMode ? 5 * 60 * 1000 : 60 * 1000,
  expect: {
    timeout: visualMode ? 20 * 1000 : 10 * 1000,
  },
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report/dev', open: 'never' }],
  ],
  use: {
    baseURL: externalBaseUrl || 'http://127.0.0.1:5174',
    headless: !headedMode,
    viewport: fixedViewport,
    screen: fixedScreen,
    launchOptions: {
      ...(slowMo > 0 ? { slowMo } : {}),
      args: ['--window-size=1440,960'],
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: fixedViewport,
        screen: fixedScreen,
      },
    },
  ],
  webServer: externalBaseUrl
    ? undefined
    : [
        {
          command: 'PORT=3100 node ../backend/index.js',
          url: localBackendUrl,
          reuseExistingServer: true,
          timeout: 120 * 1000,
        },
        {
          command: `VITE_DEV_API_PROXY_TARGET=${localBackendUrl} npm --prefix ../frontend run dev -- --host 127.0.0.1 --port 5174`,
          url: 'http://127.0.0.1:5174',
          reuseExistingServer: true,
          timeout: 120 * 1000,
        },
      ],
});

const { defineConfig, devices } = require('@playwright/test');

if (!process.env.E2E_BASE_URL) {
  throw new Error('E2E_BASE_URL is required for production Playwright runs.');
}

const fixedViewport = { width: 1440, height: 960 };
const fixedScreen = { width: 1440, height: 960 };

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report/prod', open: 'never' }],
  ],
  use: {
    baseURL: process.env.E2E_BASE_URL,
    headless: false,
    viewport: fixedViewport,
    screen: fixedScreen,
    launchOptions: {
      slowMo: 800,
      args: ['--window-size=1440,960'],
    },
    trace: 'on',
    screenshot: 'on',
    video: 'on',
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
  webServer: undefined,
});

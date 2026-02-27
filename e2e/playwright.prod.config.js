const { defineConfig, devices } = require('@playwright/test');

if (!process.env.E2E_BASE_URL) {
  throw new Error('E2E_BASE_URL is required for production Playwright runs.');
}

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
    launchOptions: {
      slowMo: 800,
    },
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: undefined,
});

import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.URL_BASE ?? 'https://verzel-store.qa-test-verzel-store.workers.dev/';

export default defineConfig({
  testDir: './testes',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: !!process.env.CI,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
      testDir: './testes/api',
    },
    {
      name: 'interface',
      testDir: './testes/interface',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});

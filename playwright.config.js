import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './__test__/visual',
  use: {
    baseURL: 'http://localhost:6006',
    browserName: 'chromium',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './__test__/visual',
  use: {
    // Configure the base URL
    baseURL: 'http://localhost:6006',
    // Configure browser options
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

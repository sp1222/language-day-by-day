import { compareImages, isRunningRegressionTest } from '@/visual/image.setup';
import { expect, test } from '@playwright/test';
import { resolve } from 'path';

test('Header visual regression test', async ({ page }) => {
  await page.goto('/iframe.html?viewMode=story&id=components-header--primary');
  await page.waitForTimeout(1000);

  const baselinePath = resolve(__dirname, 'screenshots/header-primary-baseline.png');
  const currentPath = resolve(__dirname, 'screenshots/header-primary-current.png');
  const diffPath = resolve(__dirname, 'screenshots/header-primary-diff.png');

  await page.screenshot({ path: currentPath });
  if (await isRunningRegressionTest(baselinePath, currentPath)) {
    const numDiffPixels = await compareImages(baselinePath, currentPath, diffPath);
    expect(numDiffPixels).toBe(0);
  }
});

import { expect, test } from '@playwright/test';
import { resolve } from 'path';
import { compareImages, isRunningRegressionTest } from './image.setup';

test('visual regression test sample', async ({ page }) => {
  // Note, the path we may be interested in is "/iframe.html?viewMode=story&id=components-header--primary&args="
  await page.goto('/');

  const baselinePath = resolve(__dirname, 'screenshots/baseline.png');
  const currentPath = resolve(__dirname, 'screenshots/current.png');
  const diffPath = resolve(__dirname, 'screenshots/diff.png');

  await page.screenshot({ path: currentPath });
  if (await isRunningRegressionTest(baselinePath, currentPath)) {
    const numDiffPixels = await compareImages(baselinePath, currentPath, diffPath);
    expect(numDiffPixels).toBe(0);
  }
});

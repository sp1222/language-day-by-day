import { test, expect } from '@playwright/test';
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs';
import { resolve } from 'path';
// import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const pixelmatchPromise = import('pixelmatch');

// Helper function to compare images
async function compareImages(img1Path, img2Path, diffPath) {
  const { default: pixelmatch } = await pixelmatchPromise;
  const img1 = PNG.sync.read(readFileSync(img1Path));
  const img2 = PNG.sync.read(readFileSync(img2Path));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.1,
  });

  writeFileSync(diffPath, PNG.sync.write(diff));
  return numDiffPixels;
}

test('visual regression test', async ({ page }) => {
  await page.goto('/');

  // Define paths
  const baselinePath = resolve(__dirname, 'screenshots/baseline.png');
  const currentPath = resolve(__dirname, 'screenshots/current.png');
  const diffPath = resolve(__dirname, 'screenshots/diff.png');

  // Capture screenshot
  await page.screenshot({ path: currentPath });

  // Compare screenshots
  if (!existsSync(baselinePath)) {
    // Save baseline if it doesn't exist
    copyFileSync(currentPath, baselinePath);
    console.log('Baseline screenshot saved.');
  } else {
    // if (!existsSync(currentPath)) {
    // } else {
      const numDiffPixels = await compareImages(baselinePath, currentPath, diffPath);
      expect(numDiffPixels).toBe(0);
    // }
  }
});

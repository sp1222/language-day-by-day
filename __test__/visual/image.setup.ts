import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { PNG } from 'pngjs';

const pixelmatchPromise = import('pixelmatch');

/**
 * 
 * @param img1Path   path to image 1 being compared
 * @param img2Path 
 * @param diffPath 
 * @param threshold 
 * @returns 
 */
export const compareImages = async (baselinePath: string, currentPath: string, diffPath: string, threshold: number = 0.1) => {
  const { default: pixelmatch } = await pixelmatchPromise;
  const img1 = PNG.sync.read(readFileSync(baselinePath));
  const img2 = PNG.sync.read(readFileSync(currentPath));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold,
  });

  writeFileSync(diffPath, PNG.sync.write(diff));
  return numDiffPixels;
}

export const isRunningRegressionTest = async (baselinePath: string, currentPath: string) => {

  if (!existsSync(baselinePath)) {
    copyFileSync(currentPath, baselinePath);
    console.log('New baseline screenshot saved.');
    return false;
  }
  return true;
}

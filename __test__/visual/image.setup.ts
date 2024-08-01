import { existsSync, readFileSync, writeFileSync } from "fs";
import { PNG } from "pngjs";

const pixelmatchPromise = import("pixelmatch");

/**
 * 
 * @param baselinePath   path to baseline image already in main
 * @param currentPath    path to new image generated in current body of work
 * @param diffPath       the difference between the two images
 * @param threshold      the acceptable threshold to allow for a difference image
 * @returns 
 */
export const compareImages = async (baselinePath: string, currentPath: string, diffPath: string, threshold: number = 0.10) => {
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

export const isRunningRegressionTest = async (baselinePath: string) => {
  if (!existsSync(baselinePath)) {
    return false;
  }
  return true;
}

import { getBrands } from './getBrands';

const MIN_YEAR = 2005;
const MAX_YEAR = 2025;

export function getBrandsByYear(year: number | string) {
  const yearNum = Number(year);
  if (!year || Number.isNaN(yearNum) || yearNum < MIN_YEAR || yearNum > MAX_YEAR) {
    return [];
  }
  return getBrands();
}


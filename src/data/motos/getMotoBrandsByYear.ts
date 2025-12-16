import { motoBrands, motoYears } from './brands';

export function getMotoBrandsByYear(year?: string | number) {
  if (!year) return [];
  const y = Number(year);
  if (Number.isNaN(y) || y < Number(motoYears[0])) return [];
  return motoBrands.map((b) => b.brand);
}


import { carBrands } from './brands';

export function getModelsByBrand(brand: string) {
  const item = carBrands.find((entry) => entry.brand === brand);
  return item ? item.models : [];
}


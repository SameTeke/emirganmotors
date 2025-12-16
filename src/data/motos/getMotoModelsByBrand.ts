import { motoBrands } from './brands';

export function getMotoModelsByBrand(brand: string) {
  const found = motoBrands.find((item) => item.brand === brand);
  return found ? found.models : [];
}


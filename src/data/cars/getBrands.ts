import { carBrands } from './brands';

export function getBrands() {
  return carBrands.map((item) => item.brand);
}


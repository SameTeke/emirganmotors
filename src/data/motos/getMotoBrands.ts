import { motoBrands } from './brands';

export function getMotoBrands() {
  return motoBrands.map((item) => item.brand);
}


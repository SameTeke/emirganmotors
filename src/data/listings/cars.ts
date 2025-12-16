export type CarListing = {
  slug: string;
  title: string;
  listingNo: string;
  price: string;
  priceValue: number;
  year: number;
  km: number;
  fuel: string;
  transmission: string;
  location: string;
  images: string[];
  plate: string;
  vin: string;
  color: string;
  drivetrain: string;
  power: string;
  torque: string;
  engine: string;
  summary?: string;
  paintClean?: boolean; // boyasız
  replaceClean?: boolean; // değişensiz
  tramerClean?: boolean; // tramer kaydı yok
};

export const carListings: CarListing[] = [
  {
    slug: 'bmw-320i-luxury-2018',
    listingNo: '06337701',
    title: 'BMW 3 Serisi 320i Luxury Line',
    price: '₺1.675.000',
    priceValue: 1675000,
    year: 2018,
    km: 92150,
    fuel: 'Benzinli',
    transmission: 'Otomatik',
    location: 'İstanbul / Maslak',
    images: [
      '/images/araba1.jpeg',
      '/images/araba1_2.jpeg',
      '/images/araba1_3.jpeg',
      '/images/araba1_4.jpeg'
    ],
    plate: '34 TJ 5860',
    vin: 'WBA8B1100JX921321',
    color: 'Gri',
    drivetrain: 'Arkadan itişli',
    power: '170 hp',
    torque: '250 Nm',
    engine: '1.6L Turbo Benzin',
    summary: 'Yetkili servis bakımlı, ekspertiz raporu mevcut, kaporta boyasız.',
    paintClean: true,
    replaceClean: true,
    tramerClean: true
  },
  {
    slug: 'audi-a4-35-tdi-2020',
    listingNo: '06337702',
    title: 'Audi A4 35 TDI Design',
    price: '₺1.895.000',
    priceValue: 1895000,
    year: 2020,
    km: 61200,
    fuel: 'Dizel',
    transmission: 'Otomatik',
    location: 'Ankara / Çankaya',
    images: [
      '/images/araba2.jpeg',
      '/images/araba2_2.jpeg',
      '/images/araba2_3.jpeg',
      '/images/araba2_4.jpeg'
    ],
    plate: '06 AA 4321',
    vin: 'WAUZZZF49LA012345',
    color: 'Siyah',
    drivetrain: 'Önden çekiş',
    power: '163 hp',
    torque: '380 Nm',
    engine: '2.0L Dizel',
    summary: 'Tek kullanıcı, tüm bakımlar Audi servis kayıtlı, lastikler yeni.',
    paintClean: true,
    replaceClean: true,
    tramerClean: true
  },
  {
    slug: 'volvo-xc40-recharge-2022',
    listingNo: '06337703',
    title: 'Volvo XC40 Recharge Pure Electric',
    price: '₺2.950.000',
    priceValue: 2950000,
    year: 2022,
    km: 28500,
    fuel: 'Elektrikli',
    transmission: 'Otomatik',
    location: 'İzmir / Bornova',
    images: [
      '/images/araba3.jpeg',
      '/images/araba3_2.jpeg',
      '/images/araba3_3.jpeg',
      '/images/araba3_4.jpeg'
    ],
    plate: '35 EV 4040',
    vin: 'YV1XZJEL0N1234567',
    color: 'Beyaz',
    drivetrain: '4x4',
    power: '231 hp',
    torque: '330 Nm',
    engine: 'Tam Elektrikli',
    summary: 'Hızlı şarj destekli, pil sağlığı %96, çarpışma kaydı yok.',
    paintClean: true,
    replaceClean: true,
    tramerClean: true
  },
  {
    slug: 'mercedes-c200d-amg-2019',
    listingNo: '06337704',
    title: 'Mercedes C200d AMG',
    price: '₺2.150.000',
    priceValue: 2150000,
    year: 2019,
    km: 78500,
    fuel: 'Dizel',
    transmission: 'Otomatik',
    location: 'İzmir / Balçova',
    images: [
      '/images/araba1.jpeg',
      '/images/araba1_2.jpeg',
      '/images/araba1_3.jpeg',
      '/images/araba1_4.jpeg'
    ],
    plate: '35 MB 200',
    vin: 'WDD2050031F765432',
    color: 'Metalik Gri',
    drivetrain: 'Arkadan itişli',
    power: '160 hp',
    torque: '360 Nm',
    engine: '1.6L Dizel',
    summary: 'AMG paket, iki parça lokal boya, ağır hasar kaydı yok.',
    paintClean: false,
    replaceClean: true,
    tramerClean: true
  },
  {
    slug: 'vw-passat-15-tsi-2021',
    listingNo: '06337705',
    title: 'Volkswagen Passat 1.5 TSI Business',
    price: '₺2.050.000',
    priceValue: 2050000,
    year: 2021,
    km: 48200,
    fuel: 'Benzinli',
    transmission: 'Otomatik',
    location: 'Bursa / Nilüfer',
    images: [
      '/images/araba2.jpeg',
      '/images/araba2_2.jpeg',
      '/images/araba2_3.jpeg',
      '/images/araba2_4.jpeg'
    ],
    plate: '16 PS 2021',
    vin: 'WVWZZZ3CZME123456',
    color: 'Lacivert',
    drivetrain: 'Önden çekiş',
    power: '150 hp',
    torque: '250 Nm',
    engine: '1.5L TSI',
    summary: 'Yetkili servis bakımlı, boyasız, değişensiz, tramer kaydı yok.',
    paintClean: true,
    replaceClean: true,
    tramerClean: true
  },
  {
    slug: 'toyota-corolla-122-hybrid-2022',
    listingNo: '06337706',
    title: 'Toyota Corolla 1.8 Hybrid Flame X-Pack',
    price: '₺1.430.000',
    priceValue: 1430000,
    year: 2022,
    km: 36500,
    fuel: 'Hybrid',
    transmission: 'Otomatik',
    location: 'Ankara / Çankaya',
    images: [
      '/images/araba3.jpeg',
      '/images/araba3_2.jpeg',
      '/images/araba3_3.jpeg',
      '/images/araba3_4.jpeg'
    ],
    plate: '06 HYB 122',
    vin: 'NMTBZ3BE60R123456',
    color: 'Beyaz',
    drivetrain: 'Önden çekiş',
    power: '122 hp',
    torque: '142 Nm',
    engine: '1.8L Hybrid',
    summary: 'Tek el, düşük km, boyasız ve değişensiz, tramer kaydı yok.',
    paintClean: true,
    replaceClean: true,
    tramerClean: true
  }
];

export function getCarListing(slug: string) {
  return carListings.find((item) => item.slug === slug);
}


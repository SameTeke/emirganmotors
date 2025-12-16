const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@local.dev';
  const password = 'admin12345';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash }
  });

  console.log('Seeded admin user:', email);

  // Örnek ilanlar
  const samples = [
      {
        brand: 'BMW',
        model: '320i',
        price: 1850000,
        year: 2019,
        city: '34 İstanbul',
        fuelType: 'Benzin',
        transmission: 'Otomatik',
        mileage: 68500,
        bodyType: 'Sedan',
        color: 'Siyah',
        paintDamageInfo: { 'Sol Ön Çamurluk': 2 },
        replacedParts: 'Yok',
        tramerHasRecord: false,
        tramerAmount: null,
        heavyDamage: false,
        status: 'published',
        images: ['/images/araba1.JPEG', '/images/araba1_2.JPEG', '/images/araba1_3.JPEG']
      },
      {
        brand: 'Audi',
        model: 'A6',
        price: 2650000,
        year: 2020,
        city: '06 Ankara',
        fuelType: 'Dizel',
        transmission: 'Otomatik',
        mileage: 74200,
        bodyType: 'Sedan',
        color: 'Gri',
        paintDamageInfo: { 'Sağ Arka Kapı': 3 },
        replacedParts: 'Yok',
        tramerHasRecord: true,
        tramerAmount: 18000,
        heavyDamage: false,
        status: 'published',
        images: ['/images/araba2.JPEG', '/images/araba2_2.JPEG', '/images/araba2_3.JPEG']
      },
      {
        brand: 'Mercedes-Benz',
        model: 'C200',
        price: 2395000,
        year: 2018,
        city: '35 İzmir',
        fuelType: 'Benzin',
        transmission: 'Otomatik',
        mileage: 91500,
        bodyType: 'Sedan',
        color: 'Beyaz',
        paintDamageInfo: { Tavan: 1 },
        replacedParts: 'Ön tampon değişen',
        tramerHasRecord: false,
        tramerAmount: null,
        heavyDamage: false,
        status: 'published',
        images: ['/images/araba3.JPEG', '/images/araba3_2.JPEG', '/images/araba3_3.JPEG']
      },
      {
        brand: 'Volkswagen',
        model: 'Passat',
        price: 1590000,
        year: 2017,
        city: '16 Bursa',
        fuelType: 'Dizel',
        transmission: 'Otomatik',
        mileage: 128400,
        bodyType: 'Sedan',
        color: 'Lacivert',
        paintDamageInfo: { 'Ön Tampon': 2, 'Arka Tampon': 2 },
        replacedParts: 'Yok',
        tramerHasRecord: true,
        tramerAmount: 9500,
        heavyDamage: false,
        status: 'published',
        images: ['/images/araba1_4.JPEG', '/images/araba2_4.JPEG', '/images/araba3_4.JPEG']
      },
      {
        brand: 'Volvo',
        model: 'XC40',
        price: 2950000,
        year: 2022,
        city: '41 Kocaeli',
        fuelType: 'Hybrid',
        transmission: 'Otomatik',
        mileage: 28500,
        bodyType: 'SUV',
        color: 'Kırmızı',
        paintDamageInfo: { Bagaj: 1 },
        replacedParts: 'Yok',
        tramerHasRecord: false,
        tramerAmount: null,
        heavyDamage: false,
        status: 'published',
        images: ['/images/araba3.JPEG', '/images/araba2.JPEG']
      },
      {
        brand: 'Toyota',
        model: 'Corolla',
        price: 1325000,
        year: 2016,
        city: '07 Antalya',
        fuelType: 'Benzin',
        transmission: 'Otomatik',
        mileage: 154000,
        bodyType: 'Sedan',
        color: 'Beyaz',
        paintDamageInfo: { 'Sol Arka Kapı': 2 },
        replacedParts: 'Yok',
        tramerHasRecord: false,
        tramerAmount: null,
        heavyDamage: false,
        status: 'published',
        images: ['/images/araba2.JPEG']
      },
      {
        brand: 'Renault',
        model: 'Megane',
        price: 1190000,
        year: 2017,
        city: '01 Adana',
        fuelType: 'Dizel',
        transmission: 'Manuel',
        mileage: 167500,
        bodyType: 'Hatchback',
        color: 'Gri',
        paintDamageInfo: { 'Sağ Ön Kapı': 3 },
        replacedParts: 'Yok',
        tramerHasRecord: true,
        tramerAmount: 12500,
        heavyDamage: false,
        status: 'published',
        images: ['/images/araba1.JPEG']
      },
      {
        brand: 'Honda',
        model: 'Civic',
        price: 1450000,
        year: 2018,
        city: '26 Eskişehir',
        fuelType: 'Benzin',
        transmission: 'CVT',
        mileage: 112000,
        bodyType: 'Sedan',
        color: 'Kırmızı',
        paintDamageInfo: { 'Ön Tampon': 2 },
        replacedParts: 'Yok',
        tramerHasRecord: false,
        tramerAmount: null,
        heavyDamage: false,
        status: 'published',
        images: ['/images/araba3_2.JPEG']
      },
      {
        brand: 'Peugeot',
        model: '3008',
        price: 2190000,
        year: 2021,
        city: '55 Samsun',
        fuelType: 'Dizel',
        transmission: 'Otomatik',
        mileage: 49500,
        bodyType: 'SUV',
        color: 'Siyah',
        paintDamageInfo: { Tavan: 1 },
        replacedParts: 'Yok',
        tramerHasRecord: false,
        tramerAmount: null,
        heavyDamage: false,
        status: 'published',
        images: ['/images/araba2_2.JPEG']
      },
      {
        brand: 'Hyundai',
        model: 'Tucson',
        price: 2050000,
        year: 2020,
        city: '27 Gaziantep',
        fuelType: 'Benzin',
        transmission: 'Otomatik',
        mileage: 63500,
        bodyType: 'SUV',
        color: 'Mavi',
        paintDamageInfo: { 'Arka Tampon': 2 },
        replacedParts: 'Yok',
        tramerHasRecord: true,
        tramerAmount: 22000,
        heavyDamage: false,
        status: 'published',
        images: ['/images/araba1_3.JPEG']
      }
    ];

  async function createListings(count) {
    const existingCount = await prisma.listing.count();
    const start = existingCount % samples.length;
    for (let i = 0; i < count; i++) {
      const s = samples[(start + i) % samples.length];
      const created = await prisma.listing.create({
        data: {
          brand: s.brand,
          model: s.model,
          price: s.price,
          year: s.year,
          city: s.city,
          fuelType: s.fuelType,
          transmission: s.transmission,
          mileage: s.mileage,
          bodyType: s.bodyType,
          color: s.color,
          paintDamageInfo: s.paintDamageInfo,
          replacedParts: s.replacedParts,
          tramerHasRecord: s.tramerHasRecord,
          tramerAmount: s.tramerAmount ?? undefined,
          heavyDamage: s.heavyDamage,
          status: s.status,
          images: {
            create: s.images.map((url) => ({ url }))
          }
        }
      });
      console.log('Seeded listing:', created.id, `${s.brand} ${s.model}`);
    }
  }

  // Mod 1: DB boşsa/azsa toplamı 5'e tamamla
  const existingCount = await prisma.listing.count();
  const target = 5;
  const toFill = Math.max(0, target - existingCount);
  if (toFill > 0) {
    await createListings(toFill);
  }

  // Mod 2: İstenirse ekstra ilan ekle (örn: SEED_ADD_LISTINGS=5)
  const addCount = Number(process.env.SEED_ADD_LISTINGS || 0);
  if (addCount > 0) {
    await createListings(addCount);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



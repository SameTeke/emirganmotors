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

  // Blog yazıları (ilk kurulum)
  const blogSamples = [
    {
      title: 'Sent Ayarı Nedir, Nasıl Yapılır?',
      slug: 'sent-ayari-nedir-nasil-yapilir',
      readingTime: '4 dk',
      publishedAt: '2024-08-12',
      excerpt: 'Sent ayarı nedir, nasıl yapılır ve sürüşe etkisi nedir? Temel ipuçları ve kontrol listesi.',
      content:
        'Bu yazı admin panelinden düzenlenebilir.\n\nSent ayarı; motosiklet zincirinin gerginliğini ifade eder. Doğru gerginlik, güvenli sürüş ve parça ömrü için önemlidir.\n\nKontrol aralığı, gerginlik ölçümü ve sıkma torkları üretici önerilerine göre yapılmalıdır.'
    },
    {
      title: 'En İyi 125 CC Motosiklet Modelleri',
      slug: 'en-iyi-125cc-motosiklet-modelleri',
      readingTime: '5 dk',
      publishedAt: '2024-08-10',
      excerpt: 'Şehir içi kullanımda öne çıkan 125cc modeller, artıları ve dikkat edilmesi gerekenler.',
      content:
        'Bu yazı admin panelinden düzenlenebilir.\n\n125cc sınıfı; yakıt ekonomisi ve kullanım kolaylığıyla popülerdir.\n\nSeçim yaparken servis ağı, yedek parça maliyeti ve ikinci el değeri gibi kriterleri değerlendirin.'
    },
    {
      title: 'Doğru Lastik Seçimi ile Yakıt Tüketimini Azaltmanın Yolları',
      slug: 'dogru-lastik-secimi-ile-yakit-tuketimini-azaltma',
      readingTime: '6 dk',
      publishedAt: '2024-08-08',
      excerpt: 'Doğru lastik basıncı ve lastik seçimi yakıt tüketimini doğrudan etkiler. Pratik öneriler.',
      content:
        'Bu yazı admin panelinden düzenlenebilir.\n\nYanlış basınç yuvarlanma direncini artırır.\n\nLastik ebatı, desen ve bileşik seçimi kullanım senaryonuza uygun olmalıdır.'
    },
    {
      title: 'Uzun Yolda Araç Bakım Kontrol Listesi',
      slug: 'uzun-yolda-arac-bakim-kontrol-listesi',
      readingTime: '5 dk',
      publishedAt: '2024-08-05',
      excerpt: 'Uzun yol öncesi kontrol edilmesi gereken temel noktalar: sıvılar, lastikler, frenler ve aydınlatma.',
      content:
        'Bu yazı admin panelinden düzenlenebilir.\n\nMotor yağı, soğutma suyu, fren hidroliği ve silecek suyu seviyelerini kontrol edin.\n\nLastik diş derinliği ve basınç değerlerini üretici tavsiyesine göre ayarlayın.'
    },
    {
      title: 'Şehir İçi Sürüşte Yakıt Tasarrufu İpuçları',
      slug: 'sehir-ici-suruste-yakit-tasarrufu-ipuclari',
      readingTime: '4 dk',
      publishedAt: '2024-08-03',
      excerpt: 'Şehir içi trafikte yakıt tasarrufu için hızlanma, dur-kalk, klima ve lastik basıncı önerileri.',
      content:
        'Bu yazı admin panelinden düzenlenebilir.\n\nAni hızlanma ve sert fren yakıt tüketimini artırır.\n\nRölantide beklemek yerine, uzun duruşlarda aracı stop etmek avantaj sağlayabilir.'
    },
    {
      title: 'Araç Değer Kaybını Önlemenin 7 Yolu',
      slug: 'arac-deger-kaybini-onlemenin-7-yolu',
      readingTime: '5 dk',
      publishedAt: '2024-08-01',
      excerpt: 'Bakım kayıtları, doğru ekspertiz, boyasızlık ve doğru satış zamanı gibi değer kaybını azaltan adımlar.',
      content:
        'Bu yazı admin panelinden düzenlenebilir.\n\nDüzenli bakım ve belgeli servis geçmişi ikinci elde değer katar.\n\nUfak hasarları büyümeden onarmak ve orijinal parça tercih etmek önemlidir.'
    },
    {
      title: 'Kış Lastiği Ne Zaman Takılır?',
      slug: 'kis-lastigi-ne-zaman-takilir',
      readingTime: '3 dk',
      publishedAt: '2024-07-29',
      excerpt: 'Kış lastiği takma zamanı, yasal zorunluluklar ve güvenli sürüş için ipuçları.',
      content:
        'Bu yazı admin panelinden düzenlenebilir.\n\nHava sıcaklığı 7°C altına düştüğünde kış lastiği performansı artar.\n\nDiş derinliği ve üretim tarihi kontrol edilmeli, lastikler aynı aks üzerinde aynı tip olmalıdır.'
    },
    {
      title: 'İkinci El Araç Alırken Ekspertiz Kontrolü',
      slug: 'ikinci-el-arac-alirken-ekspertiz-kontrolu',
      readingTime: '6 dk',
      publishedAt: '2024-07-25',
      excerpt: 'İkinci el araç alımında ekspertizde nelere bakılmalı? Kaporta, mekanik ve tramer kontrolü.',
      content:
        'Bu yazı admin panelinden düzenlenebilir.\n\nKaporta ölçüm cihazı sonuçları, şasi işlem kontrolü ve boya-değişen durumları kritik veriler sunar.\n\nOBD taraması, motor/şanzıman kontrolü ve test sürüşü yapılmalıdır.'
    }
  ];

  for (const p of blogSamples) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        thumbnailUrl: '/images/banner.jpg',
        heroImageUrl: '/images/banner.jpg',
        readingTime: p.readingTime,
        status: 'published',
        publishedAt: new Date(p.publishedAt)
      }
    });
  }

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



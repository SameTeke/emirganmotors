"use client";

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const posts = [
  {
    id: 1,
    title: 'Sent Ayarı Nedir, Nasıl Yapılır?',
    slug: 'sent-ayari-nedir-nasil-yapilir',
    date: '12 Ağustos 2024',
    readingTime: '4 dk',
    imageUrl: '/images/banner.jpg'
  },
  {
    id: 2,
    title: 'En İyi 125 CC Motosiklet Modelleri',
    slug: 'en-iyi-125cc-motosiklet-modelleri',
    date: '10 Ağustos 2024',
    readingTime: '5 dk',
    imageUrl: '/images/banner.jpg'
  },
  {
    id: 3,
    title: 'Doğru Lastik Seçimi ile Yakıt Tüketimini Azaltmanın Yolları',
    slug: 'dogru-lastik-secimi-ile-yakit-tuketimini-azaltma',
    date: '08 Ağustos 2024',
    readingTime: '6 dk',
    imageUrl: '/images/banner.jpg'
  },
  {
    id: 4,
    title: 'Uzun Yolda Araç Bakım Kontrol Listesi',
    slug: 'uzun-yolda-arac-bakim-kontrol-listesi',
    date: '05 Ağustos 2024',
    readingTime: '5 dk',
    imageUrl: '/images/banner.jpg'
  },
  {
    id: 5,
    title: 'Şehir İçi Sürüşte Yakıt Tasarrufu İpuçları',
    slug: 'sehir-ici-suruste-yakit-tasarrufu-ipuclari',
    date: '03 Ağustos 2024',
    readingTime: '4 dk',
    imageUrl: '/images/banner.jpg'
  },
  {
    id: 6,
    title: 'Araç Değer Kaybını Önlemenin 7 Yolu',
    slug: 'arac-deger-kaybini-onlemenin-7-yolu',
    date: '01 Ağustos 2024',
    readingTime: '5 dk',
    imageUrl: '/images/banner.jpg'
  },
  {
    id: 7,
    title: 'Kış Lastiği Ne Zaman Takılır?',
    slug: 'kis-lastigi-ne-zaman-takilir',
    date: '29 Temmuz 2024',
    readingTime: '3 dk',
    imageUrl: '/images/banner.jpg'
  },
  {
    id: 8,
    title: 'İkinci El Araç Alırken Ekspertiz Kontrolü',
    slug: 'ikinci-el-arac-alirken-ekspertiz-kontrolu',
    date: '25 Temmuz 2024',
    readingTime: '6 dk',
    imageUrl: '/images/banner.jpg'
  }
];

type Params = {
  params: { slug: string };
};

export default function BlogDetailPage({ params }: Params) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-white pt-16 sm:pt-20">
        <Header />
        <div className="mx-auto max-w-screen-md px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900">Yazı bulunamadı</h1>
          <p className="mt-2 text-sm text-slate-600">Aradığınız blog yazısı mevcut değil.</p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Bloga dön
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-16 sm:pt-20">
      <Header />
      <article className="mx-auto max-w-screen-md px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 h-56 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-72">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        <p className="text-sm font-medium text-slate-500">
          {post.date} · {post.readingTime}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{post.title}</h1>

        <div className="prose prose-slate mt-6 max-w-none">
          <p>
            Bu içerik demo amaçlıdır. Gerçek blog metni burada yer alacaktır. Araç bakımı, sürüş
            güvenliği, yakıt tasarrufu ve otomotiv ipuçlarına dair zengin içerikler eklenebilir.
          </p>
          <p>
            Kod yapısı, Tailwind CSS ile responsive olacak şekilde hazırlandı. Görseller şu an
            için banner.jpg kullanılarak gösteriliyor; gerçek görsellerle değiştirilebilir.
          </p>
          <p>
            Buraya SEO uyumlu, uzun blog içeriği eklenerek sayfanın arama motorlarındaki görünürlüğü
            artırılabilir. Başlıklar, alt başlıklar ve liste öğeleriyle zenginleştirilebilir.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            ← Bloga dön
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}


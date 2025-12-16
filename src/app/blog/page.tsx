/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
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

export default function BlogPage() {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  const latestPosts = posts.slice(0, 3);
  const popularPosts = posts.slice(3, 6);

  return (
    <main className="min-h-screen bg-white pt-16 sm:pt-20">
      <Header />
      <section className="mx-auto flex max-w-screen-2xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Blog</h1>
          <p className="text-sm text-slate-600">
            Otomotiv dünyasından ipuçları, rehberler ve güncel içerikler.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_0.9fr]">
          {/* Main Content */}
          <div className="space-y-6">
            <div className="w-full">
              <input
                type="text"
                placeholder="Arama yapın..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <Link href={`/blog/${post.slug}`} className="relative block h-32 w-full sm:h-44">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />
                  </Link>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="text-base font-semibold text-slate-900 line-clamp-2">{post.title}</h3>
                    <p className="text-xs font-medium text-slate-500">
                      {post.date} · {post.readingTime}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-auto text-sm font-semibold text-primary transition hover:text-primary/80"
                    >
                      Devamını oku →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900">Son Yazılanlar</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {latestPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex hover:text-primary transition"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900">En Popüler Yazılar</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {popularPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex hover:text-primary transition"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}


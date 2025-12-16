"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const quickLinks = [
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Sıkça Sorulan Sorular', href: '/sss' },
  { label: 'İletişim', href: '/iletisim' },
  { label: 'Kariyer Olanakları', href: '/kariyer' },
  { label: 'Gizlilik ve Şartlar', href: '/gizlilik-ve-sartlar' },
  { label: 'Çerez Politikası', href: '/cerez-politikasi' },
  { label: 'Satış ve Ödeme Koşulları', href: '/satis-ve-odeme-kosullari' },
  { label: 'Ekspertiz Koşulları', href: '/ekspertiz-kosullari' }
];

type FAQItem = { q: string; a: string };
type FAQCategory = { key: string; label: string; items: FAQItem[]; intro?: string };

const categories: FAQCategory[] = [
  {
    key: 'araba-alim',
    label: 'Araba Alırken',
    items: [
      { q: 'Arabamı ne kadar eder, değeri nasıl hesaplanır?', a: 'Ekspertiz ve pazar verileri ile değerliyoruz.' },
      { q: 'Satın alma süreci ne kadar sürer?', a: 'Evraklar tam ise aynı gün içinde tamamlanabilir.' },
      { q: 'Ödemeyi nasıl yapıyorsunuz?', a: 'Hızlı EFT/Havale veya anlaşmalı ödeme yöntemleri ile.' }
    ],
    intro:
      'Arabam ne kadar eder?, araba değeri hesaplama sürecimiz: 30’dan fazla kontrol noktası, pazar kıyas verileri ve hızlı teklif.'
  },
  {
    key: 'degerli-hesap',
    label: 'Araba Değerli Hesaplama',
    items: [
      { q: 'Ekspertiz raporunda hangi bilgiler bulunmakta?', a: 'Mekanik, kaporta, iç-dış trim, test sürüşü.' },
      { q: 'Noter ücreti kim tarafından karşılanmaktadır?', a: 'Satın alma işlemlerinde noter ücretini biz karşılıyoruz.' },
      { q: 'Randevu almadan gelebilir miyim?', a: 'Mümkünse randevu almanızı öneririz; yoğunluk durumuna göre kabul edilir.' }
    ]
  },
  {
    key: 'motosiklet',
    label: 'Motosiklet Alım',
    items: [
      { q: 'Motosiklet için de ekspertiz var mı?', a: 'Evet, motosikletler için de ekspertiz ve değerleme yapıyoruz.' },
      { q: 'Ödeme süresi nedir?', a: 'Onay sonrası aynı gün ödeme yapıyoruz.' },
      { q: 'Hangi markaları alıyorsunuz?', a: 'Belirlenen kriterlere uyan tüm marka/model motosikletler.' }
    ]
  },
  {
    key: 'servis',
    label: 'Servis',
    items: [
      { q: 'Servis randevusunu nasıl alırım?', a: 'Online randevu formu veya çağrı merkezimiz üzerinden.' },
      { q: 'Hangi işlemler yapılıyor?', a: 'Periyodik bakım, mekanik onarım, boya/küçük parça işlemleri.' },
      { q: 'Yedek araç sağlıyor musunuz?', a: 'Uygunluk durumuna göre yedek araç sunulabilir.' }
    ],
    intro:
      'Servis kapsamı: periyodik bakım, mekanik onarım, klima gaz kontrolü, akü-balatabakımları, lastik, fren, vb.'
  }
];

export default function SSSPage() {
  const [active, setActive] = useState('araba-alim');
  const [expanded, setExpanded] = useState<string | null>(null);

  const current = useMemo(() => categories.find((c) => c.key === active) || categories[0], [active]);

  return (
    <main className="min-h-screen bg-white pt-16 sm:pt-20">
      <Header />
      <section className="mx-auto flex max-w-screen-2xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Sıkça Sorulan Sorular</h1>
          <p className="text-sm text-slate-600">Aklınızdaki soruların cevaplarını hızlıca bulun.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_2.1fr]">
          {/* Left quick nav */}
          <aside className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm h-fit">
            <h3 className="text-sm font-semibold text-slate-900">Hızlı Gezinme</h3>
            <nav className="flex flex-col space-y-2 text-sm text-slate-700">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main FAQ */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActive(cat.key)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active === cat.key
                      ? 'border-primary bg-primary text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-primary/60 hover:bg-primary/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {current.intro ? (
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                {current.intro}
              </div>
            ) : null}

            <div className="space-y-3">
              {current.items.map((item, idx) => {
                const id = `${current.key}-${idx}`;
                const open = expanded === id;
                return (
                  <div
                    key={id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setExpanded(open ? null : id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-xs text-slate-500">
                          ?
                        </span>
                        <p className="text-sm font-semibold text-slate-900">{item.q}</p>
                      </div>
                      <span
                        className={`text-slate-500 transition ${open ? 'rotate-180' : ''}`}
                      >
                        ▼
                      </span>
                    </button>
                    {open ? (
                      <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-700 leading-relaxed">
                        {item.a}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}


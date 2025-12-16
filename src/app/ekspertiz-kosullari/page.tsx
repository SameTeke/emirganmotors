"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

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

export default function EkspertizKosullariPage() {
  return (
    <main className="min-h-screen bg-white pt-16 sm:pt-20">
      <Header />
      <section className="mx-auto flex max-w-screen-2xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Ekspertiz Koşulları</h1>
          <p className="text-sm text-slate-600">
            Ekspertiz süreçleriyle ilgili bilgilendirme metni. (Örnek içerik)
          </p>
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

          {/* Content */}
          <article className="prose prose-slate max-w-none rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p>
              Ekspertiz işlemleri, satış yapılan lokasyona göre Borusan Oto Değerlendirme Pazarlama ve Hizmet A.Ş. teknik
              ekipleri, Borusan Oto Servis ve Ticaret A.Ş. ekipleri veya Borusan Otomotiv’in anlaşmalı iş ortakları
              tarafından yürütülmektedir.
            </p>
            <p>
              Ekspertiz değerlendirmeleri bilgilendirme amacı taşır; aracın tüm teknik durumuna ilişkin kesin garanti
              niteliği taşımaz.
            </p>
            <p>
              8 yaş veya 160.000 km altındaki araçlarda yapılan ekspertiz işlemleri, ilgili mevzuat gereği TSE
              standartlarına uygundur. Diğer araçlarda gerçekleştirilen ekspertiz işlemleri ise ilgili kontrol listeleri
              ve teknik inceleme süreçlerine göre yapılmakta olup aracın muayene edildiği andaki durumu yansıtır;
              sonradan ortaya çıkabilecek arızalara ilişkin taahhüt içermez.
            </p>
            <p className="text-xs text-slate-500">
              Bu içerik örnek amaçlıdır; yayına alınmadan önce nihai metinle güncellenecektir.
            </p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}


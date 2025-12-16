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

const sections = [
  {
    title: '1. Genel Hükümler',
    content: `Bu sayfadaki metin örnek amaçlıdır. Satış ve ödeme süreçleri, sözleşme koşulları, teslimat, iptal, iade ve
    ödeme yöntemleri gibi başlıklar gerçek metinle güncellenecektir.`
  },
  {
    title: '2. Satış Süreci',
    content: `Sipariş onayı, evrak hazırlığı, noter işlemleri ve araç teslim koşulları hakkında bilgilendirme sağlanacaktır.
    Detaylar, ileride yayınlanacak olan resmi metin ile netleşecektir.`
  },
  {
    title: '3. Ödeme Koşulları',
    content: `Ödeme yöntemleri (EFT/Havale, kredi, finansman), ödeme zamanlaması ve dekont paylaşımı süreçleri burada
    açıklanacaktır. Geçerli mevzuat ve sözleşme şartlarına uygun şekilde güncellenecektir.`
  },
  {
    title: '4. İptal ve İade',
    content: `Araç alım-satım işlemlerinde iptal ve iade süreçleri, cezai şartlar veya masraflar hakkında bilgiler,
    resmi metinle birlikte duyurulacaktır.`
  },
  {
    title: '5. Teslimat',
    content: `Teslim tarihi, teslim yeri, sigorta veya nakliye sorumlulukları gibi detaylar bu bölümde yer alacaktır.
    Bu içerik placeholders niteliğindedir.`
  }
];

export default function SatisOdemeKosullariPage() {
  return (
    <main className="min-h-screen bg-white pt-16 sm:pt-20">
      <Header />
      <section className="mx-auto flex max-w-screen-2xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Satış ve Ödeme Koşulları</h1>
          <p className="text-sm text-slate-600">
            Satış, ödeme, teslimat ve iade süreçlerine ilişkin bilgilendirme metnidir. (Örnek içerik)
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
            {sections.map((sec) => (
              <div key={sec.title} className="space-y-2">
                <h2>{sec.title}</h2>
                <p>{sec.content}</p>
              </div>
            ))}
            <p className="text-xs text-slate-500">
              Bu metin örnek amaçlıdır; yayına alınmadan önce güncellenecek ve nihai metinle değiştirilecektir.
            </p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}


import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-16 sm:pt-20">
      <Header />
      <section className="mx-auto flex max-w-screen-2xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">İletişim</h1>
          <p className="text-sm text-slate-600">
            Müşteri temsilcilerimiz 7/24 hizmetinizdedir.
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

          {/* Main content */}
          <div className="space-y-6">
            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <iframe
                title="İstanbul Kağıthane"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12032.351279213147!2d28.9746106!3d41.0853822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab72e92fb35ab%3A0x54910851db5a9cfe!2sKa%C4%9F%C4%B1thane%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000"
              />
            </div>

            {/* Contact info cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mt-1 h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  📞
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">İletişim Numarası</p>
                  <a
                    href="tel:+905xxxxxxxxx"
                    className="text-sm font-medium text-slate-700"
                  >
                    +90 (5xx) xxx xx xx
                  </a>
                  <p className="text-xs font-medium text-emerald-600">7/24 Hizmet</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mt-1 h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  📧
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">E-posta Adresi</p>
                  <a
                    href="mailto:info@mailadresi.com"
                    className="text-sm font-medium text-slate-700"
                  >
                    info@mailadresi.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-2">
                <div className="mt-1 h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  📍
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Adres</p>
                  <p className="text-sm font-medium text-slate-700">İstanbul - Kağıthane</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}


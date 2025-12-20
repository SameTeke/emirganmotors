"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LatestListingsStrip from '@/components/home/LatestListingsStrip';
import { getBrandsByYear } from '@/data/cars/getBrandsByYear';
import { getModelsByBrand } from '@/data/cars/getModelsByBrand';
import { getMotoBrandsByYear } from '@/data/motos/getMotoBrandsByYear';
import { getMotoModelsByBrand } from '@/data/motos/getMotoModelsByBrand';
import { motoYears } from '@/data/motos/brands';

type TabKey = 'buy' | 'sell' | 'consign' | 'moto';
type FormState = { year: string; brand: string; model: string };

export default function HomePage() {
  const router = useRouter();
  const [heroTitle, setHeroTitle] = useState('Aracınızın Değerini Biliyor Musunuz?');
  const [heroDesc, setHeroDesc] = useState('Uzmanlarımız anında değerleme yapar, paranız hızlıca hesabınızda.');
  const [heroTabBuy, setHeroTabBuy] = useState('Araç Al');
  const [heroTabSell, setHeroTabSell] = useState('Araç Sat');
  const [heroTabConsign, setHeroTabConsign] = useState('Konsinye Bırak');
  const [heroTabMoto, setHeroTabMoto] = useState('Motosiklet Sat');
  const [heroYearPlaceholder, setHeroYearPlaceholder] = useState('MODEL YILI SEÇİNİZ');
  const [heroBrandPlaceholder, setHeroBrandPlaceholder] = useState('MARKA SEÇİNİZ');
  const [heroModelPlaceholder, setHeroModelPlaceholder] = useState('MODEL SEÇİNİZ');
  const [heroBtnBuy, setHeroBtnBuy] = useState('Aracınızı Bulun');
  const [heroBtnSell, setHeroBtnSell] = useState('Aracını Hemen Sat');
  const [heroBtnConsign, setHeroBtnConsign] = useState('Konsinye Bırak');
  const [heroBtnMoto, setHeroBtnMoto] = useState('Motosikletini Sat');
  const [whyKicker, setWhyKicker] = useState('Neden Biz?');
  const [whyHeading, setWhyHeading] = useState('Hızlı, Şeffaf ve Güvenli Satış Süreci');
  const [whyDesc, setWhyDesc] = useState('Aracınızı dakikalar içinde değerleyip, onay sonrası ödemeyi anında yapıyoruz.');
  const [whyCards, setWhyCards] = useState<{ title: string; desc: string }[]>([
    { title: 'Hızlı Değerleme', desc: 'Uzmanlarımız dakikalar içinde değerleme yapar.' },
    { title: 'Anında Nakit', desc: 'Satış onaylandıktan sonra ödemeniz anında hesabınızda.' },
    { title: 'Güvenli İşlem', desc: 'Tüm yasal süreçler ve evrak işleri tarafımızca yönetilir.' }
  ]);
  const [servicesKicker, setServicesKicker] = useState('Hizmetler');
  const [servicesHeading, setServicesHeading] = useState('Sizin İçin Kolaylaştırdık');
  const [servicesDesc, setServicesDesc] = useState('Satış, takas, finansman ve servis süreçlerini uçtan uca şeffaf ve hızlı hale getiriyoruz.');
  const [servicesCards, setServicesCards] = useState<{ title: string; desc: string }[]>([
    { title: 'Ekspertiz ve Değerleme', desc: '30+ kontrol noktasında inceleme, adil ve şeffaf teklif.' },
    { title: 'Takas Kolaylığı', desc: 'Mevcut aracınızı verin, yenisini seçin; farkı anında hesaplayın.' },
    { title: 'Finansman ve Sigorta', desc: 'İş ortaklarımızla uygun kredi ve sigorta çözümleri.' },
    { title: 'Servis ve Bakım', desc: 'Emirgan Motors A.Ş. güvencesiyle bakım, onarım ve arıza tespit hizmetleri.' },
    { title: '7/24 Destek', desc: 'Çağrı merkezi desteği, hızlı randevu ve bilgi paylaşımı.' },
    { title: 'Güvenli Evrak Süreçleri', desc: 'Noter ve teslimat işlemlerinde uçtan uca danışmanlık.' }
  ]);
  const [testiKicker, setTestiKicker] = useState('Müşterilerimiz Ne Diyor?');
  const [testiHeading, setTestiHeading] = useState('Gerçek Deneyimler');
  const [testiDesc, setTestiDesc] = useState('Hızlı teklif, güvenli ödeme ve sorunsuz teslimat süreçlerinde müşterilerimizin yorumları.');
  const [testiItems, setTestiItems] = useState<{ name: string; quote: string; city: string }[]>([
    { name: 'Mert Y.', quote: 'Teklif süreci çok hızlıydı, aynı gün ödememi aldım. Evraklarda da destek oldular.', city: 'İstanbul' },
    { name: 'Zeynep K.', quote: 'Takas işlemi beklediğimden kolay geçti. Değerleme şeffaf ve netti.', city: 'Ankara' },
    { name: 'Emre A.', quote: 'Servis randevusu ve bakım işlemleri için güvenle tercih ediyorum.', city: 'İzmir' }
  ]);
  const [blogKicker, setBlogKicker] = useState('Blog Yazıları');
  const [blogHeading, setBlogHeading] = useState('Güncel İçerikler');
  const [blogCta, setBlogCta] = useState('Tüm Yazılar');
  const [faqKicker, setFaqKicker] = useState('Sıkça Sorulan Sorular');
  const [faqHeading, setFaqHeading] = useState('Merak Ettikleriniz');
  const [faqItems, setFaqItems] = useState<{ q: string; a: string }[]>([
    { q: 'Teklif ne kadar sürede veriliyor?', a: 'Ekspertiz ve kontrol sonrası aynı gün içerisinde teklif sunuyoruz.' },
    { q: 'Ödeme süresi nedir?', a: 'Onay sonrası ödemeyi anında gerçekleştiriyoruz.' },
    { q: 'Takas işlemi yapılıyor mu?', a: 'Evet, mevcut aracınızı verip yeni aracınızı seçebilirsiniz.' },
    { q: 'Konsinye bırakabilir miyim?', a: 'Evet, satış sürecini biz yönetirken aracınızı listeliyoruz.' }
  ]);
  const [activeTab, setActiveTab] = useState<TabKey>('sell');
  const [forms, setForms] = useState<Record<TabKey, FormState>>({
    buy: { year: '', brand: '', model: '' },
    sell: { year: '', brand: '', model: '' },
    consign: { year: '', brand: '', model: '' },
    moto: { year: '', brand: '', model: '' }
  });

  const carYears = Array.from({ length: 21 }, (_, i) => String(2005 + i)); // 2005-2025
  const yearsForTab = activeTab === 'moto' ? motoYears : carYears;

  const currentForm = forms[activeTab];
  const availableBrands =
    activeTab === 'moto'
      ? currentForm.year
        ? getMotoBrandsByYear(currentForm.year)
        : []
      : currentForm.year
        ? getBrandsByYear(currentForm.year)
        : [];
  const availableModels =
    activeTab === 'moto'
      ? currentForm.brand && currentForm.year
        ? getMotoModelsByBrand(currentForm.brand)
        : []
      : currentForm.brand && currentForm.year
        ? getModelsByBrand(currentForm.brand)
        : [];
  const isFormComplete = Boolean(currentForm.year && currentForm.brand && currentForm.model);

  const handleYearChange = (tab: TabKey, value: string) => {
    setForms((prev) => ({
      ...prev,
      [tab]: { year: value, brand: '', model: '' }
    }));
  };

  const handleBrandChange = (tab: TabKey, value: string) => {
    setForms((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], brand: value, model: '' }
    }));
  };

  const handleModelChange = (tab: TabKey, value: string) => {
    setForms((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], model: value }
    }));
  };

  const handleFindCar = () => {
    const { year, brand, model } = currentForm;
    if (!year || !brand || !model) {
      alert('Lütfen yıl, marka ve model seçiniz.');
      return;
    }
    const search = new URLSearchParams({ year, brand, model }).toString();
    if (activeTab === 'buy') {
      router.push(`/araba-al?${search}`);
      return;
    }
    if (activeTab === 'moto') {
      router.push(`/motosiklet-sat?${search}`);
      return;
    }
    if (activeTab === 'consign') {
      router.push(`/konsinye-birak?${search}`);
      return;
    }
    router.push(`/arac-sat?${search}`);
  };

  useEffect(() => {
    // load dynamic content
    const fetchContent = async () => {
      const res = await fetch('/api/content?page=home');
      const data = await res.json();
      const list = data.items as { key: string; value: string }[] | undefined;
      if (list?.length) {
        const title = list.find((i) => i.key === 'hero.title')?.value;
        const desc = list.find((i) => i.key === 'hero.desc')?.value;
        if (title) setHeroTitle(title);
        if (desc) setHeroDesc(desc);
        const tabBuy = list.find((i) => i.key === 'hero.tab.buy')?.value;
        const tabSell = list.find((i) => i.key === 'hero.tab.sell')?.value;
        const tabConsign = list.find((i) => i.key === 'hero.tab.consign')?.value;
        const tabMoto = list.find((i) => i.key === 'hero.tab.moto')?.value;
        if (tabBuy) setHeroTabBuy(tabBuy);
        if (tabSell) setHeroTabSell(tabSell);
        if (tabConsign) setHeroTabConsign(tabConsign);
        if (tabMoto) setHeroTabMoto(tabMoto);
        const phYear = list.find((i) => i.key === 'hero.placeholder.year')?.value;
        const phBrand = list.find((i) => i.key === 'hero.placeholder.brand')?.value;
        const phModel = list.find((i) => i.key === 'hero.placeholder.model')?.value;
        if (phYear) setHeroYearPlaceholder(phYear);
        if (phBrand) setHeroBrandPlaceholder(phBrand);
        if (phModel) setHeroModelPlaceholder(phModel);
        const btnBuy = list.find((i) => i.key === 'hero.button.buy')?.value;
        const btnSell = list.find((i) => i.key === 'hero.button.sell')?.value;
        const btnConsign = list.find((i) => i.key === 'hero.button.consign')?.value;
        const btnMoto = list.find((i) => i.key === 'hero.button.moto')?.value;
        if (btnBuy) setHeroBtnBuy(btnBuy);
        if (btnSell) setHeroBtnSell(btnSell);
        if (btnConsign) setHeroBtnConsign(btnConsign);
        if (btnMoto) setHeroBtnMoto(btnMoto);
        const wk = list.find((i) => i.key === 'why.kicker')?.value;
        const wh = list.find((i) => i.key === 'why.heading')?.value;
        const wd = list.find((i) => i.key === 'why.desc')?.value;
        if (wk) setWhyKicker(wk);
        if (wh) setWhyHeading(wh);
        if (wd) setWhyDesc(wd);
        const wc = list.find((i) => i.key === 'why.cards')?.value;
        if (wc) {
          try {
            const parsed = JSON.parse(wc);
            if (Array.isArray(parsed)) setWhyCards(parsed);
          } catch {}
        }
        const sk = list.find((i) => i.key === 'services.kicker')?.value;
        const sh = list.find((i) => i.key === 'services.heading')?.value;
        const sd = list.find((i) => i.key === 'services.desc')?.value;
        if (sk) setServicesKicker(sk);
        if (sh) setServicesHeading(sh);
        if (sd) setServicesDesc(sd);
        const sc = list.find((i) => i.key === 'services.cards')?.value;
        if (sc) {
          try {
            const parsed = JSON.parse(sc);
            if (Array.isArray(parsed)) setServicesCards(parsed);
          } catch {}
        }
        const tk = list.find((i) => i.key === 'testi.kicker')?.value;
        const th = list.find((i) => i.key === 'testi.heading')?.value;
        const td = list.find((i) => i.key === 'testi.desc')?.value;
        if (tk) setTestiKicker(tk);
        if (th) setTestiHeading(th);
        if (td) setTestiDesc(td);
        const ti = list.find((i) => i.key === 'testi.items')?.value;
        if (ti) {
          try {
            const parsed = JSON.parse(ti);
            if (Array.isArray(parsed)) setTestiItems(parsed);
          } catch {}
        }
        const bk = list.find((i) => i.key === 'blog.kicker')?.value;
        const bh = list.find((i) => i.key === 'blog.heading')?.value;
        const bc = list.find((i) => i.key === 'blog.cta')?.value;
        if (bk) setBlogKicker(bk);
        if (bh) setBlogHeading(bh);
        if (bc) setBlogCta(bc);
        const fk = list.find((i) => i.key === 'faq.kicker')?.value;
        const fh = list.find((i) => i.key === 'faq.heading')?.value;
        if (fk) setFaqKicker(fk);
        if (fh) setFaqHeading(fh);
        const fi = list.find((i) => i.key === 'faq.items')?.value;
        if (fi) {
          try {
            const parsed = JSON.parse(fi);
            if (Array.isArray(parsed)) setFaqItems(parsed);
          } catch {}
        }
      }
    };
    fetchContent();

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 pt-16 sm:pt-20">
      <Header />

      {/* Hero */}
      <section
        className="relative isolate overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner1.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto grid min-h-[650px] max-w-6xl items-center px-4 py-16 sm:px-8 lg:px-12 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3" data-reveal>
            <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {heroTitle}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-100 sm:text-xl">
              {heroDesc}
            </p>
          </div>

          <div
            className="mt-8 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl lg:col-span-2 lg:mt-0 lg:justify-self-end"
            data-reveal
          >
            {/* Tabs */}
            <div className="grid grid-cols-4 text-center text-xs font-bold uppercase tracking-wide">
              <button
                type="button"
                onClick={() => setActiveTab('buy')}
                className={`px-3 py-3 transition ${
                  activeTab === 'buy'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-800 text-white/90 hover:bg-gray-700'
                }`}
              >
                {heroTabBuy}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sell')}
                className={`px-3 py-3 transition ${
                  activeTab === 'sell'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-800 text-white/90 hover:bg-gray-700'
                }`}
              >
                {heroTabSell}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('consign')}
                className={`px-3 py-3 transition ${
                  activeTab === 'consign'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-800 text-white/90 hover:bg-gray-700'
                }`}
              >
                {heroTabConsign}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('moto')}
                className={`px-3 py-3 transition ${
                  activeTab === 'moto'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-800 text-white/90 hover:bg-gray-700'
                }`}
              >
                {heroTabMoto}
              </button>
            </div>

            {/* Form content */}
            <div className="p-7">
              <div className="space-y-4">
                <div className="relative">
                  <select
                    value={currentForm.year}
                    onChange={(e) => handleYearChange(activeTab, e.target.value)}
                    className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-4 text-sm font-semibold uppercase tracking-wide text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">{heroYearPlaceholder}</option>
                    {yearsForTab.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                    📅
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={currentForm.brand}
                    onChange={(e) => handleBrandChange(activeTab, e.target.value)}
                    disabled={!currentForm.year}
                    className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-4 text-sm font-semibold uppercase tracking-wide text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">{heroBrandPlaceholder}</option>
                    {availableBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                    🏷️
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={currentForm.model}
                    onChange={(e) => handleModelChange(activeTab, e.target.value)}
                    disabled={!currentForm.brand}
                    className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-4 text-sm font-semibold uppercase tracking-wide text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">{heroModelPlaceholder}</option>
                    {availableModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                    🚗
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleFindCar}
                  disabled={!isFormComplete}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-amber-600 px-4 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {activeTab === 'buy'
                    ? heroBtnBuy
                    : activeTab === 'moto'
                      ? heroBtnMoto
                      : activeTab === 'consign'
                        ? heroBtnConsign
                        : heroBtnSell}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* En Yeni Fırsat Arabalar */}
      <LatestListingsStrip />

      {/* Özellikler */}
      <section className="bg-white" data-reveal>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:px-12">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {whyKicker}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {whyHeading}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {whyDesc}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((card, idx) => (
              <div key={card.title + idx} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmetler / Kartlar */}
      <section className="bg-slate-50" data-reveal>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:px-12">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{servicesKicker}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{servicesHeading}</h2>
            <p className="mt-3 text-base text-slate-600">
              {servicesDesc}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesCards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  ★
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Müşteri Yorumları */}
      <section className="bg-white" data-reveal>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:px-12">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{testiKicker}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{testiHeading}</h2>
            <p className="mt-3 text-base text-slate-600">
              {testiDesc}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testiItems.map((item) => (
              <div
                key={item.name}
                className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
              >
                <div className="text-lg font-semibold text-slate-900">{item.name}</div>
                <p className="text-sm text-slate-700 leading-relaxed">“{item.quote}”</p>
                <span className="text-xs font-semibold text-primary/80">{item.city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Yazıları */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{blogKicker}</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{blogHeading}</h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            >
              {blogCta}
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Doğru Lastik Seçimi ile Yakıt Tasarrufu',
                desc: 'Lastik seçimi yakıt tüketimini nasıl etkiler? Pratik ipuçları…',
                slug: '/blog/dogru-lastik-secimi-ile-yakit-tuketimini-azaltma'
              },
              {
                title: 'En İyi 125 CC Motosiklet Modelleri',
                desc: '2024’te öne çıkan 125 cc motosiklet önerileri.',
                slug: '/blog/en-iyi-125cc-motosiklet-modelleri'
              },
              {
                title: 'Araç Değer Kaybını Önlemenin 7 Yolu',
                desc: 'Satış değeri kaybını en aza indirmenin yolları.',
                slug: '/blog/arac-deger-kaybini-onlemenin-7-yolu'
              }
            ].map((item) => (
              <Link
                key={item.slug}
                href={item.slug}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow"
              >
                <div className="mb-3 h-28 w-full rounded-lg bg-slate-100" />
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                <span className="mt-3 text-sm font-semibold text-primary">Devamını oku →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SSS mini */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:px-12">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{faqKicker}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{faqHeading}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">{item.q}</p>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        [data-reveal].reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </main>
  );
}


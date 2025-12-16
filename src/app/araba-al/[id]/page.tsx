"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type Listing = {
  id: number;
  brand: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  city: string;
  bodyType: string;
  color: string;
  tramerHasRecord: boolean;
  tramerAmount: number | null;
  heavyDamage: boolean;
  images: { url: string }[];
};

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);
  const [data, setData] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/listings/${id}`);
      if (!res.ok) {
        router.push('/araba-al');
        return;
      }
      const { listing } = await res.json();
      setData(listing);
      setLoading(false);
    };
    if (id) load();
  }, [id, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 pt-16">
        <Header />
        <div className="mx-auto max-w-6xl px-4 py-8">Yükleniyor...</div>
        <Footer />
      </main>
    );
  }

  if (!data) return null;

  return (
    <main className="min-h-screen bg-slate-50 pt-16">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div>
          <p className="text-sm text-slate-500 cursor-pointer" onClick={() => router.push('/araba-al')}>
            ← İlanlara dön
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            {data.brand} {data.model} ({data.year})
          </h1>
          <p className="text-xl font-semibold text-primary mt-2">{data.price.toLocaleString('tr-TR')} ₺</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
              <img
                src={data.images?.[0]?.url ?? '/images/banner.jpg'}
                alt={`${data.brand} ${data.model}`}
                className="h-full w-full object-cover"
              />
            </div>
            {data.images?.length > 1 ? (
              <div className="grid grid-cols-4 gap-2">
                {data.images.slice(1).map((img, i) => (
                  <img key={i} src={img.url} alt="" className="h-20 w-full rounded-lg object-cover border border-slate-200" />
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Özellikler</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-700">
              <div>Şehir</div>
              <div className="font-semibold text-right">{data.city}</div>
              <div>Yakıt</div>
              <div className="font-semibold text-right">{data.fuelType}</div>
              <div>Vites</div>
              <div className="font-semibold text-right">{data.transmission}</div>
              <div>Kilometre</div>
              <div className="font-semibold text-right">{data.mileage.toLocaleString('tr-TR')} km</div>
              <div>Kasa Tipi</div>
              <div className="font-semibold text-right">{data.bodyType}</div>
              <div>Renk</div>
              <div className="font-semibold text-right">{data.color}</div>
              <div>Tramer</div>
              <div className="font-semibold text-right">
                {data.tramerHasRecord ? `Var${data.tramerAmount ? ` (${data.tramerAmount} ₺)` : ''}` : 'Yok'}
              </div>
              <div>Ağır Hasar</div>
              <div className="font-semibold text-right">{data.heavyDamage ? 'Var' : 'Yok'}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}


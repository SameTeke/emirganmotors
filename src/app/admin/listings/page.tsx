"use client";

import { useEffect, useState } from 'react';
import { Listing, ListingStatus } from '@prisma/client';

type ListingWithImages = Listing & { images: { id: number; url: string }[] };

const brandOptions = ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Volkswagen', 'Volvo', 'Renault', 'Peugeot', 'Hyundai', 'Kia'];
const modelOptions: Record<string, string[]> = {
  BMW: ['3 Serisi', '5 Serisi', 'X3', 'X5'],
  Audi: ['A3', 'A4', 'A6', 'Q5'],
  Mercedes: ['C200', 'E200', 'GLC', 'GLA'],
  Toyota: ['Corolla', 'Camry', 'CHR', 'RAV4'],
  Volkswagen: ['Passat', 'Golf', 'Tiguan'],
  Volvo: ['XC40', 'XC60', 'S60'],
  Renault: ['Clio', 'Megane', 'Taliant'],
  Peugeot: ['208', '308', '3008'],
  Hyundai: ['i20', 'i30', 'Tucson'],
  Kia: ['Rio', 'Cerato', 'Sportage']
};

const yearOptions = Array.from({ length: 26 }, (_, i) => String(2025 - i));
const cityOptions = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Kocaeli', 'Adana', 'Konya'];
const fuelOptions = ['Benzin', 'Dizel', 'Hybrid', 'Elektrik', 'LPG'];
const transmissionOptions = ['Manuel', 'Otomatik', 'Yarı Otomatik', 'CVT'];
const bodyOptions = ['Sedan', 'Hatchback', 'SUV', 'Coupé', 'Station Wagon', 'MPV', 'Pickup'];
const colorOptions = ['Beyaz', 'Siyah', 'Gri', 'Kırmızı', 'Mavi', 'Yeşil', 'Turuncu', 'Lacivert'];

const emptyForm = {
  id: 0,
  brand: '',
  model: '',
  price: '',
  year: '',
  city: '',
  fuelType: '',
  transmission: '',
  mileage: '',
  bodyType: '',
  color: '',
  tramerHasRecord: false,
  tramerAmount: '',
  heavyDamage: false,
  status: 'draft' as ListingStatus,
  imageFiles: [] as File[],
  existingImages: [] as { id: number; url: string }[]
};

export default function AdminListingsPage() {
  const [listings, setListings] = useState<ListingWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/listings');
    const data = await res.json();
    setListings(data.listings || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item: ListingWithImages) => {
    setForm({
      ...emptyForm,
      id: item.id,
      brand: item.brand,
      model: item.model,
      price: String(item.price),
      year: String(item.year),
      city: item.city,
      fuelType: item.fuelType,
      transmission: item.transmission,
      mileage: String(item.mileage),
      bodyType: item.bodyType,
      color: item.color,
      tramerHasRecord: item.tramerHasRecord,
      tramerAmount: item.tramerAmount ? String(item.tramerAmount) : '',
      heavyDamage: item.heavyDamage,
      status: item.status,
      existingImages: item.images
    });
  };

  const resetForm = () => setForm(emptyForm);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const payload: any = {
      brand: form.brand,
      model: form.model,
      price: Number(form.price),
      year: Number(form.year),
      city: form.city,
      fuelType: form.fuelType,
      transmission: form.transmission,
      mileage: Number(form.mileage),
      bodyType: form.bodyType,
      color: form.color,
      tramerHasRecord: form.tramerHasRecord,
      tramerAmount: form.tramerAmount ? Number(form.tramerAmount) : null,
      heavyDamage: form.heavyDamage,
      status: form.status
    };

    if (!payload.brand || !payload.model || Number.isNaN(payload.price)) {
      setError('Marka, model ve fiyat zorunlu');
      setSaving(false);
      return;
    }

    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `/api/admin/listings/${form.id}` : '/api/admin/listings';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Kaydedilemedi');
      setSaving(false);
      return;
    }

    const { id } = await res.json();

    // upload images if any
    if (form.imageFiles.length) {
      const fd = new FormData();
      form.imageFiles.forEach((f) => fd.append('files', f));
      await fetch(`/api/admin/listings/${form.id || id}/images`, {
        method: 'POST',
        body: fd
      });
    }

    resetForm();
    await load();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Silinsin mi?')) return;
    await fetch(`/api/admin/listings/${id}`, { method: 'DELETE' });
    await load();
    if (form.id === id) resetForm();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-900">İlanlar</h2>
          <button
            type="button"
            onClick={resetForm}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Yeni
          </button>
        </div>
        {loading ? (
          <p className="text-sm text-slate-600">Yükleniyor...</p>
        ) : (
          <div className="space-y-2">
            {listings.map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {l.brand} {l.model} ({l.year})
                  </div>
                  <div className="text-xs text-slate-600">
                    {l.city} · {l.fuelType} · {l.transmission} · {l.mileage.toLocaleString('tr-TR')} km
                  </div>
                  <div className="text-xs font-semibold text-primary mt-1">{l.price.toLocaleString('tr-TR')} ₺ — {l.status}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(l)}
                    className="rounded border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700"
                  >
                    Düzenle
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(l.id)}
                    className="rounded border border-red-200 px-2 py-1 text-xs font-semibold text-red-600"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">{form.id ? 'İlanı Düzenle' : 'Yeni İlan'}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Marka</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value, model: '' })}
            >
              <option value="">Seçiniz</option>
              {brandOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Model</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              disabled={!form.brand}
            >
              <option value="">Seçiniz</option>
              {(modelOptions[form.brand] || []).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Fiyat</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              type="number"
              placeholder="Fiyat"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Yıl</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            >
              <option value="">Seçiniz</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Şehir</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            >
              <option value="">Seçiniz</option>
              {cityOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Yakıt</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.fuelType}
              onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
            >
              <option value="">Seçiniz</option>
              {fuelOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Vites</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.transmission}
              onChange={(e) => setForm({ ...form, transmission: e.target.value })}
            >
              <option value="">Seçiniz</option>
              {transmissionOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Kilometre</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              type="number"
              placeholder="Kilometre"
              value={form.mileage}
              onChange={(e) => setForm({ ...form, mileage: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Kasa Tipi</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.bodyType}
              onChange={(e) => setForm({ ...form, bodyType: e.target.value })}
            >
              <option value="">Seçiniz</option>
              {bodyOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Renk</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
            >
              <option value="">Seçiniz</option>
              {colorOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            type="number"
            placeholder="Tramer Tutarı"
            value={form.tramerAmount}
            onChange={(e) => setForm({ ...form, tramerAmount: e.target.value })}
            style={{ display: form.tramerHasRecord ? 'block' : 'none' }}
          />
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.tramerHasRecord}
                onChange={(e) => setForm({ ...form, tramerHasRecord: e.target.checked })}
              />
              Tramer Kaydı Var
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.heavyDamage}
                onChange={(e) => setForm({ ...form, heavyDamage: e.target.checked })}
              />
              Ağır Hasar Var
            </label>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Durum</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as ListingStatus })}
            >
              <option value="draft">Taslak</option>
              <option value="published">Yayında</option>
            </select>
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Görseller</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setForm({ ...form, imageFiles: Array.from(e.target.files || []) })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {form.existingImages.length ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.existingImages.map((img) => (
                  <img key={img.id} src={img.url} alt="" className="h-16 w-20 rounded border object-cover" />
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:shadow transition"
            disabled={saving}
          >
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          {form.id ? (
            <button type="button" onClick={resetForm} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
              İptal
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}



"use client";

import { useEffect, useState } from 'react';
import { ContentEntry, ContentType } from '@prisma/client';

const empty = { page: 'home', key: '', type: 'text' as ContentType, value: '' };

export default function ContentPage() {
  const [items, setItems] = useState<ContentEntry[]>([]);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/content');
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    setMsg(null);
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setMsg('Kaydedildi');
      setForm(empty);
      load();
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.error || 'Hata');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Content</h1>
        <p className="text-sm text-slate-600">Metin ve görsel yolları</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Sayfa (örn: home)"
            value={form.page}
            onChange={(e) => setForm({ ...form, page: e.target.value })}
          />
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Key (örn: hero.title)"
            value={form.key}
            onChange={(e) => setForm({ ...form, key: e.target.value })}
          />
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as ContentType })}
          >
            <option value="text">text</option>
            <option value="image">image</option>
            <option value="json">json</option>
          </select>
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Değer"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
          />
        </div>
        <button
          type="button"
          onClick={save}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:shadow transition"
        >
          Kaydet
        </button>
        {msg ? <p className="text-sm text-slate-700">{msg}</p> : null}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Kayıtlar</h3>
        {loading ? (
          <p className="text-sm text-slate-600">Yükleniyor...</p>
        ) : (
          <div className="divide-y divide-slate-200">
            {items.map((item) => (
              <div key={item.id} className="py-2 flex justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {item.page} / {item.key} ({item.type})
                  </div>
                  <div className="text-xs text-slate-600 break-all">{item.value}</div>
                </div>
                <button
                  type="button"
                  className="text-xs font-semibold text-primary"
                  onClick={() => setForm({ page: item.page, key: item.key, type: item.type, value: item.value })}
                >
                  Düzenle
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


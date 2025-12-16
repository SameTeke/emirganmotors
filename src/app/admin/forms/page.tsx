"use client";

import { useEffect, useMemo, useState } from 'react';
import { SubmissionStatus } from '@prisma/client';

type Submission = {
  id: number;
  formType: string;
  phone: string;
  data: Record<string, any>;
  status: SubmissionStatus;
  adminNote?: string | null;
  createdAt: string;
};

export default function FormsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'arac-sat' | 'motosiklet-sat' | 'konsinye'>('all');

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/forms');
    const data = await res.json();
    setItems(data.submissions || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((i) => i.formType === filter)),
    [items, filter]
  );

  const updateStatus = async (id: number, status: SubmissionStatus) => {
    await fetch('/api/admin/forms', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, adminNote: selected === id ? note : undefined })
    });
    setNote('');
    setSelected(null);
    load();
  };

  const deleteSubmission = async (id: number) => {
    if (!confirm('Bu başvuruyu silmek istiyor musunuz?')) return;
    await fetch('/api/admin/forms', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    load();
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Form Başvuruları</h1>
        <p className="text-sm text-slate-600">Araç Sat, Konsinye, Motosiklet formları</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'Tümü' },
          { key: 'arac-sat', label: 'Araç Sat' },
          { key: 'motosiklet-sat', label: 'Motosiklet Sat' },
          { key: 'konsinye', label: 'Konsinye' }
        ].map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={() => setFilter(b.key as any)}
            className={`rounded-lg border px-3 py-1 text-xs font-semibold ${
              filter === b.key ? 'border-primary text-primary bg-primary/10' : 'border-slate-200 text-slate-700'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {loading ? (
          <p className="text-sm text-slate-600">Yükleniyor...</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {item.formType === 'konsinye'
                        ? 'Konsinye Başvuru'
                        : item.formType === 'motosiklet-sat'
                          ? 'Motosiklet Sat'
                          : 'Araç Sat'}{' '}
                      · {item.phone}
                    </div>
                    <div className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleString('tr-TR')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100">{item.status}</span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-primary"
                      onClick={() => {
                        setSelected(item.id);
                        setNote(item.adminNote || '');
                      }}
                    >
                      Not
                    </button>
                    <button
                      type="button"
                      className="text-xs font-semibold text-emerald-700"
                      onClick={() => updateStatus(item.id, 'processed')}
                    >
                      İşlendi
                    </button>
                    <button
                      type="button"
                      className="text-xs font-semibold text-red-600"
                      onClick={() => deleteSubmission(item.id)}
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800">
                  {'step1' in item.data ? (
                    <>
                      <div><strong>Ad Soyad:</strong> {item.data.step5?.fullName}</div>
                      <div><strong>Telefon:</strong> {item.phone}</div>
                      <div><strong>Plaka:</strong> {item.data.step4?.plate}</div>
                      <div><strong>İstenen Fiyat:</strong> {item.data.step4?.askPrice}</div>
                      <div><strong>Min Fiyat:</strong> {item.data.step4?.minPrice}</div>
                      <div><strong>Süre (gün):</strong> {item.data.step4?.consignPeriod}</div>
                      <div><strong>Renk:</strong> {item.data.step4?.color}</div>
                      <div><strong>Şehir:</strong> {item.data.step5?.city}</div>
                      {item.data.step4?.imageUrls?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {item.data.step4.imageUrls.map((url: string) => (
                            <img key={url} src={url} alt="" className="h-16 w-20 rounded border object-cover" />
                          ))}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <div><strong>Ad Soyad:</strong> {item.data.fullName}</div>
                      <div><strong>Telefon:</strong> {item.phone}</div>
                      <div><strong>Şehir:</strong> {item.data.city}</div>
                      {item.data.imageUrls?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {item.data.imageUrls.map((url: string) => (
                            <img key={url} src={url} alt="" className="h-16 w-20 rounded border object-cover" />
                          ))}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
                {selected === item.id ? (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Admin notu"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <button
                      type="button"
                      className="text-xs font-semibold text-primary"
                      onClick={() => updateStatus(item.id, item.status)}
                    >
                      Kaydet
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


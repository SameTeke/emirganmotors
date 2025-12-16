"use client";

import { useEffect, useState } from 'react';

type MediaItem = { url: string };

export default function MediaPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploaded, setUploaded] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const upload = async () => {
    if (!files.length) return;
    setLoading(true);
    setMsg(null);
    const fd = new FormData();
    files.forEach((f) => fd.append('file', f));
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (res.ok) {
      setUploaded((prev) => [...data.files, ...prev]);
      setMsg('Yüklendi');
    } else {
      setMsg(data.error || 'Yükleme başarısız');
    }
    setLoading(false);
  };

  useEffect(() => {
    // Not storing media list; newly uploadedları gösteriyoruz
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Media</h1>
        <p className="text-sm text-slate-600">Görseller /uploads içine kaydedilir</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
        <button
          type="button"
          onClick={upload}
          disabled={loading}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:shadow transition"
        >
          {loading ? 'Yükleniyor...' : 'Yükle'}
        </button>
        {msg ? <p className="text-sm text-slate-700">{msg}</p> : null}
      </div>
      {uploaded.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {uploaded.map((u, i) => (
            <div key={`${u.url}-${i}`} className="rounded border border-slate-200 overflow-hidden">
              <img src={u.url} alt="" className="w-full h-32 object-cover" />
              <div className="px-2 py-1 text-xs break-all">{u.url}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}


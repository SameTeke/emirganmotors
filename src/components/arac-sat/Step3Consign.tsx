import { useMemo } from 'react';
import { Step3Errors, Step3State } from './Step3';

type Props = {
  value: Step3State;
  errors: Step3Errors;
  onChange: (part: string, status: number | string | boolean) => void;
  onPrev: () => void;
  onNext: () => void;
};

const parts = [
  { name: 'Sol Ön Çamurluk', id: 'B0101' },
  { name: 'Sağ Ön Çamurluk', id: 'B0201' },
  { name: 'Sol Ön Kapı', id: 'B0301' },
  { name: 'Sağ Ön Kapı', id: 'B0401' },
  { name: 'Sol Arka Kapı', id: 'B0501' },
  { name: 'Sağ Arka Kapı', id: 'B0601' },
  { name: 'Sol Arka Çamurluk', id: 'B0701' },
  { name: 'Sağ Arka Çamurluk', id: 'B0801' },
  { name: 'Motor Kaputu', id: 'B0901' },
  { name: 'Bagaj', id: 'B1001' },
  { name: 'Tavan', id: 'B1101' },
  { name: 'Ön Tampon', id: 'B1201' },
  { name: 'Arka Tampon', id: 'B1301' }
];

const statusOptions = [
  { value: 1, label: 'Orijinal' },
  { value: 2, label: 'Lokal Boyalı' },
  { value: 3, label: 'Boyalı' },
  { value: 4, label: 'Değişen' }
];

const colorMap: Record<number, string> = {
  1: '#f0f0f0',
  2: '#ffd94d',
  3: '#007bff',
  4: '#ff4d4d'
};

const extraFields = [
  { key: 'askPrice', label: 'İstenen Satış Fiyatı (TL)', type: 'number', placeholder: 'Örn: 1.250.000' },
  { key: 'minPrice', label: 'Minimum Kabul Edilebilir Fiyat (TL)', type: 'number', placeholder: 'Örn: 1.150.000' },
  { key: 'consignPeriod', label: 'Konsinye Bırakma Süresi', type: 'text', placeholder: 'Örn: 30 gün' },
  { key: 'plate', label: 'Plaka Bilgisi', type: 'text', placeholder: 'Örn: 34 ABC 123' }
];

function CarSvg({ statuses }: { statuses: Step3State }) {
  const fillFor = (id: string) => {
    const match = parts.find((p) => p.id === id);
    const status = match ? statuses[match.name] : undefined;
    return status ? colorMap[status as number] ?? '#e5e7eb' : '#e5e7eb';
  };

  const overlays = [
    { id: 'B0101', x: 52, y: 132, width: 40, height: 88, rx: 8 },
    { id: 'B0201', x: 237, y: 132, width: 40, height: 88, rx: 8 },
    { id: 'B0301', x: 95, y: 150, width: 55, height: 92, rx: 8 },
    { id: 'B0401', x: 179, y: 150, width: 55, height: 92, rx: 8 },
    { id: 'B0501', x: 95, y: 214, width: 55, height: 88, rx: 8 },
    { id: 'B0601', x: 179, y: 214, width: 55, height: 88, rx: 8 },
    { id: 'B0701', x: 52, y: 222, width: 40, height: 90, rx: 8 },
    { id: 'B0801', x: 237, y: 222, width: 40, height: 90, rx: 8 },
    { id: 'B0901', x: 114, y: 242, width: 102, height: 42, rx: 10 },
    { id: 'B1001', x: 114, y: 78, width: 102, height: 42, rx: 10 },
    { id: 'B1101', x: 98, y: 118, width: 134, height: 120, rx: 12 },
    { id: 'B1201', x: 124, y: 292, width: 88, height: 26, rx: 8 },
    { id: 'B1301', x: 124, y: 20, width: 88, height: 24, rx: 8 }
  ];

  return (
    <svg viewBox="0 0 329 340" className="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg" aria-label="Kaporta görseli">
      <image href="/images/kaporta.svg" x="0" y="0" width="329" height="340" />
      {overlays.map((o) => (
        <rect
          key={o.id}
          id={o.id}
          x={o.x}
          y={o.y}
          width={o.width}
          height={o.height}
          rx={o.rx}
          fill={fillFor(o.id)}
          opacity="0.58"
        />
      ))}
    </svg>
  );
}

export default function Step3Consign({ value, errors, onChange, onPrev, onNext }: Props) {
  const svgStatuses = useMemo(() => value, [value]);
  const bulkSet = (status: number) => {
    parts.forEach((p) => onChange(p.name, status));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kaporta Durumu</h2>
          <p className="mt-1 text-sm text-slate-600">
            Tramer kaydında bulunan veya bulunmayan tüm değişen, boyalı parça sayısını belirtmeniz araç değerlemesinde önemlidir.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:p-5">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">Toplu Seçim:</span>
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => bulkSet(opt.value)}
                className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary/60 hover:bg-primary/5"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-3">
            {parts.map((part) => (
              <div
                key={part.name}
                className="grid items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 md:grid-cols-[1.1fr_2.1fr_1fr]"
              >
                <div className="text-sm font-semibold text-slate-800">{part.name}</div>
                <div className="flex flex-nowrap gap-2 overflow-x-auto">
                  {statusOptions.map((opt) => {
                    const active = value[part.name] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange(part.name, opt.value)}
                        className={`inline-flex min-w-[76px] items-center justify-center rounded-md border px-3 py-2 text-xs font-semibold transition whitespace-nowrap ${
                          active
                            ? 'border-primary bg-primary text-white shadow-sm'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-primary/60 hover:bg-primary/5'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
                  {[
                    { key: `${part.name}-scratch`, label: 'Çizik/Göçük' },
                    { key: `${part.name}-damage`, label: 'Hasarlı' }
                  ].map((chk) => (
                    <label key={chk.key} className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Boolean(value[chk.key])}
                        onChange={(e) => onChange(chk.key, e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/40"
                      />
                      {chk.label}
                    </label>
                  ))}
                </div>
                {errors[part.name] ? (
                  <div className="md:col-start-2 text-xs font-medium text-red-600">{errors[part.name]}</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
          <CarSvg statuses={svgStatuses} />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
        <h3 className="text-lg font-semibold text-slate-900">Şasi Bilgisi</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {['Sol Ön Şasi', 'Sağ Ön Şasi', 'Sol Arka Şasi', 'Sağ Arka Şasi'].map((label) => {
            const key = `shasi-${label}`;
            const current = value[key];
            return (
              <div key={label} className="space-y-2">
                <div className="text-sm font-semibold text-slate-800">{label}</div>
                <div className="flex gap-4">
                  {[
                    { val: 'yok', text: 'İşlem Yok' },
                    { val: 'var', text: 'İşlem Var' }
                  ].map((opt) => (
                    <label key={opt.val} className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        name={key}
                        value={opt.val}
                        checked={current === opt.val}
                        onChange={(e) => onChange(key, e.target.value)}
                        className="h-4 w-4 text-primary focus:ring-primary/40"
                      />
                      {opt.text}
                    </label>
                  ))}
                </div>
                {errors[key] ? <p className="text-xs font-medium text-red-600">{errors[key]}</p> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
        <h3 className="text-lg font-semibold text-slate-900">Konsinye Tercihleri</h3>
        <p className="mt-1 text-sm text-slate-600">
          İstenen satış fiyatı, minimum kabul edeceğiniz fiyat ve konsinye süresi bilgilerini ekleyin.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {extraFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">{field.label}</label>
              <input
                type={field.type}
                value={value[field.key] as string}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors[field.key] ? <p className="text-xs font-medium text-red-600">{errors[field.key]}</p> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          ← Önceki
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Sonraki (Fotoğraflar) →
        </button>
      </div>
    </div>
  );
}


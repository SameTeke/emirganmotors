const colorOptions = [
  { label: 'Beyaz', value: 'beyaz', color: '#ffffff', border: '#d1d5db' },
  { label: 'Siyah', value: 'siyah', color: '#111827', border: '#111827' },
  { label: 'Gri', value: 'gri', color: '#9ca3af', border: '#6b7280' },
  { label: 'Gümüş', value: 'gumus', color: '#cbd5e1', border: '#94a3b8' },
  { label: 'Kahverengi', value: 'kahverengi', color: '#8b5a2b', border: '#7c3f1d' },
  { label: 'Bej', value: 'bej', color: '#f5f5dc', border: '#d6d3d1' },
  { label: 'Kırmızı', value: 'kirmizi', color: '#ef4444', border: '#b91c1c' },
  { label: 'Mavi', value: 'mavi', color: '#2563eb', border: '#1d4ed8' },
  { label: 'Şampanya', value: 'sampanya', color: '#f4e0c6', border: '#e2c599' },
  { label: 'Sarı', value: 'sari', color: '#facc15', border: '#d97706' },
  { label: 'Yeşil', value: 'yesil', color: '#22c55e', border: '#16a34a' },
  { label: 'Turuncu', value: 'turuncu', color: '#fb923c', border: '#ea580c' },
  { label: 'Lacivert', value: 'lacivert', color: '#1e3a8a', border: '#1e3a8a' },
  { label: 'Turkuaz', value: 'turkuaz', color: '#22d3ee', border: '#0891b2' },
  { label: 'Zeytin', value: 'zeytin', color: '#708238', border: '#556b2f' },
  { label: 'Diğer', value: 'diger', color: '#e5e7eb', border: '#9ca3af' }
];

export type Step4State = {
  color: string;
  equipment: string;
  isListed: string;
  listingUrl: string;
  roofPanoramic: string;
  roofGlass: string;
  roofSunroof: string;
  extra: string;
  askPrice?: string;
  minPrice?: string;
  consignPeriod?: string;
  plate?: string;
};

export type Step4Errors = Partial<Record<keyof Step4State, string>>;

type Props = {
  value: Step4State;
  errors: Step4Errors;
  onChange: (field: keyof Step4State, value: string) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Step4({ value, errors, onChange, onPrev, onNext }: Props) {
  const handleRoofChange = (field: keyof Step4State, val: string) => {
    const updates: Partial<Step4State> = { [field]: val };
    // Cam tavan ve sunroof aynı anda olmayacak
    if (field === 'roofGlass' && val === 'var') updates.roofSunroof = 'yok';
    if (field === 'roofSunroof' && val === 'var') updates.roofGlass = 'yok';
    Object.entries(updates).forEach(([k, v]) => onChange(k as keyof Step4State, v as string));
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Araç Rengi *</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {colorOptions.map((c) => {
              const active = value.color === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => onChange('color', c.value)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    active
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-slate-200 hover:border-primary/60'
                  }`}
                >
                  <span
                    className="inline-flex h-4 w-4 rounded-full border"
                    style={{ backgroundColor: c.color, borderColor: c.border }}
                  />
                  {c.label}
                </button>
              );
            })}
          </div>
          {errors.color ? <p className="mt-2 text-xs font-medium text-red-600">{errors.color}</p> : null}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Tavan Özellikleri</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-800">
            {[
              { key: 'roofPanoramic', label: 'Panoramik Cam Tavan' },
              { key: 'roofGlass', label: 'Cam Tavan' },
              { key: 'roofSunroof', label: 'Sunroof' }
            ].map((item) => (
              <div key={item.key} className="flex items-center gap-3">
                <span className="w-40">{item.label}</span>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name={item.key}
                      value="var"
                      checked={value[item.key as keyof Step4State] === 'var'}
                      onChange={(e) => handleRoofChange(item.key as keyof Step4State, e.target.value)}
                      className="h-4 w-4 text-primary focus:ring-primary/40"
                    />
                    Var
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name={item.key}
                      value="yok"
                      checked={value[item.key as keyof Step4State] === 'yok'}
                      onChange={(e) => handleRoofChange(item.key as keyof Step4State, e.target.value)}
                      className="h-4 w-4 text-primary focus:ring-primary/40"
                    />
                    Yok
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Araç Donanımları</h3>
          <p className="mt-1 text-sm text-slate-600">Opsiyonel donanımları veya ek notları yazabilirsiniz.</p>
          <textarea
            value={value.equipment}
            onChange={(e) => onChange('equipment', e.target.value)}
            className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            rows={3}
            placeholder="Örn: Sunroof, deri koltuk, adaptif hız sabitleyici..."
          />
          {errors.equipment ? <p className="mt-2 text-xs font-medium text-red-600">{errors.equipment}</p> : null}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">İlan Durumu</h3>
            <div className="mt-3 flex items-center gap-4">
              <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="radio"
                  name="isListed"
                  value="var"
                  checked={value.isListed === 'var'}
                  onChange={(e) => onChange('isListed', e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary/40"
                />
                İlanda
              </label>
              <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="radio"
                  name="isListed"
                  value="yok"
                  checked={value.isListed === 'yok'}
                  onChange={(e) => onChange('isListed', e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary/40"
                />
                İlanda Değil
              </label>
            </div>
            {errors.isListed ? <p className="mt-1 text-xs font-medium text-red-600">{errors.isListed}</p> : null}

            {value.isListed === 'var' && (
              <>
                <input
                  type="text"
                  value={value.listingUrl}
                  onChange={(e) => onChange('listingUrl', e.target.value)}
                  placeholder="İlan linki (varsa)"
                  className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.listingUrl ? <p className="mt-1 text-xs font-medium text-red-600">{errors.listingUrl}</p> : null}
              </>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Ek Not</h3>
            <textarea
              value={value.extra}
              onChange={(e) => onChange('extra', e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              rows={3}
              placeholder="Eklemek istediğiniz diğer bilgiler..."
            />
            {errors.extra ? <p className="mt-1 text-xs font-medium text-red-600">{errors.extra}</p> : null}
          </div>
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
          Sonraki →
        </button>
      </div>
    </div>
  );
}


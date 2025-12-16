import { ChangeEvent } from 'react';

export type Step2State = {
  kilometre: string;
  tramer: 'var' | 'yok' | '';
  tramerValue: string;
  heavyDamage: 'evet' | 'hayir' | '';
};

export type Step2Errors = Partial<Record<keyof Step2State, string>>;

type Props = {
  value: Step2State;
  errors: Step2Errors;
  onChange: (field: keyof Step2State, value: string) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Step2({ value, errors, onChange, onPrev, onNext }: Props) {
  const handleInput =
    (field: keyof Step2State) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange(field, e.target.value);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">Kilometre</label>
          <input
            type="number"
            value={value.kilometre}
            onChange={handleInput('kilometre')}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Örn: 85000"
            min={0}
          />
          {errors.kilometre ? <p className="text-xs font-medium text-red-600">{errors.kilometre}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">Tramer Kaydı</label>
          <div className="flex gap-4">
            {[
              { value: 'var' as const, label: 'Var' },
              { value: 'yok' as const, label: 'Yok' }
            ].map((opt) => (
              <label key={opt.value} className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="radio"
                  name="tramer"
                  value={opt.value}
                  checked={value.tramer === opt.value}
                  onChange={handleInput('tramer')}
                  className="h-4 w-4 text-primary focus:ring-primary/40"
                />
                {opt.label}
              </label>
            ))}
          </div>
          {errors.tramer ? <p className="text-xs font-medium text-red-600">{errors.tramer}</p> : null}
        </div>
      </div>

      {value.tramer === 'var' && (
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">Tramer Değeri</label>
          <input
            type="number"
            value={value.tramerValue}
            onChange={handleInput('tramerValue')}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Örn: 25000"
            min={0}
          />
          {errors.tramerValue ? <p className="text-xs font-medium text-red-600">{errors.tramerValue}</p> : null}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800">Ağır Hasar Kayıtlı</label>
        <div className="flex gap-4">
          {[
            { value: 'evet' as const, label: 'Evet' },
            { value: 'hayir' as const, label: 'Hayır' }
          ].map((opt) => (
            <label key={opt.value} className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="radio"
                name="heavyDamage"
                value={opt.value}
                checked={value.heavyDamage === opt.value}
                onChange={handleInput('heavyDamage')}
                className="h-4 w-4 text-primary focus:ring-primary/40"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.heavyDamage ? <p className="text-xs font-medium text-red-600">{errors.heavyDamage}</p> : null}
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


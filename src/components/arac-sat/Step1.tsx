import { ChangeEvent } from 'react';

export type Step1State = {
  year: string;
  brand: string;
  model: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  kilometre: string;
  tramer: 'var' | 'yok' | '';
  tramerValue: string;
  heavyDamage: 'evet' | 'hayir' | '';
};

export type Step1Errors = Partial<Record<keyof Step1State, string>>;

type Props = {
  value: Step1State;
  errors: Step1Errors;
  years: string[];
  brands: string[];
  models: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
  onChange: (field: keyof Step1State, value: string) => void;
  onNext: () => void;
};

export default function Step1({
  value,
  errors,
  years,
  brands,
  models,
  bodyTypes,
  fuelTypes,
  transmissions,
  onChange,
  onNext
}: Props) {
  const renderSelect = (
    label: string,
    field: keyof Step1State,
    options: string[],
    disabled?: boolean
  ) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-800">{label}</label>
      <select
        value={value[field]}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(field, e.target.value)}
        disabled={disabled}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="">{label} Seçiniz</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errors[field] ? <p className="text-xs font-medium text-red-600">{errors[field]}</p> : null}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {renderSelect('Araç Yılı', 'year', years)}
        {renderSelect('Araç Markası', 'brand', brands, !value.year)}
        {renderSelect('Araç Modeli', 'model', models, !value.brand)}
        {renderSelect('Araç Kasa Tipi', 'bodyType', bodyTypes)}
        {renderSelect('Araç Yakıt Tipi', 'fuelType', fuelTypes)}
        {renderSelect('Araç Vites Tipi', 'transmission', transmissions)}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">Kilometre</label>
          <input
            type="number"
            value={value.kilometre}
            onChange={(e) => onChange('kilometre', e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Örn: 85000"
            min={6001}
            max={300000}
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
                  onChange={(e) => onChange('tramer', e.target.value)}
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
            onChange={(e) => onChange('tramerValue', e.target.value)}
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
                onChange={(e) => onChange('heavyDamage', e.target.value)}
                className="h-4 w-4 text-primary focus:ring-primary/40"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.heavyDamage ? <p className="text-xs font-medium text-red-600">{errors.heavyDamage}</p> : null}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Sonraki (Kaporta)
        </button>
      </div>
    </div>
  );
}


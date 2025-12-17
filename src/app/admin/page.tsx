import Link from 'next/link';

const cards = [
  { title: 'İlanlar', desc: 'Araba ilanlarını yönet', href: '/admin/listings' },
  { title: 'Blog Yazıları', desc: 'Blog yazılarını yönet', href: '/admin/blog' },
  { title: 'Form Başvuruları', desc: 'Form başvurularını incele', href: '/admin/forms' }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Kontrol Paneli</h1>
        <p className="text-sm text-slate-600">Yerel MVP admin paneli</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:-translate-y-1 hover:shadow transition"
          >
            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="text-sm text-slate-600 mt-2">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}


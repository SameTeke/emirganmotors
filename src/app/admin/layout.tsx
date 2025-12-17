"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Kontrol Paneli' },
  { href: '/admin/listings', label: 'İlanlar' },
  { href: '/admin/blog', label: 'Blog Yazıları' },
  { href: '/admin/forms', label: 'Form Başvuruları' }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm border-r border-slate-200 hidden md:block">
          <div className="p-4 border-b border-slate-200">
            <Link href="/admin" className="text-lg font-bold text-slate-900">
              Admin Panel
            </Link>
            <p className="text-xs text-slate-500">Yerel MVP</p>
          </div>
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    active ? 'bg-primary/10 text-primary' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-3">
            <button
              type="button"
              onClick={logout}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              disabled={loading}
            >
              Çıkış
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <div className="font-semibold text-slate-800">Admin Paneli</div>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              disabled={loading}
            >
              Çıkış
            </button>
          </header>
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}


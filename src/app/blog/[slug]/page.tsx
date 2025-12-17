"use client";

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useEffect, useState } from 'react';

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnailUrl: string | null;
  heroImageUrl: string | null;
  readingTime: string | null;
  publishedAt: string | null;
};

const formatDateTR = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
};

type Params = {
  params: { slug: string };
};

export default function BlogDetailPage({ params }: Params) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const res = await fetch(`/api/blog/${params.slug}`);
        if (!res.ok) {
          setPost(null);
          setLoadError('Yazı yüklenemedi.');
          return;
        }
        const data = await res.json();
        setPost(data.post || null);
      } catch {
        setPost(null);
        setLoadError('Yazı yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-16 sm:pt-20">
        <Header />
        <div className="mx-auto max-w-screen-md px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">Yükleniyor...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="min-h-screen bg-white pt-16 sm:pt-20">
        <Header />
        <div className="mx-auto max-w-screen-md px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900">Yüklenemedi</h1>
          <p className="mt-2 text-sm text-slate-600">{loadError}</p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Bloga dön
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-white pt-16 sm:pt-20">
        <Header />
        <div className="mx-auto max-w-screen-md px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900">Yazı bulunamadı</h1>
          <p className="mt-2 text-sm text-slate-600">Aradığınız blog yazısı mevcut değil.</p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Bloga dön
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-16 sm:pt-20">
      <Header />
      <article className="mx-auto max-w-screen-md px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 h-56 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-72">
          <img
            src={post.heroImageUrl || post.thumbnailUrl || '/images/banner.jpg'}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        <p className="text-sm font-medium text-slate-500">
          {formatDateTR(post.publishedAt)} {post.readingTime ? `· ${post.readingTime}` : ''}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{post.title}</h1>

        <div className="prose prose-slate mt-6 max-w-none">
          {post.excerpt ? <p className="text-slate-700">{post.excerpt}</p> : null}
          {post.content
            .split('\n')
            .filter((x) => x.trim().length > 0)
            .map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
        </div>

        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            ← Bloga dön
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}


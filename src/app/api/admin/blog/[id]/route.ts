import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = { params: { id: string } };

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id);
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  const data = await req.json();
  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt ?? null,
        content: data.content ?? '',
        thumbnailUrl: data.thumbnailUrl ?? null,
        heroImageUrl: data.heroImageUrl ?? null,
        readingTime: data.readingTime ?? null,
        status: data.status ?? 'draft',
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null
      }
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Güncellenemedi' }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const id = Number(params.id);
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}



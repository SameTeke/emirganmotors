import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }]
  });
  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const created = await prisma.blogPost.create({
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
    return NextResponse.json({ id: created.id });
  } catch {
    return NextResponse.json({ error: 'Kaydedilemedi' }, { status: 400 });
  }
}



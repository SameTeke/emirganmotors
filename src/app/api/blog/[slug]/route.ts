import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = { params: { slug: string } };

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: Params) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug }
  });
  if (!post || post.status !== 'published') {
    return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  }
  return NextResponse.json({ post });
}



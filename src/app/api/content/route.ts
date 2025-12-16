import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const key = searchParams.get('key');
  if (!page) {
    return NextResponse.json({ error: 'page gerekli' }, { status: 400 });
  }
  if (key) {
    const item = await prisma.contentEntry.findUnique({ where: { page_key: { page, key } } });
    return NextResponse.json({ item });
  }
  const items = await prisma.contentEntry.findMany({ where: { page } });
  return NextResponse.json({ items });
}


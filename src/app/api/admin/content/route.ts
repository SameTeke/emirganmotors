import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const where = page ? { page } : {};
  const items = await prisma.contentEntry.findMany({ where, orderBy: [{ page: 'asc' }, { key: 'asc' }] });
  return NextResponse.json({ items });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { page, key, type, value } = body;
  if (!page || !key || !type) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 });
  }
  await prisma.contentEntry.upsert({
    where: { page_key: { page, key } },
    update: { type, value },
    create: { page, key, type, value }
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { page, key } = body;
  if (!page || !key) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 });
  }
  await prisma.contentEntry.delete({ where: { page_key: { page, key } } }).catch(() => {});
  return NextResponse.json({ ok: true });
}


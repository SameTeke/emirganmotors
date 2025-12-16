import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = { params: { id: string } };

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id);
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { images: true }
  });
  if (!listing || listing.status !== 'published') {
    return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  }
  return NextResponse.json({ listing });
}


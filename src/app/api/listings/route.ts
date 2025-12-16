import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const listings = await prisma.listing.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    include: { images: true }
  });
  return NextResponse.json({ listings });
}


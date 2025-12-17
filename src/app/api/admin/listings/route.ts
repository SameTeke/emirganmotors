import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' },
    include: { images: true }
  });
  return NextResponse.json({ listings });
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const listing = await prisma.listing.create({
      data: {
        brand: data.brand,
        model: data.model,
        price: data.price,
        year: data.year,
        city: data.city,
        fuelType: data.fuelType,
        transmission: data.transmission,
        mileage: data.mileage,
        bodyType: data.bodyType,
        color: data.color,
        paintDamageInfo: data.paintDamageInfo ?? null,
        tramerHasRecord: data.tramerHasRecord ?? false,
        tramerAmount: data.tramerAmount ?? null,
        heavyDamage: data.heavyDamage ?? false,
        status: data.status ?? 'draft'
      }
    });
    return NextResponse.json({ id: listing.id });
  } catch (e) {
    return NextResponse.json({ error: 'Kaydedilemedi' }, { status: 400 });
  }
}


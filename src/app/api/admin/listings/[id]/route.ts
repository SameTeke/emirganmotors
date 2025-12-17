import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id);
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { images: true }
  });
  if (!listing) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  return NextResponse.json({ listing });
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  const data = await req.json();
  try {
    await prisma.listing.update({
      where: { id },
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
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ error: 'Güncellenemedi' }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const id = Number(params.id);
  await prisma.listing.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}


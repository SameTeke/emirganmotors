import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const submissions = await prisma.formSubmission.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json({ submissions });
}

export async function PUT(req: Request) {
  const { id, status, adminNote } = await req.json();
  if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 });
  await prisma.formSubmission.update({
    where: { id },
    data: {
      status: status || undefined,
      adminNote: adminNote ?? undefined
    }
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 });
  await prisma.formSubmission.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}


import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const data = await req.json();
  const { formType, phone, payload } = data;
  if (!formType || !phone || !payload) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 });
  }
  await prisma.formSubmission.create({
    data: {
      formType,
      phone,
      data: payload
    }
  });
  return NextResponse.json({ ok: true });
}


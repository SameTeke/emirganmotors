import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashOtp, normalizeTRPhone } from '@/lib/sms';

export const dynamic = 'force-dynamic';

const MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code: string = String(body?.code || '').trim();
    const phoneRaw: string = body?.phone || '';
    const phone = normalizeTRPhone(phoneRaw);
    if (!phone || !code) {
      return NextResponse.json({ success: false, error: 'Telefon ve kod gerekli' }, { status: 400 });
    }

    const otp = await prisma.smsOtp.findFirst({
      where: { phone, verifiedAt: null },
      orderBy: { createdAt: 'desc' }
    });

    if (!otp) {
      return NextResponse.json({ success: false, error: 'Kod bulunamadı' }, { status: 400 });
    }
    if (otp.attempts >= MAX_ATTEMPTS) {
      return NextResponse.json({ success: false, error: 'Çok fazla hatalı deneme' }, { status: 429 });
    }
    if (Date.now() > otp.expiresAt.getTime()) {
      return NextResponse.json({ success: false, error: 'Kod süresi doldu' }, { status: 400 });
    }

    const expected = hashOtp(code, otp.salt);
    const ok = expected === otp.codeHash;
    await prisma.smsOtp.update({
      where: { id: otp.id },
      data: ok ? { verifiedAt: new Date() } : { attempts: { increment: 1 } }
    });

    if (!ok) {
      return NextResponse.json({ success: false, error: 'Kod hatalı' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Doğrulama hatası' }, { status: 500 });
  }
}


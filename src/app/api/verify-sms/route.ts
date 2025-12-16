import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code: string = (body?.code || '').trim();

    // eslint-disable-next-line no-var
    var globalAny: any = globalThis as any;
    const stored = globalAny.fakeSMSCode;
    const expiresAt = globalAny.fakeSMSExpiresAt || 0;

    if (!stored || Date.now() > expiresAt) {
      return NextResponse.json({ success: false, error: 'Kod süresi doldu' }, { status: 400 });
    }

    if (code !== String(stored)) {
      return NextResponse.json({ success: false, error: 'Invalid code' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Doğrulama hatası' }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';

// To switch from fake SMS to a real provider (Twilio/NetGSM/etc):
// 1. Replace the code in /api/send-sms with real SMS sending logic
// 2. Remove fakeSMSCode storage and store verification code in DB or session
// 3. Keep /api/verify-sms logic the same

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone: string = body?.phone || '';
    if (!phone) {
      return NextResponse.json({ success: false, error: 'Telefon gerekli' }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    // store in global for fake flow
    // eslint-disable-next-line no-var
    var globalAny: any = globalThis as any;
    globalAny.fakeSMSCode = String(code);
    globalAny.fakeSMSExpiresAt = Date.now() + 5 * 60 * 1000;

    console.log('FAKE SMS CODE:', code);

    return NextResponse.json({
      success: true,
      message: 'Fake SMS sent (check server console)'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'SMS gönderilemedi' }, { status: 500 });
  }
}


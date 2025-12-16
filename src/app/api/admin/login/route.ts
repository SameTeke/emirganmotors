import { NextResponse } from 'next/server';
import { signAdminToken, verifyAdminPassword, setAdminCookie } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
  }

  const user = await verifyAdminPassword(email, password);
  if (!user) {
    return NextResponse.json({ error: 'Geçersiz bilgiler' }, { status: 401 });
  }

  const token = signAdminToken({ sub: user.id, email: user.email });
  setAdminCookie(token);
  return NextResponse.json({ ok: true });
}


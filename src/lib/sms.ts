import crypto from 'crypto';

export type SmsProvider = 'twilio' | 'netgsm' | 'disabled';

export function normalizeTRPhone(input: string): string | null {
  const digits = String(input || '').replace(/\D/g, '');
  if (!digits) return null;

  let d = digits;
  if (d.startsWith('0')) d = '90' + d.slice(1);
  if (!d.startsWith('90')) d = '90' + d;
  d = d.slice(0, 12);

  // TR GSM: 90 + 10 digits
  if (!/^90\d{10}$/.test(d)) return null;
  return d;
}

export function hashOtp(code: string, salt: string): string {
  return crypto.createHash('sha256').update(`${salt}:${code}`).digest('hex');
}

export function randomOtpCode(): string {
  // 6-digit code
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function randomSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function getSmsProvider(): SmsProvider {
  const p = (process.env.SMS_PROVIDER || '').toLowerCase().trim();
  if (p === 'twilio' || p === 'netgsm' || p === 'disabled') return p;
  // default: disabled in dev unless explicitly configured
  return process.env.VERCEL ? 'disabled' : 'disabled';
}

export async function sendSms(toDigits90: string, message: string) {
  const provider = getSmsProvider();

  if (provider === 'disabled') {
    // In production we don't want silent success without a provider.
    if (process.env.VERCEL) {
      throw new Error('SMS sağlayıcısı ayarlı değil (SMS_PROVIDER=twilio/netgsm)');
    }
    console.log(`[DEV SMS] to=+${toDigits90} msg="${message}"`);
    return;
  }

  if (provider === 'twilio') {
    const sid = process.env.TWILIO_ACCOUNT_SID || '';
    const token = process.env.TWILIO_AUTH_TOKEN || '';
    const from = process.env.TWILIO_FROM || ''; // e.g. +1...
    if (!sid || !token || !from) throw new Error('Twilio env eksik (TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN/TWILIO_FROM)');

    const url = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages.json`;
    const body = new URLSearchParams({
      From: from,
      To: `+${toDigits90}`,
      Body: message
    });

    const auth = Buffer.from(`${sid}:${token}`).toString('base64');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Twilio SMS gönderimi başarısız: ${res.status} ${text}`);
    }
    return;
  }

  // netgsm
  const usercode = process.env.NETGSM_USERCODE || '';
  const password = process.env.NETGSM_PASSWORD || '';
  const header = process.env.NETGSM_HEADER || '';
  if (!usercode || !password || !header) {
    throw new Error('NetGSM env eksik (NETGSM_USERCODE/NETGSM_PASSWORD/NETGSM_HEADER)');
  }

  // NetGSM "send/get" endpoint (simple GET). Returns codes like "00 ..." on success.
  const qs = new URLSearchParams({
    usercode,
    password,
    gsmno: toDigits90,
    message,
    msgheader: header,
    encoding: 'UTF-8'
  });
  const res = await fetch(`https://api.netgsm.com.tr/sms/send/get/?${qs.toString()}`, { method: 'GET' });
  const text = await res.text().catch(() => '');
  if (!res.ok) throw new Error(`NetGSM HTTP hata: ${res.status} ${text}`);

  // Success typically starts with "00"
  if (!text.trim().startsWith('00')) {
    throw new Error(`NetGSM SMS gönderimi başarısız: ${text}`);
  }
}



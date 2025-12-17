import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const defaultToEmail = 'sssametcanteke@gmail.com';

function buildTransport() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return nodemailer.createTransport({
    jsonTransport: true
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const transport = buildTransport();

    const toEmail = process.env.CONTACT_TO_EMAIL || defaultToEmail;

    const mail = {
      from: process.env.SMTP_FROM || 'no-reply@example.com',
      to: toEmail,
      subject: 'Sizi Arayalım Talebi',
      text: JSON.stringify(payload, null, 2)
    };

    await transport.sendMail(mail);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Email gönderilemedi' }, { status: 500 });
  }
}



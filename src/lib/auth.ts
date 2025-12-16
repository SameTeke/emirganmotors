import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const ADMIN_TOKEN_COOKIE = 'admin_token';
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'local-dev-secret';
const TOKEN_TTL = '7d';

type AdminTokenPayload = {
  sub: number;
  email: string;
};

export async function verifyAdminPassword(email: string, password: string) {
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}

export function signAdminToken(payload: AdminTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || typeof decoded !== 'object') return null;
    const anyDecoded = decoded as Record<string, unknown>;
    const sub = anyDecoded.sub;
    const email = anyDecoded.email;
    if (typeof sub !== 'number') return null;
    if (typeof email !== 'string') return null;
    return { sub, email };
  } catch {
    return null;
  }
}

export function setAdminCookie(token: string) {
  cookies().set(ADMIN_TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearAdminCookie() {
  cookies().delete(ADMIN_TOKEN_COOKIE);
}

export function getAdminFromCookies(): AdminTokenPayload | null {
  const token = cookies().get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}


import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { saveUploadFiles } from '@/lib/upload';

type Params = { params: { id: string } };

export async function POST(req: Request, { params }: Params) {
  const listingId = Number(params.id);
  const form = await req.formData();
  const files = form.getAll('files') as File[];
  if (!files.length) return NextResponse.json({ ok: true });

  const saved = await saveUploadFiles(files);
  await prisma.listingImage.createMany({
    data: saved.map((s) => ({ url: s.url, listingId }))
  });

  return NextResponse.json({ ok: true, files: saved });
}


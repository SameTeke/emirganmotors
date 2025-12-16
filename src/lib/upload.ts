import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

function ensureUploadDir() {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

export async function saveUploadFiles(files: File[]) {
  ensureUploadDir();
  const saved: { filename: string; url: string }[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = path.extname(file.name) || '.dat';
    const filename = `${randomUUID()}${ext}`;
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);
    saved.push({ filename, url: `/uploads/${filename}` });
  }

  return saved;
}


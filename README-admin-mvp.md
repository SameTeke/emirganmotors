# Admin Panel MVP (Local)

## Kurulum
1) Bağımlılıklar: `npm install`
2) Env: `env.sample` içeriğini `.env` dosyanıza kopyalayın  
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require"
ADMIN_JWT_SECRET="local-dev-secret"
BLOB_READ_WRITE_TOKEN="vercel-blob-token" # prod için
```
3) DB şeması:
- Local SQLite yerine Postgres kullanıyorsanız: `npx prisma db push`
- (İsterseniz) migration üretmek için: `npx prisma migrate dev --name init`
4) Seed: `npx prisma db seed`

## Giriş
- URL: `http://localhost:3000/admin/login`
- Kullanıcı: `admin@local.dev`
- Şifre: `admin12345`

## Özellikler
- Listings: Araba ilanı ekle/düzenle/sil, durum (draft/published), çoklu resim yükleme.
- Content: `ContentEntry` kayıtlarını sayfa/key bazında düzenleme.
- Media: Local'de `/public/uploads`, prod'da Vercel Blob.
- Forms: Araç Sat / Konsinye / Motosiklet formlarından gelen kayıtları listeleme, durum güncelleme.
- Araba Al sayfası: DB’deki `published` ilanları listeler ve mevcut filtreler uygulanır.

## Notlar
- Upload:
  - Local: `public/uploads`
  - Vercel Prod: Vercel Blob (`BLOB_READ_WRITE_TOKEN`)
- DB: Prod için Postgres önerilir (Neon/Supabase/Railway).


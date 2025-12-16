# Admin Panel MVP (Local)

## Kurulum
1) Bağımlılıklar: `npm install bcryptjs jsonwebtoken @prisma/client prisma`
2) Env: `.env` içine ekleyin  
```
DATABASE_URL="file:./prisma/dev.db"
ADMIN_JWT_SECRET="local-dev-secret"
```
3) Migrasyon: `npx prisma migrate dev --name init`
4) Seed: `npx prisma db seed`

## Giriş
- URL: `http://localhost:3000/admin/login`
- Kullanıcı: `admin@local.dev`
- Şifre: `admin12345`

## Özellikler
- Listings: Araba ilanı ekle/düzenle/sil, durum (draft/published), çoklu resim yükleme.
- Content: `ContentEntry` kayıtlarını sayfa/key bazında düzenleme.
- Media: /public/uploads içine görsel yükleme.
- Forms: Araç Sat / Konsinye / Motosiklet formlarından gelen kayıtları listeleme, durum güncelleme.
- Araba Al sayfası: DB’deki `published` ilanları listeler ve mevcut filtreler uygulanır.

## Notlar
- Upload dizini: `public/uploads`
- DB SQLite (dev). PostgreSQL’e geçiş için yalnızca `DATABASE_URL` ve `prisma` provider değiştirilir.
- Upload’u S3’e taşımak için `lib/upload.ts` ve `/api/upload` değiştirilmesi yeterlidir.


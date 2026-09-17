# Website Profil SMK Bina Karya Nusantara

Website profil sekolah statis (static site) untuk **SMK Bina Karya Nusantara** (data fiktif).
Dibangun dengan **Next.js (App Router) + TypeScript + Tailwind CSS**.

> Lihat [`prd.md`](./prd.md) untuk Product Requirements Document lengkap dan
> [`identitas-sekolah.md`](./identitas-sekolah.md) untuk sumber data identitas sekolah.

## 🚀 Menjalankan Proyek

```bash
# 1. Install dependency
npm install

# 2. Jalankan development server
npm run dev
# buka http://localhost:3000

# 3. Build produksi
npm run build

# 4. Jalankan hasil build
npm start
```

## 📜 Scripts

| Script                 | Fungsi                  |
| ---------------------- | ----------------------- |
| `npm run dev`          | Development server      |
| `npm run build`        | Build produksi (static) |
| `npm start`            | Jalankan hasil build    |
| `npm run lint`         | ESLint                  |
| `npm run format`       | Prettier (write)        |
| `npm run format:check` | Prettier (check)        |
| `npm run typecheck`    | TypeScript type check   |
| `npm run test`         | Unit test (Vitest)      |
| `npm run test:watch`   | Unit test (watch)       |
| `npm run test:e2e`     | E2E test (Playwright)   |

## 🗂️ Struktur Folder

```
.
├─ app/                       # Halaman (Next.js App Router)
│  ├─ page.tsx                # Beranda
│  ├─ profil/                 # Profil / Tentang
│  ├─ program-keahlian/       # List + detail jurusan
│  │  └─ [slug]/
│  ├─ fasilitas/              # Fasilitas & Galeri
│  ├─ ppdb/                   # Informasi PPDB (tanpa form)
│  ├─ berita/                 # Berita + detail
│  │  └─ [slug]/
│  ├─ kontak/                 # Kontak & lokasi
│  ├─ kebijakan-privasi/      # Legal
│  ├─ syarat-ketentuan/       # Legal
│  ├─ layout.tsx              # Root layout (header, footer, metadata, JSON-LD)
│  ├─ robots.ts               # robots.txt
│  └─ sitemap.ts              # sitemap.xml
├─ components/                # Komponen UI (layout, ui, SearchDialog, dll)
├─ data/                      # Konten JSON (single source of truth)
├─ lib/                       # Types, data loader, util, search index
├─ public/images/             # Aset gambar
├─ tests/
│  ├─ unit/                   # Vitest + RTL
│  └─ e2e/                    # Playwright
├─ identitas-sekolah.md
└─ prd.md
```

## 📝 Pengelolaan Konten

Konten dikelola melalui file JSON di folder [`data/`](./data):

| File                   | Isi                                          |
| ---------------------- | -------------------------------------------- |
| `sekolah.json`         | Identitas umum, alamat, kontak, sosial media |
| `profil.json`          | Sejarah, visi, misi, tujuan, sambutan        |
| `jurusan.json`         | 6 program keahlian                           |
| `fasilitas.json`       | Fasilitas sekolah                            |
| `galeri.json`          | Item galeri                                  |
| `prestasi.json`        | Daftar prestasi                              |
| `ekstrakurikuler.json` | Ekstrakurikuler                              |
| `struktur.json`        | Struktur organisasi                          |
| `kemitraan.json`       | Mitra DUDI & PT                              |
| `statistik.json`       | Data tenaga pendidik & siswa                 |
| `ppdb.json`            | Informasi & pengumuman PPDB                  |
| `berita.json`          | Artikel berita                               |

Setelah mengubah JSON, jalankan `npm run build` untuk membangun ulang situs.

> ⚠️ **PPDB:** website ini hanya menampilkan **informasi** PPDB. Tidak ada form pendaftaran online.

## 🔐 Keamanan

Security headers dikonfigurasi di [`next.config.ts`](./next.config.ts):
`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, dan `Content-Security-Policy`.

## 🚀 Deployment

Static site — dapat di-deploy ke **Vercel** atau **Netlify**.

- **Vercel:** import repo, framework terdeteksi otomatis (Next.js).
- **Netlify:** build command `npm run build`, publish directory `.next`.

## 🧪 Testing

```bash
npm run test       # unit
npm run test:e2e   # e2e (butuh browser Playwright: npx playwright install)
```

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pengembangan/pembelajaran. Seluruh data sekolah bersifat fiktif.

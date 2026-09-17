# Product Requirements Document (PRD)

## Website Profile Sekolah — SMK Bina Karya Nusantara

| Atribut            | Keterangan                               |
| ------------------ | ---------------------------------------- |
| **Nama Produk**    | Website Profile SMK Bina Karya Nusantara |
| **Versi Dokumen**  | 1.0                                      |
| **Status**         | Draft — untuk persetujuan                |
| **Jenis Produk**   | Static Website (Static Site Generation)  |
| **Bahasa**         | Bahasa Indonesia                         |
| **Pemilik Produk** | Tim Pengembang Project Profile SMK       |
| **Tanggal**        | Dokumen planning awal                    |

---

## 1. Latar Belakang & Konteks

SMK Bina Karya Nusantara (data fiktif, lihat `identitas-sekolah.md`) memerlukan website profil resmi yang berfungsi sebagai:

- **Wajah digital sekolah** — media publikasi dan branding ke masyarakat umum, calon siswa, dan mitra industri.
- **Pusat informasi PPDB** — menampilkan **informasi dan pengumuman** seputar Penerimaan Peserta Didik Baru (jadwal, syarat, tahapan, hasil seleksi). _Pendaftaran itu sendiri dilakukan di luar sistem website ini._
- **Sumber informasi sekolah** — jurusan, fasilitas, galeri, profil, dan kontak.

Saat ini sekolah belum memiliki website resmi yang terstruktur. Website ini dibangun sebagai **static site** agar cepat, murah, aman, dan mudah di-hosting.

---

## 2. Tujuan Produk (Objectives)

1. Menyediakan satu sumber informasi resmi sekolah yang lengkap, akurat, dan mudah diakses.
2. Meningkatkan kredibilitas dan citra sekolah melalui tampilan profesional.
3. Menjadi kanal informasi PPDB yang jelas bagi calon siswa & orang tua.
4. Menampilkan program keahlian, fasilitas, dan prestasi secara menarik.
5. Menghasilkan website yang cepat, aman, aksesibel, dan SEO-friendly.

### Non-Goals (Di Luar Lingkup)

- ❌ **Form pendaftaran PPDB online** — website hanya menampilkan informasi/berita PPDB.
- ❌ **Sistem login / autentikasi / dashboard admin.**
- ❌ **Database dinamis / CMS backend** — konten dikelola via file JSON di repository.
- ❌ **Dark mode.**
- ❌ **Multi-bahasa (i18n)** — hanya Bahasa Indonesia.
- ❌ **Portal siswa / e-learning / nilai online.**
- ❌ **Fitur pembayaran.**

---

## 3. Target Pengguna (Personas)

| Persona                              | Kebutuhan Utama                                                | Prioritas |
| ------------------------------------ | -------------------------------------------------------------- | --------- |
| **Calon Siswa & Orang Tua**          | Mencari info sekolah, jurusan, biaya, jadwal & pengumuman PPDB | Tinggi    |
| **Masyarakat Umum & Mitra Industri** | Melihat profil, prestasi, kemitraan sekolah                    | Sedang    |
| **Guru & Staf Sekolah**              | Sumber data resmi sekolah, referensi mengajar                  | Sedang    |
| **Alumni & Pihak Eksternal**         | Mengetahui kegiatan & perkembangan sekolah                     | Rendah    |

> Catatan: Guru/staf **tidak** mengelola konten langsung di website (tanpa CMS). Pengelolaan konten dilakukan lewat file JSON di repo (di luar UX website).

---

## 4. Ruang Lingkup & Jenis Produk

- **Tipe:** Static website (pre-rendered at build time).
- **Pendekatan:** MVP dulu, lalu iteratif.
- **Sifat konten:** Sebagian statis (profil, jurusan, fasilitas) dan sebagian berbasis kumpulan data JSON (berita, jurusan, galeri, pengumuman PPDB).

---

## 5. Tech Stack

### 5.1 Frontend

| Komponen  | Teknologi                        | Alasan                                                |
| --------- | -------------------------------- | ----------------------------------------------------- |
| Framework | **Next.js (React)**              | SSR/SSG, SEO-friendly, App Router, image optimization |
| Bahasa    | **TypeScript**                   | Type safety, maintainability                          |
| Styling   | **Tailwind CSS**                 | Cepat, konsisten, utility-first                       |
| Icons     | (mis. Lucide / Heroicons)        | Ringan & konsisten                                    |
| Rendering | **Static Site Generation (SSG)** | Cepat, aman, murah                                    |

### 5.2 Data & Konten

| Komponen           | Teknologi                                   |
| ------------------ | ------------------------------------------- |
| Penyimpanan konten | **File JSON per entitas** di folder `/data` |
| Struktur data      | Satu file per entitas (contoh di §8)        |
| Pencarian          | **Client-side search** atas data JSON       |

### 5.3 Tooling & Quality Assurance

| Tool                               | Fungsi                |
| ---------------------------------- | --------------------- |
| **ESLint**                         | Linting               |
| **Prettier**                       | Formatting            |
| **TypeScript**                     | Static type checking  |
| **Vitest + React Testing Library** | Unit & component test |
| **Playwright / Cypress**           | End-to-end test       |
| **Husky + lint-staged**            | Pre-commit hooks      |

### 5.4 Hosting & Deployment

| Komponen | Teknologi                                        |
| -------- | ------------------------------------------------ |
| Hosting  | **Vercel / Netlify**                             |
| Domain   | Domain kustom + **HTTPS**                        |
| CI/CD    | Build & deploy otomatis dari Git (push → deploy) |

---

## 6. Arsitektur Informasi & Halaman

### 6.1 Sitemap

```
/                        → Beranda
/profil                  → Profil / Tentang
  ├─ /profil/sejarah
  ├─ /profil/visi-misi
  └─ /profil/struktur
/program-keahlian        → Daftar Jurusan
  └─ /program-keahlian/[slug] → Detail Jurusan
/fasilitas               → Fasilitas & Galeri
/ppdb                    → Informasi PPDB (tanpa form)
/kontak                  → Kontak & Lokasi
/berita                  → (opsional) Daftar berita/kegiatan
  └─ /berita/[slug]
/kebijakan-privasi       → Legal
/syarat-ketentuan        → Legal
```

### 6.2 Detail Halaman

#### Halaman 1 — Beranda (`/`)

**Tujuan:** Landing page yang memberi gambaran sekolah dan mengarahkan ke PPDB/jurusan.

**Komponen:**

- Hero section (nama sekolah, tagline, CTA ke PPDB & Profil).
- Highlight program keahlian (kartu jurusan).
- Section fasilitas unggulan (preview galeri).
- Section prestasi / statistik (jumlah siswa, jurusan, akreditasi).
- Pengumuman PPDB terbaru (preview).
- CTA kontak & lokasi.
- Footer lengkap (navigasi, kontak, sosial media).

#### Halaman 2 — Profil / Tentang (`/profil`)

- Sejarah singkat sekolah.
- Visi & Misi + Tujuan.
- Sambutan kepala sekolah.
- Struktur organisasi.
- Data singkat (akreditasi, NPSN, tenaga pendidik, jumlah siswa).
- Sub-halaman: Sejarah, Visi-Misi, Struktur.

#### Halaman 3 — Program Keahlian (`/program-keahlian`)

- Daftar 6 jurusan dalam bentuk kartu.
- Setiap kartu → halaman detail `/program-keahlian/[slug]`.
- **Detail jurusan:** deskripsi, kompetensi yang dipelajari, prospek karier, fasilitas pendukung, mata pelajaran.

#### Halaman 4 — Fasilitas & Galeri (`/fasilitas`)

- Daftar fasilitas (tabel/daftar dari `fasilitas.json`).
- Galeri foto (grid, lightbox) & video (embed).
- Filter kategori (ruang kelas, lab, bengkel, olahraga, dll).

#### Halaman 5 — PPDB (`/ppdb`) _(informasi saja)_

- Jadwal & timeline PPDB.
- Persyaratan pendaftaran.
- Jalur pendaftaran (Zonasi, Prestasi, Reguler, Beasiswa).
- Alur/tata cara pendaftaran (langkah-langkah).
- Pengumuman hasil / informasi terbaru (dari data JSON).
- Kontak narahubung PPDB (email/telepon/WA).
- Link/instruksi ke kanal pendaftaran resmi (di luar website).

> ⚠️ **Tanpa form pendaftaran online.** Pendaftaran sesungguhnya dilakukan di luar sistem.

#### Halaman 6 — Kontak (`/kontak`)

- Alamat lengkap + peta (Google Maps embed).
- Nomor telepon, WhatsApp, email.
- Jam operasional.
- Akun sosial media.
- (Opsional) Form kontak sederhana → dikirim via mailto/third-party. _(Bila tidak ada backend, dinyatakan eksplisit ke pengguna.)_

#### Halaman 7 — Berita / Kegiatan (`/berita`) _(opsional, MVP+1)_

- Daftar artikel berita & kegiatan.
- Detail artikel.
- Konten dari file JSON/Markdown.

#### Halaman 8 — Legal

- Kebijakan Privasi.
- Syarat & Ketentuan.

### 6.3 Navigasi Global

- **Header:** Logo, menu (Beranda, Profil, Program Keahlian, Fasilitas, PPDB, Kontak), tombol CTA PPDB, kolom pencarian.
- **Footer:** Navigasi, kontak, sosial media, tautan legal, copyright.
- **Mobile:** Hamburger menu / drawer, sticky header.

---

## 7. Fitur (Functional Requirements)

| ID   | Fitur                       | Deskripsi                                        | Prioritas |
| ---- | --------------------------- | ------------------------------------------------ | --------- |
| F-01 | **Profil Sekolah**          | Menampilkan profil, sejarah, visi misi, struktur | Must      |
| F-02 | **Program Keahlian**        | Daftar & detail tiap jurusan                     | Must      |
| F-03 | **Fasilitas & Galeri**      | Daftar fasilitas + galeri foto/video             | Must      |
| F-04 | **Kontak & Lokasi**         | Info kontak + peta + sosial media                | Must      |
| F-05 | **Pencarian (client-side)** | Cari konten (jurusan, berita, halaman)           | Must      |
| F-06 | **Informasi PPDB**          | Jadwal, syarat, alur, pengumuman PPDB            | Must      |
| F-07 | **Berita/Kegiatan**         | Artikel berita & prestasi                        | Should    |
| F-08 | **Legal**                   | Privacy policy & terms                           | Should    |
| F-09 | **Responsive**              | Tampilan optimal mobile→large screen             | Must      |
| F-10 | **Aksesibilitas WCAG AA**   | Kontras, keyboard nav, ARIA, alt text            | Must      |
| F-11 | **SEO on-page**             | Meta, sitemap, robots, structured data           | Must      |

---

## 8. Struktur Data (JSON)

Direncanakan folder `/data` dengan file per entitas:

```
/data
  ├─ sekolah.json        → identitas sekolah (dari identitas-sekolah.md)
  ├─ jurusan.json        → daftar 6 program keahlian
  ├─ fasilitas.json      → daftar fasilitas
  ├─ galeri.json         → item galeri foto/video
  ├─ prestasi.json       → daftar prestasi
  ├─ ekstrakurikuler.json→ daftar ekskul
  ├─ ppdb.json           → info PPDB (jadwal, syarat, alur)
  ├─ berita.json         → artikel berita/kegiatan
  ├─ struktur.json       → struktur organisasi
  └─ kontak.json         → kontak & sosial media
```

### Contoh Skema (ilustratif)

**`jurusan.json`**

```json
[
  {
    "slug": "teknik-komputer-dan-jaringan",
    "nama": "Teknik Komputer dan Jaringan",
    "singkatan": "TKJ",
    "bidang": "Teknologi Informasi",
    "durasi": "4 Tahun",
    "akreditasi": "A",
    "deskripsi": "...",
    "kompetensi": ["Instalasi jaringan", "Administrasi server", "..."],
    "prospekKarier": ["Network Engineer", "IT Support", "..."],
    "ikon": "network"
  }
]
```

**`ppdb.json`**

```json
{
  "tahunAjaran": "2025/2026",
  "periode": "Januari - Juli 2025",
  "jalur": ["Zonasi", "Prestasi", "Reguler", "Beasiswa"],
  "persyaratan": ["Fotokopi Ijazah/SKL", "Kartu Keluarga", "..."],
  "alur": ["Ambil formulir", "Isi & lengkapi berkas", "..."],
  "jadwal": [{ "tahap": "Pendaftaran", "tanggal": "1 Jan - 30 Jun 2025" }],
  "pengumuman": [{ "judul": "...", "tanggal": "2025-06-01", "isi": "..." }],
  "kontak": { "email": "ppdb@...", "whatsapp": "0812..." }
}
```

> Detail skema lengkap ditentukan pada tahap implementasi. Data awal bersumber dari `identitas-sekolah.md`.

---

## 9. UI/UX Requirements

### 9.1 Prinsip Desain

- **Minimalis & modern** — banyak ruang putih, fokus keterbacaan.
- Konsisten (spacing, tipografi, komponen).
- Mobile-first.

### 9.2 Design System (Acuan Awal)

| Token        | Nilai                                              |
| ------------ | -------------------------------------------------- |
| Warna primer | Biru (mis. `#2563EB`)                              |
| Warna netral | Putih, abu terang, abu gelap untuk teks            |
| Warna aksen  | (mengikuti identitas bila perlu)                   |
| Font         | Sans-serif modern (mis. Inter) — sistem font stack |
| Radius       | Sudut lembut (mis. 8–12px)                         |
| Spacing      | Skala Tailwind (4, 8, 12, 16, 24, 32...)           |

> Palet final mengacu pada keputusan: **Biru & Putih**, minimalis modern.

### 9.3 Breakpoint Target

| Device       | Lebar      |
| ------------ | ---------- |
| Mobile       | < 640px    |
| Tablet       | 640–1024px |
| Desktop      | ≥ 1024px   |
| Large screen | ≥ 1440px   |

### 9.4 Aksesibilitas (WCAG AA)

- Rasio kontras teks ≥ 4.5:1.
- Navigasi keyboard penuh & focus state jelas.
- Semua gambar punya `alt`.
- Struktur heading semantik (h1→h6).
- ARIA label pada komponen interaktif.
- Form (jika ada) punya label yang benar.

---

## 10. Non-Functional Requirements

| Kategori            | Requirement                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Performance**     | Skor Lighthouse ≥ 90 (Performance, SEO, Accessibility). Gambar dioptimasi, lazy loading.                                   |
| **Responsiveness**  | Optimal di mobile, tablet, desktop, large screen.                                                                          |
| **SEO**             | Meta title/description per halaman, sitemap.xml, robots.txt, Open Graph, structured data (schema.org Organization/School). |
| **Availability**    | Static hosting → uptime tinggi (mengandalkan CDN Vercel/Netlify).                                                          |
| **Maintainability** | TypeScript, ESLint, Prettier, struktur folder rapi, konten terpisah dari kode.                                             |
| **Compatibility**   | Browser modern (Chrome, Firefox, Edge, Safari versi terbaru). Tidak menargetkan browser lawas.                             |
| **Localization**    | Bahasa Indonesia saja.                                                                                                     |

---

## 11. Keamanan (Security)

| Aspek                             | Implementasi                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **HTTPS**                         | Wajib, seluruh trafik terenkripsi; redirect HTTP→HTTPS.                                                                   |
| **Security Headers**              | `Strict-Transport-Security (HSTS)`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. |
| **Content Security Policy (CSP)** | Membatasi sumber script/gambar/style eksternal yang diizinkan.                                                            |
| **Prinsip Least-Data**            | Tidak ada data sensitif di sisi client. Tidak ada penyimpanan data pribadi (tanpa form pendaftaran).                      |
| **Dependency**                    | Rutin update dependency, audit (mis. `npm audit`).                                                                        |
| **Form kontak (jika ada)**        | Validasi input, hindari menyimpan data; kirim via kanal aman (mailto/third-party).                                        |
| **Domain**                        | Konfigurasi DNS & domain aman, kelola akses repo & akun hosting dengan 2FA.                                               |

> Karena website **static tanpa backend & tanpa data pengguna**, permukaan serangan jauh lebih kecil.

---

## 12. SEO On-Page (Detail)

- Meta title & description unik per halaman.
- Heading hierarkis dan deskriptif.
- `sitemap.xml` & `robots.txt`.
- Open Graph & Twitter Card (untuk berbagi di sosial media).
- Structured data: `Organization` / `EducationalOrganization` (nama, logo, alamat, kontak, sosial media).
- URL bersih & deskriptif (slug).
- Alt text gambar.
- Canonical URL.
- Optimasi kecepatan (Core Web Vitals).
- (Disiapkan) Google Search Console.

---

## 13. Testing & QA Plan

| Level                | Tool                           | Cakupan                                            |
| -------------------- | ------------------------------ | -------------------------------------------------- |
| Unit/Component       | Vitest + React Testing Library | Komponen UI, fungsi utility, parsing data JSON     |
| E2E                  | Playwright / Cypress           | Alur navigasi, halaman utama, pencarian, responsif |
| Lint & Format        | ESLint + Prettier              | Konsistensi & kualitas kode                        |
| Pre-commit           | Husky + lint-staged            | Cegah kode bermasalah masuk repo                   |
| Manual/Accessibility | Lighthouse, axe                | Skor & aksesibilitas                               |
| Cross-device         | Manual                         | Cek di mobile/tablet/desktop                       |

**Definition of Done (per fitur):**

- ✅ Berfungsi sesuai requirement
- ✅ Responsive di semua breakpoint
- ✅ Lolos lint & type check
- ✅ Ada test (unit/e2e) relevan
- ✅ Aksesibel (WCAG AA)
- ✅ SEO on-page terpasang

---

## 14. Struktur Folder (Usulan)

```
smk-binakarya-website/
├─ app/ (atau pages/)
│  ├─ page.tsx                → Beranda
│  ├─ profil/
│  ├─ program-keahlian/
│  │  └─ [slug]/
│  ├─ fasilitas/
│  ├─ ppdb/
│  ├─ kontak/
│  ├─ berita/
│  └─ legal/
├─ components/
│  ├─ layout/ (Header, Footer, Nav)
│  └─ ui/ (Button, Card, Section, dll)
├─ data/                      → file JSON konten
├─ lib/                       → util, parser, search
├─ public/                    → gambar, ikon, aset
├─ styles/
├─ tests/ (unit & e2e)
├─ prd.md
└─ identitas-sekolah.md
```

---

## 15. Roadmap (MVP → Iterasi)

### Fase 0 — Fondasi

- Setup project Next.js + TypeScript + Tailwind.
- Konfigurasi ESLint, Prettier, Husky, lint-staged.
- Setup struktur folder & komponen dasar (Header, Footer, Layout).
- Migrasi data `identitas-sekolah.md` → file JSON.

### Fase 1 — MVP (halaman inti)

- Beranda.
- Profil / Tentang.
- Program Keahlian (list + detail).
- Fasilitas & Galeri.
- Kontak.
- Informasi PPDB (statis).
- Responsive + aksesibilitas dasar.
- SEO dasar + deploy ke Vercel/Netlify.

### Fase 2 — Iterasi

- Fitur pencarian client-side.
- Halaman Berita / Kegiatan.
- Halaman Legal (Privacy & Terms).
- Penyempurnaan SEO (structured data, Search Console).
- Testing lengkap (unit + e2e).

### Fase 3 — Penyempurnaan

- Audit Lighthouse & aksesibilitas menyeluruh.
- Security headers + CSP.
- Optimasi performa & gambar.
- Analitik (jika diinginkan).

---

## 16. Metrik Keberhasilan

| Metrik                        | Target                     |
| ----------------------------- | -------------------------- |
| Skor Lighthouse Performance   | ≥ 90                       |
| Skor Lighthouse SEO           | ≥ 90                       |
| Skor Lighthouse Accessibility | ≥ 90                       |
| Core Web Vitals               | Lolos (good)               |
| Ketersediaan informasi PPDB   | Lengkap & ter-update       |
| Waktu muat halaman            | < 2 detik (koneksi normal) |

---

## 17. Risiko & Mitigasi

| Risiko                                        | Dampak                | Mitigasi                                                                |
| --------------------------------------------- | --------------------- | ----------------------------------------------------------------------- |
| Konten sering berubah, tapi tanpa CMS         | Update manual di JSON | Dokumentasi struktur JSON + workflow update yang jelas                  |
| Data tidak konsisten antar halaman            | Info bertentangan     | Jadikan JSON sebagai _single source of truth_                           |
| Konten gambar berat                           | Performa lambat       | Optimasi & kompresi gambar, lazy loading                                |
| Tidak ada form PPDB, user bingung cara daftar | Kebingungan user      | Alur pendaftaran & tautan kanal resmi ditampilkan jelas di halaman PPDB |
| Ketergantungan pihak ketiga (maps, embed)     | CSP/fitur blokir      | Whitelist sumber di CSP, sediakan fallback                              |

---

## 18. Asumsi & Ketergantungan

- Data sekolah mengacu pada `identitas-sekolah.md` (fiktif/dummy).
- Domain & akun hosting akan disediakan pemilik produk.
- Gambar/aset akan disediakan atau menggunakan placeholder saat development.
- Tidak ada kebutuhan autentikasi/backend.

---

## 19. Pertanyaan Terbuka (Open Questions)

1. Form kontak: pakai mailto, layanan pihak ketiga (mis. Formspree), atau ditiadakan?
2. Halaman Berita masuk MVP atau Fase 2?
3. Apakah perlu embed Google Maps (butuh whitelist CSP).
4. Sumber gambar resmi (foto asli sekolah) atau placeholder dulu.
5. Perlu analytics sejak awal atau menyusul?

---

## 20. Lampiran — Ringkasan Keputusan

| Aspek          | Keputusan                               |
| -------------- | --------------------------------------- |
| Jenis produk   | Static website                          |
| Tujuan utama   | Branding/informasi + info PPDB          |
| Stack frontend | Next.js + React + TypeScript + Tailwind |
| Data           | File JSON per entitas                   |
| Pencarian      | Client-side                             |
| Hosting        | Vercel / Netlify + HTTPS                |
| Bahasa         | Indonesia                               |
| Desain         | Minimalis & modern, biru & putih        |
| Dark mode      | Tidak                                   |
| Multi-bahasa   | Tidak                                   |
| Form PPDB      | Tidak ada (hanya info/pengumuman)       |
| Aksesibilitas  | WCAG AA                                 |
| SEO            | On-page lengkap                         |
| Keamanan       | Headers, HTTPS, CSP, least-data         |
| Testing        | Vitest + RTL, Playwright, Husky         |
| Pendekatan     | MVP iteratif                            |

---

_Dokumen PRD ini bersifat living document dan akan diperbarui seiring perkembangan project._

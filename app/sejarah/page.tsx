import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, SectionHeading, CtaBanner } from '@/components/ui';
import { AppImage } from '@/components/AppImage';
import { Icon } from '@/components/Icon';
import { sejarah, sekolah, images } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sejarah Sekolah',
  description: `Perjalanan dan tonggak berdirinya ${sekolah.nama} dari 2004 hingga kini.`,
  alternates: { canonical: '/sejarah' },
};

export default function SejarahPage() {
  return (
    <>
      <PageHero
        title="Sejarah Sekolah"
        description={sejarah.ringkasan}
        breadcrumb={[
          { label: 'Beranda', href: '/' },
          { label: 'Profil', href: '/profil' },
          { label: 'Sejarah' },
        ]}
        image={images.hero.profil as string}
      />

      {/* Pengantar */}
      <section className="section">
        <div className="container-content grid items-start gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SectionHeading
              eyebrow="Perjalanan"
              title="Tonggak Perjalanan Sekolah"
              as="h2"
            />
            <p className="mt-4 text-slate-600">
              Setiap tahun membawa cerita dan capaian tersendiri. Berikut tonggak-tonggak
              penting yang membentuk identitas {sekolah.namaSingkat} hari ini.
            </p>
            <ul className="mt-6 space-y-3">
              {sejarah.timeline.map((t) => (
                <li key={t.tahun} className="flex items-center gap-3 text-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                    {t.tahun}
                  </span>
                  <span className="text-slate-600">{t.judul}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="prose-content lg:col-span-2">
            {sejarah.timeline.map((t, i) => (
              <article
                key={t.tahun}
                className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row"
              >
                <div className="sm:w-2/5">
                  <AppImage
                    src={t.gambar}
                    alt={t.judul}
                    aspect="aspect-[16/10]"
                    className="rounded-xl"
                    priority={i === 0}
                  />
                </div>
                <div className="sm:flex-1">
                  <span className="badge">{t.tahun}</span>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">{t.judul}</h3>
                  <p className="mt-2 text-sm text-slate-600">{t.deskripsi}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai luhur */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <SectionHeading
            eyebrow="Nilai Luhur"
            title="Nilai yang Kami Pegang"
            align="center"
            description="Empat pilar nilai yang menjadi fondasi penyelenggaraan pendidikan di sekolah kami."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sejarah.nilaiLuhur.map((n) => (
              <div key={n.nama} className="card p-6 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name={n.ikon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{n.nama}</h3>
                <p className="mt-2 text-sm text-slate-600">{n.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tautan terkait */}
      <section className="section">
        <div className="container-content">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-slate-600">
              Lanjutkan menjelajahi profil sekolah melalui halaman berikut.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/visi-misi" className="btn-outline">
                Visi &amp; Misi
              </Link>
              <Link href="/profil" className="btn-outline">
                Profil Sekolah
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Menjadi Bagian dari Perjalanan Kami"
        description="Bergabunglah dengan SMK Bina Karya Nusantara dan tulis kisah suksesmu bersama kami."
        primary={{ label: 'Info PPDB', href: '/ppdb' }}
        secondary={{ label: 'Lihat Program Keahlian', href: '/program-keahlian' }}
      />
    </>
  );
}

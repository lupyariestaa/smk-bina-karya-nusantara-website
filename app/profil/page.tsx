import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, SectionHeading, CtaBanner } from '@/components/ui';
import { AppImage } from '@/components/AppImage';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { profil, sekolah, statistik, kemitraan, images, heroImage } from '@/lib/data';
import { formatAngka } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Profil Sekolah',
  description: `Profil, sejarah, visi & misi, dan struktur organisasi ${sekolah.nama}.`,
  alternates: { canonical: '/profil' },
};

const identitasUmum = [
  { label: 'Nama Sekolah', value: sekolah.nama },
  { label: 'Jenjang', value: sekolah.jenjang },
  { label: 'Status', value: sekolah.status },
  { label: 'Akreditasi', value: sekolah.akreditasi },
  { label: 'NPSN', value: sekolah.npsn },
  { label: 'Tahun Berdiri', value: String(sekolah.tahunBerdiri) },
  { label: 'Kurikulum', value: sekolah.kurikulum },
  { label: 'Kepala Sekolah', value: sekolah.kepalaSekolah },
];

/** Pintasan ke halaman-halaman profil turunan. */
const pintasanProfil = [
  {
    label: 'Sejarah',
    href: '/sejarah',
    icon: 'clock',
    deskripsi: 'Perjalanan dan tonggak berdirinya sekolah sejak 2004.',
  },
  {
    label: 'Visi & Misi',
    href: '/visi-misi',
    icon: 'target',
    deskripsi: 'Arah, komitmen, dan nilai-nilai pendidikan kami.',
  },
  {
    label: 'Fasilitas & Galeri',
    href: '/fasilitas',
    icon: 'hall',
    deskripsi: 'Sarana prasarana dan galeri kegiatan sekolah.',
  },
  {
    label: 'Struktur Organisasi',
    href: '/struktur',
    icon: 'users',
    deskripsi: 'Susunan pimpinan, guru, dan tenaga kependidikan.',
  },
];

export default function ProfilPage() {
  return (
    <>
      <PageHero
        title="Profil Sekolah"
        description={`Mengenal lebih dekat ${sekolah.nama} — mulai dari sejarah, visi & misi, hingga struktur organisasi.`}
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Profil' }]}
        image={heroImage('profil')}
      />

      {/* Identitas umum */}
      <section className="section">
        <div className="container-content">
          <div className="grid items-start gap-8 lg:grid-cols-3">
            <div className="card flex flex-col items-center p-8 text-center lg:col-span-1">
              <div className="flex h-40 w-40 items-center justify-center">
                <Logo size={160} />
              </div>
              <h2 className="mt-4 text-lg">{sekolah.nama}</h2>
              <p className="mt-1 text-sm text-brand-700">{sekolah.tagline}</p>
              <p className="mt-3 text-xs text-slate-500">
                Akreditasi {sekolah.akreditasi} · NPSN {sekolah.npsn}
              </p>
            </div>
            <div className="lg:col-span-2">
              <SectionHeading
                eyebrow="Identitas"
                title="Identitas Sekolah"
                description="Data resmi sekolah sebagai sumber informasi terpercaya."
              />
              <dl className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {identitasUmum.map((item) => (
                  <div key={item.label} className="card p-5">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Pintasan halaman profil */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <SectionHeading
            eyebrow="Jelajahi"
            title="Kenali Sekolah Lebih Dalam"
            description="Beberapa halaman yang membahas profil sekolah secara lebih rinci."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pintasanProfil.map((p) => (
              <Link key={p.href} href={p.href} className="card group flex flex-col p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900 group-hover:text-brand-700">
                  {p.label}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{p.deskripsi}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                  Lihat
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sambutan kepala sekolah */}
      <section className="section">
        <div className="container-content">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <AppImage
                src={images.struktur.kepalaSekolah}
                alt={profil.sambutanKepalaSekolah.nama}
                aspect="aspect-[4/3]"
                className="mb-4 rounded-2xl"
              />
              <h2 className="text-2xl">Sambutan Kepala Sekolah</h2>
              <p className="mt-2 text-sm text-slate-500">
                {profil.sambutanKepalaSekolah.nama}
                <br />
                {profil.sambutanKepalaSekolah.jabatan}
              </p>
            </div>
            <div className="lg:col-span-2">
              <blockquote className="card p-6 text-slate-600">
                &ldquo;{profil.sambutanKepalaSekolah.isi}&rdquo;
              </blockquote>
              <AppImage
                src={images.struktur.rapat}
                alt="Rapat bersama pimpinan dan guru"
                aspect="aspect-[16/9]"
                className="mt-6 rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <SectionHeading eyebrow="Data" title="Sekolah dalam Angka" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: 'Guru & Tenaga Kependidikan',
                value: statistik.tenagaPendidik.total,
              },
              {
                label: 'Guru Bersertifikat',
                value: statistik.tenagaPendidik.guruBersertifikatPendidik,
              },
              { label: 'Rombongan Belajar', value: statistik.ringkasan.rombonganBelajar },
              { label: 'Rasio Guru : Siswa', value: statistik.ringkasan.rasioGuruSiswa },
            ].map((s) => (
              <div key={s.label} className="card p-5">
                <p className="text-2xl font-bold text-brand-700">
                  {typeof s.value === 'number' ? formatAngka(s.value) : s.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kemitraan */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <SectionHeading
            eyebrow="Kemitraan"
            title="Mitra Industri & Perguruan Tinggi"
            description="Kolaborasi dengan dunia usaha, dunia industri, dan perguruan tinggi."
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="card p-6">
              <h3 className="text-lg">Dunia Usaha & Industri</h3>
              <ul className="mt-4 space-y-2">
                {kemitraan.dudi.map((d) => (
                  <li key={d} className="flex gap-2 text-sm text-slate-600">
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-lg">Perguruan Tinggi</h3>
              <ul className="mt-4 space-y-2">
                {kemitraan.perguruanTinggi.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-slate-600">
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                    />
                    {p}
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 text-lg">Program Kerja Sama</h3>
              <ul className="mt-4 space-y-2">
                {kemitraan.program.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-slate-600">
                    <Icon
                      name="briefcase"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Kenali Program Keahlian Kami"
        description="Temukan jurusan yang sesuai dengan minat dan cita-citamu."
        primary={{ label: 'Lihat Program Keahlian', href: '/program-keahlian' }}
        secondary={{ label: 'Info PPDB', href: '/ppdb' }}
      />
    </>
  );
}

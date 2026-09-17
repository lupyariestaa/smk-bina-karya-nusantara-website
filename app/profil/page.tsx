import type { Metadata } from 'next';
import { PageHero, SectionHeading, CtaBanner } from '@/components/ui';
import { AppImage } from '@/components/AppImage';
import { Icon } from '@/components/Icon';
import {
  profil,
  sekolah,
  strukturList,
  statistik,
  kemitraan,
  images,
  heroImage,
} from '@/lib/data';
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
          <SectionHeading
            eyebrow="Identitas"
            title="Identitas Sekolah"
            description="Data resmi sekolah sebagai sumber informasi terpercaya."
          />
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </section>

      {/* Sambutan kepala sekolah */}
      <section className="section bg-slate-50">
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

      {/* Sejarah */}
      <section id="sejarah" className="section scroll-mt-24">
        <div className="container-content grid gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading eyebrow="Sejarah" title="Perjalanan Sekolah" as="h2" />
          </div>
          <div className="prose-content lg:col-span-2">
            {profil.sejarah.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section id="visi-misi" className="section scroll-mt-24 bg-slate-50">
        <div className="container-content">
          <SectionHeading
            eyebrow="Visi & Misi"
            title="Arah dan Komitmen Sekolah"
            align="center"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="card border-brand-200 bg-white p-6 text-center">
              <Icon name="target" className="mx-auto h-8 w-8 text-brand-600" />
              <h3 className="mt-3 text-xl">Visi</h3>
              <p className="mt-2 text-slate-600">{profil.visi}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-xl">Misi</h3>
              <ol className="mt-4 space-y-3">
                {profil.misi.map((m, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-600">{m}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="text-xl">Tujuan</h3>
              <ul className="mt-4 space-y-3">
                {profil.tujuan.map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <Icon
                      name="check"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                    />
                    <span className="text-sm text-slate-600">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="section">
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

      {/* Struktur organisasi */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <SectionHeading
            eyebrow="Struktur"
            title="Struktur Organisasi"
            description="Susunan pimpinan dan penanggung jawab program keahlian."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {strukturList.map((s) => (
              <li key={s.jabatan} className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {s.jabatan}
                </p>
                <p className="mt-1 font-semibold text-slate-900">{s.nama}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kemitraan */}
      <section className="section">
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

import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { SectionHeading, CtaBanner, IconBadge } from '@/components/ui';
import {
  sekolah,
  jurusanList,
  prestasiList,
  statistik,
  getBeritaTerbaru,
  getPengumumanPpdbTerbaru,
} from '@/lib/data';
import { formatTanggal, formatAngka } from '@/lib/utils';

export default function HomePage() {
  const berita = getBeritaTerbaru(3);
  const pengumuman = getPengumumanPpdbTerbaru(2);

  const stats = [
    { label: 'Program Keahlian', value: `${statistik.ringkasan.jumlahJurusan}` },
    { label: 'Siswa Aktif', value: formatAngka(statistik.ringkasan.siswaAktifTerbaru) },
    {
      label: 'Tenaga Pendidik & Kependidikan',
      value: `${statistik.tenagaPendidik.total}`,
    },
    { label: 'Akreditasi', value: sekolah.akreditasi },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <span className="badge">
              Akreditasi {sekolah.akreditasi} · NPSN {sekolah.npsn}
            </span>
            <h1 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {sekolah.nama}
            </h1>
            <p className="mt-4 text-lg font-medium text-brand-700">{sekolah.tagline}</p>
            <p className="mt-4 text-slate-600">{sekolah.deskripsiSingkat}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ppdb" className="btn-primary">
                Informasi PPDB
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link href="/profil" className="btn-outline">
                Tentang Sekolah
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card p-5">
                <p className="text-2xl font-bold text-brand-700 sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM KEAHLIAN */}
      <section className="section">
        <div className="container-content">
          <SectionHeading
            eyebrow="Program Keahlian"
            title="6 Jurusan Unggulan"
            description="Pilih program keahlian yang sesuai minat dan bakatmu, dengan pembelajaran berbasis kebutuhan industri."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jurusanList.map((j) => (
              <Link
                key={j.slug}
                href={`/program-keahlian/${j.slug}`}
                className="card group flex flex-col p-6"
              >
                <IconBadge name={j.ikon} />
                <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-700">
                  {j.nama}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {j.singkatan} · {j.bidang}
                </p>
                <p className="mt-3 line-clamp-3 text-sm text-slate-600">{j.deskripsi}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                  Lihat detail
                  <Icon
                    name="chevronRight"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PENGUMUMAN PPDB */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="PPDB"
              title="Informasi Penerimaan Siswa Baru"
              description="Pantau jadwal, persyaratan, dan pengumuman terbaru seputar PPDB."
            />
            <Link href="/ppdb" className="btn-outline">
              Selengkapnya
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {pengumuman.map((p) => (
              <article key={p.id} className="card p-6">
                <p className="text-xs font-medium text-slate-500">
                  {formatTanggal(p.tanggal)}
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{p.judul}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.ringkasan}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRESTASI */}
      <section className="section">
        <div className="container-content">
          <SectionHeading
            eyebrow="Prestasi"
            title="Capaian Siswa & Sekolah"
            description="Berbagai prestasi yang diraih di tingkat kabupaten, provinsi, hingga nasional."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {prestasiList.slice(0, 6).map((p, i) => (
              <li key={`${p.prestasi}-${i}`} className="card flex items-start gap-4 p-5">
                <IconBadge name="trophy" />
                <div>
                  <p className="font-semibold text-slate-900">{p.prestasi}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {p.tingkat} · {p.tahun} · {p.bidang}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BERITA */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Berita"
              title="Berita & Kegiatan Terbaru"
              description="Informasi terkini seputar kegiatan dan pencapaian sekolah."
            />
            <Link href="/berita" className="btn-outline">
              Semua berita
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {berita.map((b) => (
              <Link
                key={b.slug}
                href={`/berita/${b.slug}`}
                className="card flex flex-col p-6"
              >
                <span className="badge w-fit">{b.kategori}</span>
                <h3 className="mt-3 text-lg font-bold text-slate-900 hover:text-brand-700">
                  {b.judul}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{b.ringkasan}</p>
                <p className="mt-4 text-xs text-slate-500">{formatTanggal(b.tanggal)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Siap Bergabung dengan SMK Bina Karya Nusantara?"
        description="Pelajari jalur pendaftaran, jadwal, dan persyaratan PPDB melalui halaman informasi PPDB kami."
        primary={{ label: 'Lihat Info PPDB', href: '/ppdb' }}
        secondary={{ label: 'Hubungi Kami', href: '/kontak' }}
      />
    </>
  );
}

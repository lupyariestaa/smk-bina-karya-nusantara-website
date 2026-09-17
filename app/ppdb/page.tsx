import type { Metadata } from 'next';
import { PageHero, CtaBanner, SectionHeading } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { ppdb, sekolah, heroImage } from '@/lib/data';
import { formatTanggal } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Informasi PPDB',
  description: `Informasi Penerimaan Peserta Didik Baru (PPDB) ${sekolah.nama} tahun ajaran ${ppdb.tahunAjaran}.`,
  alternates: { canonical: '/ppdb' },
};

export default function PpdbPage() {
  const pengumuman = [...ppdb.pengumuman].sort(
    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime(),
  );

  return (
    <>
      <PageHero
        title={`PPDB ${ppdb.tahunAjaran}`}
        description={`Informasi Penerimaan Peserta Didik Baru ${sekolah.nama}. Periode pendaftaran: ${ppdb.periode}.`}
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'PPDB' }]}
        image={heroImage('ppdb')}
      />

      {/* Perhatian penting (tanpa form pendaftaran) */}
      <section className="pt-10">
        <div className="container-content">
          <div className="flex flex-col gap-5 rounded-2xl border border-brand-200 bg-brand-50 p-5 sm:flex-row sm:items-center">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center">
              <Logo size={64} />
            </span>
            <div className="flex items-start gap-3">
              <Icon name="sparkle" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
              <p className="text-sm text-brand-900">
                <strong>Penting:</strong> {ppdb.statusPendaftaran} Halaman ini hanya
                menampilkan informasi dan pengumuman PPDB. Untuk mendaftar, silakan ikuti
                kanal pendaftaran resmi yang diumumkan panitia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pengumuman terbaru */}
      <section className="section">
        <div className="container-content">
          <SectionHeading
            eyebrow="Pengumuman"
            title="Pengumuman Terbaru"
            description="Informasi terkini seputar PPDB."
          />
          <div className="mt-8 space-y-4">
            {pengumuman.map((p) => (
              <article key={p.id} className="card p-6">
                <p className="text-xs font-medium text-slate-500">
                  {formatTanggal(p.tanggal)}
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{p.judul}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.isi}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Jalur pendaftaran */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <SectionHeading eyebrow="Jalur" title="Jalur Pendaftaran" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ppdb.jalur.map((j) => (
              <div key={j.nama} className="card p-5">
                <Icon name="check" className="h-6 w-6 text-brand-600" />
                <h3 className="mt-3 font-bold text-slate-900">{j.nama}</h3>
                <p className="mt-1 text-sm text-slate-600">{j.deskripsi}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Biaya pendaftaran: <strong>{ppdb.biayaPendaftaran}</strong>
          </p>
        </div>
      </section>

      {/* Persyaratan & Alur */}
      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">Persyaratan</h2>
            <ul className="mt-5 space-y-3">
              {ppdb.persyaratan.map((p) => (
                <li key={p} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-sm text-slate-600">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">Alur Pendaftaran</h2>
            <ol className="mt-5 space-y-4">
              {ppdb.alur.map((a) => (
                <li key={a.tahap} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {a.tahap}
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900">{a.judul}</span>
                    <span className="block text-sm text-slate-600">{a.deskripsi}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Jadwal */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <SectionHeading eyebrow="Jadwal" title="Jadwal PPDB" />
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Jadwal Penerimaan Peserta Didik Baru</caption>
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Tahapan
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Waktu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {ppdb.jadwal.map((j) => (
                  <tr key={j.tahap}>
                    <td className="px-4 py-3 font-medium text-slate-800">{j.tahap}</td>
                    <td className="px-4 py-3 text-slate-600">{j.tanggal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Kontak PPDB */}
      <section className="section">
        <div className="container-content">
          <div className="card grid gap-6 p-8 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Icon name="mail" className="mt-0.5 h-5 w-5 text-brand-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email PPDB
                </p>
                <a href={`mailto:${ppdb.kontak.email}`} className="link-underline">
                  {ppdb.kontak.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="phone" className="mt-0.5 h-5 w-5 text-brand-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  WhatsApp
                </p>
                <a
                  href={`https://wa.me/${ppdb.kontak.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {ppdb.kontak.whatsapp}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="phone" className="mt-0.5 h-5 w-5 text-brand-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Telepon
                </p>
                <a href={`tel:${ppdb.kontak.telepon}`} className="link-underline">
                  {ppdb.kontak.telepon}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Masih Ada Pertanyaan Seputar PPDB?"
        description="Hubungi panitia PPDB atau kunjungi sekolah kami untuk informasi lebih lanjut."
        primary={{ label: 'Hubungi Kami', href: '/kontak' }}
        secondary={{ label: 'Lihat Jurusan', href: '/program-keahlian' }}
      />
    </>
  );
}

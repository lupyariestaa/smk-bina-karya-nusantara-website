import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, CtaBanner } from '@/components/ui';
import { AppImage } from '@/components/AppImage';
import { beritaList, prestasiList, sekolah, heroImage } from '@/lib/data';
import { formatTanggal } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Berita & Kegiatan',
  description: `Berita, prestasi, dan kegiatan terbaru di ${sekolah.nama}.`,
  alternates: { canonical: '/berita' },
};

export default function BeritaPage() {
  const berita = [...beritaList].sort(
    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime(),
  );

  return (
    <>
      <PageHero
        title="Berita & Kegiatan"
        description="Ikuti informasi terbaru seputar kegiatan, prestasi, dan pengumuman sekolah."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Berita' }]}
        image={heroImage('berita')}
      />

      <section className="section">
        <div className="container-content grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {berita.map((b) => (
            <Link
              key={b.slug}
              href={`/berita/${b.slug}`}
              className="card group flex flex-col overflow-hidden"
            >
              <AppImage
                src={b.gambar}
                alt={b.judul}
                aspect="aspect-[16/9]"
                imgClassName="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col p-6">
                <span className="badge w-fit">{b.kategori}</span>
                <h2 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-brand-700">
                  {b.judul}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600">
                  {b.ringkasan}
                </p>
                <p className="mt-4 text-xs text-slate-500">
                  {formatTanggal(b.tanggal)} · {b.penulis}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Prestasi */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <h2 className="text-2xl">Prestasi</h2>
          <p className="mt-2 text-slate-600">
            Capaian siswa dan sekolah di berbagai kompetisi.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Daftar prestasi sekolah</caption>
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Tahun
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Prestasi
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Tingkat
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Bidang
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {prestasiList.map((p, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-slate-600">{p.tahun}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{p.prestasi}</td>
                    <td className="px-4 py-3 text-slate-600">{p.tingkat}</td>
                    <td className="px-4 py-3 text-slate-600">{p.bidang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Punya Pertanyaan?"
        description="Hubungi kami untuk informasi lebih lanjut seputar sekolah."
        primary={{ label: 'Hubungi Kami', href: '/kontak' }}
        secondary={{ label: 'Info PPDB', href: '/ppdb' }}
      />
    </>
  );
}

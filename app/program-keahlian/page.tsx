import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, CtaBanner, IconBadge } from '@/components/ui';
import { AppImage } from '@/components/AppImage';
import { Icon } from '@/components/Icon';
import { jurusanList, sekolah, heroImage } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Program Keahlian',
  description: `Daftar program keahlian (jurusan) di ${sekolah.nama}.`,
  alternates: { canonical: '/program-keahlian' },
};

export default function ProgramKeahlianPage() {
  return (
    <>
      <PageHero
        title="Program Keahlian"
        description="Enam program keahlian unggulan yang dirancang sesuai kebutuhan dunia usaha dan dunia industri."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Program Keahlian' }]}
        image={heroImage('programKeahlian')}
      />

      <section className="section">
        <div className="container-content grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jurusanList.map((j) => (
            <Link
              key={j.slug}
              href={`/program-keahlian/${j.slug}`}
              className="card group flex flex-col overflow-hidden"
            >
              {j.gambar && (
                <AppImage
                  src={j.gambar}
                  alt={j.nama}
                  aspect="aspect-[16/10]"
                  imgClassName="transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between">
                  <IconBadge name={j.ikon} />
                  <span className="badge">Akreditasi {j.akreditasi}</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-700">
                  {j.nama}
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {j.singkatan} · {j.bidang} · {j.durasi}
                </p>
                <p className="mt-3 line-clamp-3 text-sm text-slate-600">{j.deskripsi}</p>
                <ul className="mt-4 space-y-1.5">
                  {j.kompetensi.slice(0, 3).map((k) => (
                    <li key={k} className="flex gap-2 text-xs text-slate-600">
                      <Icon
                        name="check"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600"
                      />
                      {k}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                  Selengkapnya
                  <Icon
                    name="chevronRight"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Tertarik dengan Salah Satu Jurusan?"
        description="Pelajari alur dan jadwal pendaftaran pada halaman informasi PPDB."
        primary={{ label: 'Info PPDB', href: '/ppdb' }}
        secondary={{ label: 'Hubungi Kami', href: '/kontak' }}
      />
    </>
  );
}

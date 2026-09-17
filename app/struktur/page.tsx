import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, SectionHeading, CtaBanner } from '@/components/ui';
import { OrgChart } from '@/components/OrgChart';
import { OrgCanvas } from '@/components/OrgCanvas';
import { Icon } from '@/components/Icon';
import { staffStruktur, sekolah, strukturList, images } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Struktur Organisasi',
  description: `Struktur organisasi, pimpinan, guru, dan tenaga kependidikan ${sekolah.nama}.`,
  alternates: { canonical: '/struktur' },
};

/** Legenda setiap level pada bagan. */
const legenda = [
  { level: 1, label: 'Kepala Sekolah' },
  { level: 2, label: 'Wakil Kepala & Kepala Tata Usaha' },
  { level: 3, label: 'Kepala Program & Koordinator' },
  { level: 4, label: 'Guru & Tenaga Kependidikan' },
];

export default function StrukturPage() {
  return (
    <>
      <PageHero
        title="Struktur Organisasi"
        description={staffStruktur.catatan}
        breadcrumb={[
          { label: 'Beranda', href: '/' },
          { label: 'Profil', href: '/profil' },
          { label: 'Struktur Organisasi' },
        ]}
        image={images.hero.profil as string}
      />

      {/* Ringkasan & legenda */}
      <section className="section">
        <div className="container-content">
          <div className="grid items-center gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <SectionHeading
                eyebrow="Struktur"
                title="Bagan Organisasi Sekolah"
                description="Susunan pimpinan, kepala program keahlian, guru, dan tenaga kependidikan yang menjalankan operasional sekolah."
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
              {legenda.map((l) => (
                <div
                  key={l.level}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {l.level}
                  </span>
                  <span className="text-sm text-slate-600">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bagian utama: bagan bercabang */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <SectionHeading
            eyebrow="4 Level"
            title="Hirarki Kepemimpinan & Pelaksana"
            align="center"
            description="Dari Kepala Sekolah hingga guru dan tenaga kependidikan."
          />
          <div className="mt-10">
            <OrgCanvas>
              <OrgChart root={staffStruktur.root} />
            </OrgCanvas>
          </div>
        </div>
      </section>

      {/* Daftar ringkas */}
      <section className="section">
        <div className="container-content">
          <SectionHeading
            eyebrow="Ringkasan"
            title="Daftar Jabatan"
            description="Rekap pejabat struktural sekolah."
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

      {/* Tautan terkait */}
      <section className="section pt-0">
        <div className="container-content">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-slate-600">
              Kenali lebih dekat perjalanan dan nilai-nilai sekolah kami.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/sejarah" className="btn-outline">
                <Icon name="clock" className="h-4 w-4" />
                Sejarah
              </Link>
              <Link href="/visi-misi" className="btn-outline">
                <Icon name="target" className="h-4 w-4" />
                Visi &amp; Misi
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Punya Pertanyaan tentang Sekolah Kami?"
        description="Hubungi kami untuk informasi lebih lanjut mengenai profil dan program sekolah."
        primary={{ label: 'Hubungi Kami', href: '/kontak' }}
        secondary={{ label: 'Info PPDB', href: '/ppdb' }}
      />
    </>
  );
}

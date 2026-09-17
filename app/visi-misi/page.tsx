import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, SectionHeading, CtaBanner } from '@/components/ui';
import { AppImage } from '@/components/AppImage';
import { Icon } from '@/components/Icon';
import { profil, visiMisi, sekolah, images } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Visi & Misi',
  description: `Visi, misi, dan tujuan ${sekolah.nama} dalam menyelenggarakan pendidikan vokasi.`,
  alternates: { canonical: '/visi-misi' },
};

const gambarVisiMisi =
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=70';

export default function VisiMisiPage() {
  return (
    <>
      <PageHero
        title="Visi & Misi"
        description={visiMisi.ringkasan}
        breadcrumb={[
          { label: 'Beranda', href: '/' },
          { label: 'Profil', href: '/profil' },
          { label: 'Visi & Misi' },
        ]}
        image={images.hero.profil as string}
      />

      {/* Visi */}
      <section className="section">
        <div className="container-content grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Visi" title="Visi Sekolah" as="h2" />
            <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-6">
              <Icon name="target" className="h-8 w-8 text-brand-600" />
              <p className="mt-3 text-lg font-medium text-slate-800">
                &ldquo;{visiMisi.visi}&rdquo;
              </p>
            </div>
            <p className="mt-4 text-slate-600">
              Visi ini menjadi arah bersama seluruh warga sekolah dalam setiap proses
              pembelajaran dan pengembangan diri peserta didik.
            </p>
          </div>
          <AppImage
            src={gambarVisiMisi}
            alt="Suasana pembelajaran di kelas"
            aspect="aspect-[4/3]"
            className="rounded-2xl"
            priority
          />
        </div>
      </section>

      {/* Misi */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <SectionHeading
            eyebrow="Misi"
            title={visiMisi.misiJudul}
            description="Langkah nyata untuk mewujudkan visi sekolah."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {profil.misi.map((m, i) => (
              <li key={i} className="card flex gap-4 p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-600">{m}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tujuan */}
      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading eyebrow="Tujuan" title="Tujuan Sekolah" as="h2" />
          </div>
          <ul className="space-y-4 lg:col-span-2">
            {profil.tujuan.map((t, i) => (
              <li key={i} className="card flex gap-4 p-5">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span className="text-slate-600">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nilai */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <SectionHeading
            eyebrow="Nilai"
            title="Nilai-Nilai Sekolah"
            align="center"
            description="Karakter yang kami tanamkan pada setiap peserta didik."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiMisi.nilai.map((n) => (
              <div key={n.nama} className="card p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
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
              Lihat juga perjalanan dan struktur organisasi sekolah kami.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/sejarah" className="btn-outline">
                Sejarah Sekolah
              </Link>
              <Link href="/profil" className="btn-outline">
                Profil Sekolah
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Wujudkan Visi Bersama Kami"
        description="Temukan program keahlian yang sejalan dengan cita-citamu."
        primary={{ label: 'Lihat Program Keahlian', href: '/program-keahlian' }}
        secondary={{ label: 'Info PPDB', href: '/ppdb' }}
      />
    </>
  );
}

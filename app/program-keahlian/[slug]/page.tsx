import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { AppImage } from '@/components/AppImage';
import { CtaBanner, IconBadge } from '@/components/ui';
import { jurusanList, getJurusanBySlug } from '@/lib/data';

export function generateStaticParams() {
  return jurusanList.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const jurusan = getJurusanBySlug(slug);
  if (!jurusan) return { title: 'Program Keahlian Tidak Ditemukan' };
  return {
    title: `${jurusan.nama} (${jurusan.singkatan})`,
    description: jurusan.deskripsi,
    alternates: { canonical: `/program-keahlian/${jurusan.slug}` },
  };
}

export default async function JurusanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const jurusan = getJurusanBySlug(slug);
  if (!jurusan) notFound();

  const lain = jurusanList.filter((j) => j.slug !== jurusan.slug).slice(0, 3);

  return (
    <>
      {/* Hero jurusan */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-brand-950">
        {jurusan.gambar && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={jurusan.gambar}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-900/60" />
          </>
        )}
        <div className="container-content relative py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-brand-100/80">
              <li>
                <Link href="/" className="hover:text-white">
                  Beranda
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <Icon name="chevronRight" className="h-3 w-3 text-brand-200/60" />
                <Link href="/program-keahlian" className="hover:text-white">
                  Program Keahlian
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <Icon name="chevronRight" className="h-3 w-3 text-brand-200/60" />
                <span className="text-white">{jurusan.singkatan}</span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <IconBadge name={jurusan.ikon} />
            <div>
              <h1 className="text-3xl text-white sm:text-4xl">{jurusan.nama}</h1>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                <span className="badge">{jurusan.singkatan}</span>
                <span className="badge">{jurusan.bidang}</span>
                <span className="badge">Durasi {jurusan.durasi}</span>
                <span className="badge">Akreditasi {jurusan.akreditasi}</span>
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-brand-100">{jurusan.deskripsi}</p>
        </div>
      </section>

      {/* Galeri jurusan */}
      {jurusan.galeri && jurusan.galeri.length > 0 && (
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="container-content py-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {jurusan.galeri.map((src, i) => (
                <AppImage
                  key={`${src}-${i}`}
                  src={src}
                  alt={`${jurusan.nama} - foto ${i + 1}`}
                  aspect="aspect-[4/3]"
                  className="rounded-2xl"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Kompetensi */}
            <div>
              <h2 className="text-2xl">Kompetensi yang Dipelajari</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {jurusan.kompetensi.map((k) => (
                  <li
                    key={k}
                    className="flex gap-3 rounded-xl border border-slate-200 p-4"
                  >
                    <Icon
                      name="check"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                    />
                    <span className="text-sm text-slate-600">{k}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mata pelajaran */}
            <div>
              <h2 className="text-2xl">Mata Pelajaran Utama</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {jurusan.mataPelajaran.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prospek karier */}
            <div>
              <h2 className="text-2xl">Prospek Karier</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {jurusan.prospekKarier.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 rounded-xl border border-slate-200 p-4"
                  >
                    <Icon
                      name="briefcase"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                    />
                    <span className="text-sm text-slate-600">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg">Fasilitas Pendukung</h3>
              <ul className="mt-4 space-y-3">
                {jurusan.fasilitasPendukung.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-slate-600">
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card bg-brand-700 p-6 text-white">
              <h3 className="text-lg text-white">Tertarik jurusan ini?</h3>
              <p className="mt-2 text-sm text-brand-100">
                Cek jadwal dan alur pendaftaran pada halaman PPDB.
              </p>
              <Link
                href="/ppdb"
                className="btn mt-4 bg-white text-brand-700 hover:bg-brand-50"
              >
                Info PPDB
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Jurusan lain */}
      <section className="section bg-slate-50">
        <div className="container-content">
          <h2 className="text-2xl">Program Keahlian Lain</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lain.map((j) => (
              <Link
                key={j.slug}
                href={`/program-keahlian/${j.slug}`}
                className="card p-6"
              >
                <IconBadge name={j.ikon} />
                <h3 className="mt-4 font-bold text-slate-900">{j.nama}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {j.singkatan} · {j.bidang}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Wujudkan Masa Depan Bersama Kami"
        description="Bergabunglah dengan SMK Bina Karya Nusantara dan raih kompetensi yang siap kerja."
        primary={{ label: 'Info PPDB', href: '/ppdb' }}
        secondary={{ label: 'Lihat Fasilitas', href: '/fasilitas' }}
      />
    </>
  );
}

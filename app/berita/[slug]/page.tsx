import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { AppImage } from '@/components/AppImage';
import { CtaBanner } from '@/components/ui';
import { beritaList, getBeritaBySlug } from '@/lib/data';
import { formatTanggal } from '@/lib/utils';

export function generateStaticParams() {
  return beritaList.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const berita = getBeritaBySlug(slug);
  if (!berita) return { title: 'Berita Tidak Ditemukan' };
  return {
    title: berita.judul,
    description: berita.ringkasan,
    alternates: { canonical: `/berita/${berita.slug}` },
    openGraph: {
      title: berita.judul,
      description: berita.ringkasan,
      type: 'article',
      publishedTime: berita.tanggal,
    },
  };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const berita = getBeritaBySlug(slug);
  if (!berita) notFound();

  const lain = beritaList.filter((b) => b.slug !== berita.slug).slice(0, 3);

  return (
    <>
      <article>
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="container-content py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
                <li>
                  <Link href="/" className="hover:text-brand-700">
                    Beranda
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <Icon name="chevronRight" className="h-3 w-3 text-slate-400" />
                  <Link href="/berita" className="hover:text-brand-700">
                    Berita
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <Icon name="chevronRight" className="h-3 w-3 text-slate-400" />
                  <span className="line-clamp-1 text-slate-700">{berita.judul}</span>
                </li>
              </ol>
            </nav>
            <span className="badge">{berita.kategori}</span>
            <h1 className="mt-3 max-w-3xl text-3xl sm:text-4xl">{berita.judul}</h1>
            <p className="mt-4 text-sm text-slate-500">
              {formatTanggal(berita.tanggal)} · {berita.penulis}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container-content max-w-3xl">
            <AppImage
              src={berita.gambar}
              alt={berita.judul}
              aspect="aspect-[16/9]"
              priority
              className="mb-8 rounded-2xl"
            />
            <div className="prose-content">
              {berita.isi.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-slate-200 pt-6">
              <Link href="/berita" className="btn-outline">
                <Icon name="chevronRight" className="h-4 w-4 rotate-180" />
                Kembali ke daftar berita
              </Link>
            </div>
          </div>
        </section>
      </article>

      {lain.length > 0 && (
        <section className="section bg-slate-50">
          <div className="container-content">
            <h2 className="text-2xl">Berita Lainnya</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {lain.map((b) => (
                <Link
                  key={b.slug}
                  href={`/berita/${b.slug}`}
                  className="card group overflow-hidden"
                >
                  <AppImage
                    src={b.gambar}
                    alt={b.judul}
                    aspect="aspect-[16/9]"
                    imgClassName="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <span className="badge w-fit">{b.kategori}</span>
                    <h3 className="mt-3 font-bold text-slate-900 group-hover:text-brand-700">
                      {b.judul}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {b.ringkasan}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title="Ikuti Terus Update Sekolah"
        description="Dapatkan informasi terbaru seputar kegiatan dan PPDB sekolah."
        primary={{ label: 'Info PPDB', href: '/ppdb' }}
        secondary={{ label: 'Kontak', href: '/kontak' }}
      />
    </>
  );
}

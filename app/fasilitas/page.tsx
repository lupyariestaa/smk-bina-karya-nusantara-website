import type { Metadata } from 'next';
import { PageHero, CtaBanner } from '@/components/ui';
import { FasilitasGaleri } from '@/components/FasilitasGaleri';
import { Icon } from '@/components/Icon';
import { fasilitasList, galeriList, ekstrakurikulerList, sekolah } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Fasilitas & Galeri',
  description: `Fasilitas, galeri, dan ekstrakurikuler di ${sekolah.nama}.`,
  alternates: { canonical: '/fasilitas' },
};

export default function FasilitasPage() {
  return (
    <>
      <PageHero
        title="Fasilitas & Galeri"
        description="Sarana dan prasarana pendukung pembelajaran, serta dokumentasi kegiatan sekolah."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Fasilitas & Galeri' }]}
      />

      <section className="section">
        <div className="container-content">
          <FasilitasGaleri fasilitas={fasilitasList} galeri={galeriList} />
        </div>
      </section>

      {/* Ekstrakurikuler */}
      <section id="ekstrakurikuler" className="section scroll-mt-24 bg-slate-50">
        <div className="container-content">
          <h2 className="text-2xl">Ekstrakurikuler</h2>
          <p className="mt-2 text-slate-600">
            Berbagai kegiatan pengembangan bakat, minat, dan karakter siswa.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ekstrakurikulerList.map((e) => (
              <li key={e.nama} className="card p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-slate-900">{e.nama}</h3>
                  <span className="badge shrink-0">{e.kategori}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{e.deskripsi}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <Icon name="sparkle" className="h-4 w-4 text-brand-600" />
            Pramuka merupakan ekstrakurikuler wajib bagi seluruh siswa.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Ingin Melihat Langsung Suasana Sekolah?"
        description="Silakan berkunjung atau hubungi kami untuk informasi lebih lanjut."
        primary={{ label: 'Hubungi Kami', href: '/kontak' }}
        secondary={{ label: 'Info PPDB', href: '/ppdb' }}
      />
    </>
  );
}

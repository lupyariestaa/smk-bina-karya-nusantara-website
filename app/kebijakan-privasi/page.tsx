import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { sekolah } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: `Kebijakan privasi website ${sekolah.nama}.`,
  alternates: { canonical: '/kebijakan-privasi' },
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <PageHero
        title="Kebijakan Privasi"
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Kebijakan Privasi' }]}
        description="Komitmen kami dalam menjaga privasi pengunjung website."
      />
      <section className="section">
        <div className="container-content prose-content max-w-3xl">
          <h2 className="text-xl">1. Informasi Umum</h2>
          <p>
            Website {sekolah.nama} ini bersifat statis dan tidak menyimpan data pribadi
            pengunjung pada server kami. Kami tidak memiliki form pendaftaran maupun
            sistem login.
          </p>

          <h2 className="text-xl">2. Data yang Dikumpulkan</h2>
          <p>
            Kami tidak mengumpulkan data pribadi secara langsung. Apabila Anda menghubungi
            kami melalui email, telepon, atau WhatsApp, data yang Anda kirimkan hanya
            digunakan untuk menjawab pertanyaan Anda.
          </p>

          <h2 className="text-xl">3. Pihak Ketiga</h2>
          <p>
            Website ini dapat memuat layanan pihak ketiga seperti peta lokasi (Google
            Maps) dan tautan media sosial. Layanan tersebut memiliki kebijakan privasi
            tersendiri.
          </p>

          <h2 className="text-xl">4. Perubahan Kebijakan</h2>
          <p>
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan
            akan ditampilkan pada halaman ini.
          </p>

          <h2 className="text-xl">5. Kontak</h2>
          <p>
            Pertanyaan terkait kebijakan privasi dapat disampaikan ke{' '}
            <a href={`mailto:${sekolah.kontak.email}`} className="link-underline">
              {sekolah.kontak.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

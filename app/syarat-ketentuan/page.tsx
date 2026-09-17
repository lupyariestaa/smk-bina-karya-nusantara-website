import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { sekolah } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: `Syarat dan ketentuan penggunaan website ${sekolah.nama}.`,
  alternates: { canonical: '/syarat-ketentuan' },
};

export default function SyaratKetentuanPage() {
  return (
    <>
      <PageHero
        title="Syarat & Ketentuan"
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Syarat & Ketentuan' }]}
        description="Ketentuan penggunaan website resmi sekolah."
      />
      <section className="section">
        <div className="container-content prose-content max-w-3xl">
          <h2 className="text-xl">1. Penerimaan Ketentuan</h2>
          <p>
            Dengan mengakses dan menggunakan website {sekolah.nama}, Anda dianggap telah
            membaca, memahami, dan menyetujui syarat dan ketentuan ini.
          </p>

          <h2 className="text-xl">2. Penggunaan Konten</h2>
          <p>
            Seluruh konten pada website ini (teks, gambar, dan informasi) disediakan untuk
            keperluan informasi. Konten tidak boleh disalahgunakan untuk tujuan yang
            melanggar hukum.
          </p>

          <h2 className="text-xl">3. Informasi PPDB</h2>
          <p>
            Informasi PPDB yang ditampilkan bersifat informatif. Pendaftaran resmi
            dilakukan melalui kanal yang diumumkan oleh panitia PPDB sekolah. Website ini
            tidak menyediakan form pendaftaran online.
          </p>

          <h2 className="text-xl">4. Batasan Tanggung Jawab</h2>
          <p>
            Kami berupaya menyajikan informasi yang akurat, namun tidak bertanggung jawab
            atas ketidakakuratan atau perubahan informasi yang terjadi setelah publikasi.
          </p>

          <h2 className="text-xl">5. Perubahan Ketentuan</h2>
          <p>
            Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Versi terbaru
            akan dipublikasikan pada halaman ini.
          </p>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { Icon } from '@/components/Icon';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-content flex flex-col items-center justify-center py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Icon name="search" className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-4xl">404</h1>
        <p className="mt-3 max-w-md text-slate-600">
          Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Kembali ke Beranda
          </Link>
          <Link href="/kontak" className="btn-outline">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}

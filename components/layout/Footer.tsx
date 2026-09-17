import Link from 'next/link';
import { sekolah, jurusanList } from '@/lib/data';
import { navItems, legalItems } from '@/lib/nav';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';

export function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-content grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center">
              <Logo size={48} />
            </span>
            <span className="font-bold text-slate-900">{sekolah.namaSingkat}</span>
          </div>
          <p className="mt-4 text-sm text-slate-600">{sekolah.deskripsiSingkat}</p>
          <p className="mt-4 text-xs text-slate-500">
            Akreditasi {sekolah.akreditasi} · NPSN {sekolah.npsn}
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Navigasi</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-600 hover:text-brand-700">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Jurusan */}
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Program Keahlian</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {jurusanList.map((j) => (
              <li key={j.slug}>
                <Link
                  href={`/program-keahlian/${j.slug}`}
                  className="text-slate-600 hover:text-brand-700"
                >
                  {j.singkatan} — {j.bidang}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Kontak</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex gap-2">
              <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>
                {sekolah.alamat.jalan}, {sekolah.alamat.kecamatan},{' '}
                {sekolah.alamat.kabupaten}, {sekolah.alamat.provinsi}{' '}
                {sekolah.alamat.kodePos}
              </span>
            </li>
            <li className="flex gap-2">
              <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <a href={`tel:${sekolah.kontak.telepon}`} className="hover:text-brand-700">
                {sekolah.kontak.telepon}
              </a>
            </li>
            <li className="flex gap-2">
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <a href={`mailto:${sekolah.kontak.email}`} className="hover:text-brand-700">
                {sekolah.kontak.email}
              </a>
            </li>
          </ul>
          <ul className="mt-4 flex flex-wrap gap-2">
            {sekolah.sosialMedia.map((s) => (
              <li key={s.nama}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-brand-500 hover:text-brand-700"
                >
                  {s.nama}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-content flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; {tahun} {sekolah.nama}. Seluruh hak cipta dilindungi.
          </p>
          <ul className="flex gap-4">
            {legalItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-700">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/utils';
import type { Fasilitas, GaleriItem } from '@/lib/types';

export function FasilitasGaleri({
  fasilitas,
  galeri,
}: {
  fasilitas: Fasilitas[];
  galeri: GaleriItem[];
}) {
  const kategoriFasilitas = useMemo(
    () => ['Semua', ...Array.from(new Set(fasilitas.map((f) => f.kategori)))],
    [fasilitas],
  );
  const kategoriGaleri = useMemo(
    () => ['Semua', ...Array.from(new Set(galeri.map((g) => g.kategori)))],
    [galeri],
  );

  const [fFasilitas, setFFasilitas] = useState('Semua');
  const [fGaleri, setFGaleri] = useState('Semua');
  const [active, setActive] = useState<GaleriItem | null>(null);

  const fasilitasTampil =
    fFasilitas === 'Semua'
      ? fasilitas
      : fasilitas.filter((f) => f.kategori === fFasilitas);

  const galeriTampil =
    fGaleri === 'Semua' ? galeri : galeri.filter((g) => g.kategori === fGaleri);

  return (
    <div className="space-y-16">
      {/* Fasilitas */}
      <div>
        <h2 className="text-2xl">Fasilitas Sekolah</h2>
        <p className="mt-2 text-slate-600">
          Sarana dan prasarana yang mendukung kegiatan belajar dan praktik siswa.
        </p>

        <div
          className="mt-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter kategori fasilitas"
        >
          {kategoriFasilitas.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFFasilitas(k)}
              aria-pressed={fFasilitas === k}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                fFasilitas === k
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-slate-300 text-slate-600 hover:border-brand-500 hover:text-brand-700',
              )}
            >
              {k}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fasilitasTampil.map((f) => (
            <li key={f.nama} className="card flex items-start gap-4 p-5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={f.ikon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-slate-900">
                  {f.nama} <span className="text-slate-400">· {f.jumlah}</span>
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-brand-600">
                  {f.kategori}
                </p>
                <p className="mt-1 text-sm text-slate-600">{f.keterangan}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Galeri */}
      <div>
        <h2 className="text-2xl">Galeri</h2>
        <p className="mt-2 text-slate-600">
          Dokumentasi fasilitas dan kegiatan di lingkungan sekolah.
        </p>

        <div
          className="mt-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter kategori galeri"
        >
          {kategoriGaleri.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFGaleri(k)}
              aria-pressed={fGaleri === k}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                fGaleri === k
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-slate-300 text-slate-600 hover:border-brand-500 hover:text-brand-700',
              )}
            >
              {k}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galeriTampil.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => setActive(g)}
                className="card group block w-full overflow-hidden text-left"
                aria-label={`Perbesar ${g.judul}`}
              >
                <span className="block aspect-[4/3] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.src}
                    alt={g.judul}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="block p-4">
                  <span className="badge">{g.kategori}</span>
                  <span className="mt-2 block font-semibold text-slate-900">
                    {g.judul}
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">{g.deskripsi}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.judul}
          onClick={() => setActive(null)}
        >
          <div
            className="max-w-3xl overflow-hidden rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.judul}
              className="max-h-[70vh] w-full object-contain"
            />
            <div className="flex items-start justify-between gap-4 p-4">
              <div>
                <h3 className="font-bold text-slate-900">{active.judul}</h3>
                <p className="text-sm text-slate-600">{active.deskripsi}</p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Tutup"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

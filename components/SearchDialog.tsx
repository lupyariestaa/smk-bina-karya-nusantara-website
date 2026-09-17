'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/utils';

export interface SearchEntry {
  title: string;
  href: string;
  category: string;
  text: string;
}

/**
 * Pencarian client-side sederhana atas indeks konten (PRD F-05).
 * Pencarian substring case-insensitive pada judul + isi.
 */
export function SearchDialog({
  entries,
  open,
  onClose,
}: {
  entries: SearchEntry[];
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return entries
      .filter(
        (e) => e.title.toLowerCase().includes(q) || e.text.toLowerCase().includes(q),
      )
      .slice(0, 12);
  }, [entries, query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 p-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4">
          <Icon name="search" className="h-5 w-5 text-slate-400" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari jurusan, berita, fasilitas…"
            className="w-full bg-transparent py-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            aria-label="Kata kunci pencarian"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Tutup pencarian"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-400">
              Ketik minimal 2 karakter untuk mulai mencari.
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-400">
              Tidak ada hasil untuk &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((r) => (
                <li key={r.href + r.title}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-brand-50"
                  >
                    <span className="mt-0.5 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {r.category}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-800">
                        {r.title}
                      </span>
                      <span className="block truncate text-xs text-slate-500">
                        {r.text}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export function SearchButton({
  entries,
  className,
}: {
  entries: SearchEntry[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-500 hover:border-brand-500 hover:text-brand-700',
          className,
        )}
        aria-label="Buka pencarian"
      >
        <Icon name="search" className="h-4 w-4" />
        <span className="hidden lg:inline">Cari…</span>
      </button>
      <SearchDialog entries={entries} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

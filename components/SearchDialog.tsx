'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/utils';

export interface SearchEntry {
  title: string;
  href: string;
  category: string;
  text: string;
}

/** Potong deskripsi agar tidak terlalu panjang di daftar hasil. */
function trimText(text: string, max = 100) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

/**
 * Pencarian client-side sederhana atas indeks konten (PRD F-05).
 * Pencarian substring case-insensitive pada judul + isi.
 * Mendukung navigasi keyboard (↑/↓ + Enter) dan Esc untuk menutup.
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
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  // Reset & fokus saat dibuka.
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Kunci scroll body + kembalikan fokus saat ditutup.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return entries
      .filter(
        (e) => e.title.toLowerCase().includes(q) || e.text.toLowerCase().includes(q),
      )
      .slice(0, 12);
  }, [entries, query]);

  // Jaga indeks terpilih tetap valid saat hasil berubah.
  useEffect(() => {
    setSelected(0);
  }, [query]);

  const goTo = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  // Navigasi keyboard.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (results.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((i) => (i + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((i) => (i - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        goTo(results[selected].href);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, results, selected, onClose, goTo]);

  // Scroll item terpilih agar selalu terlihat.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${selected}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian"
      onClick={onClose}
    >
      <div
        className="animate-dropdown-in flex max-h-[calc(100dvh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-slate-900/5 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4">
          <Icon name="search" className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari jurusan, berita, fasilitas…"
            className="w-full bg-transparent py-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Kata kunci pencarian"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-autocomplete="list"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold text-slate-400 ring-1 ring-slate-200 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Tutup pencarian"
          >
            Esc
          </button>
        </div>

        <div className="min-h-0 max-h-[60dvh] overflow-y-auto overscroll-contain p-2">
          {query.trim().length < 2 ? (
            <div className="px-3 py-8 text-center">
              <p className="text-sm text-slate-400">
                Ketik minimal 2 karakter untuk mulai mencari.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans">
                    ↑
                  </kbd>
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans">
                    ↓
                  </kbd>
                  untuk menjelajah
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans">
                    Enter
                  </kbd>
                  untuk membuka
                </span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-400">
              Tidak ada hasil untuk &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <ul id="search-results" ref={listRef} role="listbox" className="space-y-1">
              {results.map((r, i) => (
                <li
                  key={r.href + r.title}
                  data-index={i}
                  role="option"
                  aria-selected={i === selected}
                >
                  <button
                    type="button"
                    onClick={() => goTo(r.href)}
                    onMouseEnter={() => setSelected(i)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                      i === selected ? 'bg-brand-50' : 'hover:bg-slate-50',
                    )}
                  >
                    <span className="mt-0.5 shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {r.category}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-800">
                        {r.title}
                      </span>
                      <span className="block truncate text-xs text-slate-500">
                        {trimText(r.text)}
                      </span>
                    </span>
                    {i === selected && (
                      <Icon
                        name="arrowRight"
                        className="ml-auto mt-1 h-4 w-4 shrink-0 text-brand-600"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-slate-200 px-4 py-2.5 text-[11px] text-slate-400">
          <span>Pencarian konten situs</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans">
              Esc
            </kbd>
            untuk menutup
          </span>
        </div>
      </div>
    </div>,
    document.body,
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

  // Pintasan global Ctrl/Cmd + K untuk membuka pencarian.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
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
          'group inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white pl-3 pr-2 text-sm text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-700',
          className,
        )}
        aria-label="Buka pencarian"
      >
        <Icon name="search" className="h-4 w-4" />
        <span className="hidden lg:inline">Cari</span>
        <kbd className="ml-1 hidden items-center gap-0.5 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-slate-400 lg:inline-flex">
          Ctrl
          <span className="text-slate-300">+</span>K
        </kbd>
      </button>
      <SearchDialog entries={entries} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

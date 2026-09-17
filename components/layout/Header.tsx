'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/nav';
import { sekolah } from '@/lib/data';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { SearchButton } from '@/components/SearchDialog';
import { cn } from '@/lib/utils';
import type { SearchEntry } from '@/components/SearchDialog';

export function Header({ searchEntries }: { searchEntries?: SearchEntry[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const entries = searchEntries ?? [];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Logo / brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${sekolah.nama} - Beranda`}
        >
          <span className="flex h-11 w-11 items-center justify-center">
            <Logo size={44} priority />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-slate-900 sm:text-base">
              {sekolah.namaSingkat}
            </span>
            <span className="hidden text-[11px] text-slate-500 sm:block">{sekolah.nama}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {entries.length > 0 && <SearchButton entries={entries} />}
          <Link href="/ppdb" className="btn-primary hidden sm:inline-flex">
            Info PPDB
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-600 xl:hidden"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          id="menu-mobile"
          aria-label="Navigasi mobile"
          className="border-t border-slate-200 bg-white xl:hidden"
        >
          <ul className="container-content flex flex-col py-3">
            {navItems.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'block rounded-lg px-3 py-3 text-sm font-medium',
                      active
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-700 hover:bg-slate-100',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2">
              <Link href="/ppdb" className="btn-primary w-full">
                Info PPDB
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

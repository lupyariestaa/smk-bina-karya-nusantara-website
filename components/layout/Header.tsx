'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { directNavItems, navGroups } from '@/lib/nav';
import { sekolah } from '@/lib/data';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { SearchButton } from '@/components/SearchDialog';
import { NavDropdown } from '@/components/layout/NavDropdown';
import { cn, isPathActive, isRealPageLink } from '@/lib/utils';
import type { SearchEntry } from '@/components/SearchDialog';

export function Header({ searchEntries }: { searchEntries?: SearchEntry[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
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
            <span className="hidden text-[11px] text-slate-500 sm:block">
              {sekolah.nama}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 xl:flex">
          {directNavItems.map((item) => {
            const active = isPathActive(pathname, item.href);
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
          {navGroups.map((group) => (
            <NavDropdown key={group.label} group={group} />
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {entries.length > 0 && <SearchButton entries={entries} />}
          <Link
            href="/ppdb"
            className="btn-primary hidden h-10 shrink-0 whitespace-nowrap sm:inline-flex"
          >
            Info PPDB
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 xl:hidden"
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
          className="animate-menu-in max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 bg-white xl:hidden"
        >
          <ul className="container-content flex flex-col py-3">
            {directNavItems.map((item) => {
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

            {navGroups.map((group) => {
              const isOpen = openGroup === group.label;
              const groupActive = group.items.some(
                (item) => isRealPageLink(item.href) && isPathActive(pathname, item.href),
              );
              return (
                <li key={group.label} className="border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    aria-expanded={isOpen}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium',
                      groupActive ? 'text-brand-700' : 'text-slate-700',
                    )}
                  >
                    {group.label}
                    <Icon
                      name="chevronRight"
                      className={cn(
                        'h-4 w-4 rotate-90 transition-transform duration-200',
                        isOpen && 'rotate-[270deg]',
                      )}
                    />
                  </button>
                  {isOpen && (
                    <ul className="animate-menu-in mb-1 ml-3 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
                      {group.items.map((item) => {
                        const active =
                          isRealPageLink(item.href) && isPathActive(pathname, item.href);
                        return (
                          <li key={`${group.label}-${item.href}`}>
                            <Link
                              href={item.href}
                              aria-current={active ? 'page' : undefined}
                              className={cn(
                                'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm',
                                active
                                  ? 'bg-brand-50 font-medium text-brand-700'
                                  : 'text-slate-600 hover:bg-slate-50',
                              )}
                            >
                              {item.icon && (
                                <Icon
                                  name={item.icon}
                                  className="h-4 w-4 text-brand-600"
                                />
                              )}
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
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

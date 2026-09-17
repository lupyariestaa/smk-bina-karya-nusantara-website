'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { cn, isPathActive, isRealPageLink } from '@/lib/utils';
import type { NavGroup } from '@/lib/nav';

/**
 * Grup navigasi desktop dengan dropdown.
 * Muncul saat di-hover atau saat salah satu elemen di dalamnya menerima fokus
 * (dukungan keyboard). Animasi halus menggunakan `animate-dropdown-in`.
 */
export function NavDropdown({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const triggerClasses =
    'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900';

  const triggerContent = (
    <>
      {group.label}
      <Icon
        name="chevronRight"
        className="h-3.5 w-3.5 rotate-90 transition-transform duration-200 group-hover/nav:rotate-[270deg]"
      />
    </>
  );

  return (
    <div className="group/nav relative">
      {group.href ? (
        <Link
          href={group.href}
          className={triggerClasses}
          aria-current={pathname === group.href ? 'page' : undefined}
        >
          {triggerContent}
        </Link>
      ) : (
        <button type="button" className={triggerClasses} aria-haspopup="true">
          {triggerContent}
        </button>
      )}

      {/* Jembatan hover: mencegah dropdown hilang saat kursor berpindah dari trigger */}
      <span aria-hidden="true" className="absolute left-0 top-full h-3 w-full" />

      {/* Panel dropdown */}
      <div
        className={cn(
          'invisible absolute left-0 top-full z-50 w-72 pt-3 opacity-0 transition-all duration-200',
          'translate-y-1 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100',
          'group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100',
        )}
      >
        <ul className="animate-dropdown-in overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5">
          {group.items.map((item) => {
            const active = isRealPageLink(item.href) && isPathActive(pathname, item.href);
            return (
              <li key={`${group.label}-${item.href}`}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover/item:bg-brand-100">
                    {item.icon && <Icon name={item.icon} className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-800">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                        {item.description}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-600">
          {eyebrow}
        </p>
      )}
      <Tag className="text-2xl sm:text-3xl lg:text-4xl">{title}</Tag>
      {description && <p className="mt-3 text-slate-600">{description}</p>}
    </div>
  );
}

/** Hero standar untuk halaman dalam (selain beranda). */
export function PageHero({
  title,
  description,
  breadcrumb,
}: {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="container-content py-12 sm:py-16">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
              {breadcrumb.map((b, i) => (
                <li key={b.label} className="flex items-center gap-1">
                  {i > 0 && (
                    <Icon name="chevronRight" className="h-3 w-3 text-slate-400" />
                  )}
                  {b.href ? (
                    <Link href={b.href} className="hover:text-brand-700">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-slate-700">{b.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-slate-600">{description}</p>}
      </div>
    </section>
  );
}

/** Kartu CTA di akhir halaman. */
export function CtaBanner({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section">
      <div className="container-content">
        <div className="rounded-3xl bg-brand-700 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl text-white sm:text-3xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-100">{description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={primary.href}
              className="btn bg-white text-brand-700 hover:bg-brand-50"
            >
              {primary.label}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="btn border border-white/40 text-white hover:bg-white/10"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function IconBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
      <Icon name={name} className="h-6 w-6" />
    </span>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-content">{children}</div>;
}

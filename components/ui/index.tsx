import type { ReactNode } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
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
  image,
}: {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-brand-950">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-900/60" />
        </>
      )}
      <div className="container-content relative py-12 sm:py-20">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-brand-100/80">
              {breadcrumb.map((b, i) => (
                <li key={b.label} className="flex items-center gap-1">
                  {i > 0 && (
                    <Icon name="chevronRight" className="h-3 w-3 text-brand-200/60" />
                  )}
                  {b.href ? (
                    <Link href={b.href} className="hover:text-white">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-white">{b.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {/* Logo di samping judul, hanya saat ada gambar latar */}
        {image && (
          <div className="mb-4 inline-flex items-center gap-3">
            <Logo size={56} />
            <span className="text-sm font-medium text-brand-100">
              SMK Bina Karya Nusantara
            </span>
          </div>
        )}
        <h1
          className={cn(
            'max-w-3xl text-3xl sm:text-4xl lg:text-5xl',
            image && 'text-white',
          )}
        >
          {title}
        </h1>
        {description && (
          <p className={cn('mt-4 max-w-2xl', image ? 'text-brand-100' : 'text-slate-600')}>
            {description}
          </p>
        )}
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
        <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-12 text-center sm:px-12">
          {/* Watermark logo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 opacity-10 sm:-right-4 sm:-top-6"
          >
            <Logo size={220} />
          </span>
          <div className="relative">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 p-3 ring-1 ring-white/20 backdrop-blur">
              <Logo size={56} />
            </div>
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

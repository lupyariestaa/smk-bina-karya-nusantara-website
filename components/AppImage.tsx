import { cn } from '@/lib/utils';

/**
 * Gambar sederhana berbasis <img> dengan lazy-loading & aspect ratio.
 * Dipakai alih-alih next/image agar tidak butuh optimasi server (sharp),
 * cocok untuk static site dengan aset lokal di /public.
 */
export function AppImage({
  src,
  alt,
  className,
  imgClassName,
  aspect = 'aspect-[4/3]',
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspect?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn('block overflow-hidden bg-slate-100', aspect, className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </span>
  );
}

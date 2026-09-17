import { cn } from '@/lib/utils';

/**
 * Logo sekolah. Menggunakan PNG transparan lokal.
 * `size` default 40px untuk header/footer.
 */
export function Logo({
  size = 40,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-256.png"
      alt="Logo SMK Bina Karya Nusantara"
      width={size}
      height={size}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('h-auto w-auto select-none object-contain', className)}
      style={{ width: size, height: size }}
    />
  );
}

/**
 * Logo versi besar untuk hero beranda.
 * Logo melayang bebas (tanpa kotak) dengan glow lembut di belakangnya.
 * Tanpa badge dan tanpa efek pada gambar (statis).
 */
export function Logo3D() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Glow di belakang logo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-90 rounded-full bg-brand-500/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-75 rounded-full bg-brand-300/20 blur-2xl"
        />

        {/* Logo */}
        <div className="relative mx-auto aspect-square w-3/4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-512.png"
            alt="Logo SMK Bina Karya Nusantara"
            width={512}
            height={512}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

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
 * Logo versi besar dengan efek 3D perspektif (untuk hero beranda).
 * Efek dibangun murni dengan CSS (transform 3D, glow, ring, bayangan).
 */
export function Logo3D() {
  return (
    <div className="flex items-center justify-center [perspective:1200px]">
      <div className="group relative w-full max-w-md">
        {/* Glow di belakang logo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-90 rounded-full bg-brand-500/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-75 rounded-full bg-brand-300/20 blur-2xl"
        />

        {/* Cincin berputar pelan */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-brand-300/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-6 -z-10 animate-[spin_26s_linear_infinite_reverse] rounded-full border border-brand-200/40"
        />

        {/* Kartu logo dengan transformasi 3D */}
        <div className="relative mx-auto aspect-square w-4/5 rounded-[2rem] bg-gradient-to-br from-white to-brand-50 p-8 shadow-2xl ring-1 ring-brand-100 transition-transform duration-700 will-change-transform [transform:rotateX(8deg)_rotateY(-10deg)] group-hover:[transform:rotateX(0deg)_rotateY(0deg)_scale(1.03)]">
          {/* Kilau */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-60"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-512.png"
            alt="Logo SMK Bina Karya Nusantara"
            width={512}
            height={512}
            className="h-full w-full object-contain drop-shadow-[0_12px_18px_rgba(37,99,235,0.35)]"
          />
        </div>

        {/* Bayangan bawah (kesan melayang) */}
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-4 w-3/5 rounded-[100%] bg-brand-900/20 blur-md"
        />
      </div>
    </div>
  );
}

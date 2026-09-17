import { cn } from '@/lib/utils';
import { Icon } from '@/components/Icon';

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
 * Logo melayang bebas (tanpa kotak), dilengkapi badge "Berdiri Sejak 2004"
 * dan efek glow/ring. Dibangun murni dengan CSS.
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
          className="absolute inset-2 -z-10 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-brand-300/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-10 -z-10 animate-[spin_26s_linear_infinite_reverse] rounded-full border border-brand-200/40"
        />

        {/* Badge "Berdiri Sejak 2004" */}
        <div className="relative z-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100/60">
            <Icon name="star" className="h-3.5 w-3.5 text-amber-500" />
            Berdiri Sejak 2004
          </span>
        </div>

        {/* Logo melayang bebas (tanpa kotak) dengan transformasi 3D */}
        <div className="relative mx-auto mt-4 aspect-square w-3/4 transition-transform duration-700 will-change-transform [transform:rotateX(10deg)_rotateY(-12deg)] group-hover:[transform:rotateX(0deg)_rotateY(0deg)_scale(1.05)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-512.png"
            alt="Logo SMK Bina Karya Nusantara"
            width={512}
            height={512}
            className="h-full w-full object-contain drop-shadow-[0_18px_28px_rgba(37,99,235,0.45)]"
          />
          {/* Kilau melintas di permukaan logo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          >
            <span className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent [animation:shine_4.5s_ease-in-out_infinite]" />
          </span>
        </div>

        {/* Bayangan bawah (kesan melayang) */}
        <div
          aria-hidden="true"
          className="mx-auto mt-3 h-4 w-3/5 rounded-[100%] bg-brand-900/20 blur-md"
        />
      </div>
    </div>
  );
}

/** Format tanggal ISO ke format Indonesia, mis. "1 Februari 2025". */
export function formatTanggal(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Format angka dengan pemisah ribuan Indonesia, mis. 1.240. */
export function formatAngka(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

/** Gabungkan className secara kondisional (pengganti ringan clsx). */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Cek apakah `pathname` saat ini berada di (atau di bawah) `href`.
 * Hash/anchor pada `href` diabaikan, mis. `/profil#sejarah` dianggap `/profil`.
 */
export function isPathActive(pathname: string, href: string): boolean {
  const path = href.split('#')[0];
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

/**
 * Apakah `href` menunjuk ke halaman konkret (bukan sekadar anchor di halaman lain).
 * Tautan ber-anchor (mis. `/#prestasi`) tidak boleh dijadikan penentu status aktif
 * grup agar grup tidak tetap tersorot saat pengguna berpindah ke halaman lain.
 */
export function isRealPageLink(href: string): boolean {
  return !href.includes('#');
}

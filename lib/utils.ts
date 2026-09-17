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

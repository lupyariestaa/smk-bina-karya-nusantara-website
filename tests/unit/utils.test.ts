import { describe, it, expect } from 'vitest';
import {
  formatTanggal,
  formatAngka,
  cn,
  isPathActive,
  isRealPageLink,
} from '@/lib/utils';

describe('formatTanggal', () => {
  it('memformat tanggal ISO ke format Indonesia', () => {
    expect(formatTanggal('2025-02-01')).toMatch(/1 Februari 2025/);
  });

  it('mengembalikan input asli bila tidak valid', () => {
    expect(formatTanggal('bukan-tanggal')).toBe('bukan-tanggal');
  });
});

describe('formatAngka', () => {
  it('menambahkan pemisah ribuan', () => {
    expect(formatAngka(1240)).toBe('1.240');
  });
});

describe('cn', () => {
  it('menggabungkan className dan mengabaikan falsy', () => {
    expect(cn('a', false, undefined, 'b', null)).toBe('a b');
  });
});

describe('isPathActive', () => {
  it('hanya mengaktifkan beranda pada path tepat "/"', () => {
    expect(isPathActive('/', '/')).toBe(true);
    expect(isPathActive('/profil', '/')).toBe(false);
  });

  it('mencocokkan path sama atau turunannya', () => {
    expect(isPathActive('/profil', '/profil')).toBe(true);
    expect(isPathActive('/profil', '/profil#sejarah')).toBe(true);
    expect(isPathActive('/berita/slug-a', '/berita')).toBe(true);
    expect(isPathActive('/program-keahlian', '/berita')).toBe(false);
  });
});

describe('isRealPageLink', () => {
  it('menandai tautan ber-anchor sebagai bukan halaman konkret', () => {
    expect(isRealPageLink('/#prestasi')).toBe(false);
    expect(isRealPageLink('/profil#sejarah')).toBe(false);
    expect(isRealPageLink('/profil')).toBe(true);
  });
});

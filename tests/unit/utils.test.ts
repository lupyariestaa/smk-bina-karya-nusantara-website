import { describe, it, expect } from 'vitest';
import { formatTanggal, formatAngka, cn } from '@/lib/utils';

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

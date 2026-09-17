import { describe, it, expect } from 'vitest';
import { buildSearchIndex } from '@/lib/search';
import { getJurusanBySlug, getBeritaBySlug, getBeritaTerbaru } from '@/lib/data';

describe('buildSearchIndex', () => {
  const index = buildSearchIndex();

  it('menghasilkan entri pencarian', () => {
    expect(index.length).toBeGreaterThan(10);
  });

  it('setiap entri punya field wajib', () => {
    for (const e of index) {
      expect(e).toHaveProperty('title');
      expect(e).toHaveProperty('href');
      expect(e).toHaveProperty('category');
      expect(e).toHaveProperty('text');
    }
  });

  it('memuat seluruh jurusan', () => {
    const jurusanEntries = index.filter((e) => e.category === 'Jurusan');
    expect(jurusanEntries.length).toBe(6);
  });

  it('mengarahkan sejarah & visi misi ke halaman tersendiri', () => {
    const sejarah = index.find((e) => e.title === 'Sejarah Sekolah');
    const visiMisi = index.find((e) => e.title === 'Visi & Misi');
    expect(sejarah?.href).toBe('/sejarah');
    expect(visiMisi?.href).toBe('/visi-misi');
  });
});

describe('getJurusanBySlug', () => {
  it('mengembalikan jurusan yang sesuai', () => {
    const j = getJurusanBySlug('rekayasa-perangkat-lunak');
    expect(j?.singkatan).toBe('RPL');
  });

  it('mengembalikan undefined untuk slug tak dikenal', () => {
    expect(getJurusanBySlug('tidak-ada')).toBeUndefined();
  });
});

describe('getBeritaBySlug & getBeritaTerbaru', () => {
  it('mengembalikan berita berdasarkan slug', () => {
    const b = getBeritaBySlug('ppdb-2025-2026-resmi-dibuka');
    expect(b?.judul).toContain('PPDB');
  });

  it('mengembalikan berita terbaru berurutan', () => {
    const list = getBeritaTerbaru(3);
    expect(list).toHaveLength(3);
    for (let i = 1; i < list.length; i++) {
      expect(new Date(list[i - 1].tanggal).getTime()).toBeGreaterThanOrEqual(
        new Date(list[i].tanggal).getTime(),
      );
    }
  });
});

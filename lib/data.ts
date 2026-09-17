import sekolahData from '@/data/sekolah.json';
import profilData from '@/data/profil.json';
import sejarahData from '@/data/sejarah.json';
import visiMisiData from '@/data/visi-misi.json';
import jurusanData from '@/data/jurusan.json';
import fasilitasData from '@/data/fasilitas.json';
import galeriData from '@/data/galeri.json';
import prestasiData from '@/data/prestasi.json';
import ekstrakurikulerData from '@/data/ekstrakurikuler.json';
import strukturData from '@/data/struktur.json';
import staffData from '@/data/staff.json';
import kemitraanData from '@/data/kemitraan.json';
import statistikData from '@/data/statistik.json';
import ppdbData from '@/data/ppdb.json';
import beritaData from '@/data/berita.json';
import imagesData from '@/data/images.json';

import type {
  Sekolah,
  Profil,
  Sejarah,
  VisiMisi,
  Jurusan,
  Fasilitas,
  GaleriItem,
  Prestasi,
  Ekstrakurikuler,
  StrukturItem,
  StaffStruktur,
  Kemitraan,
  Statistik,
  Ppdb,
  Berita,
} from './types';

export const sekolah = sekolahData as Sekolah;
export const profil = profilData as Profil;
export const sejarah = sejarahData as Sejarah;
export const visiMisi = visiMisiData as VisiMisi;
export const jurusanList = jurusanData as Jurusan[];
export const fasilitasList = fasilitasData as Fasilitas[];
export const galeriList = galeriData as GaleriItem[];
export const prestasiList = prestasiData as Prestasi[];
export const ekstrakurikulerList = ekstrakurikulerData as Ekstrakurikuler[];
export const strukturList = strukturData as StrukturItem[];
export const staffStruktur = staffData as StaffStruktur;
export const kemitraan = kemitraanData as Kemitraan;
export const statistik = statistikData as Statistik;
export const ppdb = ppdbData as Ppdb;
export const beritaList = beritaData as Berita[];

/** Peta gambar (aset lokal di /public/images). */
export const images = imagesData as {
  hero: Record<string, string | string[]>;
  jurusan: Record<string, string>;
  jurusanGaleri: Record<string, string[]>;
  fasilitas: Record<string, string>;
  berita: Record<string, string>;
  ekstrakurikuler: Record<string, string>;
  struktur: Record<string, string>;
};

/** Ambil gambar hero untuk sebuah halaman. */
export function heroImage(key: keyof typeof images.hero): string {
  const val = images.hero[key];
  return Array.isArray(val) ? val[0] : val;
}

/** Ambil detail jurusan berdasarkan slug. */
export function getJurusanBySlug(slug: string): Jurusan | undefined {
  return jurusanList.find((j) => j.slug === slug);
}

/** Ambil detail berita berdasarkan slug. */
export function getBeritaBySlug(slug: string): Berita | undefined {
  return beritaList.find((b) => b.slug === slug);
}

/** Berita terbaru berdasarkan tanggal (desc). */
export function getBeritaTerbaru(limit = 3): Berita[] {
  return [...beritaList]
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
    .slice(0, limit);
}

/** Pengumuman PPDB terbaru berdasarkan tanggal (desc). */
export function getPengumumanPpdbTerbaru(limit = 3) {
  return [...ppdb.pengumuman]
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
    .slice(0, limit);
}

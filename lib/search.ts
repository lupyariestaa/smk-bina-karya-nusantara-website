import {
  jurusanList,
  fasilitasList,
  beritaList,
  ekstrakurikulerList,
  prestasiList,
  profil,
  sejarah,
  visiMisi,
  staffStruktur,
} from './data';
import type { SearchEntry } from '@/components/SearchDialog';

/**
 * Membangun indeks pencarian client-side dari data JSON (PRD F-05).
 * Dijalankan saat build (fungsi murni) lalu diteruskan ke komponen klien.
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  entries.push(
    {
      title: 'Profil Sekolah',
      href: '/profil',
      category: 'Halaman',
      text: 'Tentang, sejarah, visi misi, struktur organisasi',
    },
    {
      title: 'Visi & Misi',
      href: '/visi-misi',
      category: 'Profil',
      text: `${visiMisi.visi} ${profil.misi.join(' ')} ${profil.tujuan.join(' ')} ${visiMisi.nilai.map((n) => `${n.nama} ${n.deskripsi}`).join(' ')}`,
    },
    {
      title: 'Sejarah Sekolah',
      href: '/sejarah',
      category: 'Profil',
      text: `${sejarah.ringkasan} ${sejarah.timeline.map((t) => `${t.tahun} ${t.judul} ${t.deskripsi}`).join(' ')}`,
    },
    {
      title: 'Struktur Organisasi',
      href: '/struktur',
      category: 'Profil',
      text: `${staffStruktur.catatan} ${staffStruktur.root.nama} ${staffStruktur.root.jabatan}`,
    },
    {
      title: 'Program Keahlian',
      href: '/program-keahlian',
      category: 'Halaman',
      text: 'Daftar jurusan dan kompetensi',
    },
    {
      title: 'Fasilitas & Galeri',
      href: '/fasilitas',
      category: 'Halaman',
      text: 'Fasilitas sekolah dan galeri foto',
    },
    {
      title: 'PPDB',
      href: '/ppdb',
      category: 'Halaman',
      text: 'Informasi penerimaan peserta didik baru, jadwal, syarat, alur',
    },
    {
      title: 'Berita & Kegiatan',
      href: '/berita',
      category: 'Halaman',
      text: 'Berita, prestasi, dan kegiatan sekolah',
    },
    {
      title: 'Kontak',
      href: '/kontak',
      category: 'Halaman',
      text: 'Alamat, telepon, email, dan lokasi sekolah',
    },
  );

  for (const j of jurusanList) {
    entries.push({
      title: `${j.nama} (${j.singkatan})`,
      href: `/program-keahlian/${j.slug}`,
      category: 'Jurusan',
      text: `${j.deskripsi} ${j.kompetensi.join(' ')} ${j.prospekKarier.join(' ')}`,
    });
  }

  for (const f of fasilitasList) {
    entries.push({
      title: f.nama,
      href: '/fasilitas',
      category: 'Fasilitas',
      text: `${f.kategori} — ${f.keterangan}`,
    });
  }

  for (const e of ekstrakurikulerList) {
    entries.push({
      title: e.nama,
      href: '/fasilitas#ekstrakurikuler',
      category: 'Ekstrakurikuler',
      text: `${e.kategori} — ${e.deskripsi}`,
    });
  }

  for (const p of prestasiList) {
    entries.push({
      title: p.prestasi,
      href: '/berita',
      category: 'Prestasi',
      text: `${p.tingkat} ${p.tahun} — ${p.bidang}`,
    });
  }

  for (const b of beritaList) {
    entries.push({
      title: b.judul,
      href: `/berita/${b.slug}`,
      category: b.kategori,
      text: `${b.ringkasan} ${b.isi.join(' ')}`,
    });
  }

  return entries;
}

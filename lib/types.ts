export interface SosialMedia {
  nama: string;
  handle: string;
  url: string;
}

export interface JamOperasional {
  hari: string;
  jam: string;
}

export interface Alamat {
  jalan: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  koordinat: { lat: number; lng: number };
  googleMapsUrl: string;
}

export interface Kontak {
  telepon: string;
  whatsapp: string;
  email: string;
  emailHumas: string;
  website: string;
}

export interface Sekolah {
  nama: string;
  namaSingkat: string;
  jenjang: string;
  status: string;
  akreditasi: string;
  npsn: string;
  tahunBerdiri: number;
  skPendirian: string;
  kurikulum: string;
  waktuPenyelenggaraan: string;
  kepalaSekolah: string;
  tagline: string;
  slogan: string;
  maskot: string;
  warnaIdentitas: { nama: string; hex: string }[];
  deskripsiSingkat: string;
  alamat: Alamat;
  kontak: Kontak;
  sosialMedia: SosialMedia[];
  jamOperasional: JamOperasional[];
}

export interface Profil {
  sejarah: string[];
  visi: string;
  misi: string[];
  tujuan: string[];
  sambutanKepalaSekolah: {
    nama: string;
    jabatan: string;
    isi: string;
  };
}

export interface Jurusan {
  slug: string;
  nama: string;
  singkatan: string;
  bidang: string;
  durasi: string;
  akreditasi: string;
  ikon: string;
  deskripsi: string;
  kompetensi: string[];
  prospekKarier: string[];
  mataPelajaran: string[];
  fasilitasPendukung: string[];
}

export interface Fasilitas {
  nama: string;
  jumlah: number;
  kategori: string;
  keterangan: string;
  ikon: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: string;
  tipe: 'foto' | 'video';
  src: string;
  deskripsi: string;
}

export interface Prestasi {
  tahun: number;
  prestasi: string;
  tingkat: string;
  bidang: string;
}

export interface Ekstrakurikuler {
  nama: string;
  kategori: string;
  deskripsi: string;
}

export interface StrukturItem {
  jabatan: string;
  nama: string;
}

export interface Kemitraan {
  dudi: string[];
  perguruanTinggi: string[];
  program: string[];
}

export interface Statistik {
  tenagaPendidik: {
    guruPnsPppk: number;
    guruTetapYayasan: number;
    guruTidakTetap: number;
    tenagaKependidikan: number;
    total: number;
    guruBersertifikatPendidik: number;
    guruS1: number;
    guruS2: number;
  };
  dataSiswa: {
    tahunAjaran: string;
    pendaftar: number;
    diterima: number;
    siswaAktif: number;
  }[];
  ringkasan: {
    rombonganBelajar: number;
    rasioGuruSiswa: string;
    jumlahJurusan: number;
    siswaAktifTerbaru: number;
  };
}

export interface JalurPpdb {
  nama: string;
  deskripsi: string;
}

export interface AlurPpdb {
  tahap: number;
  judul: string;
  deskripsi: string;
}

export interface JadwalPpdb {
  tahap: string;
  tanggal: string;
}

export interface PengumumanPpdb {
  id: string;
  judul: string;
  tanggal: string;
  ringkasan: string;
  isi: string;
}

export interface Ppdb {
  tahunAjaran: string;
  periode: string;
  statusPendaftaran: string;
  jalur: JalurPpdb[];
  persyaratan: string[];
  alur: AlurPpdb[];
  jadwal: JadwalPpdb[];
  biayaPendaftaran: string;
  kontak: { email: string; whatsapp: string; telepon: string };
  pengumuman: PengumumanPpdb[];
}

export interface Berita {
  slug: string;
  judul: string;
  kategori: string;
  tanggal: string;
  penulis: string;
  ringkasan: string;
  isi: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

/** Item di dalam sebuah grup dropdown menu. */
export interface NavLinkItem extends NavItem {
  /** Nama ikon dari `components/Icon` (opsional). */
  icon?: string;
  /** Deskripsi singkat untuk rich menu. */
  description?: string;
}

/** Grup navigasi: label pemicu + daftar tautan di dalam dropdown. */
export interface NavGroup {
  label: string;
  /** Tautan tujuan saat label grup diklik langsung (opsional). */
  href?: string;
  items: NavLinkItem[];
}

/**
 * Struktur navigasi utama (desktop) yang dikelompokkan agar rapi & profesional.
 * Setiap grup menampilkan dropdown saat di-hover / difokus.
 */
export const navGroups: NavGroup[] = [
  {
    label: 'Profil',
    href: '/profil',
    items: [
      {
        label: 'Profil Sekolah',
        href: '/profil',
        icon: 'building',
        description: 'Tentang, sejarah, visi & misi sekolah',
      },
      {
        label: 'Sejarah',
        href: '/sejarah',
        icon: 'clock',
        description: 'Perjalanan dan tonggak berdirinya sekolah',
      },
      {
        label: 'Visi & Misi',
        href: '/visi-misi',
        icon: 'target',
        description: 'Arah dan tujuan pendidikan kami',
      },
      {
        label: 'Fasilitas & Galeri',
        href: '/fasilitas',
        icon: 'hall',
        description: 'Sarana prasarana dan galeri kegiatan',
      },
    ],
  },
  {
    label: 'Akademik',
    items: [
      {
        label: 'Program Keahlian',
        href: '/program-keahlian',
        icon: 'classroom',
        description: 'Kompetensi keahlian unggulan yang tersedia',
      },
      {
        label: 'Ekstrakurikuler',
        href: '/fasilitas#ekstrakurikuler',
        icon: 'sport',
        description: 'Kegiatan pengembangan minat dan bakat',
      },
      {
        label: 'Prestasi',
        href: '/#prestasi',
        icon: 'trophy',
        description: 'Capaian dan penghargaan sekolah',
      },
      {
        label: 'Berita & Artikel',
        href: '/berita',
        icon: 'megaphone',
        description: 'Informasi dan kabar terbaru sekolah',
      },
    ],
  },
  {
    label: 'PPDB',
    href: '/ppdb',
    items: [
      {
        label: 'Info PPDB',
        href: '/ppdb',
        icon: 'sparkle',
        description: 'Jalur, jadwal, dan persyaratan pendaftaran',
      },
      {
        label: 'Hubungi Kami',
        href: '/kontak',
        icon: 'phone',
        description: 'Kontak dan lokasi sekolah',
      },
    ],
  },
];

/**
 * Item navigasi datar (dipakai untuk pencarian & navigasi mobile sederhana).
 * Diturunkan dari `navGroups` + tautan langsung agar tidak duplikat.
 */
export const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  ...navGroups.flatMap((group) =>
    group.items.map(({ label, href }) => ({ label, href })),
  ),
];

/** Tautan langsung yang selalu tampil di navbar (tanpa dropdown). */
export const directNavItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Kontak', href: '/kontak' },
];

export const legalItems: NavItem[] = [
  { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
  { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
];

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Program Keahlian', href: '/program-keahlian' },
  { label: 'Fasilitas & Galeri', href: '/fasilitas' },
  { label: 'PPDB', href: '/ppdb' },
  { label: 'Berita', href: '/berita' },
  { label: 'Kontak', href: '/kontak' },
];

export const legalItems: NavItem[] = [
  { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
  { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
];

import type { MetadataRoute } from 'next';
import { sekolah, jurusanList, beritaList } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = sekolah.kontak.website;
  const now = new Date();

  const staticRoutes = [
    '',
    '/profil',
    '/program-keahlian',
    '/fasilitas',
    '/ppdb',
    '/berita',
    '/kontak',
    '/kebijakan-privasi',
    '/syarat-ketentuan',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const jurusanRoutes = jurusanList.map((j) => ({
    url: `${base}/program-keahlian/${j.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const beritaRoutes = beritaList.map((b) => ({
    url: `${base}/berita/${b.slug}`,
    lastModified: new Date(b.tanggal),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...jurusanRoutes, ...beritaRoutes];
}

import type { MetadataRoute } from 'next';
import { sekolah } from '@/lib/data';

export default function robots(): MetadataRoute.Robots {
  const base = sekolah.kontak.website;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

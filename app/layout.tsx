import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { sekolah } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildSearchIndex } from '@/lib/search';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = sekolah.kontak.website;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${sekolah.nama} — ${sekolah.tagline}`,
    template: `%s | ${sekolah.nama}`,
  },
  description: sekolah.deskripsiSingkat,
  applicationName: sekolah.nama,
  keywords: [
    'SMK Bina Karya Nusantara',
    'SMK Tasikmalaya',
    'sekolah kejuruan',
    'PPDB SMK',
    'TKJ',
    'RPL',
    'TKRO',
    'TBSM',
    'AKL',
    'Bisnis Digital',
  ],
  authors: [{ name: sekolah.nama }],
  creator: sekolah.nama,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: sekolah.nama,
    title: `${sekolah.nama} — ${sekolah.tagline}`,
    description: sekolah.deskripsiSingkat,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${sekolah.nama} — ${sekolah.tagline}`,
    description: sekolah.deskripsiSingkat,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Structured data (schema.org EducationalOrganization) — SEO on-page.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: sekolah.nama,
    alternateName: sekolah.namaSingkat,
    description: sekolah.deskripsiSingkat,
    url: siteUrl,
    email: sekolah.kontak.email,
    telephone: sekolah.kontak.telepon,
    foundingDate: String(sekolah.tahunBerdiri),
    slogan: sekolah.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: sekolah.alamat.jalan,
      addressLocality: sekolah.alamat.kecamatan,
      addressRegion: sekolah.alamat.provinsi,
      postalCode: sekolah.alamat.kodePos,
      addressCountry: 'ID',
    },
    sameAs: sekolah.sosialMedia.map((s) => s.url),
  };

  return (
    <html lang="id" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#konten-utama"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Header searchEntries={buildSearchIndex()} />
        <main id="konten-utama" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}

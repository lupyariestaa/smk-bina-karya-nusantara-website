import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { sekolah } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Kontak',
  description: `Alamat, telepon, email, dan lokasi ${sekolah.nama}.`,
  alternates: { canonical: '/kontak' },
};

export default function KontakPage() {
  const { alamat, kontak, sosialMedia, jamOperasional } = sekolah;
  const mapSrc = `https://www.google.com/maps?q=${alamat.koordinat.lat},${alamat.koordinat.lng}&hl=id&z=15&output=embed`;

  return (
    <>
      <PageHero
        title="Kontak & Lokasi"
        description="Hubungi kami atau kunjungi langsung sekolah kami."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Kontak' }]}
      />

      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-2">
          {/* Info kontak */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-start gap-3">
                <Icon name="mapPin" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div>
                  <h2 className="font-bold text-slate-900">Alamat</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {alamat.jalan}
                    <br />
                    Kel. {alamat.kelurahan}, Kec. {alamat.kecamatan}
                    <br />
                    {alamat.kabupaten}, {alamat.provinsi} {alamat.kodePos}
                  </p>
                  <a
                    href={alamat.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-2 inline-flex items-center gap-1 text-sm"
                  >
                    Buka di Google Maps
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card p-6">
                <Icon name="phone" className="h-5 w-5 text-brand-600" />
                <h2 className="mt-3 font-bold text-slate-900">Telepon</h2>
                <a href={`tel:${kontak.telepon}`} className="link-underline text-sm">
                  {kontak.telepon}
                </a>
              </div>
              <div className="card p-6">
                <Icon name="phone" className="h-5 w-5 text-brand-600" />
                <h2 className="mt-3 font-bold text-slate-900">WhatsApp</h2>
                <a
                  href={`https://wa.me/${kontak.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm"
                >
                  {kontak.whatsapp}
                </a>
              </div>
              <div className="card p-6">
                <Icon name="mail" className="h-5 w-5 text-brand-600" />
                <h2 className="mt-3 font-bold text-slate-900">Email</h2>
                <a href={`mailto:${kontak.email}`} className="link-underline text-sm">
                  {kontak.email}
                </a>
              </div>
              <div className="card p-6">
                <Icon name="mail" className="h-5 w-5 text-brand-600" />
                <h2 className="mt-3 font-bold text-slate-900">Email Humas</h2>
                <a
                  href={`mailto:${kontak.emailHumas}`}
                  className="link-underline text-sm"
                >
                  {kontak.emailHumas}
                </a>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-3">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div className="w-full">
                  <h2 className="font-bold text-slate-900">Jam Operasional</h2>
                  <dl className="mt-3 space-y-2 text-sm">
                    {jamOperasional.map((j) => (
                      <div key={j.hari} className="flex justify-between gap-4">
                        <dt className="text-slate-600">{j.hari}</dt>
                        <dd className="font-medium text-slate-800">{j.jam}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-bold text-slate-900">Media Sosial</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {sosialMedia.map((s) => (
                  <li key={s.nama}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
                    >
                      <Icon name="link" className="h-4 w-4" />
                      {s.nama}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Peta */}
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title={`Peta lokasi ${sekolah.nama}`}
              src={mapSrc}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[400px] w-full lg:min-h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}

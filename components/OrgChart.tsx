import type { StaffNode } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Bagan organisasi bercabang (org chart) berbasis CSS murni.
 * Menghubungkan tiap simpul ke anaknya dengan garis siku-siku modern.
 * Pada layar kecil, bagan otomatis menjadi alur vertikal satu kolom.
 */

/** Kartu profil satu orang: foto, nama, jabatan. */
function PersonCard({
  node,
  highlight = false,
}: {
  node: StaffNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        'group relative z-10 flex w-40 flex-col items-center rounded-2xl border bg-white p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:w-44',
        highlight ? 'border-brand-300 ring-2 ring-brand-100' : 'border-slate-200',
      )}
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.foto}
          alt={node.nama}
          width={72}
          height={72}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-16 w-16 rounded-full border-2 border-brand-100 object-cover sm:h-[72px] sm:w-[72px]"
        />
        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-brand-600 text-[9px] font-bold text-white">
          {node.level + 1}
        </span>
      </div>
      <p className="mt-2.5 text-sm font-semibold leading-tight text-slate-900">
        {node.nama}
      </p>
      <p className="mt-1 text-xs leading-snug text-brand-700">{node.jabatan}</p>
    </div>
  );
}

/** Satu simpul beserta turunannya sebagai daftar bercabang. */
function ChartNode({
  node,
  highlight,
  isRoot = false,
}: {
  node: StaffNode;
  highlight?: boolean;
  isRoot?: boolean;
}) {
  const hasChildren = node.anak.length > 0;

  return (
    <li
      className={cn(
        'relative flex flex-col items-center',
        isRoot ? 'pt-0' : 'org-node pt-8',
      )}
    >
      <PersonCard node={node} highlight={highlight ?? isRoot} />

      {hasChildren && (
        <ul className="org-children relative mt-8 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-6">
          {node.anak.map((child) => (
            <ChartNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function OrgChart({ root }: { root: StaffNode }) {
  return (
    <div className="org-chart w-max">
      <ul className="flex flex-col items-center lg:min-w-max">
        <ChartNode node={root} isRoot />
      </ul>
    </div>
  );
}

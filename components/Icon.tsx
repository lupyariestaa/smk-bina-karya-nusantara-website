import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const paths: Record<string, React.ReactNode> = {
  network: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h6a3 3 0 0 1 3 3v6" />
      <path d="M6 9v6a3 3 0 0 0 3 3h3" />
    </>
  ),
  code: (
    <>
      <path d="m9 8-4 4 4 4" />
      <path d="m15 8 4 4-4 4" />
    </>
  ),
  car: (
    <>
      <path d="M3 14h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="M5 14 6.5 8.5A1 1 0 0 1 7.5 8h9a1 1 0 0 1 1 .5L19 14" />
      <circle cx="7" cy="16" r="0.5" />
      <circle cx="17" cy="16" r="0.5" />
    </>
  ),
  motorcycle: (
    <>
      <circle cx="5.5" cy="16" r="3.5" />
      <circle cx="18.5" cy="16" r="3.5" />
      <path d="M5.5 16h5l3-7h3" />
      <path d="M12 16h6.5" />
    </>
  ),
  calculator: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1z" />
      <path d="M14 7a4 4 0 0 1 0 10" />
    </>
  ),
  classroom: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M7 20l2-4M17 20l-2-4M12 20v-4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19a2 2 0 0 1 2-2h12" />
    </>
  ),
  hall: (
    <>
      <path d="M3 21h18M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-5h6v5" />
    </>
  ),
  mosque: (
    <>
      <path d="M12 3c2 2 4 3 4 6a4 4 0 0 1-8 0c0-3 2-4 4-6z" />
      <path d="M5 21v-7a7 7 0 0 1 14 0v7M3 21h18" />
    </>
  ),
  sport: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a14 14 0 0 1 0 18M3.5 9h17M3.5 15h17" />
    </>
  ),
  health: (
    <>
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
      <path d="M12 9v4M10 11h4" />
    </>
  ),
  food: (
    <>
      <path d="M5 3v8a2 2 0 0 0 4 0V3M7 11v10" />
      <path d="M17 3c-1.5 1-2 3-2 5s.5 3 2 3v10" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V9l6 4V9l6 4V6l6 4v11z" />
      <path d="M7 21v-4M11 21v-4M15 21v-4" />
    </>
  ),
  parking: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </>
  ),
  counseling: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 21v-2a5 5 0 0 1 5-5h2" />
      <path d="M16 11h5M16 15h5M16 19h3" />
    </>
  ),
  star: (
    <>
      <path d="M12 3l2.6 5.6L21 9.3l-4.5 4.2L17.5 20 12 17l-5.5 3 1-6.5L3 9.3l6.4-.7z" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v4a4 4 0 0 1-8 0z" />
      <path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M10 12v3h4v-3M8 20h8M12 15v5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
      <path d="M16 4a3 3 0 0 1 0 6M21 20v-1a5 5 0 0 0-3-4.6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: (
    <path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="m5 12 5 5 9-10" />,
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  sparkle: (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
  ),
  heart: <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />,
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  maximize: (
    <>
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
    </>
  ),
};

export interface IconProps2 extends IconProps {
  name: keyof typeof paths | string;
}

export function Icon({ name, ...props }: IconProps2) {
  const content = paths[name] ?? paths.sparkle;
  return (
    <svg {...base} {...props}>
      {content}
    </svg>
  );
}

export type IconName = keyof typeof paths;

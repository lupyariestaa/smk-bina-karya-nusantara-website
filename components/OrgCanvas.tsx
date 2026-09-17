'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/utils';

const MIN_SCALE = 0.5;
const MAX_SCALE = 2;
const STEP = 0.2;
const ZOOM_WHEEL = 0.0015;

interface ViewState {
  x: number;
  y: number;
  scale: number;
}

function clampScale(s: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
}

/**
 * Kanvas interaktif untuk bagan organisasi.
 * - Pan: klik-tahan tombol kiri lalu geser (kursor jadi tangan menggenggam).
 * - Zoom: Ctrl + scroll (ke arah kursor) atau tombol +/− pada toolbar.
 * - Reset: kembalikan ke posisi & skala awal.
 * Scroll roda biasa tetap diteruskan ke halaman.
 */
export function OrgCanvas({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<ViewState>({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const panRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  // Pusatkan bagan secara horizontal di dalam kanvas.
  const centerContent = useCallback(() => {
    const container = containerRef.current;
    const content = contentWrapRef.current;
    if (!container || !content) return;
    const x = Math.max(24, (container.clientWidth - content.offsetWidth) / 2);
    setView({ x, y: 24, scale: 1 });
  }, []);

  // Pusatkan saat pertama kali dirender.
  useEffect(() => {
    centerContent();
  }, [centerContent]);

  // Zoom di titik tertentu (koordinat relatif terhadap container).
  const zoomAt = useCallback((factor: number, clientX?: number, clientY?: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = clientX != null ? clientX - rect.left : rect.width / 2;
    const py = clientY != null ? clientY - rect.top : rect.height / 2;

    setView((prev) => {
      const nextScale = clampScale(prev.scale * factor);
      const ratio = nextScale / prev.scale;
      // Jaga titik fokus (px, py) tetap di posisi yang sama saat zoom.
      const x = px - (px - prev.x) * ratio;
      const y = py - (py - prev.y) * ratio;
      return { x, y, scale: nextScale };
    });
  }, []);

  // Zoom dengan Ctrl + scroll.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      if (!e.ctrlKey) return; // scroll biasa → biarkan halaman bergulir
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * ZOOM_WHEEL * 2);
      zoomAt(factor, e.clientX, e.clientY);
    }
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return; // hanya tombol kiri
      const target = e.target as HTMLElement;
      // Abaikan interaksi pada tombol/link (toolbar dsb.)
      if (target.closest('button, a')) return;
      panRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: view.x,
        originY: view.y,
      };
      setIsPanning(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [view.x, view.y],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const pan = panRef.current;
    if (!pan) return;
    setView((prev) => ({
      ...prev,
      x: pan.originX + (e.clientX - pan.startX),
      y: pan.originY + (e.clientY - pan.startY),
    }));
  }, []);

  const endPan = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!panRef.current) return;
    panRef.current = null;
    setIsPanning(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  const reset = useCallback(() => centerContent(), [centerContent]);
  const persen = Math.round(view.scale * 100);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        className={cn(
          'relative h-[70vh] w-full touch-none select-none overflow-hidden rounded-2xl border border-slate-200 bg-white',
          isPanning ? 'cursor-grabbing' : 'cursor-grab',
        )}
        style={{
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
        role="application"
        aria-label="Kanvas bagan organisasi. Tahan dan geser untuk memindahkan, Ctrl dan gulir untuk memperbesar."
      >
        <div
          ref={contentWrapRef}
          className={cn(
            'absolute left-0 top-0 will-change-transform',
            !isPanning && 'transition-transform duration-150 ease-out',
          )}
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            transformOrigin: '0 0',
          }}
        >
          <div className="p-8">{children}</div>
        </div>
      </div>

      {/* Toolbar melayang */}
      <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1 rounded-xl border border-slate-200 bg-white/95 p-1 shadow-lg backdrop-blur">
        <button
          type="button"
          onClick={() => zoomAt(1 / (1 + STEP))}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40"
          aria-label="Perkecil"
          disabled={view.scale <= MIN_SCALE + 0.001}
        >
          <Icon name="minus" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => zoomAt(1 + STEP)}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40"
          aria-label="Perbesar"
          disabled={view.scale >= MAX_SCALE - 0.001}
        >
          <Icon name="plus" className="h-4 w-4" />
        </button>
        <span className="pointer-events-auto min-w-[3rem] px-1 text-center text-xs font-medium tabular-nums text-slate-500">
          {persen}%
        </span>
        <button
          type="button"
          onClick={reset}
          className="pointer-events-auto ml-0.5 flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          aria-label="Atur ulang tampilan"
        >
          <Icon name="maximize" className="h-4 w-4" />
          Reset
        </button>
      </div>

      {/* Petunjuk */}
      <p className="mt-3 text-center text-xs text-slate-400">
        Tahan &amp; geser untuk memindahkan · Ctrl + gulir untuk memperbesar/memperkecil
      </p>
    </div>
  );
}

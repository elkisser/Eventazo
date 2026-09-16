"use client";

import { useMemo } from "react";
import { useRifaStore } from "@/store/useRifaStore";
import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";

export function PageLayoutPreview() {
  const { printConfig, ticketConfig } = useRifaStore();

  const {
    rows,
    cols,
    horizCount,
    sideRotatedCount,
    canFitSide,
    totalPerPage,
    totalPages,
    scale,
    pageW,
    pageH,
    gridStartX,
    gridW,
    tW,
    tH,
    gap,
    margin,
  } = useMemo(() => {
    const m = printConfig.marginTop * MM_TO_PT;
    const g = printConfig.gap * MM_TO_PT;
    const tw = printConfig.ticketWidth * MM_TO_PT;
    const th = printConfig.ticketHeight * MM_TO_PT;

    const availW = A4_WIDTH_PT - m * 2;
    const availH = A4_HEIGHT_PT - m * 2;

    const c = Math.max(1, Math.floor((availW + g) / (tw + g)));
    const r = Math.max(1, Math.floor((availH + g) / (th + g)));
    const hc = c * r;

    const gw = c * tw + (c - 1) * g;
    const sx = m;

    const rightRemaining = A4_WIDTH_PT - sx - gw - g - m;
    const canFitSide = rightRemaining >= th;
    const sc = canFitSide ? Math.floor((availH + g) / (tw + g)) : 0;

    const tpp = hc + sc;
    const tp = Math.ceil(ticketConfig.totalTickets / tpp);

    const s = 200 / A4_HEIGHT_PT;
    const pw = A4_WIDTH_PT * s;
    const ph = A4_HEIGHT_PT * s;

    return {
      rows: r,
      cols: c,
      horizCount: hc,
      sideRotatedCount: sc,
      canFitSide,
      totalPerPage: tpp,
      totalPages: tp,
      scale: s,
      pageW: pw,
      pageH: ph,
      gridStartX: sx,
      gridW: gw,
      tW: tw,
      tH: th,
      gap: g,
      margin: m,
    };
  }, [
    printConfig.marginTop,
    printConfig.gap,
    printConfig.ticketWidth,
    printConfig.ticketHeight,
    ticketConfig.totalTickets,
  ]);

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/80 p-4 space-y-3">
      <h4 className="text-sm font-semibold text-slate-200">
        Distribución en Página A4
      </h4>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-slate-900/60 p-2">
          <p className="text-lg font-bold text-amber-400">{totalPerPage}</p>
          <p className="text-[9px] text-slate-400">por página</p>
        </div>
        <div className="rounded-lg bg-slate-900/60 p-2">
          <p className="text-lg font-bold text-amber-400">{totalPages}</p>
          <p className="text-[9px] text-slate-400">páginas</p>
        </div>
        <div className="rounded-lg bg-slate-900/60 p-2">
          <p className="text-lg font-bold text-amber-400">{ticketConfig.totalTickets}</p>
          <p className="text-[9px] text-slate-400">tickets</p>
        </div>
      </div>

      {/* Visual page layout */}
      <div className="flex justify-center">
        <div
          className="relative bg-white rounded shadow-lg border border-slate-500"
          style={{ width: `${pageW}px`, height: `${pageH}px` }}
        >
          {/* Horizontal tickets */}
          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: cols }).map((_, col) => {
              const ticketIdx = row * cols + col;
              if (ticketIdx >= horizCount) return null;
              const x = (gridStartX + col * (tW + gap)) * scale;
              const y = (margin + row * (tH + gap)) * scale;
              return (
                <div
                  key={`h-${row}-${col}`}
                  className="absolute bg-amber-100 border border-amber-400/60 rounded-[2px] flex items-center justify-center overflow-hidden"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${tW * scale}px`,
                    height: `${tH * scale}px`,
                  }}
                >
                  <span className="text-[6px] text-amber-700 font-mono font-bold">
                    {ticketIdx + 1}
                  </span>
                </div>
              );
            })
          )}

          {/* Rotated tickets on the right */}
          {canFitSide &&
            Array.from({ length: sideRotatedCount }).map((_, i) => {
              const rx = (gridStartX + gridW + gap) * scale;
              const ry = (margin + i * (tW + gap)) * scale;
              return (
                <div
                  key={`r-${i}`}
                  className="absolute bg-blue-100 border border-blue-400/60 rounded-[2px] flex items-center justify-center overflow-hidden"
                  style={{
                    left: `${rx}px`,
                    top: `${ry}px`,
                    width: `${tH * scale}px`,
                    height: `${tW * scale}px`,
                  }}
                >
                  <span className="text-[6px] text-blue-700 font-mono font-bold rotate-90">
                    {horizCount + i + 1}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-[9px]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 bg-amber-100 border border-amber-400/60 rounded-[1px]" />
          <span className="text-slate-400">Horizontal ({horizCount})</span>
        </div>
        {sideRotatedCount > 0 && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-3 bg-blue-100 border border-blue-400/60 rounded-[1px]" />
            <span className="text-slate-400">Vertical ({sideRotatedCount})</span>
          </div>
        )}
      </div>
    </div>
  );
}

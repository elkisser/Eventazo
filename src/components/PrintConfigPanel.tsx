"use client";

import { useMemo } from "react";
import { Printer, Maximize2, LayoutGrid } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { useRifaStore } from "@/store/useRifaStore";
import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";

export function PrintConfigPanel() {
  const { printConfig, setPrintConfig, ticketConfig } = useRifaStore();

  // Memoized layout calculation for fast responsiveness on low-end machines
  const { horizCount, sideCount, ticketsPerPage, totalPages } = useMemo(() => {
    const margin = printConfig.marginTop * MM_TO_PT;
    const gap = printConfig.gap * MM_TO_PT;
    const ticketWidth = printConfig.ticketWidth * MM_TO_PT;
    const ticketHeight = printConfig.ticketHeight * MM_TO_PT;

    const availableWidth = A4_WIDTH_PT - margin * 2;
    const availableHeight = A4_HEIGHT_PT - margin * 2;

    const cols = Math.max(1, Math.floor((availableWidth + gap) / (ticketWidth + gap)));
    const rows = Math.max(1, Math.floor((availableHeight + gap) / (ticketHeight + gap)));
    const hc = cols * rows;

    const gridW = cols * ticketWidth + (cols - 1) * gap;
    const rightRem = A4_WIDTH_PT - margin - gridW - gap - margin;
    const canFitSide = rightRem >= ticketHeight;
    const sc = canFitSide ? Math.floor((availableHeight + gap) / (ticketWidth + gap)) : 0;

    const tpp = hc + sc;
    const tp = Math.ceil(ticketConfig.totalTickets / tpp);

    return {
      horizCount: hc,
      sideCount: sc,
      ticketsPerPage: tpp,
      totalPages: tp,
    };
  }, [
    printConfig.marginTop,
    printConfig.gap,
    printConfig.ticketWidth,
    printConfig.ticketHeight,
    ticketConfig.totalTickets,
  ]);

  return (
    <Card className="shadow-lg border-slate-700/80">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="flex items-center gap-2">
          <Printer className="h-5 w-5 text-amber-400" />
          <span>Configuración de Impresión (A4)</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Resumen de distribución */}
        <div className="rounded-lg bg-slate-900/60 border border-slate-700/80 p-3 shadow-inner">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-slate-800/40 p-1.5 rounded border border-slate-800">
              <p className="text-[11px] text-slate-400">Por Página</p>
              <p className="text-base font-bold font-mono text-amber-400">{ticketsPerPage}</p>
            </div>
            <div className="bg-slate-800/40 p-1.5 rounded border border-slate-800">
              <p className="text-[11px] text-slate-400">Horizontales</p>
              <p className="text-base font-bold font-mono text-amber-300">{horizCount}</p>
            </div>
            <div className="bg-slate-800/40 p-1.5 rounded border border-slate-800">
              <p className="text-[11px] text-slate-400">Verticales</p>
              <p className="text-base font-bold font-mono text-blue-400">{sideCount}</p>
            </div>
            <div className="bg-slate-800/40 p-1.5 rounded border border-slate-800">
              <p className="text-[11px] text-slate-400">Hojas Total</p>
              <p className="text-base font-bold font-mono text-emerald-400">{totalPages}</p>
            </div>
          </div>
        </div>

        {/* Tamaño del ticket */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-xs text-amber-400/90 uppercase tracking-wider font-semibold">
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Dimensiones del Ticket</span>
          </Label>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">Ancho</span>
              <NumberInput
                min={50}
                max={210}
                step={5}
                suffix="mm"
                value={printConfig.ticketWidth}
                onChange={(val) => setPrintConfig({ ticketWidth: val })}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">Alto</span>
              <NumberInput
                min={25}
                max={150}
                step={5}
                suffix="mm"
                value={printConfig.ticketHeight}
                onChange={(val) => setPrintConfig({ ticketHeight: val })}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">Separación</span>
              <NumberInput
                min={0}
                max={10}
                step={0.5}
                suffix="mm"
                value={printConfig.gap}
                onChange={(val) => setPrintConfig({ gap: val })}
              />
            </div>
          </div>
        </div>

        {/* Márgenes */}
        <div className="space-y-2 pt-1 border-t border-slate-800">
          <Label className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-semibold">
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Márgenes de Hoja</span>
          </Label>
          <div className="grid grid-cols-4 gap-2">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">Arriba</span>
              <NumberInput
                min={0}
                max={30}
                step={1}
                suffix="mm"
                value={printConfig.marginTop}
                onChange={(val) => setPrintConfig({ marginTop: val })}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">Abajo</span>
              <NumberInput
                min={0}
                max={30}
                step={1}
                suffix="mm"
                value={printConfig.marginBottom}
                onChange={(val) => setPrintConfig({ marginBottom: val })}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">Izq.</span>
              <NumberInput
                min={0}
                max={30}
                step={1}
                suffix="mm"
                value={printConfig.marginLeft}
                onChange={(val) => setPrintConfig({ marginLeft: val })}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">Der.</span>
              <NumberInput
                min={0}
                max={30}
                step={1}
                suffix="mm"
                value={printConfig.marginRight}
                onChange={(val) => setPrintConfig({ marginRight: val })}
              />
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <span>💡</span>
          <span>El sistema calcula el aprovechamiento óptimo de la hoja A4 rotando boletos al margen si queda espacio libre.</span>
        </p>
      </CardContent>
    </Card>
  );
}

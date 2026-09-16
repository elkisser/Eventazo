"use client";

import { useMemo } from "react";
import { Printer, Maximize2, LayoutGrid, Scissors } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useRifaStore } from "@/store/useRifaStore";
import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";

export function PrintConfigPanel() {
  const { printConfig, setPrintConfig, ticketConfig } = useRifaStore();

  const currentStubWidth = printConfig.stubWidth ?? 36;
  const stubPercent = Math.round((currentStubWidth / printConfig.ticketWidth) * 100);

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
    const canFitSide = Boolean(printConfig.allowSideTickets) && (rightRem >= ticketHeight);
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
    printConfig.allowSideTickets,
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

        {/* Disposición: Boletos verticales en el margen */}
        <div className="rounded-lg bg-slate-900/60 border border-slate-700/80 p-3 shadow-inner">
          <Switch
            id="allowSideTickets"
            checked={Boolean(printConfig.allowSideTickets)}
            onCheckedChange={(checked) => setPrintConfig({ allowSideTickets: checked })}
            label="Aprovechar margen derecho con boletos verticales"
            description="Desactivado: boletos horizontales uniformes de corte limpio. Activado: agrega boletos rotados 90° en el lateral para ahorrar papel."
          />
        </div>

        {/* Tamaño del ticket */}
        <div className="space-y-3">
          <Label className="flex items-center gap-1.5 text-xs text-amber-400/90 uppercase tracking-wider font-semibold">
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Dimensiones del Ticket</span>
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">Ancho Boleto</span>
              <NumberInput
                min={60}
                max={210}
                step={5}
                suffix="mm"
                value={printConfig.ticketWidth}
                onChange={(val) => {
                  const maxStub = Math.max(20, val - 25);
                  const safeStub = Math.min(currentStubWidth, maxStub);
                  setPrintConfig({ ticketWidth: val, stubWidth: safeStub });
                }}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">Alto Boleto</span>
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
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Ancho Talón</span>
                <span className="text-[10px] text-amber-400 font-mono font-bold">
                  {stubPercent}%
                </span>
              </div>
              <NumberInput
                min={15}
                max={Math.max(20, printConfig.ticketWidth - 25)}
                step={1}
                suffix="mm"
                value={currentStubWidth}
                onChange={(val) => setPrintConfig({ stubWidth: val })}
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

          {/* Control deslizante y preajustes de talón */}
          <div className="rounded-lg bg-slate-900/50 border border-slate-700/80 p-3 space-y-2.5 shadow-inner">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-300 text-[11px]">
                <Scissors className="h-3.5 w-3.5 text-amber-400" />
                <span>Ajuste rápido de tamaño del talón:</span>
              </span>
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                {currentStubWidth} mm ({stubPercent}%)
              </span>
            </div>

            <Slider
              min={18}
              max={Math.max(25, Math.round(printConfig.ticketWidth * 0.48))}
              step={1}
              value={currentStubWidth}
              onChange={(val) => setPrintConfig({ stubWidth: val })}
              showValueBadge={false}
            />

            <div className="flex flex-wrap items-center justify-between gap-1 pt-1">
              <span className="text-[10px] text-slate-400">Preajustes rápidos:</span>
              <div className="flex flex-wrap gap-1">
                {[
                  { label: "Estrecho (28mm)", w: 28 },
                  { label: "Estándar (36mm)", w: 36 },
                  { label: "Medio (42mm)", w: 42 },
                  { label: "Amplio (48mm)", w: 48 },
                ].map((preset) => (
                  <button
                    key={preset.w}
                    type="button"
                    onClick={() => setPrintConfig({ stubWidth: preset.w })}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                      currentStubWidth === preset.w
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
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

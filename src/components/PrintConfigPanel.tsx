"use client";

import { Printer, Maximize2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRifaStore } from "@/store/useRifaStore";
import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";

export function PrintConfigPanel() {
  const { printConfig, setPrintConfig, ticketConfig } = useRifaStore();

  // Cálculo del layout (misma lógica que el generador PDF)
  const margin = printConfig.marginTop * MM_TO_PT;
  const gap = printConfig.gap * MM_TO_PT;
  const ticketWidth = printConfig.ticketWidth * MM_TO_PT;
  const ticketHeight = printConfig.ticketHeight * MM_TO_PT;

  const availableWidth = A4_WIDTH_PT - margin * 2;
  const availableHeight = A4_HEIGHT_PT - margin * 2;

  // Tickets horizontales
  const cols = Math.max(1, Math.floor((availableWidth + gap) / (ticketWidth + gap)));
  const rows = Math.max(1, Math.floor((availableHeight + gap) / (ticketHeight + gap)));
  const horizCount = cols * rows;

  // Tickets verticales en el costado derecho
  const gridW = cols * ticketWidth + (cols - 1) * gap;
  const rightRem = A4_WIDTH_PT - margin - gridW - gap - margin;
  const canFitSide = rightRem >= ticketHeight;
  const sideCount = canFitSide ? Math.floor((availableHeight + gap) / (ticketWidth + gap)) : 0;

  const ticketsPerPage = horizCount + sideCount;
  const totalPages = Math.ceil(ticketConfig.totalTickets / ticketsPerPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Printer className="h-5 w-5 text-amber-400" />
          Configuración de Impresión
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resumen de distribución */}
        <div className="rounded-lg bg-slate-900/50 border border-slate-700 p-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-xs text-slate-400">Por Página</p>
              <p className="text-lg font-bold text-amber-400">{ticketsPerPage}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Horizontales</p>
              <p className="text-lg font-bold text-amber-400">{horizCount}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Verticales</p>
              <p className="text-lg font-bold text-blue-400">{sideCount}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Páginas</p>
              <p className="text-lg font-bold text-amber-400">{totalPages}</p>
            </div>
          </div>
        </div>

        {/* Tamaño del ticket */}
        <div className="space-y-2">
          <Label className="text-xs text-slate-400 uppercase tracking-wider">Tamaño del Ticket (mm)</Label>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Ancho</span>
              <Input
                type="number"
                min={50}
                max={210}
                value={printConfig.ticketWidth}
                onChange={(e) => setPrintConfig({ ticketWidth: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Alto</span>
              <Input
                type="number"
                min={25}
                max={150}
                value={printConfig.ticketHeight}
                onChange={(e) => setPrintConfig({ ticketHeight: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Espacio</span>
              <Input
                type="number"
                min={0}
                max={10}
                step={0.5}
                value={printConfig.gap}
                onChange={(e) => setPrintConfig({ gap: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Márgenes */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider">
            <Maximize2 className="h-3 w-3" />
            Márgenes (mm)
          </Label>
          <div className="grid grid-cols-4 gap-2">
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Arriba</span>
              <Input
                type="number"
                min={0}
                max={30}
                value={printConfig.marginTop}
                onChange={(e) => setPrintConfig({ marginTop: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Abajo</span>
              <Input
                type="number"
                min={0}
                max={30}
                value={printConfig.marginBottom}
                onChange={(e) => setPrintConfig({ marginBottom: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Izq.</span>
              <Input
                type="number"
                min={0}
                max={30}
                value={printConfig.marginLeft}
                onChange={(e) => setPrintConfig({ marginLeft: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Der.</span>
              <Input
                type="number"
                min={0}
                max={30}
                value={printConfig.marginRight}
                onChange={(e) => setPrintConfig({ marginRight: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        <p className="text-[10px] text-slate-500 italic">
          El sistema calcula automáticamente cuántos tickets entran por página según las dimensiones configuradas.
        </p>
      </CardContent>
    </Card>
  );
}

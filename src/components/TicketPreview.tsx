"use client";

import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRifaStore } from "@/store/useRifaStore";
import { formatTicketNumber, getDigitsNeeded, formatCurrency } from "@/lib/utils";
import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";

export function TicketPreview() {
  const { ticketConfig, printConfig, previewTicketNumber, setPreviewTicketNumber } = useRifaStore();
  const digits = getDigitsNeeded(ticketConfig.totalTickets, ticketConfig.startNumber);
  const formattedNumber = formatTicketNumber(previewTicketNumber, digits);
  const maxNumber = ticketConfig.startNumber + ticketConfig.totalTickets - 1;

  // Calculate actual layout (same as PDF generator)
  const gap = printConfig.gap * MM_TO_PT;
  const tW = printConfig.ticketWidth * MM_TO_PT;
  const tH = printConfig.ticketHeight * MM_TO_PT;
  const margin = printConfig.marginTop * MM_TO_PT;
  const availW = A4_WIDTH_PT - margin * 2;
  const availH = A4_HEIGHT_PT - margin * 2;
  const cols = Math.max(1, Math.floor((availW + gap) / (tW + gap)));
  const rows = Math.max(1, Math.floor((availH + gap) / (tH + gap)));
  const gridW = cols * tW + (cols - 1) * gap;
  const rightRem = A4_WIDTH_PT - margin - gridW - gap - margin;
  const canFitSide = rightRem >= tH;
  const sideCount = canFitSide ? Math.floor((availH + gap) / (tW + gap)) : 0;
  const ticketsPerPage = cols * rows + sideCount;
  const totalPages = Math.ceil(ticketConfig.totalTickets / ticketsPerPage);

  // Prizes split: odd positions left, even positions right
  const col1Prizes = ticketConfig.prizes.filter((_, i) => i % 2 === 0);
  const col2Prizes = ticketConfig.prizes.filter((_, i) => i % 2 === 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-amber-400" />
          Vista Previa
          <span className="ml-auto text-xs font-normal text-slate-400">
            {ticketsPerPage}/pág • {totalPages} págs
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Navigation */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPreviewTicketNumber(Math.max(ticketConfig.startNumber, previewTicketNumber - 1))}
            disabled={previewTicketNumber <= ticketConfig.startNumber}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-300 font-mono">
            Ticket {formattedNumber} / {formatTicketNumber(maxNumber, digits)}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPreviewTicketNumber(Math.min(maxNumber, previewTicketNumber + 1))}
            disabled={previewTicketNumber >= maxNumber}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Ticket Visual — matches the PDF output exactly */}
        <div className="overflow-hidden rounded-lg border border-slate-600 bg-white shadow-2xl">
          <div className="flex">
            {/* Main ticket section (72%) */}
            <div className="flex-[72] flex flex-col justify-between p-4 border-r-2 border-dashed border-gray-300">
              {/* Header info */}
              <div>
                <h2 className="text-sm font-bold text-gray-900 leading-tight">
                  {ticketConfig.eventName}
                </h2>
                <p className="text-[13px] font-bold italic text-red-800 mt-0.5">
                  {ticketConfig.subtitle}
                </p>
                <p className="text-[10px] text-gray-600 mt-1">
                  Sorteo: {ticketConfig.drawDate}
                </p>
                <p className="text-[9px] text-gray-500 leading-tight">
                  Contribución: {ticketConfig.contributionText}
                </p>

                {/* Prizes box */}
                <div className="mt-2 border border-gray-200 rounded p-2">
                  <p className="text-[9px] font-bold text-gray-900 mb-1">LISTA DE PREMIOS:</p>
                  <div className="grid grid-cols-2 gap-x-3">
                    <div className="space-y-[1px]">
                      {col1Prizes.map((prize) => (
                        <p key={prize.position} className="text-[8px] italic text-red-800 leading-tight truncate">
                          {prize.label} {prize.description}
                        </p>
                      ))}
                    </div>
                    <div className="space-y-[1px]">
                      {col2Prizes.map((prize) => (
                        <p key={prize.position} className="text-[8px] italic text-red-800 leading-tight truncate">
                          {prize.label} {prize.description}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: price + number */}
              <div className="flex items-end justify-between mt-3">
                <span className="text-base font-bold text-gray-900">
                  {ticketConfig.priceLabel}
                </span>
                <span className="text-2xl font-bold font-mono text-red-800">
                  N° {formattedNumber}
                </span>
              </div>
            </div>

            {/* Stub section (28%) */}
            <div className="flex-[28] flex flex-col justify-between p-3 bg-gray-50">
              <div>
                <p className="text-[11px] font-bold text-gray-900 text-center border-b border-gray-300 pb-1">
                  TALÓN DE CONTROL
                </p>
                <p className="text-[9px] text-gray-500 text-center mt-1">
                  Sorteo: 19/06/2026
                </p>
                <div className="mt-3 space-y-2">
                  <div>
                    <p className="text-[10px] font-bold text-gray-800">Nombre y Apellido:</p>
                    <div className="border-b border-gray-400 mt-1 h-3" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-800">Teléfono:</p>
                    <div className="border-b border-gray-400 mt-1 h-3" />
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="text-[10px] font-semibold text-gray-600">
                  Valor: {formatCurrency(ticketConfig.price)}
                </p>
                <p className="text-lg font-bold font-mono text-red-800 mt-1">
                  N° {formattedNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cut line indicator */}
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t-2 border-dashed border-slate-600" />
          <span className="text-[9px] text-slate-500 uppercase tracking-wider">línea de corte</span>
          <div className="flex-1 border-t-2 border-dashed border-slate-600" />
        </div>
      </CardContent>
    </Card>
  );
}

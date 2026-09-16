"use client";

import { useMemo } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRifaStore } from "@/store/useRifaStore";
import { formatTicketNumber, getDigitsNeeded, formatCurrency, formatShortDate } from "@/lib/utils";
import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";

export function TicketPreview() {
  const { ticketConfig, printConfig, previewTicketNumber, setPreviewTicketNumber } = useRifaStore();

  // Memoized layout calculations to guarantee 60fps on low-end machines
  const { digits, formattedNumber, maxNumber, ticketsPerPage, totalPages } = useMemo(() => {
    const d = getDigitsNeeded(ticketConfig.totalTickets, ticketConfig.startNumber);
    const fn = formatTicketNumber(previewTicketNumber, d);
    const mn = ticketConfig.startNumber + ticketConfig.totalTickets - 1;

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
    const tpp = cols * rows + sideCount;
    const tp = Math.ceil(ticketConfig.totalTickets / tpp);

    return {
      digits: d,
      formattedNumber: fn,
      maxNumber: mn,
      ticketsPerPage: tpp,
      totalPages: tp,
    };
  }, [
    ticketConfig.totalTickets,
    ticketConfig.startNumber,
    previewTicketNumber,
    printConfig.gap,
    printConfig.ticketWidth,
    printConfig.ticketHeight,
    printConfig.marginTop,
  ]);

  // Prizes split: odd positions left, even positions right
  const col1Prizes = useMemo(
    () => ticketConfig.prizes.filter((_, i) => i % 2 === 0),
    [ticketConfig.prizes]
  );
  const col2Prizes = useMemo(
    () => ticketConfig.prizes.filter((_, i) => i % 2 === 1),
    [ticketConfig.prizes]
  );

  // Dynamic typography calculations
  const fontScale = (ticketConfig.generalFontScale ?? 100) / 100;
  const titleSize = Math.round((ticketConfig.titleFontSize ?? 14) * fontScale);
  const subtitleSize = Math.round((ticketConfig.subtitleFontSize ?? 12) * fontScale);
  const prizesSize = Math.round((ticketConfig.prizesFontSize ?? 8) * fontScale);
  const prizeHeaderSize = Math.max(8, Math.round(prizesSize * 1.1));
  const primaryColor = ticketConfig.primaryColor ?? "#991b1b";

  return (
    <Card className="shadow-lg border-slate-700/80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-amber-400" />
          <span>Vista Previa del Boleto</span>
          <span className="ml-auto text-xs font-normal text-slate-400 font-mono bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800">
            {ticketsPerPage}/pág • {totalPages} págs
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {/* Navegación */}
        <div className="flex items-center justify-between bg-slate-900/40 p-1.5 rounded-lg border border-slate-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPreviewTicketNumber(Math.max(ticketConfig.startNumber, previewTicketNumber - 1))}
            disabled={previewTicketNumber <= ticketConfig.startNumber}
            className="h-8 px-2 text-xs text-slate-300 hover:text-amber-400"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>

          <span className="text-xs sm:text-sm text-amber-400/90 font-mono font-bold">
            N° {formattedNumber} <span className="text-slate-500 font-normal">/ {formatTicketNumber(maxNumber, digits)}</span>
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPreviewTicketNumber(Math.min(maxNumber, previewTicketNumber + 1))}
            disabled={previewTicketNumber >= maxNumber}
            className="h-8 px-2 text-xs text-slate-300 hover:text-amber-400"
          >
            Siguiente
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Ticket Visual — matches the PDF output exactly */}
        <div className="overflow-hidden rounded-lg border border-slate-600 bg-white shadow-2xl transition-none">
          <div className="flex">
            {/* Main ticket section (72%) */}
            <div className="flex-[72] flex flex-col justify-between p-4 border-r-2 border-dashed border-gray-300">
              {/* Header info */}
              <div>
                <h2
                  className="font-bold text-gray-900 leading-tight break-words"
                  style={{ fontSize: `${titleSize}px` }}
                >
                  {ticketConfig.eventName}
                </h2>
                <p
                  className="font-bold italic leading-snug"
                  style={{
                    color: primaryColor,
                    fontSize: `${subtitleSize}px`,
                    marginTop: `${Math.max(2, subtitleSize * 0.1)}px`,
                  }}
                >
                  {ticketConfig.subtitle}
                </p>
                <p className="text-[10px] text-gray-600 mt-1">
                  Sorteo: {ticketConfig.drawDate}
                </p>
                <p className="text-[9px] text-gray-500 leading-tight mt-0.5">
                  Contribución: {ticketConfig.contributionText}
                </p>

                {/* Prizes box */}
                <div className="mt-2 border border-gray-200 rounded p-2 bg-gray-50/50">
                  <p
                    className="font-bold text-gray-900 mb-1 tracking-wider"
                    style={{ fontSize: `${prizeHeaderSize}px` }}
                  >
                    LISTA DE PREMIOS:
                  </p>
                  <div className="grid grid-cols-2 gap-x-3">
                    <div className="space-y-[1px]">
                      {col1Prizes.map((prize) => (
                        <p
                          key={prize.position}
                          className="italic leading-tight truncate"
                          style={{ color: primaryColor, fontSize: `${prizesSize}px` }}
                          title={`${prize.label} ${prize.description}`}
                        >
                          <span className="font-semibold">{prize.label}</span> {prize.description}
                        </p>
                      ))}
                    </div>
                    <div className="space-y-[1px]">
                      {col2Prizes.map((prize) => (
                        <p
                          key={prize.position}
                          className="italic leading-tight truncate"
                          style={{ color: primaryColor, fontSize: `${prizesSize}px` }}
                          title={`${prize.label} ${prize.description}`}
                        >
                          <span className="font-semibold">{prize.label}</span> {prize.description}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: price + number */}
              <div className="flex items-end justify-between mt-3 pt-1">
                <span className="text-base font-bold text-gray-900">
                  {ticketConfig.priceLabel}
                </span>
                <span
                  className="text-2xl font-bold font-mono"
                  style={{ color: primaryColor }}
                >
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
                  Sorteo: {formatShortDate(ticketConfig.drawDate)}
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
                <p
                  className="text-lg font-bold font-mono mt-1"
                  style={{ color: primaryColor }}
                >
                  N° {formattedNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cut line indicator */}
        <div className="flex items-center gap-2 select-none">
          <div className="flex-1 border-t-2 border-dashed border-slate-600" />
          <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">línea de corte</span>
          <div className="flex-1 border-t-2 border-dashed border-slate-600" />
        </div>
      </CardContent>
    </Card>
  );
}

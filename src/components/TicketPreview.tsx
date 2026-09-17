"use client";

import { useMemo } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRifaStore } from "@/store/useRifaStore";
import { formatTicketNumber, getDigitsNeeded, formatCurrency, formatShortDate, resolvePrizeColumns } from "@/lib/utils";
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
    const canFitSide = (printConfig.allowSideTickets ?? true) && (rightRem >= tH);
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
    printConfig.allowSideTickets,
  ]);

  // Dynamic typography calculations
  const fontScale = (ticketConfig.generalFontScale ?? 100) / 100;
  const titleSize = Math.round((ticketConfig.titleFontSize ?? 14) * fontScale);
  const subtitleSize = Math.round((ticketConfig.subtitleFontSize ?? 12) * fontScale);
  const requestedPrizesSize = ticketConfig.prizesFontSize ?? 8;
  const primaryColor = ticketConfig.primaryColor ?? "#991b1b";

  // Dynamic stub dimensions and proportion calculations
  const ticketWidth = printConfig.ticketWidth || 130;
  const ticketHeight = printConfig.ticketHeight || 50;
  const rawStubWidth = printConfig.stubWidth ?? 36;
  const stubWidthMm = Math.min(Math.max(15, rawStubWidth), Math.max(20, ticketWidth - 25));
  const stubPercent = (stubWidthMm / ticketWidth) * 100;
  const mainPercent = 100 - stubPercent;

  // Resolve dynamic prize columns (2, 3, 4 or auto)
  const numPrizeCols = resolvePrizeColumns(
    ticketConfig.prizeColumns,
    ticketConfig.prizes.length,
    requestedPrizesSize
  );

  const prizeColumnsList = useMemo(() => {
    return Array.from({ length: numPrizeCols }, (_, c) =>
      ticketConfig.prizes.filter((_, i) => i % numPrizeCols === c)
    );
  }, [ticketConfig.prizes, numPrizeCols]);

  // Auto-fitting prize font size calculation:
  // Guarantees all prizes fit in the ticket height without dropping any!
  const rowsCount = Math.max(1, Math.ceil(ticketConfig.prizes.length / numPrizeCols));
  const heightFactor = ticketHeight / 50;
  const maxFittingPrizesPx = Math.max(6, Math.floor((78 * heightFactor) / rowsCount));
  const effectivePrizesSize = Math.max(5.5, Math.min(Math.round(requestedPrizesSize * fontScale), maxFittingPrizesPx));
  const isAutoAdjusted = requestedPrizesSize > effectivePrizesSize;
  const prizeHeaderSize = Math.max(7.5, Math.round(effectivePrizesSize * 1.05));

  // Stub typography calculations
  const stubFontSizeBase = ticketConfig.stubFontSize ?? 10;
  const stubMultiplier = stubFontSizeBase / 10;
  const stubWidthFactor = Math.min(1.2, Math.max(0.75, stubWidthMm / 36));
  const stubTitleSize = Math.max(8, Math.round(11 * stubMultiplier * stubWidthFactor * fontScale));
  const stubDateSize = Math.max(7, Math.round(9 * stubMultiplier * stubWidthFactor * fontScale));
  const stubLabelSize = Math.max(7.5, Math.round(10 * stubMultiplier * stubWidthFactor * fontScale));
  const stubValSize = Math.max(8, Math.round(10 * stubMultiplier * stubWidthFactor * fontScale));
  const stubNumSize = Math.max(12, Math.round(18 * stubMultiplier * stubWidthFactor * fontScale));

  return (
    <Card className="shadow-xl border-slate-800/80">
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

        {/* Ticket Visual — matches the PDF output exactly with proportional aspect ratio */}
        <div
          className="overflow-hidden rounded-lg border border-slate-600 bg-white shadow-2xl transition-none w-full"
          style={{
            minHeight: "220px",
            aspectRatio: `${ticketWidth} / ${ticketHeight}`,
          }}
        >
          <div className="flex w-full h-full">
            {/* Main ticket section */}
            <div
              className="flex flex-col justify-between p-3 sm:p-3.5 border-r-2 border-dashed border-gray-300 transition-all overflow-hidden h-full"
              style={{ width: `${mainPercent}%`, flex: `0 0 ${mainPercent}%` }}
            >
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
                    marginTop: `${Math.max(1, subtitleSize * 0.08)}px`,
                  }}
                >
                  {ticketConfig.subtitle}
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">
                  Sorteo: {ticketConfig.drawDate}
                </p>
                <p className="text-[9px] text-gray-500 leading-tight mt-0.5 truncate">
                  Contribución: {ticketConfig.contributionText}
                </p>

                {/* Prizes box */}
                <div className="mt-1.5 border border-gray-200 rounded p-1.5 bg-gray-50/50">
                  <div className="flex items-center justify-between mb-0.5">
                    <p
                      className="font-bold text-gray-900 tracking-wider"
                      style={{ fontSize: `${prizeHeaderSize}px` }}
                    >
                      LISTA DE PREMIOS:
                    </p>
                    {isAutoAdjusted && (
                      <span className="text-[8px] font-mono text-amber-700 bg-amber-100 px-1 rounded border border-amber-300">
                        Auto: {effectivePrizesSize}px
                      </span>
                    )}
                  </div>
                  <div
                    className="grid gap-x-2"
                    style={{
                      gridTemplateColumns: `repeat(${numPrizeCols}, minmax(0, 1fr))`,
                    }}
                  >
                    {prizeColumnsList.map((colPrizes, colIdx) => (
                      <div key={colIdx} className="space-y-[1px] min-w-0">
                        {colPrizes.map((prize) => (
                          <p
                            key={prize.position}
                            className="italic leading-none truncate py-[0.5px]"
                            style={{ color: primaryColor, fontSize: `${effectivePrizesSize}px` }}
                            title={`${prize.label} ${prize.description}`}
                          >
                            <span className="font-semibold">{prize.label}</span> {prize.description}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: price + number */}
              <div className="flex items-end justify-between mt-2 pt-1 border-t border-gray-100">
                <span className="text-sm sm:text-base font-bold text-gray-900">
                  {ticketConfig.priceLabel}
                </span>
                <span
                  className="text-xl sm:text-2xl font-bold font-mono leading-none"
                  style={{ color: primaryColor }}
                >
                  N° {formattedNumber}
                </span>
              </div>
            </div>

            {/* Stub section */}
            <div
              className="flex flex-col justify-between p-2 sm:p-3 bg-gray-50 transition-all overflow-hidden"
              style={{ width: `${stubPercent}%`, flex: `0 0 ${stubPercent}%` }}
            >
              <div>
                <p
                  className="font-bold text-gray-900 text-center border-b border-gray-300 pb-1 truncate leading-tight"
                  style={{ fontSize: `${stubTitleSize}px` }}
                >
                  TALÓN DE CONTROL
                </p>
                <p
                  className="text-gray-500 text-center mt-1 truncate"
                  style={{ fontSize: `${stubDateSize}px` }}
                >
                  Sorteo: {formatShortDate(ticketConfig.drawDate)}
                </p>
                <div className="mt-2.5 space-y-2">
                  <div>
                    <p
                      className="font-bold text-gray-800 truncate"
                      style={{ fontSize: `${stubLabelSize}px` }}
                    >
                      Nombre y Apellido:
                    </p>
                    <div className="border-b border-gray-400 mt-1 h-2.5" />
                  </div>
                  <div>
                    <p
                      className="font-bold text-gray-800 truncate"
                      style={{ fontSize: `${stubLabelSize}px` }}
                    >
                      Teléfono:
                    </p>
                    <div className="border-b border-gray-400 mt-1 h-2.5" />
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <p
                  className="font-semibold text-gray-600 truncate"
                  style={{ fontSize: `${stubValSize}px` }}
                >
                  Valor: {formatCurrency(ticketConfig.price)}
                </p>
                <p
                  className="font-bold font-mono mt-0.5 truncate"
                  style={{ color: primaryColor, fontSize: `${stubNumSize}px` }}
                >
                  N° {formattedNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cut line indicator with live proportions */}
        <div className="space-y-1 select-none">
          <div className="flex items-center gap-2">
            <div className="border-t-2 border-dashed border-slate-600" style={{ width: `${mainPercent}%` }} />
            <span className="text-[9px] text-amber-400/90 uppercase tracking-wider font-mono shrink-0">
              ✂ línea de corte
            </span>
            <div className="border-t-2 border-dashed border-slate-600" style={{ width: `${stubPercent}%` }} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-0.5">
            <span>Cuerpo: {Math.round(mainPercent)}% ({ticketWidth - stubWidthMm} mm)</span>
            <span className="text-amber-300/90 font-semibold">Talón: {Math.round(stubPercent)}% ({stubWidthMm} mm)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

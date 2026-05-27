"use client";

import { Download, Zap, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRifaStore } from "@/store/useRifaStore";
import { usePdfGeneration } from "@/hooks/usePdfGeneration";
import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";

export function GeneratePanel() {
  const { progress, isGenerating, generatedPdfUrl, ticketConfig, printConfig } = useRifaStore();
  const { generate, download } = usePdfGeneration();

  // Cálculo de tickets por página (misma lógica que el PDF)
  const margin = printConfig.marginTop * MM_TO_PT;
  const gap = printConfig.gap * MM_TO_PT;
  const tW = printConfig.ticketWidth * MM_TO_PT;
  const tH = printConfig.ticketHeight * MM_TO_PT;
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

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-400" />
          Generar PDF
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Resumen */}
        <div className="rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-4 space-y-2">
          <h4 className="text-sm font-semibold text-slate-200">Resumen de Generación</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Tickets:</span>
              <span className="text-slate-200 font-mono">{ticketConfig.totalTickets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Páginas:</span>
              <span className="text-slate-200 font-mono">{totalPages}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rango:</span>
              <span className="text-slate-200 font-mono">
                {ticketConfig.startNumber} - {ticketConfig.startNumber + ticketConfig.totalTickets - 1}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Por página:</span>
              <span className="text-slate-200 font-mono">{ticketsPerPage}</span>
            </div>
          </div>
        </div>

        {/* Barra de progreso con animación */}
        {progress.status !== "idle" && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                {progress.status === "generating" && (
                  <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
                )}
                {progress.message}
              </span>
              <span className="text-amber-400 font-mono font-bold">{progress.percentage}%</span>
            </div>
            <Progress value={progress.percentage} />
          </div>
        )}

        {/* Estado completado con animación */}
        {progress.status === "complete" && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-900/30 border border-emerald-700/50 p-3 animate-in fade-in zoom-in-95 duration-500">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 animate-bounce" />
            <span className="text-sm text-emerald-300 font-medium">{progress.message}</span>
          </div>
        )}

        {/* Estado de error */}
        {progress.status === "error" && (
          <div className="flex items-center gap-2 rounded-lg bg-red-900/30 border border-red-700/50 p-3 animate-in fade-in duration-300">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <span className="text-sm text-red-300">{progress.message}</span>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            onClick={generate}
            disabled={isGenerating}
            className={`w-full relative overflow-hidden transition-all duration-500 ${
              isGenerating
                ? "animate-pulse"
                : "hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="animate-pulse">Generando...</span>
              </>
            ) : (
              <>
                <FileText className="h-5 w-5" />
                Generar {ticketConfig.totalTickets} Tickets
              </>
            )}
          </Button>

          {generatedPdfUrl && (
            <Button
              size="lg"
              variant="secondary"
              onClick={download}
              className="w-full animate-in fade-in slide-in-from-bottom-3 duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-500/20 active:scale-[0.98] transition-all"
            >
              <Download className="h-5 w-5 animate-bounce" />
              Descargar PDF ({totalPages} páginas)
            </Button>
          )}

          {generatedPdfUrl && (
            <a
              href={generatedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors animate-in fade-in duration-700"
            >
              Abrir PDF en nueva pestaña
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

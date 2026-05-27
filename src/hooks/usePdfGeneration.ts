"use client";

import { useCallback } from "react";
import { useRifaStore } from "@/store/useRifaStore";
import { generateRifaPDF, downloadPdf } from "@/services/pdf-generator";

export function usePdfGeneration() {
  const {
    ticketConfig,
    printConfig,
    setProgress,
    setGeneratedPdfUrl,
    setIsGenerating,
  } = useRifaStore();

  const generate = useCallback(async () => {
    setIsGenerating(true);
    setProgress({
      current: 0,
      total: ticketConfig.totalTickets,
      percentage: 0,
      status: "generating",
      message: "Generando tickets...",
    });

    try {
      const pdfBytes = await generateRifaPDF({
        ticketConfig,
        printConfig,
        onProgress: (current, total) => {
          const percentage = Math.round((current / total) * 100);
          setProgress({
            current,
            total,
            percentage,
            status: "generating",
            message: `Generando ticket ${current} de ${total}...`,
          });
        },
      });

      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setGeneratedPdfUrl(url);

      setProgress({
        current: ticketConfig.totalTickets,
        total: ticketConfig.totalTickets,
        percentage: 100,
        status: "complete",
        message: `¡${ticketConfig.totalTickets} tickets generados exitosamente!`,
      });

      setIsGenerating(false);
      return pdfBytes;
    } catch (error) {
      setProgress({
        status: "error",
        message: `Error: ${error instanceof Error ? error.message : "Error desconocido"}`,
      });
      setIsGenerating(false);
      throw error;
    }
  }, [ticketConfig, printConfig, setProgress, setGeneratedPdfUrl, setIsGenerating]);

  const download = useCallback(async () => {
    const pdfBytes = await generate();
    if (pdfBytes) {
      const filename = `rifas_${ticketConfig.eventName.replace(/[^a-zA-Z0-9]/g, "_")}_${ticketConfig.startNumber}-${ticketConfig.startNumber + ticketConfig.totalTickets - 1}.pdf`;
      downloadPdf(pdfBytes, filename);
    }
  }, [generate, ticketConfig]);

  return { generate, download };
}

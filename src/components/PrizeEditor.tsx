"use client";

import React, { useState, useRef, useEffect } from "react";
import { Trophy, Plus, Trash2, RotateCcw, List, AlignLeft, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRifaStore } from "@/store/useRifaStore";
import { DEFAULT_PRIZES } from "@/lib/constants";
import { Prize } from "@/types";

export function PrizeEditor() {
  const { ticketConfig, setTicketConfig } = useRifaStore();
  const prizes = ticketConfig.prizes;

  const [mode, setMode] = useState<"list" | "text">("list");
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus management when items are added or removed
  useEffect(() => {
    if (focusIndex !== null && inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex]?.focus();
      setFocusIndex(null);
    }
  }, [focusIndex, prizes.length]);

  // Re-indexes an array of prizes so positions are 1..N and labels are 1°..N°
  const reindex = (items: { description: string }[]): Prize[] => {
    return items.map((item, idx) => ({
      position: idx + 1,
      label: `${idx + 1}°`,
      description: item.description,
    }));
  };

  const updatePrizes = (newPrizes: Prize[]) => {
    setTicketConfig({ prizes: newPrizes });
  };

  const handleDescriptionChange = (index: number, description: string) => {
    const updated = prizes.map((p, i) =>
      i === index ? { ...p, description } : p
    );
    updatePrizes(updated);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Insert a new prize immediately after the current one ("sume un 1")
      const newItems = [...prizes];
      newItems.splice(index + 1, 0, {
        position: index + 2,
        label: `${index + 2}°`,
        description: "",
      });
      const reindexed = reindex(newItems);
      updatePrizes(reindexed);
      setFocusIndex(index + 1);
    } else if (e.key === "Backspace" && prizes[index].description === "") {
      if (prizes.length > 1) {
        e.preventDefault();
        const newItems = prizes.filter((_, i) => i !== index);
        const reindexed = reindex(newItems);
        updatePrizes(reindexed);
        setFocusIndex(Math.max(0, index - 1));
      }
    } else if (e.key === "ArrowDown" && index < prizes.length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const pastedText = e.clipboardData.getData("text");
    if (pastedText.includes("\n")) {
      e.preventDefault();
      const lines = pastedText
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
        // Clean common prefixes if any like "1-", "1.", "1°"
        .map((l) => l.replace(/^(\d+[\.\-\°\)]\s*)/, ""));

      if (lines.length === 0) return;

      const newItems = [...prizes];
      // Replace current item with first line
      newItems[index] = { ...newItems[index], description: lines[0] };
      const remainingItems: Prize[] = lines.slice(1).map((desc, i) => ({
        position: index + 2 + i,
        label: `${index + 2 + i}°`,
        description: desc,
      }));
      newItems.splice(index + 1, 0, ...remainingItems);

      const reindexed = reindex(newItems);
      updatePrizes(reindexed);
      setFocusIndex(index + lines.length - 1);
    }
  };

  const handleAddPrize = () => {
    const newIndex = prizes.length;
    const updated = [
      ...prizes,
      {
        position: newIndex + 1,
        label: `${newIndex + 1}°`,
        description: "",
      },
    ];
    updatePrizes(updated);
    setFocusIndex(newIndex);
  };

  const handleRemovePrize = (index: number) => {
    if (prizes.length <= 1) {
      // Keep at least one empty item
      updatePrizes([{ position: 1, label: "1°", description: "" }]);
      setFocusIndex(0);
      return;
    }
    const filtered = prizes.filter((_, i) => i !== index);
    updatePrizes(reindex(filtered));
    setFocusIndex(Math.min(index, filtered.length - 1));
  };

  const handleResetDefaults = () => {
    updatePrizes(DEFAULT_PRIZES);
  };

  const handleClearAll = () => {
    updatePrizes([{ position: 1, label: "1°", description: "" }]);
    setFocusIndex(0);
  };

  // Raw text multi-line mode handlers
  const rawTextValue = prizes.map((p) => p.description).join("\n");

  const handleRawTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split("\n");
    const newPrizes: Prize[] = lines.map((line, idx) => ({
      position: idx + 1,
      label: `${idx + 1}°`,
      description: line,
    }));
    updatePrizes(newPrizes.length > 0 ? newPrizes : [{ position: 1, label: "1°", description: "" }]);
  };

  return (
    <div className="space-y-3 pt-1">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 font-medium text-slate-200">
          <Trophy className="h-4 w-4 text-amber-400" />
          Premios ({prizes.length})
        </Label>

        <div className="flex items-center gap-1">
          {/* Mode toggle */}
          <div className="flex rounded-md bg-slate-800 p-0.5 border border-slate-700/60">
            <button
              type="button"
              onClick={() => setMode("list")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors cursor-pointer ${
                mode === "list"
                  ? "bg-amber-500/20 text-amber-400 font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Modo lista itemizada (Enter suma el siguiente)"
            >
              <List className="h-3.5 w-3.5" />
              Lista
            </button>
            <button
              type="button"
              onClick={() => setMode("text")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors cursor-pointer ${
                mode === "text"
                  ? "bg-amber-500/20 text-amber-400 font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Modo texto libre (una línea por premio)"
            >
              <AlignLeft className="h-3.5 w-3.5" />
              Texto
            </button>
          </div>

          {/* Quick font size adjustment for prizes */}
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700/60 rounded px-1.5 py-0.5" title="Tamaño de letra de premios">
            <span className="text-[10px] text-slate-400 font-medium">Fuente:</span>
            <button
              type="button"
              onClick={() =>
                setTicketConfig({
                  prizesFontSize: Math.max(6, (ticketConfig.prizesFontSize ?? 8) - 1),
                })
              }
              className="text-xs text-slate-400 hover:text-amber-400 px-1 py-0.5 rounded cursor-pointer"
              title="Achicar letra de premios"
            >
              -
            </button>
            <span className="font-mono text-[11px] font-bold text-amber-400 px-0.5">
              {ticketConfig.prizesFontSize ?? 8}px
            </span>
            <button
              type="button"
              onClick={() =>
                setTicketConfig({
                  prizesFontSize: Math.min(14, (ticketConfig.prizesFontSize ?? 8) + 1),
                })
              }
              className="text-xs text-slate-400 hover:text-amber-400 px-1 py-0.5 rounded cursor-pointer"
              title="Agrandar letra de premios"
            >
              +
            </button>
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-amber-400 rounded transition-colors cursor-pointer"
            title="Restablecer premios de muestra"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Defecto</span>
          </button>
        </div>
      </div>

      {mode === "list" ? (
        <div className="space-y-2">
          {/* Scrollable list of items */}
          <div className="max-h-72 overflow-y-auto rounded-lg border border-slate-700/80 bg-slate-900/60 p-2.5 space-y-1.5 focus-within:border-amber-500/50 transition-colors shadow-inner">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className="group flex items-center gap-2 rounded-md bg-slate-800/40 p-1 pl-1.5 border border-slate-800 hover:border-slate-700/80 transition-all"
              >
                {/* Number Badge */}
                <span className="flex items-center justify-center min-w-[32px] h-7 text-xs font-bold font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded select-none">
                  {prize.label}
                </span>

                {/* Description Input */}
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  value={prize.description}
                  placeholder={`Descripción del premio ${prize.label}...`}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e, index)}
                  className="flex-1 bg-transparent px-2 py-1 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 rounded transition-all"
                />

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleRemovePrize(index)}
                  className="opacity-40 group-hover:opacity-100 hover:text-red-400 p-1 text-slate-400 rounded transition-all cursor-pointer"
                  title="Eliminar premio"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Action buttons below the list */}
          <div className="flex items-center justify-between pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddPrize}
              className="h-7 text-xs border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 hover:border-amber-500/50"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Agregar premio ({prizes.length + 1}°)
            </Button>

            {prizes.length > 1 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-[11px] text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                Limpiar todo
              </button>
            )}
          </div>

          {/* Helper hint */}
          <div className="flex items-start gap-1.5 text-[11px] text-slate-400 leading-tight">
            <Info className="h-3.5 w-3.5 text-amber-400/80 shrink-0 mt-0.5" />
            <span>
              Presiona <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-amber-300 font-mono">Enter</kbd> en cualquier premio para sumar automáticamente el siguiente (sumando 1). También puedes pegar una lista de varias líneas.
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Textarea mode with line numbers preview */}
          <div className="rounded-lg border border-slate-700/80 bg-slate-900/60 p-2.5 focus-within:border-amber-500/50 transition-colors shadow-inner">
            <div className="flex gap-2">
              {/* Number gutter */}
              <div className="select-none py-1.5 text-right font-mono text-xs text-amber-400/60 leading-5 space-y-0 min-w-[28px]">
                {prizes.map((_, i) => (
                  <div key={i}>{i + 1}°</div>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                value={rawTextValue}
                onChange={handleRawTextChange}
                placeholder="Escribe un premio por línea... Cada Enter sumará un número."
                rows={Math.min(Math.max(prizes.length, 5), 14)}
                className="w-full resize-y bg-transparent py-1.5 text-xs text-slate-200 leading-5 focus:outline-none placeholder:text-slate-500 font-sans"
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-amber-400/80 shrink-0" />
            Cada salto de línea (<kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-amber-300 font-mono">Enter</kbd>) suma un premio numerado automáticamente.
          </p>
        </div>
      )}

      {/* Notice if prizes exceed 20 */}
      {prizes.length > 20 && (
        <div className="text-[11px] text-amber-400/90 bg-amber-500/10 border border-amber-500/20 rounded px-2 py-1.5 flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <span>El diseño del boleto imprime hasta 20 premios (10 por columna) para legibilidad óptima.</span>
        </div>
      )}
    </div>
  );
}

"use client";

import { Ticket, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRifaStore } from "@/store/useRifaStore";

export function Header() {
  const { darkMode, setDarkMode } = useRifaStore();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20">
            <Ticket className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 tracking-tight">
              Generador de Rifas
            </h1>
            <p className="text-xs text-slate-400">
              Sistema profesional de tickets
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-slate-300" />
          )}
        </Button>
      </div>
    </header>
  );
}

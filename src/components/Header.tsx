"use client";

import { Ticket } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-md">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20">
            <Ticket className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm sm:text-lg font-bold text-slate-100 tracking-tight">
              Eventazo
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">
              Generador de rifas profesional
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

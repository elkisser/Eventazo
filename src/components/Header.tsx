"use client";

import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-md">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/icon.svg"
            alt="Eventazo"
            width={40}
            height={40}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg shadow-lg shadow-amber-500/20"
          />
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

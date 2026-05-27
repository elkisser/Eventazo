"use client";

import { Header } from "@/components/Header";
import { ConfigPanel } from "@/components/ConfigPanel";
import { PrintConfigPanel } from "@/components/PrintConfigPanel";
import { TicketPreview } from "@/components/TicketPreview";
import { GeneratePanel } from "@/components/GeneratePanel";
import { ImageUpload } from "@/components/ImageUpload";
import { PageLayoutPreview } from "@/components/PageLayoutPreview";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
            Gran Rifa Especial Día del Padre
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Escuela Nro. 71 Pedro Goyena • Sorteo 19 de Junio 2026
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Config */}
          <div className="lg:col-span-4 space-y-6">
            <ConfigPanel />
            <ImageUpload />
          </div>

          {/* Center Column - Preview */}
          <div className="lg:col-span-5 space-y-6">
            <TicketPreview />
            <PrintConfigPanel />
          </div>

          {/* Right Column - Generate */}
          <div className="lg:col-span-3 space-y-6">
            <GeneratePanel />

            {/* Quick Stats */}
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/80 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-slate-200">Información Rápida</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">Números únicos garantizados</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">Optimizado para impresión A4</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">PDF de alta calidad</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">Líneas de corte incluidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">Talón de control con datos</span>
                </div>
              </div>
            </div>

            {/* Page Layout Preview */}
            <PageLayoutPreview />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-slate-500">
            Generador de Rifas Profesional • Diseñado para impresión de alta calidad
          </p>
        </div>
      </footer>
    </div>
  );
}

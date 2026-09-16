"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ConfigPanel } from "@/components/ConfigPanel";
import { PrintConfigPanel } from "@/components/PrintConfigPanel";
import { TicketPreview } from "@/components/TicketPreview";
import { GeneratePanel } from "@/components/GeneratePanel";
import { ImageUpload } from "@/components/ImageUpload";
import { PageLayoutPreview } from "@/components/PageLayoutPreview";
import { Eye, Settings, Printer, FileText } from "lucide-react";

type MobileTab = "preview" | "config" | "print" | "generate";

export default function Home() {
  const [mobileTab, setMobileTab] = useState<MobileTab>("preview");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Hero */}
        <div className="mb-4 sm:mb-8 text-center">
          <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
            Gran Rifa Especial Día del Padre
          </h2>
          <p className="mt-1 sm:mt-2 text-slate-400 text-xs sm:text-sm">
            Escuela Nro. 71 Pedro Goyena • Sorteo 19 de Junio 2026
          </p>
        </div>

        {/* === MOBILE: Tabs de navegación === */}
        <div className="lg:hidden mb-4">
          <div className="flex rounded-xl bg-slate-800/80 border border-slate-700/50 p-1 gap-1">
            <TabButton
              active={mobileTab === "preview"}
              onClick={() => setMobileTab("preview")}
              icon={<Eye className="h-4 w-4" />}
              label="Preview"
            />
            <TabButton
              active={mobileTab === "generate"}
              onClick={() => setMobileTab("generate")}
              icon={<FileText className="h-4 w-4" />}
              label="Generar"
            />
            <TabButton
              active={mobileTab === "config"}
              onClick={() => setMobileTab("config")}
              icon={<Settings className="h-4 w-4" />}
              label="Config"
            />
            <TabButton
              active={mobileTab === "print"}
              onClick={() => setMobileTab("print")}
              icon={<Printer className="h-4 w-4" />}
              label="Impresión"
            />
          </div>
        </div>

        {/* === MOBILE: Contenido por tab === */}
        <div className="lg:hidden space-y-4">
          {mobileTab === "preview" && <TicketPreview />}
          {mobileTab === "generate" && (
            <>
              <GeneratePanel />
              <PageLayoutPreview />
            </>
          )}
          {mobileTab === "config" && (
            <>
              <div className="sticky top-2 z-10 shadow-xl">
                <TicketPreview />
              </div>
              <ConfigPanel />
              <ImageUpload />
            </>
          )}
          {mobileTab === "print" && (
            <>
              <TicketPreview />
              <PrintConfigPanel />
            </>
          )}
        </div>

        {/* === DESKTOP: Grid de 3 columnas === */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start">
          {/* Columna izquierda - Configuración */}
          <div className="lg:col-span-4 space-y-6">
            <ConfigPanel />
            <ImageUpload />
          </div>

          {/* Columna central - Vista previa persistente y pegajosa */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-4 self-start">
            <TicketPreview />
            <PrintConfigPanel />
          </div>

          {/* Columna derecha - Generar */}
          <div className="lg:col-span-3 space-y-6">
            <GeneratePanel />

            {/* Info rápida */}
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

            <PageLayoutPreview />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-3 sm:py-4 mt-6 sm:mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] sm:text-xs text-slate-500">
            Eventazo • Hecho por{" "}
            <a
              href="https://somos-env.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
            >
              SoMoS
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

// Componente de botón de tab para mobile
function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 rounded-lg text-[10px] font-medium transition-all duration-200 ${
        active
          ? "bg-amber-500/20 text-amber-400 shadow-sm"
          : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

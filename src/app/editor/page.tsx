"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ConfigPanel } from "@/components/ConfigPanel";
import { PrintConfigPanel } from "@/components/PrintConfigPanel";
import { TicketPreview } from "@/components/TicketPreview";
import { GeneratePanel } from "@/components/GeneratePanel";
import { ImageUpload } from "@/components/ImageUpload";
import { PageLayoutPreview } from "@/components/PageLayoutPreview";
import { PresetSelector } from "@/components/PresetSelector";
import { useRifaStore } from "@/store/useRifaStore";
import { Eye, Settings, Printer, FileText, Sparkles, ArrowLeft } from "lucide-react";

type MobileTab = "preview" | "config" | "print" | "generate";

export default function EditorPage() {
  const [mobileTab, setMobileTab] = useState<MobileTab>("preview");
  const [showPresets, setShowPresets] = useState(false);
  const { ticketConfig } = useRifaStore();

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-5">
        {/* Barra superior con navegación */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 sm:px-5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800/60"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a Inicio</span>
            </Link>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100 truncate">
                {ticketConfig.eventName || "Diseñador de Boletos"}
              </h2>
              <p className="text-[11px] text-slate-400 truncate">
                {ticketConfig.subtitle || "Editor y generador en vivo"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPresets(!showPresets)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>{showPresets ? "Ocultar Plantillas" : "Cargar Plantilla"}</span>
            </button>
          </div>
        </div>

        {/* Desplegable de plantillas */}
        {showPresets && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <PresetSelector onSelect={() => setShowPresets(false)} />
          </div>
        )}

        {/* === MOBILE: Tabs de navegación === */}
        <div className="lg:hidden">
          <div className="flex rounded-2xl bg-slate-900/80 border border-slate-800/80 p-1 gap-1 backdrop-blur-sm shadow-md">
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
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 space-y-3 shadow-lg">
              <h4 className="text-sm font-semibold text-slate-200">Garantías del Sistema</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">0% error de duplicación o saltos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">Aprovechamiento A4 al 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">PDF vectorial de máxima nitidez</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">Líneas de corte punteadas listas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">Talón de control desprendible</span>
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

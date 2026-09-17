"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FolderOpen,
  Save,
  LogIn,
  LogOut,
  Check,
  Sparkles,
  ArrowRight,
  Sliders,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { ProfileModal } from "@/components/auth/ProfileModal";
import { SavedTicketsDrawer } from "@/components/SavedTicketsDrawer";
import { useRifaStore } from "@/store/useRifaStore";
import { saveTicketDesign, getSavedTickets } from "@/services/tickets-service";

export function Header() {
  const pathname = usePathname();
  const isEditor = pathname === "/editor";
  const { user, signOut } = useAuth();
  const { ticketConfig, printConfig } = useRifaStore();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  // Cargar cantidad de boletos guardados
  const refreshCount = async () => {
    try {
      const list = await getSavedTickets();
      setSavedCount(list.length);
    } catch {
      // Fallback silencioso
    }
  };

  useEffect(() => {
    refreshCount();
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    setSaving(true);
    try {
      await saveTicketDesign(
        ticketConfig.eventName || "Mi Rifa",
        ticketConfig,
        printConfig
      );
      setSaveSuccess(true);
      refreshCount();
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e) {
      console.error("Error al guardar:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo & Marca unificada */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Image
                src="/icon.svg"
                alt="Eventazo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-black text-slate-950">
                ★
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-100">
                  Eventazo
                </span>
                <span className="rounded bg-gradient-to-r from-amber-500/20 to-amber-300/20 border border-amber-500/40 px-1.5 py-0.2 text-[9px] font-bold text-amber-400">
                  PRO
                </span>
              </div>
            </div>
          </Link>

          {/* Enlaces de navegación desktop */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            {isEditor ? (
              <>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <Home className="h-3.5 w-3.5 text-amber-400" />
                  <span>Inicio</span>
                </Link>
                <Link
                  href="/#caracteristicas"
                  className="hover:text-amber-400 transition-colors"
                >
                  Características
                </Link>
                <Link
                  href="/#calculadora"
                  className="hover:text-amber-400 transition-colors"
                >
                  Calculadora de Ahorro
                </Link>
                <Link
                  href="/#preguntas"
                  className="hover:text-amber-400 transition-colors"
                >
                  Preguntas
                </Link>
              </>
            ) : (
              <>
                <a href="#caracteristicas" className="hover:text-amber-400 transition-colors">
                  Características
                </a>
                <a href="#calculadora" className="hover:text-amber-400 transition-colors">
                  Calculadora de Ahorro
                </a>
                <a href="#comparativa" className="hover:text-amber-400 transition-colors">
                  Comparativa
                </a>
                <a href="#casos" className="hover:text-amber-400 transition-colors">
                  Casos de Uso
                </a>
                <a href="#preguntas" className="hover:text-amber-400 transition-colors">
                  Preguntas Frecuentes
                </a>
              </>
            )}
          </div>

          {/* Acciones del Header */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Botón Mis Rifas (accesible siempre) */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
              className="border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-400 text-xs h-9 px-3 rounded-xl gap-1.5 shadow-sm"
            >
              <FolderOpen className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Mis Rifas</span>
              {savedCount > 0 && (
                <span className="ml-1 rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-mono font-bold text-amber-400 border border-amber-500/30">
                  {savedCount}
                </span>
              )}
            </Button>

            {/* Acción Primaria según la ruta */}
            {isEditor ? (
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className={`h-9 px-3.5 sm:px-4 text-xs font-bold rounded-xl gap-1.5 transition-all shadow-lg ${
                  saveSuccess
                    ? "bg-emerald-500 text-white shadow-emerald-500/25 scale-105"
                    : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/25 active:scale-95"
                }`}
              >
                {saveSuccess ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>¡Guardado!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>{saving ? "Guardando..." : "Guardar"}</span>
                  </>
                )}
              </Button>
            ) : (
              <Link href="/editor">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs h-9 px-3.5 sm:px-4 rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-1.5 group"
                >
                  <Sliders className="h-3.5 w-3.5" />
                  <span>Crear Rifa Gratis</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            )}

            {/* Usuario / Login */}
            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-2 pl-1 border-l border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 transition-colors text-left group"
                  title="Ver y editar mi perfil"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-500/30 group-hover:scale-105 transition-transform">
                    {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-amber-300 max-w-[100px] truncate hidden md:inline transition-colors">
                    {user.name || user.email.split("@")[0]}
                  </span>
                  {user.isDemo && (
                    <span className="text-[9px] bg-slate-800 text-amber-300 px-1 py-0.5 rounded border border-slate-700">
                      Demo
                    </span>
                  )}
                </button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  title="Cerrar sesión"
                  className="h-9 w-9 p-0 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-900"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAuthOpen(true)}
                className="h-9 px-3 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-900 border border-slate-800/80 rounded-xl gap-1.5"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Ingresar</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Modal de Autenticación */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          refreshCount();
        }}
      />

      {/* Modal de Perfil de Usuario */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Cajón de Rifas Guardadas */}
      <SavedTicketsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectTicket={() => {
          refreshCount();
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    </>
  );
}


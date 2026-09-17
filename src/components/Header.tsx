"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FolderOpen,
  Save,
  LogIn,
  LogOut,
  User as UserIcon,
  Check,
  Sparkles,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { ProfileModal } from "@/components/auth/ProfileModal";
import { SavedTicketsDrawer } from "@/components/SavedTicketsDrawer";
import { useRifaStore } from "@/store/useRifaStore";
import { saveTicketDesign, getSavedTickets } from "@/services/tickets-service";

export function Header() {
  const { user, signOut, isConfigured } = useAuth();
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
      // Ignorar error silencioso
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
      <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-slate-900/90 backdrop-blur-md">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
          {/* Logo & Marca */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Image
                src="/icon.svg"
                alt="Eventazo"
                width={40}
                height={40}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl shadow-lg shadow-amber-500/20"
              />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-black text-slate-950">
                ★
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-lg font-black text-slate-100 tracking-tight">
                  Eventazo
                </h1>
                <span className="rounded bg-gradient-to-r from-amber-500/20 to-amber-300/20 border border-amber-500/40 px-1.5 py-0.2 text-[9px] font-bold text-amber-300">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Diseño & Impresión de Rifas Profesionales
              </p>
            </div>
          </div>

          {/* Acciones del Header */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Botón Mis Rifas */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
              className="border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-amber-400 text-xs h-8 sm:h-9 px-2 sm:px-3 rounded-xl gap-1.5"
            >
              <FolderOpen className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Mis Rifas</span>
              {savedCount > 0 && (
                <span className="ml-1 rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-mono font-bold text-amber-400">
                  {savedCount}
                </span>
              )}
            </Button>

            {/* Botón Guardar Rifa */}
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className={`h-8 sm:h-9 px-2 sm:px-3 text-xs font-bold rounded-xl gap-1.5 transition-all shadow-md ${
                saveSuccess
                  ? "bg-emerald-500 text-white shadow-emerald-500/20"
                  : "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/20"
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

            {/* Usuario / Login */}
            {user ? (
              <div className="flex items-center gap-1 sm:gap-2 pl-1 border-l border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 transition-colors text-left group"
                  title="Ver y editar mi perfil"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-500/30 group-hover:scale-105 transition-transform">
                    {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-amber-300 max-w-[95px] truncate hidden md:inline transition-colors">
                    {user.name || user.email.split("@")[0]}
                  </span>
                  {user.isDemo && (
                    <span className="text-[9px] bg-slate-700 text-amber-300 px-1 rounded">
                      Demo
                    </span>
                  )}
                </button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  title="Cerrar sesión"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-rose-400 rounded-xl"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAuthOpen(true)}
                className="h-8 sm:h-9 px-2 sm:px-3 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 rounded-xl gap-1.5"
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

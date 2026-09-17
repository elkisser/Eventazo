"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Sliders,
  FolderOpen,
  Save,
  User,
  Check,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRifaStore } from "@/store/useRifaStore";
import { saveTicketDesign, getSavedTickets } from "@/services/tickets-service";
import { AuthModal } from "@/components/auth/AuthModal";
import { ProfileModal } from "@/components/auth/ProfileModal";
import { SavedTicketsDrawer } from "@/components/SavedTicketsDrawer";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { ticketConfig, printConfig } = useRifaStore();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  const refreshCount = async () => {
    try {
      const list = await getSavedTickets();
      setSavedCount(list.length);
    } catch {}
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
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      setIsProfileOpen(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <>
      {/* Barra de navegación inferior fija estilo Native App */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl">
        <div className="grid grid-cols-5 items-center justify-items-center">
          {/* 1. Inicio / Landing */}
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-colors ${
              pathname === "/"
                ? "text-amber-400 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-[10px]">Inicio</span>
          </Link>

          {/* 2. Editor */}
          <Link
            href="/editor"
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-colors ${
              pathname === "/editor"
                ? "text-amber-400 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="h-5 w-5" />
            <span className="text-[10px]">Editor</span>
          </Link>

          {/* 3. Acción central destacada según contexto */}
          {pathname === "/editor" ? (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex flex-col items-center -mt-4 group"
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                  saveSuccess
                    ? "bg-emerald-500 text-white shadow-emerald-500/30 scale-105"
                    : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 group-active:scale-95"
                }`}
              >
                {saveSuccess ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
              </div>
              <span className="text-[10px] font-bold text-amber-400 mt-1">
                {saveSuccess ? "¡Listo!" : saving ? "..." : "Guardar"}
              </span>
            </button>
          ) : (
            <Link
              href="/editor"
              className="flex flex-col items-center -mt-4 group"
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 group-active:scale-95 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-400 mt-1">
                Crear
              </span>
            </Link>
          )}

          {/* 4. Mis Rifas */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 relative transition-colors"
          >
            <FolderOpen className="h-5 w-5" />
            <span className="text-[10px]">Mis Rifas</span>
            {savedCount > 0 && (
              <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-mono font-black flex items-center justify-center shadow-sm">
                {savedCount}
              </span>
            )}
          </button>

          {/* 5. Perfil / Cuenta */}
          <button
            onClick={handleProfileClick}
            className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
          >
            {user ? (
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-500/40">
                {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
            ) : (
              <User className="h-5 w-5" />
            )}
            <span className="text-[10px]">{user ? "Perfil" : "Entrar"}</span>
          </button>
        </div>
      </nav>

      {/* Modales */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => refreshCount()}
      />
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <SavedTicketsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectTicket={() => refreshCount()}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    </>
  );
}

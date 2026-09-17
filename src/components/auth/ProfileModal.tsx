"use client";

import { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Sparkles,
  Database,
  Ticket,
  KeyRound,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getSavedTickets } from "@/services/tickets-service";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, updateProfile, updatePassword, signOut, isConfigured } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savedTicketsCount, setSavedTicketsCount] = useState(0);

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      getSavedTickets().then((tickets) => setSavedTicketsCount(tickets.length)).catch(() => {});
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setProfileLoading(true);

    try {
      const res = await updateProfile(name, email);
      if (res.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setStatusMessage({ type: "success", text: res.message || "Perfil actualizado exitosamente" });
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (newPassword.length < 6) {
      setStatusMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: "error", text: "Las contraseñas no coinciden" });
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await updatePassword(newPassword);
      if (res.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setStatusMessage({ type: "success", text: "Contraseña actualizada exitosamente" });
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700/80 bg-slate-900 p-5 sm:p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header con Avatar */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center text-xl font-black shadow-lg shadow-amber-500/30">
            {name ? name[0].toUpperCase() : user.email[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-slate-100">{name || "Mi Cuenta"}</h3>
              <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.2 text-[9px] font-bold text-amber-300">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[220px]">{user.email}</p>
          </div>
        </div>

        {/* Métricas de la cuenta */}
        <div className="grid grid-cols-2 gap-2.5 my-4">
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Ticket className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">{savedTicketsCount}</p>
              <p className="text-[10px] text-slate-400">Rifas Guardadas</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">{isConfigured ? "Supabase Cloud" : "Local Demo"}</p>
              <p className="text-[10px] text-slate-400">Almacenamiento</p>
            </div>
          </div>
        </div>

        {/* Alerta de Feedback */}
        {statusMessage && (
          <div
            className={`mb-4 flex items-center gap-2 p-3 rounded-2xl text-xs ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Formulario 1: Datos Personales */}
        <form onSubmit={handleUpdateProfile} className="space-y-3 pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-amber-400" />
            <span>Datos del Perfil</span>
          </h4>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre o el de tu organización"
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              disabled={profileLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            disabled={profileLoading}
            size="sm"
            className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-300 text-xs font-semibold h-9 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {profileLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                <span>Guardando cambios...</span>
              </>
            ) : (
              <span>Guardar Cambios de Perfil</span>
            )}
          </Button>
        </form>

        {/* Separador */}
        <div className="my-5 border-t border-slate-800" />

        {/* Formulario 2: Cambiar Contraseña */}
        <form onSubmit={handleChangePassword} className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <KeyRound className="h-3.5 w-3.5 text-amber-400" />
            <span>Seguridad y Contraseña</span>
          </h4>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">
              Nueva Contraseña
            </label>
            <input
              type="password"
              minLength={6}
              disabled={passwordLoading}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              minLength={6}
              disabled={passwordLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite la nueva contraseña"
              className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            disabled={passwordLoading || !newPassword}
            size="sm"
            className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-300 text-xs font-semibold h-9 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {passwordLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                <span>Actualizando contraseña...</span>
              </>
            ) : (
              <span>Actualizar Contraseña</span>
            )}
          </Button>
        </form>

        {/* Separador y Cerrar Sesión */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Sesión iniciada</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs h-8 rounded-xl flex items-center gap-1.5"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

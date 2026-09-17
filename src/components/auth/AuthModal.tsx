"use client";

import { useState } from "react";
import { X, Lock, Mail, Sparkles, CheckCircle2, AlertCircle, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { signIn, signUp, signInDemo, isConfigured } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);

    try {
      if (mode === "login") {
        const res = await signIn(email, password);
        if (res.error) {
          setError(res.error);
        } else {
          onSuccess?.();
          onClose();
        }
      } else {
        const res = await signUp(email, password);
        if (res.error) {
          setError(res.error);
        } else {
          setMessage(res.message || "¡Cuenta creada exitosamente!");
          setTimeout(() => {
            onSuccess?.();
            onClose();
          }, 1200);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    signInDemo();
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-700/80 bg-slate-900/95 p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Encabezado */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3">
            <Lock className="h-6 w-6 text-slate-950" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">
            {mode === "login" ? "Iniciar Sesión en Eventazo Pro" : "Crear Cuenta en Eventazo"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Guarda tus diseños de rifas, sincroniza tus plantillas y descárgalas cuando quieras.
          </p>

          {/* Badge de estado Supabase */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium mt-3 border bg-slate-800/80 border-slate-700 text-slate-300">
            <Database className={`h-3 w-3 ${isConfigured ? "text-emerald-400" : "text-amber-400"}`} />
            <span>
              {isConfigured ? "Supabase Conectado" : "Modo Local / Demo activo"}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-slate-800/80 p-1 mb-5 border border-slate-700/60">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "login"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "register"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Alerta de error */}
        {error && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Alerta de éxito */}
        {message && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-300 h-10 text-xs shadow-lg shadow-amber-500/20 rounded-xl mt-2"
          >
            {submitting
              ? "Procesando..."
              : mode === "login"
              ? "Iniciar Sesión"
              : "Crear Cuenta"}
          </Button>
        </form>

        {/* Separador */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-slate-900 px-2 text-slate-500 font-medium">
              o prueba inmediata
            </span>
          </div>
        </div>

        {/* Botón Acceso Rápido Demo */}
        <Button
          type="button"
          variant="outline"
          onClick={handleDemoLogin}
          className="w-full border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-amber-400 hover:text-amber-300 h-9 text-xs rounded-xl flex items-center justify-center gap-2"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Acceder con Modo Demo (1-Click)</span>
        </Button>
      </div>
    </div>
  );
}

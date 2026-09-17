"use client";

import { useState } from "react";
import {
  X,
  Lock,
  Mail,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Database,
  Loader2,
  Copy,
  Check,
  RefreshCw,
  ArrowRight
} from "lucide-react";
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
  const [successLogin, setSuccessLogin] = useState(false);
  const [isUnconfirmed, setIsUnconfirmed] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [confirmingRpc, setConfirmingRpc] = useState(false);

  const { signIn, signUp, signInDemo, confirmEmailAndLogin, isConfigured } = useAuth();

  if (!isOpen) return null;

  const sqlConfirmationQuery = `UPDATE auth.users SET email_confirmed_at = NOW(), confirmed_at = NOW() WHERE email = '${email.trim().toLowerCase() || "andreaarceguet@gmail.com"}';`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsUnconfirmed(false);
    setSubmitting(true);

    try {
      if (mode === "login") {
        const res = await signIn(email, password);
        if (res.error) {
          setError(res.error);
          if (res.isUnconfirmed) {
            setIsUnconfirmed(true);
          }
        } else {
          setSuccessLogin(true);
          setMessage("¡Sesión iniciada correctamente! Cargando tus datos...");
          setTimeout(() => {
            setSuccessLogin(false);
            onSuccess?.();
            onClose();
          }, 800);
        }
      } else {
        const res = await signUp(email, password);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccessLogin(true);
          setMessage(res.message || "¡Cuenta creada exitosamente!");
          setTimeout(() => {
            setSuccessLogin(false);
            onSuccess?.();
            onClose();
          }, 1000);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmAndLogin = async () => {
    setConfirmingRpc(true);
    setError(null);
    try {
      const res = await confirmEmailAndLogin(email, password);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccessLogin(true);
        setMessage("¡Cuenta confirmada y sesión iniciada!");
        setTimeout(() => {
          setSuccessLogin(false);
          onSuccess?.();
          onClose();
        }, 800);
      }
    } finally {
      setConfirmingRpc(false);
    }
  };

  const handleCopySql = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(sqlConfirmationQuery);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  const handleDemoLogin = () => {
    setSubmitting(true);
    signInDemo();
    setSuccessLogin(true);
    setMessage("¡Acceso Demo PRO concedido!");
    setTimeout(() => {
      setSubmitting(false);
      setSuccessLogin(false);
      onSuccess?.();
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-slate-800/90 bg-slate-950/95 p-6 shadow-2xl shadow-amber-500/15 backdrop-blur-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-900 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Encabezado */}
        <div className="text-center mb-5">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/25 mb-3">
            <Lock className="h-6 w-6 text-slate-950" />
          </div>
          <h3 className="text-xl font-black text-slate-100 tracking-tight">
            {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === "login"
              ? "Accede a tus rifas guardadas y gestiona tus diseños privados."
              : "Regístrate gratis para empezar a diseñar y descargar tus rifas."}
          </p>

          {/* Badge de estado Supabase */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium mt-3 border bg-slate-900/80 border-slate-800 text-slate-300">
            <Database className={`h-3 w-3 ${isConfigured ? "text-emerald-400" : "text-amber-400"}`} />
            <span>
              {isConfigured ? "Conexión a Supabase Activa" : "Modo Local / Demo activo"}
            </span>
          </div>
        </div>

        {/* Tabs de Modo */}
        <div className="flex rounded-xl bg-slate-900/80 p-1 mb-4 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
              setIsUnconfirmed(false);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "login"
                ? "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md font-bold"
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
              setIsUnconfirmed(false);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "register"
                ? "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Alerta de Éxito con Animación */}
        {(successLogin || message) && (
          <div className="mb-4 flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="h-4 w-4 shrink-0 animate-bounce" />
            <span className="font-semibold">{message}</span>
          </div>
        )}

        {/* Alerta de Error Convencional */}
        {error && !isUnconfirmed && (
          <div className="mb-4 flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs animate-in fade-in duration-200">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Bloque especial interactivo si el email no está confirmado */}
        {isUnconfirmed && (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-2.5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <p className="font-bold text-slate-100">Cuenta creada pero no confirmada</p>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                  Supabase requiere confirmar el correo antes de permitir el login con contraseña.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Button
                type="button"
                size="sm"
                onClick={handleConfirmAndLogin}
                disabled={confirmingRpc}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs h-8 rounded-lg gap-1.5 shadow-md"
              >
                {confirmingRpc ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Confirmando cuenta...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Auto-Confirmar y Entrar</span>
                  </>
                )}
              </Button>

              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>O ejecuta en Supabase SQL Editor:</span>
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                  >
                    {copiedSql ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedSql ? "¡Copiado!" : "Copiar SQL"}</span>
                  </button>
                </div>
                <code className="block font-mono text-[10px] text-slate-300 bg-slate-950 p-1.5 rounded truncate select-all">
                  {sqlConfirmationQuery}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                disabled={submitting || successLogin}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="andreaarceguet@gmail.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                minLength={6}
                disabled={submitting || successLogin}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Botón Principal con Loader */}
          <Button
            type="submit"
            disabled={submitting || successLogin}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-300 h-10 text-xs shadow-lg shadow-amber-500/25 rounded-xl mt-2 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                <span>{mode === "login" ? "Verificando credenciales..." : "Creando tu cuenta..."}</span>
              </>
            ) : successLogin ? (
              <>
                <Check className="h-4 w-4 text-slate-950" />
                <span>¡Listo!</span>
              </>
            ) : (
              <>
                <span>{mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </form>

        {/* Separador */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-slate-950 px-2 text-slate-500 font-medium">
              o modo inmediato
            </span>
          </div>
        </div>

        {/* Botón Acceso Rápido Demo */}
        <Button
          type="button"
          variant="outline"
          onClick={handleDemoLogin}
          disabled={submitting}
          className="w-full border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-amber-400 hover:text-amber-300 h-9 text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Acceder con Modo Demo Pro (1-Click)</span>
        </Button>
      </div>
    </div>
  );
}


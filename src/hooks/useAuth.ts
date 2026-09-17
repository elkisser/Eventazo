"use client";

import { create } from "zustand";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export interface AppUser {
  id: string;
  email: string;
  name?: string;
  isDemo?: boolean;
  plan?: string;
  isPro?: boolean;
}

const DEMO_USER_KEY = "eventazo_demo_user";

// Traducir mensajes de error comunes de Supabase Auth
export function translateAuthError(errorMsg: string): string {
  const lower = errorMsg.toLowerCase();
  if (lower.includes("email not confirmed")) {
    return "Tu correo no ha sido confirmado aún en Supabase.";
  }
  if (lower.includes("invalid login credentials") || lower.includes("invalid_credentials")) {
    return "Correo o contraseña incorrectos. Verifica tus datos.";
  }
  if (lower.includes("user already registered")) {
    return "Ya existe una cuenta con este correo electrónico.";
  }
  if (lower.includes("password should be at least")) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  if (lower.includes("rate limit") || lower.includes("too many requests")) {
    return "Demasiados intentos. Por favor espera unos minutos.";
  }
  return errorMsg;
}

interface AuthState {
  user: AppUser | null;
  loading: boolean;
  isConfigured: boolean;
  isAuthModalOpen: boolean;
  isProfileModalOpen: boolean;
  isDrawerOpen: boolean;

  // Acciones de UI
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;

  // Acciones de autenticación
  setUser: (user: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
  initAuth: () => () => void;
  signIn: (email: string, password: string) => Promise<{ error: string | null; isUnconfirmed?: boolean }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null; message?: string }>;
  confirmEmailAndLogin: (email: string, password: string) => Promise<{ error: string | null }>;
  signInDemo: () => void;
  updateProfile: (newName: string, newEmail?: string) => Promise<{ error: string | null; message?: string }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  isConfigured: isSupabaseConfigured(),
  isAuthModalOpen: false,
  isProfileModalOpen: false,
  isDrawerOpen: false,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  openProfileModal: () => set({ isProfileModalOpen: true }),
  closeProfileModal: () => set({ isProfileModalOpen: false }),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  initAuth: () => {
    const supabase = getSupabase();

    if (supabase) {
      // 1. Obtener sesión activa inicial
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session?.user) {
          const base: AppUser = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
          };

          try {
            const { data } = await supabase
              .from("profiles")
              .select("full_name, plan, is_pro")
              .eq("id", base.id)
              .single();

            if (data) {
              base.name = data.full_name || base.name;
              base.plan = data.plan || "free";
              base.isPro = data.is_pro || false;
            }
          } catch {
            // Ignorar fallback
          }

          set({ user: base, loading: false });
        } else {
          // Verificar si hay demo activo
          if (typeof window !== "undefined") {
            const demo = localStorage.getItem(DEMO_USER_KEY);
            if (demo) {
              try {
                set({ user: JSON.parse(demo), loading: false });
                return;
              } catch {}
            }
          }
          set({ user: null, loading: false });
        }
      });

      // 2. Escuchar cambios de autenticación
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            const base: AppUser = {
              id: session.user.id,
              email: session.user.email || "",
              name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
            };

            try {
              const { data } = await supabase
                .from("profiles")
                .select("full_name, plan, is_pro")
                .eq("id", base.id)
                .single();

              if (data) {
                base.name = data.full_name || base.name;
                base.plan = data.plan || "free";
                base.isPro = data.is_pro || false;
              }
            } catch {}

            set({ user: base, loading: false });
          } else {
            if (typeof window !== "undefined") {
              const demo = localStorage.getItem(DEMO_USER_KEY);
              if (demo) {
                try {
                  set({ user: JSON.parse(demo), loading: false });
                  return;
                } catch {}
              }
            }
            set({ user: null, loading: false });
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Modo local/demo
      if (typeof window !== "undefined") {
        const demo = localStorage.getItem(DEMO_USER_KEY);
        if (demo) {
          try {
            set({ user: JSON.parse(demo), loading: false });
            return () => {};
          } catch {}
        }
      }
      set({ user: null, loading: false });
      return () => {};
    }
  },

  signIn: async (email, password) => {
    const supabase = getSupabase();
    const cleanEmail = email.trim().toLowerCase();

    if (!supabase) {
      const demoUser: AppUser = {
        id: "demo-user-123",
        email: cleanEmail,
        name: cleanEmail.split("@")[0],
        isDemo: true,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      }
      set({ user: demoUser });
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          // Intentar auto-confirmar si la función confirm_user está disponible en Supabase
          try {
            const { data: rpcRes, error: rpcErr } = await supabase.rpc("confirm_user", {
              email_to_confirm: cleanEmail,
            });
            if (!rpcErr && rpcRes) {
              // Reintentar login inmediatamente
              const retry = await supabase.auth.signInWithPassword({
                email: cleanEmail,
                password,
              });
              if (!retry.error && retry.data.user) {
                const u: AppUser = {
                  id: retry.data.user.id,
                  email: retry.data.user.email || cleanEmail,
                  name: retry.data.user.user_metadata?.full_name || cleanEmail.split("@")[0],
                };
                set({ user: u });
                return { error: null };
              }
            }
          } catch {}

          return {
            error: translateAuthError(error.message),
            isUnconfirmed: true,
          };
        }
        return { error: translateAuthError(error.message) };
      }

      if (data.user) {
        const u: AppUser = {
          id: data.user.id,
          email: data.user.email || cleanEmail,
          name: data.user.user_metadata?.full_name || cleanEmail.split("@")[0],
        };
        set({ user: u });
      }

      return { error: null };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Error al iniciar sesión" };
    }
  },

  confirmEmailAndLogin: async (email, password) => {
    const supabase = getSupabase();
    if (!supabase) return { error: null };

    const cleanEmail = email.trim().toLowerCase();
    try {
      const { error: rpcErr } = await supabase.rpc("confirm_user", {
        email_to_confirm: cleanEmail,
      });

      if (rpcErr) {
        return { error: "Aún no se ha creado la función confirm_user en Supabase SQL Editor." };
      }

      // Reintentar login
      const retry = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (retry.error) {
        return { error: translateAuthError(retry.error.message) };
      }

      if (retry.data.user) {
        const u: AppUser = {
          id: retry.data.user.id,
          email: retry.data.user.email || cleanEmail,
          name: retry.data.user.user_metadata?.full_name || cleanEmail.split("@")[0],
        };
        set({ user: u });
      }
      return { error: null };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Error al confirmar" };
    }
  },

  signUp: async (email, password) => {
    const supabase = getSupabase();
    const cleanEmail = email.trim().toLowerCase();

    if (!supabase) {
      const demoUser: AppUser = {
        id: "demo-user-123",
        email: cleanEmail,
        name: cleanEmail.split("@")[0],
        isDemo: true,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      }
      set({ user: demoUser });
      return { error: null, message: "Cuenta demo creada exitosamente" };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

      if (error) return { error: translateAuthError(error.message) };

      if (data.user) {
        // Intentar auto-confirmar
        try {
          await supabase.rpc("confirm_user", { email_to_confirm: cleanEmail });
        } catch {}

        const u: AppUser = {
          id: data.user.id,
          email: data.user.email || cleanEmail,
          name: data.user.user_metadata?.full_name || cleanEmail.split("@")[0],
        };
        set({ user: u });
      }

      return { error: null, message: "¡Cuenta creada exitosamente!" };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Error al registrarse" };
    }
  },

  signInDemo: () => {
    const demoUser: AppUser = {
      id: "demo-pro-user",
      email: "demo@eventazo.pro",
      name: "Usuario Pro (Demo)",
      isDemo: true,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    }
    set({ user: demoUser });
  },

  updateProfile: async (newName, newEmail) => {
    const { user } = get();
    const supabase = getSupabase();

    if (!supabase || user?.isDemo) {
      const updated: AppUser = {
        id: user?.id || "demo-user",
        email: newEmail || user?.email || "",
        name: newName,
        isDemo: true,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(updated));
      }
      set({ user: updated });
      return { error: null, message: "Perfil actualizado exitosamente" };
    }

    try {
      const updateData: { data?: { full_name: string }; email?: string } = {
        data: { full_name: newName },
      };
      if (newEmail && newEmail !== user?.email) {
        updateData.email = newEmail;
      }

      const { data, error } = await supabase.auth.updateUser(updateData);
      if (error) return { error: translateAuthError(error.message) };

      try {
        const targetId = user?.id || data.user.id;
        if (targetId) {
          await supabase
            .from("profiles")
            .update({
              full_name: newName,
              ...(newEmail ? { email: newEmail } : {}),
              updated_at: new Date().toISOString(),
            })
            .eq("id", targetId);
        }
      } catch {}

      if (data.user) {
        set({
          user: {
            ...user!,
            email: data.user.email || user!.email,
            name: data.user.user_metadata?.full_name || newName,
          },
        });
      }

      return {
        error: null,
        message: "Perfil actualizado exitosamente",
      };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Error al actualizar perfil" };
    }
  },

  updatePassword: async (newPassword) => {
    const { user } = get();
    const supabase = getSupabase();

    if (!supabase || user?.isDemo) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { error: translateAuthError(error.message) };
      return { error: null };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Error al cambiar contraseña" };
    }
  },

  signOut: async () => {
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem(DEMO_USER_KEY);
    }
    set({ user: null });
  },
}));

// Hook compatible que expone el store reactivo
export function useAuth() {
  const store = useAuthStore();
  return store;
}


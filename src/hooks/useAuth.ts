"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export interface AppUser {
  id: string;
  email: string;
  name?: string;
  isDemo?: boolean;
}

const DEMO_USER_KEY = "eventazo_demo_user";

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  // Escuchar cambios de sesión de Supabase o cargar usuario demo local
  useEffect(() => {
    const supabase = getSupabase();

    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
          });
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
            });
          } else {
            // Verificar si hay usuario demo
            const demo = localStorage.getItem(DEMO_USER_KEY);
            if (demo) {
              setUser(JSON.parse(demo));
            } else {
              setUser(null);
            }
          }
          setLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Modo local / demo
      if (typeof window !== "undefined") {
        const demo = localStorage.getItem(DEMO_USER_KEY);
        if (demo) {
          setUser(JSON.parse(demo));
        }
      }
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<{ error: string | null }> => {
    const supabase = getSupabase();

    if (!supabase) {
      // Si Supabase no está configurado, loguear como demo
      const demoUser: AppUser = {
        id: "demo-user-123",
        email,
        name: email.split("@")[0],
        isDemo: true,
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      setUser(demoUser);
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.user_metadata?.full_name || data.user.email?.split("@")[0],
        });
      }
      return { error: null };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Error al iniciar sesión" };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string): Promise<{ error: string | null; message?: string }> => {
    const supabase = getSupabase();

    if (!supabase) {
      const demoUser: AppUser = {
        id: "demo-user-123",
        email,
        name: email.split("@")[0],
        isDemo: true,
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      setUser(demoUser);
      return { error: null, message: "Cuenta demo creada exitosamente" };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) return { error: error.message };
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.user_metadata?.full_name || data.user.email?.split("@")[0],
        });
      }
      return { error: null, message: "Revisa tu correo para confirmar tu cuenta si es requerido" };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Error al registrarse" };
    }
  }, []);

  const signInDemo = useCallback(() => {
    const demoUser: AppUser = {
      id: "demo-pro-user",
      email: "demo@eventazo.pro",
      name: "Usuario Pro (Demo)",
      isDemo: true,
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
  }, []);

  const updateProfile = useCallback(async (newName: string, newEmail?: string): Promise<{ error: string | null; message?: string }> => {
    const supabase = getSupabase();

    if (!supabase || user?.isDemo) {
      const updated: AppUser = {
        id: user?.id || "demo-user",
        email: newEmail || user?.email || "",
        name: newName,
        isDemo: true,
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(updated));
      setUser(updated);
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
      if (error) return { error: error.message };

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.user_metadata?.full_name || newName,
        });
      }

      return {
        error: null,
        message: newEmail && newEmail !== user?.email
          ? "Perfil actualizado. Se envió un correo de confirmación al nuevo email."
          : "Perfil actualizado exitosamente",
      };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Error al actualizar perfil" };
    }
  }, [user]);

  const updatePassword = useCallback(async (newPassword: string): Promise<{ error: string | null }> => {
    const supabase = getSupabase();

    if (!supabase || user?.isDemo) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { error: error.message };
      return { error: null };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Error al cambiar contraseña" };
    }
  }, [user]);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
  }, []);

  return {
    user,
    loading,
    isConfigured,
    signIn,
    signUp,
    signInDemo,
    updateProfile,
    updatePassword,
    signOut,
  };
}

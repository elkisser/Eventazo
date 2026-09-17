import { getSupabase } from "@/lib/supabase";
import { TicketConfig, PrintConfig } from "@/types";

export interface SavedTicket {
  id: string;
  user_id?: string;
  title: string;
  ticket_config: TicketConfig;
  print_config: PrintConfig;
  created_at: string;
  updated_at: string;
}

// Obtener el ID del usuario actualmente autenticado (Supabase o Demo)
async function getCurrentUserId(): Promise<string | null> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) return user.id;
    } catch (e) {
      console.warn("Error al verificar usuario en Supabase:", e);
    }
  }

  // Fallback solo para usuario demo explícitamente logueado
  if (typeof window !== "undefined") {
    try {
      const demo = localStorage.getItem("eventazo_demo_user");
      if (demo) {
        const parsed = JSON.parse(demo);
        return parsed.id || null;
      }
    } catch {
      return null;
    }
  }

  return null;
}

// Almacenamiento local aislado estrictamente por ID de usuario (solo para modo demo offline)
function getUserScopedLocalKey(userId: string): string {
  return `eventazo_saved_tickets_${userId}`;
}

function getLocalUserTickets(userId: string): SavedTicket[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getUserScopedLocalKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalUserTickets(userId: string, tickets: SavedTicket[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getUserScopedLocalKey(userId), JSON.stringify(tickets));
  } catch (e) {
    console.error("Error al persistir rifas locales:", e);
  }
}

/**
 * Obtener las rifas guardadas del usuario autenticado.
 * Si NO hay sesión activa, retorna siempre [] (las rifas son privadas y por usuario).
 */
export async function getSavedTickets(): Promise<SavedTicket[]> {
  const supabase = getSupabase();
  const userId = await getCurrentUserId();

  // Si no está autenticado, no hay rifas para mostrar (aislamiento por usuario)
  if (!userId) {
    return [];
  }

  if (supabase && !userId.startsWith("demo-")) {
    try {
      const { data, error } = await supabase
        .from("saved_tickets")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (!error && data) {
        return data as SavedTicket[];
      }
      if (error) {
        console.error("Error al consultar rifas de Supabase:", error.message);
      }
    } catch (e) {
      console.warn("Excepción al consultar Supabase:", e);
    }
  }

  // Fallback aislado estrictamente a este usuario específico
  return getLocalUserTickets(userId);
}

/**
 * Guardar o actualizar una rifa en la cuenta del usuario autenticado.
 * Requiere estrictamente que el usuario esté logueado.
 */
export async function saveTicketDesign(
  title: string,
  ticketConfig: TicketConfig,
  printConfig: PrintConfig,
  existingId?: string
): Promise<SavedTicket> {
  const supabase = getSupabase();
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("Debes iniciar sesión para guardar tus rifas en tu cuenta.");
  }

  const now = new Date().toISOString();

  if (supabase && !userId.startsWith("demo-")) {
    try {
      if (existingId) {
        const { data, error } = await supabase
          .from("saved_tickets")
          .update({
            title,
            ticket_config: ticketConfig,
            print_config: printConfig,
            updated_at: now,
          })
          .eq("id", existingId)
          .eq("user_id", userId)
          .select()
          .single();

        if (error) throw error;
        if (data) return data as SavedTicket;
      } else {
        const { data, error } = await supabase
          .from("saved_tickets")
          .insert({
            user_id: userId,
            title,
            ticket_config: ticketConfig,
            print_config: printConfig,
            created_at: now,
            updated_at: now,
          })
          .select()
          .single();

        if (error) throw error;
        if (data) return data as SavedTicket;
      }
    } catch (e) {
      console.error("Error guardando en Supabase:", e);
      throw e;
    }
  }

  // Fallback demo aislado
  const current = getLocalUserTickets(userId);
  if (existingId) {
    const idx = current.findIndex((t) => t.id === existingId);
    if (idx !== -1) {
      const updated: SavedTicket = {
        ...current[idx],
        title,
        ticket_config: ticketConfig,
        print_config: printConfig,
        updated_at: now,
      };
      current[idx] = updated;
      saveLocalUserTickets(userId, current);
      return updated;
    }
  }

  const newTicket: SavedTicket = {
    id: `ticket-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    user_id: userId,
    title,
    ticket_config: ticketConfig,
    print_config: printConfig,
    created_at: now,
    updated_at: now,
  };
  current.unshift(newTicket);
  saveLocalUserTickets(userId, current);
  return newTicket;
}

/**
 * Eliminar una rifa guardada perteneciente al usuario autenticado.
 */
export async function deleteSavedTicket(id: string): Promise<boolean> {
  const supabase = getSupabase();
  const userId = await getCurrentUserId();

  if (!userId) return false;

  if (supabase && !userId.startsWith("demo-")) {
    try {
      const { error } = await supabase
        .from("saved_tickets")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (!error) return true;
    } catch (e) {
      console.error("Error eliminando en Supabase:", e);
    }
  }

  const current = getLocalUserTickets(userId).filter((t) => t.id !== id);
  saveLocalUserTickets(userId, current);
  return true;
}

/**
 * Duplicar una rifa guardada del usuario autenticado.
 */
export async function duplicateSavedTicket(ticket: SavedTicket): Promise<SavedTicket> {
  const newTitle = `${ticket.title} (Copia)`;
  return saveTicketDesign(newTitle, ticket.ticket_config, ticket.print_config);
}


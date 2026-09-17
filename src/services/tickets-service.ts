import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
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

const LOCAL_STORAGE_KEY = "eventazo_saved_tickets";

// Obtener tickets desde LocalStorage (fallback de desarrollo/modo demo)
function getLocalTickets(): SavedTicket[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error al leer rifas locales:", e);
    return [];
  }
}

// Guardar tickets en LocalStorage
function saveLocalTickets(tickets: SavedTicket[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tickets));
  } catch (e) {
    console.error("Error al guardar rifas locales:", e);
  }
}

// Obtener todas las rifas del usuario (Supabase o LocalStorage)
export async function getSavedTickets(): Promise<SavedTicket[]> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("saved_tickets")
          .select("*")
          .order("updated_at", { ascending: false });

        if (error) {
          console.warn("Supabase error, usando fallback local:", error.message);
          return getLocalTickets();
        }

        return data as SavedTicket[];
      }
    } catch (e) {
      console.warn("Error consultando Supabase, usando fallback local:", e);
    }
  }

  return getLocalTickets();
}

// Guardar o actualizar una rifa
export async function saveTicketDesign(
  title: string,
  ticketConfig: TicketConfig,
  printConfig: PrintConfig,
  existingId?: string
): Promise<SavedTicket> {
  const supabase = getSupabase();
  const now = new Date().toISOString();

  if (supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
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
            .select()
            .single();

          if (!error && data) {
            return data as SavedTicket;
          }
        } else {
          const { data, error } = await supabase
            .from("saved_tickets")
            .insert({
              user_id: user.id,
              title,
              ticket_config: ticketConfig,
              print_config: printConfig,
              created_at: now,
              updated_at: now,
            })
            .select()
            .single();

          if (!error && data) {
            return data as SavedTicket;
          }
        }
      }
    } catch (e) {
      console.warn("Error guardando en Supabase, guardando localmente:", e);
    }
  }

  // Fallback local
  const current = getLocalTickets();
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
      saveLocalTickets(current);
      return updated;
    }
  }

  const newTicket: SavedTicket = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title,
    ticket_config: ticketConfig,
    print_config: printConfig,
    created_at: now,
    updated_at: now,
  };
  current.unshift(newTicket);
  saveLocalTickets(current);
  return newTicket;
}

// Eliminar una rifa guardada
export async function deleteSavedTicket(id: string): Promise<boolean> {
  const supabase = getSupabase();

  if (supabase && !id.startsWith("local-")) {
    try {
      const { error } = await supabase
        .from("saved_tickets")
        .delete()
        .eq("id", id);

      if (!error) {
        return true;
      }
    } catch (e) {
      console.warn("Error eliminando en Supabase:", e);
    }
  }

  const current = getLocalTickets().filter((t) => t.id !== id);
  saveLocalTickets(current);
  return true;
}

// Duplicar una rifa guardada
export async function duplicateSavedTicket(ticket: SavedTicket): Promise<SavedTicket> {
  const newTitle = `${ticket.title} (Copia)`;
  return saveTicketDesign(newTitle, ticket.ticket_config, ticket.print_config);
}

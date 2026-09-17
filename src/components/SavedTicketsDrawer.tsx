"use client";

import { useState, useEffect } from "react";
import {
  X,
  FolderOpen,
  Trash2,
  Copy,
  Calendar,
  Ticket,
  Trophy,
  ArrowRight,
  RefreshCw,
  Search,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SavedTicket, getSavedTickets, deleteSavedTicket, duplicateSavedTicket } from "@/services/tickets-service";
import { useRifaStore } from "@/store/useRifaStore";
import { formatCurrency } from "@/lib/utils";

interface SavedTicketsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTicket?: (ticket: SavedTicket) => void;
}

export function SavedTicketsDrawer({ isOpen, onClose, onSelectTicket }: SavedTicketsDrawerProps) {
  const [tickets, setTickets] = useState<SavedTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeDeleteId, setActiveDeleteId] = useState<string | null>(null);

  const { setTicketConfig, setPrintConfig } = useRifaStore();

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getSavedTickets();
      setTickets(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTickets();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoad = (ticket: SavedTicket) => {
    setTicketConfig(ticket.ticket_config);
    setPrintConfig(ticket.print_config);
    onSelectTicket?.(ticket);
    onClose();
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDeleteId(id);
    try {
      await deleteSavedTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } finally {
      setActiveDeleteId(null);
    }
  };

  const handleDuplicate = async (ticket: SavedTicket, e: React.MouseEvent) => {
    e.stopPropagation();
    const duplicated = await duplicateSavedTicket(ticket);
    setTickets((prev) => [duplicated, ...prev]);
  };

  const filtered = tickets.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.ticket_config.eventName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full bg-slate-900 border-l border-slate-700/80 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <FolderOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Mis Rifas Guardadas</h3>
              <p className="text-[10px] text-slate-400">
                {tickets.length} {tickets.length === 1 ? "diseño disponible" : "diseños disponibles"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={fetchTickets}
              title="Recargar"
              className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-amber-400" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Buscador */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar rifa por nombre..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Lista de diseños */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-500 space-y-2">
              <RefreshCw className="h-6 w-6 animate-spin text-amber-400" />
              <p className="text-xs">Cargando tus rifas...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40">
              <Sparkles className="h-8 w-8 text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-300">No hay rifas guardadas</p>
              <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
                {search ? "No se encontraron rifas con ese término." : "Crea tu primer diseño y haz clic en 'Guardar Rifa' en la barra superior."}
              </p>
            </div>
          ) : (
            filtered.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => handleLoad(ticket)}
                className="group relative rounded-xl border border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-amber-500/50 p-3.5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-amber-500/5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 truncate transition-colors">
                      {ticket.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {ticket.ticket_config.subtitle || ticket.ticket_config.eventName}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleDuplicate(ticket, e)}
                      title="Duplicar"
                      className="text-slate-400 hover:text-amber-400 p-1 rounded hover:bg-slate-700/60"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(ticket.id, e)}
                      title="Eliminar"
                      disabled={activeDeleteId === ticket.id}
                      className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-slate-700/60"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Metadata pills */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-700/40 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1 truncate">
                    <Ticket className="h-3 w-3 text-amber-400 shrink-0" />
                    <span>{ticket.ticket_config.totalTickets} tks</span>
                  </div>
                  <div className="flex items-center gap-1 truncate">
                    <Trophy className="h-3 w-3 text-amber-400 shrink-0" />
                    <span>{ticket.ticket_config.prizes?.length || 0} premios</span>
                  </div>
                  <div className="flex items-center gap-1 truncate font-mono text-amber-300 font-semibold">
                    <span>{formatCurrency(ticket.ticket_config.price || 0)}</span>
                  </div>
                </div>

                {/* Botón Cargar */}
                <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 group-hover:text-amber-400 transition-colors">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-2.5 w-2.5" />
                    {new Date(ticket.updated_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-0.5 font-medium">
                    Cargar diseño <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/90 text-center">
          <p className="text-[10px] text-slate-500">
            Los cambios se sincronizan en la nube y quedan disponibles en tu cuenta.
          </p>
        </div>
      </div>
    </div>
  );
}

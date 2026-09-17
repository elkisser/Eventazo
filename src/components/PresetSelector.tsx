"use client";

import { Sparkles, GraduationCap, Trophy, HeartHandshake, Car } from "lucide-react";
import { TicketConfig, PrintConfig } from "@/types";
import { useRifaStore } from "@/store/useRifaStore";

interface Preset {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  ticket: Partial<TicketConfig>;
  print?: Partial<PrintConfig>;
}

const PRESETS: Preset[] = [
  {
    id: "escolar",
    name: "Rifa Escolar y Kermesse",
    category: "Educación",
    icon: <GraduationCap className="h-4 w-4 text-amber-400" />,
    ticket: {
      eventName: "Gran Rifa Escolar Cooperadora",
      subtitle: "Escuela Primaria N° 71 • Festejo Comunitario",
      organizer: "Comisión Cooperadora",
      drawDate: "20 de Octubre 2026",
      price: 1500,
      priceLabel: "Valor: $ 1.500",
      totalTickets: 500,
      startNumber: 1,
      contributionText: "Bono contribución para obras y equipamiento",
      primaryColor: "#0284c7",
      prizes: [
        { position: 1, label: "1° Premio:", description: "Bicicleta Rodado 29" },
        { position: 2, label: "2° Premio:", description: "Tablet 10 pulgadas" },
        { position: 3, label: "3° Premio:", description: "Canasta Familiar Completa" },
        { position: 4, label: "4° Premio:", description: "Juego de Sabanas 2 1/2" },
      ],
    },
  },
  {
    id: "deportiva",
    name: "Bono Club Deportivo",
    category: "Deportes",
    icon: <Trophy className="h-4 w-4 text-emerald-400" />,
    ticket: {
      eventName: "Gran Bono Contribución Club Atlético",
      subtitle: "Subcomisión de Fútbol Infantil y Juvenil",
      organizer: "Club Atlético",
      drawDate: "15 de Noviembre 2026",
      price: 3000,
      priceLabel: "Valor: $ 3.000",
      totalTickets: 1000,
      startNumber: 1,
      contributionText: "Para indumentaria y viajes del plantel",
      primaryColor: "#059669",
      prizes: [
        { position: 1, label: "1° Premio:", description: "Smart TV 50 pulgadas 4K" },
        { position: 2, label: "2° Premio:", description: "Parrilla Portátil + Set Asador" },
        { position: 3, label: "3° Premio:", description: "Camiseta Oficial Firmada" },
        { position: 4, label: "4° Premio:", description: "Pelota Profesional Oficial" },
        { position: 5, label: "5° Premio:", description: "Cajón de Bebidas Variadas" },
      ],
    },
  },
  {
    id: "salud",
    name: "Sorteo Solidario Pro-Salud",
    category: "Solidario",
    icon: <HeartHandshake className="h-4 w-4 text-rose-400" />,
    ticket: {
      eventName: "Sorteo Solidario Todos por Sofía",
      subtitle: "Campaña de Recaudación para Tratamiento Médico",
      organizer: "Familiares y Amigos",
      drawDate: "05 de Diciembre 2026",
      price: 2000,
      priceLabel: "Valor: $ 2.000",
      totalTickets: 800,
      startNumber: 1,
      contributionText: "Tu ayuda salva vidas • Muchas gracias por colaborar",
      primaryColor: "#e11d48",
      prizes: [
        { position: 1, label: "1° Premio:", description: "Orden de Compra $ 200.000" },
        { position: 2, label: "2° Premio:", description: "Horno Microondas Digital" },
        { position: 3, label: "3° Premio:", description: "Pava Eléctrica + Mate Térmico" },
      ],
    },
  },
  {
    id: "gran-sorteo",
    name: "Gran Rifa Anual Moto 0KM",
    category: "Gran Premio",
    icon: <Car className="h-4 w-4 text-amber-400" />,
    ticket: {
      eventName: "Gran Sorteo Millonario Fin de Año",
      subtitle: "Tradicional Sorteo de Fin de Año con Lotería Nacional",
      organizer: "Asociación Civil Vecinal",
      drawDate: "28 de Diciembre 2026",
      price: 10000,
      priceLabel: "Valor: $ 10.000",
      totalTickets: 2000,
      startNumber: 1,
      contributionText: "Jugada nocturna por Quiniela de la Ciudad",
      primaryColor: "#991b1b",
      prizes: [
        { position: 1, label: "1° Premio:", description: "Moto 110cc 0KM con Papeles" },
        { position: 2, label: "2° Premio:", description: "Heladera No Frost con Freezer" },
        { position: 3, label: "3° Premio:", description: "Lavarropas Automático 7Kg" },
        { position: 4, label: "4° Premio:", description: "Microondas + Tostadora" },
        { position: 5, label: "5° Premio:", description: "Juego de Toallones Premium" },
      ],
    },
  },
];

interface PresetSelectorProps {
  onSelect?: () => void;
}

export function PresetSelector({ onSelect }: PresetSelectorProps) {
  const { setTicketConfig, setPrintConfig } = useRifaStore();

  const handleApplyPreset = (preset: Preset) => {
    setTicketConfig(preset.ticket);
    if (preset.print) {
      setPrintConfig(preset.print);
    }
    onSelect?.();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
        <span>Plantillas Profesionales Listas para Usar</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="flex flex-col items-start p-2.5 rounded-xl border border-slate-700/60 bg-slate-800/60 hover:bg-slate-800 hover:border-amber-500/50 transition-all text-left group"
          >
            <div className="p-1.5 rounded-lg bg-slate-900/80 mb-2 group-hover:scale-105 transition-transform">
              {preset.icon}
            </div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
              {preset.category}
            </span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-1">
              {preset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

import { Prize, TicketConfig, PrintConfig } from "@/types";

export const DEFAULT_PRIZES: Prize[] = [
  { position: 1, label: "1°", description: "Parrilla y accesorios" },
  { position: 2, label: "2°", description: "Olla" },
  { position: 3, label: "3°", description: "Asado Battisti (3kg de asado, ens., vino, 2 gas.)" },
  { position: 4, label: "4°", description: "Almuerzo en Garden" },
  { position: 5, label: "5°", description: "Cena para dos - Club Restobar" },
  { position: 6, label: "6°", description: "Juego de mate" },
  { position: 7, label: "7°", description: "Torta Pirineos" },
  { position: 8, label: "8°", description: "Perfume o billetera" },
  { position: 9, label: "9°", description: "Cena – Benito Pizzería" },
  { position: 10, label: "10°", description: "Combo de limpieza" },
  { position: 11, label: "11°", description: "Bombilla Messi" },
  { position: 12, label: "12°", description: "Remera y gorra Argentina" },
  { position: 13, label: "13°", description: "Bandolera" },
  { position: 14, label: "14°", description: "Bufanda" },
  { position: 15, label: "15°", description: "Combo de masas dulces" },
  { position: 16, label: "16°", description: "Torta matera" },
  { position: 17, label: "17°", description: "Body splash" },
  { position: 18, label: "18°", description: "Vaso térmico Ailuz Creaciones" },
  { position: 19, label: "19°", description: "Voucher Battisti Mayorista ($19.900)" },
  { position: 20, label: "20°", description: "Vino" },
];

export const DEFAULT_TICKET_CONFIG: TicketConfig = {
  eventName: 'ESCUELA NRO. 71 "PEDRO GOYENA"',
  subtitle: "Gran Rifa Especial Día del Padre",
  organizer: "Escuela Nro. 71 Pedro Goyena",
  drawDate: "Viernes 19 de Junio de 2026",
  price: 3000,
  priceLabel: "VALOR: $3.000",
  totalTickets: 900,
  startNumber: 1,
  contributionText: "Tu colaboración apoya los proyectos de nuestra comunidad educativa.",
  prizes: DEFAULT_PRIZES,
  prizesFontSize: 8,
  titleFontSize: 14,
  subtitleFontSize: 12,
  stubFontSize: 10,
  generalFontScale: 100,
  prizeColumns: "auto",
  primaryColor: "#991b1b",
};

export const COLOR_PRESETS = [
  { name: "Rojo Carmesí", hex: "#991b1b", preview: "bg-red-800" },
  { name: "Rojo Fuego", hex: "#dc2626", preview: "bg-red-600" },
  { name: "Azul Real", hex: "#1d4ed8", preview: "bg-blue-700" },
  { name: "Azul Marino", hex: "#1e3a8a", preview: "bg-blue-900" },
  { name: "Verde Esmeralda", hex: "#047857", preview: "bg-emerald-700" },
  { name: "Verde Bosque", hex: "#14532d", preview: "bg-green-900" },
  { name: "Borgoña / Vino", hex: "#831843", preview: "bg-pink-900" },
  { name: "Dorado / Ámbar", hex: "#b45309", preview: "bg-amber-700" },
  { name: "Púrpura / Violeta", hex: "#6b21a8", preview: "bg-purple-800" },
  { name: "Negro Carbón", hex: "#18181b", preview: "bg-zinc-900" },
];

export const DEFAULT_PRINT_CONFIG: PrintConfig = {
  ticketsPerRow: 1,
  ticketsPerColumn: 5,
  pageWidth: 210, // A4
  pageHeight: 297, // A4
  marginTop: 3,
  marginBottom: 3,
  marginLeft: 3,
  marginRight: 3,
  ticketWidth: 130,
  ticketHeight: 50,
  stubWidth: 36,
  allowSideTickets: true,
  gap: 2,
};

export const A4_WIDTH_PT = 595.28;
export const A4_HEIGHT_PT = 841.89;
export const MM_TO_PT = 2.8346;

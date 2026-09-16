import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTicketNumber(num: number, digits: number = 3): string {
  return num.toString().padStart(digits, "0");
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("es-AR")}`;
}

export function getDigitsNeeded(totalTickets: number, startNumber: number): number {
  const maxNumber = startNumber + totalTickets - 1;
  return Math.max(3, maxNumber.toString().length);
}

export function generateTicketNumbers(
  startNumber: number,
  totalTickets: number
): number[] {
  const numbers: number[] = [];
  const seen = new Set<number>();

  for (let i = 0; i < totalTickets; i++) {
    const num = startNumber + i;
    if (seen.has(num)) {
      throw new Error(`Número duplicado detectado: ${num}`);
    }
    seen.add(num);
    numbers.push(num);
  }

  return numbers;
}

export function calculateOptimalLayout(
  pageWidthMm: number,
  pageHeightMm: number,
  marginMm: number
): { ticketsPerRow: number; ticketsPerColumn: number; ticketWidth: number; ticketHeight: number } {
  const availableWidth = pageWidthMm - marginMm * 2;
  const availableHeight = pageHeightMm - marginMm * 2;

  // Ticket aspect ratio based on the design (roughly 180mm x 65mm)
  const ticketWidth = availableWidth;
  const ticketHeight = 62;

  const ticketsPerRow = 1;
  const ticketsPerColumn = Math.floor(availableHeight / ticketHeight);

  return {
    ticketsPerRow,
    ticketsPerColumn,
    ticketWidth,
    ticketHeight,
  };
}

export function formatSpanishDate(isoDateString: string): string {
  if (!isoDateString) return "";
  const parts = isoDateString.split("-");
  if (parts.length !== 3) return isoDateString;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  if (isNaN(date.getTime())) return isoDateString;

  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return `${days[date.getDay()]} ${day} de ${months[date.getMonth()]} de ${year}`;
}

export function formatShortDate(dateString: string): string {
  if (!dateString) return "";
  const trimmed = dateString.trim();
  if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(trimmed)) return trimmed;

  const match = trimmed.match(/(\d{1,2})\s+de\s+([a-zA-ZáéíóúÁÉÍÓÚ]+)(?:\s+de\s+(\d{4}))?/i);
  if (match) {
    const day = match[1].padStart(2, "0");
    const monthName = match[2].toLowerCase();
    const year = match[3] || new Date().getFullYear().toString();
    const monthsMap: Record<string, string> = {
      enero: "01", febrero: "02", marzo: "03", abril: "04", mayo: "05", junio: "06",
      julio: "07", agosto: "08", septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12"
    };
    const mm = monthsMap[monthName] || "01";
    return `${day}/${mm}/${year}`;
  }
  return trimmed.length > 16 ? trimmed.substring(0, 16) : trimmed;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16) / 255,
      g: parseInt(clean[1] + clean[1], 16) / 255,
      b: parseInt(clean[2] + clean[2], 16) / 255,
    };
  }
  return {
    r: (parseInt(clean.substring(0, 2), 16) || 153) / 255,
    g: (parseInt(clean.substring(2, 4), 16) || 27) / 255,
    b: (parseInt(clean.substring(4, 6), 16) || 27) / 255,
  };
}

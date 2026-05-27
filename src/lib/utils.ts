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

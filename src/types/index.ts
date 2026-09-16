export interface TicketConfig {
  eventName: string;
  subtitle: string;
  organizer: string;
  drawDate: string;
  price: number;
  priceLabel: string;
  totalTickets: number;
  startNumber: number;
  contributionText: string;
  prizes: Prize[];
  // Tipografía y tamaños de fuente
  prizesFontSize?: number; // default: 8
  titleFontSize?: number; // default: 14
  subtitleFontSize?: number; // default: 12
  stubFontSize?: number; // default: 10
  generalFontScale?: number; // default: 100 (%)
  // Columnas para la lista de premios
  prizeColumns?: 2 | 3 | 4 | "auto"; // default: "auto"
  // Color principal de acento
  primaryColor?: string; // default: "#991b1b"
}

export interface Prize {
  position: number;
  label: string;
  description: string;
}

export interface TicketData {
  number: string;
  config: TicketConfig;
}

export interface PrintConfig {
  ticketsPerRow: number;
  ticketsPerColumn: number;
  pageWidth: number; // mm
  pageHeight: number; // mm
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  ticketWidth: number;
  ticketHeight: number;
  stubWidth?: number; // mm (default: 36)
  allowSideTickets?: boolean; // default: true (aprovecha lateral derecho con tickets verticales rotados)
  gap: number;
}

export interface GenerationProgress {
  current: number;
  total: number;
  percentage: number;
  status: 'idle' | 'generating' | 'complete' | 'error';
  message: string;
}

export interface TemplateImage {
  src: string;
  width: number;
  height: number;
  file: File | null;
}

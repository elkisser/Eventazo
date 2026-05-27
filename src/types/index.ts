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

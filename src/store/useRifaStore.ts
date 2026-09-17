import { create } from "zustand";
import { TicketConfig, PrintConfig, GenerationProgress, TemplateImage } from "@/types";
import { DEFAULT_TICKET_CONFIG, DEFAULT_PRINT_CONFIG, EMPTY_TICKET_CONFIG } from "@/lib/constants";

interface RifaState {
  // Config
  ticketConfig: TicketConfig;
  printConfig: PrintConfig;
  templateImage: TemplateImage | null;

  // Generation
  progress: GenerationProgress;
  generatedPdfUrl: string | null;
  isGenerating: boolean;

  // UI
  darkMode: boolean;
  previewTicketNumber: number;
  activeTab: "config" | "preview" | "generate";

  // Actions
  setTicketConfig: (config: Partial<TicketConfig>) => void;
  setPrintConfig: (config: Partial<PrintConfig>) => void;
  setTemplateImage: (image: TemplateImage | null) => void;
  setProgress: (progress: Partial<GenerationProgress>) => void;
  setGeneratedPdfUrl: (url: string | null) => void;
  setIsGenerating: (generating: boolean) => void;
  setDarkMode: (dark: boolean) => void;
  setPreviewTicketNumber: (num: number) => void;
  setActiveTab: (tab: "config" | "preview" | "generate") => void;
  resetConfig: () => void;
  clearConfig: () => void;
}

export const useRifaStore = create<RifaState>((set) => ({
  ticketConfig: DEFAULT_TICKET_CONFIG,
  printConfig: DEFAULT_PRINT_CONFIG,
  templateImage: null,

  progress: {
    current: 0,
    total: 0,
    percentage: 0,
    status: "idle",
    message: "",
  },
  generatedPdfUrl: null,
  isGenerating: false,

  darkMode: true,
  previewTicketNumber: 1,
  activeTab: "config",

  setTicketConfig: (config) =>
    set((state) => ({
      ticketConfig: { ...state.ticketConfig, ...config },
    })),

  setPrintConfig: (config) =>
    set((state) => ({
      printConfig: { ...state.printConfig, ...config },
    })),

  setTemplateImage: (image) => set({ templateImage: image }),

  setProgress: (progress) =>
    set((state) => ({
      progress: { ...state.progress, ...progress },
    })),

  setGeneratedPdfUrl: (url) => set({ generatedPdfUrl: url }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  setDarkMode: (dark) => set({ darkMode: dark }),
  setPreviewTicketNumber: (num) => set({ previewTicketNumber: num }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  resetConfig: () =>
    set({
      ticketConfig: DEFAULT_TICKET_CONFIG,
      printConfig: DEFAULT_PRINT_CONFIG,
      templateImage: null,
      progress: {
        current: 0,
        total: 0,
        percentage: 0,
        status: "idle",
        message: "",
      },
      generatedPdfUrl: null,
    }),

  clearConfig: () =>
    set({
      ticketConfig: EMPTY_TICKET_CONFIG,
      templateImage: null,
      generatedPdfUrl: null,
    }),
}));

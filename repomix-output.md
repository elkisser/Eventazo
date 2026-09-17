This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where line numbers have been added.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/**/*, package.json, tsconfig.json, README.md
- Files matching these patterns are excluded: .next/**, node_modules/**, scratch/**, pnpm-lock.yaml, *.pdf
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
````
src/
  app/
    editor/
      page.tsx
    globals.css
    icon.svg
    layout.tsx
    page.tsx
  components/
    auth/
      AuthModal.tsx
      ProfileModal.tsx
    ui/
      button.tsx
      card.tsx
      checkbox.tsx
      input.tsx
      label.tsx
      number-input.tsx
      progress.tsx
      select.tsx
      slider.tsx
      switch.tsx
    ConfigPanel.tsx
    GeneratePanel.tsx
    Header.tsx
    ImageUpload.tsx
    MobileBottomNav.tsx
    PageLayoutPreview.tsx
    PresetSelector.tsx
    PrintConfigPanel.tsx
    PrizeEditor.tsx
    SavedTicketsDrawer.tsx
    TicketPreview.tsx
  hooks/
    useAuth.ts
    usePdfGeneration.ts
  lib/
    constants.ts
    supabase.ts
    utils.ts
  services/
    pdf-generator.ts
    tickets-service.ts
  store/
    useRifaStore.ts
  types/
    index.ts
package.json
README.md
tsconfig.json
````

# Files

## File: src/app/icon.svg
````xml
 1: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
 2:   <defs>
 3:     <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
 4:       <stop offset="0%" style="stop-color:#f59e0b"/>
 5:       <stop offset="100%" style="stop-color:#d97706"/>
 6:     </linearGradient>
 7:     <linearGradient id="ticket" x1="0%" y1="0%" x2="100%" y2="100%">
 8:       <stop offset="0%" style="stop-color:#ffffff"/>
 9:       <stop offset="100%" style="stop-color:#f1f5f9"/>
10:     </linearGradient>
11:   </defs>
12:   <!-- Fondo redondeado -->
13:   <rect width="512" height="512" rx="96" fill="url(#bg)"/>
14:   <!-- Ticket principal -->
15:   <g transform="translate(80, 140)">
16:     <!-- Cuerpo del ticket -->
17:     <rect x="0" y="0" width="352" height="180" rx="16" fill="url(#ticket)" opacity="0.95"/>
18:     <!-- Muesca superior -->
19:     <circle cx="260" cy="0" r="16" fill="#d97706"/>
20:     <!-- Muesca inferior -->
21:     <circle cx="260" cy="180" r="16" fill="#d97706"/>
22:     <!-- Línea punteada separadora -->
23:     <line x1="260" y1="20" x2="260" y2="40" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
24:     <line x1="260" y1="52" x2="260" y2="72" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
25:     <line x1="260" y1="84" x2="260" y2="104" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
26:     <line x1="260" y1="116" x2="260" y2="136" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
27:     <line x1="260" y1="148" x2="260" y2="164" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
28:     <!-- Estrella/premio -->
29:     <polygon points="80,50 88,74 114,74 93,88 101,112 80,98 59,112 67,88 46,74 72,74" fill="#f59e0b"/>
30:     <!-- Líneas de texto simuladas -->
31:     <rect x="40" y="125" width="120" height="8" rx="4" fill="#1e293b" opacity="0.6"/>
32:     <rect x="40" y="145" width="80" height="8" rx="4" fill="#1e293b" opacity="0.3"/>
33:     <!-- Número en el talón -->
34:     <text x="306" y="105" font-family="monospace" font-size="36" font-weight="bold" fill="#1e293b" text-anchor="middle">001</text>
35:   </g>
36:   <!-- Segundo ticket detrás (efecto profundidad) -->
37:   <g transform="translate(96, 200)" opacity="0.3">
38:     <rect x="0" y="0" width="352" height="180" rx="16" fill="white"/>
39:   </g>
40: </svg>
````

## File: src/components/ui/checkbox.tsx
````typescript
 1: "use client";
 2: 
 3: import * as React from "react";
 4: import { Check } from "lucide-react";
 5: import { cn } from "@/lib/utils";
 6: 
 7: export interface CheckboxProps {
 8:   id?: string;
 9:   checked: boolean;
10:   onCheckedChange: (checked: boolean) => void;
11:   disabled?: boolean;
12:   className?: string;
13:   label?: string;
14:   description?: string;
15: }
16: 
17: export const Checkbox: React.FC<CheckboxProps> = ({
18:   id,
19:   checked,
20:   onCheckedChange,
21:   disabled = false,
22:   className,
23:   label,
24:   description,
25: }) => {
26:   return (
27:     <label
28:       htmlFor={id}
29:       className={cn(
30:         "flex items-start gap-2.5 cursor-pointer select-none group",
31:         disabled && "opacity-50 cursor-not-allowed",
32:         className
33:       )}
34:     >
35:       <button
36:         id={id}
37:         type="button"
38:         role="checkbox"
39:         aria-checked={checked}
40:         disabled={disabled}
41:         onClick={() => onCheckedChange(!checked)}
42:         className={cn(
43:           "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors mt-0.5",
44:           checked
45:             ? "border-amber-500 bg-amber-500 text-slate-900 shadow-sm shadow-amber-500/30"
46:             : "border-slate-600 bg-slate-800/80 hover:border-slate-500"
47:         )}
48:       >
49:         {checked && <Check className="h-3 w-3 stroke-[3]" />}
50:       </button>
51:       {(label || description) && (
52:         <div className="space-y-0.5">
53:           {label && (
54:             <div className="text-xs font-medium text-slate-200 group-hover:text-amber-300/90 transition-colors">
55:               {label}
56:             </div>
57:           )}
58:           {description && (
59:             <div className="text-[11px] text-slate-400 leading-normal">
60:               {description}
61:             </div>
62:           )}
63:         </div>
64:       )}
65:     </label>
66:   );
67: };
````

## File: src/components/ui/label.tsx
````typescript
 1: import * as React from "react";
 2: import { cn } from "@/lib/utils";
 3: 
 4: const Label = React.forwardRef<
 5:   HTMLLabelElement,
 6:   React.LabelHTMLAttributes<HTMLLabelElement>
 7: >(({ className, ...props }, ref) => {
 8:   return (
 9:     <label
10:       ref={ref}
11:       className={cn(
12:         "text-sm font-medium text-slate-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
13:         className
14:       )}
15:       {...props}
16:     />
17:   );
18: });
19: Label.displayName = "Label";
20: 
21: export { Label };
````

## File: src/components/ui/progress.tsx
````typescript
 1: import * as React from "react";
 2: import { cn } from "@/lib/utils";
 3: 
 4: interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
 5:   value?: number;
 6: }
 7: 
 8: const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
 9:   ({ className, value = 0, ...props }, ref) => {
10:     return (
11:       <div
12:         ref={ref}
13:         className={cn(
14:           "relative h-3 w-full overflow-hidden rounded-full bg-slate-700",
15:           className
16:         )}
17:         {...props}
18:       >
19:         <div
20:           className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300 ease-out"
21:           style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
22:         />
23:       </div>
24:     );
25:   }
26: );
27: Progress.displayName = "Progress";
28: 
29: export { Progress };
````

## File: src/components/ui/slider.tsx
````typescript
 1: "use client";
 2: 
 3: import * as React from "react";
 4: import { cn } from "@/lib/utils";
 5: 
 6: export interface SliderProps {
 7:   id?: string;
 8:   value: number;
 9:   min: number;
10:   max: number;
11:   step?: number;
12:   onChange: (value: number) => void;
13:   className?: string;
14:   label?: string;
15:   suffix?: string;
16:   showValueBadge?: boolean;
17: }
18: 
19: export const Slider: React.FC<SliderProps> = ({
20:   id,
21:   value,
22:   min,
23:   max,
24:   step = 1,
25:   onChange,
26:   className,
27:   label,
28:   suffix = "",
29:   showValueBadge = true,
30: }) => {
31:   const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
32: 
33:   return (
34:     <div className={cn("space-y-1.5", className)}>
35:       {(label || showValueBadge) && (
36:         <div className="flex items-center justify-between text-xs">
37:           {label && <span className="text-slate-300 font-medium">{label}</span>}
38:           {showValueBadge && (
39:             <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
40:               {value}
41:               {suffix}
42:             </span>
43:           )}
44:         </div>
45:       )}
46:       <div className="relative flex items-center py-1">
47:         <input
48:           id={id}
49:           type="range"
50:           min={min}
51:           max={max}
52:           step={step}
53:           value={value}
54:           onChange={(e) => onChange(Number(e.target.value))}
55:           className="w-full h-2 rounded-full cursor-pointer appearance-none"
56:           style={{
57:             background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${percentage}%, #334155 ${percentage}%, #334155 100%)`,
58:           }}
59:         />
60:       </div>
61:       <div className="flex justify-between text-[10px] font-mono text-slate-500 px-0.5">
62:         <span>
63:           {min}
64:           {suffix}
65:         </span>
66:         <span>
67:           {max}
68:           {suffix}
69:         </span>
70:       </div>
71:     </div>
72:   );
73: };
````

## File: src/components/ui/switch.tsx
````typescript
 1: "use client";
 2: 
 3: import * as React from "react";
 4: import { cn } from "@/lib/utils";
 5: 
 6: export interface SwitchProps {
 7:   id?: string;
 8:   checked: boolean;
 9:   onCheckedChange: (checked: boolean) => void;
10:   disabled?: boolean;
11:   className?: string;
12:   label?: string;
13:   description?: string;
14: }
15: 
16: export const Switch: React.FC<SwitchProps> = ({
17:   id,
18:   checked,
19:   onCheckedChange,
20:   disabled = false,
21:   className,
22:   label,
23:   description,
24: }) => {
25:   return (
26:     <label
27:       htmlFor={id}
28:       className={cn(
29:         "flex items-center justify-between gap-3 cursor-pointer select-none",
30:         disabled && "opacity-50 cursor-not-allowed",
31:         className
32:       )}
33:     >
34:       {(label || description) && (
35:         <div className="flex-1 space-y-0.5">
36:           {label && <div className="text-xs font-medium text-slate-200">{label}</div>}
37:           {description && <div className="text-[11px] text-slate-400">{description}</div>}
38:         </div>
39:       )}
40:       <button
41:         id={id}
42:         type="button"
43:         role="switch"
44:         aria-checked={checked}
45:         disabled={disabled}
46:         onClick={() => onCheckedChange(!checked)}
47:         className={cn(
48:           "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50",
49:           checked ? "bg-amber-500" : "bg-slate-700"
50:         )}
51:       >
52:         <span
53:           className={cn(
54:             "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
55:             checked ? "translate-x-5" : "translate-x-0"
56:           )}
57:         />
58:       </button>
59:     </label>
60:   );
61: };
````

## File: src/components/ImageUpload.tsx
````typescript
  1: "use client";
  2: 
  3: import { useCallback, useRef } from "react";
  4: import { Upload, X, Image as ImageIcon } from "lucide-react";
  5: import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  6: import { Button } from "@/components/ui/button";
  7: import { useRifaStore } from "@/store/useRifaStore";
  8: 
  9: export function ImageUpload() {
 10:   const { templateImage, setTemplateImage } = useRifaStore();
 11:   const inputRef = useRef<HTMLInputElement>(null);
 12: 
 13:   const handleFile = useCallback(
 14:     (file: File) => {
 15:       if (!file.type.startsWith("image/")) return;
 16: 
 17:       const reader = new FileReader();
 18:       reader.onload = (e) => {
 19:         const img = new window.Image();
 20:         img.onload = () => {
 21:           setTemplateImage({
 22:             src: e.target?.result as string,
 23:             width: img.width,
 24:             height: img.height,
 25:             file,
 26:           });
 27:         };
 28:         img.src = e.target?.result as string;
 29:       };
 30:       reader.readAsDataURL(file);
 31:     },
 32:     [setTemplateImage]
 33:   );
 34: 
 35:   const handleDrop = useCallback(
 36:     (e: React.DragEvent) => {
 37:       e.preventDefault();
 38:       const file = e.dataTransfer.files[0];
 39:       if (file) handleFile(file);
 40:     },
 41:     [handleFile]
 42:   );
 43: 
 44:   const handleDragOver = (e: React.DragEvent) => {
 45:     e.preventDefault();
 46:   };
 47: 
 48:   return (
 49:     <Card>
 50:       <CardHeader>
 51:         <CardTitle className="flex items-center gap-2">
 52:           <ImageIcon className="h-5 w-5 text-amber-400" />
 53:           Plantilla de Imagen (Opcional)
 54:         </CardTitle>
 55:       </CardHeader>
 56:       <CardContent>
 57:         {templateImage ? (
 58:           <div className="relative rounded-lg overflow-hidden border border-slate-600">
 59:             <img
 60:               src={templateImage.src}
 61:               alt="Template"
 62:               className="w-full h-auto max-h-48 object-contain bg-white"
 63:             />
 64:             <Button
 65:               variant="destructive"
 66:               size="icon"
 67:               className="absolute top-2 right-2 h-7 w-7"
 68:               onClick={() => setTemplateImage(null)}
 69:             >
 70:               <X className="h-3.5 w-3.5" />
 71:             </Button>
 72:             <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-1.5">
 73:               <p className="text-[10px] text-slate-300">
 74:                 {templateImage.width}×{templateImage.height}px • {templateImage.file?.name}
 75:               </p>
 76:             </div>
 77:           </div>
 78:         ) : (
 79:           <div
 80:             onDrop={handleDrop}
 81:             onDragOver={handleDragOver}
 82:             onClick={() => inputRef.current?.click()}
 83:             className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-600 bg-slate-900/30 p-8 cursor-pointer hover:border-amber-500/50 hover:bg-slate-900/50 transition-all duration-200"
 84:           >
 85:             <Upload className="h-8 w-8 text-slate-500" />
 86:             <div className="text-center">
 87:               <p className="text-sm text-slate-300">
 88:                 Arrastrá una imagen o hacé click
 89:               </p>
 90:               <p className="text-xs text-slate-500 mt-1">
 91:                 PNG, JPG hasta 10MB
 92:               </p>
 93:             </div>
 94:           </div>
 95:         )}
 96:         <input
 97:           ref={inputRef}
 98:           type="file"
 99:           accept="image/*"
100:           className="hidden"
101:           onChange={(e) => {
102:             const file = e.target.files?.[0];
103:             if (file) handleFile(file);
104:           }}
105:         />
106:       </CardContent>
107:     </Card>
108:   );
109: }
````

## File: src/hooks/usePdfGeneration.ts
````typescript
 1: "use client";
 2: 
 3: import { useCallback } from "react";
 4: import { useRifaStore } from "@/store/useRifaStore";
 5: import { generateRifaPDF, downloadPdf } from "@/services/pdf-generator";
 6: 
 7: export function usePdfGeneration() {
 8:   const {
 9:     ticketConfig,
10:     printConfig,
11:     setProgress,
12:     setGeneratedPdfUrl,
13:     setIsGenerating,
14:   } = useRifaStore();
15: 
16:   const generate = useCallback(async () => {
17:     setIsGenerating(true);
18:     setProgress({
19:       current: 0,
20:       total: ticketConfig.totalTickets,
21:       percentage: 0,
22:       status: "generating",
23:       message: "Generando tickets...",
24:     });
25: 
26:     try {
27:       const pdfBytes = await generateRifaPDF({
28:         ticketConfig,
29:         printConfig,
30:         onProgress: (current, total) => {
31:           const percentage = Math.round((current / total) * 100);
32:           setProgress({
33:             current,
34:             total,
35:             percentage,
36:             status: "generating",
37:             message: `Generando ticket ${current} de ${total}...`,
38:           });
39:         },
40:       });
41: 
42:       const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
43:       const url = URL.createObjectURL(blob);
44:       setGeneratedPdfUrl(url);
45: 
46:       setProgress({
47:         current: ticketConfig.totalTickets,
48:         total: ticketConfig.totalTickets,
49:         percentage: 100,
50:         status: "complete",
51:         message: `¡${ticketConfig.totalTickets} tickets generados exitosamente!`,
52:       });
53: 
54:       setIsGenerating(false);
55:       return pdfBytes;
56:     } catch (error) {
57:       setProgress({
58:         status: "error",
59:         message: `Error: ${error instanceof Error ? error.message : "Error desconocido"}`,
60:       });
61:       setIsGenerating(false);
62:       throw error;
63:     }
64:   }, [ticketConfig, printConfig, setProgress, setGeneratedPdfUrl, setIsGenerating]);
65: 
66:   const download = useCallback(async () => {
67:     const pdfBytes = await generate();
68:     if (pdfBytes) {
69:       const filename = `rifas_${ticketConfig.eventName.replace(/[^a-zA-Z0-9]/g, "_")}_${ticketConfig.startNumber}-${ticketConfig.startNumber + ticketConfig.totalTickets - 1}.pdf`;
70:       downloadPdf(pdfBytes, filename);
71:     }
72:   }, [generate, ticketConfig]);
73: 
74:   return { generate, download };
75: }
````

## File: src/lib/supabase.ts
````typescript
 1: import { createClient, SupabaseClient } from "@supabase/supabase-js";
 2: 
 3: const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
 4: const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
 5: 
 6: export const isSupabaseConfigured = (): boolean => {
 7:   return Boolean(
 8:     supabaseUrl &&
 9:     supabaseAnonKey &&
10:     supabaseUrl !== "https://tu-proyecto.supabase.co" &&
11:     supabaseAnonKey !== "tu-anon-key"
12:   );
13: };
14: 
15: let supabaseInstance: SupabaseClient | null = null;
16: 
17: export const getSupabase = (): SupabaseClient | null => {
18:   if (!isSupabaseConfigured()) {
19:     return null;
20:   }
21: 
22:   if (!supabaseInstance) {
23:     supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
24:       auth: {
25:         persistSession: true,
26:         autoRefreshToken: true,
27:       },
28:     });
29:   }
30: 
31:   return supabaseInstance;
32: };
````

## File: README.md
````markdown
  1: # 🎟️ Generador de Rifas Profesional
  2: 
  3: <div align="center">
  4: 
  5: ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
  6: ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
  7: ![TailwindCSS](https://img.shields.io/badge/Tailwind-4.3-38B2AC?style=for-the-badge&logo=tailwind-css)
  8: ![pdf-lib](https://img.shields.io/badge/pdf--lib-1.17-red?style=for-the-badge)
  9: 
 10: **Sistema profesional de generación e impresión de rifas/tickets de sorteos.**
 11: 
 12: Optimizado para impresión A4 con diseño premium y generación masiva ultra rápida.
 13: 
 14: </div>
 15: 
 16: ---
 17: 
 18: ## ✨ Características
 19: 
 20: - 🎨 **Diseño premium** — Estilo elegante inspirado en el Día del Padre con tonos azul oscuro y dorado
 21: - 📄 **Generación masiva de PDF** — Genera cientos de tickets sin bloquear la interfaz
 22: - 🖨️ **Optimizado para impresión A4** — Maximiza la cantidad de tickets por página
 23: - 🔄 **Tickets horizontales + verticales** — Aprovecha todo el espacio de la hoja con tickets rotados en el costado
 24: - 👁️ **Vista previa en tiempo real** — Visualizá cómo queda el ticket antes de generar
 25: - 📐 **Layout configurable** — Ajustá tamaño, márgenes y espaciado desde la UI
 26: - 🌙 **Modo oscuro elegante** — Interfaz moderna con tema oscuro por defecto
 27: - 🔢 **Numeración única garantizada** — Nunca se repite un número
 28: - ✂️ **Líneas de corte** — Guías punteadas para cortar los tickets fácilmente
 29: - 📊 **Visualización de distribución** — Diagrama que muestra cómo quedan los tickets en la página
 30: 
 31: ---
 32: 
 33: ## 🚀 Inicio Rápido
 34: 
 35: ```bash
 36: # Clonar el repositorio
 37: git clone <url-del-repo>
 38: cd rifa-generator
 39: 
 40: # Instalar dependencias
 41: pnpm install
 42: 
 43: # Levantar en desarrollo
 44: pnpm dev
 45: 
 46: # Build de producción
 47: pnpm build
 48: ```
 49: 
 50: > [!NOTE]
 51: > Este proyecto usa **pnpm** como gestor de paquetes. Asegurate de tenerlo instalado: `npm install -g pnpm`
 52: 
 53: ---
 54: 
 55: ## 🏗️ Arquitectura
 56: 
 57: ```
 58: src/
 59: ├── app/              # App Router de Next.js (layout, página principal)
 60: ├── components/       # Componentes de UI
 61: │   ├── ui/           # Componentes base (Button, Card, Input, etc.)
 62: │   ├── Header.tsx
 63: │   ├── ConfigPanel.tsx
 64: │   ├── PrintConfigPanel.tsx
 65: │   ├── TicketPreview.tsx
 66: │   ├── GeneratePanel.tsx
 67: │   ├── ImageUpload.tsx
 68: │   └── PageLayoutPreview.tsx
 69: ├── hooks/            # Hooks personalizados
 70: │   └── usePdfGeneration.ts
 71: ├── lib/              # Utilidades y constantes
 72: │   ├── utils.ts
 73: │   └── constants.ts
 74: ├── services/         # Lógica de negocio
 75: │   └── pdf-generator.ts
 76: ├── store/            # Estado global (Zustand)
 77: │   └── useRifaStore.ts
 78: └── types/            # Tipos TypeScript
 79:     └── index.ts
 80: ```
 81: 
 82: ---
 83: 
 84: ## 📋 Stack Tecnológico
 85: 
 86: | Tecnología | Uso |
 87: |---|---|
 88: | **Next.js 15** | Framework con App Router y Turbopack |
 89: | **TypeScript** | Tipado estático en todo el proyecto |
 90: | **TailwindCSS 4** | Estilos utilitarios y diseño responsive |
 91: | **Zustand** | Estado global ligero y performante |
 92: | **pdf-lib** | Generación de PDFs en el cliente |
 93: | **Lucide React** | Iconografía moderna |
 94: 
 95: ---
 96: 
 97: ## 🎫 Datos del Sorteo (Precargados)
 98: 
 99: > [!IMPORTANT]
100: > La aplicación viene preconfigurada con los datos de la **Gran Rifa Especial Día del Padre** organizada por la Escuela Nro. 71 Pedro Goyena.
101: 
102: - **900 tickets** numerados del 001 al 900
103: - **Valor:** $3.000
104: - **Fecha del sorteo:** Viernes 19 de Junio de 2026
105: - **20 premios** incluyendo parrilla, olla, asado, cenas, y más
106: 
107: ---
108: 
109: ## 📐 Sistema de Impresión
110: 
111: El generador optimiza automáticamente el espacio en la hoja A4:
112: 
113: ```
114: ┌─────────────────────────────────────┐
115: │  ┌──────────────┐  ┌──┐            │
116: │  │  Ticket H1   │  │V1│            │
117: │  └──────────────┘  │  │            │
118: │  ┌──────────────┐  │  │            │
119: │  │  Ticket H2   │  └──┘            │
120: │  └──────────────┘  ┌──┐            │
121: │  ┌──────────────┐  │V2│            │
122: │  │  Ticket H3   │  │  │            │
123: │  └──────────────┘  │  │            │
124: │  ┌──────────────┐  └──┘            │
125: │  │  Ticket H4   │                  │
126: │  └──────────────┘                  │
127: │  ┌──────────────┐                  │
128: │  │  Ticket H5   │                  │
129: │  └──────────────┘                  │
130: └─────────────────────────────────────┘
131:          5 horizontales + 2 verticales = 7 por página
132: ```
133: 
134: > [!TIP]
135: > Con la configuración por defecto (130mm × 50mm) entran **7 tickets por página** (5 horizontales + 2 rotados en el costado). Para 900 tickets son solo **129 páginas**.
136: 
137: ---
138: 
139: ## ⚙️ Configuración
140: 
141: Todos los parámetros son editables desde la interfaz:
142: 
143: | Parámetro | Default | Descripción |
144: |---|---|---|
145: | Ancho del ticket | 130mm | Ancho del ticket horizontal |
146: | Alto del ticket | 50mm | Alto del ticket horizontal |
147: | Márgenes | 3mm | Espacio entre el borde de la hoja y los tickets |
148: | Espacio entre tickets | 2mm | Gap entre tickets adyacentes |
149: | Número inicial | 1 | Primer número de la serie |
150: | Total de tickets | 900 | Cantidad a generar |
151: 
152: ---
153: 
154: ## 🖼️ Diseño del Ticket
155: 
156: Cada ticket incluye:
157: 
158: - **Sección principal (72%)** — Nombre del evento, subtítulo, fecha, contribución, lista de 20 premios en 2 columnas, valor y número grande
159: - **Talón de control (28%)** — Título, fecha, campos para nombre y teléfono, valor y número
160: - **Línea de corte** — Separador punteado entre tickets y entre sección principal y talón
161: 
162: ---
163: 
164: ## 🧑‍💻 Desarrollo
165: 
166: ```bash
167: # Desarrollo con hot reload
168: pnpm dev
169: 
170: # Verificar tipos
171: pnpm build
172: 
173: # Linter
174: pnpm lint
175: ```
176: 
177: > [!WARNING]
178: > La generación de PDFs con tickets rotados crea documentos temporales internos para cada ticket vertical. Con muchos tickets esto puede tardar unos segundos — la barra de progreso muestra el avance en tiempo real sin bloquear la UI.
179: 
180: ---
181: 
182: ## 📄 Licencia
183: 
184: Proyecto desarrollado para la **Escuela Nro. 71 Pedro Goyena**.
185: 
186: ---
187: 
188: <div align="center">
189: 
190: Hecho con ❤️ para el **Día del Padre 2026**
191: 
192: </div>
````

## File: tsconfig.json
````json
 1: {
 2:   "compilerOptions": {
 3:     "target": "ES2017",
 4:     "lib": ["dom", "dom.iterable", "esnext"],
 5:     "allowJs": true,
 6:     "skipLibCheck": true,
 7:     "strict": true,
 8:     "noEmit": true,
 9:     "esModuleInterop": true,
10:     "module": "esnext",
11:     "moduleResolution": "bundler",
12:     "resolveJsonModule": true,
13:     "isolatedModules": true,
14:     "jsx": "react-jsx",
15:     "incremental": true,
16:     "plugins": [
17:       {
18:         "name": "next"
19:       }
20:     ],
21:     "paths": {
22:       "@/*": ["./src/*"]
23:     }
24:   },
25:   "include": [
26:     "next-env.d.ts",
27:     "**/*.ts",
28:     "**/*.tsx",
29:     ".next/types/**/*.ts",
30:     ".next/dev/types/**/*.ts",
31:     "**/*.mts"
32:   ],
33:   "exclude": ["node_modules"]
34: }
````

## File: src/app/editor/page.tsx
````typescript
  1: "use client";
  2: 
  3: import { useState } from "react";
  4: import Link from "next/link";
  5: import { Header } from "@/components/Header";
  6: import { ConfigPanel } from "@/components/ConfigPanel";
  7: import { PrintConfigPanel } from "@/components/PrintConfigPanel";
  8: import { TicketPreview } from "@/components/TicketPreview";
  9: import { GeneratePanel } from "@/components/GeneratePanel";
 10: import { ImageUpload } from "@/components/ImageUpload";
 11: import { PageLayoutPreview } from "@/components/PageLayoutPreview";
 12: import { PresetSelector } from "@/components/PresetSelector";
 13: import { useRifaStore } from "@/store/useRifaStore";
 14: import { Eye, Settings, Printer, FileText, Sparkles, ArrowLeft } from "lucide-react";
 15: 
 16: type MobileTab = "preview" | "config" | "print" | "generate";
 17: 
 18: export default function EditorPage() {
 19:   const [mobileTab, setMobileTab] = useState<MobileTab>("preview");
 20:   const [showPresets, setShowPresets] = useState(false);
 21:   const { ticketConfig } = useRifaStore();
 22: 
 23:   return (
 24:     <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
 25:       <Header />
 26: 
 27:       <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-5">
 28:         {/* Barra superior con navegación */}
 29:         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 sm:px-5">
 30:           <div className="flex items-center gap-3">
 31:             <Link
 32:               href="/"
 33:               className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800/60"
 34:             >
 35:               <ArrowLeft className="h-4 w-4" />
 36:               <span>Volver a Inicio</span>
 37:             </Link>
 38:             <div className="h-4 w-px bg-slate-800 hidden sm:block" />
 39:             <div>
 40:               <h2 className="text-sm sm:text-base font-bold text-slate-100 truncate">
 41:                 {ticketConfig.eventName || "Diseñador de Boletos"}
 42:               </h2>
 43:               <p className="text-[11px] text-slate-400 truncate">
 44:                 {ticketConfig.subtitle || "Editor y generador en vivo"}
 45:               </p>
 46:             </div>
 47:           </div>
 48: 
 49:           <div className="flex items-center gap-2">
 50:             <button
 51:               onClick={() => setShowPresets(!showPresets)}
 52:               className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 shadow-sm"
 53:             >
 54:               <Sparkles className="h-3.5 w-3.5 text-amber-400" />
 55:               <span>{showPresets ? "Ocultar Plantillas" : "Cargar Plantilla"}</span>
 56:             </button>
 57:           </div>
 58:         </div>
 59: 
 60:         {/* Desplegable de plantillas */}
 61:         {showPresets && (
 62:           <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
 63:             <PresetSelector onSelect={() => setShowPresets(false)} />
 64:           </div>
 65:         )}
 66: 
 67:         {/* === MOBILE: Tabs de navegación === */}
 68:         <div className="lg:hidden">
 69:           <div className="flex rounded-2xl bg-slate-900/80 border border-slate-800/80 p-1 gap-1 backdrop-blur-sm shadow-md">
 70:             <TabButton
 71:               active={mobileTab === "preview"}
 72:               onClick={() => setMobileTab("preview")}
 73:               icon={<Eye className="h-4 w-4" />}
 74:               label="Preview"
 75:             />
 76:             <TabButton
 77:               active={mobileTab === "generate"}
 78:               onClick={() => setMobileTab("generate")}
 79:               icon={<FileText className="h-4 w-4" />}
 80:               label="Generar"
 81:             />
 82:             <TabButton
 83:               active={mobileTab === "config"}
 84:               onClick={() => setMobileTab("config")}
 85:               icon={<Settings className="h-4 w-4" />}
 86:               label="Config"
 87:             />
 88:             <TabButton
 89:               active={mobileTab === "print"}
 90:               onClick={() => setMobileTab("print")}
 91:               icon={<Printer className="h-4 w-4" />}
 92:               label="Impresión"
 93:             />
 94:           </div>
 95:         </div>
 96: 
 97:         {/* === MOBILE: Contenido por tab === */}
 98:         <div className="lg:hidden space-y-4">
 99:           {mobileTab === "preview" && <TicketPreview />}
100:           {mobileTab === "generate" && (
101:             <>
102:               <GeneratePanel />
103:               <PageLayoutPreview />
104:             </>
105:           )}
106:           {mobileTab === "config" && (
107:             <>
108:               <div className="sticky top-2 z-10 shadow-xl">
109:                 <TicketPreview />
110:               </div>
111:               <ConfigPanel />
112:               <ImageUpload />
113:             </>
114:           )}
115:           {mobileTab === "print" && (
116:             <>
117:               <TicketPreview />
118:               <PrintConfigPanel />
119:             </>
120:           )}
121:         </div>
122: 
123:         {/* === DESKTOP: Grid de 3 columnas === */}
124:         <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start">
125:           {/* Columna izquierda - Configuración */}
126:           <div className="lg:col-span-4 space-y-6">
127:             <ConfigPanel />
128:             <ImageUpload />
129:           </div>
130: 
131:           {/* Columna central - Vista previa persistente y pegajosa */}
132:           <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-4 self-start">
133:             <TicketPreview />
134:             <PrintConfigPanel />
135:           </div>
136: 
137:           {/* Columna derecha - Generar */}
138:           <div className="lg:col-span-3 space-y-6">
139:             <GeneratePanel />
140: 
141:             {/* Info rápida */}
142:             <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 space-y-3 shadow-lg">
143:               <h4 className="text-sm font-semibold text-slate-200">Garantías del Sistema</h4>
144:               <div className="space-y-2 text-xs">
145:                 <div className="flex items-center gap-2">
146:                   <div className="h-2 w-2 rounded-full bg-emerald-400" />
147:                   <span className="text-slate-400">0% error de duplicación o saltos</span>
148:                 </div>
149:                 <div className="flex items-center gap-2">
150:                   <div className="h-2 w-2 rounded-full bg-emerald-400" />
151:                   <span className="text-slate-400">Aprovechamiento A4 al 100%</span>
152:                 </div>
153:                 <div className="flex items-center gap-2">
154:                   <div className="h-2 w-2 rounded-full bg-emerald-400" />
155:                   <span className="text-slate-400">PDF vectorial de máxima nitidez</span>
156:                 </div>
157:                 <div className="flex items-center gap-2">
158:                   <div className="h-2 w-2 rounded-full bg-emerald-400" />
159:                   <span className="text-slate-400">Líneas de corte punteadas listas</span>
160:                 </div>
161:                 <div className="flex items-center gap-2">
162:                   <div className="h-2 w-2 rounded-full bg-emerald-400" />
163:                   <span className="text-slate-400">Talón de control desprendible</span>
164:                 </div>
165:               </div>
166:             </div>
167: 
168:             <PageLayoutPreview />
169:           </div>
170:         </div>
171:       </main>
172: 
173:       {/* Footer */}
174:       <footer className="border-t border-slate-800 py-3 sm:py-4 mt-6 sm:mt-8">
175:         <div className="container mx-auto px-4 text-center">
176:           <p className="text-[10px] sm:text-xs text-slate-500">
177:             Eventazo • Hecho por{" "}
178:             <a
179:               href="https://somos-env.netlify.app/"
180:               target="_blank"
181:               rel="noopener noreferrer"
182:               className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
183:             >
184:               SoMoS
185:             </a>
186:           </p>
187:         </div>
188:       </footer>
189:     </div>
190:   );
191: }
192: 
193: function TabButton({
194:   active,
195:   onClick,
196:   icon,
197:   label,
198: }: {
199:   active: boolean;
200:   onClick: () => void;
201:   icon: React.ReactNode;
202:   label: string;
203: }) {
204:   return (
205:     <button
206:       onClick={onClick}
207:       className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 rounded-lg text-[10px] font-medium transition-all duration-200 ${
208:         active
209:           ? "bg-amber-500/20 text-amber-400 shadow-sm"
210:           : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
211:       }`}
212:     >
213:       {icon}
214:       <span>{label}</span>
215:     </button>
216:   );
217: }
````

## File: src/components/auth/AuthModal.tsx
````typescript
  1: "use client";
  2: 
  3: import { useState } from "react";
  4: import {
  5:   X,
  6:   Lock,
  7:   Mail,
  8:   Sparkles,
  9:   CheckCircle2,
 10:   AlertCircle,
 11:   Database,
 12:   Loader2,
 13:   Copy,
 14:   Check,
 15:   RefreshCw,
 16:   ArrowRight
 17: } from "lucide-react";
 18: import { Button } from "@/components/ui/button";
 19: import { useAuth } from "@/hooks/useAuth";
 20: 
 21: interface AuthModalProps {
 22:   isOpen: boolean;
 23:   onClose: () => void;
 24:   onSuccess?: () => void;
 25: }
 26: 
 27: export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
 28:   const [mode, setMode] = useState<"login" | "register">("login");
 29:   const [email, setEmail] = useState("");
 30:   const [password, setPassword] = useState("");
 31:   const [error, setError] = useState<string | null>(null);
 32:   const [message, setMessage] = useState<string | null>(null);
 33:   const [submitting, setSubmitting] = useState(false);
 34:   const [successLogin, setSuccessLogin] = useState(false);
 35:   const [isUnconfirmed, setIsUnconfirmed] = useState(false);
 36:   const [copiedSql, setCopiedSql] = useState(false);
 37:   const [confirmingRpc, setConfirmingRpc] = useState(false);
 38: 
 39:   const { signIn, signUp, signInDemo, confirmEmailAndLogin, isConfigured } = useAuth();
 40: 
 41:   if (!isOpen) return null;
 42: 
 43:   const sqlConfirmationQuery = `UPDATE auth.users SET email_confirmed_at = NOW(), confirmed_at = NOW() WHERE email = '${email.trim().toLowerCase() || "andreaarceguet@gmail.com"}';`;
 44: 
 45:   const handleSubmit = async (e: React.FormEvent) => {
 46:     e.preventDefault();
 47:     setError(null);
 48:     setMessage(null);
 49:     setIsUnconfirmed(false);
 50:     setSubmitting(true);
 51: 
 52:     try {
 53:       if (mode === "login") {
 54:         const res = await signIn(email, password);
 55:         if (res.error) {
 56:           setError(res.error);
 57:           if (res.isUnconfirmed) {
 58:             setIsUnconfirmed(true);
 59:           }
 60:         } else {
 61:           setSuccessLogin(true);
 62:           setMessage("¡Sesión iniciada correctamente! Cargando tus datos...");
 63:           setTimeout(() => {
 64:             setSuccessLogin(false);
 65:             onSuccess?.();
 66:             onClose();
 67:           }, 800);
 68:         }
 69:       } else {
 70:         const res = await signUp(email, password);
 71:         if (res.error) {
 72:           setError(res.error);
 73:         } else {
 74:           setSuccessLogin(true);
 75:           setMessage(res.message || "¡Cuenta creada exitosamente!");
 76:           setTimeout(() => {
 77:             setSuccessLogin(false);
 78:             onSuccess?.();
 79:             onClose();
 80:           }, 1000);
 81:         }
 82:       }
 83:     } finally {
 84:       setSubmitting(false);
 85:     }
 86:   };
 87: 
 88:   const handleConfirmAndLogin = async () => {
 89:     setConfirmingRpc(true);
 90:     setError(null);
 91:     try {
 92:       const res = await confirmEmailAndLogin(email, password);
 93:       if (res.error) {
 94:         setError(res.error);
 95:       } else {
 96:         setSuccessLogin(true);
 97:         setMessage("¡Cuenta confirmada y sesión iniciada!");
 98:         setTimeout(() => {
 99:           setSuccessLogin(false);
100:           onSuccess?.();
101:           onClose();
102:         }, 800);
103:       }
104:     } finally {
105:       setConfirmingRpc(false);
106:     }
107:   };
108: 
109:   const handleCopySql = () => {
110:     if (typeof navigator !== "undefined") {
111:       navigator.clipboard.writeText(sqlConfirmationQuery);
112:       setCopiedSql(true);
113:       setTimeout(() => setCopiedSql(false), 2000);
114:     }
115:   };
116: 
117:   const handleDemoLogin = () => {
118:     setSubmitting(true);
119:     signInDemo();
120:     setSuccessLogin(true);
121:     setMessage("¡Acceso Demo PRO concedido!");
122:     setTimeout(() => {
123:       setSubmitting(false);
124:       setSuccessLogin(false);
125:       onSuccess?.();
126:       onClose();
127:     }, 600);
128:   };
129: 
130:   return (
131:     <div
132:       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
133:       onClick={onClose}
134:     >
135:       <div
136:         className="relative w-full max-w-md rounded-2xl border border-slate-800/90 bg-slate-950/95 p-6 shadow-2xl shadow-amber-500/15 backdrop-blur-2xl animate-in zoom-in-95 duration-200"
137:         onClick={(e) => e.stopPropagation()}
138:       >
139:         {/* Botón cerrar */}
140:         <button
141:           onClick={onClose}
142:           className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-900 transition-colors"
143:         >
144:           <X className="h-5 w-5" />
145:         </button>
146: 
147:         {/* Encabezado */}
148:         <div className="text-center mb-5">
149:           <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/25 mb-3">
150:             <Lock className="h-6 w-6 text-slate-950" />
151:           </div>
152:           <h3 className="text-xl font-black text-slate-100 tracking-tight">
153:             {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
154:           </h3>
155:           <p className="text-xs text-slate-400 mt-1">
156:             {mode === "login"
157:               ? "Accede a tus rifas guardadas y gestiona tus diseños privados."
158:               : "Regístrate gratis para empezar a diseñar y descargar tus rifas."}
159:           </p>
160: 
161:           {/* Badge de estado Supabase */}
162:           <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium mt-3 border bg-slate-900/80 border-slate-800 text-slate-300">
163:             <Database className={`h-3 w-3 ${isConfigured ? "text-emerald-400" : "text-amber-400"}`} />
164:             <span>
165:               {isConfigured ? "Conexión a Supabase Activa" : "Modo Local / Demo activo"}
166:             </span>
167:           </div>
168:         </div>
169: 
170:         {/* Tabs de Modo */}
171:         <div className="flex rounded-xl bg-slate-900/80 p-1 mb-4 border border-slate-800">
172:           <button
173:             type="button"
174:             onClick={() => {
175:               setMode("login");
176:               setError(null);
177:               setIsUnconfirmed(false);
178:             }}
179:             className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
180:               mode === "login"
181:                 ? "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md font-bold"
182:                 : "text-slate-400 hover:text-slate-200"
183:             }`}
184:           >
185:             Ingresar
186:           </button>
187:           <button
188:             type="button"
189:             onClick={() => {
190:               setMode("register");
191:               setError(null);
192:               setIsUnconfirmed(false);
193:             }}
194:             className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
195:               mode === "register"
196:                 ? "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md font-bold"
197:                 : "text-slate-400 hover:text-slate-200"
198:             }`}
199:           >
200:             Registrarse
201:           </button>
202:         </div>
203: 
204:         {/* Alerta de Éxito con Animación */}
205:         {(successLogin || message) && (
206:           <div className="mb-4 flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs animate-in zoom-in-95 duration-200">
207:             <CheckCircle2 className="h-4 w-4 shrink-0 animate-bounce" />
208:             <span className="font-semibold">{message}</span>
209:           </div>
210:         )}
211: 
212:         {/* Alerta de Error Convencional */}
213:         {error && !isUnconfirmed && (
214:           <div className="mb-4 flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs animate-in fade-in duration-200">
215:             <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
216:             <div className="flex-1">
217:               <p className="font-semibold">{error}</p>
218:             </div>
219:           </div>
220:         )}
221: 
222:         {/* Bloque especial interactivo si el email no está confirmado */}
223:         {isUnconfirmed && (
224:           <div className="mb-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-2.5 animate-in zoom-in-95 duration-200">
225:             <div className="flex items-start gap-2">
226:               <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
227:               <div>
228:                 <p className="font-bold text-slate-100">Cuenta creada pero no confirmada</p>
229:                 <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
230:                   Supabase requiere confirmar el correo antes de permitir el login con contraseña.
231:                 </p>
232:               </div>
233:             </div>
234: 
235:             <div className="flex flex-col gap-2 pt-1">
236:               <Button
237:                 type="button"
238:                 size="sm"
239:                 onClick={handleConfirmAndLogin}
240:                 disabled={confirmingRpc}
241:                 className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs h-8 rounded-lg gap-1.5 shadow-md"
242:               >
243:                 {confirmingRpc ? (
244:                   <>
245:                     <Loader2 className="h-3.5 w-3.5 animate-spin" />
246:                     <span>Confirmando cuenta...</span>
247:                   </>
248:                 ) : (
249:                   <>
250:                     <RefreshCw className="h-3.5 w-3.5" />
251:                     <span>Auto-Confirmar y Entrar</span>
252:                   </>
253:                 )}
254:               </Button>
255: 
256:               <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] space-y-1">
257:                 <div className="flex items-center justify-between text-slate-400">
258:                   <span>O ejecuta en Supabase SQL Editor:</span>
259:                   <button
260:                     type="button"
261:                     onClick={handleCopySql}
262:                     className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
263:                   >
264:                     {copiedSql ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
265:                     <span>{copiedSql ? "¡Copiado!" : "Copiar SQL"}</span>
266:                   </button>
267:                 </div>
268:                 <code className="block font-mono text-[10px] text-slate-300 bg-slate-950 p-1.5 rounded truncate select-all">
269:                   {sqlConfirmationQuery}
270:                 </code>
271:               </div>
272:             </div>
273:           </div>
274:         )}
275: 
276:         {/* Formulario */}
277:         <form onSubmit={handleSubmit} className="space-y-3.5">
278:           <div>
279:             <label className="block text-xs font-semibold text-slate-300 mb-1">
280:               Correo Electrónico
281:             </label>
282:             <div className="relative">
283:               <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
284:               <input
285:                 type="email"
286:                 required
287:                 disabled={submitting || successLogin}
288:                 value={email}
289:                 onChange={(e) => setEmail(e.target.value)}
290:                 placeholder="andreaarceguet@gmail.com"
291:                 className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all disabled:opacity-50"
292:               />
293:             </div>
294:           </div>
295: 
296:           <div>
297:             <label className="block text-xs font-semibold text-slate-300 mb-1">
298:               Contraseña
299:             </label>
300:             <div className="relative">
301:               <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
302:               <input
303:                 type="password"
304:                 required
305:                 minLength={6}
306:                 disabled={submitting || successLogin}
307:                 value={password}
308:                 onChange={(e) => setPassword(e.target.value)}
309:                 placeholder="••••••••"
310:                 className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all disabled:opacity-50"
311:               />
312:             </div>
313:           </div>
314: 
315:           {/* Botón Principal con Loader */}
316:           <Button
317:             type="submit"
318:             disabled={submitting || successLogin}
319:             className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-300 h-10 text-xs shadow-lg shadow-amber-500/25 rounded-xl mt-2 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
320:           >
321:             {submitting ? (
322:               <>
323:                 <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
324:                 <span>{mode === "login" ? "Verificando credenciales..." : "Creando tu cuenta..."}</span>
325:               </>
326:             ) : successLogin ? (
327:               <>
328:                 <Check className="h-4 w-4 text-slate-950" />
329:                 <span>¡Listo!</span>
330:               </>
331:             ) : (
332:               <>
333:                 <span>{mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}</span>
334:                 <ArrowRight className="h-3.5 w-3.5" />
335:               </>
336:             )}
337:           </Button>
338:         </form>
339: 
340:         {/* Separador */}
341:         <div className="relative my-4">
342:           <div className="absolute inset-0 flex items-center">
343:             <div className="w-full border-t border-slate-800" />
344:           </div>
345:           <div className="relative flex justify-center text-[10px] uppercase">
346:             <span className="bg-slate-950 px-2 text-slate-500 font-medium">
347:               o modo inmediato
348:             </span>
349:           </div>
350:         </div>
351: 
352:         {/* Botón Acceso Rápido Demo */}
353:         <Button
354:           type="button"
355:           variant="outline"
356:           onClick={handleDemoLogin}
357:           disabled={submitting}
358:           className="w-full border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-amber-400 hover:text-amber-300 h-9 text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
359:         >
360:           <Sparkles className="h-3.5 w-3.5 text-amber-400" />
361:           <span>Acceder con Modo Demo Pro (1-Click)</span>
362:         </Button>
363:       </div>
364:     </div>
365:   );
366: }
````

## File: src/components/auth/ProfileModal.tsx
````typescript
  1: "use client";
  2: 
  3: import { useState, useEffect } from "react";
  4: import {
  5:   X,
  6:   User,
  7:   Mail,
  8:   Lock,
  9:   CheckCircle2,
 10:   AlertCircle,
 11:   LogOut,
 12:   Sparkles,
 13:   Database,
 14:   Ticket,
 15:   KeyRound,
 16:   Loader2
 17: } from "lucide-react";
 18: import { Button } from "@/components/ui/button";
 19: import { useAuth } from "@/hooks/useAuth";
 20: import { getSavedTickets } from "@/services/tickets-service";
 21: 
 22: interface ProfileModalProps {
 23:   isOpen: boolean;
 24:   onClose: () => void;
 25: }
 26: 
 27: export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
 28:   const { user, updateProfile, updatePassword, signOut, isConfigured } = useAuth();
 29: 
 30:   const [name, setName] = useState("");
 31:   const [email, setEmail] = useState("");
 32:   const [newPassword, setNewPassword] = useState("");
 33:   const [confirmPassword, setConfirmPassword] = useState("");
 34:   const [savedTicketsCount, setSavedTicketsCount] = useState(0);
 35: 
 36:   const [profileLoading, setProfileLoading] = useState(false);
 37:   const [passwordLoading, setPasswordLoading] = useState(false);
 38:   const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
 39: 
 40:   useEffect(() => {
 41:     if (user) {
 42:       setName(user.name || "");
 43:       setEmail(user.email || "");
 44:       getSavedTickets().then((tickets) => setSavedTicketsCount(tickets.length)).catch(() => {});
 45:     }
 46:   }, [user, isOpen]);
 47: 
 48:   if (!isOpen || !user) return null;
 49: 
 50:   const handleUpdateProfile = async (e: React.FormEvent) => {
 51:     e.preventDefault();
 52:     setStatusMessage(null);
 53:     setProfileLoading(true);
 54: 
 55:     try {
 56:       const res = await updateProfile(name, email);
 57:       if (res.error) {
 58:         setStatusMessage({ type: "error", text: res.error });
 59:       } else {
 60:         setStatusMessage({ type: "success", text: res.message || "Perfil actualizado exitosamente" });
 61:         setTimeout(() => setStatusMessage(null), 3000);
 62:       }
 63:     } finally {
 64:       setProfileLoading(false);
 65:     }
 66:   };
 67: 
 68:   const handleChangePassword = async (e: React.FormEvent) => {
 69:     e.preventDefault();
 70:     setStatusMessage(null);
 71: 
 72:     if (newPassword.length < 6) {
 73:       setStatusMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" });
 74:       return;
 75:     }
 76: 
 77:     if (newPassword !== confirmPassword) {
 78:       setStatusMessage({ type: "error", text: "Las contraseñas no coinciden" });
 79:       return;
 80:     }
 81: 
 82:     setPasswordLoading(true);
 83:     try {
 84:       const res = await updatePassword(newPassword);
 85:       if (res.error) {
 86:         setStatusMessage({ type: "error", text: res.error });
 87:       } else {
 88:         setStatusMessage({ type: "success", text: "Contraseña actualizada exitosamente" });
 89:         setNewPassword("");
 90:         setConfirmPassword("");
 91:         setTimeout(() => setStatusMessage(null), 3000);
 92:       }
 93:     } finally {
 94:       setPasswordLoading(false);
 95:     }
 96:   };
 97: 
 98:   const handleSignOut = async () => {
 99:     await signOut();
100:     onClose();
101:   };
102: 
103:   return (
104:     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
105:       <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700/80 bg-slate-900 p-5 sm:p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
106:         {/* Botón Cerrar */}
107:         <button
108:           onClick={onClose}
109:           className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
110:         >
111:           <X className="h-5 w-5" />
112:         </button>
113: 
114:         {/* Header con Avatar */}
115:         <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
116:           <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center text-xl font-black shadow-lg shadow-amber-500/30">
117:             {name ? name[0].toUpperCase() : user.email[0].toUpperCase()}
118:           </div>
119:           <div>
120:             <div className="flex items-center gap-1.5">
121:               <h3 className="text-base font-bold text-slate-100">{name || "Mi Cuenta"}</h3>
122:               <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.2 text-[9px] font-bold text-amber-300">
123:                 PRO
124:               </span>
125:             </div>
126:             <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[220px]">{user.email}</p>
127:           </div>
128:         </div>
129: 
130:         {/* Métricas de la cuenta */}
131:         <div className="grid grid-cols-2 gap-2.5 my-4">
132:           <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center gap-2.5">
133:             <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
134:               <Ticket className="h-4 w-4" />
135:             </div>
136:             <div>
137:               <p className="text-xs font-bold text-slate-200">{savedTicketsCount}</p>
138:               <p className="text-[10px] text-slate-400">Rifas Guardadas</p>
139:             </div>
140:           </div>
141: 
142:           <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center gap-2.5">
143:             <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
144:               <Database className="h-4 w-4" />
145:             </div>
146:             <div>
147:               <p className="text-xs font-bold text-slate-200">{isConfigured ? "Supabase Cloud" : "Local Demo"}</p>
148:               <p className="text-[10px] text-slate-400">Almacenamiento</p>
149:             </div>
150:           </div>
151:         </div>
152: 
153:         {/* Alerta de Feedback */}
154:         {statusMessage && (
155:           <div
156:             className={`mb-4 flex items-center gap-2 p-3 rounded-2xl text-xs ${
157:               statusMessage.type === "success"
158:                 ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
159:                 : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
160:             }`}
161:           >
162:             {statusMessage.type === "success" ? (
163:               <CheckCircle2 className="h-4 w-4 shrink-0" />
164:             ) : (
165:               <AlertCircle className="h-4 w-4 shrink-0" />
166:             )}
167:             <span>{statusMessage.text}</span>
168:           </div>
169:         )}
170: 
171:         {/* Formulario 1: Datos Personales */}
172:         <form onSubmit={handleUpdateProfile} className="space-y-3 pt-1">
173:           <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
174:             <User className="h-3.5 w-3.5 text-amber-400" />
175:             <span>Datos del Perfil</span>
176:           </h4>
177: 
178:           <div>
179:             <label className="block text-[11px] font-medium text-slate-300 mb-1">
180:               Nombre Completo
181:             </label>
182:             <input
183:               type="text"
184:               required
185:               value={name}
186:               onChange={(e) => setName(e.target.value)}
187:               placeholder="Tu nombre o el de tu organización"
188:               className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
189:             />
190:           </div>
191: 
192:           <div>
193:             <label className="block text-[11px] font-medium text-slate-300 mb-1">
194:               Correo Electrónico
195:             </label>
196:             <input
197:               type="email"
198:               required
199:               disabled={profileLoading}
200:               value={email}
201:               onChange={(e) => setEmail(e.target.value)}
202:               placeholder="tu@email.com"
203:               className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
204:             />
205:           </div>
206: 
207:           <Button
208:             type="submit"
209:             disabled={profileLoading}
210:             size="sm"
211:             className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-300 text-xs font-semibold h-9 rounded-xl transition-all flex items-center justify-center gap-2"
212:           >
213:             {profileLoading ? (
214:               <>
215:                 <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
216:                 <span>Guardando cambios...</span>
217:               </>
218:             ) : (
219:               <span>Guardar Cambios de Perfil</span>
220:             )}
221:           </Button>
222:         </form>
223: 
224:         {/* Separador */}
225:         <div className="my-5 border-t border-slate-800" />
226: 
227:         {/* Formulario 2: Cambiar Contraseña */}
228:         <form onSubmit={handleChangePassword} className="space-y-3">
229:           <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
230:             <KeyRound className="h-3.5 w-3.5 text-amber-400" />
231:             <span>Seguridad y Contraseña</span>
232:           </h4>
233: 
234:           <div>
235:             <label className="block text-[11px] font-medium text-slate-300 mb-1">
236:               Nueva Contraseña
237:             </label>
238:             <input
239:               type="password"
240:               minLength={6}
241:               disabled={passwordLoading}
242:               value={newPassword}
243:               onChange={(e) => setNewPassword(e.target.value)}
244:               placeholder="Mínimo 6 caracteres"
245:               className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
246:             />
247:           </div>
248: 
249:           <div>
250:             <label className="block text-[11px] font-medium text-slate-300 mb-1">
251:               Confirmar Nueva Contraseña
252:             </label>
253:             <input
254:               type="password"
255:               minLength={6}
256:               disabled={passwordLoading}
257:               value={confirmPassword}
258:               onChange={(e) => setConfirmPassword(e.target.value)}
259:               placeholder="Repite la nueva contraseña"
260:               className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
261:             />
262:           </div>
263: 
264:           <Button
265:             type="submit"
266:             disabled={passwordLoading || !newPassword}
267:             size="sm"
268:             className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-300 text-xs font-semibold h-9 rounded-xl transition-all flex items-center justify-center gap-2"
269:           >
270:             {passwordLoading ? (
271:               <>
272:                 <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
273:                 <span>Actualizando contraseña...</span>
274:               </>
275:             ) : (
276:               <span>Actualizar Contraseña</span>
277:             )}
278:           </Button>
279:         </form>
280: 
281:         {/* Separador y Cerrar Sesión */}
282:         <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
283:           <span className="text-[11px] text-slate-500">Sesión iniciada</span>
284:           <Button
285:             type="button"
286:             variant="ghost"
287:             size="sm"
288:             onClick={handleSignOut}
289:             className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs h-8 rounded-xl flex items-center gap-1.5"
290:           >
291:             <LogOut className="h-3.5 w-3.5" />
292:             <span>Cerrar Sesión</span>
293:           </Button>
294:         </div>
295:       </div>
296:     </div>
297:   );
298: }
````

## File: src/components/ui/button.tsx
````typescript
 1: import * as React from "react";
 2: import { cva, type VariantProps } from "class-variance-authority";
 3: import { cn } from "@/lib/utils";
 4: 
 5: const buttonVariants = cva(
 6:   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
 7:   {
 8:     variants: {
 9:       variant: {
10:         default:
11:           "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold shadow-lg shadow-amber-500/20 active:scale-[0.98]",
12:         destructive:
13:           "bg-rose-600 text-white shadow-sm hover:bg-rose-700 active:scale-[0.98]",
14:         outline:
15:           "border border-slate-800 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-amber-500/40 hover:text-amber-400 shadow-sm active:scale-[0.98]",
16:         secondary:
17:           "bg-slate-900/90 border border-slate-800 text-slate-200 shadow-sm hover:bg-slate-800 hover:border-amber-500/30 active:scale-[0.98]",
18:         ghost:
19:           "text-slate-300 hover:bg-slate-900 hover:text-amber-400",
20:         link: "text-amber-400 underline-offset-4 hover:underline",
21:       },
22:       size: {
23:         default: "h-10 px-5 py-2",
24:         sm: "h-8 rounded-md px-3 text-xs",
25:         lg: "h-12 rounded-lg px-8 text-base",
26:         icon: "h-10 w-10",
27:       },
28:     },
29:     defaultVariants: {
30:       variant: "default",
31:       size: "default",
32:     },
33:   }
34: );
35: 
36: export interface ButtonProps
37:   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
38:     VariantProps<typeof buttonVariants> {}
39: 
40: const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
41:   ({ className, variant, size, ...props }, ref) => {
42:     return (
43:       <button
44:         className={cn(buttonVariants({ variant, size, className }))}
45:         ref={ref}
46:         {...props}
47:       />
48:     );
49:   }
50: );
51: Button.displayName = "Button";
52: 
53: export { Button, buttonVariants };
````

## File: src/components/ui/card.tsx
````typescript
 1: import * as React from "react";
 2: import { cn } from "@/lib/utils";
 3: 
 4: const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
 5:   ({ className, ...props }, ref) => (
 6:     <div
 7:       ref={ref}
 8:       className={cn(
 9:         "rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm shadow-xl",
10:         className
11:       )}
12:       {...props}
13:     />
14:   )
15: );
16: Card.displayName = "Card";
17: 
18: const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
19:   ({ className, ...props }, ref) => (
20:     <div
21:       ref={ref}
22:       className={cn("flex flex-col space-y-1.5 p-6", className)}
23:       {...props}
24:     />
25:   )
26: );
27: CardHeader.displayName = "CardHeader";
28: 
29: const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
30:   ({ className, ...props }, ref) => (
31:     <h3
32:       ref={ref}
33:       className={cn("text-xl font-semibold text-slate-100 tracking-tight", className)}
34:       {...props}
35:     />
36:   )
37: );
38: CardTitle.displayName = "CardTitle";
39: 
40: const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
41:   ({ className, ...props }, ref) => (
42:     <p
43:       ref={ref}
44:       className={cn("text-sm text-slate-400", className)}
45:       {...props}
46:     />
47:   )
48: );
49: CardDescription.displayName = "CardDescription";
50: 
51: const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
52:   ({ className, ...props }, ref) => (
53:     <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
54:   )
55: );
56: CardContent.displayName = "CardContent";
57: 
58: export { Card, CardHeader, CardTitle, CardDescription, CardContent };
````

## File: src/components/ui/number-input.tsx
````typescript
  1: "use client";
  2: 
  3: import * as React from "react";
  4: import { Minus, Plus } from "lucide-react";
  5: import { cn } from "@/lib/utils";
  6: 
  7: export interface NumberInputProps {
  8:   id?: string;
  9:   value: number;
 10:   onChange: (value: number) => void;
 11:   min?: number;
 12:   max?: number;
 13:   step?: number;
 14:   suffix?: string;
 15:   prefix?: string;
 16:   disabled?: boolean;
 17:   className?: string;
 18:   placeholder?: string;
 19: }
 20: 
 21: export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
 22:   (
 23:     {
 24:       id,
 25:       value,
 26:       onChange,
 27:       min = 0,
 28:       max = 999999,
 29:       step = 1,
 30:       suffix,
 31:       prefix,
 32:       disabled = false,
 33:       className,
 34:       placeholder,
 35:     },
 36:     ref
 37:   ) => {
 38:     // Keep local string for smooth typing experience without jarring cursor resets
 39:     const [localStr, setLocalStr] = React.useState<string>(String(value ?? ""));
 40: 
 41:     React.useEffect(() => {
 42:       setLocalStr(String(value ?? ""));
 43:     }, [value]);
 44: 
 45:     const handleDecrement = () => {
 46:       if (disabled) return;
 47:       const nextVal = Math.max(min, Number((value - step).toFixed(2)));
 48:       onChange(nextVal);
 49:     };
 50: 
 51:     const handleIncrement = () => {
 52:       if (disabled) return;
 53:       const nextVal = Math.min(max, Number((value + step).toFixed(2)));
 54:       onChange(nextVal);
 55:     };
 56: 
 57:     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 58:       const raw = e.target.value;
 59:       // Allow only numbers, dot, or empty
 60:       const sanitized = raw.replace(/[^0-9.]/g, "");
 61:       setLocalStr(sanitized);
 62: 
 63:       if (sanitized === "") {
 64:         onChange(min);
 65:         return;
 66:       }
 67: 
 68:       const num = Number(sanitized);
 69:       if (!isNaN(num)) {
 70:         const clamped = Math.min(max, Math.max(min, num));
 71:         onChange(clamped);
 72:       }
 73:     };
 74: 
 75:     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
 76:       if (e.key === "ArrowUp") {
 77:         e.preventDefault();
 78:         handleIncrement();
 79:       } else if (e.key === "ArrowDown") {
 80:         e.preventDefault();
 81:         handleDecrement();
 82:       }
 83:     };
 84: 
 85:     const handleBlur = () => {
 86:       // Re-format to current value on blur
 87:       setLocalStr(String(value ?? min));
 88:     };
 89: 
 90:     return (
 91:       <div
 92:         className={cn(
 93:           "group relative flex items-center h-10 w-full rounded-xl border border-slate-800 bg-slate-900/80 p-0.5 focus-within:border-amber-500/80 focus-within:ring-2 focus-within:ring-amber-500/20 hover:border-slate-700 transition-all shadow-inner",
 94:           disabled && "opacity-50 pointer-events-none",
 95:           className
 96:         )}
 97:       >
 98:         {/* Decrement Button */}
 99:         <button
100:           type="button"
101:           tabIndex={-1}
102:           onClick={handleDecrement}
103:           disabled={disabled || value <= min}
104:           className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-700/80 hover:text-amber-400 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all cursor-pointer"
105:           title={`Restar ${step}`}
106:         >
107:           <Minus className="h-3.5 w-3.5" />
108:         </button>
109: 
110:         {/* Optional Prefix */}
111:         {prefix && (
112:           <span className="pl-1 text-xs font-semibold text-amber-400/80 select-none">
113:             {prefix}
114:           </span>
115:         )}
116: 
117:         {/* Input */}
118:         <input
119:           ref={ref}
120:           id={id}
121:           type="text"
122:           inputMode="numeric"
123:           value={localStr}
124:           placeholder={placeholder}
125:           disabled={disabled}
126:           onChange={handleInputChange}
127:           onKeyDown={handleKeyDown}
128:           onBlur={handleBlur}
129:           className="w-full bg-transparent px-2 text-center text-sm font-semibold font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none"
130:         />
131: 
132:         {/* Optional Suffix */}
133:         {suffix && (
134:           <span className="pr-1 text-xs font-medium text-slate-400 select-none">
135:             {suffix}
136:           </span>
137:         )}
138: 
139:         {/* Increment Button */}
140:         <button
141:           type="button"
142:           tabIndex={-1}
143:           onClick={handleIncrement}
144:           disabled={disabled || value >= max}
145:           className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-700/80 hover:text-amber-400 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all cursor-pointer"
146:           title={`Sumar ${step}`}
147:         >
148:           <Plus className="h-3.5 w-3.5" />
149:         </button>
150:       </div>
151:     );
152:   }
153: );
154: 
155: NumberInput.displayName = "NumberInput";
````

## File: src/components/ui/select.tsx
````typescript
 1: "use client";
 2: 
 3: import * as React from "react";
 4: import { ChevronDown } from "lucide-react";
 5: import { cn } from "@/lib/utils";
 6: 
 7: export interface SelectProps
 8:   extends React.SelectHTMLAttributes<HTMLSelectElement> {
 9:   label?: string;
10:   options?: { value: string | number; label: string }[];
11: }
12: 
13: export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
14:   ({ className, children, options, label, id, ...props }, ref) => {
15:     return (
16:       <div className="relative w-full">
17:         {label && (
18:           <label htmlFor={id} className="block text-xs font-medium text-slate-300 mb-1.5">
19:             {label}
20:           </label>
21:         )}
22:         <div className="relative">
23:           <select
24:             id={id}
25:             ref={ref}
26:             className={cn(
27:               "flex h-10 w-full appearance-none rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 pr-9 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 hover:border-slate-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer shadow-inner",
28:               className
29:             )}
30:             {...props}
31:           >
32:             {options
33:               ? options.map((opt) => (
34:                   <option
35:                     key={opt.value}
36:                     value={opt.value}
37:                     className="bg-slate-900 text-slate-100 py-1"
38:                   >
39:                     {opt.label}
40:                   </option>
41:                 ))
42:               : children}
43:           </select>
44:           <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
45:         </div>
46:       </div>
47:     );
48:   }
49: );
50: 
51: Select.displayName = "Select";
````

## File: src/components/PresetSelector.tsx
````typescript
  1: "use client";
  2: 
  3: import { Sparkles, GraduationCap, Trophy, HeartHandshake, Car } from "lucide-react";
  4: import { TicketConfig, PrintConfig } from "@/types";
  5: import { useRifaStore } from "@/store/useRifaStore";
  6: 
  7: interface Preset {
  8:   id: string;
  9:   name: string;
 10:   category: string;
 11:   icon: React.ReactNode;
 12:   ticket: Partial<TicketConfig>;
 13:   print?: Partial<PrintConfig>;
 14: }
 15: 
 16: const PRESETS: Preset[] = [
 17:   {
 18:     id: "escolar",
 19:     name: "Rifa Escolar y Kermesse",
 20:     category: "Educación",
 21:     icon: <GraduationCap className="h-4 w-4 text-amber-400" />,
 22:     ticket: {
 23:       eventName: "Gran Rifa Escolar Cooperadora",
 24:       subtitle: "Escuela Primaria N° 71 • Festejo Comunitario",
 25:       organizer: "Comisión Cooperadora",
 26:       drawDate: "20 de Octubre 2026",
 27:       price: 1500,
 28:       priceLabel: "Valor: $ 1.500",
 29:       totalTickets: 500,
 30:       startNumber: 1,
 31:       contributionText: "Bono contribución para obras y equipamiento",
 32:       primaryColor: "#0284c7",
 33:       prizes: [
 34:         { position: 1, label: "1° Premio:", description: "Bicicleta Rodado 29" },
 35:         { position: 2, label: "2° Premio:", description: "Tablet 10 pulgadas" },
 36:         { position: 3, label: "3° Premio:", description: "Canasta Familiar Completa" },
 37:         { position: 4, label: "4° Premio:", description: "Juego de Sabanas 2 1/2" },
 38:       ],
 39:     },
 40:   },
 41:   {
 42:     id: "deportiva",
 43:     name: "Bono Club Deportivo",
 44:     category: "Deportes",
 45:     icon: <Trophy className="h-4 w-4 text-emerald-400" />,
 46:     ticket: {
 47:       eventName: "Gran Bono Contribución Club Atlético",
 48:       subtitle: "Subcomisión de Fútbol Infantil y Juvenil",
 49:       organizer: "Club Atlético",
 50:       drawDate: "15 de Noviembre 2026",
 51:       price: 3000,
 52:       priceLabel: "Valor: $ 3.000",
 53:       totalTickets: 1000,
 54:       startNumber: 1,
 55:       contributionText: "Para indumentaria y viajes del plantel",
 56:       primaryColor: "#059669",
 57:       prizes: [
 58:         { position: 1, label: "1° Premio:", description: "Smart TV 50 pulgadas 4K" },
 59:         { position: 2, label: "2° Premio:", description: "Parrilla Portátil + Set Asador" },
 60:         { position: 3, label: "3° Premio:", description: "Camiseta Oficial Firmada" },
 61:         { position: 4, label: "4° Premio:", description: "Pelota Profesional Oficial" },
 62:         { position: 5, label: "5° Premio:", description: "Cajón de Bebidas Variadas" },
 63:       ],
 64:     },
 65:   },
 66:   {
 67:     id: "salud",
 68:     name: "Sorteo Solidario Pro-Salud",
 69:     category: "Solidario",
 70:     icon: <HeartHandshake className="h-4 w-4 text-rose-400" />,
 71:     ticket: {
 72:       eventName: "Sorteo Solidario Todos por Sofía",
 73:       subtitle: "Campaña de Recaudación para Tratamiento Médico",
 74:       organizer: "Familiares y Amigos",
 75:       drawDate: "05 de Diciembre 2026",
 76:       price: 2000,
 77:       priceLabel: "Valor: $ 2.000",
 78:       totalTickets: 800,
 79:       startNumber: 1,
 80:       contributionText: "Tu ayuda salva vidas • Muchas gracias por colaborar",
 81:       primaryColor: "#e11d48",
 82:       prizes: [
 83:         { position: 1, label: "1° Premio:", description: "Orden de Compra $ 200.000" },
 84:         { position: 2, label: "2° Premio:", description: "Horno Microondas Digital" },
 85:         { position: 3, label: "3° Premio:", description: "Pava Eléctrica + Mate Térmico" },
 86:       ],
 87:     },
 88:   },
 89:   {
 90:     id: "gran-sorteo",
 91:     name: "Gran Rifa Anual Moto 0KM",
 92:     category: "Gran Premio",
 93:     icon: <Car className="h-4 w-4 text-amber-400" />,
 94:     ticket: {
 95:       eventName: "Gran Sorteo Millonario Fin de Año",
 96:       subtitle: "Tradicional Sorteo de Fin de Año con Lotería Nacional",
 97:       organizer: "Asociación Civil Vecinal",
 98:       drawDate: "28 de Diciembre 2026",
 99:       price: 10000,
100:       priceLabel: "Valor: $ 10.000",
101:       totalTickets: 2000,
102:       startNumber: 1,
103:       contributionText: "Jugada nocturna por Quiniela de la Ciudad",
104:       primaryColor: "#991b1b",
105:       prizes: [
106:         { position: 1, label: "1° Premio:", description: "Moto 110cc 0KM con Papeles" },
107:         { position: 2, label: "2° Premio:", description: "Heladera No Frost con Freezer" },
108:         { position: 3, label: "3° Premio:", description: "Lavarropas Automático 7Kg" },
109:         { position: 4, label: "4° Premio:", description: "Microondas + Tostadora" },
110:         { position: 5, label: "5° Premio:", description: "Juego de Toallones Premium" },
111:       ],
112:     },
113:   },
114: ];
115: 
116: interface PresetSelectorProps {
117:   onSelect?: () => void;
118: }
119: 
120: export function PresetSelector({ onSelect }: PresetSelectorProps) {
121:   const { setTicketConfig, setPrintConfig } = useRifaStore();
122: 
123:   const handleApplyPreset = (preset: Preset) => {
124:     setTicketConfig(preset.ticket);
125:     if (preset.print) {
126:       setPrintConfig(preset.print);
127:     }
128:     onSelect?.();
129:   };
130: 
131:   return (
132:     <div className="space-y-2">
133:       <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
134:         <Sparkles className="h-3.5 w-3.5 text-amber-400" />
135:         <span>Plantillas Profesionales Listas para Usar</span>
136:       </div>
137:       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
138:         {PRESETS.map((preset) => (
139:           <button
140:             key={preset.id}
141:             type="button"
142:             onClick={() => handleApplyPreset(preset)}
143:             className="flex flex-col items-start p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-amber-500/50 transition-all text-left group shadow-sm"
144:           >
145:             <div className="p-1.5 rounded-lg bg-slate-900/80 mb-2 group-hover:scale-105 transition-transform">
146:               {preset.icon}
147:             </div>
148:             <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
149:               {preset.category}
150:             </span>
151:             <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-1">
152:               {preset.name}
153:             </span>
154:           </button>
155:         ))}
156:       </div>
157:     </div>
158:   );
159: }
````

## File: src/components/PrizeEditor.tsx
````typescript
  1: "use client";
  2: 
  3: import React, { useState, useRef, useEffect } from "react";
  4: import { Trophy, Plus, Trash2, RotateCcw, List, AlignLeft, Info } from "lucide-react";
  5: import { Label } from "@/components/ui/label";
  6: import { Button } from "@/components/ui/button";
  7: import { useRifaStore } from "@/store/useRifaStore";
  8: import { DEFAULT_PRIZES } from "@/lib/constants";
  9: import { Prize } from "@/types";
 10: 
 11: export function PrizeEditor() {
 12:   const { ticketConfig, setTicketConfig } = useRifaStore();
 13:   const prizes = ticketConfig.prizes;
 14: 
 15:   const [mode, setMode] = useState<"list" | "text">("list");
 16:   const [focusIndex, setFocusIndex] = useState<number | null>(null);
 17:   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
 18: 
 19:   // Focus management when items are added or removed
 20:   useEffect(() => {
 21:     if (focusIndex !== null && inputRefs.current[focusIndex]) {
 22:       inputRefs.current[focusIndex]?.focus();
 23:       setFocusIndex(null);
 24:     }
 25:   }, [focusIndex, prizes.length]);
 26: 
 27:   // Re-indexes an array of prizes so positions are 1..N and labels are 1°..N°
 28:   const reindex = (items: { description: string }[]): Prize[] => {
 29:     return items.map((item, idx) => ({
 30:       position: idx + 1,
 31:       label: `${idx + 1}°`,
 32:       description: item.description,
 33:     }));
 34:   };
 35: 
 36:   const updatePrizes = (newPrizes: Prize[]) => {
 37:     setTicketConfig({ prizes: newPrizes });
 38:   };
 39: 
 40:   const handleDescriptionChange = (index: number, description: string) => {
 41:     const updated = prizes.map((p, i) =>
 42:       i === index ? { ...p, description } : p
 43:     );
 44:     updatePrizes(updated);
 45:   };
 46: 
 47:   const handleKeyDown = (
 48:     e: React.KeyboardEvent<HTMLInputElement>,
 49:     index: number
 50:   ) => {
 51:     if (e.key === "Enter") {
 52:       e.preventDefault();
 53:       // Insert a new prize immediately after the current one ("sume un 1")
 54:       const newItems = [...prizes];
 55:       newItems.splice(index + 1, 0, {
 56:         position: index + 2,
 57:         label: `${index + 2}°`,
 58:         description: "",
 59:       });
 60:       const reindexed = reindex(newItems);
 61:       updatePrizes(reindexed);
 62:       setFocusIndex(index + 1);
 63:     } else if (e.key === "Backspace" && prizes[index].description === "") {
 64:       if (prizes.length > 1) {
 65:         e.preventDefault();
 66:         const newItems = prizes.filter((_, i) => i !== index);
 67:         const reindexed = reindex(newItems);
 68:         updatePrizes(reindexed);
 69:         setFocusIndex(Math.max(0, index - 1));
 70:       }
 71:     } else if (e.key === "ArrowDown" && index < prizes.length - 1) {
 72:       e.preventDefault();
 73:       inputRefs.current[index + 1]?.focus();
 74:     } else if (e.key === "ArrowUp" && index > 0) {
 75:       e.preventDefault();
 76:       inputRefs.current[index - 1]?.focus();
 77:     }
 78:   };
 79: 
 80:   const handlePaste = (
 81:     e: React.ClipboardEvent<HTMLInputElement>,
 82:     index: number
 83:   ) => {
 84:     const pastedText = e.clipboardData.getData("text");
 85:     if (pastedText.includes("\n")) {
 86:       e.preventDefault();
 87:       const lines = pastedText
 88:         .split(/\r?\n/)
 89:         .map((l) => l.trim())
 90:         .filter((l) => l.length > 0)
 91:         // Clean common prefixes if any like "1-", "1.", "1°"
 92:         .map((l) => l.replace(/^(\d+[\.\-\°\)]\s*)/, ""));
 93: 
 94:       if (lines.length === 0) return;
 95: 
 96:       const newItems = [...prizes];
 97:       // Replace current item with first line
 98:       newItems[index] = { ...newItems[index], description: lines[0] };
 99:       const remainingItems: Prize[] = lines.slice(1).map((desc, i) => ({
100:         position: index + 2 + i,
101:         label: `${index + 2 + i}°`,
102:         description: desc,
103:       }));
104:       newItems.splice(index + 1, 0, ...remainingItems);
105: 
106:       const reindexed = reindex(newItems);
107:       updatePrizes(reindexed);
108:       setFocusIndex(index + lines.length - 1);
109:     }
110:   };
111: 
112:   const handleAddPrize = () => {
113:     const newIndex = prizes.length;
114:     const updated = [
115:       ...prizes,
116:       {
117:         position: newIndex + 1,
118:         label: `${newIndex + 1}°`,
119:         description: "",
120:       },
121:     ];
122:     updatePrizes(updated);
123:     setFocusIndex(newIndex);
124:   };
125: 
126:   const handleRemovePrize = (index: number) => {
127:     if (prizes.length <= 1) {
128:       // Keep at least one empty item
129:       updatePrizes([{ position: 1, label: "1°", description: "" }]);
130:       setFocusIndex(0);
131:       return;
132:     }
133:     const filtered = prizes.filter((_, i) => i !== index);
134:     updatePrizes(reindex(filtered));
135:     setFocusIndex(Math.min(index, filtered.length - 1));
136:   };
137: 
138:   const handleResetDefaults = () => {
139:     updatePrizes(DEFAULT_PRIZES);
140:   };
141: 
142:   const handleClearAll = () => {
143:     updatePrizes([{ position: 1, label: "1°", description: "" }]);
144:     setFocusIndex(0);
145:   };
146: 
147:   // Raw text multi-line mode handlers
148:   const rawTextValue = prizes.map((p) => p.description).join("\n");
149: 
150:   const handleRawTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
151:     const lines = e.target.value.split("\n");
152:     const newPrizes: Prize[] = lines.map((line, idx) => ({
153:       position: idx + 1,
154:       label: `${idx + 1}°`,
155:       description: line,
156:     }));
157:     updatePrizes(newPrizes.length > 0 ? newPrizes : [{ position: 1, label: "1°", description: "" }]);
158:   };
159: 
160:   return (
161:     <div className="space-y-3 pt-1">
162:       {/* Header and Controls */}
163:       <div className="flex items-center justify-between">
164:         <Label className="flex items-center gap-2 font-medium text-slate-200">
165:           <Trophy className="h-4 w-4 text-amber-400" />
166:           Premios ({prizes.length})
167:         </Label>
168: 
169:         <div className="flex items-center gap-1">
170:           {/* Mode toggle */}
171:           <div className="flex rounded-md bg-slate-800 p-0.5 border border-slate-700/60">
172:             <button
173:               type="button"
174:               onClick={() => setMode("list")}
175:               className={`flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors cursor-pointer ${
176:                 mode === "list"
177:                   ? "bg-amber-500/20 text-amber-400 font-medium"
178:                   : "text-slate-400 hover:text-slate-200"
179:               }`}
180:               title="Modo lista itemizada (Enter suma el siguiente)"
181:             >
182:               <List className="h-3.5 w-3.5" />
183:               Lista
184:             </button>
185:             <button
186:               type="button"
187:               onClick={() => setMode("text")}
188:               className={`flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors cursor-pointer ${
189:                 mode === "text"
190:                   ? "bg-amber-500/20 text-amber-400 font-medium"
191:                   : "text-slate-400 hover:text-slate-200"
192:               }`}
193:               title="Modo texto libre (una línea por premio)"
194:             >
195:               <AlignLeft className="h-3.5 w-3.5" />
196:               Texto
197:             </button>
198:           </div>
199: 
200:           {/* Quick font size adjustment for prizes */}
201:           <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700/60 rounded px-1.5 py-0.5" title="Tamaño de letra de premios">
202:             <span className="text-[10px] text-slate-400 font-medium">Fuente:</span>
203:             <button
204:               type="button"
205:               onClick={() =>
206:                 setTicketConfig({
207:                   prizesFontSize: Math.max(6, (ticketConfig.prizesFontSize ?? 8) - 1),
208:                 })
209:               }
210:               className="text-xs text-slate-400 hover:text-amber-400 px-1 py-0.5 rounded cursor-pointer"
211:               title="Achicar letra de premios"
212:             >
213:               -
214:             </button>
215:             <span className="font-mono text-[11px] font-bold text-amber-400 px-0.5">
216:               {ticketConfig.prizesFontSize ?? 8}px
217:             </span>
218:             <button
219:               type="button"
220:               onClick={() =>
221:                 setTicketConfig({
222:                   prizesFontSize: Math.min(14, (ticketConfig.prizesFontSize ?? 8) + 1),
223:                 })
224:               }
225:               className="text-xs text-slate-400 hover:text-amber-400 px-1 py-0.5 rounded cursor-pointer"
226:               title="Agrandar letra de premios"
227:             >
228:               +
229:             </button>
230:           </div>
231: 
232:           {/* Reset button */}
233:           <button
234:             type="button"
235:             onClick={handleResetDefaults}
236:             className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-amber-400 rounded transition-colors cursor-pointer"
237:             title="Restablecer premios de muestra"
238:           >
239:             <RotateCcw className="h-3.5 w-3.5" />
240:             <span className="hidden sm:inline">Defecto</span>
241:           </button>
242:         </div>
243:       </div>
244: 
245:       {/* Column selector */}
246:       <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-900/50 rounded-lg border border-slate-800 text-xs shadow-inner">
247:         <div className="flex items-center gap-1.5 text-slate-300">
248:           <span className="text-[11px] text-slate-400">Columnas:</span>
249:           <div className="flex rounded bg-slate-800 p-0.5 border border-slate-700/60">
250:             {[
251:               { id: "auto", label: "Auto" },
252:               { id: 2, label: "2 col" },
253:               { id: 3, label: "3 col" },
254:               { id: 4, label: "4 col" },
255:             ].map((colOpt) => {
256:               const active = (ticketConfig.prizeColumns ?? "auto") === colOpt.id;
257:               return (
258:                 <button
259:                   key={String(colOpt.id)}
260:                   type="button"
261:                   onClick={() => setTicketConfig({ prizeColumns: colOpt.id as 2 | 3 | 4 | "auto" })}
262:                   className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors cursor-pointer ${
263:                     active
264:                       ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold"
265:                       : "text-slate-400 hover:text-slate-200"
266:                   }`}
267:                 >
268:                   {colOpt.label}
269:                 </button>
270:               );
271:             })}
272:           </div>
273:         </div>
274: 
275:         <span className="text-[10px] text-emerald-400/90 font-mono flex items-center gap-1">
276:           ✓ Sin límite de premios
277:         </span>
278:       </div>
279: 
280:       {mode === "list" ? (
281:         <div className="space-y-2">
282:           {/* Scrollable list of items */}
283:           <div className="max-h-72 overflow-y-auto rounded-lg border border-slate-700/80 bg-slate-900/60 p-2.5 space-y-1.5 focus-within:border-amber-500/50 transition-colors shadow-inner">
284:             {prizes.map((prize, index) => (
285:               <div
286:                 key={index}
287:                 className="group flex items-center gap-2 rounded-md bg-slate-800/40 p-1 pl-1.5 border border-slate-800 hover:border-slate-700/80 transition-all"
288:               >
289:                 {/* Number Badge */}
290:                 <span className="flex items-center justify-center min-w-[32px] h-7 text-xs font-bold font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded select-none">
291:                   {prize.label}
292:                 </span>
293: 
294:                 {/* Description Input */}
295:                 <input
296:                   ref={(el) => {
297:                     inputRefs.current[index] = el;
298:                   }}
299:                   type="text"
300:                   value={prize.description}
301:                   placeholder={`Descripción del premio ${prize.label}...`}
302:                   onChange={(e) => handleDescriptionChange(index, e.target.value)}
303:                   onKeyDown={(e) => handleKeyDown(e, index)}
304:                   onPaste={(e) => handlePaste(e, index)}
305:                   className="flex-1 bg-transparent px-2 py-1 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 rounded transition-all"
306:                 />
307: 
308:                 {/* Delete Button */}
309:                 <button
310:                   type="button"
311:                   onClick={() => handleRemovePrize(index)}
312:                   className="opacity-40 group-hover:opacity-100 hover:text-red-400 p-1 text-slate-400 rounded transition-all cursor-pointer"
313:                   title="Eliminar premio"
314:                 >
315:                   <Trash2 className="h-3.5 w-3.5" />
316:                 </button>
317:               </div>
318:             ))}
319:           </div>
320: 
321:           {/* Action buttons below the list */}
322:           <div className="flex items-center justify-between pt-1">
323:             <Button
324:               type="button"
325:               variant="outline"
326:               size="sm"
327:               onClick={handleAddPrize}
328:               className="h-7 text-xs border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 hover:border-amber-500/50"
329:             >
330:               <Plus className="h-3.5 w-3.5 mr-1" />
331:               Agregar premio ({prizes.length + 1}°)
332:             </Button>
333: 
334:             {prizes.length > 1 && (
335:               <button
336:                 type="button"
337:                 onClick={handleClearAll}
338:                 className="text-[11px] text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
339:               >
340:                 Limpiar todo
341:               </button>
342:             )}
343:           </div>
344: 
345:           {/* Helper hint */}
346:           <div className="flex items-start gap-1.5 text-[11px] text-slate-400 leading-tight">
347:             <Info className="h-3.5 w-3.5 text-amber-400/80 shrink-0 mt-0.5" />
348:             <span>
349:               Presiona <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-amber-300 font-mono">Enter</kbd> en cualquier premio para sumar automáticamente el siguiente (sumando 1). También puedes pegar una lista de varias líneas.
350:             </span>
351:           </div>
352:         </div>
353:       ) : (
354:         <div className="space-y-2">
355:           {/* Textarea mode with line numbers preview */}
356:           <div className="rounded-lg border border-slate-700/80 bg-slate-900/60 p-2.5 focus-within:border-amber-500/50 transition-colors shadow-inner">
357:             <div className="flex gap-2">
358:               {/* Number gutter */}
359:               <div className="select-none py-1.5 text-right font-mono text-xs text-amber-400/60 leading-5 space-y-0 min-w-[28px]">
360:                 {prizes.map((_, i) => (
361:                   <div key={i}>{i + 1}°</div>
362:                 ))}
363:               </div>
364: 
365:               {/* Textarea */}
366:               <textarea
367:                 value={rawTextValue}
368:                 onChange={handleRawTextChange}
369:                 placeholder="Escribe un premio por línea... Cada Enter sumará un número."
370:                 rows={Math.min(Math.max(prizes.length, 5), 14)}
371:                 className="w-full resize-y bg-transparent py-1.5 text-xs text-slate-200 leading-5 focus:outline-none placeholder:text-slate-500 font-sans"
372:               />
373:             </div>
374:           </div>
375: 
376:           <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
377:             <Info className="h-3.5 w-3.5 text-amber-400/80 shrink-0" />
378:             Cada salto de línea (<kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-amber-300 font-mono">Enter</kbd>) suma un premio numerado automáticamente.
379:           </p>
380:         </div>
381:       )}
382:     </div>
383:   );
384: }
````

## File: src/components/SavedTicketsDrawer.tsx
````typescript
  1: "use client";
  2: 
  3: import { useState, useEffect } from "react";
  4: import {
  5:   X,
  6:   FolderOpen,
  7:   Trash2,
  8:   Copy,
  9:   Calendar,
 10:   Ticket,
 11:   Trophy,
 12:   ArrowRight,
 13:   RefreshCw,
 14:   Search,
 15:   Sparkles,
 16:   Lock,
 17:   LogIn
 18: } from "lucide-react";
 19: import { Button } from "@/components/ui/button";
 20: import { SavedTicket, getSavedTickets, deleteSavedTicket, duplicateSavedTicket } from "@/services/tickets-service";
 21: import { useRifaStore } from "@/store/useRifaStore";
 22: import { useAuth } from "@/hooks/useAuth";
 23: import { formatCurrency } from "@/lib/utils";
 24: 
 25: interface SavedTicketsDrawerProps {
 26:   isOpen: boolean;
 27:   onClose: () => void;
 28:   onSelectTicket?: (ticket: SavedTicket) => void;
 29:   onOpenAuth?: () => void;
 30: }
 31: 
 32: export function SavedTicketsDrawer({ isOpen, onClose, onSelectTicket, onOpenAuth }: SavedTicketsDrawerProps) {
 33:   const { user } = useAuth();
 34:   const [tickets, setTickets] = useState<SavedTicket[]>([]);
 35:   const [loading, setLoading] = useState(true);
 36:   const [search, setSearch] = useState("");
 37:   const [activeDeleteId, setActiveDeleteId] = useState<string | null>(null);
 38: 
 39:   const { setTicketConfig, setPrintConfig } = useRifaStore();
 40: 
 41:   const fetchTickets = async () => {
 42:     if (!user) {
 43:       setTickets([]);
 44:       setLoading(false);
 45:       return;
 46:     }
 47:     setLoading(true);
 48:     try {
 49:       const data = await getSavedTickets();
 50:       setTickets(data);
 51:     } finally {
 52:       setLoading(false);
 53:     }
 54:   };
 55: 
 56:   useEffect(() => {
 57:     if (isOpen) {
 58:       fetchTickets();
 59:     }
 60:   }, [isOpen, user]);
 61: 
 62: 
 63:   if (!isOpen) return null;
 64: 
 65:   const handleLoad = (ticket: SavedTicket) => {
 66:     setTicketConfig(ticket.ticket_config);
 67:     setPrintConfig(ticket.print_config);
 68:     onSelectTicket?.(ticket);
 69:     onClose();
 70:   };
 71: 
 72:   const handleDelete = async (id: string, e: React.MouseEvent) => {
 73:     e.stopPropagation();
 74:     setActiveDeleteId(id);
 75:     try {
 76:       await deleteSavedTicket(id);
 77:       setTickets((prev) => prev.filter((t) => t.id !== id));
 78:     } finally {
 79:       setActiveDeleteId(null);
 80:     }
 81:   };
 82: 
 83:   const handleDuplicate = async (ticket: SavedTicket, e: React.MouseEvent) => {
 84:     e.stopPropagation();
 85:     const duplicated = await duplicateSavedTicket(ticket);
 86:     setTickets((prev) => [duplicated, ...prev]);
 87:   };
 88: 
 89:   const filtered = tickets.filter((t) =>
 90:     t.title.toLowerCase().includes(search.toLowerCase()) ||
 91:     t.ticket_config.eventName.toLowerCase().includes(search.toLowerCase())
 92:   );
 93: 
 94:   return (
 95:     <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
 96:       <div className="relative w-full max-w-md h-full bg-slate-900 border-l border-slate-700/80 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
 97:         {/* Cabecera */}
 98:         <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90">
 99:           <div className="flex items-center gap-2.5">
100:             <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
101:               <FolderOpen className="h-4 w-4" />
102:             </div>
103:             <div>
104:               <h3 className="text-sm font-bold text-slate-100">Mis Rifas Guardadas</h3>
105:               <p className="text-[10px] text-slate-400">
106:                 {tickets.length} {tickets.length === 1 ? "diseño disponible" : "diseños disponibles"}
107:               </p>
108:             </div>
109:           </div>
110: 
111:           <div className="flex items-center gap-1">
112:             <button
113:               onClick={fetchTickets}
114:               title="Recargar"
115:               className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
116:             >
117:               <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-amber-400" : ""}`} />
118:             </button>
119:             <button
120:               onClick={onClose}
121:               className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
122:             >
123:               <X className="h-5 w-5" />
124:             </button>
125:           </div>
126:         </div>
127: 
128:         {/* Buscador */}
129:         <div className="p-3 border-b border-slate-800/80 bg-slate-900/50">
130:           <div className="relative">
131:             <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
132:             <input
133:               type="text"
134:               value={search}
135:               onChange={(e) => setSearch(e.target.value)}
136:               placeholder="Buscar rifa por nombre..."
137:               className="w-full pl-8 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
138:             />
139:           </div>
140:         </div>
141: 
142:         {/* Lista de diseños */}
143:         <div className="flex-1 overflow-y-auto p-4 space-y-3">
144:           {!user ? (
145:             <div className="flex flex-col items-center justify-center h-80 text-center p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
146:               <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-lg shadow-amber-500/5">
147:                 <Lock className="h-7 w-7" />
148:               </div>
149:               <h4 className="text-base font-bold text-slate-100 mb-1">
150:                 Tus rifas son privadas
151:               </h4>
152:               <p className="text-xs text-slate-400 max-w-[280px] mb-5 leading-relaxed">
153:                 Cada usuario tiene su propio historial y diseños guardados. Inicia sesión o regístrate para acceder a tus rifas.
154:               </p>
155:               {onOpenAuth && (
156:                 <Button
157:                   onClick={() => {
158:                     onClose();
159:                     onOpenAuth();
160:                   }}
161:                   className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 gap-2"
162:                 >
163:                   <LogIn className="h-4 w-4" />
164:                   <span>Iniciar Sesión / Registrarse</span>
165:                 </Button>
166:               )}
167:             </div>
168:           ) : loading ? (
169:             <div className="flex flex-col items-center justify-center h-48 text-slate-500 space-y-2">
170:               <RefreshCw className="h-6 w-6 animate-spin text-amber-400" />
171:               <p className="text-xs">Cargando tus rifas...</p>
172:             </div>
173:           ) : filtered.length === 0 ? (
174:             <div className="flex flex-col items-center justify-center h-64 text-center p-6 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40">
175:               <Sparkles className="h-8 w-8 text-slate-600 mb-2" />
176:               <p className="text-sm font-semibold text-slate-300">No hay rifas guardadas</p>
177:               <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
178:                 {search ? "No se encontraron rifas con ese término." : "Crea tu diseño y haz clic en 'Guardar' para almacenarlo en tu cuenta."}
179:               </p>
180:             </div>
181:           ) : (
182: 
183:             filtered.map((ticket) => (
184:               <div
185:                 key={ticket.id}
186:                 onClick={() => handleLoad(ticket)}
187:                 className="group relative rounded-xl border border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-amber-500/50 p-3.5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-amber-500/5"
188:               >
189:                 <div className="flex items-start justify-between gap-2">
190:                   <div className="flex-1 min-w-0">
191:                     <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 truncate transition-colors">
192:                       {ticket.title}
193:                     </h4>
194:                     <p className="text-[11px] text-slate-400 truncate mt-0.5">
195:                       {ticket.ticket_config.subtitle || ticket.ticket_config.eventName}
196:                     </p>
197:                   </div>
198: 
199:                   {/* Acciones */}
200:                   <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
201:                     <button
202:                       onClick={(e) => handleDuplicate(ticket, e)}
203:                       title="Duplicar"
204:                       className="text-slate-400 hover:text-amber-400 p-1 rounded hover:bg-slate-700/60"
205:                     >
206:                       <Copy className="h-3.5 w-3.5" />
207:                     </button>
208:                     <button
209:                       onClick={(e) => handleDelete(ticket.id, e)}
210:                       title="Eliminar"
211:                       disabled={activeDeleteId === ticket.id}
212:                       className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-slate-700/60"
213:                     >
214:                       <Trash2 className="h-3.5 w-3.5" />
215:                     </button>
216:                   </div>
217:                 </div>
218: 
219:                 {/* Metadata pills */}
220:                 <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-700/40 text-[10px] text-slate-400">
221:                   <div className="flex items-center gap-1 truncate">
222:                     <Ticket className="h-3 w-3 text-amber-400 shrink-0" />
223:                     <span>{ticket.ticket_config.totalTickets} tks</span>
224:                   </div>
225:                   <div className="flex items-center gap-1 truncate">
226:                     <Trophy className="h-3 w-3 text-amber-400 shrink-0" />
227:                     <span>{ticket.ticket_config.prizes?.length || 0} premios</span>
228:                   </div>
229:                   <div className="flex items-center gap-1 truncate font-mono text-amber-300 font-semibold">
230:                     <span>{formatCurrency(ticket.ticket_config.price || 0)}</span>
231:                   </div>
232:                 </div>
233: 
234:                 {/* Botón Cargar */}
235:                 <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 group-hover:text-amber-400 transition-colors">
236:                   <span className="flex items-center gap-1">
237:                     <Calendar className="h-2.5 w-2.5" />
238:                     {new Date(ticket.updated_at).toLocaleDateString()}
239:                   </span>
240:                   <span className="flex items-center gap-0.5 font-medium">
241:                     Cargar diseño <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
242:                   </span>
243:                 </div>
244:               </div>
245:             ))
246:           )}
247:         </div>
248: 
249:         {/* Footer */}
250:         <div className="p-3 border-t border-slate-800 bg-slate-900/90 text-center">
251:           <p className="text-[10px] text-slate-500">
252:             Los cambios se sincronizan en la nube y quedan disponibles en tu cuenta.
253:           </p>
254:         </div>
255:       </div>
256:     </div>
257:   );
258: }
````

## File: src/services/tickets-service.ts
````typescript
  1: import { getSupabase } from "@/lib/supabase";
  2: import { TicketConfig, PrintConfig } from "@/types";
  3: 
  4: export interface SavedTicket {
  5:   id: string;
  6:   user_id?: string;
  7:   title: string;
  8:   ticket_config: TicketConfig;
  9:   print_config: PrintConfig;
 10:   created_at: string;
 11:   updated_at: string;
 12: }
 13: 
 14: // Obtener el ID del usuario actualmente autenticado (Supabase o Demo)
 15: async function getCurrentUserId(): Promise<string | null> {
 16:   const supabase = getSupabase();
 17:   if (supabase) {
 18:     try {
 19:       const { data: { user } } = await supabase.auth.getUser();
 20:       if (user?.id) return user.id;
 21:     } catch (e) {
 22:       console.warn("Error al verificar usuario en Supabase:", e);
 23:     }
 24:   }
 25: 
 26:   // Fallback solo para usuario demo explícitamente logueado
 27:   if (typeof window !== "undefined") {
 28:     try {
 29:       const demo = localStorage.getItem("eventazo_demo_user");
 30:       if (demo) {
 31:         const parsed = JSON.parse(demo);
 32:         return parsed.id || null;
 33:       }
 34:     } catch {
 35:       return null;
 36:     }
 37:   }
 38: 
 39:   return null;
 40: }
 41: 
 42: // Almacenamiento local aislado estrictamente por ID de usuario (solo para modo demo offline)
 43: function getUserScopedLocalKey(userId: string): string {
 44:   return `eventazo_saved_tickets_${userId}`;
 45: }
 46: 
 47: function getLocalUserTickets(userId: string): SavedTicket[] {
 48:   if (typeof window === "undefined") return [];
 49:   try {
 50:     const raw = localStorage.getItem(getUserScopedLocalKey(userId));
 51:     return raw ? JSON.parse(raw) : [];
 52:   } catch {
 53:     return [];
 54:   }
 55: }
 56: 
 57: function saveLocalUserTickets(userId: string, tickets: SavedTicket[]) {
 58:   if (typeof window === "undefined") return;
 59:   try {
 60:     localStorage.setItem(getUserScopedLocalKey(userId), JSON.stringify(tickets));
 61:   } catch (e) {
 62:     console.error("Error al persistir rifas locales:", e);
 63:   }
 64: }
 65: 
 66: /**
 67:  * Obtener las rifas guardadas del usuario autenticado.
 68:  * Si NO hay sesión activa, retorna siempre [] (las rifas son privadas y por usuario).
 69:  */
 70: export async function getSavedTickets(): Promise<SavedTicket[]> {
 71:   const supabase = getSupabase();
 72:   const userId = await getCurrentUserId();
 73: 
 74:   // Si no está autenticado, no hay rifas para mostrar (aislamiento por usuario)
 75:   if (!userId) {
 76:     return [];
 77:   }
 78: 
 79:   if (supabase && !userId.startsWith("demo-")) {
 80:     try {
 81:       const { data, error } = await supabase
 82:         .from("saved_tickets")
 83:         .select("*")
 84:         .eq("user_id", userId)
 85:         .order("updated_at", { ascending: false });
 86: 
 87:       if (!error && data) {
 88:         return data as SavedTicket[];
 89:       }
 90:       if (error) {
 91:         console.error("Error al consultar rifas de Supabase:", error.message);
 92:       }
 93:     } catch (e) {
 94:       console.warn("Excepción al consultar Supabase:", e);
 95:     }
 96:   }
 97: 
 98:   // Fallback aislado estrictamente a este usuario específico
 99:   return getLocalUserTickets(userId);
100: }
101: 
102: /**
103:  * Guardar o actualizar una rifa en la cuenta del usuario autenticado.
104:  * Requiere estrictamente que el usuario esté logueado.
105:  */
106: export async function saveTicketDesign(
107:   title: string,
108:   ticketConfig: TicketConfig,
109:   printConfig: PrintConfig,
110:   existingId?: string
111: ): Promise<SavedTicket> {
112:   const supabase = getSupabase();
113:   const userId = await getCurrentUserId();
114: 
115:   if (!userId) {
116:     throw new Error("Debes iniciar sesión para guardar tus rifas en tu cuenta.");
117:   }
118: 
119:   const now = new Date().toISOString();
120: 
121:   if (supabase && !userId.startsWith("demo-")) {
122:     try {
123:       if (existingId) {
124:         const { data, error } = await supabase
125:           .from("saved_tickets")
126:           .update({
127:             title,
128:             ticket_config: ticketConfig,
129:             print_config: printConfig,
130:             updated_at: now,
131:           })
132:           .eq("id", existingId)
133:           .eq("user_id", userId)
134:           .select()
135:           .single();
136: 
137:         if (error) throw error;
138:         if (data) return data as SavedTicket;
139:       } else {
140:         const { data, error } = await supabase
141:           .from("saved_tickets")
142:           .insert({
143:             user_id: userId,
144:             title,
145:             ticket_config: ticketConfig,
146:             print_config: printConfig,
147:             created_at: now,
148:             updated_at: now,
149:           })
150:           .select()
151:           .single();
152: 
153:         if (error) throw error;
154:         if (data) return data as SavedTicket;
155:       }
156:     } catch (e) {
157:       console.error("Error guardando en Supabase:", e);
158:       throw e;
159:     }
160:   }
161: 
162:   // Fallback demo aislado
163:   const current = getLocalUserTickets(userId);
164:   if (existingId) {
165:     const idx = current.findIndex((t) => t.id === existingId);
166:     if (idx !== -1) {
167:       const updated: SavedTicket = {
168:         ...current[idx],
169:         title,
170:         ticket_config: ticketConfig,
171:         print_config: printConfig,
172:         updated_at: now,
173:       };
174:       current[idx] = updated;
175:       saveLocalUserTickets(userId, current);
176:       return updated;
177:     }
178:   }
179: 
180:   const newTicket: SavedTicket = {
181:     id: `ticket-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
182:     user_id: userId,
183:     title,
184:     ticket_config: ticketConfig,
185:     print_config: printConfig,
186:     created_at: now,
187:     updated_at: now,
188:   };
189:   current.unshift(newTicket);
190:   saveLocalUserTickets(userId, current);
191:   return newTicket;
192: }
193: 
194: /**
195:  * Eliminar una rifa guardada perteneciente al usuario autenticado.
196:  */
197: export async function deleteSavedTicket(id: string): Promise<boolean> {
198:   const supabase = getSupabase();
199:   const userId = await getCurrentUserId();
200: 
201:   if (!userId) return false;
202: 
203:   if (supabase && !userId.startsWith("demo-")) {
204:     try {
205:       const { error } = await supabase
206:         .from("saved_tickets")
207:         .delete()
208:         .eq("id", id)
209:         .eq("user_id", userId);
210: 
211:       if (!error) return true;
212:     } catch (e) {
213:       console.error("Error eliminando en Supabase:", e);
214:     }
215:   }
216: 
217:   const current = getLocalUserTickets(userId).filter((t) => t.id !== id);
218:   saveLocalUserTickets(userId, current);
219:   return true;
220: }
221: 
222: /**
223:  * Duplicar una rifa guardada del usuario autenticado.
224:  */
225: export async function duplicateSavedTicket(ticket: SavedTicket): Promise<SavedTicket> {
226:   const newTitle = `${ticket.title} (Copia)`;
227:   return saveTicketDesign(newTitle, ticket.ticket_config, ticket.print_config);
228: }
````

## File: src/store/useRifaStore.ts
````typescript
 1: import { create } from "zustand";
 2: import { TicketConfig, PrintConfig, GenerationProgress, TemplateImage } from "@/types";
 3: import { DEFAULT_TICKET_CONFIG, DEFAULT_PRINT_CONFIG, EMPTY_TICKET_CONFIG } from "@/lib/constants";
 4: 
 5: interface RifaState {
 6:   // Config
 7:   ticketConfig: TicketConfig;
 8:   printConfig: PrintConfig;
 9:   templateImage: TemplateImage | null;
10: 
11:   // Generation
12:   progress: GenerationProgress;
13:   generatedPdfUrl: string | null;
14:   isGenerating: boolean;
15: 
16:   // UI
17:   darkMode: boolean;
18:   previewTicketNumber: number;
19:   activeTab: "config" | "preview" | "generate";
20: 
21:   // Actions
22:   setTicketConfig: (config: Partial<TicketConfig>) => void;
23:   setPrintConfig: (config: Partial<PrintConfig>) => void;
24:   setTemplateImage: (image: TemplateImage | null) => void;
25:   setProgress: (progress: Partial<GenerationProgress>) => void;
26:   setGeneratedPdfUrl: (url: string | null) => void;
27:   setIsGenerating: (generating: boolean) => void;
28:   setDarkMode: (dark: boolean) => void;
29:   setPreviewTicketNumber: (num: number) => void;
30:   setActiveTab: (tab: "config" | "preview" | "generate") => void;
31:   resetConfig: () => void;
32:   clearConfig: () => void;
33: }
34: 
35: export const useRifaStore = create<RifaState>((set) => ({
36:   ticketConfig: DEFAULT_TICKET_CONFIG,
37:   printConfig: DEFAULT_PRINT_CONFIG,
38:   templateImage: null,
39: 
40:   progress: {
41:     current: 0,
42:     total: 0,
43:     percentage: 0,
44:     status: "idle",
45:     message: "",
46:   },
47:   generatedPdfUrl: null,
48:   isGenerating: false,
49: 
50:   darkMode: true,
51:   previewTicketNumber: 1,
52:   activeTab: "config",
53: 
54:   setTicketConfig: (config) =>
55:     set((state) => ({
56:       ticketConfig: { ...state.ticketConfig, ...config },
57:     })),
58: 
59:   setPrintConfig: (config) =>
60:     set((state) => ({
61:       printConfig: { ...state.printConfig, ...config },
62:     })),
63: 
64:   setTemplateImage: (image) => set({ templateImage: image }),
65: 
66:   setProgress: (progress) =>
67:     set((state) => ({
68:       progress: { ...state.progress, ...progress },
69:     })),
70: 
71:   setGeneratedPdfUrl: (url) => set({ generatedPdfUrl: url }),
72:   setIsGenerating: (generating) => set({ isGenerating: generating }),
73:   setDarkMode: (dark) => set({ darkMode: dark }),
74:   setPreviewTicketNumber: (num) => set({ previewTicketNumber: num }),
75:   setActiveTab: (tab) => set({ activeTab: tab }),
76: 
77:   resetConfig: () =>
78:     set({
79:       ticketConfig: DEFAULT_TICKET_CONFIG,
80:       printConfig: DEFAULT_PRINT_CONFIG,
81:       templateImage: null,
82:       progress: {
83:         current: 0,
84:         total: 0,
85:         percentage: 0,
86:         status: "idle",
87:         message: "",
88:       },
89:       generatedPdfUrl: null,
90:     }),
91: 
92:   clearConfig: () =>
93:     set({
94:       ticketConfig: EMPTY_TICKET_CONFIG,
95:       templateImage: null,
96:       generatedPdfUrl: null,
97:     }),
98: }));
````

## File: package.json
````json
 1: {
 2:   "name": "eventazo",
 3:   "version": "0.1.0",
 4:   "private": true,
 5:   "scripts": {
 6:     "dev": "next dev",
 7:     "build": "next build",
 8:     "start": "next start",
 9:     "lint": "eslint",
10:     "repomix": "repomix",
11:     "analyze": "repomix"
12:   },
13:   "dependencies": {
14:     "@supabase/supabase-js": "^2.116.0",
15:     "class-variance-authority": "^0.7.1",
16:     "clsx": "^2.1.1",
17:     "lucide-react": "^1.16.0",
18:     "next": "16.2.6",
19:     "pdf-lib": "^1.17.1",
20:     "react": "19.2.4",
21:     "react-dom": "19.2.4",
22:     "tailwind-merge": "^3.6.0",
23:     "zustand": "^5.0.13"
24:   },
25:   "devDependencies": {
26:     "@tailwindcss/postcss": "^4",
27:     "@types/node": "^20",
28:     "@types/react": "^19",
29:     "@types/react-dom": "^19",
30:     "eslint": "^9",
31:     "eslint-config-next": "16.2.6",
32:     "repomix": "^1.18.0",
33:     "tailwindcss": "^4",
34:     "typescript": "^5"
35:   }
36: }
````

## File: src/app/globals.css
````css
  1: @import "tailwindcss";
  2: 
  3: :root {
  4:   --background: #0f172a;
  5:   --foreground: #e2e8f0;
  6: }
  7: 
  8: * {
  9:   box-sizing: border-box;
 10: }
 11: 
 12: body {
 13:   background: var(--background);
 14:   color: var(--foreground);
 15:   font-family: "Inter", system-ui, -apple-system, sans-serif;
 16:   -webkit-font-smoothing: antialiased;
 17:   -moz-osx-font-smoothing: grayscale;
 18: }
 19: 
 20: /* Custom scrollbar */
 21: ::-webkit-scrollbar {
 22:   width: 6px;
 23:   height: 6px;
 24: }
 25: 
 26: ::-webkit-scrollbar-track {
 27:   background: #1e293b;
 28:   border-radius: 3px;
 29: }
 30: 
 31: ::-webkit-scrollbar-thumb {
 32:   background: #475569;
 33:   border-radius: 3px;
 34: }
 35: 
 36: ::-webkit-scrollbar-thumb:hover {
 37:   background: #64748b;
 38: }
 39: 
 40: /* Print styles */
 41: @media print {
 42:   body {
 43:     background: white;
 44:     color: black;
 45:   }
 46: 
 47:   .no-print {
 48:     display: none !important;
 49:   }
 50: }
 51: 
 52: /* Transiciones específicas solo en elementos interactivos para máxima fluidez en PCs lentas */
 53: button, a, input, select, textarea, [role="switch"], [role="checkbox"] {
 54:   transition: color 120ms ease, background-color 120ms ease, border-color 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
 55: }
 56: 
 57: /* Ocultar spinners nativos de input type=number en todos los navegadores */
 58: input[type="number"]::-webkit-outer-spin-button,
 59: input[type="number"]::-webkit-inner-spin-button {
 60:   -webkit-appearance: none;
 61:   margin: 0;
 62: }
 63: input[type="number"] {
 64:   -moz-appearance: textfield;
 65:   appearance: textfield;
 66: }
 67: 
 68: /* Custom range slider styling */
 69: input[type="range"] {
 70:   -webkit-appearance: none;
 71:   appearance: none;
 72:   background: transparent;
 73:   cursor: pointer;
 74: }
 75: input[type="range"]::-webkit-slider-runnable-track {
 76:   background: #334155;
 77:   height: 6px;
 78:   border-radius: 9999px;
 79: }
 80: input[type="range"]::-webkit-slider-thumb {
 81:   -webkit-appearance: none;
 82:   height: 18px;
 83:   width: 18px;
 84:   background: #f59e0b;
 85:   border-radius: 50%;
 86:   border: 2px solid #0f172a;
 87:   box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
 88:   margin-top: -6px;
 89:   transition: transform 100ms ease, background-color 100ms ease;
 90: }
 91: input[type="range"]::-webkit-slider-thumb:hover {
 92:   transform: scale(1.15);
 93:   background: #fbbf24;
 94: }
 95: input[type="range"]::-moz-range-track {
 96:   background: #334155;
 97:   height: 6px;
 98:   border-radius: 9999px;
 99: }
100: input[type="range"]::-moz-range-thumb {
101:   height: 18px;
102:   width: 18px;
103:   background: #f59e0b;
104:   border-radius: 50%;
105:   border: 2px solid #0f172a;
106:   box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
107:   transition: transform 100ms ease;
108: }
109: 
110: /* Animaciones de entrada */
111: @keyframes fadeIn {
112:   from { opacity: 0; }
113:   to { opacity: 1; }
114: }
115: 
116: @keyframes slideInFromTop {
117:   from { opacity: 0; transform: translateY(-8px); }
118:   to { opacity: 1; transform: translateY(0); }
119: }
120: 
121: @keyframes slideInFromBottom {
122:   from { opacity: 0; transform: translateY(8px); }
123:   to { opacity: 1; transform: translateY(0); }
124: }
125: 
126: @keyframes zoomIn {
127:   from { opacity: 0; transform: scale(0.95); }
128:   to { opacity: 1; transform: scale(1); }
129: }
130: 
131: @keyframes pulse-glow {
132:   0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
133:   50% { box-shadow: 0 0 20px 4px rgba(245, 158, 11, 0.2); }
134: }
135: 
136: .animate-in {
137:   animation-fill-mode: both;
138: }
139: 
140: .fade-in {
141:   animation: fadeIn 0.3s ease-out;
142: }
143: 
144: .slide-in-from-top-2 {
145:   animation: slideInFromTop 0.3s ease-out;
146: }
147: 
148: .slide-in-from-bottom-3 {
149:   animation: slideInFromBottom 0.5s ease-out;
150: }
151: 
152: .zoom-in-95 {
153:   animation: zoomIn 0.5s ease-out;
154: }
155: 
156: .animate-pulse-glow {
157:   animation: pulse-glow 2s infinite;
158: }
159: 
160: /* Gradient background */
161: .bg-gradient-dark {
162:   background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
163: }
164: 
165: /* ============================================================ */
166: /* OPTIMIZACIONES MOBILE APP-LIKE                               */
167: /* ============================================================ */
168: 
169: /* Prevenir auto-zoom en iOS Safari y Android Chrome al enfocar inputs */
170: @media screen and (max-width: 768px) {
171:   input, select, textarea {
172:     font-size: 16px !important;
173:   }
174: }
175: 
176: /* Eliminar retraso de tap y destello en pantallas táctiles */
177: html {
178:   scroll-behavior: smooth;
179:   -webkit-tap-highlight-color: transparent;
180: }
181: 
182: a, button, [role="button"] {
183:   touch-action: manipulation;
184: }
````

## File: src/app/layout.tsx
````typescript
 1: import type { Metadata, Viewport } from "next";
 2: import "./globals.css";
 3: import { MobileBottomNav } from "@/components/MobileBottomNav";
 4: 
 5: export const metadata: Metadata = {
 6:   title: "Eventazo | Generador de Rifas Profesional",
 7:   description:
 8:     "Generá rifas y tickets de sorteos de forma profesional. Optimizado para impresión A4 con diseño premium.",
 9: };
10: 
11: export const viewport: Viewport = {
12:   width: "device-width",
13:   initialScale: 1,
14:   maximumScale: 1,
15:   userScalable: false,
16:   viewportFit: "cover",
17:   themeColor: "#020617",
18: };
19: 
20: export default function RootLayout({
21:   children,
22: }: Readonly<{
23:   children: React.ReactNode;
24: }>) {
25:   return (
26:     <html lang="es" className="dark">
27:       <body className="min-h-screen bg-gradient-dark antialiased pb-16 sm:pb-0">
28:         {children}
29:         <MobileBottomNav />
30:       </body>
31:     </html>
32:   );
33: }
````

## File: src/components/ui/input.tsx
````typescript
 1: import * as React from "react";
 2: import { cn } from "@/lib/utils";
 3: 
 4: const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
 5:   ({ className, type, ...props }, ref) => {
 6:     return (
 7:       <input
 8:         type={type}
 9:         className={cn(
10:           "flex h-10 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 hover:border-slate-700 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-inner transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
11:           className
12:         )}
13:         ref={ref}
14:         {...props}
15:       />
16:     );
17:   }
18: );
19: Input.displayName = "Input";
20: 
21: export { Input };
````

## File: src/components/GeneratePanel.tsx
````typescript
  1: "use client";
  2: 
  3: import { Download, Zap, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
  4: import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  5: import { Button } from "@/components/ui/button";
  6: import { Progress } from "@/components/ui/progress";
  7: import { useRifaStore } from "@/store/useRifaStore";
  8: import { usePdfGeneration } from "@/hooks/usePdfGeneration";
  9: import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";
 10: 
 11: export function GeneratePanel() {
 12:   const { progress, isGenerating, generatedPdfUrl, ticketConfig, printConfig } = useRifaStore();
 13:   const { generate, download } = usePdfGeneration();
 14: 
 15:   // Cálculo de tickets por página (misma lógica que el PDF)
 16:   const margin = printConfig.marginTop * MM_TO_PT;
 17:   const gap = printConfig.gap * MM_TO_PT;
 18:   const tW = printConfig.ticketWidth * MM_TO_PT;
 19:   const tH = printConfig.ticketHeight * MM_TO_PT;
 20:   const availW = A4_WIDTH_PT - margin * 2;
 21:   const availH = A4_HEIGHT_PT - margin * 2;
 22:   const cols = Math.max(1, Math.floor((availW + gap) / (tW + gap)));
 23:   const rows = Math.max(1, Math.floor((availH + gap) / (tH + gap)));
 24:   const gridW = cols * tW + (cols - 1) * gap;
 25:   const rightRem = A4_WIDTH_PT - margin - gridW - gap - margin;
 26:   const canFitSide = (printConfig.allowSideTickets ?? true) && (rightRem >= tH);
 27:   const sideCount = canFitSide ? Math.floor((availH + gap) / (tW + gap)) : 0;
 28:   const ticketsPerPage = cols * rows + sideCount;
 29:   const totalPages = Math.ceil(ticketConfig.totalTickets / ticketsPerPage);
 30: 
 31:   return (
 32:     <Card className="overflow-hidden">
 33:       <CardHeader>
 34:         <CardTitle className="flex items-center gap-2">
 35:           <Zap className="h-5 w-5 text-amber-400" />
 36:           Generar PDF
 37:         </CardTitle>
 38:       </CardHeader>
 39:       <CardContent className="space-y-5">
 40:         {/* Resumen */}
 41:         <div className="rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-4 space-y-2">
 42:           <h4 className="text-sm font-semibold text-slate-200">Resumen de Generación</h4>
 43:           <div className="grid grid-cols-2 gap-2 text-xs">
 44:             <div className="flex justify-between">
 45:               <span className="text-slate-400">Tickets:</span>
 46:               <span className="text-slate-200 font-mono">{ticketConfig.totalTickets}</span>
 47:             </div>
 48:             <div className="flex justify-between">
 49:               <span className="text-slate-400">Páginas:</span>
 50:               <span className="text-slate-200 font-mono">{totalPages}</span>
 51:             </div>
 52:             <div className="flex justify-between">
 53:               <span className="text-slate-400">Rango:</span>
 54:               <span className="text-slate-200 font-mono">
 55:                 {ticketConfig.startNumber} - {ticketConfig.startNumber + ticketConfig.totalTickets - 1}
 56:               </span>
 57:             </div>
 58:             <div className="flex justify-between">
 59:               <span className="text-slate-400">Por página:</span>
 60:               <span className="text-slate-200 font-mono">{ticketsPerPage}</span>
 61:             </div>
 62:           </div>
 63:         </div>
 64: 
 65:         {/* Barra de progreso con animación */}
 66:         {progress.status !== "idle" && (
 67:           <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
 68:             <div className="flex items-center justify-between text-xs">
 69:               <span className="text-slate-400 flex items-center gap-1">
 70:                 {progress.status === "generating" && (
 71:                   <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
 72:                 )}
 73:                 {progress.message}
 74:               </span>
 75:               <span className="text-amber-400 font-mono font-bold">{progress.percentage}%</span>
 76:             </div>
 77:             <Progress value={progress.percentage} />
 78:           </div>
 79:         )}
 80: 
 81:         {/* Estado completado con animación */}
 82:         {progress.status === "complete" && (
 83:           <div className="flex items-center gap-2 rounded-lg bg-emerald-900/30 border border-emerald-700/50 p-3 animate-in fade-in zoom-in-95 duration-500">
 84:             <CheckCircle2 className="h-5 w-5 text-emerald-400 animate-bounce" />
 85:             <span className="text-sm text-emerald-300 font-medium">{progress.message}</span>
 86:           </div>
 87:         )}
 88: 
 89:         {/* Estado de error */}
 90:         {progress.status === "error" && (
 91:           <div className="flex items-center gap-2 rounded-lg bg-red-900/30 border border-red-700/50 p-3 animate-in fade-in duration-300">
 92:             <AlertCircle className="h-4 w-4 text-red-400" />
 93:             <span className="text-sm text-red-300">{progress.message}</span>
 94:           </div>
 95:         )}
 96: 
 97:         {/* Botones de acción */}
 98:         <div className="flex flex-col gap-3">
 99:           <Button
100:             size="lg"
101:             onClick={generate}
102:             disabled={isGenerating}
103:             className={`w-full relative overflow-hidden transition-all duration-500 ${
104:               isGenerating
105:                 ? "animate-pulse"
106:                 : "hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
107:             }`}
108:           >
109:             {isGenerating ? (
110:               <>
111:                 <Loader2 className="h-5 w-5 animate-spin" />
112:                 <span className="animate-pulse">Generando...</span>
113:               </>
114:             ) : (
115:               <>
116:                 <FileText className="h-5 w-5" />
117:                 Generar {ticketConfig.totalTickets} Tickets
118:               </>
119:             )}
120:           </Button>
121: 
122:           {generatedPdfUrl && (
123:             <Button
124:               size="lg"
125:               variant="secondary"
126:               onClick={download}
127:               className="w-full animate-in fade-in slide-in-from-bottom-3 duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-500/20 active:scale-[0.98] transition-all"
128:             >
129:               <Download className="h-5 w-5 animate-bounce" />
130:               Descargar PDF ({totalPages} páginas)
131:             </Button>
132:           )}
133: 
134:           {generatedPdfUrl && (
135:             <a
136:               href={generatedPdfUrl}
137:               target="_blank"
138:               rel="noopener noreferrer"
139:               className="text-center text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors animate-in fade-in duration-700"
140:             >
141:               Abrir PDF en nueva pestaña
142:             </a>
143:           )}
144:         </div>
145:       </CardContent>
146:     </Card>
147:   );
148: }
````

## File: src/lib/utils.ts
````typescript
  1: import { type ClassValue, clsx } from "clsx";
  2: import { twMerge } from "tailwind-merge";
  3: 
  4: export function cn(...inputs: ClassValue[]) {
  5:   return twMerge(clsx(inputs));
  6: }
  7: 
  8: export function formatTicketNumber(num: number, digits: number = 3): string {
  9:   return num.toString().padStart(digits, "0");
 10: }
 11: 
 12: export function formatCurrency(amount: number): string {
 13:   return `$${amount.toLocaleString("es-AR")}`;
 14: }
 15: 
 16: export function getDigitsNeeded(totalTickets: number, startNumber: number): number {
 17:   const maxNumber = startNumber + totalTickets - 1;
 18:   return Math.max(3, maxNumber.toString().length);
 19: }
 20: 
 21: export function generateTicketNumbers(
 22:   startNumber: number,
 23:   totalTickets: number
 24: ): number[] {
 25:   const numbers: number[] = [];
 26:   const seen = new Set<number>();
 27: 
 28:   for (let i = 0; i < totalTickets; i++) {
 29:     const num = startNumber + i;
 30:     if (seen.has(num)) {
 31:       throw new Error(`Número duplicado detectado: ${num}`);
 32:     }
 33:     seen.add(num);
 34:     numbers.push(num);
 35:   }
 36: 
 37:   return numbers;
 38: }
 39: 
 40: export function calculateOptimalLayout(
 41:   pageWidthMm: number,
 42:   pageHeightMm: number,
 43:   marginMm: number
 44: ): { ticketsPerRow: number; ticketsPerColumn: number; ticketWidth: number; ticketHeight: number } {
 45:   const availableWidth = pageWidthMm - marginMm * 2;
 46:   const availableHeight = pageHeightMm - marginMm * 2;
 47: 
 48:   // Ticket aspect ratio based on the design (roughly 180mm x 65mm)
 49:   const ticketWidth = availableWidth;
 50:   const ticketHeight = 62;
 51: 
 52:   const ticketsPerRow = 1;
 53:   const ticketsPerColumn = Math.floor(availableHeight / ticketHeight);
 54: 
 55:   return {
 56:     ticketsPerRow,
 57:     ticketsPerColumn,
 58:     ticketWidth,
 59:     ticketHeight,
 60:   };
 61: }
 62: 
 63: export function formatSpanishDate(isoDateString: string): string {
 64:   if (!isoDateString) return "";
 65:   const parts = isoDateString.split("-");
 66:   if (parts.length !== 3) return isoDateString;
 67:   const year = parseInt(parts[0], 10);
 68:   const month = parseInt(parts[1], 10) - 1;
 69:   const day = parseInt(parts[2], 10);
 70:   const date = new Date(year, month, day);
 71:   if (isNaN(date.getTime())) return isoDateString;
 72: 
 73:   const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
 74:   const months = [
 75:     "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
 76:     "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
 77:   ];
 78:   return `${days[date.getDay()]} ${day} de ${months[date.getMonth()]} de ${year}`;
 79: }
 80: 
 81: export function formatShortDate(dateString: string): string {
 82:   if (!dateString) return "";
 83:   const trimmed = dateString.trim();
 84:   if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(trimmed)) return trimmed;
 85: 
 86:   const match = trimmed.match(/(\d{1,2})\s+de\s+([a-zA-ZáéíóúÁÉÍÓÚ]+)(?:\s+de\s+(\d{4}))?/i);
 87:   if (match) {
 88:     const day = match[1].padStart(2, "0");
 89:     const monthName = match[2].toLowerCase();
 90:     const year = match[3] || new Date().getFullYear().toString();
 91:     const monthsMap: Record<string, string> = {
 92:       enero: "01", febrero: "02", marzo: "03", abril: "04", mayo: "05", junio: "06",
 93:       julio: "07", agosto: "08", septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12"
 94:     };
 95:     const mm = monthsMap[monthName] || "01";
 96:     return `${day}/${mm}/${year}`;
 97:   }
 98:   return trimmed.length > 16 ? trimmed.substring(0, 16) : trimmed;
 99: }
100: 
101: export function hexToRgb(hex: string): { r: number; g: number; b: number } {
102:   const clean = hex.replace("#", "").trim();
103:   if (clean.length === 3) {
104:     return {
105:       r: parseInt(clean[0] + clean[0], 16) / 255,
106:       g: parseInt(clean[1] + clean[1], 16) / 255,
107:       b: parseInt(clean[2] + clean[2], 16) / 255,
108:     };
109:   }
110:   return {
111:     r: (parseInt(clean.substring(0, 2), 16) || 153) / 255,
112:     g: (parseInt(clean.substring(2, 4), 16) || 27) / 255,
113:     b: (parseInt(clean.substring(4, 6), 16) || 27) / 255,
114:   };
115: }
116: 
117: export function resolvePrizeColumns(
118:   prizeColumns?: 2 | 3 | 4 | "auto",
119:   prizesCount: number = 20,
120:   fontSize: number = 8
121: ): number {
122:   if (prizeColumns && prizeColumns !== "auto") {
123:     return prizeColumns;
124:   }
125:   if (fontSize >= 11 && prizesCount > 12) {
126:     return prizesCount > 24 ? 4 : 3;
127:   }
128:   if (prizesCount > 28) return 4;
129:   if (prizesCount > 14) return 3;
130:   return 2;
131: }
````

## File: src/components/MobileBottomNav.tsx
````typescript
  1: "use client";
  2: 
  3: import { useState, useEffect } from "react";
  4: import Link from "next/link";
  5: import { usePathname } from "next/navigation";
  6: import {
  7:   Home,
  8:   Sliders,
  9:   FolderOpen,
 10:   Save,
 11:   User,
 12:   Check,
 13:   Sparkles
 14: } from "lucide-react";
 15: import { useAuth } from "@/hooks/useAuth";
 16: import { useRifaStore } from "@/store/useRifaStore";
 17: import { saveTicketDesign, getSavedTickets } from "@/services/tickets-service";
 18: 
 19: export function MobileBottomNav() {
 20:   const pathname = usePathname();
 21:   const { user, openAuthModal, openProfileModal, openDrawer } = useAuth();
 22:   const { ticketConfig, printConfig } = useRifaStore();
 23: 
 24:   const [saving, setSaving] = useState(false);
 25:   const [saveSuccess, setSaveSuccess] = useState(false);
 26:   const [savedCount, setSavedCount] = useState(0);
 27: 
 28:   const refreshCount = async () => {
 29:     try {
 30:       const list = await getSavedTickets();
 31:       setSavedCount(list.length);
 32:     } catch {}
 33:   };
 34: 
 35:   useEffect(() => {
 36:     refreshCount();
 37:   }, [user]);
 38: 
 39:   const handleSave = async () => {
 40:     if (!user) {
 41:       openAuthModal();
 42:       return;
 43:     }
 44: 
 45:     setSaving(true);
 46:     try {
 47:       await saveTicketDesign(
 48:         ticketConfig.eventName || "Mi Rifa",
 49:         ticketConfig,
 50:         printConfig
 51:       );
 52:       setSaveSuccess(true);
 53:       refreshCount();
 54:       setTimeout(() => setSaveSuccess(false), 2500);
 55:     } catch (e) {
 56:       console.error(e);
 57:     } finally {
 58:       setSaving(false);
 59:     }
 60:   };
 61: 
 62:   const handleProfileClick = () => {
 63:     if (user) {
 64:       openProfileModal();
 65:     } else {
 66:       openAuthModal();
 67:     }
 68:   };
 69: 
 70:   return (
 71:     <>
 72:       {/* Barra de navegación inferior fija estilo Native App */}
 73:       <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl">
 74:         <div className="grid grid-cols-5 items-center justify-items-center">
 75:           {/* 1. Inicio / Landing */}
 76:           <Link
 77:             href="/"
 78:             className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-colors ${
 79:               pathname === "/"
 80:                 ? "text-amber-400 font-bold"
 81:                 : "text-slate-400 hover:text-slate-200"
 82:             }`}
 83:           >
 84:             <Home className="h-5 w-5" />
 85:             <span className="text-[10px]">Inicio</span>
 86:           </Link>
 87: 
 88:           {/* 2. Editor */}
 89:           <Link
 90:             href="/editor"
 91:             className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-colors ${
 92:               pathname === "/editor"
 93:                 ? "text-amber-400 font-bold"
 94:                 : "text-slate-400 hover:text-slate-200"
 95:             }`}
 96:           >
 97:             <Sliders className="h-5 w-5" />
 98:             <span className="text-[10px]">Editor</span>
 99:           </Link>
100: 
101:           {/* 3. Acción central destacada según contexto */}
102:           {pathname === "/editor" ? (
103:             <button
104:               onClick={handleSave}
105:               disabled={saving}
106:               className="flex flex-col items-center -mt-4 group"
107:             >
108:               <div
109:                 className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
110:                   saveSuccess
111:                     ? "bg-emerald-500 text-white shadow-emerald-500/30 scale-105"
112:                     : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 group-active:scale-95"
113:                 }`}
114:               >
115:                 {saveSuccess ? (
116:                   <Check className="h-5 w-5" />
117:                 ) : (
118:                   <Save className="h-5 w-5" />
119:                 )}
120:               </div>
121:               <span className="text-[10px] font-bold text-amber-400 mt-1">
122:                 {saveSuccess ? "¡Listo!" : saving ? "..." : "Guardar"}
123:               </span>
124:             </button>
125:           ) : (
126:             <Link
127:               href="/editor"
128:               className="flex flex-col items-center -mt-4 group"
129:             >
130:               <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 group-active:scale-95 transition-transform">
131:                 <Sparkles className="h-5 w-5" />
132:               </div>
133:               <span className="text-[10px] font-bold text-amber-400 mt-1">
134:                 Crear
135:               </span>
136:             </Link>
137:           )}
138: 
139:           {/* 4. Mis Rifas */}
140:           <button
141:             onClick={() => openDrawer()}
142:             className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 relative transition-colors"
143:           >
144:             <FolderOpen className="h-5 w-5" />
145:             <span className="text-[10px]">Mis Rifas</span>
146:             {savedCount > 0 && (
147:               <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-mono font-black flex items-center justify-center shadow-sm">
148:                 {savedCount}
149:               </span>
150:             )}
151:           </button>
152: 
153:           {/* 5. Perfil / Cuenta */}
154:           <button
155:             onClick={handleProfileClick}
156:             className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
157:           >
158:             {user ? (
159:               <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-500/40">
160:                 {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
161:               </div>
162:             ) : (
163:               <User className="h-5 w-5" />
164:             )}
165:             <span className="text-[10px]">{user ? "Perfil" : "Entrar"}</span>
166:           </button>
167:         </div>
168:       </nav>
169:     </>
170:   );
171: }
````

## File: src/hooks/useAuth.ts
````typescript
  1: "use client";
  2: 
  3: import { create } from "zustand";
  4: import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
  5: 
  6: export interface AppUser {
  7:   id: string;
  8:   email: string;
  9:   name?: string;
 10:   isDemo?: boolean;
 11:   plan?: string;
 12:   isPro?: boolean;
 13: }
 14: 
 15: const DEMO_USER_KEY = "eventazo_demo_user";
 16: 
 17: // Traducir mensajes de error comunes de Supabase Auth
 18: export function translateAuthError(errorMsg: string): string {
 19:   const lower = errorMsg.toLowerCase();
 20:   if (lower.includes("email not confirmed")) {
 21:     return "Tu correo no ha sido confirmado aún en Supabase.";
 22:   }
 23:   if (lower.includes("invalid login credentials") || lower.includes("invalid_credentials")) {
 24:     return "Correo o contraseña incorrectos. Verifica tus datos.";
 25:   }
 26:   if (lower.includes("user already registered")) {
 27:     return "Ya existe una cuenta con este correo electrónico.";
 28:   }
 29:   if (lower.includes("password should be at least")) {
 30:     return "La contraseña debe tener al menos 6 caracteres.";
 31:   }
 32:   if (lower.includes("rate limit") || lower.includes("too many requests")) {
 33:     return "Demasiados intentos. Por favor espera unos minutos.";
 34:   }
 35:   return errorMsg;
 36: }
 37: 
 38: interface AuthState {
 39:   user: AppUser | null;
 40:   loading: boolean;
 41:   isConfigured: boolean;
 42:   isAuthModalOpen: boolean;
 43:   isProfileModalOpen: boolean;
 44:   isDrawerOpen: boolean;
 45: 
 46:   // Acciones de UI
 47:   openAuthModal: () => void;
 48:   closeAuthModal: () => void;
 49:   openProfileModal: () => void;
 50:   closeProfileModal: () => void;
 51:   openDrawer: () => void;
 52:   closeDrawer: () => void;
 53: 
 54:   // Acciones de autenticación
 55:   setUser: (user: AppUser | null) => void;
 56:   setLoading: (loading: boolean) => void;
 57:   initAuth: () => () => void;
 58:   signIn: (email: string, password: string) => Promise<{ error: string | null; isUnconfirmed?: boolean }>;
 59:   signUp: (email: string, password: string) => Promise<{ error: string | null; message?: string }>;
 60:   confirmEmailAndLogin: (email: string, password: string) => Promise<{ error: string | null }>;
 61:   signInDemo: () => void;
 62:   updateProfile: (newName: string, newEmail?: string) => Promise<{ error: string | null; message?: string }>;
 63:   updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
 64:   signOut: () => Promise<void>;
 65: }
 66: 
 67: export const useAuthStore = create<AuthState>((set, get) => ({
 68:   user: null,
 69:   loading: true,
 70:   isConfigured: isSupabaseConfigured(),
 71:   isAuthModalOpen: false,
 72:   isProfileModalOpen: false,
 73:   isDrawerOpen: false,
 74: 
 75:   openAuthModal: () => set({ isAuthModalOpen: true }),
 76:   closeAuthModal: () => set({ isAuthModalOpen: false }),
 77:   openProfileModal: () => set({ isProfileModalOpen: true }),
 78:   closeProfileModal: () => set({ isProfileModalOpen: false }),
 79:   openDrawer: () => set({ isDrawerOpen: true }),
 80:   closeDrawer: () => set({ isDrawerOpen: false }),
 81: 
 82:   setUser: (user) => set({ user }),
 83:   setLoading: (loading) => set({ loading }),
 84: 
 85:   initAuth: () => {
 86:     const supabase = getSupabase();
 87: 
 88:     if (supabase) {
 89:       // 1. Obtener sesión activa inicial
 90:       supabase.auth.getSession().then(async ({ data: { session } }) => {
 91:         if (session?.user) {
 92:           const base: AppUser = {
 93:             id: session.user.id,
 94:             email: session.user.email || "",
 95:             name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
 96:           };
 97: 
 98:           try {
 99:             const { data } = await supabase
100:               .from("profiles")
101:               .select("full_name, plan, is_pro")
102:               .eq("id", base.id)
103:               .single();
104: 
105:             if (data) {
106:               base.name = data.full_name || base.name;
107:               base.plan = data.plan || "free";
108:               base.isPro = data.is_pro || false;
109:             }
110:           } catch {
111:             // Ignorar fallback
112:           }
113: 
114:           set({ user: base, loading: false });
115:         } else {
116:           // Verificar si hay demo activo
117:           if (typeof window !== "undefined") {
118:             const demo = localStorage.getItem(DEMO_USER_KEY);
119:             if (demo) {
120:               try {
121:                 set({ user: JSON.parse(demo), loading: false });
122:                 return;
123:               } catch {}
124:             }
125:           }
126:           set({ user: null, loading: false });
127:         }
128:       });
129: 
130:       // 2. Escuchar cambios de autenticación
131:       const { data: { subscription } } = supabase.auth.onAuthStateChange(
132:         async (_event, session) => {
133:           if (session?.user) {
134:             const base: AppUser = {
135:               id: session.user.id,
136:               email: session.user.email || "",
137:               name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
138:             };
139: 
140:             try {
141:               const { data } = await supabase
142:                 .from("profiles")
143:                 .select("full_name, plan, is_pro")
144:                 .eq("id", base.id)
145:                 .single();
146: 
147:               if (data) {
148:                 base.name = data.full_name || base.name;
149:                 base.plan = data.plan || "free";
150:                 base.isPro = data.is_pro || false;
151:               }
152:             } catch {}
153: 
154:             set({ user: base, loading: false });
155:           } else {
156:             if (typeof window !== "undefined") {
157:               const demo = localStorage.getItem(DEMO_USER_KEY);
158:               if (demo) {
159:                 try {
160:                   set({ user: JSON.parse(demo), loading: false });
161:                   return;
162:                 } catch {}
163:               }
164:             }
165:             set({ user: null, loading: false });
166:           }
167:         }
168:       );
169: 
170:       return () => {
171:         subscription.unsubscribe();
172:       };
173:     } else {
174:       // Modo local/demo
175:       if (typeof window !== "undefined") {
176:         const demo = localStorage.getItem(DEMO_USER_KEY);
177:         if (demo) {
178:           try {
179:             set({ user: JSON.parse(demo), loading: false });
180:             return () => {};
181:           } catch {}
182:         }
183:       }
184:       set({ user: null, loading: false });
185:       return () => {};
186:     }
187:   },
188: 
189:   signIn: async (email, password) => {
190:     const supabase = getSupabase();
191:     const cleanEmail = email.trim().toLowerCase();
192: 
193:     if (!supabase) {
194:       const demoUser: AppUser = {
195:         id: "demo-user-123",
196:         email: cleanEmail,
197:         name: cleanEmail.split("@")[0],
198:         isDemo: true,
199:       };
200:       if (typeof window !== "undefined") {
201:         localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
202:       }
203:       set({ user: demoUser });
204:       return { error: null };
205:     }
206: 
207:     try {
208:       const { data, error } = await supabase.auth.signInWithPassword({
209:         email: cleanEmail,
210:         password,
211:       });
212: 
213:       if (error) {
214:         if (error.message.toLowerCase().includes("email not confirmed")) {
215:           // Intentar auto-confirmar si la función confirm_user está disponible en Supabase
216:           try {
217:             const { data: rpcRes, error: rpcErr } = await supabase.rpc("confirm_user", {
218:               email_to_confirm: cleanEmail,
219:             });
220:             if (!rpcErr && rpcRes) {
221:               // Reintentar login inmediatamente
222:               const retry = await supabase.auth.signInWithPassword({
223:                 email: cleanEmail,
224:                 password,
225:               });
226:               if (!retry.error && retry.data.user) {
227:                 const u: AppUser = {
228:                   id: retry.data.user.id,
229:                   email: retry.data.user.email || cleanEmail,
230:                   name: retry.data.user.user_metadata?.full_name || cleanEmail.split("@")[0],
231:                 };
232:                 set({ user: u });
233:                 return { error: null };
234:               }
235:             }
236:           } catch {}
237: 
238:           return {
239:             error: translateAuthError(error.message),
240:             isUnconfirmed: true,
241:           };
242:         }
243:         return { error: translateAuthError(error.message) };
244:       }
245: 
246:       if (data.user) {
247:         const u: AppUser = {
248:           id: data.user.id,
249:           email: data.user.email || cleanEmail,
250:           name: data.user.user_metadata?.full_name || cleanEmail.split("@")[0],
251:         };
252:         set({ user: u });
253:       }
254: 
255:       return { error: null };
256:     } catch (e) {
257:       return { error: e instanceof Error ? e.message : "Error al iniciar sesión" };
258:     }
259:   },
260: 
261:   confirmEmailAndLogin: async (email, password) => {
262:     const supabase = getSupabase();
263:     if (!supabase) return { error: null };
264: 
265:     const cleanEmail = email.trim().toLowerCase();
266:     try {
267:       const { error: rpcErr } = await supabase.rpc("confirm_user", {
268:         email_to_confirm: cleanEmail,
269:       });
270: 
271:       if (rpcErr) {
272:         return { error: "Aún no se ha creado la función confirm_user en Supabase SQL Editor." };
273:       }
274: 
275:       // Reintentar login
276:       const retry = await supabase.auth.signInWithPassword({
277:         email: cleanEmail,
278:         password,
279:       });
280: 
281:       if (retry.error) {
282:         return { error: translateAuthError(retry.error.message) };
283:       }
284: 
285:       if (retry.data.user) {
286:         const u: AppUser = {
287:           id: retry.data.user.id,
288:           email: retry.data.user.email || cleanEmail,
289:           name: retry.data.user.user_metadata?.full_name || cleanEmail.split("@")[0],
290:         };
291:         set({ user: u });
292:       }
293:       return { error: null };
294:     } catch (e) {
295:       return { error: e instanceof Error ? e.message : "Error al confirmar" };
296:     }
297:   },
298: 
299:   signUp: async (email, password) => {
300:     const supabase = getSupabase();
301:     const cleanEmail = email.trim().toLowerCase();
302: 
303:     if (!supabase) {
304:       const demoUser: AppUser = {
305:         id: "demo-user-123",
306:         email: cleanEmail,
307:         name: cleanEmail.split("@")[0],
308:         isDemo: true,
309:       };
310:       if (typeof window !== "undefined") {
311:         localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
312:       }
313:       set({ user: demoUser });
314:       return { error: null, message: "Cuenta demo creada exitosamente" };
315:     }
316: 
317:     try {
318:       const { data, error } = await supabase.auth.signUp({
319:         email: cleanEmail,
320:         password,
321:       });
322: 
323:       if (error) return { error: translateAuthError(error.message) };
324: 
325:       if (data.user) {
326:         // Intentar auto-confirmar
327:         try {
328:           await supabase.rpc("confirm_user", { email_to_confirm: cleanEmail });
329:         } catch {}
330: 
331:         const u: AppUser = {
332:           id: data.user.id,
333:           email: data.user.email || cleanEmail,
334:           name: data.user.user_metadata?.full_name || cleanEmail.split("@")[0],
335:         };
336:         set({ user: u });
337:       }
338: 
339:       return { error: null, message: "¡Cuenta creada exitosamente!" };
340:     } catch (e) {
341:       return { error: e instanceof Error ? e.message : "Error al registrarse" };
342:     }
343:   },
344: 
345:   signInDemo: () => {
346:     const demoUser: AppUser = {
347:       id: "demo-pro-user",
348:       email: "demo@eventazo.pro",
349:       name: "Usuario Pro (Demo)",
350:       isDemo: true,
351:     };
352:     if (typeof window !== "undefined") {
353:       localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
354:     }
355:     set({ user: demoUser });
356:   },
357: 
358:   updateProfile: async (newName, newEmail) => {
359:     const { user } = get();
360:     const supabase = getSupabase();
361: 
362:     if (!supabase || user?.isDemo) {
363:       const updated: AppUser = {
364:         id: user?.id || "demo-user",
365:         email: newEmail || user?.email || "",
366:         name: newName,
367:         isDemo: true,
368:       };
369:       if (typeof window !== "undefined") {
370:         localStorage.setItem(DEMO_USER_KEY, JSON.stringify(updated));
371:       }
372:       set({ user: updated });
373:       return { error: null, message: "Perfil actualizado exitosamente" };
374:     }
375: 
376:     try {
377:       const updateData: { data?: { full_name: string }; email?: string } = {
378:         data: { full_name: newName },
379:       };
380:       if (newEmail && newEmail !== user?.email) {
381:         updateData.email = newEmail;
382:       }
383: 
384:       const { data, error } = await supabase.auth.updateUser(updateData);
385:       if (error) return { error: translateAuthError(error.message) };
386: 
387:       try {
388:         const targetId = user?.id || data.user.id;
389:         if (targetId) {
390:           await supabase
391:             .from("profiles")
392:             .update({
393:               full_name: newName,
394:               ...(newEmail ? { email: newEmail } : {}),
395:               updated_at: new Date().toISOString(),
396:             })
397:             .eq("id", targetId);
398:         }
399:       } catch {}
400: 
401:       if (data.user) {
402:         set({
403:           user: {
404:             ...user!,
405:             email: data.user.email || user!.email,
406:             name: data.user.user_metadata?.full_name || newName,
407:           },
408:         });
409:       }
410: 
411:       return {
412:         error: null,
413:         message: "Perfil actualizado exitosamente",
414:       };
415:     } catch (e) {
416:       return { error: e instanceof Error ? e.message : "Error al actualizar perfil" };
417:     }
418:   },
419: 
420:   updatePassword: async (newPassword) => {
421:     const { user } = get();
422:     const supabase = getSupabase();
423: 
424:     if (!supabase || user?.isDemo) {
425:       return { error: null };
426:     }
427: 
428:     try {
429:       const { error } = await supabase.auth.updateUser({ password: newPassword });
430:       if (error) return { error: translateAuthError(error.message) };
431:       return { error: null };
432:     } catch (e) {
433:       return { error: e instanceof Error ? e.message : "Error al cambiar contraseña" };
434:     }
435:   },
436: 
437:   signOut: async () => {
438:     const supabase = getSupabase();
439:     if (supabase) {
440:       try {
441:         await supabase.auth.signOut();
442:       } catch {}
443:     }
444:     if (typeof window !== "undefined") {
445:       localStorage.removeItem(DEMO_USER_KEY);
446:     }
447:     set({ user: null });
448:   },
449: }));
450: 
451: // Hook compatible que expone el store reactivo
452: export function useAuth() {
453:   const store = useAuthStore();
454:   return store;
455: }
````

## File: src/app/page.tsx
````typescript
  1: "use client";
  2: 
  3: import { useState, useMemo } from "react";
  4: import Link from "next/link";
  5: import Image from "next/image";
  6: import {
  7:   Sparkles,
  8:   ArrowRight,
  9:   Printer,
 10:   CheckCircle2,
 11:   XCircle,
 12:   Calculator,
 13:   Sliders,
 14:   FileText,
 15:   Copy,
 16:   Layers,
 17:   ShieldCheck,
 18:   Zap,
 19:   HelpCircle,
 20:   GraduationCap,
 21:   Trophy,
 22:   HeartHandshake,
 23:   Calendar,
 24:   LogIn,
 25:   Scissors
 26: } from "lucide-react";
 27: import { Button } from "@/components/ui/button";
 28: import { Header } from "@/components/Header";
 29: import { formatCurrency } from "@/lib/utils";
 30: 
 31: export default function LandingPage() {
 32:   // Estados de la Calculadora de Recaudación y Ahorro
 33:   const [calcTickets, setCalcTickets] = useState(600);
 34:   const [calcPrice, setCalcPrice] = useState(2500);
 35: 
 36:   // Cálculos matemáticos transparentes y 100% reales
 37:   const { totalRaised, standardSheets, eventazoSheets, sheetsSaved, percentSaved } = useMemo(() => {
 38:     const raised = calcTickets * calcPrice;
 39:     // En A4 horizontal estándar entran 5 tickets por hoja (1 columna de 5 filas de 130x50mm)
 40:     // Con Eventazo lateral vertical entran 5 horizontales + 2 verticales = 7 tickets por hoja
 41:     const stdSheets = Math.ceil(calcTickets / 5);
 42:     const evSheets = Math.ceil(calcTickets / 7);
 43:     const saved = Math.max(0, stdSheets - evSheets);
 44:     const percent = stdSheets > 0 ? Math.round((saved / stdSheets) * 100) : 0;
 45: 
 46:     return {
 47:       totalRaised: raised,
 48:       standardSheets: stdSheets,
 49:       eventazoSheets: evSheets,
 50:       sheetsSaved: saved,
 51:       percentSaved: percent,
 52:     };
 53:   }, [calcTickets, calcPrice]);
 54: 
 55:   return (
 56:     <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
 57:       {/* 1. NAVBAR UNIVERSAL UNIFICADA */}
 58:       <Header />
 59: 
 60: 
 61:       {/* ============================================================ */}
 62:       {/* 2. HERO SECTION CON ALTO IMPACTO                            */}
 63:       {/* ============================================================ */}
 64:       <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
 65:         {/* Luces de fondo decorativas */}
 66:         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 to-amber-300/10 blur-[130px] rounded-full pointer-events-none" />
 67: 
 68:         <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
 69:           {/* Badge de confianza */}
 70:           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-6 shadow-inner animate-in fade-in slide-in-from-bottom-2">
 71:             <Sparkles className="h-3.5 w-3.5 text-amber-400" />
 72:             <span>El generador inteligente para imprimir rifas en hojas A4</span>
 73:           </div>
 74: 
 75:           {/* Título Principal */}
 76:           <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-100">
 77:             Diseña, numera e imprime planchas de rifas{" "}
 78:             <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
 79:               sin desperdiciar papel
 80:             </span>
 81:           </h1>
 82: 
 83:           {/* Subtítulo enfocado en dolores reales */}
 84:           <p className="mt-5 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
 85:             Olvídate de pegar números manualmente en Word o Canva. Eventazo acomoda automáticamente{" "}
 86:             <strong className="text-slate-200 font-semibold">tickets horizontales y verticales</strong> en la misma hoja A4, genera talones de control desprendibles y te entrega un PDF vectorial listo para imprimir.
 87:           </p>
 88: 
 89:           {/* CTAs */}
 90:           <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
 91:             <Link href="/editor" className="w-full sm:w-auto">
 92:               <Button
 93:                 size="lg"
 94:                 className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm h-12 px-7 rounded-2xl shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 group"
 95:               >
 96:                 <span>Diseñar Mi Rifa Ahora</span>
 97:                 <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
 98:               </Button>
 99:             </Link>
100: 
101:             <a href="#calculadora" className="w-full sm:w-auto">
102:               <Button
103:                 variant="outline"
104:                 size="lg"
105:                 className="w-full sm:w-auto border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm h-12 px-6 rounded-2xl flex items-center justify-center gap-2"
106:               >
107:                 <Calculator className="h-4 w-4 text-amber-400" />
108:                 <span>Calcular Ahorro de Hojas</span>
109:               </Button>
110:             </a>
111:           </div>
112: 
113:           <p className="mt-3 text-[11px] text-slate-500">
114:             No requiere tarjeta de crédito • 100% funcional en navegador • Exportación directa en PDF
115:           </p>
116: 
117:           {/* ============================================================ */}
118:           {/* 3. MÉTRICAS 100% REALES Y TÉCNICAS (SIN VANIDAD)            */}
119:           {/* ============================================================ */}
120:           <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
121:             <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
122:               <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">0%</p>
123:               <h4 className="text-xs font-bold text-slate-200 mt-1">Error de Correlatividad</h4>
124:               <p className="text-[10px] text-slate-400 mt-0.5">
125:                 Numeración continua garantizada matemáticamente sin saltos ni duplicados.
126:               </p>
127:             </div>
128: 
129:             <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
130:               <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">+40%</p>
131:               <h4 className="text-xs font-bold text-slate-200 mt-1">Aprovechamiento de Hoja</h4>
132:               <p className="text-[10px] text-slate-400 mt-0.5">
133:                 Exprime el lateral derecho de la hoja A4 con tickets verticales girados 90°.
134:               </p>
135:             </div>
136: 
137:             <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
138:               <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">100%</p>
139:               <h4 className="text-xs font-bold text-slate-200 mt-1">Fidelidad Vectorial</h4>
140:               <p className="text-[10px] text-slate-400 mt-0.5">
141:                 Textos nítidos con operadores nativos, sin píxeles borrosos al fotocopiar.
142:               </p>
143:             </div>
144: 
145:             <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
146:               <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">&lt; 3 seg</p>
147:               <h4 className="text-xs font-bold text-slate-200 mt-1">Generación Multipágina</h4>
148:               <p className="text-[10px] text-slate-400 mt-0.5">
149:                 Compilación instantánea en tu navegador lista para imprimir en casa o imprenta.
150:               </p>
151:             </div>
152:           </div>
153:         </div>
154:       </section>
155: 
156:       {/* ============================================================ */}
157:       {/* 4. MOCKUP VISUAL INTERACTIVO: EL BOLETO Y LA HOJA A4        */}
158:       {/* ============================================================ */}
159:       <section className="py-12 border-y border-slate-800/80 bg-slate-900/30">
160:         <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
161:           <div className="text-center mb-8">
162:             <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
163:               Anatomía de un Boleto de Rifa Profesional
164:             </h3>
165:             <p className="text-xl sm:text-2xl font-black text-slate-100">
166:               Diseñado específicamente para cortar, talonear y vender
167:             </p>
168:           </div>
169: 
170:           {/* Tarjeta del Boleto Ilustrado */}
171:           <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-4 sm:p-6 shadow-2xl">
172:             {/* Boleto Horizontal Demo */}
173:             <div className="rounded-xl border border-slate-600 bg-white text-slate-900 shadow-xl overflow-hidden flex flex-col sm:flex-row">
174:               {/* Cuerpo Principal */}
175:               <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between border-b-2 sm:border-b-0 sm:border-r-2 border-dashed border-slate-300">
176:                 <div>
177:                   <div className="flex items-center justify-between gap-2">
178:                     <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
179:                       Bono Contribución Solidario
180:                     </span>
181:                     <span className="text-[11px] font-semibold text-slate-500">
182:                       Sorteo: 28 de Noviembre 2026
183:                     </span>
184:                   </div>
185:                   <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-2 leading-tight">
186:                     Gran Rifa Anual Club Atlético & Social
187:                   </h4>
188:                   <p className="text-xs text-rose-800 font-bold italic mt-0.5">
189:                     Subcomisión de Deporte Infantil • Obras en Sede
190:                   </p>
191: 
192:                   {/* Lista de premios en columnas */}
193:                   <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
194:                     <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
195:                       Premios del Sorteo:
196:                     </p>
197:                     <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] text-rose-800 font-medium italic">
198:                       <p><strong className="not-italic text-slate-900">1°:</strong> Moto 110cc 0KM</p>
199:                       <p><strong className="not-italic text-slate-900">2°:</strong> Smart TV 55&quot; 4K</p>
200:                       <p><strong className="not-italic text-slate-900">3°:</strong> Heladera con Freezer</p>
201:                       <p><strong className="not-italic text-slate-900">4°:</strong> Bicicleta Rodado 29</p>
202:                     </div>
203:                   </div>
204:                 </div>
205: 
206:                 <div className="mt-4 pt-2.5 border-t border-slate-200 flex items-center justify-between">
207:                   <span className="text-sm font-black text-slate-900">Valor: $ 3.000</span>
208:                   <span className="text-lg sm:text-xl font-black font-mono text-rose-700">
209:                     N° 0482
210:                   </span>
211:                 </div>
212:               </div>
213: 
214:               {/* Talón de Control */}
215:               <div className="w-full sm:w-64 bg-slate-50 p-4 sm:p-5 flex flex-col justify-between border-slate-200">
216:                 <div>
217:                   <div className="flex items-center justify-between">
218:                     <span className="text-[10px] font-black uppercase text-slate-800 border-b border-slate-300 pb-0.5">
219:                       Talón de Control
220:                     </span>
221:                     <Scissors className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
222:                   </div>
223: 
224:                   <div className="mt-3 space-y-2 text-[11px]">
225:                     <div>
226:                       <span className="text-slate-600 block text-[10px] font-bold">Nombre y Apellido:</span>
227:                       <div className="border-b border-slate-400 h-4 mt-0.5" />
228:                     </div>
229:                     <div>
230:                       <span className="text-slate-600 block text-[10px] font-bold">Teléfono de Contacto:</span>
231:                       <div className="border-b border-slate-400 h-4 mt-0.5" />
232:                     </div>
233:                   </div>
234:                 </div>
235: 
236:                 <div className="mt-4 text-center pt-2 border-t border-slate-200">
237:                   <span className="text-[10px] font-semibold text-slate-600">Valor: $ 3.000</span>
238:                   <p className="text-base font-black font-mono text-rose-700">N° 0482</p>
239:                 </div>
240:               </div>
241:             </div>
242: 
243:             {/* Guías explicativas */}
244:             <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs text-slate-400">
245:               <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/50 border border-slate-800">
246:                 <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
247:                 <span>Micro-punteado para corte manual o guillotina</span>
248:               </div>
249:               <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/50 border border-slate-800">
250:                 <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
251:                 <span>Datos del comprador en talón para la urna</span>
252:               </div>
253:               <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/50 border border-slate-800">
254:                 <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
255:                 <span>Numeración coincidente en cuerpo y talón</span>
256:               </div>
257:             </div>
258:           </div>
259:         </div>
260:       </section>
261: 
262:       {/* ============================================================ */}
263:       {/* 5. CALCULADORA INTERACTIVA DE RECAUDACIÓN Y PAPEL           */}
264:       {/* ============================================================ */}
265:       <section id="calculadora" className="py-16 sm:py-24">
266:         <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
267:           <div className="text-center mb-10">
268:             <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
269:               Herramienta de Simulación Real
270:             </span>
271:             <h3 className="text-2xl sm:text-4xl font-black text-slate-100 mt-1">
272:               Calcula la recaudación de tu rifa y el ahorro de papel
273:             </h3>
274:             <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
275:               Simula tus números y comprueba exactamente cuántas hojas A4 necesitas y cuánto dinero generará tu evento.
276:             </p>
277:           </div>
278: 
279:           <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
280:             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
281:               {/* Controles interactivos */}
282:               <div className="space-y-6">
283:                 <div>
284:                   <div className="flex justify-between items-center mb-2">
285:                     <label className="text-xs font-bold text-slate-200">
286:                       Cantidad de Boletos a Imprimir:
287:                     </label>
288:                     <span className="text-base font-bold font-mono text-amber-400">
289:                       {calcTickets} boletos
290:                     </span>
291:                   </div>
292:                   <input
293:                     type="range"
294:                     min={100}
295:                     max={5000}
296:                     step={50}
297:                     value={calcTickets}
298:                     onChange={(e) => setCalcTickets(Number(e.target.value))}
299:                     className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
300:                   />
301:                   <div className="flex justify-between text-[10px] text-slate-500 mt-1">
302:                     <span>100 boletos</span>
303:                     <span>2.500 boletos</span>
304:                     <span>5.000 boletos</span>
305:                   </div>
306:                 </div>
307: 
308:                 <div>
309:                   <div className="flex justify-between items-center mb-2">
310:                     <label className="text-xs font-bold text-slate-200">
311:                       Precio de Venta por Boleto:
312:                     </label>
313:                     <span className="text-base font-bold font-mono text-amber-400">
314:                       {formatCurrency(calcPrice)}
315:                     </span>
316:                   </div>
317:                   <input
318:                     type="range"
319:                     min={500}
320:                     max={15000}
321:                     step={250}
322:                     value={calcPrice}
323:                     onChange={(e) => setCalcPrice(Number(e.target.value))}
324:                     className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
325:                   />
326:                   <div className="flex justify-between text-[10px] text-slate-500 mt-1">
327:                     <span>$ 500</span>
328:                     <span>$ 7.500</span>
329:                     <span>$ 15.000</span>
330:                   </div>
331:                 </div>
332: 
333:                 <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800 text-xs text-slate-300 space-y-1.5">
334:                   <div className="flex items-center gap-2 font-semibold text-slate-200">
335:                     <Sliders className="h-4 w-4 text-amber-400" />
336:                     <span>Algoritmo de aprovechamiento A4</span>
337:                   </div>
338:                   <p className="text-[11px] text-slate-400">
339:                     Eventazo coloca 5 tickets horizontales + 2 verticales en el lateral = <strong className="text-amber-300">7 tickets por hoja</strong>, en lugar de los 5 habituales.
340:                   </p>
341:                 </div>
342:               </div>
343: 
344:               {/* Resultados */}
345:               <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-900 p-5 sm:p-6 space-y-5">
346:                 <div>
347:                   <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
348:                     Recaudación Total Potencial
349:                   </span>
350:                   <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono mt-1">
351:                     {formatCurrency(totalRaised)}
352:                   </p>
353:                   <p className="text-[11px] text-slate-400 mt-0.5">
354:                     Fondos brutos con el 100% de los números colocados.
355:                   </p>
356:                 </div>
357: 
358:                 <div className="pt-4 border-t border-slate-800/80 space-y-3">
359:                   <div className="flex items-center justify-between text-xs">
360:                     <span className="text-slate-400">Hojas con método tradicional (Word):</span>
361:                     <span className="font-mono font-bold text-slate-300">{standardSheets} hojas A4</span>
362:                   </div>
363:                   <div className="flex items-center justify-between text-xs">
364:                     <span className="text-emerald-400 font-semibold">Hojas con Eventazo A4 Optimizado:</span>
365:                     <span className="font-mono font-bold text-emerald-400 text-sm">{eventazoSheets} hojas A4</span>
366:                   </div>
367:                   <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
368:                     <span className="text-amber-300 font-bold">Hojas A4 ahorradas:</span>
369:                     <span className="font-mono font-bold text-amber-400 text-sm">
370:                       {sheetsSaved} hojas ({percentSaved}% menos papel)
371:                     </span>
372:                   </div>
373:                 </div>
374: 
375:                 <Link href="/editor" className="block pt-2">
376:                   <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs h-10 rounded-xl shadow-lg shadow-amber-500/20">
377:                     Comenzar a Diseñar esta Rifa
378:                   </Button>
379:                 </Link>
380:               </div>
381:             </div>
382:           </div>
383:         </div>
384:       </section>
385: 
386:       {/* ============================================================ */}
387:       {/* 6. COMPARATIVA: EVENTAZO VS METODOS TRADICIONALES           */}
388:       {/* ============================================================ */}
389:       <section id="comparativa" className="py-16 bg-slate-900/40 border-y border-slate-800/80">
390:         <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
391:           <div className="text-center mb-10">
392:             <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
393:               ¿Por qué cambiar a Eventazo?
394:             </span>
395:             <h3 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
396:               La diferencia entre perder horas y resolverlo en 2 minutos
397:             </h3>
398:           </div>
399: 
400:           <div className="rounded-3xl border border-slate-800 overflow-hidden bg-slate-900/90 shadow-xl">
401:             <div className="grid grid-cols-3 p-4 sm:p-5 bg-slate-850 border-b border-slate-800 text-xs font-bold text-slate-200">
402:               <div>Funcionalidad</div>
403:               <div className="text-center text-slate-400">Word / Excel / Canva</div>
404:               <div className="text-center text-amber-400 font-black">Eventazo PRO</div>
405:             </div>
406: 
407:             <div className="divide-y divide-slate-800/60 text-xs">
408:               <ComparisonRow
409:                 feature="Numeración automática 0001 a N"
410:                 traditional="Copiar y pegar a mano (riesgo de duplicados)"
411:                 eventazo="100% automático y matemáticamente único"
412:               />
413:               <ComparisonRow
414:                 feature="Aprovechamiento de hoja A4"
415:                 traditional="Desperdicia hasta el 40% del margen lateral"
416:                 eventazo="Acomoda tickets verticales y horizontales"
417:               />
418:               <ComparisonRow
419:                 feature="Talón de control desprendible"
420:                 traditional="Difícil de alinear con líneas de puntos"
421:                 eventazo="Estandarizado con micro-puntos y corte limpio"
422:               />
423:               <ComparisonRow
424:                 feature="Ajuste de múltiples premios"
425:                 traditional="Se desborda el texto y deforma el boleto"
426:                 eventazo="Distribución inteligente en 2, 3 o 4 columnas"
427:               />
428:               <ComparisonRow
429:                 feature="Costo de producción"
430:                 traditional="Altos costos de imprenta ($30k-$80k)"
431:                 eventazo="100% gratis para diseñar y exportar en PDF"
432:               />
433:             </div>
434:           </div>
435:         </div>
436:       </section>
437: 
438:       {/* ============================================================ */}
439:       {/* 7. CASOS DE USO REALES                                      */}
440:       {/* ============================================================ */}
441:       <section id="casos" className="py-16 sm:py-24">
442:         <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
443:           <div className="text-center mb-12">
444:             <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
445:               Soluciones a Medida
446:             </span>
447:             <h3 className="text-2xl sm:text-4xl font-black text-slate-100 mt-1">
448:               Creado para quienes necesitan recaudar fondos en serio
449:             </h3>
450:           </div>
451: 
452:           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
453:             <UseCaseCard
454:               icon={<GraduationCap className="h-6 w-6 text-amber-400" />}
455:               title="Escuelas y Cooperadoras"
456:               description="Kermesses escolares, día del maestro, viajes de egresados y equipamiento de aulas. Imprime planchas que los alumnos pueden vender fácilmente."
457:               badge="Educación"
458:             />
459:             <UseCaseCard
460:               icon={<Trophy className="h-6 w-6 text-emerald-400" />}
461:               title="Clubes y Escuelas Deportivas"
462:               description="Compra de indumentaria, pelotas, viajes a torneos y mantenimiento de canchas. Diseños con hasta 15 premios en varias columnas."
463:               badge="Deportes"
464:             />
465:             <UseCaseCard
466:               icon={<HeartHandshake className="h-6 w-6 text-rose-400" />}
467:               title="Campañas Solidarias y Salud"
468:               description="Tratamientos médicos, cirugías, rescate animal y urgencias comunitarias. Máxima transparencia con talones de control para cada colaborador."
469:               badge="Solidario"
470:             />
471:           </div>
472:         </div>
473:       </section>
474: 
475:       {/* ============================================================ */}
476:       {/* 8. PREGUNTAS FRECUENTES (FAQ)                               */}
477:       {/* ============================================================ */}
478:       <section id="preguntas" className="py-16 bg-slate-900/30 border-t border-slate-800/80">
479:         <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
480:           <div className="text-center mb-10">
481:             <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
482:               Dudas Resueltas
483:             </span>
484:             <h3 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
485:               Preguntas Frecuentes
486:             </h3>
487:           </div>
488: 
489:           <div className="space-y-4">
490:             <FaqItem
491:               question="¿Qué tipo de papel es recomendable para imprimir?"
492:               answer="Para fotocopiadoras o impresoras domésticas, el papel común obra de 75g o 80g funciona excelente y es muy económico. Si buscas un acabado premium para vender a mayor precio, puedes usar cartulina chambril u opalina de 120g a 150g."
493:             />
494:             <FaqItem
495:               question="¿Cómo se cortan y arman los talonarios?"
496:               answer="Los boletos incluyen líneas de corte punteadas normalizadas. Puedes cortarlos con guillotina de papel o trincheta y regla. Para armar talonarios (por ejemplo de 25 o 50 boletos), basta con colocar dos grampas metálicas en el borde izquierdo del talón de control o aplicar pegamento para blocks."
497:             />
498:             <FaqItem
499:               question="¿Cómo funciona la numeración automática?"
500:               answer="Tú solo defines el número de inicio (por ejemplo 0001) y la cantidad total (por ejemplo 1.000). Eventazo calcula matemáticamente la cantidad de dígitos necesarios para rellenar con ceros a la izquierda y numera secuencialmente cada boleto y su talón correspondiente sin posibilidad de duplicados."
501:             />
502:             <FaqItem
503:               question="¿Puedo guardar mis diseños para modificarlos después?"
504:               answer="Sí. Gracias a la integración con Supabase y modo local, puedes hacer clic en 'Guardar Rifa' en la barra superior y tus diseños quedarán archivados en 'Mis Rifas' para editarlos o volver a imprimirlos cuando quieras."
505:             />
506:           </div>
507:         </div>
508:       </section>
509: 
510:       {/* ============================================================ */}
511:       {/* 9. BANNER CTA FINAL                                         */}
512:       {/* ============================================================ */}
513:       <section className="py-20 relative overflow-hidden">
514:         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-amber-500/10 pointer-events-none" />
515: 
516:         <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center relative z-10">
517:           <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
518:             <Printer className="h-6 w-6" />
519:           </div>
520: 
521:           <h3 className="text-3xl sm:text-4xl font-black text-slate-100">
522:             Listo para crear tu primera plancha de rifas en 2 minutos?
523:           </h3>
524:           <p className="mt-3 text-slate-400 text-sm max-w-lg mx-auto">
525:             Sin programas pesados, sin registros molestos. Entra al editor y descarga tu PDF listo para imprimir.
526:           </p>
527: 
528:           <div className="mt-8 flex justify-center">
529:             <Link href="/editor">
530:               <Button
531:                 size="lg"
532:                 className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm h-12 px-8 rounded-2xl shadow-xl shadow-amber-500/30 flex items-center gap-2 group"
533:               >
534:                 <span>Abrir Editor Gratuito</span>
535:                 <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
536:               </Button>
537:             </Link>
538:           </div>
539:         </div>
540:       </section>
541: 
542:       {/* ============================================================ */}
543:       {/* 10. FOOTER                                                  */}
544:       {/* ============================================================ */}
545:       <footer className="border-t border-slate-800 py-8 bg-slate-950">
546:         <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
547:           <div className="flex items-center gap-2">
548:             <Image src="/icon.svg" alt="Eventazo" width={24} height={24} className="rounded-md" />
549:             <span className="text-xs font-bold text-slate-300">Eventazo Studio PRO</span>
550:             <span className="text-[10px] text-slate-500">• Impresión de Rifas</span>
551:           </div>
552: 
553:           <p className="text-xs text-slate-500">
554:             Desarrollado con dedicación por{" "}
555:             <a
556:               href="https://somos-env.netlify.app/"
557:               target="_blank"
558:               rel="noopener noreferrer"
559:               className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
560:             >
561:               SoMoS
562:             </a>
563:           </p>
564:         </div>
565:       </footer>
566:     </div>
567:   );
568: }
569: 
570: // Fila de Comparativa
571: function ComparisonRow({
572:   feature,
573:   traditional,
574:   eventazo,
575: }: {
576:   feature: string;
577:   traditional: string;
578:   eventazo: string;
579: }) {
580:   return (
581:     <div className="grid grid-cols-3 p-4 sm:p-4.5 items-center hover:bg-slate-800/30 transition-colors">
582:       <span className="font-semibold text-slate-200">{feature}</span>
583:       <div className="text-center text-slate-400 flex items-center justify-center gap-1.5 px-2">
584:         <XCircle className="h-4 w-4 text-rose-500 shrink-0 hidden sm:inline" />
585:         <span>{traditional}</span>
586:       </div>
587:       <div className="text-center text-amber-300 font-medium flex items-center justify-center gap-1.5 px-2">
588:         <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 hidden sm:inline" />
589:         <span>{eventazo}</span>
590:       </div>
591:     </div>
592:   );
593: }
594: 
595: // Tarjeta de Caso de Uso
596: function UseCaseCard({
597:   icon,
598:   title,
599:   description,
600:   badge,
601: }: {
602:   icon: React.ReactNode;
603:   title: string;
604:   description: string;
605:   badge: string;
606: }) {
607:   return (
608:     <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-200 group">
609:       <div>
610:         <div className="flex items-center justify-between mb-4">
611:           <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
612:             {icon}
613:           </div>
614:           <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
615:             {badge}
616:           </span>
617:         </div>
618:         <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
619:           {title}
620:         </h4>
621:         <p className="text-xs text-slate-400 mt-2 leading-relaxed">
622:           {description}
623:         </p>
624:       </div>
625: 
626:       <div className="mt-6 pt-4 border-t border-slate-800/80">
627:         <Link
628:           href="/editor"
629:           className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
630:         >
631:           <span>Diseñar para este caso</span>
632:           <ArrowRight className="h-3.5 w-3.5" />
633:         </Link>
634:       </div>
635:     </div>
636:   );
637: }
638: 
639: // Acordeón / Item de Pregunta Frecuente
640: function FaqItem({ question, answer }: { question: string; answer: string }) {
641:   const [open, setOpen] = useState(false);
642: 
643:   return (
644:     <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors">
645:       <button
646:         onClick={() => setOpen(!open)}
647:         className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-200 hover:text-amber-300 transition-colors"
648:       >
649:         <span>{question}</span>
650:         <span className="text-slate-500 text-lg font-mono leading-none">
651:           {open ? "−" : "+"}
652:         </span>
653:       </button>
654:       {open && (
655:         <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3 animate-in fade-in duration-150">
656:           {answer}
657:         </div>
658:       )}
659:     </div>
660:   );
661: }
````

## File: src/components/PageLayoutPreview.tsx
````typescript
  1: "use client";
  2: 
  3: import { useMemo } from "react";
  4: import { useRifaStore } from "@/store/useRifaStore";
  5: import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";
  6: 
  7: export function PageLayoutPreview() {
  8:   const { printConfig, ticketConfig } = useRifaStore();
  9: 
 10:   const {
 11:     rows,
 12:     cols,
 13:     horizCount,
 14:     sideRotatedCount,
 15:     canFitSide,
 16:     totalPerPage,
 17:     totalPages,
 18:     scale,
 19:     pageW,
 20:     pageH,
 21:     gridStartX,
 22:     gridW,
 23:     tW,
 24:     tH,
 25:     stubW,
 26:     gap,
 27:     margin,
 28:   } = useMemo(() => {
 29:     const m = printConfig.marginTop * MM_TO_PT;
 30:     const g = printConfig.gap * MM_TO_PT;
 31:     const tw = printConfig.ticketWidth * MM_TO_PT;
 32:     const th = printConfig.ticketHeight * MM_TO_PT;
 33:     const rawStub = (printConfig.stubWidth ?? 36) * MM_TO_PT;
 34:     const stubW = Math.min(Math.max(15 * MM_TO_PT, rawStub), Math.max(20 * MM_TO_PT, tw - 25 * MM_TO_PT));
 35: 
 36:     const availW = A4_WIDTH_PT - m * 2;
 37:     const availH = A4_HEIGHT_PT - m * 2;
 38: 
 39:     const c = Math.max(1, Math.floor((availW + g) / (tw + g)));
 40:     const r = Math.max(1, Math.floor((availH + g) / (th + g)));
 41:     const hc = c * r;
 42: 
 43:     const gw = c * tw + (c - 1) * g;
 44:     const sx = m;
 45: 
 46:     const rightRemaining = A4_WIDTH_PT - sx - gw - g - m;
 47:     const canFitSide = (printConfig.allowSideTickets ?? true) && (rightRemaining >= th);
 48:     const sc = canFitSide ? Math.floor((availH + g) / (tw + g)) : 0;
 49: 
 50:     const tpp = hc + sc;
 51:     const tp = Math.ceil(ticketConfig.totalTickets / tpp);
 52: 
 53:     const s = 200 / A4_HEIGHT_PT;
 54:     const pw = A4_WIDTH_PT * s;
 55:     const ph = A4_HEIGHT_PT * s;
 56: 
 57:     return {
 58:       rows: r,
 59:       cols: c,
 60:       horizCount: hc,
 61:       sideRotatedCount: sc,
 62:       canFitSide,
 63:       totalPerPage: tpp,
 64:       totalPages: tp,
 65:       scale: s,
 66:       pageW: pw,
 67:       pageH: ph,
 68:       gridStartX: sx,
 69:       gridW: gw,
 70:       tW: tw,
 71:       tH: th,
 72:       stubW,
 73:       gap: g,
 74:       margin: m,
 75:     };
 76:   }, [
 77:     printConfig.marginTop,
 78:     printConfig.gap,
 79:     printConfig.ticketWidth,
 80:     printConfig.ticketHeight,
 81:     printConfig.stubWidth,
 82:     printConfig.allowSideTickets,
 83:     ticketConfig.totalTickets,
 84:   ]);
 85: 
 86:   return (
 87:     <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 space-y-3 shadow-lg">
 88:       <h4 className="text-sm font-semibold text-slate-200">
 89:         Distribución en Página A4
 90:       </h4>
 91: 
 92:       {/* Stats */}
 93:       <div className="grid grid-cols-3 gap-2 text-center">
 94:         <div className="rounded-lg bg-slate-900/60 p-2">
 95:           <p className="text-lg font-bold text-amber-400">{totalPerPage}</p>
 96:           <p className="text-[9px] text-slate-400">por página</p>
 97:         </div>
 98:         <div className="rounded-lg bg-slate-900/60 p-2">
 99:           <p className="text-lg font-bold text-amber-400">{totalPages}</p>
100:           <p className="text-[9px] text-slate-400">páginas</p>
101:         </div>
102:         <div className="rounded-lg bg-slate-900/60 p-2">
103:           <p className="text-lg font-bold text-amber-400">{ticketConfig.totalTickets}</p>
104:           <p className="text-[9px] text-slate-400">tickets</p>
105:         </div>
106:       </div>
107: 
108:       {/* Visual page layout */}
109:       <div className="flex justify-center">
110:         <div
111:           className="relative bg-white rounded shadow-lg border border-slate-500"
112:           style={{ width: `${pageW}px`, height: `${pageH}px` }}
113:         >
114:           {/* Horizontal tickets */}
115:           {Array.from({ length: rows }).map((_, row) =>
116:             Array.from({ length: cols }).map((_, col) => {
117:               const ticketIdx = row * cols + col;
118:               if (ticketIdx >= horizCount) return null;
119:               const x = (gridStartX + col * (tW + gap)) * scale;
120:               const y = (margin + row * (tH + gap)) * scale;
121:               return (
122:                 <div
123:                   key={`h-${row}-${col}`}
124:                   className="absolute bg-amber-100 border border-amber-400/60 rounded-[2px] flex items-center justify-between overflow-hidden"
125:                   style={{
126:                     left: `${x}px`,
127:                     top: `${y}px`,
128:                     width: `${tW * scale}px`,
129:                     height: `${tH * scale}px`,
130:                   }}
131:                 >
132:                   <span className="flex-1 text-center text-[6px] text-amber-700 font-mono font-bold truncate">
133:                     {ticketIdx + 1}
134:                   </span>
135:                   <div
136:                     className="h-full border-l border-dashed border-amber-400/80 bg-amber-200/50"
137:                     style={{ width: `${(stubW / tW) * 100}%` }}
138:                     title="Talón"
139:                   />
140:                 </div>
141:               );
142:             })
143:           )}
144: 
145:           {/* Rotated tickets on the right */}
146:           {canFitSide &&
147:             Array.from({ length: sideRotatedCount }).map((_, i) => {
148:               const rx = (gridStartX + gridW + gap) * scale;
149:               const ry = (margin + i * (tW + gap)) * scale;
150:               return (
151:                 <div
152:                   key={`r-${i}`}
153:                   className="absolute bg-blue-100 border border-blue-400/60 rounded-[2px] flex flex-col items-center justify-between overflow-hidden"
154:                   style={{
155:                     left: `${rx}px`,
156:                     top: `${ry}px`,
157:                     width: `${tH * scale}px`,
158:                     height: `${tW * scale}px`,
159:                   }}
160:                 >
161:                   <div
162:                     className="w-full border-b border-dashed border-blue-400/80 bg-blue-200/50"
163:                     style={{ height: `${(stubW / tW) * 100}%` }}
164:                     title="Talón"
165:                   />
166:                   <span className="flex-1 flex items-center justify-center text-[6px] text-blue-700 font-mono font-bold rotate-90 truncate">
167:                     {horizCount + i + 1}
168:                   </span>
169:                 </div>
170:               );
171:             })}
172:         </div>
173:       </div>
174: 
175:       {/* Legend */}
176:       <div className="flex items-center justify-center gap-4 text-[9px]">
177:         <div className="flex items-center gap-1">
178:           <div className="w-3 h-2 bg-amber-100 border border-amber-400/60 rounded-[1px]" />
179:           <span className="text-slate-400">Horizontal ({horizCount})</span>
180:         </div>
181:         {sideRotatedCount > 0 && (
182:           <div className="flex items-center gap-1">
183:             <div className="w-2 h-3 bg-blue-100 border border-blue-400/60 rounded-[1px]" />
184:             <span className="text-slate-400">Vertical ({sideRotatedCount})</span>
185:           </div>
186:         )}
187:       </div>
188:     </div>
189:   );
190: }
````

## File: src/components/PrintConfigPanel.tsx
````typescript
  1: "use client";
  2: 
  3: import { useMemo } from "react";
  4: import { Printer, Maximize2, LayoutGrid, Scissors } from "lucide-react";
  5: import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  6: import { Label } from "@/components/ui/label";
  7: import { NumberInput } from "@/components/ui/number-input";
  8: import { Slider } from "@/components/ui/slider";
  9: import { Switch } from "@/components/ui/switch";
 10: import { useRifaStore } from "@/store/useRifaStore";
 11: import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";
 12: 
 13: export function PrintConfigPanel() {
 14:   const { printConfig, setPrintConfig, ticketConfig } = useRifaStore();
 15: 
 16:   const currentStubWidth = printConfig.stubWidth ?? 36;
 17:   const stubPercent = Math.round((currentStubWidth / printConfig.ticketWidth) * 100);
 18: 
 19:   // Memoized layout calculation for fast responsiveness on low-end machines
 20:   const { ticketsPerRow, ticketsPerCol, horizontalCount, sideCount, ticketsPerPage, totalPages } = useMemo(() => {
 21:     const margin = printConfig.marginTop * MM_TO_PT;
 22:     const gap = printConfig.gap * MM_TO_PT;
 23:     const ticketWidth = printConfig.ticketWidth * MM_TO_PT;
 24:     const ticketHeight = printConfig.ticketHeight * MM_TO_PT;
 25: 
 26:     const availableWidth = A4_WIDTH_PT - margin * 2;
 27:     const availableHeight = A4_HEIGHT_PT - margin * 2;
 28: 
 29:     const cols = Math.max(1, Math.floor((availableWidth + gap) / (ticketWidth + gap)));
 30:     const rows = Math.max(1, Math.floor((availableHeight + gap) / (ticketHeight + gap)));
 31:     const hc = cols * rows;
 32: 
 33:     const gridW = cols * ticketWidth + (cols - 1) * gap;
 34:     const rightRem = A4_WIDTH_PT - margin - gridW - gap - margin;
 35:     const canFitSide = (printConfig.allowSideTickets ?? true) && (rightRem >= ticketHeight);
 36:     const sc = canFitSide ? Math.floor((availableHeight + gap) / (ticketWidth + gap)) : 0;
 37: 
 38:     const tpp = hc + sc;
 39:     const tp = Math.ceil(ticketConfig.totalTickets / tpp);
 40: 
 41:     return {
 42:       ticketsPerRow: cols,
 43:       ticketsPerCol: rows,
 44:       ticketsPerPage: tpp,
 45:       totalPages: tp,
 46:       horizontalCount: hc,
 47:       sideCount: sc,
 48:       canFitSide,
 49:     };
 50:   }, [
 51:     printConfig.ticketWidth,
 52:     printConfig.ticketHeight,
 53:     printConfig.gap,
 54:     printConfig.marginTop,
 55:     printConfig.allowSideTickets,
 56:     ticketConfig.totalTickets,
 57:   ]);
 58: 
 59:   return (
 60:     <Card className="shadow-xl border-slate-800/80">
 61:       <CardHeader className="pb-3 border-b border-slate-800">
 62:         <CardTitle className="flex items-center gap-2">
 63:           <Printer className="h-5 w-5 text-amber-400" />
 64:           <span>Configuración de Impresión (A4)</span>
 65:         </CardTitle>
 66:       </CardHeader>
 67: 
 68:       <CardContent className="space-y-4 pt-4">
 69:         {/* Resumen de imposición */}
 70:         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
 71:           <div className="rounded-lg bg-slate-900/80 border border-slate-700/80 p-3 text-center">
 72:             <span className="text-[11px] text-slate-400">Por Página</span>
 73:             <p className="text-xl font-bold font-mono text-amber-400">{ticketsPerPage}</p>
 74:             {sideCount > 0 && (
 75:               <span className="text-[9px] text-amber-500/80 block mt-0.5">
 76:                 ({horizontalCount} horiz. + {sideCount} vert.)
 77:               </span>
 78:             )}
 79:           </div>
 80:           <div className="rounded-lg bg-slate-900/80 border border-slate-700/80 p-3 text-center">
 81:             <span className="text-[11px] text-slate-400">Total Páginas</span>
 82:             <p className="text-xl font-bold font-mono text-amber-400">{totalPages}</p>
 83:           </div>
 84:           <div className="rounded-lg bg-slate-900/80 border border-slate-700/80 p-3 text-center">
 85:             <span className="text-[11px] text-slate-400">Columnas</span>
 86:             <p className="text-xl font-bold font-mono text-slate-200">{ticketsPerRow}</p>
 87:           </div>
 88:           <div className="rounded-lg bg-slate-900/80 border border-slate-700/80 p-3 text-center">
 89:             <span className="text-[11px] text-slate-400">Filas</span>
 90:             <p className="text-xl font-bold font-mono text-slate-200">{ticketsPerCol}</p>
 91:           </div>
 92:         </div>
 93: 
 94:         {/* Disposición: Boletos verticales en el margen */}
 95:         <div className="rounded-lg bg-slate-900/60 border border-slate-700/80 p-3 shadow-inner">
 96:           <Switch
 97:             id="allowSideTickets"
 98:             checked={printConfig.allowSideTickets ?? true}
 99:             onCheckedChange={(checked) => setPrintConfig({ allowSideTickets: checked })}
100:             label="Aprovechar margen derecho con boletos verticales"
101:             description="Activado: aprovecha el espacio lateral de la hoja A4 colocando boletos verticales rotados 90°. Desactívalo si prefieres solo boletos horizontales."
102:           />
103:         </div>
104: 
105:         {/* Tamaño del ticket */}
106:         <div className="space-y-3">
107:           <Label className="flex items-center gap-1.5 text-xs text-amber-400/90 uppercase tracking-wider font-semibold">
108:             <LayoutGrid className="h-3.5 w-3.5" />
109:             <span>Dimensiones del Ticket</span>
110:           </Label>
111:           <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
112:             <div className="space-y-1">
113:               <span className="text-[11px] text-slate-400">Ancho Boleto</span>
114:               <NumberInput
115:                 min={60}
116:                 max={210}
117:                 step={5}
118:                 suffix="mm"
119:                 value={printConfig.ticketWidth}
120:                 onChange={(val) => {
121:                   const maxStub = Math.max(20, val - 25);
122:                   const safeStub = Math.min(currentStubWidth, maxStub);
123:                   setPrintConfig({ ticketWidth: val, stubWidth: safeStub });
124:                 }}
125:               />
126:             </div>
127:             <div className="space-y-1">
128:               <span className="text-[11px] text-slate-400">Alto Boleto</span>
129:               <NumberInput
130:                 min={25}
131:                 max={150}
132:                 step={5}
133:                 suffix="mm"
134:                 value={printConfig.ticketHeight}
135:                 onChange={(val) => setPrintConfig({ ticketHeight: val })}
136:               />
137:             </div>
138:             <div className="space-y-1">
139:               <div className="flex items-center justify-between">
140:                 <span className="text-[11px] text-slate-400">Ancho Talón</span>
141:                 <span className="text-[10px] text-amber-400 font-mono font-bold">
142:                   {stubPercent}%
143:                 </span>
144:               </div>
145:               <NumberInput
146:                 min={15}
147:                 max={Math.max(20, printConfig.ticketWidth - 25)}
148:                 step={1}
149:                 suffix="mm"
150:                 value={currentStubWidth}
151:                 onChange={(val) => setPrintConfig({ stubWidth: val })}
152:               />
153:             </div>
154:             <div className="space-y-1">
155:               <span className="text-[11px] text-slate-400">Separación</span>
156:               <NumberInput
157:                 min={0}
158:                 max={10}
159:                 step={0.5}
160:                 suffix="mm"
161:                 value={printConfig.gap}
162:                 onChange={(val) => setPrintConfig({ gap: val })}
163:               />
164:             </div>
165:           </div>
166: 
167:           {/* Control deslizante y preajustes de talón */}
168:           <div className="rounded-lg bg-slate-900/50 border border-slate-700/80 p-3 space-y-2.5 shadow-inner">
169:             <div className="flex items-center justify-between text-xs">
170:               <span className="flex items-center gap-1.5 font-medium text-slate-300 text-[11px]">
171:                 <Scissors className="h-3.5 w-3.5 text-amber-400" />
172:                 <span>Ajuste rápido de tamaño del talón:</span>
173:               </span>
174:               <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
175:                 {currentStubWidth} mm ({stubPercent}%)
176:               </span>
177:             </div>
178: 
179:             <Slider
180:               min={18}
181:               max={Math.max(25, Math.round(printConfig.ticketWidth * 0.48))}
182:               step={1}
183:               value={currentStubWidth}
184:               onChange={(val) => setPrintConfig({ stubWidth: val })}
185:               showValueBadge={false}
186:             />
187: 
188:             <div className="flex flex-wrap items-center justify-between gap-1 pt-1">
189:               <span className="text-[10px] text-slate-400">Preajustes rápidos:</span>
190:               <div className="flex flex-wrap gap-1">
191:                 {[
192:                   { label: "Estrecho (28mm)", w: 28 },
193:                   { label: "Estándar (36mm)", w: 36 },
194:                   { label: "Medio (42mm)", w: 42 },
195:                   { label: "Amplio (48mm)", w: 48 },
196:                 ].map((preset) => (
197:                   <button
198:                     key={preset.w}
199:                     type="button"
200:                     onClick={() => setPrintConfig({ stubWidth: preset.w })}
201:                     className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
202:                       currentStubWidth === preset.w
203:                         ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
204:                         : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
205:                     }`}
206:                   >
207:                     {preset.label}
208:                   </button>
209:                 ))}
210:               </div>
211:             </div>
212:           </div>
213:         </div>
214: 
215:         {/* Márgenes */}
216:         <div className="space-y-2 pt-1 border-t border-slate-800">
217:           <Label className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-semibold">
218:             <Maximize2 className="h-3.5 w-3.5" />
219:             <span>Márgenes de Hoja</span>
220:           </Label>
221:           <div className="grid grid-cols-4 gap-2">
222:             <div className="space-y-1">
223:               <span className="text-[11px] text-slate-400">Arriba</span>
224:               <NumberInput
225:                 min={0}
226:                 max={30}
227:                 step={1}
228:                 suffix="mm"
229:                 value={printConfig.marginTop}
230:                 onChange={(val) => setPrintConfig({ marginTop: val })}
231:               />
232:             </div>
233:             <div className="space-y-1">
234:               <span className="text-[11px] text-slate-400">Abajo</span>
235:               <NumberInput
236:                 min={0}
237:                 max={30}
238:                 step={1}
239:                 suffix="mm"
240:                 value={printConfig.marginBottom}
241:                 onChange={(val) => setPrintConfig({ marginBottom: val })}
242:               />
243:             </div>
244:             <div className="space-y-1">
245:               <span className="text-[11px] text-slate-400">Izq.</span>
246:               <NumberInput
247:                 min={0}
248:                 max={30}
249:                 step={1}
250:                 suffix="mm"
251:                 value={printConfig.marginLeft}
252:                 onChange={(val) => setPrintConfig({ marginLeft: val })}
253:               />
254:             </div>
255:             <div className="space-y-1">
256:               <span className="text-[11px] text-slate-400">Der.</span>
257:               <NumberInput
258:                 min={0}
259:                 max={30}
260:                 step={1}
261:                 suffix="mm"
262:                 value={printConfig.marginRight}
263:                 onChange={(val) => setPrintConfig({ marginRight: val })}
264:               />
265:             </div>
266:           </div>
267:         </div>
268: 
269:         <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
270:           <span>💡</span>
271:           <span>El sistema calcula el aprovechamiento óptimo de la hoja A4 rotando boletos al margen si queda espacio libre.</span>
272:         </p>
273:       </CardContent>
274:     </Card>
275:   );
276: }
````

## File: src/types/index.ts
````typescript
 1: export interface TicketConfig {
 2:   eventName: string;
 3:   subtitle: string;
 4:   organizer: string;
 5:   drawDate: string;
 6:   price: number;
 7:   priceLabel: string;
 8:   totalTickets: number;
 9:   startNumber: number;
10:   contributionText: string;
11:   prizes: Prize[];
12:   // Tipografía y tamaños de fuente
13:   prizesFontSize?: number; // default: 8
14:   titleFontSize?: number; // default: 14
15:   subtitleFontSize?: number; // default: 12
16:   stubFontSize?: number; // default: 10
17:   generalFontScale?: number; // default: 100 (%)
18:   // Columnas para la lista de premios
19:   prizeColumns?: 2 | 3 | 4 | "auto"; // default: "auto"
20:   // Color principal de acento
21:   primaryColor?: string; // default: "#991b1b"
22: }
23: 
24: export interface Prize {
25:   position: number;
26:   label: string;
27:   description: string;
28: }
29: 
30: export interface TicketData {
31:   number: string;
32:   config: TicketConfig;
33: }
34: 
35: export interface PrintConfig {
36:   ticketsPerRow: number;
37:   ticketsPerColumn: number;
38:   pageWidth: number; // mm
39:   pageHeight: number; // mm
40:   marginTop: number;
41:   marginBottom: number;
42:   marginLeft: number;
43:   marginRight: number;
44:   ticketWidth: number;
45:   ticketHeight: number;
46:   stubWidth?: number; // mm (default: 36)
47:   allowSideTickets?: boolean; // default: true (aprovecha lateral derecho con tickets verticales rotados)
48:   gap: number;
49: }
50: 
51: export interface GenerationProgress {
52:   current: number;
53:   total: number;
54:   percentage: number;
55:   status: 'idle' | 'generating' | 'complete' | 'error';
56:   message: string;
57: }
58: 
59: export interface TemplateImage {
60:   src: string;
61:   width: number;
62:   height: number;
63:   file: File | null;
64: }
````

## File: src/components/ConfigPanel.tsx
````typescript
  1: "use client";
  2: 
  3: import { useState } from "react";
  4: import {
  5:   Settings,
  6:   Calendar,
  7:   DollarSign,
  8:   Hash,
  9:   Building2,
 10:   Type,
 11:   ChevronDown,
 12:   ChevronUp,
 13:   RotateCcw,
 14:   Palette,
 15:   Check,
 16:   Scissors,
 17:   Trash2,
 18: } from "lucide-react";
 19: import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
 20: import { Input } from "@/components/ui/input";
 21: import { NumberInput } from "@/components/ui/number-input";
 22: import { Slider } from "@/components/ui/slider";
 23: import { Label } from "@/components/ui/label";
 24: import { useRifaStore } from "@/store/useRifaStore";
 25: import { PrizeEditor } from "@/components/PrizeEditor";
 26: import { COLOR_PRESETS } from "@/lib/constants";
 27: import { formatSpanishDate, formatShortDate, resolvePrizeColumns } from "@/lib/utils";
 28: 
 29: export function ConfigPanel() {
 30:   const {
 31:     ticketConfig,
 32:     setTicketConfig,
 33:     printConfig,
 34:     setPrintConfig,
 35:     clearConfig,
 36:     resetConfig,
 37:   } = useRifaStore();
 38:   const [showTypography, setShowTypography] = useState(true);
 39:   const [showColorPicker, setShowColorPicker] = useState(true);
 40:   const [showStubConfig, setShowStubConfig] = useState(true);
 41: 
 42:   // Defaults fallback
 43:   const titleSize = ticketConfig.titleFontSize ?? 14;
 44:   const subtitleSize = ticketConfig.subtitleFontSize ?? 12;
 45:   const prizesSize = ticketConfig.prizesFontSize ?? 8;
 46:   const stubFontSize = ticketConfig.stubFontSize ?? 10;
 47:   const fontScale = ticketConfig.generalFontScale ?? 100;
 48:   const currentColor = ticketConfig.primaryColor ?? "#991b1b";
 49:   const stubWidth = printConfig.stubWidth ?? 36;
 50:   const stubPercent = Math.round((stubWidth / printConfig.ticketWidth) * 100);
 51: 
 52:   // Auto-fitting prize font size calculation for guidance in UI
 53:   const numPrizes = ticketConfig.prizes.length;
 54:   const numCols = resolvePrizeColumns(ticketConfig.prizeColumns, numPrizes, prizesSize);
 55:   const prizeRows = Math.max(1, Math.ceil(numPrizes / numCols));
 56:   const heightFactor = (printConfig.ticketHeight || 50) / 50;
 57:   const maxFittingPrizesPx = Math.max(6, Math.floor((78 * heightFactor) / prizeRows));
 58:   const effectivePrizesSize = Math.max(5.5, Math.min(prizesSize, maxFittingPrizesPx));
 59:   const isPrizesSizeAutoAdjusted = prizesSize > effectivePrizesSize;
 60: 
 61:   const handleResetTypography = () => {
 62:     setTicketConfig({
 63:       titleFontSize: 14,
 64:       subtitleFontSize: 12,
 65:       prizesFontSize: 8,
 66:       stubFontSize: 10,
 67:       generalFontScale: 100,
 68:     });
 69:   };
 70: 
 71:   const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 72:     if (e.target.value) {
 73:       const formatted = formatSpanishDate(e.target.value);
 74:       setTicketConfig({ drawDate: formatted });
 75:     }
 76:   };
 77: 
 78:   const handleClearAll = () => {
 79:     if (typeof window !== "undefined" && window.confirm("¿Deseas vaciar todos los campos para comenzar tu rifa desde cero?")) {
 80:       clearConfig();
 81:     }
 82:   };
 83: 
 84:   return (
 85:     <Card className="shadow-xl border-slate-800/80">
 86:       <CardHeader className="pb-3 border-b border-slate-800">
 87:         <div className="flex items-center justify-between gap-2">
 88:           <CardTitle className="flex items-center gap-2">
 89:             <Settings className="h-5 w-5 text-amber-400" />
 90:             <span className="text-sm sm:text-base">Configuración</span>
 91:           </CardTitle>
 92: 
 93:           <div className="flex items-center gap-1.5">
 94:             <button
 95:               type="button"
 96:               onClick={handleClearAll}
 97:               title="Borrar todos los campos y empezar en blanco"
 98:               className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-rose-500/20 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 transition-colors flex items-center gap-1.5"
 99:             >
100:               <Trash2 className="h-3.5 w-3.5 text-rose-400" />
101:               <span>Borrar Todo</span>
102:             </button>
103: 
104:             <button
105:               type="button"
106:               onClick={() => resetConfig()}
107:               title="Restaurar datos de ejemplo"
108:               className="text-xs font-semibold px-2 py-1 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1"
109:             >
110:               <RotateCcw className="h-3.5 w-3.5" />
111:               <span className="hidden sm:inline">Ejemplo</span>
112:             </button>
113:           </div>
114:         </div>
115:       </CardHeader>
116: 
117:       <CardContent className="space-y-5 pt-4">
118:         {/* Sección: Información Principal */}
119:         <div className="space-y-3.5">
120:           <div className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 uppercase tracking-wider">
121:             <Building2 className="h-3.5 w-3.5" />
122:             <span>Datos del Evento</span>
123:           </div>
124: 
125:           {/* Event Name */}
126:           <div className="space-y-1.5">
127:             <Label htmlFor="eventName" className="text-xs text-slate-300">
128:               Nombre del Evento
129:             </Label>
130:             <Input
131:               id="eventName"
132:               value={ticketConfig.eventName}
133:               placeholder="Ej: GRAN RIFA ANUAL..."
134:               onChange={(e) => setTicketConfig({ eventName: e.target.value })}
135:             />
136:           </div>
137: 
138:           {/* Subtitle */}
139:           <div className="space-y-1.5">
140:             <Label htmlFor="subtitle" className="text-xs text-slate-300">
141:               Subtítulo o Lema
142:             </Label>
143:             <Input
144:               id="subtitle"
145:               value={ticketConfig.subtitle}
146:               placeholder="Ej: Especial Día del Padre"
147:               onChange={(e) => setTicketConfig({ subtitle: e.target.value })}
148:             />
149:           </div>
150: 
151:           {/* Organizer & Date */}
152:           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
153:             <div className="space-y-1.5">
154:               <Label htmlFor="organizer" className="text-xs text-slate-300">
155:                 Organiza
156:               </Label>
157:               <Input
158:                 id="organizer"
159:                 value={ticketConfig.organizer}
160:                 onChange={(e) => setTicketConfig({ organizer: e.target.value })}
161:               />
162:             </div>
163: 
164:             {/* Fecha del Sorteo con selector interactivo y texto libre */}
165:             <div className="space-y-1.5">
166:               <div className="flex items-center justify-between">
167:                 <Label htmlFor="drawDate" className="flex items-center gap-1.5 text-xs text-slate-300">
168:                   <Calendar className="h-3 w-3 text-amber-400/80" />
169:                   Fecha del Sorteo
170:                 </Label>
171:                 <label
172:                   htmlFor="datePickerHidden"
173:                   className="text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer flex items-center gap-1 underline underline-offset-2"
174:                   title="Abrir calendario para autocompletar"
175:                 >
176:                   <Calendar className="h-3 w-3" />
177:                   <span>Calendario</span>
178:                 </label>
179:                 <input
180:                   id="datePickerHidden"
181:                   type="date"
182:                   className="sr-only"
183:                   onChange={handleDatePickerChange}
184:                 />
185:               </div>
186: 
187:               <div className="relative">
188:                 <Input
189:                   id="drawDate"
190:                   value={ticketConfig.drawDate}
191:                   placeholder="Viernes 19 de Junio de 2026..."
192:                   onChange={(e) => setTicketConfig({ drawDate: e.target.value })}
193:                   className="pr-8"
194:                 />
195:                 <input
196:                   type="date"
197:                   tabIndex={-1}
198:                   onChange={handleDatePickerChange}
199:                   className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 cursor-pointer"
200:                   title="Elegir fecha"
201:                 />
202:                 <Calendar className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
203:               </div>
204: 
205:               <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
206:                 <span>En el talón se verá:</span>
207:                 <span className="font-mono text-amber-300/90 font-semibold bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-800">
208:                   Sorteo: {formatShortDate(ticketConfig.drawDate)}
209:                 </span>
210:               </div>
211:             </div>
212:           </div>
213: 
214:           {/* Contribution Text */}
215:           <div className="space-y-1.5">
216:             <Label htmlFor="contribution" className="text-xs text-slate-300">
217:               Texto de Contribución
218:             </Label>
219:             <Input
220:               id="contribution"
221:               value={ticketConfig.contributionText}
222:               placeholder="Tu colaboración apoya..."
223:               onChange={(e) => setTicketConfig({ contributionText: e.target.value })}
224:             />
225:           </div>
226:         </div>
227: 
228:         {/* Sección: Color del Boleto */}
229:         <div className="space-y-3 pt-2 border-t border-slate-800">
230:           <div className="flex items-center justify-between">
231:             <button
232:               type="button"
233:               onClick={() => setShowColorPicker(!showColorPicker)}
234:               className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 uppercase tracking-wider hover:text-amber-300 transition-colors cursor-pointer"
235:             >
236:               <Palette className="h-3.5 w-3.5" />
237:               <span>Color de Acento del Boleto</span>
238:               {showColorPicker ? (
239:                 <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
240:               ) : (
241:                 <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
242:               )}
243:             </button>
244: 
245:             {/* Muestra del color actual */}
246:             <div className="flex items-center gap-2">
247:               <span
248:                 className="h-4 w-4 rounded-full border border-white/30 shadow-sm"
249:                 style={{ backgroundColor: currentColor }}
250:               />
251:               <span className="text-[11px] font-mono text-slate-300">
252:                 {currentColor.toUpperCase()}
253:               </span>
254:             </div>
255:           </div>
256: 
257:           {showColorPicker && (
258:             <div className="rounded-lg border border-slate-700/80 bg-slate-900/50 p-3.5 space-y-3 shadow-inner">
259:               <div className="text-[11px] text-slate-400">
260:                 Selecciona un color predefinido o elige uno personalizado:
261:               </div>
262: 
263:               {/* Paleta de colores predefinidos */}
264:               <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
265:                 {COLOR_PRESETS.map((preset) => {
266:                   const isSelected = currentColor.toLowerCase() === preset.hex.toLowerCase();
267:                   return (
268:                     <button
269:                       key={preset.hex}
270:                       type="button"
271:                       onClick={() => setTicketConfig({ primaryColor: preset.hex })}
272:                       className={`group relative flex flex-col items-center justify-center p-1 rounded-lg border transition-all cursor-pointer ${
273:                         isSelected
274:                           ? "border-amber-400 bg-slate-800 ring-2 ring-amber-400/40 scale-105"
275:                           : "border-slate-700/80 bg-slate-800/50 hover:border-slate-500 hover:scale-105"
276:                       }`}
277:                       title={preset.name}
278:                     >
279:                       <span
280:                         className="h-6 w-6 rounded-full flex items-center justify-center shadow-md border border-white/20"
281:                         style={{ backgroundColor: preset.hex }}
282:                       >
283:                         {isSelected && <Check className="h-3.5 w-3.5 text-white drop-shadow stroke-[3]" />}
284:                       </span>
285:                     </button>
286:                   );
287:                 })}
288:               </div>
289: 
290:               {/* Selector personalizado de color */}
291:               <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
292:                 <span className="text-xs text-slate-300">Color personalizado:</span>
293:                 <div className="flex items-center gap-2">
294:                   <input
295:                     type="color"
296:                     value={currentColor}
297:                     onChange={(e) => setTicketConfig({ primaryColor: e.target.value })}
298:                     className="h-8 w-10 rounded border border-slate-600 bg-transparent p-0.5 cursor-pointer"
299:                     title="Elegir color personalizado en la rueda de colores"
300:                   />
301:                   <input
302:                     type="text"
303:                     value={currentColor}
304:                     onChange={(e) => setTicketConfig({ primaryColor: e.target.value })}
305:                     className="w-20 rounded bg-slate-800 px-2 py-1 text-center font-mono text-xs text-slate-200 uppercase border border-slate-700 focus:outline-none focus:border-amber-500"
306:                     placeholder="#991B1B"
307:                   />
308:                   <button
309:                     type="button"
310:                     onClick={() => setTicketConfig({ primaryColor: "#991b1b" })}
311:                     className="text-[11px] text-slate-400 hover:text-amber-400 cursor-pointer"
312:                     title="Restablecer al rojo predeterminado"
313:                   >
314:                     Restablecer
315:                   </button>
316:                 </div>
317:               </div>
318:             </div>
319:           )}
320:         </div>
321: 
322:         {/* Sección: Valores y Numeración */}
323:         <div className="space-y-3.5 pt-2 border-t border-slate-800">
324:           <div className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 uppercase tracking-wider">
325:             <DollarSign className="h-3.5 w-3.5" />
326:             <span>Valores y Numeración</span>
327:           </div>
328: 
329:           {/* Price & Price Label */}
330:           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
331:             <div className="space-y-1.5">
332:               <Label htmlFor="price" className="text-xs text-slate-300">
333:                 Precio Unitario ($)
334:               </Label>
335:               <NumberInput
336:                 id="price"
337:                 min={0}
338:                 max={1000000}
339:                 step={500}
340:                 prefix="$"
341:                 value={ticketConfig.price}
342:                 onChange={(val) => {
343:                   setTicketConfig({
344:                     price: val,
345:                     priceLabel: `VALOR: $${val.toLocaleString("es-AR")}`,
346:                   });
347:                 }}
348:               />
349:             </div>
350:             <div className="space-y-1.5">
351:               <Label htmlFor="priceLabel" className="text-xs text-slate-300">
352:                 Texto en el Boleto
353:               </Label>
354:               <Input
355:                 id="priceLabel"
356:                 value={ticketConfig.priceLabel}
357:                 onChange={(e) => setTicketConfig({ priceLabel: e.target.value })}
358:               />
359:             </div>
360:           </div>
361: 
362:           {/* Total Tickets & Start Number */}
363:           <div className="grid grid-cols-2 gap-3">
364:             <div className="space-y-1.5">
365:               <Label htmlFor="totalTickets" className="flex items-center gap-1.5 text-xs text-slate-300">
366:                 <Hash className="h-3 w-3 text-amber-400/80" />
367:                 Cantidad de Tickets
368:               </Label>
369:               <NumberInput
370:                 id="totalTickets"
371:                 min={1}
372:                 max={50000}
373:                 step={50}
374:                 value={ticketConfig.totalTickets}
375:                 onChange={(val) => setTicketConfig({ totalTickets: val })}
376:               />
377:             </div>
378:             <div className="space-y-1.5">
379:               <Label htmlFor="startNumber" className="text-xs text-slate-300">
380:                 Número Inicial
381:               </Label>
382:               <NumberInput
383:                 id="startNumber"
384:                 min={0}
385:                 max={10000}
386:                 step={1}
387:                 value={ticketConfig.startNumber}
388:                 onChange={(val) => setTicketConfig({ startNumber: val })}
389:               />
390:             </div>
391:           </div>
392:         </div>
393: 
394:         {/* Sección: Tipografía y Tamaños de Fuente */}
395:         <div className="space-y-3 pt-2 border-t border-slate-800">
396:           <div className="flex items-center justify-between">
397:             <button
398:               type="button"
399:               onClick={() => setShowTypography(!showTypography)}
400:               className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 uppercase tracking-wider hover:text-amber-300 transition-colors cursor-pointer"
401:             >
402:               <Type className="h-3.5 w-3.5" />
403:               <span>Tamaño de Letra del Boleto</span>
404:               {showTypography ? (
405:                 <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
406:               ) : (
407:                 <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
408:               )}
409:             </button>
410: 
411:             {showTypography && (
412:               <button
413:                 type="button"
414:                 onClick={handleResetTypography}
415:                 className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
416:                 title="Restablecer tamaños sugeridos"
417:               >
418:                 <RotateCcw className="h-3 w-3" />
419:                 <span>Restablecer</span>
420:               </button>
421:             )}
422:           </div>
423: 
424:           {showTypography && (
425:             <div className="rounded-lg border border-slate-700/80 bg-slate-900/50 p-3.5 space-y-4 shadow-inner">
426:               {/* Tamaño de Premios */}
427:               <div className="space-y-1.5">
428:                 <div className="flex items-center justify-between text-xs">
429:                   <span className="text-slate-200 font-medium">Tamaño de Premios:</span>
430:                   <div className="flex items-center gap-1.5">
431:                     {isPrizesSizeAutoAdjusted && (
432:                       <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono">
433:                         Auto: {effectivePrizesSize} px
434:                       </span>
435:                     )}
436:                     <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
437:                       {prizesSize} px
438:                     </span>
439:                   </div>
440:                 </div>
441:                 <Slider
442:                   min={6}
443:                   max={14}
444:                   step={1}
445:                   value={prizesSize}
446:                   onChange={(val) => setTicketConfig({ prizesFontSize: val })}
447:                   showValueBadge={false}
448:                 />
449:                 {/* Selector de columnas de premios */}
450:                 <div className="flex items-center justify-between pt-1 text-xs">
451:                   <span className="text-slate-300">Columnas de premios:</span>
452:                   <div className="flex rounded bg-slate-800 p-0.5 border border-slate-700/60">
453:                     {[
454:                       { id: "auto", label: `Auto (${numCols})` },
455:                       { id: 2, label: "2 col" },
456:                       { id: 3, label: "3 col" },
457:                       { id: 4, label: "4 col" },
458:                     ].map((colOpt) => {
459:                       const active = (ticketConfig.prizeColumns ?? "auto") === colOpt.id;
460:                       return (
461:                         <button
462:                           key={String(colOpt.id)}
463:                           type="button"
464:                           onClick={() => setTicketConfig({ prizeColumns: colOpt.id as 2 | 3 | 4 | "auto" })}
465:                           className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors cursor-pointer ${
466:                             active
467:                               ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold"
468:                               : "text-slate-400 hover:text-slate-200"
469:                           }`}
470:                         >
471:                           {colOpt.label}
472:                         </button>
473:                       );
474:                     })}
475:                   </div>
476:                 </div>
477: 
478:                 {isPrizesSizeAutoAdjusted ? (
479:                   <div className="space-y-1 bg-amber-950/20 border border-amber-500/30 rounded p-2">
480:                     <p className="text-[10px] text-amber-400/90 leading-tight">
481:                       💡 Con {numPrizes} premios en {numCols} columnas ({prizeRows} filas) y boleto de {printConfig.ticketHeight}mm, el sistema ajusta a {effectivePrizesSize}px para garantizar que <strong>aparezcan todos completos sin cortarse</strong>.
482:                     </p>
483:                     <div className="flex flex-wrap gap-1.5 pt-0.5">
484:                       {numCols < 4 && (
485:                         <button
486:                           type="button"
487:                           onClick={() => setTicketConfig({ prizeColumns: (numCols + 1) as 3 | 4 })}
488:                           className="text-[10px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 transition-colors cursor-pointer"
489:                         >
490:                           Usar {numCols + 1} columnas (letra más grande)
491:                         </button>
492:                       )}
493:                       {printConfig.ticketHeight < 65 && (
494:                         <button
495:                           type="button"
496:                           onClick={() => setPrintConfig({ ticketHeight: 65 })}
497:                           className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded border border-slate-600 transition-colors cursor-pointer"
498:                         >
499:                           Aumentar alto a 65mm
500:                         </button>
501:                       )}
502:                     </div>
503:                   </div>
504:                 ) : (
505:                   <p className="text-[10px] text-emerald-400/90 flex items-center gap-1">
506:                     ✓ Todos los {numPrizes} premios se muestran completos a {prizesSize}px en {numCols} columnas.
507:                   </p>
508:                 )}
509:               </div>
510: 
511:               {/* Tamaño del Título */}
512:               <div className="space-y-1.5">
513:                 <div className="flex items-center justify-between text-xs">
514:                   <span className="text-slate-200 font-medium">Tamaño de Título:</span>
515:                   <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
516:                     {titleSize} px
517:                   </span>
518:                 </div>
519:                 <Slider
520:                   min={10}
521:                   max={22}
522:                   step={1}
523:                   value={titleSize}
524:                   onChange={(val) => setTicketConfig({ titleFontSize: val })}
525:                   showValueBadge={false}
526:                 />
527:               </div>
528: 
529:               {/* Tamaño del Subtítulo */}
530:               <div className="space-y-1.5">
531:                 <div className="flex items-center justify-between text-xs">
532:                   <span className="text-slate-200 font-medium">Tamaño de Subtítulo:</span>
533:                   <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
534:                     {subtitleSize} px
535:                   </span>
536:                 </div>
537:                 <Slider
538:                   min={9}
539:                   max={18}
540:                   step={1}
541:                   value={subtitleSize}
542:                   onChange={(val) => setTicketConfig({ subtitleFontSize: val })}
543:                   showValueBadge={false}
544:                 />
545:               </div>
546: 
547:               {/* Tamaño de Texto del Talón */}
548:               <div className="space-y-1.5">
549:                 <div className="flex items-center justify-between text-xs">
550:                   <span className="text-slate-200 font-medium">Tamaño de Texto del Talón:</span>
551:                   <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
552:                     {stubFontSize} px
553:                   </span>
554:                 </div>
555:                 <Slider
556:                   min={7}
557:                   max={14}
558:                   step={1}
559:                   value={stubFontSize}
560:                   onChange={(val) => setTicketConfig({ stubFontSize: val })}
561:                   showValueBadge={false}
562:                 />
563:               </div>
564: 
565:               {/* Presets rápidos de escala */}
566:               <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between">
567:                 <span className="text-[11px] text-slate-400">Escala general:</span>
568:                 <div className="flex gap-1">
569:                   {[
570:                     { label: "Compacto", scale: 85 },
571:                     { label: "Normal", scale: 100 },
572:                     { label: "Grande", scale: 115 },
573:                   ].map((preset) => (
574:                     <button
575:                       key={preset.scale}
576:                       type="button"
577:                       onClick={() => setTicketConfig({ generalFontScale: preset.scale })}
578:                       className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
579:                         fontScale === preset.scale
580:                           ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
581:                           : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
582:                       }`}
583:                     >
584:                       {preset.label}
585:                     </button>
586:                   ))}
587:                 </div>
588:               </div>
589:             </div>
590:           )}
591:         </div>
592: 
593:         {/* Sección: Tamaño del Talón de Control */}
594:         <div className="space-y-3 pt-2 border-t border-slate-800">
595:           <div className="flex items-center justify-between">
596:             <button
597:               type="button"
598:               onClick={() => setShowStubConfig(!showStubConfig)}
599:               className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 uppercase tracking-wider hover:text-amber-300 transition-colors cursor-pointer"
600:             >
601:               <Scissors className="h-3.5 w-3.5" />
602:               <span>Tamaño del Talón de Control</span>
603:               {showStubConfig ? (
604:                 <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
605:               ) : (
606:                 <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
607:               )}
608:             </button>
609: 
610:             <span className="font-mono text-xs font-bold text-amber-400 bg-slate-900/80 border border-slate-700/80 px-2 py-0.5 rounded">
611:               {stubWidth} mm ({stubPercent}%)
612:             </span>
613:           </div>
614: 
615:           {showStubConfig && (
616:             <div className="rounded-lg border border-slate-700/80 bg-slate-900/50 p-3.5 space-y-3 shadow-inner">
617:               <div className="space-y-1.5">
618:                 <div className="flex items-center justify-between text-xs">
619:                   <span className="text-slate-200 font-medium">Ancho del Talón:</span>
620:                   <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
621:                     {stubWidth} mm ({stubPercent}%)
622:                   </span>
623:                 </div>
624:                 <Slider
625:                   min={18}
626:                   max={Math.max(25, Math.round(printConfig.ticketWidth * 0.48))}
627:                   step={1}
628:                   value={stubWidth}
629:                   onChange={(val) => setPrintConfig({ stubWidth: val })}
630:                   showValueBadge={false}
631:                 />
632:                 <p className="text-[10px] text-slate-400">
633:                   Modifica el ancho del talón desprendible respecto al cuerpo principal del boleto.
634:                 </p>
635:               </div>
636: 
637:               {/* Presets rápidos */}
638:               <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between">
639:                 <span className="text-[11px] text-slate-400">Preajustes:</span>
640:                 <div className="flex flex-wrap gap-1">
641:                   {[
642:                     { label: "Estrecho (28mm)", w: 28 },
643:                     { label: "Estándar (36mm)", w: 36 },
644:                     { label: "Medio (42mm)", w: 42 },
645:                     { label: "Amplio (48mm)", w: 48 },
646:                   ].map((preset) => (
647:                     <button
648:                       key={preset.w}
649:                       type="button"
650:                       onClick={() => setPrintConfig({ stubWidth: preset.w })}
651:                       className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
652:                         stubWidth === preset.w
653:                           ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
654:                           : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
655:                       }`}
656:                     >
657:                       {preset.label}
658:                     </button>
659:                   ))}
660:                 </div>
661:               </div>
662:             </div>
663:           )}
664:         </div>
665: 
666:         {/* Sección: Lista de Premios */}
667:         <div className="pt-2 border-t border-slate-800">
668:           <PrizeEditor />
669:         </div>
670:       </CardContent>
671:     </Card>
672:   );
673: }
````

## File: src/lib/constants.ts
````typescript
 1: import { Prize, TicketConfig, PrintConfig } from "@/types";
 2: 
 3: export const DEFAULT_PRIZES: Prize[] = [
 4:   { position: 1, label: "1°", description: "Parrilla y accesorios" },
 5:   { position: 2, label: "2°", description: "Olla" },
 6:   { position: 3, label: "3°", description: "Asado Battisti (3kg de asado, ens., vino, 2 gas.)" },
 7:   { position: 4, label: "4°", description: "Almuerzo en Garden" },
 8:   { position: 5, label: "5°", description: "Cena para dos - Club Restobar" },
 9:   { position: 6, label: "6°", description: "Juego de mate" },
10:   { position: 7, label: "7°", description: "Torta Pirineos" },
11:   { position: 8, label: "8°", description: "Perfume o billetera" },
12:   { position: 9, label: "9°", description: "Cena – Benito Pizzería" },
13:   { position: 10, label: "10°", description: "Combo de limpieza" },
14:   { position: 11, label: "11°", description: "Bombilla Messi" },
15:   { position: 12, label: "12°", description: "Remera y gorra Argentina" },
16:   { position: 13, label: "13°", description: "Bandolera" },
17:   { position: 14, label: "14°", description: "Bufanda" },
18:   { position: 15, label: "15°", description: "Combo de masas dulces" },
19:   { position: 16, label: "16°", description: "Torta matera" },
20:   { position: 17, label: "17°", description: "Body splash" },
21:   { position: 18, label: "18°", description: "Vaso térmico Ailuz Creaciones" },
22:   { position: 19, label: "19°", description: "Voucher Battisti Mayorista ($19.900)" },
23:   { position: 20, label: "20°", description: "Vino" },
24: ];
25: 
26: export const DEFAULT_TICKET_CONFIG: TicketConfig = {
27:   eventName: 'ESCUELA NRO. 71 "PEDRO GOYENA"',
28:   subtitle: "Gran Rifa Especial Día del Padre",
29:   organizer: "Escuela Nro. 71 Pedro Goyena",
30:   drawDate: "Viernes 19 de Junio de 2026",
31:   price: 3000,
32:   priceLabel: "VALOR: $3.000",
33:   totalTickets: 900,
34:   startNumber: 1,
35:   contributionText: "Tu colaboración apoya los proyectos de nuestra comunidad educativa.",
36:   prizes: DEFAULT_PRIZES,
37:   prizesFontSize: 8,
38:   titleFontSize: 14,
39:   subtitleFontSize: 12,
40:   stubFontSize: 10,
41:   generalFontScale: 100,
42:   prizeColumns: "auto",
43:   primaryColor: "#991b1b",
44: };
45: 
46: export const EMPTY_TICKET_CONFIG: TicketConfig = {
47:   eventName: "",
48:   subtitle: "",
49:   organizer: "",
50:   drawDate: "",
51:   price: 0,
52:   priceLabel: "",
53:   totalTickets: 100,
54:   startNumber: 1,
55:   contributionText: "",
56:   prizes: [],
57:   prizesFontSize: 8,
58:   titleFontSize: 14,
59:   subtitleFontSize: 12,
60:   stubFontSize: 10,
61:   generalFontScale: 100,
62:   prizeColumns: "auto",
63:   primaryColor: "#991b1b",
64: };
65: 
66: export const COLOR_PRESETS = [
67:   { name: "Rojo Carmesí", hex: "#991b1b", preview: "bg-red-800" },
68:   { name: "Rojo Fuego", hex: "#dc2626", preview: "bg-red-600" },
69:   { name: "Azul Real", hex: "#1d4ed8", preview: "bg-blue-700" },
70:   { name: "Azul Marino", hex: "#1e3a8a", preview: "bg-blue-900" },
71:   { name: "Verde Esmeralda", hex: "#047857", preview: "bg-emerald-700" },
72:   { name: "Verde Bosque", hex: "#14532d", preview: "bg-green-900" },
73:   { name: "Borgoña / Vino", hex: "#831843", preview: "bg-pink-900" },
74:   { name: "Dorado / Ámbar", hex: "#b45309", preview: "bg-amber-700" },
75:   { name: "Púrpura / Violeta", hex: "#6b21a8", preview: "bg-purple-800" },
76:   { name: "Negro Carbón", hex: "#18181b", preview: "bg-zinc-900" },
77: ];
78: 
79: export const DEFAULT_PRINT_CONFIG: PrintConfig = {
80:   ticketsPerRow: 1,
81:   ticketsPerColumn: 5,
82:   pageWidth: 210, // A4
83:   pageHeight: 297, // A4
84:   marginTop: 3,
85:   marginBottom: 3,
86:   marginLeft: 3,
87:   marginRight: 3,
88:   ticketWidth: 130,
89:   ticketHeight: 50,
90:   stubWidth: 36,
91:   allowSideTickets: true,
92:   gap: 2,
93: };
94: 
95: export const A4_WIDTH_PT = 595.28;
96: export const A4_HEIGHT_PT = 841.89;
97: export const MM_TO_PT = 2.8346;
````

## File: src/services/pdf-generator.ts
````typescript
  1: import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont, degrees, pushGraphicsState, popGraphicsState, translate, rotateRadians } from "pdf-lib";
  2: import { TicketConfig, PrintConfig } from "@/types";
  3: import { formatTicketNumber, getDigitsNeeded, formatCurrency, hexToRgb, formatShortDate, resolvePrizeColumns } from "@/lib/utils";
  4: import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";
  5: 
  6: interface PDFGeneratorOptions {
  7:   ticketConfig: TicketConfig;
  8:   printConfig: PrintConfig;
  9:   onProgress?: (current: number, total: number) => void;
 10: }
 11: 
 12: // Colores del ticket
 13: const BLACK = rgb(0.05, 0.05, 0.05);
 14: const DARK_GRAY = rgb(0.3, 0.3, 0.3);
 15: const MED_GRAY = rgb(0.5, 0.5, 0.5);
 16: const LIGHT_GRAY = rgb(0.78, 0.78, 0.78);
 17: const BORDER_COLOR = rgb(0.25, 0.25, 0.25);
 18: const BG_STUB = rgb(0.97, 0.97, 0.97);
 19: 
 20: interface Fonts {
 21:   font: PDFFont;
 22:   fontBold: PDFFont;
 23:   fontItalic: PDFFont;
 24:   fontBoldItalic: PDFFont;
 25:   courierBold: PDFFont;
 26: }
 27: 
 28: // Genera el PDF completo con todos los tickets
 29: export async function generateRifaPDF(options: PDFGeneratorOptions): Promise<Uint8Array> {
 30:   const { ticketConfig, printConfig, onProgress } = options;
 31: 
 32:   const pdfDoc = await PDFDocument.create();
 33:   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
 34:   const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
 35:   const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
 36:   const fontBoldItalic = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);
 37:   const courierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);
 38:   const fonts: Fonts = { font, fontBold, fontItalic, fontBoldItalic, courierBold };
 39:   const digits = getDigitsNeeded(ticketConfig.totalTickets, ticketConfig.startNumber);
 40: 
 41:   // Dimensiones en puntos
 42:   const margin = printConfig.marginTop * MM_TO_PT;
 43:   const gap = printConfig.gap * MM_TO_PT;
 44:   const tW = printConfig.ticketWidth * MM_TO_PT;
 45:   const tH = printConfig.ticketHeight * MM_TO_PT;
 46:   const availW = A4_WIDTH_PT - margin * 2;
 47:   const availH = A4_HEIGHT_PT - margin * 2;
 48: 
 49:   // Grilla de tickets horizontales
 50:   const cols = Math.max(1, Math.floor((availW + gap) / (tW + gap)));
 51:   const rows = Math.max(1, Math.floor((availH + gap) / (tH + gap)));
 52:   const horizPerPage = cols * rows;
 53:   const gridW = cols * tW + (cols - 1) * gap;
 54: 
 55:   // Tickets alineados a la izquierda para maximizar espacio derecho
 56:   const gridStartX = margin;
 57: 
 58:   // Columna lateral derecha: tickets verticales (rotados 90°)
 59:   const rightRem = A4_WIDTH_PT - gridStartX - gridW - gap - margin;
 60:   const canFitSide = (printConfig.allowSideTickets ?? true) && (rightRem >= tH);
 61:   // Cada ticket rotado: ancho en página = tH, alto en página = tW
 62:   const sideCount = canFitSide ? Math.floor((availH + gap) / (tW + gap)) : 0;
 63:   const totalPerPage = horizPerPage + sideCount;
 64:   const totalPages = Math.ceil(ticketConfig.totalTickets / totalPerPage);
 65: 
 66:   let idx = 0;
 67:   for (let p = 0; p < totalPages; p++) {
 68:     const page = pdfDoc.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);
 69: 
 70:     // Dibujar tickets horizontales
 71:     for (let row = 0; row < rows; row++) {
 72:       for (let col = 0; col < cols; col++) {
 73:         if (idx >= ticketConfig.totalTickets) break;
 74:         const formatted = formatTicketNumber(ticketConfig.startNumber + idx, digits);
 75:         const x = gridStartX + col * (tW + gap);
 76:         const y = A4_HEIGHT_PT - margin - (row + 1) * tH - row * gap;
 77:         drawTicket(page, x, y, tW, tH, formatted, ticketConfig, fonts, printConfig);
 78:         idx++;
 79:       }
 80:     }
 81: 
 82:     // Dibujar tickets verticales en el costado derecho (mismo ticket rotado 90° con fidelidad vectorial total)
 83:     if (canFitSide) {
 84:       for (let i = 0; i < sideCount; i++) {
 85:         if (idx >= ticketConfig.totalTickets) break;
 86:         const formatted = formatTicketNumber(ticketConfig.startNumber + idx, digits);
 87:         const rx = gridStartX + gridW + gap;
 88:         const ry = A4_HEIGHT_PT - margin - (i + 1) * tW - i * gap;
 89: 
 90:         // Transformación gráfica directa nativa de PDF:
 91:         // Origen trasladado a (rx, ry + tW) y rotado 90° horario (-Math.PI / 2).
 92:         // Se dibuja directamente usando las fuentes del documento principal sin pérdida de texto ni overhead.
 93:         page.pushOperators(
 94:           pushGraphicsState(),
 95:           translate(rx, ry + tW),
 96:           rotateRadians(-Math.PI / 2)
 97:         );
 98: 
 99:         drawTicket(page, 0, 0, tW, tH, formatted, ticketConfig, fonts, printConfig);
100: 
101:         page.pushOperators(popGraphicsState());
102: 
103:         idx++;
104:       }
105:     }
106: 
107:     // Reportar progreso y ceder control al navegador para que la UI se actualice
108:     if (onProgress) {
109:       onProgress(Math.min(idx, ticketConfig.totalTickets), ticketConfig.totalTickets);
110:       // Ceder el hilo para que React pueda re-renderizar la barra de progreso
111:       await new Promise(resolve => setTimeout(resolve, 0));
112:     }
113:   }
114:   return pdfDoc.save();
115: }
116: 
117: // Dibuja un ticket horizontal completo (sección principal + talón)
118: function drawTicket(
119:   page: PDFPage, x: number, y: number, w: number, h: number,
120:   ticketNumber: string, config: TicketConfig, fonts: Fonts,
121:   printConfig?: PrintConfig
122: ) {
123:   const { font, fontBold, fontItalic, fontBoldItalic, courierBold } = fonts;
124:   // Factor de escala basado en la altura del ticket y configuración tipográfica
125:   const s = h / 160;
126:   const fontScale = (config.generalFontScale ?? 100) / 100;
127:   const titleMultiplier = (config.titleFontSize ?? 14) / 14;
128:   const subtitleMultiplier = (config.subtitleFontSize ?? 12) / 12;
129: 
130:   const TITLE_SIZE = Math.max(4, 8.5 * s * titleMultiplier * fontScale);
131:   const SUBTITLE_SIZE = Math.max(3.5, 7.5 * s * subtitleMultiplier * fontScale);
132:   const INFO_SIZE = Math.max(3, 4.8 * s * fontScale);
133:   const PRICE_SIZE = Math.max(4, 9 * s * fontScale);
134:   const NUM_SIZE = Math.max(5, 12 * s * fontScale);
135: 
136:   // Sección principal y talón de control personalizable
137:   const rawStubW = (printConfig?.stubWidth ?? 36) * MM_TO_PT;
138:   // Clamped entre 15mm y w - 25mm para garantizar integridad estructural
139:   const stubW = Math.min(Math.max(15 * MM_TO_PT, rawStubW), Math.max(20 * MM_TO_PT, w - 25 * MM_TO_PT));
140:   const mainW = w - stubW;
141:   const stubX = x + mainW;
142:   const pad = 4.5 * s;
143: 
144:   // Tipografía del talón ajustada a su tamaño
145:   const stubFontMultiplier = (config.stubFontSize ?? 10) / 10;
146:   const stubWidthScale = Math.min(1.2, Math.max(0.7, stubW / (36 * MM_TO_PT)));
147:   const STUB_TITLE_SIZE = Math.max(3, 7 * s * stubFontMultiplier * stubWidthScale * fontScale);
148:   const STUB_LABEL_SIZE = Math.max(2.5, 5.8 * s * stubFontMultiplier * stubWidthScale * fontScale);
149:   const STUB_INFO_SIZE = Math.max(2.3, 5.2 * s * stubFontMultiplier * stubWidthScale * fontScale);
150:   const STUB_NUM_SIZE = Math.max(3.5, 10.5 * s * stubFontMultiplier * stubWidthScale * fontScale);
151:   const STUB_VAL_SIZE = Math.max(2.5, 5.8 * s * stubFontMultiplier * stubWidthScale * fontScale);
152: 
153:   // Fondos y bordes
154:   page.drawRectangle({ x, y, width: w, height: h, color: rgb(1, 1, 1) });
155:   page.drawRectangle({ x: stubX, y, width: stubW, height: h, color: BG_STUB });
156:   page.drawRectangle({ x, y, width: w, height: h, borderColor: BORDER_COLOR, borderWidth: 0.5 });
157:   // Línea punteada vertical separadora
158:   dashedLineV(page, stubX, y + 2, y + h - 2, 4, 3, 0.4, MED_GRAY);
159: 
160:   const cx = x + pad;
161:   const mainRight = stubX - pad;
162:   const mainContentW = mainRight - cx;
163:   const bottomY = y + pad;
164:   let cy = y + h - pad;
165: 
166:   const { r, g, b } = hexToRgb(config.primaryColor ?? "#991b1b");
167:   const ACCENT_COLOR = rgb(r, g, b);
168: 
169:   // Encabezado del ticket
170:   cy -= TITLE_SIZE;
171:   page.drawText(config.eventName, { x: cx, y: cy, size: TITLE_SIZE, font: fontBold, color: BLACK });
172:   cy -= SUBTITLE_SIZE + 1.8 * s;
173:   page.drawText(config.subtitle, { x: cx, y: cy, size: SUBTITLE_SIZE, font: fontBoldItalic, color: ACCENT_COLOR });
174:   cy -= INFO_SIZE + 2 * s;
175:   page.drawText(`Sorteo: ${config.drawDate}`, { x: cx, y: cy, size: INFO_SIZE, font, color: DARK_GRAY });
176:   cy -= INFO_SIZE + 1.2 * s;
177:   const contText = `Contribución: ${config.contributionText}`;
178:   const maxCont = Math.floor(mainContentW / (INFO_SIZE * 0.52));
179:   const ct = contText.length > maxCont ? contText.substring(0, maxCont - 1) + "…" : contText;
180:   page.drawText(ct, { x: cx, y: cy, size: INFO_SIZE, font, color: DARK_GRAY });
181: 
182:   // Caja de premios
183:   cy -= 2.5 * s;
184:   const prizesTop = cy;
185:   const prizesBottom = bottomY + Math.max(PRICE_SIZE, NUM_SIZE) + pad + 1.5 * s;
186:   const prizesBoxH = Math.max(20, prizesTop - prizesBottom);
187:   page.drawRectangle({ x: cx, y: prizesBottom, width: mainContentW, height: prizesBoxH, borderColor: LIGHT_GRAY, borderWidth: 0.3 });
188: 
189:   // Cabecera de la caja de premios
190:   const PRIZE_HEADER_SIZE = Math.max(3.5, Math.min(6.5 * s * fontScale, prizesBoxH * 0.16));
191:   const phY = prizesTop - PRIZE_HEADER_SIZE - 1.5 * s;
192:   page.drawText("LISTA DE PREMIOS:", { x: cx + 3, y: phY, size: PRIZE_HEADER_SIZE, font: fontBold, color: BLACK });
193: 
194:   // Cálculo dinámico de multicolumna para que entren TODOS los premios sin límite
195:   const requestedPrizesFontSize = config.prizesFontSize ?? 8;
196:   const numCols = resolvePrizeColumns(config.prizeColumns, config.prizes.length, requestedPrizesFontSize);
197:   const rowsCount = Math.max(1, Math.ceil(config.prizes.length / numCols));
198:   const prizeAreaTop = phY - PRIZE_HEADER_SIZE - 1.5 * s;
199:   const availablePrizeH = Math.max(10, prizeAreaTop - prizesBottom - 1 * s);
200:   const actualLineH = availablePrizeH / rowsCount;
201: 
202:   // Ajuste inteligente de tamaño de fuente para que entren TODOS los premios en el alto disponible
203:   const desiredPrizePt = 5 * s * (requestedPrizesFontSize / 8) * fontScale;
204:   const actualPrizeFontSize = Math.max(2.4, Math.min(desiredPrizePt, actualLineH * 0.82));
205: 
206:   // Distribuir premios en columnas
207:   const prizeColumns = Array.from({ length: numCols }, (_, c) =>
208:     config.prizes.filter((_, i) => i % numCols === c)
209:   );
210: 
211:   const colWidth = mainContentW / numCols;
212:   const colContentW = colWidth - 2.5 * s;
213:   const maxChars = Math.max(6, Math.floor(colContentW / (actualPrizeFontSize * 0.52)));
214: 
215:   // Renderizar TODOS los premios de todas las columnas
216:   prizeColumns.forEach((colPrizes, colIdx) => {
217:     const colX = cx + 2.5 * s + colIdx * colWidth;
218:     colPrizes.forEach((p, rowIdx) => {
219:       const t = `${p.label} ${p.description}`;
220:       const tr = t.length > maxChars ? t.substring(0, maxChars - 2) + ".." : t;
221:       page.drawText(tr, {
222:         x: colX,
223:         y: prizeAreaTop - (rowIdx + 0.85) * actualLineH,
224:         size: actualPrizeFontSize,
225:         font: fontItalic,
226:         color: ACCENT_COLOR,
227:       });
228:     });
229:   });
230: 
231:   // Pie: VALOR a la izquierda, N° a la derecha
232:   page.drawText(config.priceLabel, { x: cx, y: bottomY, size: PRICE_SIZE, font: fontBold, color: BLACK });
233:   const numText = `N° ${ticketNumber}`;
234:   const numW = courierBold.widthOfTextAtSize(numText, NUM_SIZE);
235:   page.drawText(numText, { x: mainRight - numW, y: bottomY, size: NUM_SIZE, font: courierBold, color: ACCENT_COLOR });
236: 
237:   // === TALÓN DE CONTROL ===
238:   const sp = 4 * s;
239:   const scx = stubX + sp;
240:   const sr = stubX + stubW - sp;
241:   const scW = sr - scx;
242:   let sy = y + h - pad;
243: 
244:   // Título del talón centrado
245:   sy -= STUB_TITLE_SIZE;
246:   const stT = "TALÓN DE CONTROL";
247:   const stTW = fontBold.widthOfTextAtSize(stT, STUB_TITLE_SIZE);
248:   page.drawText(stT, { x: scx + (scW - stTW) / 2, y: sy, size: STUB_TITLE_SIZE, font: fontBold, color: BLACK });
249:   sy -= 3 * s;
250:   page.drawLine({ start: { x: scx, y: sy }, end: { x: sr, y: sy }, thickness: 0.25, color: LIGHT_GRAY });
251: 
252:   // Fecha del sorteo (dinámica desde la configuración)
253:   sy -= STUB_INFO_SIZE + 2 * s;
254:   const ds = `Sorteo: ${formatShortDate(config.drawDate)}`;
255:   const dsW = font.widthOfTextAtSize(ds, STUB_INFO_SIZE);
256:   page.drawText(ds, { x: scx + (scW - dsW) / 2, y: sy, size: STUB_INFO_SIZE, font, color: MED_GRAY });
257: 
258:   // Campo nombre
259:   sy -= STUB_LABEL_SIZE + 4 * s;
260:   page.drawText("Nombre y Apellido:", { x: scx, y: sy, size: STUB_LABEL_SIZE, font: fontBold, color: BLACK });
261:   sy -= 4 * s;
262:   page.drawLine({ start: { x: scx, y: sy }, end: { x: sr, y: sy }, thickness: 0.25, color: DARK_GRAY });
263: 
264:   // Campo teléfono
265:   sy -= STUB_LABEL_SIZE + 4 * s;
266:   page.drawText("Teléfono:", { x: scx, y: sy, size: STUB_LABEL_SIZE, font: fontBold, color: BLACK });
267:   sy -= 4 * s;
268:   page.drawLine({ start: { x: scx, y: sy }, end: { x: sr, y: sy }, thickness: 0.25, color: DARK_GRAY });
269: 
270:   // Valor centrado
271:   sy -= STUB_VAL_SIZE + 5 * s;
272:   const vt = `Valor: ${formatCurrency(config.price)}`;
273:   const vtW = fontBold.widthOfTextAtSize(vt, STUB_VAL_SIZE);
274:   page.drawText(vt, { x: scx + (scW - vtW) / 2, y: sy, size: STUB_VAL_SIZE, font: fontBold, color: DARK_GRAY });
275: 
276:   // Número grande centrado
277:   sy -= STUB_NUM_SIZE + 3 * s;
278:   const sn = `N° ${ticketNumber}`;
279:   const snW = courierBold.widthOfTextAtSize(sn, STUB_NUM_SIZE);
280:   page.drawText(sn, { x: scx + (scW - snW) / 2, y: sy, size: STUB_NUM_SIZE, font: courierBold, color: ACCENT_COLOR });
281: 
282:   // Línea de corte horizontal debajo del ticket
283:   dashedLineH(page, x, y - 1, x + w, 4, 2.5, 0.2, LIGHT_GRAY);
284: }
285: 
286: // Dibuja una línea punteada vertical
287: function dashedLineV(page: PDFPage, x: number, yStart: number, yEnd: number, dash: number, gapLen: number, thickness: number, color: ReturnType<typeof rgb>) {
288:   let pos = yStart;
289:   while (pos < yEnd) {
290:     const end = Math.min(pos + dash, yEnd);
291:     page.drawLine({ start: { x, y: pos }, end: { x, y: end }, thickness, color });
292:     pos += dash + gapLen;
293:   }
294: }
295: 
296: // Dibuja una línea punteada horizontal
297: function dashedLineH(page: PDFPage, xStart: number, y: number, xEnd: number, dash: number, gapLen: number, thickness: number, color: ReturnType<typeof rgb>) {
298:   let pos = xStart;
299:   while (pos < xEnd) {
300:     const end = Math.min(pos + dash, xEnd);
301:     page.drawLine({ start: { x: pos, y }, end: { x: end, y }, thickness, color });
302:     pos += dash + gapLen;
303:   }
304: }
305: 
306: // Descarga el PDF generado como archivo
307: export function downloadPdf(pdfBytes: Uint8Array, filename: string) {
308:   const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
309:   const url = URL.createObjectURL(blob);
310:   const link = document.createElement("a");
311:   link.href = url;
312:   link.download = filename;
313:   document.body.appendChild(link);
314:   link.click();
315:   document.body.removeChild(link);
316:   URL.revokeObjectURL(url);
317: }
````

## File: src/components/TicketPreview.tsx
````typescript
  1: "use client";
  2: 
  3: import { useMemo } from "react";
  4: import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
  5: import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  6: import { Button } from "@/components/ui/button";
  7: import { useRifaStore } from "@/store/useRifaStore";
  8: import { formatTicketNumber, getDigitsNeeded, formatCurrency, formatShortDate, resolvePrizeColumns } from "@/lib/utils";
  9: import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";
 10: 
 11: export function TicketPreview() {
 12:   const { ticketConfig, printConfig, previewTicketNumber, setPreviewTicketNumber } = useRifaStore();
 13: 
 14:   // Memoized layout calculations to guarantee 60fps on low-end machines
 15:   const { digits, formattedNumber, maxNumber, ticketsPerPage, totalPages } = useMemo(() => {
 16:     const d = getDigitsNeeded(ticketConfig.totalTickets, ticketConfig.startNumber);
 17:     const fn = formatTicketNumber(previewTicketNumber, d);
 18:     const mn = ticketConfig.startNumber + ticketConfig.totalTickets - 1;
 19: 
 20:     const gap = printConfig.gap * MM_TO_PT;
 21:     const tW = printConfig.ticketWidth * MM_TO_PT;
 22:     const tH = printConfig.ticketHeight * MM_TO_PT;
 23:     const margin = printConfig.marginTop * MM_TO_PT;
 24:     const availW = A4_WIDTH_PT - margin * 2;
 25:     const availH = A4_HEIGHT_PT - margin * 2;
 26:     const cols = Math.max(1, Math.floor((availW + gap) / (tW + gap)));
 27:     const rows = Math.max(1, Math.floor((availH + gap) / (tH + gap)));
 28:     const gridW = cols * tW + (cols - 1) * gap;
 29:     const rightRem = A4_WIDTH_PT - margin - gridW - gap - margin;
 30:     const canFitSide = (printConfig.allowSideTickets ?? true) && (rightRem >= tH);
 31:     const sideCount = canFitSide ? Math.floor((availH + gap) / (tW + gap)) : 0;
 32:     const tpp = cols * rows + sideCount;
 33:     const tp = Math.ceil(ticketConfig.totalTickets / tpp);
 34: 
 35:     return {
 36:       digits: d,
 37:       formattedNumber: fn,
 38:       maxNumber: mn,
 39:       ticketsPerPage: tpp,
 40:       totalPages: tp,
 41:     };
 42:   }, [
 43:     ticketConfig.totalTickets,
 44:     ticketConfig.startNumber,
 45:     previewTicketNumber,
 46:     printConfig.gap,
 47:     printConfig.ticketWidth,
 48:     printConfig.ticketHeight,
 49:     printConfig.marginTop,
 50:     printConfig.allowSideTickets,
 51:   ]);
 52: 
 53:   // Dynamic typography calculations
 54:   const fontScale = (ticketConfig.generalFontScale ?? 100) / 100;
 55:   const titleSize = Math.round((ticketConfig.titleFontSize ?? 14) * fontScale);
 56:   const subtitleSize = Math.round((ticketConfig.subtitleFontSize ?? 12) * fontScale);
 57:   const requestedPrizesSize = ticketConfig.prizesFontSize ?? 8;
 58:   const primaryColor = ticketConfig.primaryColor ?? "#991b1b";
 59: 
 60:   // Dynamic stub dimensions and proportion calculations
 61:   const ticketWidth = printConfig.ticketWidth || 130;
 62:   const ticketHeight = printConfig.ticketHeight || 50;
 63:   const rawStubWidth = printConfig.stubWidth ?? 36;
 64:   const stubWidthMm = Math.min(Math.max(15, rawStubWidth), Math.max(20, ticketWidth - 25));
 65:   const stubPercent = (stubWidthMm / ticketWidth) * 100;
 66:   const mainPercent = 100 - stubPercent;
 67: 
 68:   // Resolve dynamic prize columns (2, 3, 4 or auto)
 69:   const numPrizeCols = resolvePrizeColumns(
 70:     ticketConfig.prizeColumns,
 71:     ticketConfig.prizes.length,
 72:     requestedPrizesSize
 73:   );
 74: 
 75:   const prizeColumnsList = useMemo(() => {
 76:     return Array.from({ length: numPrizeCols }, (_, c) =>
 77:       ticketConfig.prizes.filter((_, i) => i % numPrizeCols === c)
 78:     );
 79:   }, [ticketConfig.prizes, numPrizeCols]);
 80: 
 81:   // Auto-fitting prize font size calculation:
 82:   // Guarantees all prizes fit in the ticket height without dropping any!
 83:   const rowsCount = Math.max(1, Math.ceil(ticketConfig.prizes.length / numPrizeCols));
 84:   const heightFactor = ticketHeight / 50;
 85:   const maxFittingPrizesPx = Math.max(6, Math.floor((78 * heightFactor) / rowsCount));
 86:   const effectivePrizesSize = Math.max(5.5, Math.min(Math.round(requestedPrizesSize * fontScale), maxFittingPrizesPx));
 87:   const isAutoAdjusted = requestedPrizesSize > effectivePrizesSize;
 88:   const prizeHeaderSize = Math.max(7.5, Math.round(effectivePrizesSize * 1.05));
 89: 
 90:   // Stub typography calculations
 91:   const stubFontSizeBase = ticketConfig.stubFontSize ?? 10;
 92:   const stubMultiplier = stubFontSizeBase / 10;
 93:   const stubWidthFactor = Math.min(1.2, Math.max(0.75, stubWidthMm / 36));
 94:   const stubTitleSize = Math.max(8, Math.round(11 * stubMultiplier * stubWidthFactor * fontScale));
 95:   const stubDateSize = Math.max(7, Math.round(9 * stubMultiplier * stubWidthFactor * fontScale));
 96:   const stubLabelSize = Math.max(7.5, Math.round(10 * stubMultiplier * stubWidthFactor * fontScale));
 97:   const stubValSize = Math.max(8, Math.round(10 * stubMultiplier * stubWidthFactor * fontScale));
 98:   const stubNumSize = Math.max(12, Math.round(18 * stubMultiplier * stubWidthFactor * fontScale));
 99: 
100:   return (
101:     <Card className="shadow-xl border-slate-800/80">
102:       <CardHeader className="pb-3">
103:         <CardTitle className="flex items-center gap-2">
104:           <Eye className="h-5 w-5 text-amber-400" />
105:           <span>Vista Previa del Boleto</span>
106:           <span className="ml-auto text-xs font-normal text-slate-400 font-mono bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800">
107:             {ticketsPerPage}/pág • {totalPages} págs
108:           </span>
109:         </CardTitle>
110:       </CardHeader>
111:       <CardContent className="space-y-3 sm:space-y-4">
112:         {/* Navegación */}
113:         <div className="flex items-center justify-between bg-slate-900/40 p-1.5 rounded-lg border border-slate-800">
114:           <Button
115:             variant="ghost"
116:             size="sm"
117:             onClick={() => setPreviewTicketNumber(Math.max(ticketConfig.startNumber, previewTicketNumber - 1))}
118:             disabled={previewTicketNumber <= ticketConfig.startNumber}
119:             className="h-8 px-2 text-xs text-slate-300 hover:text-amber-400"
120:           >
121:             <ChevronLeft className="h-4 w-4 mr-1" />
122:             Anterior
123:           </Button>
124: 
125:           <span className="text-xs sm:text-sm text-amber-400/90 font-mono font-bold">
126:             N° {formattedNumber} <span className="text-slate-500 font-normal">/ {formatTicketNumber(maxNumber, digits)}</span>
127:           </span>
128: 
129:           <Button
130:             variant="ghost"
131:             size="sm"
132:             onClick={() => setPreviewTicketNumber(Math.min(maxNumber, previewTicketNumber + 1))}
133:             disabled={previewTicketNumber >= maxNumber}
134:             className="h-8 px-2 text-xs text-slate-300 hover:text-amber-400"
135:           >
136:             Siguiente
137:             <ChevronRight className="h-4 w-4 ml-1" />
138:           </Button>
139:         </div>
140: 
141:         {/* Ticket Visual — matches the PDF output exactly with proportional aspect ratio */}
142:         <div
143:           className="overflow-hidden rounded-lg border border-slate-600 bg-white shadow-2xl transition-none w-full"
144:           style={{
145:             minHeight: "220px",
146:             aspectRatio: `${ticketWidth} / ${ticketHeight}`,
147:           }}
148:         >
149:           <div className="flex w-full h-full">
150:             {/* Main ticket section */}
151:             <div
152:               className="flex flex-col justify-between p-3 sm:p-3.5 border-r-2 border-dashed border-gray-300 transition-all overflow-hidden h-full"
153:               style={{ width: `${mainPercent}%`, flex: `0 0 ${mainPercent}%` }}
154:             >
155:               {/* Header info */}
156:               <div>
157:                 <h2
158:                   className="font-bold text-gray-900 leading-tight break-words"
159:                   style={{ fontSize: `${titleSize}px` }}
160:                 >
161:                   {ticketConfig.eventName}
162:                 </h2>
163:                 <p
164:                   className="font-bold italic leading-snug"
165:                   style={{
166:                     color: primaryColor,
167:                     fontSize: `${subtitleSize}px`,
168:                     marginTop: `${Math.max(1, subtitleSize * 0.08)}px`,
169:                   }}
170:                 >
171:                   {ticketConfig.subtitle}
172:                 </p>
173:                 <p className="text-[10px] text-gray-600 mt-0.5">
174:                   Sorteo: {ticketConfig.drawDate}
175:                 </p>
176:                 <p className="text-[9px] text-gray-500 leading-tight mt-0.5 truncate">
177:                   Contribución: {ticketConfig.contributionText}
178:                 </p>
179: 
180:                 {/* Prizes box */}
181:                 <div className="mt-1.5 border border-gray-200 rounded p-1.5 bg-gray-50/50">
182:                   <div className="flex items-center justify-between mb-0.5">
183:                     <p
184:                       className="font-bold text-gray-900 tracking-wider"
185:                       style={{ fontSize: `${prizeHeaderSize}px` }}
186:                     >
187:                       LISTA DE PREMIOS:
188:                     </p>
189:                     {isAutoAdjusted && (
190:                       <span className="text-[8px] font-mono text-amber-700 bg-amber-100 px-1 rounded border border-amber-300">
191:                         Auto: {effectivePrizesSize}px
192:                       </span>
193:                     )}
194:                   </div>
195:                   <div
196:                     className="grid gap-x-2"
197:                     style={{
198:                       gridTemplateColumns: `repeat(${numPrizeCols}, minmax(0, 1fr))`,
199:                     }}
200:                   >
201:                     {prizeColumnsList.map((colPrizes, colIdx) => (
202:                       <div key={colIdx} className="space-y-[1px] min-w-0">
203:                         {colPrizes.map((prize) => (
204:                           <p
205:                             key={prize.position}
206:                             className="italic leading-none truncate py-[0.5px]"
207:                             style={{ color: primaryColor, fontSize: `${effectivePrizesSize}px` }}
208:                             title={`${prize.label} ${prize.description}`}
209:                           >
210:                             <span className="font-semibold">{prize.label}</span> {prize.description}
211:                           </p>
212:                         ))}
213:                       </div>
214:                     ))}
215:                   </div>
216:                 </div>
217:               </div>
218: 
219:               {/* Bottom: price + number */}
220:               <div className="flex items-end justify-between mt-2 pt-1 border-t border-gray-100">
221:                 <span className="text-sm sm:text-base font-bold text-gray-900">
222:                   {ticketConfig.priceLabel}
223:                 </span>
224:                 <span
225:                   className="text-xl sm:text-2xl font-bold font-mono leading-none"
226:                   style={{ color: primaryColor }}
227:                 >
228:                   N° {formattedNumber}
229:                 </span>
230:               </div>
231:             </div>
232: 
233:             {/* Stub section */}
234:             <div
235:               className="flex flex-col justify-between p-2 sm:p-3 bg-gray-50 transition-all overflow-hidden"
236:               style={{ width: `${stubPercent}%`, flex: `0 0 ${stubPercent}%` }}
237:             >
238:               <div>
239:                 <p
240:                   className="font-bold text-gray-900 text-center border-b border-gray-300 pb-1 truncate leading-tight"
241:                   style={{ fontSize: `${stubTitleSize}px` }}
242:                 >
243:                   TALÓN DE CONTROL
244:                 </p>
245:                 <p
246:                   className="text-gray-500 text-center mt-1 truncate"
247:                   style={{ fontSize: `${stubDateSize}px` }}
248:                 >
249:                   Sorteo: {formatShortDate(ticketConfig.drawDate)}
250:                 </p>
251:                 <div className="mt-2.5 space-y-2">
252:                   <div>
253:                     <p
254:                       className="font-bold text-gray-800 truncate"
255:                       style={{ fontSize: `${stubLabelSize}px` }}
256:                     >
257:                       Nombre y Apellido:
258:                     </p>
259:                     <div className="border-b border-gray-400 mt-1 h-2.5" />
260:                   </div>
261:                   <div>
262:                     <p
263:                       className="font-bold text-gray-800 truncate"
264:                       style={{ fontSize: `${stubLabelSize}px` }}
265:                     >
266:                       Teléfono:
267:                     </p>
268:                     <div className="border-b border-gray-400 mt-1 h-2.5" />
269:                   </div>
270:                 </div>
271:               </div>
272:               <div className="text-center mt-2">
273:                 <p
274:                   className="font-semibold text-gray-600 truncate"
275:                   style={{ fontSize: `${stubValSize}px` }}
276:                 >
277:                   Valor: {formatCurrency(ticketConfig.price)}
278:                 </p>
279:                 <p
280:                   className="font-bold font-mono mt-0.5 truncate"
281:                   style={{ color: primaryColor, fontSize: `${stubNumSize}px` }}
282:                 >
283:                   N° {formattedNumber}
284:                 </p>
285:               </div>
286:             </div>
287:           </div>
288:         </div>
289: 
290:         {/* Cut line indicator with live proportions */}
291:         <div className="space-y-1 select-none">
292:           <div className="flex items-center gap-2">
293:             <div className="border-t-2 border-dashed border-slate-600" style={{ width: `${mainPercent}%` }} />
294:             <span className="text-[9px] text-amber-400/90 uppercase tracking-wider font-mono shrink-0">
295:               ✂ línea de corte
296:             </span>
297:             <div className="border-t-2 border-dashed border-slate-600" style={{ width: `${stubPercent}%` }} />
298:           </div>
299:           <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-0.5">
300:             <span>Cuerpo: {Math.round(mainPercent)}% ({ticketWidth - stubWidthMm} mm)</span>
301:             <span className="text-amber-300/90 font-semibold">Talón: {Math.round(stubPercent)}% ({stubWidthMm} mm)</span>
302:           </div>
303:         </div>
304:       </CardContent>
305:     </Card>
306:   );
307: }
````

## File: src/components/Header.tsx
````typescript
  1: "use client";
  2: 
  3: import { useState, useEffect } from "react";
  4: import Link from "next/link";
  5: import Image from "next/image";
  6: import { usePathname } from "next/navigation";
  7: import {
  8:   FolderOpen,
  9:   Save,
 10:   LogIn,
 11:   LogOut,
 12:   Check,
 13:   Sparkles,
 14:   ArrowRight,
 15:   Sliders,
 16:   Home
 17: } from "lucide-react";
 18: import { Button } from "@/components/ui/button";
 19: import { useAuth } from "@/hooks/useAuth";
 20: import { AuthModal } from "@/components/auth/AuthModal";
 21: import { ProfileModal } from "@/components/auth/ProfileModal";
 22: import { SavedTicketsDrawer } from "@/components/SavedTicketsDrawer";
 23: import { useRifaStore } from "@/store/useRifaStore";
 24: import { saveTicketDesign, getSavedTickets } from "@/services/tickets-service";
 25: 
 26: export function Header() {
 27:   const pathname = usePathname();
 28:   const isEditor = pathname === "/editor";
 29:   const {
 30:     user,
 31:     loading,
 32:     signOut,
 33:     initAuth,
 34:     isAuthModalOpen,
 35:     openAuthModal,
 36:     closeAuthModal,
 37:     isProfileModalOpen,
 38:     openProfileModal,
 39:     closeProfileModal,
 40:     isDrawerOpen,
 41:     openDrawer,
 42:     closeDrawer,
 43:   } = useAuth();
 44:   const { ticketConfig, printConfig } = useRifaStore();
 45: 
 46:   const [saving, setSaving] = useState(false);
 47:   const [saveSuccess, setSaveSuccess] = useState(false);
 48:   const [savedCount, setSavedCount] = useState(0);
 49: 
 50:   // Inicializar listener de Supabase
 51:   useEffect(() => {
 52:     const unsub = initAuth();
 53:     return () => unsub?.();
 54:   }, [initAuth]);
 55: 
 56:   // Cargar cantidad de boletos guardados
 57:   const refreshCount = async () => {
 58:     try {
 59:       const list = await getSavedTickets();
 60:       setSavedCount(list.length);
 61:     } catch {
 62:       // Fallback silencioso
 63:     }
 64:   };
 65: 
 66:   useEffect(() => {
 67:     refreshCount();
 68:   }, [user]);
 69: 
 70:   const handleSave = async () => {
 71:     if (!user) {
 72:       openAuthModal();
 73:       return;
 74:     }
 75: 
 76:     setSaving(true);
 77:     try {
 78:       await saveTicketDesign(
 79:         ticketConfig.eventName || "Mi Rifa",
 80:         ticketConfig,
 81:         printConfig
 82:       );
 83:       setSaveSuccess(true);
 84:       refreshCount();
 85:       setTimeout(() => setSaveSuccess(false), 2500);
 86:     } catch (e) {
 87:       console.error("Error al guardar:", e);
 88:     } finally {
 89:       setSaving(false);
 90:     }
 91:   };
 92: 
 93: 
 94:   return (
 95:     <>
 96:       <header className="hidden sm:block sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
 97:         <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
 98:           {/* Logo & Marca unificada */}
 99:           <Link href="/" className="flex items-center gap-2.5 group">
100:             <div className="relative">
101:               <Image
102:                 src="/icon.svg"
103:                 alt="Eventazo"
104:                 width={36}
105:                 height={36}
106:                 className="h-9 w-9 rounded-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform"
107:               />
108:               <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-black text-slate-950">
109:                 ★
110:               </span>
111:             </div>
112:             <div>
113:               <div className="flex items-center gap-1.5">
114:                 <span className="text-base sm:text-lg font-black tracking-tight text-slate-100">
115:                   Eventazo
116:                 </span>
117:                 <span className="rounded bg-gradient-to-r from-amber-500/20 to-amber-300/20 border border-amber-500/40 px-1.5 py-0.2 text-[9px] font-bold text-amber-400">
118:                   PRO
119:                 </span>
120:               </div>
121:             </div>
122:           </Link>
123: 
124:           {/* Enlaces de navegación desktop */}
125:           <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
126:             {isEditor ? (
127:               <>
128:                 <Link
129:                   href="/"
130:                   className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
131:                 >
132:                   <Home className="h-3.5 w-3.5 text-amber-400" />
133:                   <span>Inicio</span>
134:                 </Link>
135:                 <Link
136:                   href="/#caracteristicas"
137:                   className="hover:text-amber-400 transition-colors"
138:                 >
139:                   Características
140:                 </Link>
141:                 <Link
142:                   href="/#calculadora"
143:                   className="hover:text-amber-400 transition-colors"
144:                 >
145:                   Calculadora de Ahorro
146:                 </Link>
147:                 <Link
148:                   href="/#preguntas"
149:                   className="hover:text-amber-400 transition-colors"
150:                 >
151:                   Preguntas
152:                 </Link>
153:               </>
154:             ) : (
155:               <>
156:                 <a href="#caracteristicas" className="hover:text-amber-400 transition-colors">
157:                   Características
158:                 </a>
159:                 <a href="#calculadora" className="hover:text-amber-400 transition-colors">
160:                   Calculadora de Ahorro
161:                 </a>
162:                 <a href="#comparativa" className="hover:text-amber-400 transition-colors">
163:                   Comparativa
164:                 </a>
165:                 <a href="#casos" className="hover:text-amber-400 transition-colors">
166:                   Casos de Uso
167:                 </a>
168:                 <a href="#preguntas" className="hover:text-amber-400 transition-colors">
169:                   Preguntas Frecuentes
170:                 </a>
171:               </>
172:             )}
173:           </div>
174: 
175:           {/* Acciones del Header */}
176:           <div className="flex items-center gap-2 sm:gap-3">
177:             {/* Botón Mis Rifas (accesible siempre) */}
178:             <Button
179:               variant="ghost"
180:               size="sm"
181:               onClick={() => openDrawer()}
182:               className="border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-400 text-xs h-9 px-3 rounded-xl gap-1.5 shadow-sm"
183:             >
184:               <FolderOpen className="h-3.5 w-3.5 text-amber-400" />
185:               <span className="hidden sm:inline">Mis Rifas</span>
186:               {savedCount > 0 && (
187:                 <span className="ml-1 rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-mono font-bold text-amber-400 border border-amber-500/30">
188:                   {savedCount}
189:                 </span>
190:               )}
191:             </Button>
192: 
193:             {/* Acción Primaria según la ruta */}
194:             {isEditor ? (
195:               <Button
196:                 size="sm"
197:                 onClick={handleSave}
198:                 disabled={saving}
199:                 className={`h-9 px-3.5 sm:px-4 text-xs font-bold rounded-xl gap-1.5 transition-all shadow-lg ${
200:                   saveSuccess
201:                     ? "bg-emerald-500 text-white shadow-emerald-500/25 scale-105"
202:                     : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/25 active:scale-95"
203:                 }`}
204:               >
205:                 {saveSuccess ? (
206:                   <>
207:                     <Check className="h-3.5 w-3.5" />
208:                     <span>¡Guardado!</span>
209:                   </>
210:                 ) : (
211:                   <>
212:                     <Save className="h-3.5 w-3.5" />
213:                     <span>{saving ? "Guardando..." : "Guardar"}</span>
214:                   </>
215:                 )}
216:               </Button>
217:             ) : (
218:               <Link href="/editor">
219:                 <Button
220:                   size="sm"
221:                   className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs h-9 px-3.5 sm:px-4 rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-1.5 group"
222:                 >
223:                   <Sliders className="h-3.5 w-3.5" />
224:                   <span>Crear Rifa Gratis</span>
225:                   <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
226:                 </Button>
227:               </Link>
228:             )}
229: 
230:             {/* Usuario / Login */}
231:             {loading ? (
232:               <div className="flex items-center justify-center h-9 w-9">
233:                 <span className="h-4 w-4 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
234:               </div>
235:             ) : user ? (
236:               <div className="flex items-center gap-1.5 sm:gap-2 pl-1 border-l border-slate-800">
237:                 <button
238:                   type="button"
239:                   onClick={() => openProfileModal()}
240:                   className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 transition-colors text-left group"
241:                   title="Ver y editar mi perfil"
242:                 >
243:                   <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-500/30 group-hover:scale-105 transition-transform">
244:                     {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
245:                   </div>
246:                   <span className="text-xs font-semibold text-slate-300 group-hover:text-amber-300 max-w-[100px] truncate hidden md:inline transition-colors">
247:                     {user.name || user.email.split("@")[0]}
248:                   </span>
249:                   {user.isDemo && (
250:                     <span className="text-[9px] bg-slate-800 text-amber-300 px-1 py-0.5 rounded border border-slate-700">
251:                       Demo
252:                     </span>
253:                   )}
254:                 </button>
255: 
256:                 <Button
257:                   variant="ghost"
258:                   size="sm"
259:                   onClick={() => signOut()}
260:                   title="Cerrar sesión"
261:                   className="h-9 w-9 p-0 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-900"
262:                 >
263:                   <LogOut className="h-3.5 w-3.5" />
264:                 </Button>
265:               </div>
266:             ) : (
267:               <Button
268:                 variant="ghost"
269:                 size="sm"
270:                 onClick={() => openAuthModal()}
271:                 className="h-9 px-3 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-900 border border-slate-800/80 rounded-xl gap-1.5"
272:               >
273:                 <LogIn className="h-3.5 w-3.5" />
274:                 <span>Ingresar</span>
275:               </Button>
276:             )}
277:           </div>
278:         </div>
279:       </header>
280: 
281:       {/* Modal de Autenticación */}
282:       <AuthModal
283:         isOpen={isAuthModalOpen}
284:         onClose={closeAuthModal}
285:         onSuccess={() => {
286:           refreshCount();
287:         }}
288:       />
289: 
290:       {/* Modal de Perfil de Usuario */}
291:       <ProfileModal
292:         isOpen={isProfileModalOpen}
293:         onClose={closeProfileModal}
294:       />
295: 
296:       {/* Cajón de Rifas Guardadas */}
297:       <SavedTicketsDrawer
298:         isOpen={isDrawerOpen}
299:         onClose={closeDrawer}
300:         onSelectTicket={() => {
301:           refreshCount();
302:         }}
303:         onOpenAuth={() => openAuthModal()}
304:       />
305:     </>
306:   );
307: }
````

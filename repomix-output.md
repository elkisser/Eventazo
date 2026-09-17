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
 52:               className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5"
 53:             >
 54:               <Sparkles className="h-3.5 w-3.5 text-amber-400" />
 55:               <span>{showPresets ? "Ocultar Plantillas" : "Cargar Plantilla"}</span>
 56:             </button>
 57:           </div>
 58:         </div>
 59: 
 60:         {/* Desplegable de plantillas */}
 61:         {showPresets && (
 62:           <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
 63:             <PresetSelector onSelect={() => setShowPresets(false)} />
 64:           </div>
 65:         )}
 66: 
 67:         {/* === MOBILE: Tabs de navegación === */}
 68:         <div className="lg:hidden">
 69:           <div className="flex rounded-xl bg-slate-800/80 border border-slate-700/50 p-1 gap-1">
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
142:             <div className="rounded-xl border border-slate-700/50 bg-slate-800/80 p-4 space-y-3">
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

## File: src/components/auth/AuthModal.tsx
````typescript
  1: "use client";
  2: 
  3: import { useState } from "react";
  4: import { X, Lock, Mail, Sparkles, CheckCircle2, AlertCircle, Database } from "lucide-react";
  5: import { Button } from "@/components/ui/button";
  6: import { useAuth } from "@/hooks/useAuth";
  7: 
  8: interface AuthModalProps {
  9:   isOpen: boolean;
 10:   onClose: () => void;
 11:   onSuccess?: () => void;
 12: }
 13: 
 14: export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
 15:   const [mode, setMode] = useState<"login" | "register">("login");
 16:   const [email, setEmail] = useState("");
 17:   const [password, setPassword] = useState("");
 18:   const [error, setError] = useState<string | null>(null);
 19:   const [message, setMessage] = useState<string | null>(null);
 20:   const [submitting, setSubmitting] = useState(false);
 21: 
 22:   const { signIn, signUp, signInDemo, isConfigured } = useAuth();
 23: 
 24:   if (!isOpen) return null;
 25: 
 26:   const handleSubmit = async (e: React.FormEvent) => {
 27:     e.preventDefault();
 28:     setError(null);
 29:     setMessage(null);
 30:     setSubmitting(true);
 31: 
 32:     try {
 33:       if (mode === "login") {
 34:         const res = await signIn(email, password);
 35:         if (res.error) {
 36:           setError(res.error);
 37:         } else {
 38:           onSuccess?.();
 39:           onClose();
 40:         }
 41:       } else {
 42:         const res = await signUp(email, password);
 43:         if (res.error) {
 44:           setError(res.error);
 45:         } else {
 46:           setMessage(res.message || "¡Cuenta creada exitosamente!");
 47:           setTimeout(() => {
 48:             onSuccess?.();
 49:             onClose();
 50:           }, 1200);
 51:         }
 52:       }
 53:     } finally {
 54:       setSubmitting(false);
 55:     }
 56:   };
 57: 
 58:   const handleDemoLogin = () => {
 59:     signInDemo();
 60:     onSuccess?.();
 61:     onClose();
 62:   };
 63: 
 64:   return (
 65:     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
 66:       <div className="relative w-full max-w-md rounded-2xl border border-slate-700/80 bg-slate-900/95 p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
 67:         {/* Botón cerrar */}
 68:         <button
 69:           onClick={onClose}
 70:           className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors"
 71:         >
 72:           <X className="h-5 w-5" />
 73:         </button>
 74: 
 75:         {/* Encabezado */}
 76:         <div className="text-center mb-6">
 77:           <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3">
 78:             <Lock className="h-6 w-6 text-slate-950" />
 79:           </div>
 80:           <h3 className="text-xl font-bold text-slate-100">
 81:             {mode === "login" ? "Iniciar Sesión en Eventazo Pro" : "Crear Cuenta en Eventazo"}
 82:           </h3>
 83:           <p className="text-xs text-slate-400 mt-1">
 84:             Guarda tus diseños de rifas, sincroniza tus plantillas y descárgalas cuando quieras.
 85:           </p>
 86: 
 87:           {/* Badge de estado Supabase */}
 88:           <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium mt-3 border bg-slate-800/80 border-slate-700 text-slate-300">
 89:             <Database className={`h-3 w-3 ${isConfigured ? "text-emerald-400" : "text-amber-400"}`} />
 90:             <span>
 91:               {isConfigured ? "Supabase Conectado" : "Modo Local / Demo activo"}
 92:             </span>
 93:           </div>
 94:         </div>
 95: 
 96:         {/* Tabs */}
 97:         <div className="flex rounded-xl bg-slate-800/80 p-1 mb-5 border border-slate-700/60">
 98:           <button
 99:             type="button"
100:             onClick={() => {
101:               setMode("login");
102:               setError(null);
103:             }}
104:             className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
105:               mode === "login"
106:                 ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
107:                 : "text-slate-400 hover:text-slate-200"
108:             }`}
109:           >
110:             Ingresar
111:           </button>
112:           <button
113:             type="button"
114:             onClick={() => {
115:               setMode("register");
116:               setError(null);
117:             }}
118:             className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
119:               mode === "register"
120:                 ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
121:                 : "text-slate-400 hover:text-slate-200"
122:             }`}
123:           >
124:             Registrarse
125:           </button>
126:         </div>
127: 
128:         {/* Alerta de error */}
129:         {error && (
130:           <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
131:             <AlertCircle className="h-4 w-4 shrink-0" />
132:             <span>{error}</span>
133:           </div>
134:         )}
135: 
136:         {/* Alerta de éxito */}
137:         {message && (
138:           <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
139:             <CheckCircle2 className="h-4 w-4 shrink-0" />
140:             <span>{message}</span>
141:           </div>
142:         )}
143: 
144:         {/* Formulario */}
145:         <form onSubmit={handleSubmit} className="space-y-3.5">
146:           <div>
147:             <label className="block text-xs font-medium text-slate-300 mb-1">
148:               Correo Electrónico
149:             </label>
150:             <div className="relative">
151:               <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
152:               <input
153:                 type="email"
154:                 required
155:                 value={email}
156:                 onChange={(e) => setEmail(e.target.value)}
157:                 placeholder="tu@email.com"
158:                 className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
159:               />
160:             </div>
161:           </div>
162: 
163:           <div>
164:             <label className="block text-xs font-medium text-slate-300 mb-1">
165:               Contraseña
166:             </label>
167:             <div className="relative">
168:               <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
169:               <input
170:                 type="password"
171:                 required
172:                 minLength={6}
173:                 value={password}
174:                 onChange={(e) => setPassword(e.target.value)}
175:                 placeholder="••••••••"
176:                 className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
177:               />
178:             </div>
179:           </div>
180: 
181:           <Button
182:             type="submit"
183:             disabled={submitting}
184:             className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-300 h-10 text-xs shadow-lg shadow-amber-500/20 rounded-xl mt-2"
185:           >
186:             {submitting
187:               ? "Procesando..."
188:               : mode === "login"
189:               ? "Iniciar Sesión"
190:               : "Crear Cuenta"}
191:           </Button>
192:         </form>
193: 
194:         {/* Separador */}
195:         <div className="relative my-4">
196:           <div className="absolute inset-0 flex items-center">
197:             <div className="w-full border-t border-slate-800" />
198:           </div>
199:           <div className="relative flex justify-center text-[10px] uppercase">
200:             <span className="bg-slate-900 px-2 text-slate-500 font-medium">
201:               o prueba inmediata
202:             </span>
203:           </div>
204:         </div>
205: 
206:         {/* Botón Acceso Rápido Demo */}
207:         <Button
208:           type="button"
209:           variant="outline"
210:           onClick={handleDemoLogin}
211:           className="w-full border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-amber-400 hover:text-amber-300 h-9 text-xs rounded-xl flex items-center justify-center gap-2"
212:         >
213:           <Sparkles className="h-3.5 w-3.5" />
214:           <span>Acceder con Modo Demo (1-Click)</span>
215:         </Button>
216:       </div>
217:     </div>
218:   );
219: }
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
 15:   KeyRound
 16: } from "lucide-react";
 17: import { Button } from "@/components/ui/button";
 18: import { useAuth } from "@/hooks/useAuth";
 19: import { getSavedTickets } from "@/services/tickets-service";
 20: 
 21: interface ProfileModalProps {
 22:   isOpen: boolean;
 23:   onClose: () => void;
 24: }
 25: 
 26: export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
 27:   const { user, updateProfile, updatePassword, signOut, isConfigured } = useAuth();
 28: 
 29:   const [name, setName] = useState("");
 30:   const [email, setEmail] = useState("");
 31:   const [newPassword, setNewPassword] = useState("");
 32:   const [confirmPassword, setConfirmPassword] = useState("");
 33:   const [savedTicketsCount, setSavedTicketsCount] = useState(0);
 34: 
 35:   const [profileLoading, setProfileLoading] = useState(false);
 36:   const [passwordLoading, setPasswordLoading] = useState(false);
 37:   const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
 38: 
 39:   useEffect(() => {
 40:     if (user) {
 41:       setName(user.name || "");
 42:       setEmail(user.email || "");
 43:       getSavedTickets().then((tickets) => setSavedTicketsCount(tickets.length)).catch(() => {});
 44:     }
 45:   }, [user, isOpen]);
 46: 
 47:   if (!isOpen || !user) return null;
 48: 
 49:   const handleUpdateProfile = async (e: React.FormEvent) => {
 50:     e.preventDefault();
 51:     setStatusMessage(null);
 52:     setProfileLoading(true);
 53: 
 54:     try {
 55:       const res = await updateProfile(name, email);
 56:       if (res.error) {
 57:         setStatusMessage({ type: "error", text: res.error });
 58:       } else {
 59:         setStatusMessage({ type: "success", text: res.message || "Perfil actualizado exitosamente" });
 60:         setTimeout(() => setStatusMessage(null), 3000);
 61:       }
 62:     } finally {
 63:       setProfileLoading(false);
 64:     }
 65:   };
 66: 
 67:   const handleChangePassword = async (e: React.FormEvent) => {
 68:     e.preventDefault();
 69:     setStatusMessage(null);
 70: 
 71:     if (newPassword.length < 6) {
 72:       setStatusMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" });
 73:       return;
 74:     }
 75: 
 76:     if (newPassword !== confirmPassword) {
 77:       setStatusMessage({ type: "error", text: "Las contraseñas no coinciden" });
 78:       return;
 79:     }
 80: 
 81:     setPasswordLoading(true);
 82:     try {
 83:       const res = await updatePassword(newPassword);
 84:       if (res.error) {
 85:         setStatusMessage({ type: "error", text: res.error });
 86:       } else {
 87:         setStatusMessage({ type: "success", text: "Contraseña actualizada exitosamente" });
 88:         setNewPassword("");
 89:         setConfirmPassword("");
 90:         setTimeout(() => setStatusMessage(null), 3000);
 91:       }
 92:     } finally {
 93:       setPasswordLoading(false);
 94:     }
 95:   };
 96: 
 97:   const handleSignOut = async () => {
 98:     await signOut();
 99:     onClose();
100:   };
101: 
102:   return (
103:     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
104:       <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700/80 bg-slate-900 p-5 sm:p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
105:         {/* Botón Cerrar */}
106:         <button
107:           onClick={onClose}
108:           className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
109:         >
110:           <X className="h-5 w-5" />
111:         </button>
112: 
113:         {/* Header con Avatar */}
114:         <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
115:           <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center text-xl font-black shadow-lg shadow-amber-500/30">
116:             {name ? name[0].toUpperCase() : user.email[0].toUpperCase()}
117:           </div>
118:           <div>
119:             <div className="flex items-center gap-1.5">
120:               <h3 className="text-base font-bold text-slate-100">{name || "Mi Cuenta"}</h3>
121:               <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.2 text-[9px] font-bold text-amber-300">
122:                 PRO
123:               </span>
124:             </div>
125:             <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[220px]">{user.email}</p>
126:           </div>
127:         </div>
128: 
129:         {/* Métricas de la cuenta */}
130:         <div className="grid grid-cols-2 gap-2.5 my-4">
131:           <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center gap-2.5">
132:             <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
133:               <Ticket className="h-4 w-4" />
134:             </div>
135:             <div>
136:               <p className="text-xs font-bold text-slate-200">{savedTicketsCount}</p>
137:               <p className="text-[10px] text-slate-400">Rifas Guardadas</p>
138:             </div>
139:           </div>
140: 
141:           <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center gap-2.5">
142:             <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
143:               <Database className="h-4 w-4" />
144:             </div>
145:             <div>
146:               <p className="text-xs font-bold text-slate-200">{isConfigured ? "Supabase Cloud" : "Local Demo"}</p>
147:               <p className="text-[10px] text-slate-400">Almacenamiento</p>
148:             </div>
149:           </div>
150:         </div>
151: 
152:         {/* Alerta de Feedback */}
153:         {statusMessage && (
154:           <div
155:             className={`mb-4 flex items-center gap-2 p-3 rounded-2xl text-xs ${
156:               statusMessage.type === "success"
157:                 ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
158:                 : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
159:             }`}
160:           >
161:             {statusMessage.type === "success" ? (
162:               <CheckCircle2 className="h-4 w-4 shrink-0" />
163:             ) : (
164:               <AlertCircle className="h-4 w-4 shrink-0" />
165:             )}
166:             <span>{statusMessage.text}</span>
167:           </div>
168:         )}
169: 
170:         {/* Formulario 1: Datos Personales */}
171:         <form onSubmit={handleUpdateProfile} className="space-y-3 pt-1">
172:           <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
173:             <User className="h-3.5 w-3.5 text-amber-400" />
174:             <span>Datos del Perfil</span>
175:           </h4>
176: 
177:           <div>
178:             <label className="block text-[11px] font-medium text-slate-300 mb-1">
179:               Nombre Completo
180:             </label>
181:             <input
182:               type="text"
183:               required
184:               value={name}
185:               onChange={(e) => setName(e.target.value)}
186:               placeholder="Tu nombre o el de tu organización"
187:               className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
188:             />
189:           </div>
190: 
191:           <div>
192:             <label className="block text-[11px] font-medium text-slate-300 mb-1">
193:               Correo Electrónico
194:             </label>
195:             <input
196:               type="email"
197:               required
198:               value={email}
199:               onChange={(e) => setEmail(e.target.value)}
200:               placeholder="tu@email.com"
201:               className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
202:             />
203:           </div>
204: 
205:           <Button
206:             type="submit"
207:             disabled={profileLoading}
208:             size="sm"
209:             className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-amber-300 text-xs font-semibold h-9 rounded-xl transition-all"
210:           >
211:             {profileLoading ? "Guardando..." : "Guardar Cambios de Perfil"}
212:           </Button>
213:         </form>
214: 
215:         {/* Separador */}
216:         <div className="my-5 border-t border-slate-800" />
217: 
218:         {/* Formulario 2: Cambiar Contraseña */}
219:         <form onSubmit={handleChangePassword} className="space-y-3">
220:           <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
221:             <KeyRound className="h-3.5 w-3.5 text-amber-400" />
222:             <span>Seguridad y Contraseña</span>
223:           </h4>
224: 
225:           <div>
226:             <label className="block text-[11px] font-medium text-slate-300 mb-1">
227:               Nueva Contraseña
228:             </label>
229:             <input
230:               type="password"
231:               minLength={6}
232:               value={newPassword}
233:               onChange={(e) => setNewPassword(e.target.value)}
234:               placeholder="Mínimo 6 caracteres"
235:               className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
236:             />
237:           </div>
238: 
239:           <div>
240:             <label className="block text-[11px] font-medium text-slate-300 mb-1">
241:               Confirmar Nueva Contraseña
242:             </label>
243:             <input
244:               type="password"
245:               minLength={6}
246:               value={confirmPassword}
247:               onChange={(e) => setConfirmPassword(e.target.value)}
248:               placeholder="Repite la nueva contraseña"
249:               className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
250:             />
251:           </div>
252: 
253:           <Button
254:             type="submit"
255:             disabled={passwordLoading || !newPassword}
256:             size="sm"
257:             className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-amber-300 text-xs font-semibold h-9 rounded-xl transition-all"
258:           >
259:             {passwordLoading ? "Actualizando..." : "Actualizar Contraseña"}
260:           </Button>
261:         </form>
262: 
263:         {/* Separador y Cerrar Sesión */}
264:         <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
265:           <span className="text-[11px] text-slate-500">Sesión iniciada</span>
266:           <Button
267:             type="button"
268:             variant="ghost"
269:             size="sm"
270:             onClick={handleSignOut}
271:             className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs h-8 rounded-xl flex items-center gap-1.5"
272:           >
273:             <LogOut className="h-3.5 w-3.5" />
274:             <span>Cerrar Sesión</span>
275:           </Button>
276:         </div>
277:       </div>
278:     </div>
279:   );
280: }
````

## File: src/components/ui/button.tsx
````typescript
 1: import * as React from "react";
 2: import { cva, type VariantProps } from "class-variance-authority";
 3: import { cn } from "@/lib/utils";
 4: 
 5: const buttonVariants = cva(
 6:   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
 7:   {
 8:     variants: {
 9:       variant: {
10:         default:
11:           "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md hover:from-amber-600 hover:to-amber-700 hover:shadow-lg",
12:         destructive:
13:           "bg-red-600 text-white shadow-sm hover:bg-red-700",
14:         outline:
15:           "border border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800 hover:border-slate-500",
16:         secondary:
17:           "bg-slate-700 text-slate-100 shadow-sm hover:bg-slate-600",
18:         ghost:
19:           "text-slate-300 hover:bg-slate-800 hover:text-slate-100",
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
 9:         "rounded-xl border border-slate-700/50 bg-slate-800/80 backdrop-blur-sm shadow-xl",
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
 93:           "group relative flex items-center h-10 w-full rounded-lg border border-slate-700 bg-slate-800/60 p-0.5 focus-within:border-amber-500/80 focus-within:ring-2 focus-within:ring-amber-500/20 hover:border-slate-600 transition-all shadow-inner",
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
27:               "flex h-10 w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 pr-9 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 hover:border-slate-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
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
 18: import { AuthModal } from "@/components/auth/AuthModal";
 19: import { ProfileModal } from "@/components/auth/ProfileModal";
 20: import { SavedTicketsDrawer } from "@/components/SavedTicketsDrawer";
 21: 
 22: export function MobileBottomNav() {
 23:   const pathname = usePathname();
 24:   const { user } = useAuth();
 25:   const { ticketConfig, printConfig } = useRifaStore();
 26: 
 27:   const [isAuthOpen, setIsAuthOpen] = useState(false);
 28:   const [isProfileOpen, setIsProfileOpen] = useState(false);
 29:   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 30:   const [saving, setSaving] = useState(false);
 31:   const [saveSuccess, setSaveSuccess] = useState(false);
 32:   const [savedCount, setSavedCount] = useState(0);
 33: 
 34:   const refreshCount = async () => {
 35:     try {
 36:       const list = await getSavedTickets();
 37:       setSavedCount(list.length);
 38:     } catch {}
 39:   };
 40: 
 41:   useEffect(() => {
 42:     refreshCount();
 43:   }, [user]);
 44: 
 45:   const handleSave = async () => {
 46:     if (!user) {
 47:       setIsAuthOpen(true);
 48:       return;
 49:     }
 50: 
 51:     setSaving(true);
 52:     try {
 53:       await saveTicketDesign(
 54:         ticketConfig.eventName || "Mi Rifa",
 55:         ticketConfig,
 56:         printConfig
 57:       );
 58:       setSaveSuccess(true);
 59:       refreshCount();
 60:       setTimeout(() => setSaveSuccess(false), 2500);
 61:     } catch (e) {
 62:       console.error(e);
 63:     } finally {
 64:       setSaving(false);
 65:     }
 66:   };
 67: 
 68:   const handleProfileClick = () => {
 69:     if (user) {
 70:       setIsProfileOpen(true);
 71:     } else {
 72:       setIsAuthOpen(true);
 73:     }
 74:   };
 75: 
 76:   return (
 77:     <>
 78:       {/* Barra de navegación inferior fija estilo Native App */}
 79:       <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl">
 80:         <div className="grid grid-cols-5 items-center justify-items-center">
 81:           {/* 1. Inicio / Landing */}
 82:           <Link
 83:             href="/"
 84:             className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-colors ${
 85:               pathname === "/"
 86:                 ? "text-amber-400 font-bold"
 87:                 : "text-slate-400 hover:text-slate-200"
 88:             }`}
 89:           >
 90:             <Home className="h-5 w-5" />
 91:             <span className="text-[10px]">Inicio</span>
 92:           </Link>
 93: 
 94:           {/* 2. Editor */}
 95:           <Link
 96:             href="/editor"
 97:             className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-colors ${
 98:               pathname === "/editor"
 99:                 ? "text-amber-400 font-bold"
100:                 : "text-slate-400 hover:text-slate-200"
101:             }`}
102:           >
103:             <Sliders className="h-5 w-5" />
104:             <span className="text-[10px]">Editor</span>
105:           </Link>
106: 
107:           {/* 3. Guardar Rifa (Acción central destacada) */}
108:           <button
109:             onClick={handleSave}
110:             disabled={saving}
111:             className="flex flex-col items-center -mt-4 group"
112:           >
113:             <div
114:               className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
115:                 saveSuccess
116:                   ? "bg-emerald-500 text-white shadow-emerald-500/30 scale-105"
117:                   : "bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-amber-500/30 group-active:scale-95"
118:               }`}
119:             >
120:               {saveSuccess ? (
121:                 <Check className="h-5 w-5" />
122:               ) : (
123:                 <Save className="h-5 w-5" />
124:               )}
125:             </div>
126:             <span className="text-[10px] font-bold text-amber-400 mt-1">
127:               {saveSuccess ? "¡Listo!" : saving ? "..." : "Guardar"}
128:             </span>
129:           </button>
130: 
131:           {/* 4. Mis Rifas */}
132:           <button
133:             onClick={() => setIsDrawerOpen(true)}
134:             className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 relative transition-colors"
135:           >
136:             <FolderOpen className="h-5 w-5" />
137:             <span className="text-[10px]">Mis Rifas</span>
138:             {savedCount > 0 && (
139:               <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-mono font-black flex items-center justify-center">
140:                 {savedCount}
141:               </span>
142:             )}
143:           </button>
144: 
145:           {/* 5. Perfil / Cuenta */}
146:           <button
147:             onClick={handleProfileClick}
148:             className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
149:           >
150:             {user ? (
151:               <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-500/40">
152:                 {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
153:               </div>
154:             ) : (
155:               <User className="h-5 w-5" />
156:             )}
157:             <span className="text-[10px]">{user ? "Perfil" : "Entrar"}</span>
158:           </button>
159:         </div>
160:       </nav>
161: 
162:       {/* Modales */}
163:       <AuthModal
164:         isOpen={isAuthOpen}
165:         onClose={() => setIsAuthOpen(false)}
166:         onSuccess={() => refreshCount()}
167:       />
168:       <ProfileModal
169:         isOpen={isProfileOpen}
170:         onClose={() => setIsProfileOpen(false)}
171:       />
172:       <SavedTicketsDrawer
173:         isOpen={isDrawerOpen}
174:         onClose={() => setIsDrawerOpen(false)}
175:         onSelectTicket={() => refreshCount()}
176:         onOpenAuth={() => setIsAuthOpen(true)}
177:       />
178:     </>
179:   );
180: }
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
143:             className="flex flex-col items-start p-2.5 rounded-xl border border-slate-700/60 bg-slate-800/60 hover:bg-slate-800 hover:border-amber-500/50 transition-all text-left group"
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
10:           "flex h-10 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 hover:border-slate-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-inner transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
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

## File: src/hooks/useAuth.ts
````typescript
  1: "use client";
  2: 
  3: import { useState, useEffect, useCallback } from "react";
  4: import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
  5: import { User } from "@supabase/supabase-js";
  6: 
  7: export interface AppUser {
  8:   id: string;
  9:   email: string;
 10:   name?: string;
 11:   isDemo?: boolean;
 12:   plan?: string;
 13:   isPro?: boolean;
 14: }
 15: 
 16: const DEMO_USER_KEY = "eventazo_demo_user";
 17: 
 18: export function useAuth() {
 19:   const [user, setUser] = useState<AppUser | null>(null);
 20:   const [loading, setLoading] = useState(true);
 21:   const isConfigured = isSupabaseConfigured();
 22: 
 23:   // Cargar datos extendidos desde public.profiles
 24:   const syncProfile = useCallback(async (baseUser: AppUser) => {
 25:     const supabase = getSupabase();
 26:     if (!supabase || baseUser.isDemo) return baseUser;
 27: 
 28:     try {
 29:       const { data } = await supabase
 30:         .from("profiles")
 31:         .select("full_name, plan, is_pro")
 32:         .eq("id", baseUser.id)
 33:         .single();
 34: 
 35:       if (data) {
 36:         return {
 37:           ...baseUser,
 38:           name: data.full_name || baseUser.name,
 39:           plan: data.plan || "free",
 40:           isPro: data.is_pro || false,
 41:         };
 42:       }
 43:     } catch {
 44:       // Ignorar fallback silencioso
 45:     }
 46:     return baseUser;
 47:   }, []);
 48: 
 49:   // Escuchar cambios de sesión de Supabase o cargar usuario demo local
 50:   useEffect(() => {
 51:     const supabase = getSupabase();
 52: 
 53:     if (supabase) {
 54:       supabase.auth.getSession().then(async ({ data: { session } }) => {
 55:         if (session?.user) {
 56:           const base: AppUser = {
 57:             id: session.user.id,
 58:             email: session.user.email || "",
 59:             name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
 60:           };
 61:           const full = await syncProfile(base);
 62:           setUser(full);
 63:         }
 64:         setLoading(false);
 65:       });
 66: 
 67:       const { data: { subscription } } = supabase.auth.onAuthStateChange(
 68:         async (_event, session) => {
 69:           if (session?.user) {
 70:             const base: AppUser = {
 71:               id: session.user.id,
 72:               email: session.user.email || "",
 73:               name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
 74:             };
 75:             const full = await syncProfile(base);
 76:             setUser(full);
 77:           } else {
 78:             // Verificar si hay usuario demo
 79:             const demo = localStorage.getItem(DEMO_USER_KEY);
 80:             if (demo) {
 81:               setUser(JSON.parse(demo));
 82:             } else {
 83:               setUser(null);
 84:             }
 85:           }
 86:           setLoading(false);
 87:         }
 88:       );
 89: 
 90:       return () => {
 91:         subscription.unsubscribe();
 92:       };
 93:     } else {
 94:       // Modo local / demo
 95:       if (typeof window !== "undefined") {
 96:         const demo = localStorage.getItem(DEMO_USER_KEY);
 97:         if (demo) {
 98:           setUser(JSON.parse(demo));
 99:         }
100:       }
101:       setLoading(false);
102:     }
103:   }, []);
104: 
105:   const signIn = useCallback(async (email: string, password: string): Promise<{ error: string | null }> => {
106:     const supabase = getSupabase();
107: 
108:     if (!supabase) {
109:       // Si Supabase no está configurado, loguear como demo
110:       const demoUser: AppUser = {
111:         id: "demo-user-123",
112:         email,
113:         name: email.split("@")[0],
114:         isDemo: true,
115:       };
116:       localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
117:       setUser(demoUser);
118:       return { error: null };
119:     }
120: 
121:     try {
122:       const { data, error } = await supabase.auth.signInWithPassword({ email, password });
123:       if (error) return { error: error.message };
124:       if (data.user) {
125:         setUser({
126:           id: data.user.id,
127:           email: data.user.email || "",
128:           name: data.user.user_metadata?.full_name || data.user.email?.split("@")[0],
129:         });
130:       }
131:       return { error: null };
132:     } catch (e) {
133:       return { error: e instanceof Error ? e.message : "Error al iniciar sesión" };
134:     }
135:   }, []);
136: 
137:   const signUp = useCallback(async (email: string, password: string): Promise<{ error: string | null; message?: string }> => {
138:     const supabase = getSupabase();
139: 
140:     if (!supabase) {
141:       const demoUser: AppUser = {
142:         id: "demo-user-123",
143:         email,
144:         name: email.split("@")[0],
145:         isDemo: true,
146:       };
147:       localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
148:       setUser(demoUser);
149:       return { error: null, message: "Cuenta demo creada exitosamente" };
150:     }
151: 
152:     try {
153:       const { data, error } = await supabase.auth.signUp({
154:         email,
155:         password,
156:       });
157:       if (error) return { error: error.message };
158:       if (data.user) {
159:         setUser({
160:           id: data.user.id,
161:           email: data.user.email || "",
162:           name: data.user.user_metadata?.full_name || data.user.email?.split("@")[0],
163:         });
164:       }
165:       return { error: null, message: "Revisa tu correo para confirmar tu cuenta si es requerido" };
166:     } catch (e) {
167:       return { error: e instanceof Error ? e.message : "Error al registrarse" };
168:     }
169:   }, []);
170: 
171:   const signInDemo = useCallback(() => {
172:     const demoUser: AppUser = {
173:       id: "demo-pro-user",
174:       email: "demo@eventazo.pro",
175:       name: "Usuario Pro (Demo)",
176:       isDemo: true,
177:     };
178:     localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
179:     setUser(demoUser);
180:   }, []);
181: 
182:   const updateProfile = useCallback(async (newName: string, newEmail?: string): Promise<{ error: string | null; message?: string }> => {
183:     const supabase = getSupabase();
184: 
185:     if (!supabase || user?.isDemo) {
186:       const updated: AppUser = {
187:         id: user?.id || "demo-user",
188:         email: newEmail || user?.email || "",
189:         name: newName,
190:         isDemo: true,
191:       };
192:       localStorage.setItem(DEMO_USER_KEY, JSON.stringify(updated));
193:       setUser(updated);
194:       return { error: null, message: "Perfil actualizado exitosamente" };
195:     }
196: 
197:     try {
198:       const updateData: { data?: { full_name: string }; email?: string } = {
199:         data: { full_name: newName },
200:       };
201:       if (newEmail && newEmail !== user?.email) {
202:         updateData.email = newEmail;
203:       }
204: 
205:       const { data, error } = await supabase.auth.updateUser(updateData);
206:       if (error) return { error: error.message };
207: 
208:       // Actualizar también la tabla pública profiles
209:       try {
210:         const targetId = user?.id || data.user.id;
211:         if (targetId) {
212:           await supabase
213:             .from("profiles")
214:             .update({
215:               full_name: newName,
216:               ...(newEmail ? { email: newEmail } : {}),
217:               updated_at: new Date().toISOString(),
218:             })
219:             .eq("id", targetId);
220:         }
221:       } catch (e) {
222:         console.warn("No se pudo actualizar profiles:", e);
223:       }
224: 
225:       if (data.user) {
226:         setUser((prev) =>
227:           prev
228:             ? {
229:                 ...prev,
230:                 email: data.user.email || prev.email,
231:                 name: data.user.user_metadata?.full_name || newName,
232:               }
233:             : null
234:         );
235:       }
236: 
237:       return {
238:         error: null,
239:         message: newEmail && newEmail !== user?.email
240:           ? "Perfil actualizado. Se envió un correo de confirmación al nuevo email."
241:           : "Perfil actualizado exitosamente",
242:       };
243:     } catch (e) {
244:       return { error: e instanceof Error ? e.message : "Error al actualizar perfil" };
245:     }
246:   }, [user]);
247: 
248:   const updatePassword = useCallback(async (newPassword: string): Promise<{ error: string | null }> => {
249:     const supabase = getSupabase();
250: 
251:     if (!supabase || user?.isDemo) {
252:       return { error: null };
253:     }
254: 
255:     try {
256:       const { error } = await supabase.auth.updateUser({ password: newPassword });
257:       if (error) return { error: error.message };
258:       return { error: null };
259:     } catch (e) {
260:       return { error: e instanceof Error ? e.message : "Error al cambiar contraseña" };
261:     }
262:   }, [user]);
263: 
264:   const signOut = useCallback(async () => {
265:     const supabase = getSupabase();
266:     if (supabase) {
267:       await supabase.auth.signOut();
268:     }
269:     localStorage.removeItem(DEMO_USER_KEY);
270:     setUser(null);
271:   }, []);
272: 
273:   return {
274:     user,
275:     loading,
276:     isConfigured,
277:     signIn,
278:     signUp,
279:     signInDemo,
280:     updateProfile,
281:     updatePassword,
282:     signOut,
283:   };
284: }
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
 28: import { AuthModal } from "@/components/auth/AuthModal";
 29: import { useAuth } from "@/hooks/useAuth";
 30: import { formatCurrency } from "@/lib/utils";
 31: 
 32: export default function LandingPage() {
 33:   const [isAuthOpen, setIsAuthOpen] = useState(false);
 34:   const { user } = useAuth();
 35: 
 36:   // Estados de la Calculadora de Recaudación y Ahorro
 37:   const [calcTickets, setCalcTickets] = useState(600);
 38:   const [calcPrice, setCalcPrice] = useState(2500);
 39: 
 40:   // Cálculos matemáticos transparentes y 100% reales
 41:   const { totalRaised, standardSheets, eventazoSheets, sheetsSaved, percentSaved } = useMemo(() => {
 42:     const raised = calcTickets * calcPrice;
 43:     // En A4 horizontal estándar entran 5 tickets por hoja (1 columna de 5 filas de 130x50mm)
 44:     // Con Eventazo lateral vertical entran 5 horizontales + 2 verticales = 7 tickets por hoja
 45:     const stdSheets = Math.ceil(calcTickets / 5);
 46:     const evSheets = Math.ceil(calcTickets / 7);
 47:     const saved = Math.max(0, stdSheets - evSheets);
 48:     const percent = stdSheets > 0 ? Math.round((saved / stdSheets) * 100) : 0;
 49: 
 50:     return {
 51:       totalRaised: raised,
 52:       standardSheets: stdSheets,
 53:       eventazoSheets: evSheets,
 54:       sheetsSaved: saved,
 55:       percentSaved: percent,
 56:     };
 57:   }, [calcTickets, calcPrice]);
 58: 
 59:   return (
 60:     <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
 61:       {/* ============================================================ */}
 62:       {/* 1. NAVBAR COMERCIAL                                         */}
 63:       {/* ============================================================ */}
 64:       <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
 65:         <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
 66:           {/* Brand */}
 67:           <Link href="/" className="flex items-center gap-2.5 group">
 68:             <div className="relative">
 69:               <Image
 70:                 src="/icon.svg"
 71:                 alt="Eventazo"
 72:                 width={36}
 73:                 height={36}
 74:                 className="h-9 w-9 rounded-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform"
 75:               />
 76:               <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-black text-slate-950">
 77:                 ★
 78:               </span>
 79:             </div>
 80:             <div>
 81:               <div className="flex items-center gap-1.5">
 82:                 <span className="text-base sm:text-lg font-black tracking-tight text-slate-100">
 83:                   Eventazo
 84:                 </span>
 85:                 <span className="rounded bg-gradient-to-r from-amber-500/20 to-amber-300/20 border border-amber-500/40 px-1.5 py-0.2 text-[9px] font-bold text-amber-400">
 86:                   PRO
 87:                 </span>
 88:               </div>
 89:             </div>
 90:           </Link>
 91: 
 92:           {/* Links desktop */}
 93:           <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
 94:             <a href="#caracteristicas" className="hover:text-amber-400 transition-colors">
 95:               Características
 96:             </a>
 97:             <a href="#calculadora" className="hover:text-amber-400 transition-colors">
 98:               Calculadora de Ahorro
 99:             </a>
100:             <a href="#comparativa" className="hover:text-amber-400 transition-colors">
101:               Comparativa
102:             </a>
103:             <a href="#casos" className="hover:text-amber-400 transition-colors">
104:               Casos de Uso
105:             </a>
106:             <a href="#preguntas" className="hover:text-amber-400 transition-colors">
107:               Preguntas Frecuentes
108:             </a>
109:           </div>
110: 
111:           {/* Acciones */}
112:           <div className="flex items-center gap-2 sm:gap-3">
113:             {user ? (
114:               <Link
115:                 href="/editor"
116:                 className="text-xs text-slate-300 hover:text-amber-400 px-2 py-1 hidden sm:block"
117:               >
118:                 Hola, <span className="font-semibold">{user.name || user.email.split("@")[0]}</span>
119:               </Link>
120:             ) : (
121:               <Button
122:                 variant="ghost"
123:                 size="sm"
124:                 onClick={() => setIsAuthOpen(true)}
125:                 className="text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-xl gap-1.5 h-9"
126:               >
127:                 <LogIn className="h-3.5 w-3.5" />
128:                 <span>Ingresar</span>
129:               </Button>
130:             )}
131: 
132:             <Link href="/editor">
133:               <Button
134:                 size="sm"
135:                 className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs h-9 px-3.5 sm:px-4 rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-1.5 group"
136:               >
137:                 <span>Crear Rifa Gratis</span>
138:                 <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
139:               </Button>
140:             </Link>
141:           </div>
142:         </div>
143:       </nav>
144: 
145:       {/* ============================================================ */}
146:       {/* 2. HERO SECTION CON ALTO IMPACTO                            */}
147:       {/* ============================================================ */}
148:       <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
149:         {/* Luces de fondo decorativas */}
150:         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 to-amber-300/10 blur-[130px] rounded-full pointer-events-none" />
151: 
152:         <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
153:           {/* Badge de confianza */}
154:           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-6 shadow-inner animate-in fade-in slide-in-from-bottom-2">
155:             <Sparkles className="h-3.5 w-3.5 text-amber-400" />
156:             <span>El generador inteligente para imprimir rifas en hojas A4</span>
157:           </div>
158: 
159:           {/* Título Principal */}
160:           <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-100">
161:             Diseña, numera e imprime planchas de rifas{" "}
162:             <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
163:               sin desperdiciar papel
164:             </span>
165:           </h1>
166: 
167:           {/* Subtítulo enfocado en dolores reales */}
168:           <p className="mt-5 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
169:             Olvídate de pegar números manualmente en Word o Canva. Eventazo acomoda automáticamente{" "}
170:             <strong className="text-slate-200 font-semibold">tickets horizontales y verticales</strong> en la misma hoja A4, genera talones de control desprendibles y te entrega un PDF vectorial listo para imprimir.
171:           </p>
172: 
173:           {/* CTAs */}
174:           <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
175:             <Link href="/editor" className="w-full sm:w-auto">
176:               <Button
177:                 size="lg"
178:                 className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm h-12 px-7 rounded-2xl shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 group"
179:               >
180:                 <span>Diseñar Mi Rifa Ahora</span>
181:                 <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
182:               </Button>
183:             </Link>
184: 
185:             <a href="#calculadora" className="w-full sm:w-auto">
186:               <Button
187:                 variant="outline"
188:                 size="lg"
189:                 className="w-full sm:w-auto border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm h-12 px-6 rounded-2xl flex items-center justify-center gap-2"
190:               >
191:                 <Calculator className="h-4 w-4 text-amber-400" />
192:                 <span>Calcular Ahorro de Hojas</span>
193:               </Button>
194:             </a>
195:           </div>
196: 
197:           <p className="mt-3 text-[11px] text-slate-500">
198:             No requiere tarjeta de crédito • 100% funcional en navegador • Exportación directa en PDF
199:           </p>
200: 
201:           {/* ============================================================ */}
202:           {/* 3. MÉTRICAS 100% REALES Y TÉCNICAS (SIN VANIDAD)            */}
203:           {/* ============================================================ */}
204:           <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
205:             <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
206:               <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">0%</p>
207:               <h4 className="text-xs font-bold text-slate-200 mt-1">Error de Correlatividad</h4>
208:               <p className="text-[10px] text-slate-400 mt-0.5">
209:                 Numeración continua garantizada matemáticamente sin saltos ni duplicados.
210:               </p>
211:             </div>
212: 
213:             <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
214:               <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">+40%</p>
215:               <h4 className="text-xs font-bold text-slate-200 mt-1">Aprovechamiento de Hoja</h4>
216:               <p className="text-[10px] text-slate-400 mt-0.5">
217:                 Exprime el lateral derecho de la hoja A4 con tickets verticales girados 90°.
218:               </p>
219:             </div>
220: 
221:             <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
222:               <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">100%</p>
223:               <h4 className="text-xs font-bold text-slate-200 mt-1">Fidelidad Vectorial</h4>
224:               <p className="text-[10px] text-slate-400 mt-0.5">
225:                 Textos nítidos con operadores nativos, sin píxeles borrosos al fotocopiar.
226:               </p>
227:             </div>
228: 
229:             <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
230:               <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">&lt; 3 seg</p>
231:               <h4 className="text-xs font-bold text-slate-200 mt-1">Generación Multipágina</h4>
232:               <p className="text-[10px] text-slate-400 mt-0.5">
233:                 Compilación instantánea en tu navegador lista para imprimir en casa o imprenta.
234:               </p>
235:             </div>
236:           </div>
237:         </div>
238:       </section>
239: 
240:       {/* ============================================================ */}
241:       {/* 4. MOCKUP VISUAL INTERACTIVO: EL BOLETO Y LA HOJA A4        */}
242:       {/* ============================================================ */}
243:       <section className="py-12 border-y border-slate-800/80 bg-slate-900/30">
244:         <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
245:           <div className="text-center mb-8">
246:             <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
247:               Anatomía de un Boleto de Rifa Profesional
248:             </h3>
249:             <p className="text-xl sm:text-2xl font-black text-slate-100">
250:               Diseñado específicamente para cortar, talonear y vender
251:             </p>
252:           </div>
253: 
254:           {/* Tarjeta del Boleto Ilustrado */}
255:           <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-4 sm:p-6 shadow-2xl">
256:             {/* Boleto Horizontal Demo */}
257:             <div className="rounded-xl border border-slate-600 bg-white text-slate-900 shadow-xl overflow-hidden flex flex-col sm:flex-row">
258:               {/* Cuerpo Principal */}
259:               <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between border-b-2 sm:border-b-0 sm:border-r-2 border-dashed border-slate-300">
260:                 <div>
261:                   <div className="flex items-center justify-between gap-2">
262:                     <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
263:                       Bono Contribución Solidario
264:                     </span>
265:                     <span className="text-[11px] font-semibold text-slate-500">
266:                       Sorteo: 28 de Noviembre 2026
267:                     </span>
268:                   </div>
269:                   <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-2 leading-tight">
270:                     Gran Rifa Anual Club Atlético & Social
271:                   </h4>
272:                   <p className="text-xs text-rose-800 font-bold italic mt-0.5">
273:                     Subcomisión de Deporte Infantil • Obras en Sede
274:                   </p>
275: 
276:                   {/* Lista de premios en columnas */}
277:                   <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
278:                     <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
279:                       Premios del Sorteo:
280:                     </p>
281:                     <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] text-rose-800 font-medium italic">
282:                       <p><strong className="not-italic text-slate-900">1°:</strong> Moto 110cc 0KM</p>
283:                       <p><strong className="not-italic text-slate-900">2°:</strong> Smart TV 55&quot; 4K</p>
284:                       <p><strong className="not-italic text-slate-900">3°:</strong> Heladera con Freezer</p>
285:                       <p><strong className="not-italic text-slate-900">4°:</strong> Bicicleta Rodado 29</p>
286:                     </div>
287:                   </div>
288:                 </div>
289: 
290:                 <div className="mt-4 pt-2.5 border-t border-slate-200 flex items-center justify-between">
291:                   <span className="text-sm font-black text-slate-900">Valor: $ 3.000</span>
292:                   <span className="text-lg sm:text-xl font-black font-mono text-rose-700">
293:                     N° 0482
294:                   </span>
295:                 </div>
296:               </div>
297: 
298:               {/* Talón de Control */}
299:               <div className="w-full sm:w-64 bg-slate-50 p-4 sm:p-5 flex flex-col justify-between border-slate-200">
300:                 <div>
301:                   <div className="flex items-center justify-between">
302:                     <span className="text-[10px] font-black uppercase text-slate-800 border-b border-slate-300 pb-0.5">
303:                       Talón de Control
304:                     </span>
305:                     <Scissors className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
306:                   </div>
307: 
308:                   <div className="mt-3 space-y-2 text-[11px]">
309:                     <div>
310:                       <span className="text-slate-600 block text-[10px] font-bold">Nombre y Apellido:</span>
311:                       <div className="border-b border-slate-400 h-4 mt-0.5" />
312:                     </div>
313:                     <div>
314:                       <span className="text-slate-600 block text-[10px] font-bold">Teléfono de Contacto:</span>
315:                       <div className="border-b border-slate-400 h-4 mt-0.5" />
316:                     </div>
317:                   </div>
318:                 </div>
319: 
320:                 <div className="mt-4 text-center pt-2 border-t border-slate-200">
321:                   <span className="text-[10px] font-semibold text-slate-600">Valor: $ 3.000</span>
322:                   <p className="text-base font-black font-mono text-rose-700">N° 0482</p>
323:                 </div>
324:               </div>
325:             </div>
326: 
327:             {/* Guías explicativas */}
328:             <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs text-slate-400">
329:               <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/50 border border-slate-800">
330:                 <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
331:                 <span>Micro-punteado para corte manual o guillotina</span>
332:               </div>
333:               <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/50 border border-slate-800">
334:                 <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
335:                 <span>Datos del comprador en talón para la urna</span>
336:               </div>
337:               <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/50 border border-slate-800">
338:                 <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
339:                 <span>Numeración coincidente en cuerpo y talón</span>
340:               </div>
341:             </div>
342:           </div>
343:         </div>
344:       </section>
345: 
346:       {/* ============================================================ */}
347:       {/* 5. CALCULADORA INTERACTIVA DE RECAUDACIÓN Y PAPEL           */}
348:       {/* ============================================================ */}
349:       <section id="calculadora" className="py-16 sm:py-24">
350:         <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
351:           <div className="text-center mb-10">
352:             <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
353:               Herramienta de Simulación Real
354:             </span>
355:             <h3 className="text-2xl sm:text-4xl font-black text-slate-100 mt-1">
356:               Calcula la recaudación de tu rifa y el ahorro de papel
357:             </h3>
358:             <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
359:               Simula tus números y comprueba exactamente cuántas hojas A4 necesitas y cuánto dinero generará tu evento.
360:             </p>
361:           </div>
362: 
363:           <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
364:             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
365:               {/* Controles interactivos */}
366:               <div className="space-y-6">
367:                 <div>
368:                   <div className="flex justify-between items-center mb-2">
369:                     <label className="text-xs font-bold text-slate-200">
370:                       Cantidad de Boletos a Imprimir:
371:                     </label>
372:                     <span className="text-base font-bold font-mono text-amber-400">
373:                       {calcTickets} boletos
374:                     </span>
375:                   </div>
376:                   <input
377:                     type="range"
378:                     min={100}
379:                     max={5000}
380:                     step={50}
381:                     value={calcTickets}
382:                     onChange={(e) => setCalcTickets(Number(e.target.value))}
383:                     className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
384:                   />
385:                   <div className="flex justify-between text-[10px] text-slate-500 mt-1">
386:                     <span>100 boletos</span>
387:                     <span>2.500 boletos</span>
388:                     <span>5.000 boletos</span>
389:                   </div>
390:                 </div>
391: 
392:                 <div>
393:                   <div className="flex justify-between items-center mb-2">
394:                     <label className="text-xs font-bold text-slate-200">
395:                       Precio de Venta por Boleto:
396:                     </label>
397:                     <span className="text-base font-bold font-mono text-amber-400">
398:                       {formatCurrency(calcPrice)}
399:                     </span>
400:                   </div>
401:                   <input
402:                     type="range"
403:                     min={500}
404:                     max={15000}
405:                     step={250}
406:                     value={calcPrice}
407:                     onChange={(e) => setCalcPrice(Number(e.target.value))}
408:                     className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
409:                   />
410:                   <div className="flex justify-between text-[10px] text-slate-500 mt-1">
411:                     <span>$ 500</span>
412:                     <span>$ 7.500</span>
413:                     <span>$ 15.000</span>
414:                   </div>
415:                 </div>
416: 
417:                 <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800 text-xs text-slate-300 space-y-1.5">
418:                   <div className="flex items-center gap-2 font-semibold text-slate-200">
419:                     <Sliders className="h-4 w-4 text-amber-400" />
420:                     <span>Algoritmo de aprovechamiento A4</span>
421:                   </div>
422:                   <p className="text-[11px] text-slate-400">
423:                     Eventazo coloca 5 tickets horizontales + 2 verticales en el lateral = <strong className="text-amber-300">7 tickets por hoja</strong>, en lugar de los 5 habituales.
424:                   </p>
425:                 </div>
426:               </div>
427: 
428:               {/* Resultados */}
429:               <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-900 p-5 sm:p-6 space-y-5">
430:                 <div>
431:                   <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
432:                     Recaudación Total Potencial
433:                   </span>
434:                   <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono mt-1">
435:                     {formatCurrency(totalRaised)}
436:                   </p>
437:                   <p className="text-[11px] text-slate-400 mt-0.5">
438:                     Fondos brutos con el 100% de los números colocados.
439:                   </p>
440:                 </div>
441: 
442:                 <div className="pt-4 border-t border-slate-800/80 space-y-3">
443:                   <div className="flex items-center justify-between text-xs">
444:                     <span className="text-slate-400">Hojas con método tradicional (Word):</span>
445:                     <span className="font-mono font-bold text-slate-300">{standardSheets} hojas A4</span>
446:                   </div>
447:                   <div className="flex items-center justify-between text-xs">
448:                     <span className="text-emerald-400 font-semibold">Hojas con Eventazo A4 Optimizado:</span>
449:                     <span className="font-mono font-bold text-emerald-400 text-sm">{eventazoSheets} hojas A4</span>
450:                   </div>
451:                   <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
452:                     <span className="text-amber-300 font-bold">Hojas A4 ahorradas:</span>
453:                     <span className="font-mono font-bold text-amber-400 text-sm">
454:                       {sheetsSaved} hojas ({percentSaved}% menos papel)
455:                     </span>
456:                   </div>
457:                 </div>
458: 
459:                 <Link href="/editor" className="block pt-2">
460:                   <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs h-10 rounded-xl shadow-lg shadow-amber-500/20">
461:                     Comenzar a Diseñar esta Rifa
462:                   </Button>
463:                 </Link>
464:               </div>
465:             </div>
466:           </div>
467:         </div>
468:       </section>
469: 
470:       {/* ============================================================ */}
471:       {/* 6. COMPARATIVA: EVENTAZO VS METODOS TRADICIONALES           */}
472:       {/* ============================================================ */}
473:       <section id="comparativa" className="py-16 bg-slate-900/40 border-y border-slate-800/80">
474:         <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
475:           <div className="text-center mb-10">
476:             <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
477:               ¿Por qué cambiar a Eventazo?
478:             </span>
479:             <h3 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
480:               La diferencia entre perder horas y resolverlo en 2 minutos
481:             </h3>
482:           </div>
483: 
484:           <div className="rounded-3xl border border-slate-800 overflow-hidden bg-slate-900/90 shadow-xl">
485:             <div className="grid grid-cols-3 p-4 sm:p-5 bg-slate-850 border-b border-slate-800 text-xs font-bold text-slate-200">
486:               <div>Funcionalidad</div>
487:               <div className="text-center text-slate-400">Word / Excel / Canva</div>
488:               <div className="text-center text-amber-400 font-black">Eventazo PRO</div>
489:             </div>
490: 
491:             <div className="divide-y divide-slate-800/60 text-xs">
492:               <ComparisonRow
493:                 feature="Numeración automática 0001 a N"
494:                 traditional="Copiar y pegar a mano (riesgo de duplicados)"
495:                 eventazo="100% automático y matemáticamente único"
496:               />
497:               <ComparisonRow
498:                 feature="Aprovechamiento de hoja A4"
499:                 traditional="Desperdicia hasta el 40% del margen lateral"
500:                 eventazo="Acomoda tickets verticales y horizontales"
501:               />
502:               <ComparisonRow
503:                 feature="Talón de control desprendible"
504:                 traditional="Difícil de alinear con líneas de puntos"
505:                 eventazo="Estandarizado con micro-puntos y corte limpio"
506:               />
507:               <ComparisonRow
508:                 feature="Ajuste de múltiples premios"
509:                 traditional="Se desborda el texto y deforma el boleto"
510:                 eventazo="Distribución inteligente en 2, 3 o 4 columnas"
511:               />
512:               <ComparisonRow
513:                 feature="Costo de producción"
514:                 traditional="Altos costos de imprenta ($30k-$80k)"
515:                 eventazo="100% gratis para diseñar y exportar en PDF"
516:               />
517:             </div>
518:           </div>
519:         </div>
520:       </section>
521: 
522:       {/* ============================================================ */}
523:       {/* 7. CASOS DE USO REALES                                      */}
524:       {/* ============================================================ */}
525:       <section id="casos" className="py-16 sm:py-24">
526:         <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
527:           <div className="text-center mb-12">
528:             <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
529:               Soluciones a Medida
530:             </span>
531:             <h3 className="text-2xl sm:text-4xl font-black text-slate-100 mt-1">
532:               Creado para quienes necesitan recaudar fondos en serio
533:             </h3>
534:           </div>
535: 
536:           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
537:             <UseCaseCard
538:               icon={<GraduationCap className="h-6 w-6 text-amber-400" />}
539:               title="Escuelas y Cooperadoras"
540:               description="Kermesses escolares, día del maestro, viajes de egresados y equipamiento de aulas. Imprime planchas que los alumnos pueden vender fácilmente."
541:               badge="Educación"
542:             />
543:             <UseCaseCard
544:               icon={<Trophy className="h-6 w-6 text-emerald-400" />}
545:               title="Clubes y Escuelas Deportivas"
546:               description="Compra de indumentaria, pelotas, viajes a torneos y mantenimiento de canchas. Diseños con hasta 15 premios en varias columnas."
547:               badge="Deportes"
548:             />
549:             <UseCaseCard
550:               icon={<HeartHandshake className="h-6 w-6 text-rose-400" />}
551:               title="Campañas Solidarias y Salud"
552:               description="Tratamientos médicos, cirugías, rescate animal y urgencias comunitarias. Máxima transparencia con talones de control para cada colaborador."
553:               badge="Solidario"
554:             />
555:           </div>
556:         </div>
557:       </section>
558: 
559:       {/* ============================================================ */}
560:       {/* 8. PREGUNTAS FRECUENTES (FAQ)                               */}
561:       {/* ============================================================ */}
562:       <section id="preguntas" className="py-16 bg-slate-900/30 border-t border-slate-800/80">
563:         <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
564:           <div className="text-center mb-10">
565:             <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
566:               Dudas Resueltas
567:             </span>
568:             <h3 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
569:               Preguntas Frecuentes
570:             </h3>
571:           </div>
572: 
573:           <div className="space-y-4">
574:             <FaqItem
575:               question="¿Qué tipo de papel es recomendable para imprimir?"
576:               answer="Para fotocopiadoras o impresoras domésticas, el papel común obra de 75g o 80g funciona excelente y es muy económico. Si buscas un acabado premium para vender a mayor precio, puedes usar cartulina chambril u opalina de 120g a 150g."
577:             />
578:             <FaqItem
579:               question="¿Cómo se cortan y arman los talonarios?"
580:               answer="Los boletos incluyen líneas de corte punteadas normalizadas. Puedes cortarlos con guillotina de papel o trincheta y regla. Para armar talonarios (por ejemplo de 25 o 50 boletos), basta con colocar dos grampas metálicas en el borde izquierdo del talón de control o aplicar pegamento para blocks."
581:             />
582:             <FaqItem
583:               question="¿Cómo funciona la numeración automática?"
584:               answer="Tú solo defines el número de inicio (por ejemplo 0001) y la cantidad total (por ejemplo 1.000). Eventazo calcula matemáticamente la cantidad de dígitos necesarios para rellenar con ceros a la izquierda y numera secuencialmente cada boleto y su talón correspondiente sin posibilidad de duplicados."
585:             />
586:             <FaqItem
587:               question="¿Puedo guardar mis diseños para modificarlos después?"
588:               answer="Sí. Gracias a la integración con Supabase y modo local, puedes hacer clic en 'Guardar Rifa' en la barra superior y tus diseños quedarán archivados en 'Mis Rifas' para editarlos o volver a imprimirlos cuando quieras."
589:             />
590:           </div>
591:         </div>
592:       </section>
593: 
594:       {/* ============================================================ */}
595:       {/* 9. BANNER CTA FINAL                                         */}
596:       {/* ============================================================ */}
597:       <section className="py-20 relative overflow-hidden">
598:         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-amber-500/10 pointer-events-none" />
599: 
600:         <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center relative z-10">
601:           <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
602:             <Printer className="h-6 w-6" />
603:           </div>
604: 
605:           <h3 className="text-3xl sm:text-4xl font-black text-slate-100">
606:             Listo para crear tu primera plancha de rifas en 2 minutos?
607:           </h3>
608:           <p className="mt-3 text-slate-400 text-sm max-w-lg mx-auto">
609:             Sin programas pesados, sin registros molestos. Entra al editor y descarga tu PDF listo para imprimir.
610:           </p>
611: 
612:           <div className="mt-8 flex justify-center">
613:             <Link href="/editor">
614:               <Button
615:                 size="lg"
616:                 className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm h-12 px-8 rounded-2xl shadow-xl shadow-amber-500/30 flex items-center gap-2 group"
617:               >
618:                 <span>Abrir Editor Gratuito</span>
619:                 <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
620:               </Button>
621:             </Link>
622:           </div>
623:         </div>
624:       </section>
625: 
626:       {/* ============================================================ */}
627:       {/* 10. FOOTER                                                  */}
628:       {/* ============================================================ */}
629:       <footer className="border-t border-slate-800 py-8 bg-slate-950">
630:         <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
631:           <div className="flex items-center gap-2">
632:             <Image src="/icon.svg" alt="Eventazo" width={24} height={24} className="rounded-md" />
633:             <span className="text-xs font-bold text-slate-300">Eventazo Studio PRO</span>
634:             <span className="text-[10px] text-slate-500">• Impresión de Rifas</span>
635:           </div>
636: 
637:           <p className="text-xs text-slate-500">
638:             Desarrollado con dedicación por{" "}
639:             <a
640:               href="https://somos-env.netlify.app/"
641:               target="_blank"
642:               rel="noopener noreferrer"
643:               className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
644:             >
645:               SoMoS
646:             </a>
647:           </p>
648:         </div>
649:       </footer>
650: 
651:       {/* Modal de Autenticación */}
652:       <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
653:     </div>
654:   );
655: }
656: 
657: // Fila de Comparativa
658: function ComparisonRow({
659:   feature,
660:   traditional,
661:   eventazo,
662: }: {
663:   feature: string;
664:   traditional: string;
665:   eventazo: string;
666: }) {
667:   return (
668:     <div className="grid grid-cols-3 p-4 sm:p-4.5 items-center hover:bg-slate-800/30 transition-colors">
669:       <span className="font-semibold text-slate-200">{feature}</span>
670:       <div className="text-center text-slate-400 flex items-center justify-center gap-1.5 px-2">
671:         <XCircle className="h-4 w-4 text-rose-500 shrink-0 hidden sm:inline" />
672:         <span>{traditional}</span>
673:       </div>
674:       <div className="text-center text-amber-300 font-medium flex items-center justify-center gap-1.5 px-2">
675:         <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 hidden sm:inline" />
676:         <span>{eventazo}</span>
677:       </div>
678:     </div>
679:   );
680: }
681: 
682: // Tarjeta de Caso de Uso
683: function UseCaseCard({
684:   icon,
685:   title,
686:   description,
687:   badge,
688: }: {
689:   icon: React.ReactNode;
690:   title: string;
691:   description: string;
692:   badge: string;
693: }) {
694:   return (
695:     <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-200 group">
696:       <div>
697:         <div className="flex items-center justify-between mb-4">
698:           <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
699:             {icon}
700:           </div>
701:           <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
702:             {badge}
703:           </span>
704:         </div>
705:         <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
706:           {title}
707:         </h4>
708:         <p className="text-xs text-slate-400 mt-2 leading-relaxed">
709:           {description}
710:         </p>
711:       </div>
712: 
713:       <div className="mt-6 pt-4 border-t border-slate-800/80">
714:         <Link
715:           href="/editor"
716:           className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
717:         >
718:           <span>Diseñar para este caso</span>
719:           <ArrowRight className="h-3.5 w-3.5" />
720:         </Link>
721:       </div>
722:     </div>
723:   );
724: }
725: 
726: // Acordeón / Item de Pregunta Frecuente
727: function FaqItem({ question, answer }: { question: string; answer: string }) {
728:   const [open, setOpen] = useState(false);
729: 
730:   return (
731:     <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors">
732:       <button
733:         onClick={() => setOpen(!open)}
734:         className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-200 hover:text-amber-300 transition-colors"
735:       >
736:         <span>{question}</span>
737:         <span className="text-slate-500 text-lg font-mono leading-none">
738:           {open ? "−" : "+"}
739:         </span>
740:       </button>
741:       {open && (
742:         <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3 animate-in fade-in duration-150">
743:           {answer}
744:         </div>
745:       )}
746:     </div>
747:   );
748: }
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
 85:     <Card className="shadow-lg border-slate-700/80">
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
 87:     <div className="rounded-xl border border-slate-700/50 bg-slate-800/80 p-4 space-y-3">
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
 60:     <Card className="shadow-lg border-slate-700/80">
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

## File: src/components/Header.tsx
````typescript
  1: "use client";
  2: 
  3: import { useState, useEffect } from "react";
  4: import Image from "next/image";
  5: import {
  6:   FolderOpen,
  7:   Save,
  8:   LogIn,
  9:   LogOut,
 10:   User as UserIcon,
 11:   Check,
 12:   Sparkles,
 13:   Database
 14: } from "lucide-react";
 15: import { Button } from "@/components/ui/button";
 16: import { useAuth } from "@/hooks/useAuth";
 17: import { AuthModal } from "@/components/auth/AuthModal";
 18: import { ProfileModal } from "@/components/auth/ProfileModal";
 19: import { SavedTicketsDrawer } from "@/components/SavedTicketsDrawer";
 20: import { useRifaStore } from "@/store/useRifaStore";
 21: import { saveTicketDesign, getSavedTickets } from "@/services/tickets-service";
 22: 
 23: export function Header() {
 24:   const { user, signOut, isConfigured } = useAuth();
 25:   const { ticketConfig, printConfig } = useRifaStore();
 26: 
 27:   const [isAuthOpen, setIsAuthOpen] = useState(false);
 28:   const [isProfileOpen, setIsProfileOpen] = useState(false);
 29:   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 30:   const [saving, setSaving] = useState(false);
 31:   const [saveSuccess, setSaveSuccess] = useState(false);
 32:   const [savedCount, setSavedCount] = useState(0);
 33: 
 34:   // Cargar cantidad de boletos guardados
 35:   const refreshCount = async () => {
 36:     try {
 37:       const list = await getSavedTickets();
 38:       setSavedCount(list.length);
 39:     } catch {
 40:       // Ignorar error silencioso
 41:     }
 42:   };
 43: 
 44:   useEffect(() => {
 45:     refreshCount();
 46:   }, [user]);
 47: 
 48:   const handleSave = async () => {
 49:     if (!user) {
 50:       setIsAuthOpen(true);
 51:       return;
 52:     }
 53: 
 54:     setSaving(true);
 55:     try {
 56:       await saveTicketDesign(
 57:         ticketConfig.eventName || "Mi Rifa",
 58:         ticketConfig,
 59:         printConfig
 60:       );
 61:       setSaveSuccess(true);
 62:       refreshCount();
 63:       setTimeout(() => setSaveSuccess(false), 2500);
 64:     } catch (e) {
 65:       console.error("Error al guardar:", e);
 66:     } finally {
 67:       setSaving(false);
 68:     }
 69:   };
 70: 
 71:   return (
 72:     <>
 73:       <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-slate-900/90 backdrop-blur-md">
 74:         <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
 75:           {/* Logo & Marca */}
 76:           <div className="flex items-center gap-2 sm:gap-3">
 77:             <div className="relative">
 78:               <Image
 79:                 src="/icon.svg"
 80:                 alt="Eventazo"
 81:                 width={40}
 82:                 height={40}
 83:                 className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl shadow-lg shadow-amber-500/20"
 84:               />
 85:               <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-black text-slate-950">
 86:                 ★
 87:               </span>
 88:             </div>
 89:             <div>
 90:               <div className="flex items-center gap-1.5">
 91:                 <h1 className="text-sm sm:text-lg font-black text-slate-100 tracking-tight">
 92:                   Eventazo
 93:                 </h1>
 94:                 <span className="rounded bg-gradient-to-r from-amber-500/20 to-amber-300/20 border border-amber-500/40 px-1.5 py-0.2 text-[9px] font-bold text-amber-300">
 95:                   PRO
 96:                 </span>
 97:               </div>
 98:               <p className="text-[10px] text-slate-400 hidden sm:block">
 99:                 Diseño & Impresión de Rifas Profesionales
100:               </p>
101:             </div>
102:           </div>
103: 
104:           {/* Acciones del Header */}
105:           <div className="flex items-center gap-1.5 sm:gap-3">
106:             {/* Botón Mis Rifas */}
107:             <Button
108:               variant="outline"
109:               size="sm"
110:               onClick={() => setIsDrawerOpen(true)}
111:               className="border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-amber-400 text-xs h-8 sm:h-9 px-2 sm:px-3 rounded-xl gap-1.5"
112:             >
113:               <FolderOpen className="h-3.5 w-3.5 text-amber-400" />
114:               <span className="hidden sm:inline">Mis Rifas</span>
115:               {savedCount > 0 && (
116:                 <span className="ml-1 rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-mono font-bold text-amber-400">
117:                   {savedCount}
118:                 </span>
119:               )}
120:             </Button>
121: 
122:             {/* Botón Guardar Rifa */}
123:             <Button
124:               size="sm"
125:               onClick={handleSave}
126:               disabled={saving}
127:               className={`h-8 sm:h-9 px-2 sm:px-3 text-xs font-bold rounded-xl gap-1.5 transition-all shadow-md ${
128:                 saveSuccess
129:                   ? "bg-emerald-500 text-white shadow-emerald-500/20"
130:                   : "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/20"
131:               }`}
132:             >
133:               {saveSuccess ? (
134:                 <>
135:                   <Check className="h-3.5 w-3.5" />
136:                   <span>¡Guardado!</span>
137:                 </>
138:               ) : (
139:                 <>
140:                   <Save className="h-3.5 w-3.5" />
141:                   <span>{saving ? "Guardando..." : "Guardar"}</span>
142:                 </>
143:               )}
144:             </Button>
145: 
146:             {/* Usuario / Login */}
147:             {user ? (
148:               <div className="flex items-center gap-1 sm:gap-2 pl-1 border-l border-slate-800">
149:                 <button
150:                   type="button"
151:                   onClick={() => setIsProfileOpen(true)}
152:                   className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 transition-colors text-left group"
153:                   title="Ver y editar mi perfil"
154:                 >
155:                   <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-500/30 group-hover:scale-105 transition-transform">
156:                     {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
157:                   </div>
158:                   <span className="text-xs font-medium text-slate-300 group-hover:text-amber-300 max-w-[95px] truncate hidden md:inline transition-colors">
159:                     {user.name || user.email.split("@")[0]}
160:                   </span>
161:                   {user.isDemo && (
162:                     <span className="text-[9px] bg-slate-700 text-amber-300 px-1 rounded">
163:                       Demo
164:                     </span>
165:                   )}
166:                 </button>
167: 
168:                 <Button
169:                   variant="ghost"
170:                   size="sm"
171:                   onClick={() => signOut()}
172:                   title="Cerrar sesión"
173:                   className="h-8 w-8 p-0 text-slate-400 hover:text-rose-400 rounded-xl"
174:                 >
175:                   <LogOut className="h-3.5 w-3.5" />
176:                 </Button>
177:               </div>
178:             ) : (
179:               <Button
180:                 variant="ghost"
181:                 size="sm"
182:                 onClick={() => setIsAuthOpen(true)}
183:                 className="h-8 sm:h-9 px-2 sm:px-3 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 rounded-xl gap-1.5"
184:               >
185:                 <LogIn className="h-3.5 w-3.5" />
186:                 <span>Ingresar</span>
187:               </Button>
188:             )}
189:           </div>
190:         </div>
191:       </header>
192: 
193:       {/* Modal de Autenticación */}
194:       <AuthModal
195:         isOpen={isAuthOpen}
196:         onClose={() => setIsAuthOpen(false)}
197:         onSuccess={() => {
198:           refreshCount();
199:         }}
200:       />
201: 
202:       {/* Modal de Perfil de Usuario */}
203:       <ProfileModal
204:         isOpen={isProfileOpen}
205:         onClose={() => setIsProfileOpen(false)}
206:       />
207: 
208:       {/* Cajón de Rifas Guardadas */}
209:       <SavedTicketsDrawer
210:         isOpen={isDrawerOpen}
211:         onClose={() => setIsDrawerOpen(false)}
212:         onSelectTicket={() => {
213:           refreshCount();
214:         }}
215:         onOpenAuth={() => setIsAuthOpen(true)}
216:       />
217:     </>
218:   );
219: }
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
101:     <Card className="shadow-lg border-slate-700/80">
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

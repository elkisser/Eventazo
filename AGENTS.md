# AGENTS.md - Eventazo Codebase Guide

## Visión General del Proyecto
**Eventazo** es una aplicación SaaS para el diseño, configuración, optimización y generación de planchas de boletos y rifas en PDF de alta fidelidad, listos para imprimir en formato A4 con talones de control desprendibles.

## Stack Tecnológico
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Estilos**: Tailwind CSS 4, Lucide React (iconografía)
- **Estado Global**: Zustand (`src/store/useRifaStore.ts`)
- **Generación de PDF**: `pdf-lib` (`src/services/pdf-generator.ts`) con renderizado vectorial nativo y operadores directos de transformación
- **Persistencia y Autenticación**: Supabase (`@supabase/supabase-js`) con fallback local/demo
- **Indexación y Análisis Rápido**: Repomix (`pnpm repomix` -> `repomix-output.md`)

## Estructura de Directorios Clave
```
src/
├── app/                  # Rutas Next.js (page.tsx, layout.tsx, globals.css)
├── components/           # Componentes de la interfaz
│   ├── auth/             # Modal de Login y Registro (Supabase Auth)
│   ├── ui/               # Botones, inputs, tarjetas, selects
│   ├── ConfigPanel.tsx   # Configuración de evento, premios, tipografía
│   ├── GeneratePanel.tsx # Barra de progreso y descarga de PDF
│   ├── Header.tsx        # Barra superior con estado de usuario, Mis Rifas y Guardar
│   ├── PageLayoutPreview # Visualización de grilla A4 (horizontales + verticales)
│   ├── PrintConfigPanel  # Dimensiones, márgenes, talón y espaciado
│   ├── PrizeEditor.tsx   # Editor dinámico de lista de premios
│   ├── SavedTicketsDrawer# Gestor de diseños guardados en Supabase
│   └── TicketPreview.tsx # Vista previa interactiva 1:1 en pantalla
├── lib/
│   ├── constants.ts      # Dimensiones A4, factores de escala y defaults
│   ├── supabase.ts       # Cliente Supabase y helpers de sesión
│   └── utils.ts          # Formateo de números, moneda, colores y columnas
├── services/
│   ├── pdf-generator.ts  # Generador de PDF A4 multipágina con tickets laterales
│   └── tickets-service.ts# CRUD de rifas guardadas (Supabase + LocalStorage fallback)
├── store/
│   └── useRifaStore.ts   # Estado global Zustand (TicketConfig, PrintConfig, UI)
└── types/
    └── index.ts          # Interfaces TypeScript
```

## Convenciones de Generación de PDF
- **A4 en puntos**: Ancho 595.28 pt, Alto 841.89 pt (1 mm = 2.83465 pt).
- **Tickets Verticales (Columna lateral derecha)**: Se dibujan usando operadores directos de transformación de matriz (`pushOperators`, `pushGraphicsState`, `translate`, `rotateRadians`, `popGraphicsState`). **NUNCA** usar documentos temporales (`tempDoc`) ni `embedPages` para rotar elementos porque desvinculan las fuentes incrustadas.

## Comandos Rápidos
- `pnpm dev`: Inicia el servidor de desarrollo en http://localhost:3000
- `pnpm build`: Compila el proyecto Next.js y valida tipos TypeScript
- `pnpm repomix` / `pnpm analyze`: Empaqueta todo el proyecto para análisis instantáneo por agentes de código

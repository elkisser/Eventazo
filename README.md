# 🎟️ Generador de Rifas Profesional

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![pdf-lib](https://img.shields.io/badge/pdf--lib-1.17-red?style=for-the-badge)

**Sistema profesional de generación e impresión de rifas/tickets de sorteos.**

Optimizado para impresión A4 con diseño premium y generación masiva ultra rápida.

</div>

---

## ✨ Características

- 🎨 **Diseño premium** — Estilo elegante inspirado en el Día del Padre con tonos azul oscuro y dorado
- 📄 **Generación masiva de PDF** — Genera cientos de tickets sin bloquear la interfaz
- 🖨️ **Optimizado para impresión A4** — Maximiza la cantidad de tickets por página
- 🔄 **Tickets horizontales + verticales** — Aprovecha todo el espacio de la hoja con tickets rotados en el costado
- 👁️ **Vista previa en tiempo real** — Visualizá cómo queda el ticket antes de generar
- 📐 **Layout configurable** — Ajustá tamaño, márgenes y espaciado desde la UI
- 🌙 **Modo oscuro elegante** — Interfaz moderna con tema oscuro por defecto
- 🔢 **Numeración única garantizada** — Nunca se repite un número
- ✂️ **Líneas de corte** — Guías punteadas para cortar los tickets fácilmente
- 📊 **Visualización de distribución** — Diagrama que muestra cómo quedan los tickets en la página

---

## 🚀 Inicio Rápido

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd rifa-generator

# Instalar dependencias
pnpm install

# Levantar en desarrollo
pnpm dev

# Build de producción
pnpm build
```

> [!NOTE]
> Este proyecto usa **pnpm** como gestor de paquetes. Asegurate de tenerlo instalado: `npm install -g pnpm`

---

## 🏗️ Arquitectura

```
src/
├── app/              # App Router de Next.js (layout, página principal)
├── components/       # Componentes de UI
│   ├── ui/           # Componentes base (Button, Card, Input, etc.)
│   ├── Header.tsx
│   ├── ConfigPanel.tsx
│   ├── PrintConfigPanel.tsx
│   ├── TicketPreview.tsx
│   ├── GeneratePanel.tsx
│   ├── ImageUpload.tsx
│   └── PageLayoutPreview.tsx
├── hooks/            # Hooks personalizados
│   └── usePdfGeneration.ts
├── lib/              # Utilidades y constantes
│   ├── utils.ts
│   └── constants.ts
├── services/         # Lógica de negocio
│   └── pdf-generator.ts
├── store/            # Estado global (Zustand)
│   └── useRifaStore.ts
└── types/            # Tipos TypeScript
    └── index.ts
```

---

## 📋 Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 15** | Framework con App Router y Turbopack |
| **TypeScript** | Tipado estático en todo el proyecto |
| **TailwindCSS 4** | Estilos utilitarios y diseño responsive |
| **Zustand** | Estado global ligero y performante |
| **pdf-lib** | Generación de PDFs en el cliente |
| **Lucide React** | Iconografía moderna |

---

## 🎫 Datos del Sorteo (Precargados)

> [!IMPORTANT]
> La aplicación viene preconfigurada con los datos de la **Gran Rifa Especial Día del Padre** organizada por la Escuela Nro. 71 Pedro Goyena.

- **900 tickets** numerados del 001 al 900
- **Valor:** $3.000
- **Fecha del sorteo:** Viernes 19 de Junio de 2026
- **20 premios** incluyendo parrilla, olla, asado, cenas, y más

---

## 📐 Sistema de Impresión

El generador optimiza automáticamente el espacio en la hoja A4:

```
┌─────────────────────────────────────┐
│  ┌──────────────┐  ┌──┐            │
│  │  Ticket H1   │  │V1│            │
│  └──────────────┘  │  │            │
│  ┌──────────────┐  │  │            │
│  │  Ticket H2   │  └──┘            │
│  └──────────────┘  ┌──┐            │
│  ┌──────────────┐  │V2│            │
│  │  Ticket H3   │  │  │            │
│  └──────────────┘  │  │            │
│  ┌──────────────┐  └──┘            │
│  │  Ticket H4   │                  │
│  └──────────────┘                  │
│  ┌──────────────┐                  │
│  │  Ticket H5   │                  │
│  └──────────────┘                  │
└─────────────────────────────────────┘
         5 horizontales + 2 verticales = 7 por página
```

> [!TIP]
> Con la configuración por defecto (130mm × 50mm) entran **7 tickets por página** (5 horizontales + 2 rotados en el costado). Para 900 tickets son solo **129 páginas**.

---

## ⚙️ Configuración

Todos los parámetros son editables desde la interfaz:

| Parámetro | Default | Descripción |
|---|---|---|
| Ancho del ticket | 130mm | Ancho del ticket horizontal |
| Alto del ticket | 50mm | Alto del ticket horizontal |
| Márgenes | 3mm | Espacio entre el borde de la hoja y los tickets |
| Espacio entre tickets | 2mm | Gap entre tickets adyacentes |
| Número inicial | 1 | Primer número de la serie |
| Total de tickets | 900 | Cantidad a generar |

---

## 🖼️ Diseño del Ticket

Cada ticket incluye:

- **Sección principal (72%)** — Nombre del evento, subtítulo, fecha, contribución, lista de 20 premios en 2 columnas, valor y número grande
- **Talón de control (28%)** — Título, fecha, campos para nombre y teléfono, valor y número
- **Línea de corte** — Separador punteado entre tickets y entre sección principal y talón

---

## 🧑‍💻 Desarrollo

```bash
# Desarrollo con hot reload
pnpm dev

# Verificar tipos
pnpm build

# Linter
pnpm lint
```

> [!WARNING]
> La generación de PDFs con tickets rotados crea documentos temporales internos para cada ticket vertical. Con muchos tickets esto puede tardar unos segundos — la barra de progreso muestra el avance en tiempo real sin bloquear la UI.

---

## 📄 Licencia

Proyecto desarrollado para la **Escuela Nro. 71 Pedro Goyena**.

---

<div align="center">

Hecho con ❤️ para el **Día del Padre 2026**

</div>

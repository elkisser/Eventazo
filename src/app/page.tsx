"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Printer,
  CheckCircle2,
  XCircle,
  Calculator,
  Sliders,
  FileText,
  Copy,
  Layers,
  ShieldCheck,
  Zap,
  HelpCircle,
  GraduationCap,
  Trophy,
  HeartHandshake,
  Calendar,
  LogIn,
  Scissors
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/lib/utils";

export default function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user } = useAuth();

  // Estados de la Calculadora de Recaudación y Ahorro
  const [calcTickets, setCalcTickets] = useState(600);
  const [calcPrice, setCalcPrice] = useState(2500);

  // Cálculos matemáticos transparentes y 100% reales
  const { totalRaised, standardSheets, eventazoSheets, sheetsSaved, percentSaved } = useMemo(() => {
    const raised = calcTickets * calcPrice;
    // En A4 horizontal estándar entran 5 tickets por hoja (1 columna de 5 filas de 130x50mm)
    // Con Eventazo lateral vertical entran 5 horizontales + 2 verticales = 7 tickets por hoja
    const stdSheets = Math.ceil(calcTickets / 5);
    const evSheets = Math.ceil(calcTickets / 7);
    const saved = Math.max(0, stdSheets - evSheets);
    const percent = stdSheets > 0 ? Math.round((saved / stdSheets) * 100) : 0;

    return {
      totalRaised: raised,
      standardSheets: stdSheets,
      eventazoSheets: evSheets,
      sheetsSaved: saved,
      percentSaved: percent,
    };
  }, [calcTickets, calcPrice]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* ============================================================ */}
      {/* 1. NAVBAR COMERCIAL                                         */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Image
                src="/icon.svg"
                alt="Eventazo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-black text-slate-950">
                ★
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-100">
                  Eventazo
                </span>
                <span className="rounded bg-gradient-to-r from-amber-500/20 to-amber-300/20 border border-amber-500/40 px-1.5 py-0.2 text-[9px] font-bold text-amber-400">
                  PRO
                </span>
              </div>
            </div>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#caracteristicas" className="hover:text-amber-400 transition-colors">
              Características
            </a>
            <a href="#calculadora" className="hover:text-amber-400 transition-colors">
              Calculadora de Ahorro
            </a>
            <a href="#comparativa" className="hover:text-amber-400 transition-colors">
              Comparativa
            </a>
            <a href="#casos" className="hover:text-amber-400 transition-colors">
              Casos de Uso
            </a>
            <a href="#preguntas" className="hover:text-amber-400 transition-colors">
              Preguntas Frecuentes
            </a>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <Link
                href="/editor"
                className="text-xs text-slate-300 hover:text-amber-400 px-2 py-1 hidden sm:block"
              >
                Hola, <span className="font-semibold">{user.name || user.email.split("@")[0]}</span>
              </Link>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAuthOpen(true)}
                className="text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-xl gap-1.5 h-9"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Ingresar</span>
              </Button>
            )}

            <Link href="/editor">
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs h-9 px-3.5 sm:px-4 rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-1.5 group"
              >
                <span>Crear Rifa Gratis</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 2. HERO SECTION CON ALTO IMPACTO                            */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Luces de fondo decorativas */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 to-amber-300/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          {/* Badge de confianza */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-6 shadow-inner animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>El generador inteligente para imprimir rifas en hojas A4</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-100">
            Diseña, numera e imprime planchas de rifas{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              sin desperdiciar papel
            </span>
          </h1>

          {/* Subtítulo enfocado en dolores reales */}
          <p className="mt-5 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Olvídate de pegar números manualmente en Word o Canva. Eventazo acomoda automáticamente{" "}
            <strong className="text-slate-200 font-semibold">tickets horizontales y verticales</strong> en la misma hoja A4, genera talones de control desprendibles y te entrega un PDF vectorial listo para imprimir.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/editor" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm h-12 px-7 rounded-2xl shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 group"
              >
                <span>Diseñar Mi Rifa Ahora</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <a href="#calculadora" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm h-12 px-6 rounded-2xl flex items-center justify-center gap-2"
              >
                <Calculator className="h-4 w-4 text-amber-400" />
                <span>Calcular Ahorro de Hojas</span>
              </Button>
            </a>
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            No requiere tarjeta de crédito • 100% funcional en navegador • Exportación directa en PDF
          </p>

          {/* ============================================================ */}
          {/* 3. MÉTRICAS 100% REALES Y TÉCNICAS (SIN VANIDAD)            */}
          {/* ============================================================ */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">0%</p>
              <h4 className="text-xs font-bold text-slate-200 mt-1">Error de Correlatividad</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Numeración continua garantizada matemáticamente sin saltos ni duplicados.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">+40%</p>
              <h4 className="text-xs font-bold text-slate-200 mt-1">Aprovechamiento de Hoja</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Exprime el lateral derecho de la hoja A4 con tickets verticales girados 90°.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">100%</p>
              <h4 className="text-xs font-bold text-slate-200 mt-1">Fidelidad Vectorial</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Textos nítidos con operadores nativos, sin píxeles borrosos al fotocopiar.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">&lt; 3 seg</p>
              <h4 className="text-xs font-bold text-slate-200 mt-1">Generación Multipágina</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Compilación instantánea en tu navegador lista para imprimir en casa o imprenta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MOCKUP VISUAL INTERACTIVO: EL BOLETO Y LA HOJA A4        */}
      {/* ============================================================ */}
      <section className="py-12 border-y border-slate-800/80 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-8">
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
              Anatomía de un Boleto de Rifa Profesional
            </h3>
            <p className="text-xl sm:text-2xl font-black text-slate-100">
              Diseñado específicamente para cortar, talonear y vender
            </p>
          </div>

          {/* Tarjeta del Boleto Ilustrado */}
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-4 sm:p-6 shadow-2xl">
            {/* Boleto Horizontal Demo */}
            <div className="rounded-xl border border-slate-600 bg-white text-slate-900 shadow-xl overflow-hidden flex flex-col sm:flex-row">
              {/* Cuerpo Principal */}
              <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between border-b-2 sm:border-b-0 sm:border-r-2 border-dashed border-slate-300">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Bono Contribución Solidario
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Sorteo: 28 de Noviembre 2026
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-2 leading-tight">
                    Gran Rifa Anual Club Atlético & Social
                  </h4>
                  <p className="text-xs text-rose-800 font-bold italic mt-0.5">
                    Subcomisión de Deporte Infantil • Obras en Sede
                  </p>

                  {/* Lista de premios en columnas */}
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Premios del Sorteo:
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] text-rose-800 font-medium italic">
                      <p><strong className="not-italic text-slate-900">1°:</strong> Moto 110cc 0KM</p>
                      <p><strong className="not-italic text-slate-900">2°:</strong> Smart TV 55&quot; 4K</p>
                      <p><strong className="not-italic text-slate-900">3°:</strong> Heladera con Freezer</p>
                      <p><strong className="not-italic text-slate-900">4°:</strong> Bicicleta Rodado 29</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900">Valor: $ 3.000</span>
                  <span className="text-lg sm:text-xl font-black font-mono text-rose-700">
                    N° 0482
                  </span>
                </div>
              </div>

              {/* Talón de Control */}
              <div className="w-full sm:w-64 bg-slate-50 p-4 sm:p-5 flex flex-col justify-between border-slate-200">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-800 border-b border-slate-300 pb-0.5">
                      Talón de Control
                    </span>
                    <Scissors className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
                  </div>

                  <div className="mt-3 space-y-2 text-[11px]">
                    <div>
                      <span className="text-slate-600 block text-[10px] font-bold">Nombre y Apellido:</span>
                      <div className="border-b border-slate-400 h-4 mt-0.5" />
                    </div>
                    <div>
                      <span className="text-slate-600 block text-[10px] font-bold">Teléfono de Contacto:</span>
                      <div className="border-b border-slate-400 h-4 mt-0.5" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-600">Valor: $ 3.000</span>
                  <p className="text-base font-black font-mono text-rose-700">N° 0482</p>
                </div>
              </div>
            </div>

            {/* Guías explicativas */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs text-slate-400">
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/50 border border-slate-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Micro-punteado para corte manual o guillotina</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/50 border border-slate-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Datos del comprador en talón para la urna</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/50 border border-slate-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Numeración coincidente en cuerpo y talón</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CALCULADORA INTERACTIVA DE RECAUDACIÓN Y PAPEL           */}
      {/* ============================================================ */}
      <section id="calculadora" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Herramienta de Simulación Real
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-100 mt-1">
              Calcula la recaudación de tu rifa y el ahorro de papel
            </h3>
            <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              Simula tus números y comprueba exactamente cuántas hojas A4 necesitas y cuánto dinero generará tu evento.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Controles interactivos */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-200">
                      Cantidad de Boletos a Imprimir:
                    </label>
                    <span className="text-base font-bold font-mono text-amber-400">
                      {calcTickets} boletos
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={5000}
                    step={50}
                    value={calcTickets}
                    onChange={(e) => setCalcTickets(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>100 boletos</span>
                    <span>2.500 boletos</span>
                    <span>5.000 boletos</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-200">
                      Precio de Venta por Boleto:
                    </label>
                    <span className="text-base font-bold font-mono text-amber-400">
                      {formatCurrency(calcPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={15000}
                    step={250}
                    value={calcPrice}
                    onChange={(e) => setCalcPrice(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>$ 500</span>
                    <span>$ 7.500</span>
                    <span>$ 15.000</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-slate-200">
                    <Sliders className="h-4 w-4 text-amber-400" />
                    <span>Algoritmo de aprovechamiento A4</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Eventazo coloca 5 tickets horizontales + 2 verticales en el lateral = <strong className="text-amber-300">7 tickets por hoja</strong>, en lugar de los 5 habituales.
                  </p>
                </div>
              </div>

              {/* Resultados */}
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-900 p-5 sm:p-6 space-y-5">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    Recaudación Total Potencial
                  </span>
                  <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono mt-1">
                    {formatCurrency(totalRaised)}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Fondos brutos con el 100% de los números colocados.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Hojas con método tradicional (Word):</span>
                    <span className="font-mono font-bold text-slate-300">{standardSheets} hojas A4</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold">Hojas con Eventazo A4 Optimizado:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{eventazoSheets} hojas A4</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                    <span className="text-amber-300 font-bold">Hojas A4 ahorradas:</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">
                      {sheetsSaved} hojas ({percentSaved}% menos papel)
                    </span>
                  </div>
                </div>

                <Link href="/editor" className="block pt-2">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs h-10 rounded-xl shadow-lg shadow-amber-500/20">
                    Comenzar a Diseñar esta Rifa
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. COMPARATIVA: EVENTAZO VS METODOS TRADICIONALES           */}
      {/* ============================================================ */}
      <section id="comparativa" className="py-16 bg-slate-900/40 border-y border-slate-800/80">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              ¿Por qué cambiar a Eventazo?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
              La diferencia entre perder horas y resolverlo en 2 minutos
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-800 overflow-hidden bg-slate-900/90 shadow-xl">
            <div className="grid grid-cols-3 p-4 sm:p-5 bg-slate-850 border-b border-slate-800 text-xs font-bold text-slate-200">
              <div>Funcionalidad</div>
              <div className="text-center text-slate-400">Word / Excel / Canva</div>
              <div className="text-center text-amber-400 font-black">Eventazo PRO</div>
            </div>

            <div className="divide-y divide-slate-800/60 text-xs">
              <ComparisonRow
                feature="Numeración automática 0001 a N"
                traditional="Copiar y pegar a mano (riesgo de duplicados)"
                eventazo="100% automático y matemáticamente único"
              />
              <ComparisonRow
                feature="Aprovechamiento de hoja A4"
                traditional="Desperdicia hasta el 40% del margen lateral"
                eventazo="Acomoda tickets verticales y horizontales"
              />
              <ComparisonRow
                feature="Talón de control desprendible"
                traditional="Difícil de alinear con líneas de puntos"
                eventazo="Estandarizado con micro-puntos y corte limpio"
              />
              <ComparisonRow
                feature="Ajuste de múltiples premios"
                traditional="Se desborda el texto y deforma el boleto"
                eventazo="Distribución inteligente en 2, 3 o 4 columnas"
              />
              <ComparisonRow
                feature="Costo de producción"
                traditional="Altos costos de imprenta ($30k-$80k)"
                eventazo="100% gratis para diseñar y exportar en PDF"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. CASOS DE USO REALES                                      */}
      {/* ============================================================ */}
      <section id="casos" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Soluciones a Medida
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-100 mt-1">
              Creado para quienes necesitan recaudar fondos en serio
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UseCaseCard
              icon={<GraduationCap className="h-6 w-6 text-amber-400" />}
              title="Escuelas y Cooperadoras"
              description="Kermesses escolares, día del maestro, viajes de egresados y equipamiento de aulas. Imprime planchas que los alumnos pueden vender fácilmente."
              badge="Educación"
            />
            <UseCaseCard
              icon={<Trophy className="h-6 w-6 text-emerald-400" />}
              title="Clubes y Escuelas Deportivas"
              description="Compra de indumentaria, pelotas, viajes a torneos y mantenimiento de canchas. Diseños con hasta 15 premios en varias columnas."
              badge="Deportes"
            />
            <UseCaseCard
              icon={<HeartHandshake className="h-6 w-6 text-rose-400" />}
              title="Campañas Solidarias y Salud"
              description="Tratamientos médicos, cirugías, rescate animal y urgencias comunitarias. Máxima transparencia con talones de control para cada colaborador."
              badge="Solidario"
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. PREGUNTAS FRECUENTES (FAQ)                               */}
      {/* ============================================================ */}
      <section id="preguntas" className="py-16 bg-slate-900/30 border-t border-slate-800/80">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Dudas Resueltas
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
              Preguntas Frecuentes
            </h3>
          </div>

          <div className="space-y-4">
            <FaqItem
              question="¿Qué tipo de papel es recomendable para imprimir?"
              answer="Para fotocopiadoras o impresoras domésticas, el papel común obra de 75g o 80g funciona excelente y es muy económico. Si buscas un acabado premium para vender a mayor precio, puedes usar cartulina chambril u opalina de 120g a 150g."
            />
            <FaqItem
              question="¿Cómo se cortan y arman los talonarios?"
              answer="Los boletos incluyen líneas de corte punteadas normalizadas. Puedes cortarlos con guillotina de papel o trincheta y regla. Para armar talonarios (por ejemplo de 25 o 50 boletos), basta con colocar dos grampas metálicas en el borde izquierdo del talón de control o aplicar pegamento para blocks."
            />
            <FaqItem
              question="¿Cómo funciona la numeración automática?"
              answer="Tú solo defines el número de inicio (por ejemplo 0001) y la cantidad total (por ejemplo 1.000). Eventazo calcula matemáticamente la cantidad de dígitos necesarios para rellenar con ceros a la izquierda y numera secuencialmente cada boleto y su talón correspondiente sin posibilidad de duplicados."
            />
            <FaqItem
              question="¿Puedo guardar mis diseños para modificarlos después?"
              answer="Sí. Gracias a la integración con Supabase y modo local, puedes hacer clic en 'Guardar Rifa' en la barra superior y tus diseños quedarán archivados en 'Mis Rifas' para editarlos o volver a imprimirlos cuando quieras."
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. BANNER CTA FINAL                                         */}
      {/* ============================================================ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-amber-500/10 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
            <Printer className="h-6 w-6" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-slate-100">
            Listo para crear tu primera plancha de rifas en 2 minutos?
          </h3>
          <p className="mt-3 text-slate-400 text-sm max-w-lg mx-auto">
            Sin programas pesados, sin registros molestos. Entra al editor y descarga tu PDF listo para imprimir.
          </p>

          <div className="mt-8 flex justify-center">
            <Link href="/editor">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm h-12 px-8 rounded-2xl shadow-xl shadow-amber-500/30 flex items-center gap-2 group"
              >
                <span>Abrir Editor Gratuito</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FOOTER                                                  */}
      {/* ============================================================ */}
      <footer className="border-t border-slate-800 py-8 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/icon.svg" alt="Eventazo" width={24} height={24} className="rounded-md" />
            <span className="text-xs font-bold text-slate-300">Eventazo Studio PRO</span>
            <span className="text-[10px] text-slate-500">• Impresión de Rifas</span>
          </div>

          <p className="text-xs text-slate-500">
            Desarrollado con dedicación por{" "}
            <a
              href="https://somos-env.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
            >
              SoMoS
            </a>
          </p>
        </div>
      </footer>

      {/* Modal de Autenticación */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

// Fila de Comparativa
function ComparisonRow({
  feature,
  traditional,
  eventazo,
}: {
  feature: string;
  traditional: string;
  eventazo: string;
}) {
  return (
    <div className="grid grid-cols-3 p-4 sm:p-4.5 items-center hover:bg-slate-800/30 transition-colors">
      <span className="font-semibold text-slate-200">{feature}</span>
      <div className="text-center text-slate-400 flex items-center justify-center gap-1.5 px-2">
        <XCircle className="h-4 w-4 text-rose-500 shrink-0 hidden sm:inline" />
        <span>{traditional}</span>
      </div>
      <div className="text-center text-amber-300 font-medium flex items-center justify-center gap-1.5 px-2">
        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 hidden sm:inline" />
        <span>{eventazo}</span>
      </div>
    </div>
  );
}

// Tarjeta de Caso de Uso
function UseCaseCard({
  icon,
  title,
  description,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-200 group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
            {badge}
          </span>
        </div>
        <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80">
        <Link
          href="/editor"
          className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Diseñar para este caso</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

// Acordeón / Item de Pregunta Frecuente
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-200 hover:text-amber-300 transition-colors"
      >
        <span>{question}</span>
        <span className="text-slate-500 text-lg font-mono leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3 animate-in fade-in duration-150">
          {answer}
        </div>
      )}
    </div>
  );
}

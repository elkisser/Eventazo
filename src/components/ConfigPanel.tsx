"use client";

import { useState } from "react";
import {
  Settings,
  Calendar,
  DollarSign,
  Hash,
  Building2,
  Type,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Palette,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useRifaStore } from "@/store/useRifaStore";
import { PrizeEditor } from "@/components/PrizeEditor";
import { COLOR_PRESETS } from "@/lib/constants";
import { formatSpanishDate, formatShortDate } from "@/lib/utils";

export function ConfigPanel() {
  const { ticketConfig, setTicketConfig } = useRifaStore();
  const [showTypography, setShowTypography] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState(true);

  // Defaults fallback
  const titleSize = ticketConfig.titleFontSize ?? 14;
  const subtitleSize = ticketConfig.subtitleFontSize ?? 12;
  const prizesSize = ticketConfig.prizesFontSize ?? 8;
  const fontScale = ticketConfig.generalFontScale ?? 100;
  const currentColor = ticketConfig.primaryColor ?? "#991b1b";

  const handleResetTypography = () => {
    setTicketConfig({
      titleFontSize: 14,
      subtitleFontSize: 12,
      prizesFontSize: 8,
      generalFontScale: 100,
    });
  };

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const formatted = formatSpanishDate(e.target.value);
      setTicketConfig({ drawDate: formatted });
    }
  };

  return (
    <Card className="shadow-lg border-slate-700/80">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-amber-400" />
          <span>Configuración del Evento</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5 pt-4">
        {/* Sección: Información Principal */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 uppercase tracking-wider">
            <Building2 className="h-3.5 w-3.5" />
            <span>Datos del Evento</span>
          </div>

          {/* Event Name */}
          <div className="space-y-1.5">
            <Label htmlFor="eventName" className="text-xs text-slate-300">
              Nombre del Evento
            </Label>
            <Input
              id="eventName"
              value={ticketConfig.eventName}
              placeholder="Ej: GRAN RIFA ANUAL..."
              onChange={(e) => setTicketConfig({ eventName: e.target.value })}
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <Label htmlFor="subtitle" className="text-xs text-slate-300">
              Subtítulo o Lema
            </Label>
            <Input
              id="subtitle"
              value={ticketConfig.subtitle}
              placeholder="Ej: Especial Día del Padre"
              onChange={(e) => setTicketConfig({ subtitle: e.target.value })}
            />
          </div>

          {/* Organizer & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="organizer" className="text-xs text-slate-300">
                Organiza
              </Label>
              <Input
                id="organizer"
                value={ticketConfig.organizer}
                onChange={(e) => setTicketConfig({ organizer: e.target.value })}
              />
            </div>

            {/* Fecha del Sorteo con selector interactivo y texto libre */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="drawDate" className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Calendar className="h-3 w-3 text-amber-400/80" />
                  Fecha del Sorteo
                </Label>
                <label
                  htmlFor="datePickerHidden"
                  className="text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer flex items-center gap-1 underline underline-offset-2"
                  title="Abrir calendario para autocompletar"
                >
                  <Calendar className="h-3 w-3" />
                  <span>Calendario</span>
                </label>
                <input
                  id="datePickerHidden"
                  type="date"
                  className="sr-only"
                  onChange={handleDatePickerChange}
                />
              </div>

              <div className="relative">
                <Input
                  id="drawDate"
                  value={ticketConfig.drawDate}
                  placeholder="Viernes 19 de Junio de 2026..."
                  onChange={(e) => setTicketConfig({ drawDate: e.target.value })}
                  className="pr-8"
                />
                <input
                  type="date"
                  tabIndex={-1}
                  onChange={handleDatePickerChange}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 cursor-pointer"
                  title="Elegir fecha"
                />
                <Calendar className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                <span>En el talón se verá:</span>
                <span className="font-mono text-amber-300/90 font-semibold bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-800">
                  Sorteo: {formatShortDate(ticketConfig.drawDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Contribution Text */}
          <div className="space-y-1.5">
            <Label htmlFor="contribution" className="text-xs text-slate-300">
              Texto de Contribución
            </Label>
            <Input
              id="contribution"
              value={ticketConfig.contributionText}
              placeholder="Tu colaboración apoya..."
              onChange={(e) => setTicketConfig({ contributionText: e.target.value })}
            />
          </div>
        </div>

        {/* Sección: Color del Boleto */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 uppercase tracking-wider hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Palette className="h-3.5 w-3.5" />
              <span>Color de Acento del Boleto</span>
              {showColorPicker ? (
                <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              )}
            </button>

            {/* Muestra del color actual */}
            <div className="flex items-center gap-2">
              <span
                className="h-4 w-4 rounded-full border border-white/30 shadow-sm"
                style={{ backgroundColor: currentColor }}
              />
              <span className="text-[11px] font-mono text-slate-300">
                {currentColor.toUpperCase()}
              </span>
            </div>
          </div>

          {showColorPicker && (
            <div className="rounded-lg border border-slate-700/80 bg-slate-900/50 p-3.5 space-y-3 shadow-inner">
              <div className="text-[11px] text-slate-400">
                Selecciona un color predefinido o elige uno personalizado:
              </div>

              {/* Paleta de colores predefinidos */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = currentColor.toLowerCase() === preset.hex.toLowerCase();
                  return (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setTicketConfig({ primaryColor: preset.hex })}
                      className={`group relative flex flex-col items-center justify-center p-1 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? "border-amber-400 bg-slate-800 ring-2 ring-amber-400/40 scale-105"
                          : "border-slate-700/80 bg-slate-800/50 hover:border-slate-500 hover:scale-105"
                      }`}
                      title={preset.name}
                    >
                      <span
                        className="h-6 w-6 rounded-full flex items-center justify-center shadow-md border border-white/20"
                        style={{ backgroundColor: preset.hex }}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5 text-white drop-shadow stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selector personalizado de color */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-xs text-slate-300">Color personalizado:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => setTicketConfig({ primaryColor: e.target.value })}
                    className="h-8 w-10 rounded border border-slate-600 bg-transparent p-0.5 cursor-pointer"
                    title="Elegir color personalizado en la rueda de colores"
                  />
                  <input
                    type="text"
                    value={currentColor}
                    onChange={(e) => setTicketConfig({ primaryColor: e.target.value })}
                    className="w-20 rounded bg-slate-800 px-2 py-1 text-center font-mono text-xs text-slate-200 uppercase border border-slate-700 focus:outline-none focus:border-amber-500"
                    placeholder="#991B1B"
                  />
                  <button
                    type="button"
                    onClick={() => setTicketConfig({ primaryColor: "#991b1b" })}
                    className="text-[11px] text-slate-400 hover:text-amber-400 cursor-pointer"
                    title="Restablecer al rojo predeterminado"
                  >
                    Restablecer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sección: Valores y Numeración */}
        <div className="space-y-3.5 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 uppercase tracking-wider">
            <DollarSign className="h-3.5 w-3.5" />
            <span>Valores y Numeración</span>
          </div>

          {/* Price & Price Label */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="price" className="text-xs text-slate-300">
                Precio Unitario ($)
              </Label>
              <NumberInput
                id="price"
                min={0}
                max={1000000}
                step={500}
                prefix="$"
                value={ticketConfig.price}
                onChange={(val) => {
                  setTicketConfig({
                    price: val,
                    priceLabel: `VALOR: $${val.toLocaleString("es-AR")}`,
                  });
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="priceLabel" className="text-xs text-slate-300">
                Texto en el Boleto
              </Label>
              <Input
                id="priceLabel"
                value={ticketConfig.priceLabel}
                onChange={(e) => setTicketConfig({ priceLabel: e.target.value })}
              />
            </div>
          </div>

          {/* Total Tickets & Start Number */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="totalTickets" className="flex items-center gap-1.5 text-xs text-slate-300">
                <Hash className="h-3 w-3 text-amber-400/80" />
                Cantidad de Tickets
              </Label>
              <NumberInput
                id="totalTickets"
                min={1}
                max={50000}
                step={50}
                value={ticketConfig.totalTickets}
                onChange={(val) => setTicketConfig({ totalTickets: val })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="startNumber" className="text-xs text-slate-300">
                Número Inicial
              </Label>
              <NumberInput
                id="startNumber"
                min={0}
                max={10000}
                step={1}
                value={ticketConfig.startNumber}
                onChange={(val) => setTicketConfig({ startNumber: val })}
              />
            </div>
          </div>
        </div>

        {/* Sección: Tipografía y Tamaños de Fuente */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowTypography(!showTypography)}
              className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 uppercase tracking-wider hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Type className="h-3.5 w-3.5" />
              <span>Tamaño de Letra del Boleto</span>
              {showTypography ? (
                <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              )}
            </button>

            {showTypography && (
              <button
                type="button"
                onClick={handleResetTypography}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                title="Restablecer tamaños sugeridos"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Restablecer</span>
              </button>
            )}
          </div>

          {showTypography && (
            <div className="rounded-lg border border-slate-700/80 bg-slate-900/50 p-3.5 space-y-4 shadow-inner">
              {/* Tamaño de Premios */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-medium">Tamaño de Premios:</span>
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    {prizesSize} px
                  </span>
                </div>
                <Slider
                  min={6}
                  max={14}
                  step={1}
                  value={prizesSize}
                  onChange={(val) => setTicketConfig({ prizesFontSize: val })}
                  showValueBadge={false}
                />
                <p className="text-[10px] text-slate-400">
                  Reduce el tamaño si tienes 15-20 premios, o auméntalo si tienes pocos premios.
                </p>
              </div>

              {/* Tamaño del Título */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-medium">Tamaño de Título:</span>
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    {titleSize} px
                  </span>
                </div>
                <Slider
                  min={10}
                  max={22}
                  step={1}
                  value={titleSize}
                  onChange={(val) => setTicketConfig({ titleFontSize: val })}
                  showValueBadge={false}
                />
              </div>

              {/* Tamaño del Subtítulo */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-medium">Tamaño de Subtítulo:</span>
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    {subtitleSize} px
                  </span>
                </div>
                <Slider
                  min={9}
                  max={18}
                  step={1}
                  value={subtitleSize}
                  onChange={(val) => setTicketConfig({ subtitleFontSize: val })}
                  showValueBadge={false}
                />
              </div>

              {/* Presets rápidos de escala */}
              <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Escala general:</span>
                <div className="flex gap-1">
                  {[
                    { label: "Compacto", scale: 85 },
                    { label: "Normal", scale: 100 },
                    { label: "Grande", scale: 115 },
                  ].map((preset) => (
                    <button
                      key={preset.scale}
                      type="button"
                      onClick={() => setTicketConfig({ generalFontScale: preset.scale })}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                        fontScale === preset.scale
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sección: Lista de Premios */}
        <div className="pt-2 border-t border-slate-800">
          <PrizeEditor />
        </div>
      </CardContent>
    </Card>
  );
}

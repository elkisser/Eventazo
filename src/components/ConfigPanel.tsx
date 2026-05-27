"use client";

import { Settings, Calendar, DollarSign, Hash, Trophy, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRifaStore } from "@/store/useRifaStore";

export function ConfigPanel() {
  const { ticketConfig, setTicketConfig } = useRifaStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-amber-400" />
          Configuración del Evento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Event Name */}
        <div className="space-y-2">
          <Label htmlFor="eventName" className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-amber-400/70" />
            Nombre del Evento
          </Label>
          <Input
            id="eventName"
            value={ticketConfig.eventName}
            onChange={(e) => setTicketConfig({ eventName: e.target.value })}
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            value={ticketConfig.subtitle}
            onChange={(e) => setTicketConfig({ subtitle: e.target.value })}
          />
        </div>

        {/* Organizer */}
        <div className="space-y-2">
          <Label htmlFor="organizer">Organiza</Label>
          <Input
            id="organizer"
            value={ticketConfig.organizer}
            onChange={(e) => setTicketConfig({ organizer: e.target.value })}
          />
        </div>

        {/* Draw Date */}
        <div className="space-y-2">
          <Label htmlFor="drawDate" className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-amber-400/70" />
            Fecha del Sorteo
          </Label>
          <Input
            id="drawDate"
            value={ticketConfig.drawDate}
            onChange={(e) => setTicketConfig({ drawDate: e.target.value })}
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="price" className="flex items-center gap-2">
              <DollarSign className="h-3.5 w-3.5 text-amber-400/70" />
              Precio
            </Label>
            <Input
              id="price"
              type="number"
              value={ticketConfig.price}
              onChange={(e) => setTicketConfig({ price: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priceLabel">Etiqueta Precio</Label>
            <Input
              id="priceLabel"
              value={ticketConfig.priceLabel}
              onChange={(e) => setTicketConfig({ priceLabel: e.target.value })}
            />
          </div>
        </div>

        {/* Ticket Numbers */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="totalTickets" className="flex items-center gap-2">
              <Hash className="h-3.5 w-3.5 text-amber-400/70" />
              Total de Tickets
            </Label>
            <Input
              id="totalTickets"
              type="number"
              min={1}
              max={10000}
              value={ticketConfig.totalTickets}
              onChange={(e) => setTicketConfig({ totalTickets: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startNumber">Número Inicial</Label>
            <Input
              id="startNumber"
              type="number"
              min={1}
              value={ticketConfig.startNumber}
              onChange={(e) => setTicketConfig({ startNumber: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Contribution Text */}
        <div className="space-y-2">
          <Label htmlFor="contribution">Texto de Contribución</Label>
          <Input
            id="contribution"
            value={ticketConfig.contributionText}
            onChange={(e) => setTicketConfig({ contributionText: e.target.value })}
          />
        </div>

        {/* Prizes Summary */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Trophy className="h-3.5 w-3.5 text-amber-400/70" />
            Premios ({ticketConfig.prizes.length})
          </Label>
          <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-700 bg-slate-900/50 p-3 space-y-1">
            {ticketConfig.prizes.map((prize) => (
              <div key={prize.position} className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-amber-400/80 min-w-[24px]">
                  {prize.label}
                </span>
                <span>{prize.description}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

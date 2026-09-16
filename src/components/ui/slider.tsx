"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps {
  id?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  label?: string;
  suffix?: string;
  showValueBadge?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  id,
  value,
  min,
  max,
  step = 1,
  onChange,
  className,
  label,
  suffix = "",
  showValueBadge = true,
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || showValueBadge) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="text-slate-300 font-medium">{label}</span>}
          {showValueBadge && (
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              {value}
              {suffix}
            </span>
          )}
        </div>
      )}
      <div className="relative flex items-center py-1">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full cursor-pointer appearance-none"
          style={{
            background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${percentage}%, #334155 ${percentage}%, #334155 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] font-mono text-slate-500 px-0.5">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
};

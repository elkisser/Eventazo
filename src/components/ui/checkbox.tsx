"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  description?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  disabled = false,
  className,
  label,
  description,
}) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-start gap-2.5 cursor-pointer select-none group",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors mt-0.5",
          checked
            ? "border-amber-500 bg-amber-500 text-slate-900 shadow-sm shadow-amber-500/30"
            : "border-slate-600 bg-slate-800/80 hover:border-slate-500"
        )}
      >
        {checked && <Check className="h-3 w-3 stroke-[3]" />}
      </button>
      {(label || description) && (
        <div className="space-y-0.5">
          {label && (
            <div className="text-xs font-medium text-slate-200 group-hover:text-amber-300/90 transition-colors">
              {label}
            </div>
          )}
          {description && (
            <div className="text-[11px] text-slate-400 leading-normal">
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
};

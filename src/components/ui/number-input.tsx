"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NumberInputProps {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      id,
      value,
      onChange,
      min = 0,
      max = 999999,
      step = 1,
      suffix,
      prefix,
      disabled = false,
      className,
      placeholder,
    },
    ref
  ) => {
    // Keep local string for smooth typing experience without jarring cursor resets
    const [localStr, setLocalStr] = React.useState<string>(String(value ?? ""));

    React.useEffect(() => {
      setLocalStr(String(value ?? ""));
    }, [value]);

    const handleDecrement = () => {
      if (disabled) return;
      const nextVal = Math.max(min, Number((value - step).toFixed(2)));
      onChange(nextVal);
    };

    const handleIncrement = () => {
      if (disabled) return;
      const nextVal = Math.min(max, Number((value + step).toFixed(2)));
      onChange(nextVal);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // Allow only numbers, dot, or empty
      const sanitized = raw.replace(/[^0-9.]/g, "");
      setLocalStr(sanitized);

      if (sanitized === "") {
        onChange(min);
        return;
      }

      const num = Number(sanitized);
      if (!isNaN(num)) {
        const clamped = Math.min(max, Math.max(min, num));
        onChange(clamped);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleIncrement();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleDecrement();
      }
    };

    const handleBlur = () => {
      // Re-format to current value on blur
      setLocalStr(String(value ?? min));
    };

    return (
      <div
        className={cn(
          "group relative flex items-center h-10 w-full rounded-xl border border-slate-800 bg-slate-900/80 p-0.5 focus-within:border-amber-500/80 focus-within:ring-2 focus-within:ring-amber-500/20 hover:border-slate-700 transition-all shadow-inner",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
      >
        {/* Decrement Button */}
        <button
          type="button"
          tabIndex={-1}
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-700/80 hover:text-amber-400 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all cursor-pointer"
          title={`Restar ${step}`}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>

        {/* Optional Prefix */}
        {prefix && (
          <span className="pl-1 text-xs font-semibold text-amber-400/80 select-none">
            {prefix}
          </span>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="numeric"
          value={localStr}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full bg-transparent px-2 text-center text-sm font-semibold font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />

        {/* Optional Suffix */}
        {suffix && (
          <span className="pr-1 text-xs font-medium text-slate-400 select-none">
            {suffix}
          </span>
        )}

        {/* Increment Button */}
        <button
          type="button"
          tabIndex={-1}
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-700/80 hover:text-amber-400 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all cursor-pointer"
          title={`Sumar ${step}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

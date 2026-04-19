"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function QuantitySelector({ value, onChange, max = 10 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-0 border border-cream-darker w-fit">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-11 w-11 items-center justify-center text-mist hover:text-obsidian transition-colors"
        disabled={value <= 1}
      >
        <Minus size={14} />
      </button>
      <span className="font-body text-sm w-10 text-center">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-11 w-11 items-center justify-center text-mist hover:text-obsidian transition-colors"
        disabled={value >= max}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

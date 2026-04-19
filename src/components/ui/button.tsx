"use client";

import { forwardRef, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", magnetic = true, className, children, onMouseMove, onMouseLeave, ...props }, forwardedRef) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLButtonElement>) || innerRef;

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onMouseMove?.(e);
        if (!magnetic || !ref?.current) return;
        const rect = ref.current.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
        ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
        ref.current.style.transition = "transform 0.1s ease";
      },
      [magnetic, ref, onMouseMove]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onMouseLeave?.(e);
        if (!magnetic || !ref?.current) return;
        ref.current.style.transform = "translate(0, 0)";
        ref.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      },
      [magnetic, ref, onMouseLeave]
    );

    return (
      <button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative inline-flex items-center justify-center font-body tracking-widest uppercase text-xs font-medium transition-colors duration-300 select-none",
          {
            "bg-obsidian text-cream hover:bg-charcoal px-8 py-4": variant === "primary",
            "bg-gold text-obsidian hover:bg-gold-dark px-8 py-4": variant === "secondary",
            "bg-transparent text-obsidian hover:text-gold px-4 py-2": variant === "ghost",
            "border border-obsidian text-obsidian hover:bg-obsidian hover:text-cream px-8 py-4":
              variant === "outline",
          },
          {
            "text-[10px] px-5 py-3": size === "sm",
            "text-xs px-8 py-4": size === "md",
            "text-xs px-10 py-5": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

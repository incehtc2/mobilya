import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs tracking-widest uppercase text-mist font-body">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full border-b border-cream-darker bg-transparent py-3 text-sm text-obsidian placeholder:text-mist focus:outline-none focus:border-gold transition-colors duration-300 font-body",
            error && "border-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-body">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

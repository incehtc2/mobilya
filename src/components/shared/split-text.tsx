"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  by?: "word" | "char";
  once?: boolean;
}

export function SplitText({
  text,
  className,
  delay = 0,
  duration = 0.7,
  by = "word",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  const parts = by === "char" ? text.split("") : text.split(" ");

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}>
      {parts.map((part, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {part}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

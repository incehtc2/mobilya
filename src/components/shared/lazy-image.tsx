"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface LazyImageProps extends Omit<ImageProps, "className"> {
  className?: string;
  containerClassName?: string;
  reveal?: boolean;
}

export function LazyImage({
  className,
  containerClassName,
  reveal = true,
  priority,
  ...props
}: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  if (!reveal || priority) {
    return (
      <div ref={ref} className={cn("relative overflow-hidden", containerClassName)}>
        <Image className={cn("object-cover", className)} priority={priority} {...props} />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", containerClassName)}>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        <Image className={cn("object-cover", className)} {...props} />
      </motion.div>
    </div>
  );
}

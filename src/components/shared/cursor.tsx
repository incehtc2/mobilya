"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch } from "@/hooks/use-media-query";

export function Cursor() {
  const isTouch = useIsTouch();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const isLarge = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });
  const laggingX = useSpring(cursorX, { stiffness: 100, damping: 20 });
  const laggingY = useSpring(cursorY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor]") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        isLarge.current = true;
        dotRef.current?.setAttribute("data-large", "true");
      }
    };

    const onLeave = () => {
      isLarge.current = false;
      dotRef.current?.removeAttribute("data-large");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [isTouch, cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <>
      {/* small dot */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-obsidian mix-blend-difference"
      />
      {/* large ring */}
      <motion.div
        ref={dotRef}
        style={{ x: laggingX, y: laggingY }}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-obsidian mix-blend-difference transition-all duration-300 data-[large]:h-12 data-[large]:w-12 h-8 w-8"
      />
    </>
  );
}

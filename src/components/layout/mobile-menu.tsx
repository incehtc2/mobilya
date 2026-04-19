"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { useEffect } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-obsidian flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-display text-cream text-2xl tracking-[0.2em] font-light">{SITE_NAME}</span>
            <button onClick={onClose} className="text-cream/70 hover:text-cream">
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-6 gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`font-display text-4xl font-light transition-colors duration-300 flex items-center gap-3 ${
                    link.isCampaign
                      ? "text-red-400 hover:text-red-300"
                      : "text-cream hover:text-gold"
                  }`}
                >
                  {link.isCampaign && <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse mt-1" />}
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex gap-8 px-6 py-8">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="font-body text-xs tracking-widest uppercase text-mist hover:text-gold transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { NAV_LINKS, SITE_NAME, CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { NavbarUser } from "./navbar-user";

function KoleksiyonlarDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[720px] bg-cream shadow-2xl z-50 p-8"
    >
      <div className="grid grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/koleksiyonlar?kategori=${cat.slug}`}
            className="group flex gap-4 items-start hover:bg-cream-dark p-3 -m-3 transition-colors duration-200"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-cream-dark">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="64px"
              />
            </div>
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-obsidian group-hover:text-gold transition-colors duration-200">
                {cat.label}
              </p>
              <ul className="mt-1.5 space-y-0.5">
                {cat.sub.slice(0, 3).map((s) => (
                  <li key={s} className="font-body text-[11px] text-mist">{s}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-cream-dark flex items-center justify-between">
        <p className="font-body text-xs text-mist">Tüm koleksiyonları görüntüle</p>
        <Link
          href="/koleksiyonlar"
          className="font-body text-xs tracking-widest uppercase text-gold hover:text-gold-dark transition-colors border-b border-gold pb-0.5"
        >
          Tümünü Gör →
        </Link>
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();
  const { totalItems, toggleCart } = useCartStore();
  const count = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openDropdown() {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  }

  function closeDropdown() {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-obsidian/95 backdrop-blur-md py-4" : "bg-transparent py-6"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="font-display text-cream text-2xl tracking-[0.2em] font-light">
            {SITE_NAME}
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={link.hasDropdown ? openDropdown : undefined}
                onMouseLeave={link.hasDropdown ? closeDropdown : undefined}
              >
                {link.hasDropdown ? (
                  <>
                    <button className="flex items-center gap-1 font-body text-cream/70 hover:text-cream text-xs tracking-widest uppercase transition-colors duration-300 relative group">
                      {link.label}
                      <ChevronDown
                        size={12}
                        className={cn("transition-transform duration-300", dropdownOpen && "rotate-180")}
                      />
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-300" />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && <KoleksiyonlarDropdown />}
                    </AnimatePresence>
                  </>
                ) : link.isCampaign ? (
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 font-body text-xs tracking-widest uppercase transition-colors duration-300 relative group text-red-400 hover:text-red-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-red-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="font-body text-cream/70 hover:text-cream text-xs tracking-widest uppercase transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-300" />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <NavbarUser />

            <button
              onClick={toggleCart}
              className="relative text-cream/70 hover:text-cream transition-colors"
              aria-label="Sepet"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-obsidian text-[10px] font-bold"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-cream/70 hover:text-cream transition-colors"
              aria-label="Menü"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

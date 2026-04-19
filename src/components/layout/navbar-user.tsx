"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, LayoutDashboard, LogOut, ChevronDown, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/auth/actions";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function NavbarUser() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      setUser(user);
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        setIsAdmin(profile?.role === "admin");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setIsAdmin(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  function openMenu() {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function closeMenu() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  if (!mounted) {
    return (
      <div className="h-5 w-5 rounded-full bg-cream/10 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth/giris"
        className="flex items-center gap-1.5 text-cream/70 hover:text-cream transition-colors"
        aria-label="Giriş Yap"
      >
        <LogIn size={18} strokeWidth={1.5} />
      </Link>
    );
  }

  const initials = user.email?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-cream/70 hover:text-cream transition-colors"
        aria-label="Hesabım"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-gold font-body text-[11px] font-medium">
          {initials}
        </div>
        <ChevronDown
          size={11}
          strokeWidth={2}
          className={`text-cream/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-4 w-56 bg-cream shadow-2xl z-50 overflow-hidden"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            {/* User info */}
            <div className="px-4 py-4 border-b border-cream-darker bg-cream-dark">
              <p className="font-body text-[10px] tracking-widest uppercase text-mist">Giriş Yapıldı</p>
              <p className="font-body text-xs text-obsidian mt-0.5 truncate">{user.email}</p>
            </div>

            {/* Links */}
            <div className="py-1">
              {[
                { href: "/hesap", icon: User, label: "Hesabım" },
                { href: "/hesap/siparisler", icon: Package, label: "Siparişlerim" },
                ...(isAdmin ? [{ href: "/admin/urunler", icon: LayoutDashboard, label: "Admin Panel" }] : []),
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 font-body text-xs text-obsidian hover:bg-cream-dark transition-colors"
                >
                  <Icon size={14} strokeWidth={1.5} className="text-mist" />
                  {label}
                </Link>
              ))}
            </div>

            {/* Sign out */}
            <div className="border-t border-cream-darker py-1">
              <form action={signOut}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 px-4 py-3 font-body text-xs text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} strokeWidth={1.5} />
                  Çıkış Yap
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

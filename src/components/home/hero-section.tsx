"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SplitText } from "@/components/shared/split-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-obsidian">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&q=80')",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/20 to-obsidian/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-8"
        >
          El yapımı premium mobilya
        </motion.p>

        <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] font-light leading-none tracking-[-0.02em] text-cream">
          <SplitText text="Zamanın" delay={0.4} duration={0.8} />
          <br />
          <span className="italic text-gold/80">
            <SplitText text="Ötesinde" delay={0.6} duration={0.8} />
          </span>
          <br />
          <SplitText text="Tasarım" delay={0.8} duration={0.8} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 max-w-md font-body text-base text-cream/60 leading-relaxed"
        >
          Her mobilya, evinizin ruhunu yansıtan bir sanat eseridir. Yüzyıllık
          zanaatkârlık, çağdaş tasarımla buluşuyor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <Link href="/koleksiyonlar">
            <Button size="lg">Koleksiyonu Keşfet</Button>
          </Link>
          <Link href="/hakkimizda">
            <Button variant="ghost" size="lg" className="text-cream/70 hover:text-cream">
              Hikayemiz →
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-cream/40">Kaydır</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} strokeWidth={1.5} className="text-cream/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

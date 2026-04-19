"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/shared/split-text";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section className="py-24 bg-cream-dark">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-6">Bülten</p>
        <h2 className="font-display text-4xl font-light text-obsidian mb-6">
          <SplitText text="Yeni Koleksiyonlardan" />
          <br />
          <SplitText text="İlk Siz Haberdar Olun" delay={0.2} />
        </h2>
        <p className="font-body text-mist mb-10 leading-relaxed">
          Özel tasarımlar, sınırlı üretim parçalar ve ayrıcalıklı indirimler için bültenimize abone olun.
        </p>

        {sent ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl text-gold"
          >
            Teşekkürler! Sizi listeye ekledik.
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              className="flex-1 border-b border-cream-darker bg-transparent py-3 text-sm text-obsidian placeholder:text-mist focus:outline-none focus:border-gold transition-colors font-body"
            />
            <Button type="submit" size="sm">Abone Ol</Button>
          </form>
        )}
      </div>
    </section>
  );
}

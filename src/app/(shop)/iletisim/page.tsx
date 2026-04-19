"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/shared/split-text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";

const CONTACTS = [
  { icon: MapPin, label: "Adres", value: "Nişantaşı, Abdi İpekçi Cad. No:42, İstanbul" },
  { icon: Phone, label: "Telefon", value: "+90 212 123 45 67" },
  { icon: Mail, label: "E-posta", value: "info@arca.com.tr" },
  { icon: Clock, label: "Çalışma Saatleri", value: "Pzt–Cmt 10:00–19:00" },
];

export default function IletisimPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">İletişim</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,6rem)] font-light text-obsidian">
            <SplitText text="Bizimle" />
            <br />
            <span className="italic text-mist">
              <SplitText text="İletişime Geçin" delay={0.3} />
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Form */}
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16"
              >
                <p className="font-display text-3xl text-obsidian mb-4">Teşekkürler!</p>
                <p className="font-body text-mist">Mesajınız alındı. En kısa sürede dönüş yapacağız.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <Input name="name" label="Ad Soyad" placeholder="Adınız" required />
                  <Input name="email" type="email" label="E-posta" placeholder="ornek@mail.com" required />
                </div>
                <Input name="subject" label="Konu" placeholder="Nasıl yardımcı olabiliriz?" required />
                <div>
                  <label className="block font-body text-xs tracking-widest uppercase text-mist mb-2">Mesaj</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Mesajınızı buraya yazın..."
                    className="w-full border-b border-cream-darker bg-transparent py-3 text-sm text-obsidian placeholder:text-mist focus:outline-none focus:border-gold transition-colors font-body resize-none"
                  />
                </div>
                <Button type="submit" size="lg">Gönder</Button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-10">
            {CONTACTS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-6 items-start">
                <div className="flex h-10 w-10 items-center justify-center border border-cream-darker shrink-0">
                  <Icon size={16} strokeWidth={1.5} className="text-gold" />
                </div>
                <div>
                  <p className="font-body text-[10px] tracking-widest uppercase text-mist mb-1">{label}</p>
                  <p className="font-body text-sm text-obsidian">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

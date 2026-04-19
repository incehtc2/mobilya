import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sipariş Onaylandı" };

export default function BasariliPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 flex flex-col items-center justify-center gap-8 text-center px-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold">
        <Check size={36} strokeWidth={1.5} className="text-gold" />
      </div>

      <div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-light text-obsidian">
          Siparişiniz Alındı
        </h1>
        <p className="mt-4 font-body text-mist leading-relaxed max-w-md mx-auto">
          Ödemeniz başarıyla tamamlandı. Sipariş detayları e-posta adresinize gönderilecektir.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/koleksiyonlar">
          <Button>Alışverişe Devam Et</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    </div>
  );
}

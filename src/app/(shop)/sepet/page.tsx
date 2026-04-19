"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "@/components/cart/cart-item";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Truck, Shield, RefreshCw, Loader2 } from "lucide-react";
import Link from "next/link";

const TRUST = [
  { icon: Truck, label: "Ücretsiz Kargo", sub: "5.000₺ ve üzeri siparişlerde" },
  { icon: Shield, label: "Güvenli Ödeme", sub: "256-bit SSL şifrelemesi" },
  { icon: RefreshCw, label: "30 Gün İade", sub: "Koşulsuz iade garantisi" },
];

export default function SepetPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = totalPrice();
  const shipping = subtotal >= 5000 ? 0 : 299;
  const total = subtotal + shipping;

  async function handleStripeCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error("Ödeme başlatılamadı");
      const { url, error: apiError } = await res.json();
      if (apiError) throw new Error(apiError);
      if (url) window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 flex flex-col items-center justify-center gap-6 text-center px-6">
        <ShoppingBag size={64} strokeWidth={1} className="text-mist" />
        <h1 className="font-display text-4xl font-light text-obsidian">Sepetiniz Boş</h1>
        <p className="font-body text-mist">Koleksiyonumuza göz atın ve beğendiğiniz ürünleri ekleyin.</p>
        <Link href="/koleksiyonlar">
          <Button size="lg">Alışverişe Başla</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-3">Alışveriş</p>
            <h1 className="font-display text-[clamp(2.5rem,4vw,4rem)] font-light text-obsidian">Sepetim</h1>
          </div>
          <button
            onClick={clearCart}
            className="font-body text-xs tracking-widest uppercase text-mist hover:text-obsidian transition-colors"
          >
            Temizle
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">
          {/* Items */}
          <div>
            <ul className="divide-y divide-cream-dark">
              {items.map((item) => (
                <li key={item.product.id} className="py-8">
                  <CartItem item={item} />
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-cream-dark">
              {TRUST.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <Icon size={20} strokeWidth={1.5} className="text-gold" />
                  <p className="font-body text-xs font-medium text-obsidian">{label}</p>
                  <p className="font-body text-[11px] text-mist">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-cream-dark p-8 sticky top-32">
            <h2 className="font-display text-2xl font-light text-obsidian mb-8">Sipariş Özeti</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center font-body text-sm">
                <span className="text-mist">Ara Toplam ({items.length} ürün)</span>
                <span className="text-obsidian">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center font-body text-sm">
                <span className="text-mist">Kargo</span>
                <span className={shipping === 0 ? "text-gold" : "text-obsidian"}>
                  {shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="font-body text-[11px] text-mist">
                  {formatPrice(5000 - subtotal)} daha ekleyin, kargo ücretsiz!
                </p>
              )}
            </div>

            <div className="border-t border-cream-darker py-5 flex justify-between items-center">
              <span className="font-body text-sm text-mist">Toplam</span>
              <span className="font-display text-3xl text-obsidian">{formatPrice(total)}</span>
            </div>

            {error && (
              <p className="font-body text-xs text-red-500 mb-4">{error}</p>
            )}

            <button
              onClick={handleStripeCheckout}
              disabled={loading}
              className="w-full bg-obsidian text-cream py-5 font-body text-xs tracking-widest uppercase hover:bg-charcoal transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Yönlendiriliyor...
                </>
              ) : (
                <>
                  <Shield size={14} strokeWidth={1.5} />
                  Güvenli Ödeme Yap
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-5 opacity-40 invert" />
              <span className="font-body text-[10px] text-mist">ile güvenli ödeme</span>
            </div>

            <div className="mt-6 pt-6 border-t border-cream-darker">
              <Link href="/koleksiyonlar" className="block text-center font-body text-xs tracking-widest uppercase text-mist hover:text-obsidian transition-colors">
                ← Alışverişe Devam Et
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

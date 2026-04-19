import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/catalog/product-card";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import type { Metadata } from "next";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Kampanyalar — ARCA",
  description:
    "Seçili premium mobilyalarda özel indirimler. Sınırlı süre, sınırlı stok.",
};

export default async function KampanyalarPage() {
  let products: Product[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*, categories(id, name, slug, image, created_at)")
      .not("discount_price", "is", null)
      .gt("stock", 0)
      .order("created_at", { ascending: false });

    if (data) {
      products = data as Product[];
    }
  } catch {
    // Supabase not configured
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      {/* Hero header */}
      <div className="relative bg-obsidian overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
          style={{ left: "-5%" }}
        >
          <span
            className="font-display font-light text-cream whitespace-nowrap"
            style={{
              fontSize: "clamp(6rem,18vw,18rem)",
              opacity: 0.04,
              letterSpacing: "-0.02em",
            }}
          >
            İNDİRİM
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20">
          <Link
            href="/koleksiyonlar"
            className="inline-flex items-center gap-2 font-body text-[11px] tracking-widest uppercase text-mist/50 hover:text-mist transition-colors mb-10"
          >
            <ArrowLeft size={12} strokeWidth={1.5} />
            Koleksiyonlara Dön
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                Özel Kampanya
              </p>

              <h1
                className="font-display font-light text-cream leading-none"
                style={{ fontSize: "clamp(3rem,6vw,6rem)" }}
              >
                Seçili Ürünlerde
                <br />
                <span className="italic" style={{ color: "#C9A96E" }}>
                  Özel İndirimler
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 mt-16">
        {products.length === 0 ? (
          <div className="py-32 text-center">
            <Tag
              size={40}
              strokeWidth={1}
              className="text-mist/30 mx-auto mb-6"
            />
            <p className="font-display text-2xl font-light text-obsidian mb-3">
              Kampanya Yakında
            </p>
            <p className="font-body text-sm text-mist mb-8">
              Şu an aktif kampanya bulunmuyor. Yeni indirimler için takipte
              kalın.
            </p>
            <Link
              href="/koleksiyonlar"
              className="inline-flex items-center gap-2 bg-obsidian text-cream px-8 py-4 font-body text-[11px] tracking-widest uppercase hover:bg-charcoal transition-colors"
            >
              Tüm Koleksiyonu Gör
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
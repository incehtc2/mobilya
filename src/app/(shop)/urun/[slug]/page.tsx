import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";

import { AddToCartButton } from "@/components/product/add-to-cart-button";

import { ProductDetailClient } from "./product-detail-client";
import type { Metadata } from "next";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("name, description").eq("slug", slug).single();
  return {
    title: data?.name ?? "Ürün",
    description: data?.description ?? undefined,
  };
}

export default async function UrunPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*, categories(id, name, slug, image, created_at)")
    .eq("slug", slug)
    .single();

  if (!product) notFound();

  const { data: related } = await supabase
    .from("products")
    .select("*, categories(id, name, slug, image, created_at)")
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .limit(4);

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center gap-2 font-body text-xs text-mist">
          <a href="/" className="hover:text-obsidian transition-colors">Ana Sayfa</a>
          <span>/</span>
          <a href="/koleksiyonlar" className="hover:text-obsidian transition-colors">Koleksiyonlar</a>
          <span>/</span>
          <span className="text-obsidian">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Media */}
          <ProductDetailClient product={product} />

          {/* Right: Info */}
          <div className="space-y-8 lg:sticky lg:top-32 lg:self-start">
            <div>
              {product.categories && (
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">
                  {(product.categories as { name: string }).name}
                </p>
              )}
              <h1 className="font-display text-[clamp(2rem,3vw,3.5rem)] font-light text-obsidian leading-tight">
                {product.name}
              </h1>
              {product.discount_price ? (
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-display text-3xl text-gold">{formatPrice(product.discount_price)}</span>
                  <span className="font-display text-xl text-mist line-through">{formatPrice(product.price)}</span>
                  <span className="font-body text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded">
                    %{Math.round((1 - product.discount_price / product.price) * 100)} İndirim
                  </span>
                </div>
              ) : (
                <p className="font-display text-3xl text-mist mt-4">{formatPrice(product.price)}</p>
              )}
            </div>

            {product.description && (
              <p className="font-body text-mist leading-relaxed border-t border-cream-darker pt-8">
                {product.description}
              </p>
            )}

       
            {/* Quantity + Add */}
            <AddToCartButtonSection product={product} />

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-cream-darker pt-8">
              {[
                { label: "Ücretsiz Kargo", sub: "5.000₺ üzeri" },
                { label: "Güvenli Ödeme", sub: "256-bit SSL" },
                { label: "İade Garantisi", sub: "30 gün" },
              ].map((b) => (
                <div key={b.label} className="text-center">
                  <p className="font-body text-[10px] tracking-widest uppercase text-obsidian">{b.label}</p>
                  <p className="font-body text-xs text-mist mt-1">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related && related.length > 0 && (
          <div className="mt-32">
            <h2 className="font-display text-3xl font-light text-obsidian mb-12">Benzer Ürünler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {related.map((p) => (
                <a key={p.id} href={`/urun/${p.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark mb-4">
                    {p.images?.[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    )}
                  </div>
                  <p className="font-display text-lg font-light text-obsidian">{p.name}</p>
                  {p.discount_price ? (
                    <div className="flex items-center gap-2">
                      <span className="font-body text-sm text-gold">{formatPrice(p.discount_price)}</span>
                      <span className="font-body text-xs text-mist line-through">{formatPrice(p.price)}</span>
                    </div>
                  ) : (
                    <p className="font-body text-sm text-mist">{formatPrice(p.price)}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddToCartButtonSection({ product }: { product: Parameters<typeof AddToCartButton>[0]["product"] }) {
  "use client";
  return <AddToCartButton product={product} />;
}

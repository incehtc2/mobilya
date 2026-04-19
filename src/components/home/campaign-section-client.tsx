"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

function DiscountBadge({ percent }: { percent: number }) {
  return (
    <div className="absolute top-5 left-5 z-10 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-red-500 shadow-lg">
      <span className="font-display text-lg font-light text-white leading-none">%{percent}</span>
      <span className="font-body text-[8px] tracking-wider uppercase text-white/80">off</span>
    </div>
  );
}

function HeroProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCartStore();
  const discount = product.discount_price!;
  const percent = Math.round((1 - discount / product.price) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative group h-full"
    >
      <Link href={`/urun/${product.slug}`} className="block h-full">
        <div className="relative overflow-hidden h-full min-h-[520px]" style={{ aspectRatio: "3/4" }}>
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
          <DiscountBadge percent={percent} />

          <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold mb-2">
              {(product.categories as { name: string } | null)?.name}
            </p>
            <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.2rem)] font-light text-cream leading-tight">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-display text-2xl text-gold">{formatPrice(discount)}</span>
              <span className="font-body text-sm text-mist/60 line-through">{formatPrice(product.price)}</span>
            </div>
            <motion.button
              onClick={(e) => { e.preventDefault(); addItem(product); openCart(); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-5 flex items-center gap-2 bg-gold text-obsidian px-5 py-3 font-body text-[11px] tracking-widest uppercase hover:bg-gold-light transition-colors duration-300 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingBag size={13} strokeWidth={1.5} />
              Sepete Ekle
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SmallProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const { addItem, openCart } = useCartStore();
  const discount = product.discount_price!;
  const percent = Math.round((1 - discount / product.price) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/urun/${product.slug}`} className="flex gap-4 items-center">
        <div className="relative overflow-hidden flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36">
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
              sizes="150px"
            />
          )}
          <div className="absolute top-2 left-2 bg-red-500 text-white font-body text-[9px] tracking-wider uppercase px-1.5 py-0.5">
            -%{percent}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-mist/60 mb-1">
            {(product.categories as { name: string } | null)?.name}
          </p>
          <h4 className="font-display text-lg font-light text-cream leading-tight line-clamp-2 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h4>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display text-xl text-gold">{formatPrice(discount)}</span>
            <span className="font-body text-xs text-mist/50 line-through">{formatPrice(product.price)}</span>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); addItem(product); openCart(); }}
            className="mt-3 flex items-center gap-1.5 font-body text-[10px] tracking-widest uppercase text-gold border-b border-gold/40 pb-0.5 hover:border-gold transition-colors"
          >
            <ShoppingBag size={11} strokeWidth={1.5} />
            Sepete Ekle
          </button>
        </div>
      </Link>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <section className="relative bg-obsidian overflow-hidden py-24">
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display font-light text-cream whitespace-nowrap" style={{ fontSize: "clamp(8rem,22vw,22rem)", opacity: 0.03, letterSpacing: "-0.02em" }}>
          KAMPANYA
        </span>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center space-y-10">
        <div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-body text-[10px] tracking-[0.5em] uppercase text-mist/60 mb-6">
            Özel Kampanya
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-cream leading-none"
            style={{ fontSize: "clamp(3rem,6vw,6rem)" }}
          >
            Seçili Ürünlerde
            <br />
            <span className="italic" style={{ color: "#C9A96E" }}>Özel İndirimler</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-6 font-body text-mist/50 text-sm">
            Kampanyalı ürünler yakında eklenecek.
          </motion.p>
        </div>
        <Link href="/kampanyalar" className="group inline-flex items-center gap-3 bg-gold text-obsidian px-8 py-4 font-body text-[11px] tracking-widest uppercase hover:bg-gold-light transition-colors duration-300">
          Kampanyaları İncele
          <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export function CampaignSectionClient({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  if (products.length === 0) return <EmptyState />;

  const [hero, ...rest] = products;

  return (
    <section ref={sectionRef} className="relative bg-obsidian overflow-hidden py-0">
      {/* Ghost background text */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display font-light text-cream whitespace-nowrap"
          style={{ fontSize: "clamp(8rem,22vw,22rem)", opacity: 0.03, letterSpacing: "-0.02em" }}
        >
          KAMPANYA
        </span>
      </div>

      {/* Top strip */}
      <div className="relative z-10 border-b border-cream/10 px-6 py-4">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold">Sınırlı Süre Kampanyası</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {["%40'a Kadar İndirim", "Ücretsiz Montaj", "30 Gün İade Garantisi"].map((item) => (
              <span key={item} className="font-body text-[10px] tracking-[0.25em] uppercase text-mist/40">{item}</span>
            ))}
          </div>
          <span className="hidden lg:block font-body text-[10px] tracking-[0.3em] uppercase text-mist/40">
            5.000₺ Üzeri Kargo Ücretsiz
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-body text-[10px] tracking-[0.5em] uppercase text-mist/60 mb-4"
            >
              Özel Seçki
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-light text-cream leading-none"
                style={{ fontSize: "clamp(3rem,6vw,6rem)" }}
              >
                Seçili Ürünlerde
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display italic font-light leading-none"
                style={{ fontSize: "clamp(3rem,6vw,6rem)", color: "#C9A96E" }}
              >
                Özel İndirimler
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-body text-mist/60 leading-relaxed max-w-xs lg:text-right text-sm"
          >
            El seçimi premium parçalar, özel fiyatlarla. Stoklar sınırlıdır,
            fırsatı kaçırmayın.
          </motion.p>
        </div>

        {/* Product layout */}
        {products.length === 1 && (
          <div className="max-w-lg mx-auto">
            <HeroProductCard product={hero} />
          </div>
        )}

        {products.length === 2 && (
          <div className="grid lg:grid-cols-2 gap-5">
            <HeroProductCard product={hero} />
            <HeroProductCard product={rest[0]} />
          </div>
        )}

        {products.length >= 3 && (
          <div className="grid lg:grid-cols-[55fr_45fr] gap-5 items-stretch">
            <HeroProductCard product={hero} />

            <div className="flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex flex-col justify-center border border-cream/10 px-8 py-8"
              >
                <p className="font-body text-[9px] tracking-[0.5em] uppercase text-mist/40 mb-3">Bu Sezon</p>
                <p className="font-display text-2xl font-light text-cream/80 leading-snug">
                  &quot;Evinizi bir{" "}
                  <span className="italic text-gold">sanat galerisine</span>{" "}
                  dönüştüren parçalar&quot;
                </p>
                <div className="mt-6 flex gap-6">
                  {[["%40'a kadar", "indirim"], ["Ücretsiz", "montaj"], ["30 Gün", "iade garantisi"]].map(([a, b]) => (
                    <div key={a}>
                      <p className="font-display text-lg text-cream font-light">{a}</p>
                      <p className="font-body text-[10px] text-mist/50 mt-0.5">{b}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="flex flex-col gap-5 border border-cream/10 px-6 py-6">
                {rest.slice(0, 2).map((p, i) => (
                  <div key={p.id}>
                    <SmallProductCard product={p} delay={i * 0.12} />
                    {i < rest.slice(0, 2).length - 1 && (
                      <div className="mt-5 border-t border-cream/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-cream/10 pt-10"
        >
          <p className="font-body text-sm text-mist/50">
            Tüm kampanyalı ürünleri keşfedin — stoklar sınırlıdır.
          </p>
          <Link
            href="/kampanyalar"
            className="group flex items-center gap-3 bg-gold text-obsidian px-8 py-4 font-body text-[11px] tracking-widest uppercase hover:bg-gold-light transition-colors duration-300"
          >
            Tüm Kampanyalar
            <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}

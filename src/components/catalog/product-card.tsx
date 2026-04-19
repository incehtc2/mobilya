"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, getImageUrl } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { addItem, openCart } = useCartStore();
  const image = product.images?.[0];
  const image2 = product.images?.[1];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    openCart();
  }

  return (
    <Link
      href={`/urun/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark mb-4">
        <Image
          src={getImageUrl(image)}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${hovered && image2 ? "opacity-0" : "opacity-100"}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {image2 && (
          <Image
            src={getImageUrl(image2)}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 absolute inset-0 ${hovered ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Quick add button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={hovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 bg-cream py-3 text-[10px] tracking-widest uppercase font-body text-obsidian hover:bg-obsidian hover:text-cream transition-colors duration-300"
        >
          <ShoppingBag size={14} strokeWidth={1.5} />
          Sepete Ekle
        </motion.button>

        {product.featured && (
          <span className="absolute top-4 left-4 bg-gold text-obsidian text-[10px] tracking-widest uppercase font-body px-3 py-1">
            Öne Çıkan
          </span>
        )}
        {product.discount_price && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] tracking-widest uppercase font-body px-2 py-1">
            -%{Math.round((1 - product.discount_price / product.price) * 100)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-mist">
          {product.categories?.name || ""}
        </p>
        <h3 className="font-display text-lg font-light text-obsidian group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        {product.discount_price ? (
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-gold">{formatPrice(product.discount_price)}</span>
            <span className="font-body text-xs text-mist line-through">{formatPrice(product.price)}</span>
          </div>
        ) : (
          <p className="font-body text-sm text-mist">{formatPrice(product.price)}</p>
        )}
      </div>
    </Link>
  );
}

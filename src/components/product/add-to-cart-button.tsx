"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

export function AddToCartButton({ product, quantity = 1 }: { product: Product; quantity?: number }) {
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  function handleClick() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setTimeout(() => openCart(), 300);
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={product.stock === 0}
      whileTap={{ scale: 0.98 }}
      className="relative w-full overflow-hidden bg-obsidian py-5 font-body text-xs tracking-widest uppercase text-cream transition-colors duration-300 hover:bg-charcoal disabled:bg-mist disabled:cursor-not-allowed"
    >
      <AnimatedLabel added={added} stock={product.stock} />
    </motion.button>
  );
}

function AnimatedLabel({ added, stock }: { added: boolean; stock: number }) {
  if (stock === 0) return <span>Stok Tükendi</span>;

  return (
    <motion.span
      key={String(added)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2"
    >
      {added ? (
        <>
          <Check size={14} />
          Sepete Eklendi
        </>
      ) : (
        "Sepete Ekle"
      )}
    </motion.span>
  );
}

"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, getImageUrl } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;
  const image = product.images?.[0];

  return (
    <li className="flex gap-4">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded bg-cream-dark">
        {image && (
          <Image
            src={getImageUrl(image)}
            alt={product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base leading-snug text-obsidian">{product.name}</h3>
          <button
            onClick={() => removeItem(product.id)}
            className="text-mist hover:text-obsidian transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        </div>

        <p className="font-body text-sm text-gold">{formatPrice(product.price)}</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="flex h-7 w-7 items-center justify-center border border-cream-darker hover:border-obsidian transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="font-body text-sm w-4 text-center">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="flex h-7 w-7 items-center justify-center border border-cream-darker hover:border-obsidian transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </li>
  );
}

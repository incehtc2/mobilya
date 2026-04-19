"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CartItem } from "./cart-item";
import Link from "next/link";

export function CartDrawer() {
  const { isOpen, closeCart, items, totalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-obsidian/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-cream flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-7 border-b border-cream-darker">
              <h2 className="font-display text-2xl font-light text-obsidian">Sepetim</h2>
              <button onClick={closeCart} className="text-mist hover:text-obsidian transition-colors">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} strokeWidth={1} className="text-mist" />
                  <p className="font-body text-mist">Sepetiniz boş</p>
                  <Button variant="outline" size="sm" onClick={closeCart} magnetic={false}>
                    <Link href="/koleksiyonlar">Alışverişe Başla</Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-darker px-8 py-7 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-mist tracking-widest uppercase">Toplam</span>
                  <span className="font-display text-2xl text-obsidian">{formatPrice(totalPrice())}</span>
                </div>
                <Link href="/sepet" onClick={closeCart}>
                  <Button className="w-full" size="lg" magnetic={false}>
                    Ödemeye Geç
                  </Button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const FALLBACK = [
  { id: "1", name: "Milano Koltuk", price: 45000, slug: "milano-koltuk", image: "/images/mobilya/4.jpg" },
  { id: "2", name: "Venezia Masa", price: 68000, slug: "venezia-yemek-masasi", image: "/images/mobilya/18.jpg" },
  { id: "3", name: "Atina Sehpa", price: 18500, slug: "atina-sehpa", image: "/images/mobilya/8.jpg" },
  { id: "4", name: "Floransa Başlık", price: 28000, slug: "floransa-yatak-basligi", image: "/images/mobilya/6.jpg" },
  { id: "5", name: "Roma Masa", price: 35000, slug: "roma-calisma-masasi", image: "/images/mobilya/12.jpg" },
];

interface InstagramGridProps {
  products?: Pick<Product, "id" | "name" | "price" | "slug" | "images">[];
}

export function InstagramGrid({ products }: InstagramGridProps) {
  const items = products?.length
    ? products.map((p) => ({ ...p, image: p.images?.[0] || "" }))
    : FALLBACK;

  return (
    <section className="py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 mb-12">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">Seçkiler</p>
        <h2 className="font-display text-5xl font-light text-obsidian">Öne Çıkanlar</h2>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
        {items.slice(0, 5).map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={i === 0 ? "row-span-2" : ""}
          >
            <Link href={`/urun/${item.slug}`} className="group relative block h-full overflow-hidden bg-cream-dark">
              <Image
                src={item.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/30 transition-colors duration-500 flex items-end p-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                >
                  <p className="font-display text-lg text-cream leading-tight">{item.name}</p>
                  <p className="font-body text-sm text-gold">{formatPrice(item.price)}</p>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

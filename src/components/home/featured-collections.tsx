"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SplitText } from "@/components/shared/split-text";
import { CATEGORIES } from "@/lib/constants";

interface FeaturedCollectionsProps {
  categories?: typeof CATEGORIES;
}

const DEFAULT_ITEMS = CATEGORIES.map((c) => ({
  name: c.label,
  slug: c.slug,
  image: c.image,
}));

export function FeaturedCollections({ categories }: FeaturedCollectionsProps) {
  const items =
    categories && categories.length > 0
      ? categories.map((c) => ({
          name: c.label,
          slug: c.slug,
          image: c.image,
        }))
      : DEFAULT_ITEMS;

  return (
    <section className="py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 mb-14">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">
          Koleksiyonlar
        </p>

        <div className="flex items-end justify-between">
          <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] font-light text-obsidian">
            <SplitText text="Yaşam Alanlarınız İçin" />
          </h2>

          <Link
            href="/koleksiyonlar"
            className="hidden md:inline-flex font-body text-xs tracking-widest uppercase text-gold hover:text-gold-dark border-b border-gold pb-0.5 transition-colors"
          >
            Tümünü Gör →
          </Link>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid mx-auto max-w-7xl px-6 lg:px-12 grid-cols-3 gap-5">
        {items.slice(0, 6).map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.07,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={`/koleksiyonlar?kategori=${cat.slug}`}
              className="group block"
            >
              <div
                className="relative overflow-hidden bg-cream-dark"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 1280px) 33vw, 400px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-display text-xl font-light text-cream">
                    {cat.name}
                  </p>
                  <p className="font-body text-[11px] tracking-widest uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                    Keşfet →
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

 
    {/* Mobile */}
<div className="md:hidden px-6">
  <div className="grid grid-cols-2 gap-4">
          {items.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <Link
                href={`/koleksiyonlar?kategori=${cat.slug}`}
                className="block group"
              >
                <div
                  className="relative w-[220px] overflow-hidden bg-cream-dark"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="220px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-display text-lg font-light text-cream">
                      {cat.name}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface FilterSidebarProps {
  categories: Category[];
}

const PRICE_RANGES = [
  { label: "0 – 20.000 ₺", min: 0, max: 20000 },
  { label: "20.000 – 50.000 ₺", min: 20000, max: 50000 },
  { label: "50.000 ₺ +", min: 50000, max: 999999 },
];

export function FilterSidebar({ categories }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const activeCategory = params.get("kategori");
  const minPrice = params.get("min_fiyat");

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString());

      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }

      router.push(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router]
  );

  const clearAll = () => router.push(pathname);

  const hasFilters = Boolean(activeCategory || minPrice);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-body text-xs tracking-[0.3em] uppercase text-obsidian">
          Filtreler
        </h3>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 font-body text-xs text-mist hover:text-obsidian transition-colors"
          >
            <X size={12} /> Temizle
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-10">
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-mist mb-4">
          Kategori
        </p>

        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setParam("kategori", null)}
              className={cn(
                "font-body text-sm transition-colors w-full text-left py-1",
                !activeCategory
                  ? "text-gold font-medium"
                  : "text-mist hover:text-obsidian"
              )}
            >
              Tümü
            </button>
          </li>

          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setParam("kategori", cat.slug)}
                className={cn(
                  "font-body text-sm transition-colors w-full text-left py-1",
                  activeCategory === cat.slug
                    ? "text-gold font-medium"
                    : "text-mist hover:text-obsidian"
                )}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price ranges */}
      <div>
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-mist mb-4">
          Fiyat Aralığı
        </p>

        <ul className="space-y-2">
          {PRICE_RANGES.map((range) => {
            const isActive = minPrice === String(range.min);

            return (
              <li key={range.label}>
                <button
                  onClick={() => {
                    if (isActive) {
                      setParam("min_fiyat", null);
                      setParam("max_fiyat", null);
                    } else {
                      setParam("min_fiyat", String(range.min));
                      setParam("max_fiyat", String(range.max));
                    }
                  }}
                  className={cn(
                    "font-body text-sm transition-colors w-full text-left py-1",
                    isActive
                      ? "text-gold font-medium"
                      : "text-mist hover:text-obsidian"
                  )}
                >
                  {range.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
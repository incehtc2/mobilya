import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductTable } from "@/components/admin/product-table";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Ürünler" };

export default async function AdminUrunlerPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-light text-obsidian">Ürünler</h1>
        <Link
          href="/admin/urunler/yeni"
          className="flex items-center gap-2 bg-obsidian text-cream px-5 py-3 font-body text-xs tracking-widest uppercase hover:bg-charcoal transition-colors"
        >
          <Plus size={14} />
          Yeni Ürün
        </Link>
      </div>

      <ProductTable products={products || []} />
    </div>
  );
}

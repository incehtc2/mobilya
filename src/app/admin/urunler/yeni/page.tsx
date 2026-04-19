import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "../actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Yeni Ürün" };

export default async function YeniUrunPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*").order("name");

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-obsidian mb-8">Yeni Ürün</h1>
      <ProductForm categories={categories || []} action={createProduct} />
    </div>
  );
}

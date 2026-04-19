import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";
import { updateProduct } from "../actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ürünü Düzenle" };

export default async function EditUrunPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("categories").select("*").order("name"),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-obsidian mb-8">Ürünü Düzenle</h1>
      <ProductForm categories={categories || []} action={updateProduct} product={product} />
    </div>
  );
}

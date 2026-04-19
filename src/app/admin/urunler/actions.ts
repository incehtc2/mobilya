"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function toUuid(val: FormDataEntryValue | null): string | null {
  const s = String(val || "");
  return UUID_RE.test(s) ? s : null;
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const name = String(formData.get("name"));
  const imageUrls = formData.getAll("imageUrls").map(String).filter(Boolean);
  const discountRaw = formData.get("discount_price");

  const { error } = await supabase.from("products").insert({
    name,
    slug: slugify(name),
    description: String(formData.get("description")) || null,
    price: Number(formData.get("price")),
    discount_price: discountRaw ? Number(discountRaw) : null,
    category_id: toUuid(formData.get("category_id")),
    images: imageUrls,
    model_url: String(formData.get("model_url")) || null,
    stock: Number(formData.get("stock")),
    featured: formData.get("featured") === "on",
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/urunler");
  revalidatePath("/koleksiyonlar");
  redirect("/admin/urunler");
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id"));
  const name = String(formData.get("name"));
  const imageUrls = formData.getAll("imageUrls").map(String).filter(Boolean);
  const discountRaw = formData.get("discount_price");

  const { error } = await supabase.from("products").update({
    name,
    slug: slugify(name),
    description: String(formData.get("description")) || null,
    price: Number(formData.get("price")),
    discount_price: discountRaw ? Number(discountRaw) : null,
    category_id: toUuid(formData.get("category_id")),
    images: imageUrls,
    model_url: String(formData.get("model_url")) || null,
    stock: Number(formData.get("stock")),
    featured: formData.get("featured") === "on",
  }).eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/urunler");
  revalidatePath("/koleksiyonlar");
  redirect("/admin/urunler");
}

export async function deleteProduct(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id"));
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/urunler");
}

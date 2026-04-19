import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const supabase = await createClient();

  const { data: products } = await supabase.from("products").select("slug, updated_at");
  const { data: categories } = await supabase.from("categories").select("slug");

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/koleksiyonlar`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/iletisim`, lastModified: new Date(), priority: 0.6 },
  ];

  const productPages = (products || []).map((p) => ({
    url: `${baseUrl}/urun/${p.slug}`,
    lastModified: new Date(p.updated_at),
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}

import { createClient } from "@/lib/supabase/server";
import { CampaignSectionClient } from "./campaign-section-client";
import type { Product } from "@/types";

export async function CampaignSection() {
  let products: Product[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*, categories(id, name, slug, image, created_at)")
      .not("discount_price", "is", null)
      .gt("stock", 0)
      .order("created_at", { ascending: false })
      .limit(3);

    if (data) products = data as Product[];
  } catch {
    // Supabase not configured
  }

  return <CampaignSectionClient products={products} />;
}

import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Koleksiyonlar" };

interface SearchParams {
  kategori?: string;
  min_fiyat?: string;
  max_fiyat?: string;
  siralama?: string;
}

async function Products({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("*, categories(id, name, slug, image, created_at)")
    .gt("stock", 0);

  if (searchParams.kategori) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", searchParams.kategori)
      .single();
    if (cat) query = query.eq("category_id", cat.id);
  }

  if (searchParams.min_fiyat) query = query.gte("price", Number(searchParams.min_fiyat));
  if (searchParams.max_fiyat) query = query.lte("price", Number(searchParams.max_fiyat));

  switch (searchParams.siralama) {
    case "price_asc": query = query.order("price", { ascending: true }); break;
    case "price_desc": query = query.order("price", { ascending: false }); break;
    case "newest": query = query.order("created_at", { ascending: false }); break;
    default: query = query.order("featured", { ascending: false }).order("created_at", { ascending: false });
  }

  const { data: products } = await query;
  return <ProductGrid products={products || []} />;
}

async function Categories() {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("name");
  return data || [];
}

export default async function KoleksiyonlarPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const categories = await Categories();

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">Koleksiyonlar</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-light text-obsidian">
            Tüm Ürünler
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <FilterSidebar categories={categories} />

          <div className="flex-1">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="aspect-[3/4] w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              }
            >
              <Products searchParams={sp} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

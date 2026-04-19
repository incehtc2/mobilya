import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import { ArrowLeft, Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Siparişlerim" };

export default async function SiparislerimPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/giris?next=/hesap/siparisler");

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name, images))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/hesap" className="text-mist hover:text-obsidian transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </Link>
          <div>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold">Hesabım</p>
            <h1 className="font-display text-3xl font-light text-obsidian">Siparişlerim</h1>
          </div>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
            <Package size={64} strokeWidth={1} className="text-mist" />
            <p className="font-display text-2xl font-light text-obsidian">Henüz siparişiniz yok</p>
            <Link
              href="/koleksiyonlar"
              className="font-body text-xs tracking-widest uppercase text-gold hover:text-gold-dark border-b border-gold pb-0.5 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
              return (
                <div key={order.id} className="bg-cream-dark">
                  {/* Order header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 border-b border-cream-darker">
                    <div className="flex flex-wrap gap-8">
                      <div>
                        <p className="font-body text-[10px] tracking-widest uppercase text-mist">Sipariş No</p>
                        <p className="font-body text-sm text-obsidian mt-1">#{order.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="font-body text-[10px] tracking-widest uppercase text-mist">Tarih</p>
                        <p className="font-body text-sm text-obsidian mt-1">
                          {new Date(order.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <div>
                        <p className="font-body text-[10px] tracking-widest uppercase text-mist">Toplam</p>
                        <p className="font-display text-lg text-obsidian mt-0.5">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                    <span className={`font-body text-[10px] tracking-widest uppercase px-3 py-1.5 rounded ${status?.color || "bg-cream-darker text-mist"}`}>
                      {status?.label || order.status}
                    </span>
                  </div>

                  {/* Order items */}
                  <div className="px-6 py-4 space-y-4">
                    {(order.order_items || []).map((item: { id: string; quantity: number; price: number; products: { name: string; images: string[] } | null }) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="h-16 w-14 shrink-0 bg-cream-darker overflow-hidden">
                          {item.products?.images?.[0] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.products.images[0]}
                              alt={item.products.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-body text-sm text-obsidian">{item.products?.name || "Ürün"}</p>
                          <p className="font-body text-xs text-mist mt-0.5">Adet: {item.quantity}</p>
                        </div>
                        <p className="font-display text-base text-obsidian">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

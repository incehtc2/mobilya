import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { HesapClient } from "./hesap-client";
import { ORDER_STATUSES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hesabım — ARCA" };

export default async function HesapPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/giris?next=/hesap");

  const [{ data: profile }, { data: orders }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("orders")
      .select("id, status, total, created_at, order_items(id)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalSpent = orders?.reduce((acc, o) => acc + Number(o.total), 0) ?? 0;
  const memberSince = new Date(user.created_at).toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">

        {/* Top header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold mb-3">Hesabım</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-obsidian leading-none">
              Merhaba,<br />
              <span className="italic text-mist/60">
                {profile?.full_name?.split(" ")[0] || user.email?.split("@")[0]}
              </span>
            </h1>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="font-body text-[11px] tracking-widest uppercase text-mist hover:text-red-500 transition-colors flex items-center gap-2 mt-2"
            >
              Çıkış Yap
            </button>
          </form>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Left */}
          <div className="space-y-6">

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Toplam Sipariş", value: String(orders?.length ?? 0) },
                { label: "Toplam Harcama", value: formatPrice(totalSpent) },
                { label: "Üyelik", value: memberSince },
              ].map((s) => (
                <div key={s.label} className="bg-cream-dark px-5 py-5 border border-cream-darker">
                  <p className="font-display text-xl font-light text-obsidian">{s.value}</p>
                  <p className="font-body text-[10px] tracking-widest uppercase text-mist mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div className="bg-cream-dark border border-cream-darker overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-cream-darker">
                <h2 className="font-body text-xs tracking-[0.2em] uppercase text-obsidian font-medium">
                  Son Siparişler
                </h2>
                <a
                  href="/hesap/siparisler"
                  className="font-body text-[10px] tracking-widest uppercase text-gold hover:text-gold-dark transition-colors"
                >
                  Tümü →
                </a>
              </div>

              {!orders || orders.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-body text-sm text-mist">Henüz sipariş yok.</p>
                  <a
                    href="/koleksiyonlar"
                    className="inline-block mt-4 font-body text-xs tracking-widest uppercase text-gold border-b border-gold pb-0.5"
                  >
                    Alışverişe Başla
                  </a>
                </div>
              ) : (
                <div className="divide-y divide-cream-darker">
                  {orders.map((order) => {
                    const st = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
                    const itemCount = Array.isArray(order.order_items) ? order.order_items.length : 0;
                    return (
                      <a
                        key={order.id}
                        href="/hesap/siparisler"
                        className="flex items-center justify-between px-6 py-4 hover:bg-cream-darker/50 transition-colors"
                      >
                        <div>
                          <p className="font-body text-xs text-obsidian font-medium">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="font-body text-[11px] text-mist mt-0.5">
                            {new Date(order.created_at).toLocaleDateString("tr-TR", {
                              day: "numeric", month: "long", year: "numeric",
                            })}
                            {itemCount > 0 && ` · ${itemCount} ürün`}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`font-body text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm ${st?.color ?? "bg-cream-darker text-mist"}`}>
                            {st?.label ?? order.status}
                          </span>
                          <span className="font-display text-lg text-obsidian">{formatPrice(Number(order.total))}</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { href: "/hesap/siparisler", label: "Tüm Siparişlerim", sub: "Sipariş geçmişi ve takip" },
                { href: "/kampanyalar", label: "Kampanyalar", sub: "Özel indirimli ürünler" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col justify-between bg-obsidian px-6 py-6 hover:bg-charcoal transition-colors"
                >
                  <p className="font-body text-xs text-mist/60">{item.sub}</p>
                  <div className="flex items-end justify-between mt-6">
                    <p className="font-display text-lg font-light text-cream">{item.label}</p>
                    <span className="text-gold font-body text-sm group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Profile edit */}
          <div>
            <HesapClient
              initialName={profile?.full_name ?? ""}
              initialPhone={profile?.phone ?? ""}
              email={user.email ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

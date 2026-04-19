import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Siparişler" };

export default async function AdminSiparislerPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-obsidian mb-8">Siparişler</h1>

      <div className="bg-cream rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream-dark">
            <tr>
              {["Sipariş No", "Müşteri", "Toplam", "Durum", "Tarih"].map((h) => (
                <th key={h} className="text-left px-6 py-4 font-body text-[10px] tracking-widest uppercase text-mist">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-dark">
            {(orders || []).map((order) => {
              const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
              return (
                <tr key={order.id} className="hover:bg-cream-dark/50 transition-colors">
                  <td className="px-6 py-4 font-body text-xs text-mist font-mono">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-obsidian">
                    {order.customer_email || "—"}
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-obsidian font-medium">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-body text-[10px] tracking-widest uppercase px-2 py-1 rounded ${status?.color || ""}`}>
                      {status?.label || order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body text-xs text-mist">
                    {new Date(order.created_at).toLocaleDateString("tr-TR")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {(!orders || orders.length === 0) && (
          <div className="py-16 text-center">
            <p className="font-body text-mist">Henüz sipariş yok.</p>
          </div>
        )}
      </div>
    </div>
  );
}

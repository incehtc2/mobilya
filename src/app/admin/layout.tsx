import Link from "next/link";
import { LayoutGrid, Package, ShoppingCart, LogOut } from "lucide-react";
import { signOut } from "@/app/auth/actions";
import { SITE_NAME } from "@/lib/constants";

const ADMIN_LINKS = [
  { label: "Ürünler", href: "/admin/urunler", icon: Package },
  { label: "Siparişler", href: "/admin/siparisler", icon: ShoppingCart },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-obsidian flex flex-col shrink-0">
        <div className="px-6 py-8 border-b border-cream/10">
          <Link href="/" className="font-display text-xl tracking-[0.2em] text-cream">
            {SITE_NAME}
          </Link>
          <p className="font-body text-[10px] tracking-widest uppercase text-mist mt-1">Admin Paneli</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {ADMIN_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 font-body text-sm text-cream/60 hover:text-cream hover:bg-cream/5 rounded transition-colors duration-200"
            >
              <Icon size={16} strokeWidth={1.5} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-cream/10">
          <form action={signOut}>
            <button className="flex items-center gap-3 px-4 py-3 font-body text-sm text-cream/60 hover:text-cream w-full transition-colors">
              <LogOut size={16} strokeWidth={1.5} />
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

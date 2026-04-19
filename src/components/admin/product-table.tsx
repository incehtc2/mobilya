"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, AlertTriangle, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "@/app/admin/urunler/actions";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  featured: boolean;
  images: string[];
  categories: { name: string } | null;
}

function DeleteModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const fd = new FormData();
    fd.append("id", product.id);
    await deleteProduct(fd);
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-cream w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-darker">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center bg-red-50 rounded">
              <AlertTriangle size={15} className="text-red-500" strokeWidth={1.5} />
            </div>
            <h2 className="font-body text-xs tracking-[0.2em] uppercase text-obsidian font-medium">
              Ürünü Sil
            </h2>
          </div>
          <button onClick={onClose} className="text-mist hover:text-obsidian transition-colors">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          <div className="flex items-center gap-4">
            {product.images?.[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-16 w-12 object-cover shrink-0"
              />
            )}
            <div>
              <p className="font-display text-lg font-light text-obsidian leading-tight">
                {product.name}
              </p>
              <p className="font-body text-sm text-mist mt-0.5">{formatPrice(product.price)}</p>
            </div>
          </div>
          <p className="font-body text-sm text-mist leading-relaxed">
            Bu ürün kalıcı olarak silinecek. Bu işlem geri alınamaz.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-5 border-t border-cream-darker bg-cream-dark">
          <button
            onClick={onClose}
            disabled={deleting}
            className="flex-1 border border-cream-darker text-mist py-3 font-body text-xs tracking-widest uppercase hover:border-obsidian hover:text-obsidian transition-colors disabled:opacity-50"
          >
            Vazgeç
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 bg-red-500 text-white py-3 font-body text-xs tracking-widest uppercase hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {deleting ? (
              <><span className="h-3 w-3 rounded-full border border-white/40 border-t-white animate-spin" /> Siliniyor…</>
            ) : (
              <><Trash2 size={13} strokeWidth={1.5} /> Evet, Sil</>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductTable({ products }: { products: Product[] }) {
  const [toDelete, setToDelete] = useState<Product | null>(null);

  return (
    <>
      <div className="bg-cream rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream-dark">
            <tr>
              {["Ürün", "Kategori", "Fiyat", "Stok", "Durum", ""].map((h) => (
                <th key={h} className="text-left px-6 py-4 font-body text-[10px] tracking-widest uppercase text-mist">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-dark">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-cream-dark/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {p.images?.[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0]} alt={p.name} className="h-12 w-10 object-cover rounded" />
                    )}
                    <span className="font-body text-sm text-obsidian font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-body text-sm text-mist">
                  {p.categories?.name || "—"}
                </td>
                <td className="px-6 py-4 font-body text-sm text-obsidian">{formatPrice(p.price)}</td>
                <td className="px-6 py-4 font-body text-sm text-obsidian">{p.stock}</td>
                <td className="px-6 py-4">
                  <span className={`font-body text-[10px] tracking-widest uppercase px-2 py-1 rounded ${p.featured ? "bg-gold/20 text-gold-dark" : "bg-cream-darker text-mist"}`}>
                    {p.featured ? "Öne Çıkan" : "Normal"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 justify-end">
                    <Link href={`/admin/urunler/${p.id}`} className="text-mist hover:text-obsidian transition-colors">
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => setToDelete(p)}
                      className="text-mist hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-body text-mist">Henüz ürün yok.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {toDelete && (
          <DeleteModal product={toDelete} onClose={() => setToDelete(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

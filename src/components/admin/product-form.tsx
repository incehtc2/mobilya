"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageUploader } from "./image-uploader";
import { formatPrice } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import { Tag, Package, FileText, DollarSign, Layers, Box, Star, AlertCircle, CheckCircle2, Eye } from "lucide-react";
import type { Category, Product } from "@/types";

interface ProductFormProps {
  categories: Category[];
  action: (formData: FormData) => Promise<void | { error: string }>;
  product?: Product;
}

function FormSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-cream rounded-lg border border-cream-darker overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-cream-darker bg-cream-dark">
        <Icon size={15} strokeWidth={1.5} className="text-gold" />
        <h3 className="font-body text-xs tracking-[0.2em] uppercase text-obsidian font-medium">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 font-body text-[11px] tracking-[0.15em] uppercase text-mist">
        {label}
        {required && <span className="text-gold">*</span>}
      </label>
      {children}
      {hint && <p className="font-body text-[11px] text-mist/70">{hint}</p>}
    </div>
  );
}

const inputCls = "w-full bg-cream-dark border border-cream-darker px-4 py-3 text-sm text-obsidian placeholder:text-mist/50 focus:outline-none focus:border-gold transition-colors duration-200 font-body";

export function ProductForm({ categories, action, product }: ProductFormProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(product?.images || []);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(!!product?.discount_price);
  const [price, setPrice] = useState<string>(product?.price ? String(product.price) : "");
  const [discountPrice, setDiscountPrice] = useState<string>(product?.discount_price ? String(product.discount_price) : "");
  const [selectedCategory, setSelectedCategory] = useState<string>(product?.category_id || "");
  const [name, setName] = useState(product?.name || "");
  const [stock, setStock] = useState<string>(product?.stock != null ? String(product.stock) : "0");

  const allCategories: { id: string; name: string; slug: string }[] = categories.length
    ? categories
    : [];

  const priceNum = Number(price) || 0;
  const discountNum = Number(discountPrice) || 0;
  const discountPercent = hasDiscount && priceNum > 0 && discountNum > 0
    ? Math.round((1 - discountNum / priceNum) * 100)
    : 0;
  const isDiscountValid = !hasDiscount || (discountNum > 0 && discountNum < priceNum);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (imageUrls.length === 0) { setError("En az bir ürün görseli eklemelisiniz."); return; }
    if (hasDiscount && !isDiscountValid) { setError("İndirimli fiyat, normal fiyattan düşük olmalıdır."); return; }
    setSaving(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    imageUrls.forEach((url) => fd.append("imageUrls", url));
    if (!hasDiscount) fd.delete("discount_price");
    const result = await action(fd);
    if (result?.error) { setError(result.error); setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid xl:grid-cols-[1fr_340px] gap-6 items-start">
        {/* Left column */}
        <div className="space-y-6">

          {/* Temel Bilgiler */}
          <FormSection icon={Tag} title="Temel Bilgiler">
            <div className="space-y-5">
              <Field label="Ürün Adı" required>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Milano Deri Koltuk"
                  required
                  className={inputCls}
                />
              </Field>

              <Field label="Açıklama">
                <textarea
                  name="description"
                  defaultValue={product?.description || ""}
                  rows={5}
                  placeholder="Ürünün malzemesi, boyutları, özellikleri..."
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <Field label="Kategori" required>
                <select
                  name="category_id"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                  className={`${inputCls} cursor-pointer`}
                >
                  <option value="">Kategori seçin</option>
                  {allCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </Field>
            </div>
          </FormSection>

          {/* Fiyatlandırma */}
          <FormSection icon={DollarSign} title="Fiyatlandırma">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Normal Fiyat (₺)" required>
                  <div className="relative">
                    <input
                      name="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0"
                      required
                      min={0}
                      step={1}
                      className={inputCls}
                    />
                    {priceNum > 0 && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-body text-xs text-mist">
                        {formatPrice(priceNum)}
                      </span>
                    )}
                  </div>
                </Field>

                <Field label="Stok Adedi" required>
                  <input
                    name="stock"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    required
                    min={0}
                    className={inputCls}
                  />
                </Field>
              </div>

              {/* İndirim toggle */}
              <div className="border border-cream-darker rounded">
                <button
                  type="button"
                  onClick={() => setHasDiscount((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-cream-dark transition-colors"
                >
                  <span className="font-body text-sm text-obsidian flex items-center gap-2">
                    <Tag size={14} strokeWidth={1.5} className={hasDiscount ? "text-gold" : "text-mist"} />
                    İndirimli Fiyat Ekle
                  </span>
                  <div className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${hasDiscount ? "bg-gold" : "bg-cream-darker"}`}>
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${hasDiscount ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                </button>

                {hasDiscount && (
                  <div className="px-4 pb-4 border-t border-cream-darker space-y-3">
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <Field label="İndirimli Fiyat (₺)" required={hasDiscount}>
                        <div className="relative">
                          <input
                            name="discount_price"
                            type="number"
                            value={discountPrice}
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            placeholder="0"
                            min={1}
                            step={1}
                            className={`${inputCls} ${!isDiscountValid && discountPrice ? "border-red-400" : ""}`}
                          />
                        </div>
                      </Field>
                      <div className="flex flex-col justify-end pb-1">
                        {discountPercent > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded px-3 py-2 text-center">
                            <p className="font-display text-2xl text-red-600 font-light">%{discountPercent}</p>
                            <p className="font-body text-[10px] text-red-400 uppercase tracking-wide">İndirim</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {priceNum > 0 && discountNum > 0 && isDiscountValid && (
                      <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded">
                        <CheckCircle2 size={13} />
                        <span className="font-body text-xs">
                          {formatPrice(priceNum)} → {formatPrice(discountNum)} · Müşteri {formatPrice(priceNum - discountNum)} kazanıyor
                        </span>
                      </div>
                    )}

                    {!isDiscountValid && discountPrice && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
                        <AlertCircle size={13} />
                        <span className="font-body text-xs">İndirimli fiyat normal fiyattan düşük olmalıdır.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </FormSection>

          {/* Görseller */}
          <FormSection icon={Layers} title="Ürün Görselleri">
            <div className="space-y-4">
              <p className="font-body text-xs text-mist">
                İlk görsel kapak resmi olarak kullanılır. Sürükle-bırak ile sıralayabilirsiniz.
                Önerilen boyut: <strong>800×1000px</strong>, format: JPG veya WebP.
              </p>
              <ImageUploader images={imageUrls} onChange={setImageUrls} />
              {imageUrls.length === 0 && (
                <p className="font-body text-xs text-amber-600 flex items-center gap-1.5">
                  <AlertCircle size={12} /> En az bir görsel eklemelisiniz.
                </p>
              )}
            </div>
          </FormSection>

          {/* 3D Model */}
          <FormSection icon={Box} title="3D Model (Opsiyonel)">
            <Field label="GLB/GLTF URL" hint="Ürün detay sayfasında 3D görüntüleyici aktif olur.">
              <input
                name="model_url"
                type="url"
                defaultValue={product?.model_url || ""}
                placeholder="https://example.com/model.glb"
                className={inputCls}
              />
            </Field>
          </FormSection>
        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Yayın Durumu */}
          <FormSection icon={Star} title="Yayın Durumu">
            <div className="space-y-4">
              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={product?.featured}
                  className="sr-only peer"
                  id="featured"
                />
                <div className="relative w-10 h-5 rounded-full bg-cream-darker peer-checked:bg-gold transition-colors duration-200 shrink-0">
                  <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-5" />
                </div>
                <div>
                  <p className="font-body text-sm text-obsidian">Öne Çıkan Ürün</p>
                  <p className="font-body text-[11px] text-mist">Ana sayfada ve öne çıkanlar listesinde gösterilir</p>
                </div>
              </label>
            </div>
          </FormSection>

          {/* Canlı Önizleme */}
          <FormSection icon={Eye} title="Canlı Önizleme">
            <div className="space-y-3">
              <div className="relative bg-cream-dark overflow-hidden" style={{ aspectRatio: "3/4" }}>
                {imageUrls[0] ? (
                  <Image
                    src={imageUrls[0]}
                    alt="Önizleme"
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-mist/40">
                    <Package size={32} strokeWidth={1} />
                    <p className="font-body text-xs">Görsel bekleniyor</p>
                  </div>
                )}
                {hasDiscount && discountPercent > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white font-body text-[10px] tracking-widest uppercase px-2 py-1">
                    -%{discountPercent}
                  </div>
                )}
                {product?.featured && (
                  <div className="absolute top-3 right-3 bg-gold text-obsidian font-body text-[10px] tracking-widest uppercase px-2 py-1">
                    Öne Çıkan
                  </div>
                )}
              </div>

              <div className="space-y-1 px-1">
                {selectedCategory && (
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-mist">
                    {allCategories.find((c) => c.id === selectedCategory)?.name}
                  </p>
                )}
                <p className="font-display text-lg text-obsidian leading-tight">
                  {name || <span className="text-mist/40">Ürün adı</span>}
                </p>
                <div className="flex items-center gap-2">
                  {hasDiscount && discountNum > 0 && isDiscountValid ? (
                    <>
                      <span className="font-body text-sm text-gold">{formatPrice(discountNum)}</span>
                      <span className="font-body text-xs text-mist line-through">{formatPrice(priceNum)}</span>
                    </>
                  ) : (
                    <span className="font-body text-sm text-mist">
                      {priceNum > 0 ? formatPrice(priceNum) : <span className="text-mist/40">₺0</span>}
                    </span>
                  )}
                </div>
                <p className="font-body text-[11px] text-mist">
                  Stok: {stock || "0"} adet
                </p>
              </div>
            </div>
          </FormSection>

          {/* Kaydet */}
          <div className="space-y-3">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <p className="font-body text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-obsidian text-cream py-4 font-body text-xs tracking-widest uppercase hover:bg-charcoal transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <><span className="animate-spin inline-block h-3 w-3 border border-cream/40 border-t-cream rounded-full" /> Kaydediliyor...</>
              ) : (
                <>{product ? "Değişiklikleri Kaydet" : "Ürünü Yayınla"}</>
              )}
            </button>

            <Link href="/admin/urunler" className="block">
              <button
                type="button"
                className="w-full border border-cream-darker text-mist py-3 font-body text-xs tracking-widest uppercase hover:border-obsidian hover:text-obsidian transition-colors duration-200"
              >
                İptal
              </button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

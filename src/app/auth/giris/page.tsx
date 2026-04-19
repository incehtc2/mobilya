"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { signIn } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";

function GirisForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || searchParams.get("redirect") || "/";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    fd.set("next", next);
    const result = await signIn(fd);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input name="email" type="email" label="E-posta" placeholder="ornek@mail.com" required />
      <Input name="password" type="password" label="Şifre" placeholder="••••••••" required />

      {error && <p className="font-body text-xs text-red-500">{error}</p>}

      <Button type="submit" className="w-full" size="lg" disabled={loading} magnetic={false}>
        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </Button>
    </form>
  );
}

export default function GirisPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-cream">
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80"
          alt="Premium mobilya"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-obsidian/50" />
        <div className="absolute bottom-12 left-12">
          <span className="font-display text-4xl text-cream tracking-[0.2em]">{SITE_NAME}</span>
          <p className="font-body text-sm text-cream/60 mt-2">Zamansız Tasarım</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <Link href="/" className="font-display text-2xl tracking-[0.2em] text-obsidian lg:hidden block mb-12">
            {SITE_NAME}
          </Link>

          <h1 className="font-display text-4xl font-light text-obsidian mb-2">Giriş Yap</h1>
          <p className="font-body text-sm text-mist mb-10">
            Hesabınız yok mu?{" "}
            <Link href="/auth/kayit" className="text-gold hover:underline">Kayıt Ol</Link>
          </p>

          <Suspense fallback={null}>
            <GirisForm />
          </Suspense>

          <p className="mt-8 text-center font-body text-xs text-mist">
            <Link href="/" className="hover:text-obsidian transition-colors">← Ana Sayfaya Dön</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

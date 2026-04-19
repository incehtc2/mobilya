"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signUp } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";

export default function KayitPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const result = await signUp(fd);
    setLoading(false);
    if ("error" in result && result.error) setError(result.error);
    if ("success" in result && result.success) setSuccess(result.success);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-cream">
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80"
          alt="Premium mobilya"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-obsidian/50" />
        <div className="absolute bottom-12 left-12">
          <span className="font-display text-4xl text-cream tracking-[0.2em]">{SITE_NAME}</span>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-4xl font-light text-obsidian mb-2">Kayıt Ol</h1>
          <p className="font-body text-sm text-mist mb-10">
            Zaten hesabınız var mı?{" "}
            <Link href="/auth/giris" className="text-gold hover:underline">Giriş Yap</Link>
          </p>

          {success ? (
            <div className="text-center py-8">
              <p className="font-display text-xl text-obsidian mb-4">{success}</p>
              <Link href="/auth/giris">
                <Button>Giriş Yap</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input name="fullName" label="Ad Soyad" placeholder="Adınız Soyadınız" required />
              <Input name="email" type="email" label="E-posta" placeholder="ornek@mail.com" required />
              <Input name="password" type="password" label="Şifre" placeholder="En az 8 karakter" required />

              {error && <p className="font-body text-xs text-red-500">{error}</p>}

              <Button type="submit" className="w-full" size="lg" disabled={loading} magnetic={false}>
                {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

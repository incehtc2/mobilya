import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-8 px-6 text-center">
      <p className="font-display text-[clamp(6rem,20vw,20rem)] font-light leading-none text-cream-dark select-none">
        404
      </p>
      <div className="-mt-16 space-y-4">
        <h1 className="font-display text-3xl font-light text-obsidian">Sayfa Bulunamadı</h1>
        <p className="font-body text-mist max-w-sm">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/">
          <Button>Ana Sayfaya Dön</Button>
        </Link>
        <Link href="/koleksiyonlar">
          <Button variant="outline">Koleksiyonlar</Button>
        </Link>
      </div>
    </div>
  );
}

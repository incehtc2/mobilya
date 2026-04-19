import Image from "next/image";
import { ParallaxSection } from "@/components/shared/parallax-section";
import { SplitText } from "@/components/shared/split-text";
import { MarqueeBanner } from "@/components/home/marquee-banner";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hakkımızda" };

const TIMELINE = [
  { year: "2009", text: "İstanbul Boğaziçi'nde küçük bir atölyeyle başladık. İlk ürünlerimiz tamamen el yapımıydı." },
  { year: "2014", text: "İlk mağazamızı Nişantaşı'nda açtık. Koleksiyonlarımız 12 ülkeye ihraç edilmeye başlandı." },
  { year: "2019", text: "Milano Furniture Fair'de En İyi Tasarım ödülünü kazandık." },
  { year: "2024", text: "Online platformumuzu açarak dünya genelindeki müşterilere ulaşıyoruz." },
];

export default function HakkimizdaPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-obsidian">
        <div className="absolute inset-0">
          <Image
            src="/images/mobilya/9.jpg"
            alt="Atölyemiz"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pb-20 pt-40">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">Hakkımızda</p>
          <h1 className="font-display text-[clamp(3rem,7vw,7rem)] font-light text-cream leading-none">
            <SplitText text="Zanaatkârlık" />
            <br />
            <span className="italic text-cream/50">
              <SplitText text="& Tutku" delay={0.3} />
            </span>
          </h1>
        </div>
      </section>

      <MarqueeBanner />

      {/* Intro */}
      <section className="py-24 mx-auto max-w-4xl px-6 lg:px-12 text-center">
        <p className="font-display text-2xl font-light text-obsidian leading-relaxed">
          &ldquo;Her parça, bir hikaye anlatır. Biz sadece mobilya üretmiyoruz;
          nesilden nesile aktarılacak anılar yaratıyoruz.&rdquo;
        </p>
        <p className="font-body text-sm text-mist mt-6">— Kurucu, ARCA</p>
      </section>

      {/* Story + image */}
      <section className="py-16 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-6">
          <h2 className="font-display text-4xl font-light text-obsidian">Hikayemiz</h2>
          <p className="font-body text-mist leading-relaxed">
            2009 yılında İstanbul&apos;un kalbinde küçük bir atölye ile başlayan yolculuğumuz,
            bugün dünya genelinde premium mobilya tasarımının simgesi haline geldi. Her parçamız,
            yüzyıllık Türk zanaatkârlık geleneğini modern estetikle buluşturuyor.
          </p>
          <p className="font-body text-mist leading-relaxed">
            Kullandığımız her malzeme özenle seçilir; her dikiş, her cıvata, her cilalama işlemi
            ustalıkla gerçekleştirilir. Amacımız tek: evinizde bir yaşam süresi boyunca
            size eşlik edecek parçalar yaratmak.
          </p>
        </div>
        <ParallaxSection offset={50}>
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/mobilya/1.jpg"
              alt="Atölyemiz"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </ParallaxSection>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-obsidian">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <h2 className="font-display text-4xl font-light text-cream mb-16">Kilometre Taşları</h2>
          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="grid grid-cols-[80px_1fr] gap-8 items-start">
                <span className="font-display text-2xl text-gold font-light">{item.year}</span>
                <div>
                  <div className="w-full h-px bg-cream/10 mb-6" />
                  <p className="font-body text-cream/60 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-obsidian text-cream">
      {/* Big brand word */}
      <div className="overflow-hidden border-b border-cream/10">
        <p className="font-display text-[clamp(4rem,15vw,14rem)] font-light leading-none tracking-[-0.02em] text-cream/5 px-6 lg:px-12 py-4 select-none">
          {SITE_NAME}
        </p>
      </div>

      {/* Links grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-display text-2xl tracking-[0.2em] font-light">{SITE_NAME}</span>
          <p className="mt-4 text-sm text-mist font-body leading-relaxed">{SITE_TAGLINE}</p>
          <div className="mt-6 flex gap-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="text-xs tracking-widest uppercase text-mist hover:text-gold transition-colors duration-300 font-body"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Koleksiyonlar */}
        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase text-mist mb-6 font-body">Koleksiyonlar</h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.koleksiyonlar.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream/60 hover:text-cream transition-colors font-body">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kurumsal */}
        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase text-mist mb-6 font-body">Kurumsal</h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.kurumsal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream/60 hover:text-cream transition-colors font-body">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Müşteri Hizmetleri */}
        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase text-mist mb-6 font-body">Müşteri</h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.musteri.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream/60 hover:text-cream transition-colors font-body">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10 mx-auto max-w-7xl px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-mist font-body">© {year} {SITE_NAME}. Tüm hakları saklıdır.</p>
        <p className="text-xs text-mist font-body">Türkiye&apos;de tasarlandı ve üretildi.</p>
      </div>
    </footer>
  );
}

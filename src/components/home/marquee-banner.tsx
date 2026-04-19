export function MarqueeBanner() {
  const text = "PREMIUM MOBİLYA · EL YAPIMI · TÜRK ZANAAT · ZAMANSIZ TASARIM · ";
  const repeated = text.repeat(4);

  return (
    <div className="bg-obsidian py-5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-display text-sm tracking-[0.3em] uppercase text-cream/20 shrink-0">
          {repeated}
        </span>
        <span className="font-display text-sm tracking-[0.3em] uppercase text-cream/20 shrink-0" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  );
}

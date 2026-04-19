"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ParallaxSection } from "@/components/shared/parallax-section";
import { SplitText } from "@/components/shared/split-text";

export function BrandStory() {
  return (
    <section className="py-24 bg-obsidian overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <ParallaxSection offset={60}>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/mobilya/2.jpg"
              alt="El yapımı mobilya"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </ParallaxSection>

        {/* Text */}
        <div className="space-y-8">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-[8rem] font-light leading-none text-cream/5 select-none block -mb-8"
          >
            2024
          </motion.span>

          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold">Hikayemiz</p>

          <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] font-light text-cream leading-tight">
            <SplitText text="Zanaatkârlık" />
            <br />
            <span className="italic text-cream/50">
              <SplitText text="bir tutku" delay={0.2} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-body text-cream/60 leading-relaxed"
          >
            Her mobilyamız, usta zanaatkârların elleriyle şekillendirilir. Doğal
            malzemelere duyduğumuz saygı ve mükemmeliyetçi yaklaşımımız, nesiller
            boyu yaşayacak parçalar ortaya koyar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 border-t border-cream/10 pt-8"
          >
            {[
              { num: "15+", label: "Yıllık Deneyim" },
              { num: "2K+", label: "Mutlu Müşteri" },
              { num: "100%", label: "El Yapımı" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-cream font-light">{stat.num}</p>
                <p className="font-body text-xs text-mist mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link
              href="/hakkimizda"
              className="inline-flex items-center gap-3 font-body text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors duration-300 border-b border-gold hover:border-gold-light pb-1"
            >
              Daha Fazlasını Keşfet
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

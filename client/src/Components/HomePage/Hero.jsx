import React from "react";
import { motion } from "framer-motion";
 import heroModel from "../../assets/HeroSectionImg/hero-model.jpg";
  import heroDress from "../../assets/HeroSectionImg/hero-dress.jpg";
  import heroBag from "../../assets/HeroSectionImg/hero-bag.jpg";
  import heroShoes from "../../assets/HeroSectionImg/hero-shoes.jpg";

const ease = [0.7, 0, 0.2, 1];

const COLLECTION = [
  { src: heroModel, label: "Atelier", caption: "Tailoring N°01" },
  { src: heroDress, label: "Soirée", caption: "Silk N°14" },
  { src: heroBag, label: "Maroquinerie", caption: "Leather N°07" },
  { src: heroShoes, label: "Souliers", caption: "Cuir N°22" },
];

export default function CruseHero() {
  return (
    <section className="relative w-full bg-cream text-ink">
      {/* Announcement ticker */}
      <div className="border-b border-ink/10 bg-ink text-cream overflow-hidden">
        <div className="marquee-mask py-2.5 text-[10px] tracking-[0.4em] uppercase font-light">
          <div className="flex w-max animate-ticker gap-20 whitespace-nowrap">
            {Array.from({ length: 2 }).flatMap((_, i) =>
              [
                "Spring / Summer Collection 2026",
                "Complimentary Shipping Worldwide",
                "Atelier Appointments — Paris · Milano · Tokyo",
                "New Arrivals — Maroquinerie",
              ].map((t, j) => (
                <span key={`${i}-${j}`} className="opacity-90">
                  ✦ &nbsp; {t}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Full-width hero with overlaid text */}
      <div className="relative w-full h-[92vh] min-h-[640px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease }}
          src={heroModel}
          alt="Maison Cruse — Spring 2026 Campaign"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Cinematic gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        {/* Top-left campaign tag */}
        <div className="absolute left-6 top-6 md:left-12 md:top-10 text-cream">
          <div className="text-[10px] uppercase tracking-[0.45em] opacity-85">
            Maison Cruse — Est. 1968
          </div>
        </div>

        {/* Centered editorial copy */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="text-[10px] uppercase tracking-[0.5em] text-cream/85"
          >
            Campaign N°XXIV — Spring / Summer 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.15 }}
            className="mt-6 font-light leading-[0.9] tracking-[-0.015em] text-cream text-[clamp(3.25rem,9vw,8rem)]"
            style={{ fontFamily: "Italiana, 'Cormorant Garamond', serif" }}
          >
            The Art of
            <span className="block italic">Quiet Luxury.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.4 }}
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-cream/85 font-light"
          >
            A study in restraint. Crafted in our ateliers from the finest
            materials — a wardrobe of dresses, leather, and footwear, made to
            outlast seasons.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.55 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#collection"
              className="group inline-flex items-center justify-center gap-3 bg-cream px-9 py-4 text-[10px] uppercase tracking-[0.35em] text-ink transition-all hover:bg-cream/90"
            >
              Discover Collection
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#atelier"
              className="inline-flex items-center justify-center gap-3 border border-cream/50 px-9 py-4 text-[10px] uppercase tracking-[0.35em] text-cream transition-all hover:border-cream hover:bg-cream/10"
            >
              Book an Atelier
            </a>
          </motion.div>
        </div>

        {/* Bottom caption */}
        <div className="absolute left-6 bottom-6 md:left-12 md:bottom-10 text-cream">
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-80">
            Photographed in Paris — March 2026
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute right-6 bottom-6 md:right-12 md:bottom-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-cream/75">
          <span>Scroll</span>
          <span className="h-px w-10 bg-cream/50" />
        </div>
      </div>

      {/* Editorial gallery — perfectly aligned grid */}
      <div id="collection" className="mx-auto max-w-[1700px] px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-end justify-between mb-12 md:mb-20">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-ink/55">
              Collection N°XXIV
            </div>
            <h2
              className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.95] tracking-[-0.01em]"
              style={{ fontFamily: "Italiana, serif" }}
            >
              Spring / Summer 2026
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-ink/70 hover:text-ink border-b border-ink/30 hover:border-ink pb-1 transition-colors"
          >
            View All →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 items-start">
          {COLLECTION.map((item, idx) => (
            <motion.figure
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease, delay: idx * 0.08 }}
              className="group"
            >
              <div className="relative overflow-hidden bg-ink/5 aspect-[3/4]">
                <img
                  src={item.src}
                  alt={item.caption}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.05]"
                />
                <span className="absolute left-3 top-3 bg-cream/95 px-2.5 py-1 text-[9px] uppercase tracking-[0.3em] text-ink">
                  N°{String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-ink/65">
                <span>{item.label}</span>
                <span className="opacity-70">{item.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-24 md:mt-32 border-t border-ink/15 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[10px] uppercase tracking-[0.4em] text-ink/55">
          <span>Paris · Milano · Tokyo · New York</span>
          <span
            className="text-base normal-case tracking-normal italic text-ink/75"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            “Elegance is refusal.” — Coco Chanel
          </span>
          <span>© MMXXVI Maison Cruse</span>
        </div>
      </div>
    </section>
  );
}


 
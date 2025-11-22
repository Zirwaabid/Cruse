import React, { useEffect, useState } from "react";
import { Images } from "../../index";
import { motion } from "framer-motion";

export default function CruseHero() {
  const [startIndex, setStartIndex] = useState(0);

  // Auto-slide effect for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 2) % Images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isMobile = window.innerWidth < 768;

  const displayedImages = isMobile
    ? [...Images, ...Images].slice(startIndex, startIndex + 2)
    : Images;

  return (
    <>
      <div className="w-full px-0 pb-20 relative overflow-hidden ">

        {/* ANIMATED DESKTOP HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden md:block font-medium text-[220px] leading-[0.7] heading-text select-none absolute left-0 top-14"
          style={{ letterSpacing: "10px" }}
        >
          CRUSE
        </motion.h1>

        {/* ANIMATED DESKTOP PARAGRAPH */}
        <motion.p
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="hidden md:block absolute right-6 top-32 max-w-xs text-sm para-text"
        >
          Celebrating craftsmanship with natural textures, organic forms, and earthy tones for every
          space.
        </motion.p>

        {/* Mobile version heading & paragraph */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:hidden mt-6 mb-6 text-center px-4"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-widest heading-text">
            CRUSE
          </h2>
          <p className="text-[14px] sm:text-base para-text mt-2 leading-relaxed">
            Celebrating craftsmanship with natural textures, organic forms, and earthy tones for every space.
          </p>
        </motion.div>

        {/* Animated image section */}
        <div
          className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-0 mt-20 md:mt-62 transition-all duration-500`}
        >
          {displayedImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
              whileHover={!isMobile ? { scale: 1.03 } : {}}
              className="h-64 sm:h-72 md:h-[371px] overflow-hidden flex items-end"
            >
              <motion.img
                src={src}
                alt={`hero-${idx}`}
                className="w-full h-full object-cover md:object-top transform-gpu transition-transform duration-700 ease-in-out"
                style={{ willChange: "transform" }}
              />
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-12 md:hidden" />
      </div>
    </>
  );
}

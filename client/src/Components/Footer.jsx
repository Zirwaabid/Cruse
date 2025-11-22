import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#3d2312] text-white pt-24 pb-16 overflow-hidden mt-12">

      {/* Soft Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-0 w-[400px] h-[400px] bg-white/5 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-white/5 blur-[150px]" />
      </div>

      <div className="relative z-5 max-w-7xl mx-auto px-6">

        {/* TOP SECTION — HEADING + PARA */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase"
          >
            Elevate Your Style
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-300 text-[15px] md:text-[17px] leading-relaxed"
          >
            Discover timeless pieces, curated designs, and modern fashion essentials. 
            CRUSE brings luxury, comfort, and elegance directly to your wardrobe.
          </motion.p>
        </div>

        {/* FOOTER CONTENT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-16 text-center md:text-left mb-20">

          {/* SHOP */}
          <div>
            <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide text-white">Shop</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white transition cursor-pointer">Dresses</li>
              <li className="hover:text-white transition cursor-pointer">Shoes</li>
              <li className="hover:text-white transition cursor-pointer">Bags</li>
              
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide text-white">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white transition cursor-pointer">Contact Us</li>
              <li className="hover:text-white transition cursor-pointer">FAQs</li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide text-white">About</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white transition cursor-pointer">Our Story</li>
              <li className="hover:text-white transition cursor-pointer">Our Quality</li>
         
            </ul>
          </div>

          {/* FOLLOW US */}
          <div>
            <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide text-white">Follow Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white transition cursor-pointer">Instagram</li>
              
              <li className="hover:text-white transition cursor-pointer">TikTok</li>
              <li className="hover:text-white transition cursor-pointer">Pinterest</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM HUGE BRAND NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-[70px] md:text-[120px] lg:text-[160px] font-extrabold tracking-[0.2em] uppercase opacity-[0.05] select-none"
        >
          CRUSE
        </motion.h1>

        {/* COPYRIGHT */}
        <p className="text-center mt-6 text-gray-400 text-sm">
          © {new Date().getFullYear()} CRUSE. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

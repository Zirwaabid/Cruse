// AiStylistHighlight.jsx
import React from "react";
import { motion } from "framer-motion";
import { AiStylistImg } from "../../index";
import { useNavigate } from "react-router-dom";

export default function AiStylistHighlight() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden  para-text  py-15 md:py-20">
      
      

      <div className="max-w-7xl mx-auto px-6">

        {/* TOP paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-left font-extrabold uppercase leading-tight text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px] tracking-tight max-w-2xl">
            Built on intelligent style insights — our AI asks the right questions
            and crafts outfit combinations tailored to your taste, occasion, and
            budget.
          </p>
        </motion.div>

        {/* IMAGES */}
        <div className="mt-8 md:mt-10 flex justify-center">
          <div
            className="relative w-full max-w-4xl rounded-sm overflow-hidden border border-white/10"
            style={{ boxShadow: "0 18px 50px rgba(2,6,23,0.6)" }}
          >
            <div className="hidden sm:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.995 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex w-full h-[260px] sm:h-80 md:h-[400px] lg:h-[460px]"
              >
                {AiStylistImg.map((src, i) => (
                  <div key={i} className="flex-1 h-full overflow-hidden">
                    <img
                      src={src}
                      alt={`ai-${i}`}
                      className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                      style={{ display: "block" }}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* mobile fallback */}
            <div className="sm:hidden">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 gap-2 h-auto"
              >
                {AiStylistImg.map((src, i) => (
                  <div key={i} className="w-full h-[220px] overflow-hidden">
                    <img
                      src={src}
                      alt={`ai-mobile-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* subtle white inner borders */}
            <div className="absolute inset-x-6 top-6 h-0.5 bg-white/10 pointer-events-none" />
            <div className="absolute inset-x-6 bottom-6 h-0.5 bg-white/10 pointer-events-none" />
          </div>
        </div>

        {/* BOTTOM paragraph + Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-8 md:mt-10 max-w-4xl mx-auto"
        >
          <p className="text-right font-extrabold uppercase leading-tight text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px] tracking-tight max-w-2xl ml-auto">
            This is how our AI Stylist works — it recommends a complete look:
            dress, shoes, and bag tailored to your occasion, preferred colors,
            and price range.
          </p>

          {/* BUTTON */}
          <motion.button
            onClick={() => navigate("/ai-stylist")}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="
              ml-auto mt-6 block 
              px-6 py-3 
              border border-white/30 
              rounded-full 
              text-sm md:text-base 
              font-medium 
              uppercase 
              tracking-wide 
              hover:border-white 
              hover:bg-white/10 
              transition-all 
              duration-300
              button-bg
              text-white
            "
          >
            Try AI Stylist 
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

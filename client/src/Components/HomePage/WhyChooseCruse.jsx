// WhyChooseCruse.jsx
import React from "react";
import { motion } from "framer-motion";
import { ShopWithUsImg } from "../../index"; // ensure correct import path

export default function WhyChooseCruse() {
  const features = [
    "HASSLE-FREE RETURNS",
    "FAST & FREE SHIPPING",
    "SECURE PAYMENTS",
    "24/7 CUSTOMER SUPPORT",
    "EASY RETURNS",
  ];

  return (
    <section className="w-full  py-15 md:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top heading + subtitle */}
        <div className="text-center mb-10 md:mb-14">
          <h1
            className="font-bold heading-text uppercase leading-tight tracking-tight md:text-5xl text-4xl"
           
          >
            WHY CHOOSE US
          </h1>

          <p className="mt-4 text-sm md:text-base max-w-3xl mx-auto">
            Enjoy fast shipping, easy returns, and curated looks , your personal
            AI stylist guides every choice.
          </p>
        </div>

        {/* Main two-column area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left: Features list (centered vertically) */}
          <div className="order-2 md:order-1 flex items-center justify-center">
            <div className="flex flex-col gap-6">
              {features.map((f, i) => {
                const isHighlight = f === "FAST & FREE SHIPPING";
                return (
                  <div key={f} className="flex flex-col group cursor-pointer">

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className={`uppercase transition-all duration-300 
                        ${
                          isHighlight
                            ? "heading-text font-extrabold"
                            : "heading-text-two font-extrabold"
                        }
                        group-hover:text-black group-hover:translate-x-1
                        text-[18px] md:text-[27px]`}
                    >
                      {f}
                    </motion.div>

                    {/* Underline for highlighted item */}
                    {isHighlight && (
                      <div className="w-full max-w-[220px] `h-0.5 bg-gray-300 mt-3 mb-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Image centered & resized to match left column height */}
          <div className="order-1 md:order-2 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[380px] md:max-w-[410px] h-auto bg-black overflow-hidden rounded-sm"
              style={{
                boxShadow: "0 18px 50px rgba(2,6,23,0.25)",
              }}
            >
              <img
                src={ShopWithUsImg[0]}
                alt="Why choose CRUSE"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

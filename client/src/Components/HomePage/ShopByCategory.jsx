import React from "react";
import { motion } from "framer-motion";
import { ShopByCategoryImg } from "../../index";
import { href, Link } from "react-router-dom";
// Map your 3 images to layout positions (same as reference)
const categories = [
  {
title:"EXPLORE WINTER OUTFITS",
    image: ShopByCategoryImg[2], 
    size: "large",
  link:"/dress"
  },
  {
    title: "SHOES",
    image: ShopByCategoryImg[1],
    size: "small",
    link:"/shoes"
  },
  {
    title: "BAGS",
    image: ShopByCategoryImg[0],
    size: "small",
    link:"/bags"
  },
];

export default function ShopByCategory() {
  return (
    <section className="max-w-7xl mx-auto px-6  py-15 md:py-20 ">
      {/* Top Heading Row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase heading-text">
          Shop by Category
        </h2>

        <a href="/products" className="button-bg text-white px-5 py-2 text-sm rounded-full hover:bg-gray-800 transition font-medium">
          View All Products
        </a>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1">
        {/* Large top image */}
        <Link to={categories[0].link}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-[260px] sm:h-[350px] md:h-[430px] overflow-hidden rounded-lg"
        >
          <img
            src={categories[0].image}
            alt="category-1"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute bottom-4 left-4 text-white font-bold text-xl sm:text-2xl tracking-wide">
            {categories[0].title}
          </div>
        </motion.div>
</Link>
        {/* Bottom 2 small cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {categories.slice(1).map((cat, index) => (
          <Link to={cat.link}>
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-[250px] sm:h-80 overflow-hidden rounded-lg"
              >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

              <div className="absolute top-4 left-4 text-white text-xl font-extrabold tracking-wide">
                {cat.title}
              </div>
            </motion.div>
                </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

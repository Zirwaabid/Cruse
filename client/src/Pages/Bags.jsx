import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import { Banners } from "../index.js";
import { Link } from "react-router-dom";
export default function Bags() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [maxPrice, setMaxPrice] = useState(30000);

  const [availableColors, setAvailableColors] = useState([]);
  const [availableStyles, setAvailableStyles] = useState([]);

  // Load bags from backend
  useEffect(() => {
    const loadBags = async () => {
      try {
        const res = await api.get("/products?category=bag");
        let data = res.data;

        // Extract available colors & styles dynamically
        const colors = new Set();
        const styles = new Set();

        data.forEach((item) => {
          item.color?.forEach((c) => colors.add(c));
          item.styleTags?.forEach((s) => styles.add(s));
        });

        setAvailableColors([...colors]);
        setAvailableStyles([...styles]);

        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBags();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter((p) => {
    const matchColor = selectedColor ? p.color.includes(selectedColor) : true;
    const matchStyle = selectedStyle ? p.styleTags.includes(selectedStyle) : true;
    const matchPrice = p.price <= maxPrice;

    return matchColor && matchStyle && matchPrice;
  });

  return (
    <section className="min-h-screen w-full">

      {/* ---- HERO BANNER SECTION (BANNER 2) ---- */}
      <div
        className="w-full h-[60vh] md:h-screen bg-cover bg-center relative flex items-center"
        style={{
          backgroundImage: `url(${Banners[1]})`, // <-- Banner2
        }}
      >
        <div className="relative max-w-6xl mx-auto w-full px-6 md:px-10 flex items-center justify-end h-full">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-right max-w-md md:max-w-lg"
          >
            <h1 className="font-extrabold uppercase text-white text-3xl sm:text-4xl md:text-5xl drop-shadow-lg">
              Bags
            </h1>
            <p className="mt-4 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md">
              Explore premium handbags, clutches, totes, and more — elegant,
              stylish, and crafted for every occasion.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ---- FILTERS BAR ---- */}
      <div className="max-w-6xl mx-auto mt-14 mb-12 p-4 flex flex-wrap justify-center gap-4">

        {/* Color Filter */}
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="bg-white/10 px-4 py-3 rounded-lg border border-white/10 backdrop-blur-sm heading-text font-medium"
        >
          <option value="">Filter by Color</option>
          {availableColors.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Style Filter */}
        <select
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          className="bg-white/10 px-4 py-3 rounded-lg border border-white/10 backdrop-blur-sm heading-text font-medium"
        >
          <option value="">Filter by Style</option>
          {availableStyles.map((s) => (
            <option key={s} value={s}>
              {s.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <div className="flex flex-col items-center heading-text font-medium">
          <span className="text-sm mb-1">Max Price: Rs {maxPrice}</span>
          <input
            type="range"
            min="1000"
            max="30000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-44 accent-white cursor-pointer"
          />
        </div>
      </div>

      {/* ---- PRODUCT GRID ---- */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {/* Loading Skeleton */}
        {loading &&
          Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-full h-[280px] bg-white/5 animate-pulse rounded-2xl"
              />
            ))}

        {/* No Products Message */}
        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-gray-300 w-full text-lg col-span-full">
            Sorry, no bags match your filters.
          </p>
        )}

        {/* Products */}
        {!loading &&
          filteredProducts.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group cursor-pointer"
            >
                <Link to={`/product/${product._id}`}>
                
              <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[250px] md:h-[330px] object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-3 font-semibold text-gray-200 group-hover:text-white uppercase tracking-wide text-[14px] heading-text-two">
                {product.title}
              </h3>

              <p className="heading-text font-bold text-sm mt-1">
                Rs. {product.price}
              </p>
              </Link>
            </motion.div>
          ))}
      </div>
    </section>
  );
}

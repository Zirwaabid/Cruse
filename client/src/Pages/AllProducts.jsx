import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import { Banners } from "../index.js";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        let endpoint = "/products";

        if (filterCategory) {
          endpoint += `?category=${filterCategory}`;
        }

        const res = await api.get(endpoint);
        let data = res.data;

        // Sorting
        if (sort === "low-high") data = data.sort((a, b) => a.price - b.price);
        if (sort === "high-low") data = data.sort((a, b) => b.price - a.price);

        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [sort, filterCategory]);

  return (
    <section className="min-h-screen w-full ">

     {/* ---- HERO BANNER SECTION ---- */}
<div
  className="w-full h-[60vh] md:h-screen bg-cover bg-center relative flex items-center"
  style={{
    backgroundImage: `url(${Banners[3]})`, // Banner4
  }}
>


  {/* CONTENT (Right Side) */}
  <div className="relative max-w-6xl mx-auto w-full px-6 md:px-10 flex items-center justify-end h-full">
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="text-right max-w-md md:max-w-lg"
    >
      <h1 className="font-extrabold uppercase  text-white text-3xl sm:text-4xl md:text-5xl drop-shadow-lg">
        All Products
      </h1>

      <p className="mt-4 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md">
        Explore every piece in our collection — premium quality, modern styles,
        and timeless elegance.
      </p>
    </motion.div>
  </div>
</div>

      {/* ---- FILTERS BAR ---- */}
      <div className="max-w-5xl mx-auto mb-14 flex flex-wrap justify-center gap-4 mt-14">

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-white/10 headind-text px-4 py-3 rounded-lg border border-white/10 backdrop-blur-sm"
        >
          <option value="">All Categories</option>
          <option value="shoe">Shoes</option>
          <option value="bag">Bags</option>
          <option value="dress">Dresses</option>
        </select>

        {/* Sort Filter */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white/10 headind-text px-4 py-3 rounded-lg border border-white/10 backdrop-blur-sm"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* ---- PRODUCT GRID ---- */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {/* Loading Skeletons */}
        {loading &&
          Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-full h-[280px] bg-white/5 animate-pulse rounded-2xl"
              />
            ))}

        {/* Products */}
        {!loading &&
          products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group cursor-pointer"
            >
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

              <p className="heading-text font-bold text-sm mt-1">Rs. {product.price}</p>
            </motion.div>
          ))}
      </div>

    </section>
  );
}

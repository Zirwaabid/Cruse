import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function FamousProducts() {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/products/famous");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching famous products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <section className="w-full  py-15 md:py-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-5 text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-extrabold uppercase tracking-tight heading-text text-4xl md:text-5xl"

        >
          Cruse Famous Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="para-text max-w-2xl mx-auto mt-4 leading-relaxed"
        >
          Explore top-selling fashion pieces picked by thousands of happy shoppers.
        </motion.p>

        {/* Grid — EXACTLY 8 ITEMS — CENTERED */}
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">

            {/* Skeleton Loading */}
            {loading &&
              Array(8)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-[260px] h-[330px] bg-white/5 animate-pulse rounded-2xl"
                  />
                ))}

            {/* Product Cards */}
            {!loading &&
              products.slice(0, 8).map((product, i) => (
                <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer w-[260px]"
                  >
                <Link to={`/product/${product._id}`}>
                  <div className="overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[330px] object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                  </div>

        </Link>
                  <h3 className="mt-4 font-semibold text-[14px] uppercase tracking-wide heading-text-two group-hover:text-white transition">
                    {product.title}
                  </h3>

                  <p className="heading-text text-sm mt-1 font-bold">
                    Rs. {product.price}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.button
         onClick={() => navigate("/products")}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="
                     text-center mt-14
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
                      cursor-pointer
                    "
        >
          View All
        </motion.button>
      </div>
    </section>
  );
}

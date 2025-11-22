import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product)
    return <p className="text-center py-10 text-xl font-semibold">Loading...</p>;

  return (
    <div className="w-full min-h-screen pb-20 px-4 md:px-10">

      {/* TOP SECTION → Image Left + Text Right */}
      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Rounded Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-amber-950 p-1 rounded-full shadow-sm">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Right Content (Text) */}
        <div className="space-y-4 pr-2">
          <p className="uppercase tracking-widest text-gray-600 text-sm">
            Explore the Art of
          </p>

          <h1 className="text-4xl md:text-5xl font-bold heading-text leading-tight">
            {product.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-md">
            {product.description}
          </p>

          <h3 className="text-lg font-semibold mb-3">Style Tags</h3>

          <div className="flex flex-wrap gap-3">
            {product.styleTags?.map((tag, index) => (
              <span
                key={index}
                className="bg-black text-white px-3 py-1 rounded-full text-sm tracking-wide"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

      </div>

      {/* BOTTOM SECTION → Horizontal Details */}
      <div className="max-w-4xl mx-auto mt-20 px-2">

        {/* 4 Columns ONLY on Large Screens */}
        <div className="border-t border-gray-200 pt-12 grid 
      grid-cols-1 
      md:grid-cols-3 
      lg:grid-cols-3 
      gap-10">

          {/* COLUMN 1: Price + Stock */}
          <div className="space-y-4">
            <p className="text-3xl font-bold heading-text">Rs. {product.price}</p>

            <p
              className={`text-lg font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </p>
          </div>

          {/* COLUMN 2: Colors */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Available Colors</h3>

            <div className="flex flex-wrap gap-4">
              {product.color?.map((clr, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full border shadow-sm"
                    style={{ backgroundColor: clr.toLowerCase() }}
                  ></div>
                  <span className="capitalize text-gray-700">{clr}</span>
                </div>
              ))}
            </div>
          </div>



          {/* COLUMN 4: Add to Cart Button (only moves here on large screens) */}
          <div className="lg:flex lg:items-start">
            <button
              onClick={() => addToCart(product)}
              className="group button-bg text-white py-3 text-lg font-semibold 
          rounded-full flex items-center justify-center gap-3 
          hover:bg-gray-800 transition-all w-full cursor-pointer"
            >
              <ShoppingBag className="group-hover:scale-110 transition " />
              Add to Cart
            </button>
          </div>

        </div>

      </div>
      {/* AI Stylist Recommendation Section */}
      <div className="max-w-5xl mx-auto mt-24 px-4">

        <div className="relative Ai-stylist-card text-white rounded-3xl p-10 overflow-hidden shadow-xl">

          {/* Soft gradient glow */}
          <div className="absolute inset-0 bg-linear-to-r from-rose-500/20 via-purple-500/20 to-blue-500/20 blur-3xl opacity-40"></div>

          {/* Floating sparkles */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-10 left-20 w-2 h-2 bg-white/50 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute bottom-14 right-24 w-3 h-3 bg-white/40 rounded-full blur-sm animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/40 rounded-full blur-sm animate-ping"></div>
          </div>

          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Still Confused What to Wear?
            </h2>

            <p className="text-gray-200 text-lg leading-relaxed max-w-2xl">
              Let our <span className="font-semibold">AI Fashion Stylist</span> guide you!
              Get personalized outfit recommendations, perfect color combinations,
              accessory suggestions, and complete look ideas — all tailored to your unique style.
            </p>

            {/* Button */}
            <a
              href="/stylist"
              className="inline-block mt-4 bg-white text-black px-8 py-3 rounded-full 
          font-semibold text-lg shadow-xl hover:scale-105 transform transition-all
          hover:shadow-2xl tracking-wide"
            >
              Meet Your AI Stylist
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

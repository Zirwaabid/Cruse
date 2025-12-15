import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Menu, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import MobileSidebar from "./MobileSidebar";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CruseNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setIsCartOpen } = useCart();
  const { user, logout } = useAuth(); // 🔥 REAL AUTH STATE

  return (
    <>
      {/* SIDEBAR */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isLoggedIn={!!user}
        username={user?.displayName || "Profile"}
      />

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          fixed top-0 left-0 w-full z-50 
          backdrop-blur-lg bg-white/70 border-b border-white/40
          shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-white/80 shadow-sm"
            >
              <Menu className="w-5 h-5 text-gray-800" />
            </button>

            <Link
              to="/"
              className="text-2xl font-extrabold tracking-wider text-gray-900"
            >
              CRUSE
            </Link>
          </div>

          {/* MIDDLE */}
          <div className="hidden md:flex gap-10 items-center">
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/">Home</Link>
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/ai-stylist">AI Stylist</Link>
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/dress">Women</Link>
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/bags">Bags</Link>
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/shoes">Shoes</Link>
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/about">About</Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">

            {/* MOBILE ICONS */}
            <div className="flex md:hidden items-center gap-4">
              <Link to="/search">
                <Search className="w-5 h-5 text-gray-900 hover:scale-110 transition" />
              </Link>

              <button onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="w-5 h-5 text-gray-900 hover:scale-110 transition" />
              </button>
            </div>

            {/* DESKTOP ICONS */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/search">
                <Search className="w-5 h-5 text-gray-900 hover:scale-110 transition" />
              </Link>

              <Link to="/contact-us">
                <PhoneCall className="w-5 h-5 text-gray-900 hover:scale-110 transition" />
              </Link>

              <button onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="w-5 h-5 text-gray-900 hover:scale-110 transition" />
              </button>

              {/* 🔐 AUTH BUTTON */}
              {!user ? (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition"
                >
                  Login
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition"
                  >
                    {user.displayName || "Profile"}
                  </Link>

                  <button
                    onClick={logout}
                    className="text-sm text-gray-700 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </motion.nav>
    </>
  );
}

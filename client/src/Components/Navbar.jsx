
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Menu, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import MobileSidebar from "./MobileSidebar"; // <-- ADD THIS
import { useCart } from "../context/CartContext";

export default function CruseNavbar({ isLoggedIn = false, username = "User" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setIsCartOpen } = useCart();


  return (
    <>
      {/* SIDEBAR */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isLoggedIn={isLoggedIn}
        username={username}
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

          {/* LEFT — LOGO + MOBILE MENU */}
          <div className="flex items-center gap-4">
            {/* Hamburger (hidden on desktop) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-white/80 shadow-sm"
            >
              <Menu className="w-5 h-5 text-gray-800" />
            </button>


            {/* Brand Name */}
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-wider text-gray-900"
            >
              CRUSE
            </Link>
          </div>

          {/* MIDDLE — NAV LINKS (Desktop Only) */}
          <div className="hidden md:flex gap-10 items-center">
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/">
              Home
            </Link>
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/ai-stylist">
              AI Stylist
            </Link>
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/dress">
              Women
            </Link>
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/bags">
              Bags
            </Link>
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/shoes">
              Shoes
            </Link>
            <Link className="text-gray-800 text-sm hover:opacity-70 transition" to="/about">
              About
            </Link>
          </div>

          {/* RIGHT — ICONS */}
          <div className="flex items-center gap-6">

            {/* MOBILE: Search + Cart ONLY */}
            <div className="flex md:hidden items-center gap-4">
              <Link to="/search">
                <Search className="w-5 h-5 text-gray-900 hover:scale-110 transition" />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-gray-900 hover:scale-110 transition" />
              </button>
            </div>

            {/* DESKTOP: All Icons */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/search">
                <Search className="w-5 h-5 text-gray-900 hover:scale-110 transition" />
              </Link>

              <Link to="/contact-us">
                <PhoneCall className="w-5 h-5 text-gray-900 hover:scale-110 transition" />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-gray-900 hover:scale-110 transition" />
              </button>


              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition"
                >
                  {username}
                </Link>
              ) : (
                <Link
                  to="/sign-up"
                  className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition"
                >
                  Login
                </Link>
              )}
            </div>

          </div>
        </div>
      </motion.nav>
    </>
  );
}

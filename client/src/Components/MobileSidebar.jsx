import React, { useEffect } from "react";
import { X, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileSidebar({ open, onClose, isLoggedIn, username }) {

    useEffect(() => {
        function handleOutside(e) {
            if (e.target.classList.contains("sidebar-overlay")) {
                onClose();
            }
        }

        document.addEventListener("click", handleOutside);
        return () => document.removeEventListener("click", handleOutside);
    }, [onClose]);

    return (
        <>

            {/* SIDEBAR PANEL */}
            <div
                className={`
          fixed top-0 left-0 h-full w-[78%] sm:w-72 z-50 
          bg-white backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.15)]
          border-r border-white/50
          transform transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]
          ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        `}
            >

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/60">
                    <h2 className="text-2xl font-bold tracking-wider text-gray-900">
                        CRUSE
                    </h2>

                    <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform">
                        <X className="w-6 h-6 text-gray-800" />
                    </button>
                </div>

                {/* CONTENT SECTION */}
                <div className="relative">

                    {/* Elegant left accent bar */}
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-black/70 rounded-r-full" />

                    <div className="flex flex-col gap-7 px-8 py-8 text-gray-900">

                        <Link className="group text-lg font-medium tracking-wide" to="/ai-stylist" onClick={onClose}>
                            <span className="group-hover:tracking-widest transition-all duration-300">AI Stylist</span>
                        </Link>

                        <Link className="group text-lg font-medium tracking-wide" to="/dress" onClick={onClose}>
                            <span className="group-hover:tracking-widest transition-all duration-300">Women</span>
                        </Link>

                        <Link className="group text-lg font-medium tracking-wide" to="/shoes" onClick={onClose}>
                            <span className="group-hover:tracking-widest transition-all duration-300">Shoes</span>
                        </Link>

                        <Link className="group text-lg font-medium tracking-wide" to="/bags" onClick={onClose}>
                            <span className="group-hover:tracking-widest transition-all duration-300">Bags</span>
                        </Link>

                        <Link className="group text-lg font-medium tracking-wide" to="/about" onClick={onClose}>
                            <span className="group-hover:tracking-widest transition-all duration-300">About</span>
                        </Link>

                        <Link className="group text-lg font-medium tracking-wide" to="/contact-us" onClick={onClose}>
                            <span className="group-hover:tracking-widest transition-all duration-300">Contact Us</span>
                        </Link>

                        {/* BOTTOM ACCOUNT SECTION */}
                        <div className="mt-auto px-1 pb-2">

                            <div className="bg-black/80 text-white rounded-2xl px-2 py-0 shadow-lg flex items-center justify-between  hover:bg-black transition-all duration-300
  ">

                                {/* LEFT SIDE — ICON + TEXT */}
                                <div className="flex items-center gap-2">

                                    {/* Circle Icon */}
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center ">
                                        {isLoggedIn ? (
                                            <User className="w-5 h-5 text-white" />
                                        ) : (
                                            <LogIn className="w-5 h-5 text-white" />
                                        )}
                                    </div>

                                    {/* Username or Login */}
                                    <Link
                                        to={isLoggedIn ? "/profile" : "/login"}
                                        onClick={onClose}
                                        className="text-sm font-semibold tracking-wide"
                                    >
                                        {isLoggedIn ? ` ${username}` : "Login"}
                                    </Link>
                                </div>

                                {/* Arrow Icon */}
                                <Link
                                    to={isLoggedIn ? "/profile" : "/login"}
                                    onClick={onClose}
                                >
                                    <ChevronRight className="w-5 h-5 text-white" />
                                </Link>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

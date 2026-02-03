import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast"; // ✅ ADD THIS

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, role } = useAuth();
  console.log(role)

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!"); // ✅ SUCCESS TOAST
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("No account found. Please sign up.");
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Google login failed. Try again.");
    }
  };
  useEffect(() => {
  if (!user || !role) return;

  if (role === "admin") {
    navigate("/admin", { replace: true });
  } else {
    navigate("/", { replace: true });
  }
}, [user, role]);


  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl p-8">

        {/* BRAND */}
        <h1 className="text-3xl font-extrabold tracking-widest text-center mb-2">
          CRUSE
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Welcome back. Please login to continue.
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full rounded-lg bg-black py-3 text-white font-medium hover:bg-gray-900 transition">
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 hover:bg-gray-50 transition"
        >
          <FcGoogle size={20} />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        {/* SIGNUP LINK */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-black hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

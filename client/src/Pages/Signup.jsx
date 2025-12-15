import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ✅ Save full name in Firebase profile
      await updateProfile(res.user, {
        displayName: `${firstName} ${lastName}`,
      });

      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Account already exists. Please login.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message);
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl p-8">

        <h1 className="text-3xl font-extrabold tracking-widest text-center mb-2">
          CRUSE
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Create your account to begin your journey.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-600 text-sm px-4 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              className="rounded-lg border px-4 py-3 focus:ring-2 focus:ring-black"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              className="rounded-lg border px-4 py-3 focus:ring-2 focus:ring-black"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-black"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-black"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full rounded-lg bg-black py-3 text-white font-medium hover:bg-gray-900 transition">
            Create Account
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 rounded-lg border py-3 hover:bg-gray-50 transition"
        >
          <FcGoogle size={20} />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-black hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

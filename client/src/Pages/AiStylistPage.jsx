import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Zap, ShoppingCart, ArrowRight } from "lucide-react";
// optional: use your cart context if available
import { useCart } from "../context/CartContext";

function StepChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition
        ${active ? "bg-white text-black shadow-md" : "bg-white/10 text-white/90"}
      `}
    >
      {label}
    </button>
  );
}

function ProductCard({ product, onAdd }) {
  if (!product) return null;
  const title = product.title || product.name || product.title || "Product";
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-white/10">
      <div className="w-full h-56 md:h-48 overflow-hidden bg-gray-100">
        <img src={product.image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description || product.desc || ""}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-sm text-gray-500">Price</div>
            <div className="font-bold">Rs. {product.price}</div>
          </div>
          <div className="flex gap-2">
            <a
              href={`/product/${product._id}`}
              className="px-3 py-2 rounded-full border border-black/10 text-sm hover:bg-black hover:text-white transition"
            >
              View
            </a>
            <button
              onClick={() => onAdd && onAdd(product)}
              className="px-3 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AiStylistPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [prefs, setPrefs] = useState(null);
  const [combo, setCombo] = useState(null);
  const [error, setError] = useState(null);

  // const { addToCart } = useCart?.() || {};
  // If you have a cart context, uncomment above and use addToCart

  const steps = [
    "Category (dress/shoe/bag)",
    "Occasion (wedding/party/casual/formal)",
    "Color",
    "Budget",
    "Style (modern/trendy/minimal)",
  ];

  const quickPrompts = [
    "Wedding outfit: cream dress, budget 15000",
    "Party look: red dress + heels",
    "Casual day out: comfy and minimal",
    "Show me trendy neutrals under 8000",
  ];

  async function handleSend(text) {
    if (!text) return;
    setLoading(true);
    setError(null);
    setReply("");
    setPrefs(null);
    setCombo(null);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `Server returned ${res.status}`);
      }

      const data = await res.json();
      // response shape based on your controller: { message, preferences, recommendations }
      setReply(data.message || "Here are some suggestions");
      setPrefs(data.preferences || null);
      setCombo(data.recommendations || null);
    } catch (err) {
      console.error("AI stylist error", err);
      setError("Could not reach stylist. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    handleSend(text);
    setInput("");
  };

  const onAddToCart = (product) => {
    // if you have addToCart context, use it; otherwise fallback to open product page
    try {
      // addToCart && addToCart(product);
      // temporarily open product page:
      window.location.href = `/product/${product._id}`;
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <section className="w-full min-h-screen py-12 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Your Personal AI Stylist</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Tell the stylist what you want — an outfit for a wedding, party, or a daily look.
            The stylist will pick a dress, shoes and a bag that match your taste.
          </p>
        </div>

        {/* Layout: left chat / right recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Chat + steps + input */}
          <div className="lg:col-span-2 space-y-6">

            {/* Steps chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 flex-wrap"
            >
              {steps.map((s, idx) => (
                <StepChip key={s} label={s} active={idx === 0} onClick={() => setInput((p) => `${p} ${s.split(" ")[0].toLowerCase()}`)} />
              ))}
            </motion.div>

            {/* Quick prompts */}
            <div className="flex gap-3 flex-wrap">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    handleSend(q);
                  }}
                  className="text-sm px-3 py-1 rounded-full bg-white/10 text-white/90"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat / response card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-white/20">
              <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe the outfit: e.g. 'Red wedding dress with gold accents under 15000' "
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-2 bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  {loading ? "Thinking..." : <><Zap className="w-4 h-4" /> Ask</>}
                </button>
              </form>

              {/* AI Reply */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0b1220] text-white shadow-inner min-h-[120px]">
                  <h3 className="font-semibold mb-2">Stylist Says</h3>
                  {loading && <p className="text-sm opacity-80">Finding the perfect looks…</p>}
                  {!loading && reply && <p className="text-sm leading-relaxed">{reply}</p>}
                  {!loading && !reply && <p className="text-sm text-gray-300">Start by telling the stylist what you need — occasion, colors, budget.</p>}
                </div>

                <div className="p-4 rounded-xl bg-white/10 text-white">
                  <h3 className="font-semibold mb-2">Preferences</h3>
                  {prefs ? (
                    <div className="text-sm space-y-1">
                      <div><strong>Category:</strong> {prefs.category || "any"}</div>
                      <div><strong>Color:</strong> {prefs.color || "any"}</div>
                      <div><strong>Occasion:</strong> {prefs.occasion || "general"}</div>
                      <div><strong>Budget:</strong> {prefs.budget ?? "not specified"}</div>
                      <div><strong>Style:</strong> {prefs.style || "any"}</div>
                    </div>
                  ) : (
                    <p className="text-sm opacity-80">No preferences detected yet.</p>
                  )}
                </div>
              </div>

              {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>

            {/* Recommendations (mobile view: show below chat) */}
            {combo && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Recommended Look</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ProductCard product={Array.isArray(combo.dress) ? combo.dress[0] : combo.dress?.[0] || combo.dress} onAdd={onAddToCart} />
                  <ProductCard product={Array.isArray(combo.shoes) ? combo.shoes[0] : combo.shoes?.[0] || combo.shoes} onAdd={onAddToCart} />
                  <ProductCard product={Array.isArray(combo.bags) ? combo.bags[0] : combo.bags?.[0] || combo.bags} onAdd={onAddToCart} />
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: Big Showcase / Steps & CTA */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="bg-black/90 text-white rounded-2xl p-6 shadow-md">
                <h4 className="text-lg font-semibold mb-2">How it works</h4>
                <ol className="text-sm list-decimal list-inside space-y-2 text-gray-200">
                  <li>Tell the stylist what you need.</li>
                  <li>The AI extracts preferences & searches our catalog.</li>
                  <li>Get a matched outfit (dress + shoes + bag).</li>
                </ol>
                <div className="mt-4">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // sample: prefill a message
                      const sample = "Wedding outfit: ivory dress, budget 20000, classic style";
                      setInput(sample);
                      handleSend(sample);
                    }}
                    className="inline-flex items-center gap-2 bg-white text-black px-3 py-2 rounded-full mt-3"
                  >
                    Try sample → <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md">
                <h5 className="font-semibold mb-2">Tips</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Specify occasion and budget for sharper results.</li>
                  <li>Mention colors or style words (minimal/trendy/classic).</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

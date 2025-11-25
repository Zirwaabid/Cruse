// src/components/AIStylistChat.jsx
import React, { useState, useEffect, useRef } from "react";
import api from "../api/api"; // your axios instance (baseURL -> /api)

export default function AIStylistChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your AI Fashion Stylist. What would you like me to help you find today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendUserMessage = async (text) => {
    if (!text) return;
    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    await callServer(newMessages);
  };

  const callServer = async (msgs) => {
    try {
      setLoading(true);
      const res = await api.post("/ai/chat", { messages: msgs });
      const data = res.data;

      if (!data) return;

      if (data.ready === false) {
        // server asks a question
        const askText = data.ask || data.message || "Can you clarify?";
        setMessages((m) => [...m, { role: "assistant", text: askText }]);
      } else if (data.ready === true) {
        // final recommendations
        setMessages((m) => [...m, { role: "assistant", text: data.message || "Here are recommendations." }]);

        // append short list of recommended items (titles) for quick view
        const rec = data.recommendations || {};
        const lines = [];

        if (rec.dress && rec.dress.length) {
          lines.push("Dresses:");
          rec.dress.forEach((p) => lines.push(`• ${p.title} — Rs. ${p.price}`));
        }
        if (rec.shoes && rec.shoes.length) {
          lines.push("Shoes:");
          rec.shoes.forEach((p) => lines.push(`• ${p.title} — Rs. ${p.price}`));
        }
        if (rec.bags && rec.bags.length) {
          lines.push("Bags:");
          rec.bags.forEach((p) => lines.push(`• ${p.title} — Rs. ${p.price}`));
        }

        if (lines.length) {
          setMessages((m) => [...m, { role: "assistant", text: lines.join("\n") }]);
        } else {
          setMessages((m) => [...m, { role: "assistant", text: "No matches found — try relaxing color or increasing budget." }]);
        }
      } else {
        setMessages((m) => [...m, { role: "assistant", text: data.message || "Sorry, I couldn't process that." }]);
      }
    } catch (err) {
      console.error("AI call error", err);
      setMessages((m) => [...m, { role: "assistant", text: "Sorry — server error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendUserMessage(input.trim());
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow p-4 h-[70vh] overflow-auto flex flex-col">
        <div className="flex-1 space-y-3">
          {messages.map((m, idx) => (
            <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
              <div className={`inline-block p-3 rounded-lg ${m.role === "user" ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}>
                {m.text.split("\n").map((line, i) => <div key={i}>{line}</div>)}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={onSubmit} className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2"
            disabled={loading}
          />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg" disabled={loading || input.trim() === ""}>
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

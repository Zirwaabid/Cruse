// src/pages/AiStylistChat.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AiStylistTest() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your AI Fashion Stylist. What would you like me to help you find today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessageToServer = async (message, userId) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/ai/chat", { userId, message });
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      console.error(err);
      return { error: "Server error" };
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input.trim() }];
    setMessages(newMessages);
    setInput("");

    const data = await sendMessageToServer(input.trim(), "ayesha-ai-user");

    if (data.error) {
      setMessages(prev => [...prev, { role: "assistant", text: "Sorry, something went wrong. Try again later." }]);
      return;
    }

    if (!data.ready) {
      setMessages(prev => [...prev, { role: "assistant", text: data.ask }]);
    } else {
      setMessages(prev => [...prev, { role: "assistant", text: data.message }]);
      const recText = JSON.stringify(data.recommendations, null, 2);
      setMessages(prev => [...prev, { role: "assistant", text: `Recommendations:\n${recText}` }]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">CRUSE — AI Stylist</h2>
        <p className="text-sm text-gray-600">Chat with the stylist. It will ask questions step-by-step.</p>
      </div>

      <div className="bg-white border rounded-lg p-4 mb-4 h-[60vh] overflow-auto">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role === "assistant" ? "text-left" : "text-right"}`}>
            <div className={`inline-block p-3 rounded-lg ${m.role === "assistant" ? "bg-gray-100" : "bg-black text-white"}`}>
              <pre className="whitespace-pre-wrap text-sm">{m.text}</pre>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          className="flex-1 border rounded-lg p-3"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-black text-white px-4 rounded-lg" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </form>

      {/* <div className="mt-4 flex gap-2">
        <button onClick={() => quickReply("I want a dress")} className="px-3 py-1 border rounded">I want a dress</button>
        <button onClick={() => quickReply("I want shoes along with it")} className="px-3 py-1 border rounded">I want shoes</button>
        <button onClick={() => quickReply("Casual, budget 5000, color black, modern")} className="px-3 py-1 border rounded">Quick sample</button>
      </div> */}
    </div>
  );
}

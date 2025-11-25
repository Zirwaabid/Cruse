// utils/groqService.js
// Small wrapper around optional Groq rephrase API. If GROQ_API_KEY isn't set
// the functions will simply return the original prompt/text.

import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3";
const GROQ_URL = process.env.GROQ_API_URL || "https://api.groq.dev/v1/models";

export async function groqRephrase(prompt) {
  if (!GROQ_API_KEY) return prompt;
  try {
    const res = await fetch(`${GROQ_URL}/${GROQ_MODEL}/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: `Rephrase kindly: "${prompt}"`, max_output_tokens: 120 })
    });
    if (!res.ok) return prompt;
    const data = await res.json();
    const text = data?.output?.[0]?.content?.[0]?.text || data?.choices?.[0]?.text || null;
    return (text || prompt).trim();
  } catch (e) {
    return prompt;
  }
}

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getFashionAdvice = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // 🎯 STEP 1: Extract preferences
    const prompt = `
You are a professional AI fashion stylist.
Extract user's preferences in this JSON:
{
  "category": "dress" | "shoe" | "bag" | null,
  "color": "string or null",
  "occasion": "wedding" | "party" | "casual" | "formal" | null,
  "budget": number or null,
  "style": "modern" | "classic" | "trendy" | "minimal" | null
}

User: "${message}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const rawText =
      response?.response?.text?.() ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No text found";

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    const preferences = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    console.log("🎯 Preferences:", preferences);

    // 🎯 STEP 2: Search in DB
    const query = {
      ...(preferences.category && { category: preferences.category }),
      ...(preferences.color && { color: { $in: [preferences.color.toLowerCase()] } }),
      ...(preferences.budget && { price: { $lte: preferences.budget } }),
    };

    let products = await Product.find(query);
    let combo = {};
    let apology = "";

    // 🧠 STEP 3: Handle all 3 main situations

    // CASE 1: If user asked for a dress
    if (preferences.category === "dress") {
      if (products.length === 0) {
        apology = `Sorry, I couldn’t find a ${preferences.color || ""} dress for your occasion.`;
        // Suggest alternative dress
        products = await Product.find({ category: "dress" }).limit(1);
      }

      const shoes = await Product.find({ category: "shoe" }).limit(1);
      const bags = await Product.find({ category: "bag" }).limit(1);
      combo = { dress: products, shoes, bags };
    }

    // CASE 2: If user asked for a bag
    else if (preferences.category === "bag") {
      let bags = products;
      if (bags.length === 0) {
        apology = `Sorry, that bag isn’t available right now.`;
        bags = await Product.find({ category: "bag" }).limit(1);
      }
      const dress = await Product.find({ category: "dress" }).limit(1);
      const shoes = await Product.find({ category: "shoe" }).limit(1);
      combo = { dress, shoes, bags };
    }

    // CASE 3: If user asked for a shoe
    else if (preferences.category === "shoe") {
      let shoes = products;
      if (shoes.length === 0) {
        apology = `Sorry, that shoe isn’t available right now.`;
        shoes = await Product.find({ category: "shoe" }).limit(1);
      }
      const dress = await Product.find({ category: "dress" }).limit(1);
      const bags = await Product.find({ category: "bag" }).limit(1);
      combo = { dress, shoes, bags };
    }

    // If no category recognized → general recommendation
    else {
      apology = "I'm not sure what you're looking for, but here are some great outfits.";
      const dress = await Product.find({ category: "dress" }).limit(1);
      const shoes = await Product.find({ category: "shoe" }).limit(1);
      const bags = await Product.find({ category: "bag" }).limit(1);
      combo = { dress, shoes, bags };
    }

    // 💬 STEP 4: Generate friendly message
    const replyPrompt = `
You are a helpful fashion stylist chatbot.
Create a short, warm, natural message for the user based on this data:
Apology: ${apology || "none"}
Category: ${preferences.category || "outfit"}
Color: ${preferences.color || "any"}
Occasion: ${preferences.occasion || "general"}
Budget: ${preferences.budget || "not specified"}

Example:
"${apology ? apology + ' ' : ''}Here’s a stylish look that fits your occasion — a ${preferences.color || 'beautiful'} ${preferences.category || 'outfit'} paired with matching shoes and a bag!"

Now generate your message.
`;

    const replyResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: replyPrompt }] }],
    });

    let replyMessage = "Hi there! I'm your fashion stylist.";
    try {
      replyMessage =
        replyResponse.response?.text?.() ||
        replyResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        replyResponse.candidates?.[0]?.content?.parts?.[0]?.text ||
        replyMessage;
    } catch (err) {
      console.warn("⚠️ Failed to extract reply message:", err.message);
    }

    // ✅ STEP 5: Return response
    res.status(200).json({
      message: replyMessage,
      preferences,
      recommendations: combo,
    });
  } catch (error) {
    console.error("AI Chatbot Error:", error);
    res.status(500).json({
      error: "AI chatbot failed to process your message",
      details: error.message,
    });
  }
};

// controllers/aiStylistController.js
import { groqRephrase } from "../utils/GroqService.js";
import { parseConversation } from "../utils/ParseConversation.js";
import { decideNextQuestion } from "../utils/NextQuestionEngine.js";
import { queryCategory } from "../utils/DbQueryHelper.js";

// MODELS
import UserConversation from "../models/UserConversation.js";

// MAIN CONTROLLER
export const getFashionAdvice = async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) return res.status(400).json({ message: "userId and message are required" });

    // fetch or create chat history
    let history = await UserConversation.findOne({ userId });
    if (!history) history = await UserConversation.create({ userId, messages: [] });

    history.messages.push({ role: "user", text: message });
    await history.save();

    // parse conversation & decide next question
    const parsed = parseConversation(history.messages);
    const nextQ = decideNextQuestion(parsed, history.messages);

    if (nextQ) {
      const rephrased = await groqRephrase(nextQ);
      history.messages.push({ role: "assistant", text: rephrased });
      await history.save();
      return res.json({ ready: false, ask: rephrased, preferences: parsed });
    }

    // ready → query products
    const { wants, sections } = parsed;
    const finalProducts = {};
    if (wants.dress) finalProducts.dress = await queryCategory("dress", sections.dress);
    if (wants.shoes) finalProducts.shoes = await queryCategory("shoes", sections.shoes);
    if (wants.bags) finalProducts.bags = await queryCategory("bags", sections.bags);

    const summaryText = "Here are your recommended items based on your preferences.";
    const rephrasedFinal = await groqRephrase(summaryText);

    history.messages.push({ role: "assistant", text: rephrasedFinal });
    await history.save();

    return res.json({
      ready: true,
      message: rephrasedFinal,
      preferences: parsed,
      recommendations: finalProducts
    });

  } catch (err) {
    console.error("AI Stylist Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

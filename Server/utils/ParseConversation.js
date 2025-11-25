// utils/parseConversation.js
// Conversation parsing moved out of the controller. Logic preserved exactly.

import {
  findCategory,
  findOccasion,
  findBudget,
  findColor,
  findStyle,
  isAffirmative,
  isNegative
} from "./AiParsingHelpers.js";

export function parseConversation(messages = []) {
  const sections = {
    dress: { occasion: null, budget: null, color: null, style: null, asked: {} },
    shoes: { occasion: null, budget: null, color: null, style: null, asked: {} },
    bags: { occasion: null, budget: null, color: null, style: null, asked: {} }
  };
  const wants = { dress: false, shoes: false, bags: false };

  const assign = (categoryKey, field, value) => {
    if (!categoryKey || !value) return;
    if (!sections[categoryKey][field]) sections[categoryKey][field] = value;
  };

  const catFromAssistantText = (text) => {
    if (!text) return null;
    const t = text.toLowerCase();
    if (t.includes("dress")) return "dress";
    if (t.includes("shoe")) return "shoes";
    if (t.includes("bag")) return "bags";
    return null;
  };

  let pending = null;

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (!m || !m.text) continue;

    if (m.role === "assistant") {
      const t = m.text.toLowerCase();

      if (t.includes("which item") || t.includes("which category")) {
        pending = { category: null, question: "category" };
        continue;
      }
      if (t.includes("occasion")) {
        const cat = catFromAssistantText(t) || "dress";
        pending = { category: cat, question: "occasion" };
        sections[cat].asked.occasion = true;
        continue;
      }
      if (t.includes("budget") || t.includes("maximum budget")) {
        const cat = catFromAssistantText(t) || "dress";
        pending = { category: cat, question: "budget" };
        sections[cat].asked.budget = true;
        continue;
      }
      if (t.includes("color preference") || t.includes("color?")) {
        const cat = catFromAssistantText(t) || "dress";
        pending = { category: cat, question: "color" };
        sections[cat].asked.color = true;
        continue;
      }
      if (t.includes("style") || t.includes("modern") || t.includes("classic") || t.includes("trendy") || t.includes("minimal")) {
        const cat = catFromAssistantText(t) || "dress";
        pending = { category: cat, question: "style" };
        sections[cat].asked.style = true;
        continue;
      }
      if (t.includes("would you like matching shoes") || t.includes("would you like matching shoes or a bag") || t.includes("would you like matching shoes with")) {
        pending = { category: "dress", question: "wantShoes" };
        continue;
      }
      if (t.includes("would you like a matching bag") || t.includes("would you like a matching bag with")) {
        pending = { category: "shoes", question: "wantBag" };
        continue;
      }

      pending = null;
    }

    if (m.role === "user") {
      const userText = m.text.trim();

      if (pending) {
        const q = pending.question;
        const cat = pending.category;
        if (q === "category") {
          const c = findCategory(userText) || findCategory((userText || "").toLowerCase());
          if (c) wants[c] = true;
          pending = null;
          continue;
        }
        if (q === "occasion" && cat) {
          const occ = findOccasion(userText) || findOccasion(userText);
          assign(cat, "occasion", occ || findOccasion(userText) || null);
          pending = null; wants[cat] = wants[cat] || true; continue;
        }
        if (q === "budget" && cat) {
          const b = findBudget(userText) || findBudget(userText);
          assign(cat, "budget", b || findBudget(userText) || null);
          pending = null; wants[cat] = wants[cat] || true; continue;
        }
        if (q === "color" && cat) {
          const c = findColor(userText) || findColor(userText);
          assign(cat, "color", c || findColor(userText) || null);
          pending = null; wants[cat] = wants[cat] || true; continue;
        }
        if (q === "style" && cat) {
          const s = findStyle(userText) || findStyle(userText);
          assign(cat, "style", s || findStyle(userText) || null);
          pending = null; wants[cat] = wants[cat] || true; continue;
        }
        if (q === "wantShoes") {
          if (isAffirmative(userText) || /shoe|shoes/i.test(userText)) wants.shoes = true;
          if (isNegative(userText) || /no shoe|no shoes/i.test(userText)) wants.shoes = false;
          pending = null; continue;
        }
        if (q === "wantBag") {
          if (isAffirmative(userText) || /bag|bags|clutch/i.test(userText)) wants.bags = true;
          if (isNegative(userText) || /no bag|no bags/i.test(userText)) wants.bags = false;
          pending = null; continue;
        }
      }

      const cat = findCategory(userText);
      if (cat) wants[cat] = true;

      for (const ck of ["dress","shoes","bags"]) {
        const lower = userText.toLowerCase();
        if (lower.includes(ck.replace("s","")) || lower.includes(ck)) {
          const occ = findOccasion(userText);
          const bud = findBudget(userText);
          const col = findColor(userText);
          const sty = findStyle(userText);
          if (occ) assign(ck, "occasion", occ);
          if (bud) assign(ck, "budget", bud);
          if (col) assign(ck, "color", col);
          if (sty) assign(ck, "style", sty);
          wants[ck] = wants[ck] || !!(occ || bud || col || sty);
        }
      }

      const occG = findOccasion(userText);
      const budG = findBudget(userText);
      const colG = findColor(userText);
      const styG = findStyle(userText);
      const wantCount = Object.values(wants).filter(Boolean).length;
      if (wantCount === 1) {
        const target = wants.dress ? "dress" : wants.shoes ? "shoes" : wants.bags ? "bags" : null;
        if (target) {
          if (occG) assign(target, "occasion", occG);
          if (budG) assign(target, "budget", budG);
          if (colG) assign(target, "color", colG);
          if (styG) assign(target, "style", styG);
        }
      } else {
        if (!wants.dress && !wants.shoes && !wants.bags && cat) {
          wants[cat] = true;
          if (occG) assign(cat, "occasion", occG);
          if (budG) assign(cat, "budget", budG);
          if (colG) assign(cat, "color", colG);
          if (styG) assign(cat, "style", styG);
        }
      }
    }
  }

  return { sections, wants };
}

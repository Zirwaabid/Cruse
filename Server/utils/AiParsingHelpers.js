// utils/aiParsingHelpers.js
// Helper constants and extraction utilities used by the AI stylist.

export const COLORS = ["black","white","red","green","blue","yellow","orange","pink","purple",
  "lavender","beige","brown","gray","grey","navy","maroon","olive","gold","silver","cream","peach"];
export const OCCASIONS = ["wedding","party","casual","formal","office","work","evening","festive"];
export const STYLES = ["modern","classic","trendy","minimal","boho","vintage","sporty","traditional"];

const normalize = (txt) => (txt || "").toLowerCase();

export function findColor(text) {
  if (!text) return null;
  const t = normalize(text);
  if (t.includes("violet")) return "purple";
  for (const c of COLORS) if (t.includes(c)) return c;
  return null;
}

export function findBudget(text) {
  if (!text) return null;
  const cleaned = (text || "").replace(/[,₹Rs\.]/gi, "");
  const num = cleaned.match(/(\d{2,7})/);
  return num ? Number(num[1]) : null;
}

export function findOccasion(text) {
  if (!text) return null;
  const t = normalize(text);
  return OCCASIONS.find(o => t.includes(o)) || null;
}

export function findStyle(text) {
  if (!text) return null;
  const t = normalize(text);
  return STYLES.find(s => t.includes(s)) || null;
}

export function findCategory(text) {
  if (!text) return null;
  const t = normalize(text);
  if (/\bdress(es)?\b/.test(t)) return "dress";
  if (/\bshoe(s)?\b|\bheel\b|\bsandal\b|\bkhussa\b/.test(t)) return "shoes";
  if (/\bbag(s)?\b|\bclutch\b|\btote\b|\bhandbag\b/.test(t)) return "bags";
  return null;
}

export function isAffirmative(text) {
  if (!text) return false;
  return /\b(yes|yep|yeah|ya|sure|of course|please|true)\b/i.test(text);
}

export function isNegative(text) {
  if (!text) return false;
  return /\b(no|nah|nope|not)\b/i.test(text);
}

// utils/nextQuestionEngine.js
// Encapsulates the decision logic for "what to ask next". Logic preserved.

export function decideNextQuestion(parsed, messages = []) {
  const { sections, wants } = parsed;

  const isComplete = (sec) => !!(sec.occasion && sec.budget && (sec.color || sec.style));

  if (!wants.dress && !wants.shoes && !wants.bags) {
    return "Which category would you like — dress, shoes, or bag?";
  }

  if (wants.dress) {
    const d = sections.dress;
    if (!d.occasion) return "What's the occasion for the dress? (wedding, party, casual, formal)";
    if (!d.budget) return "Do you have a maximum budget for the dress? (e.g., 5000)";
    if (!d.color) return "Any color preference for the dress? If not, I can pick a good match.";
    if (!d.style) return "Do you prefer a style for the dress? (modern, classic, trendy, minimal or 'no preference')";
    const assistantTexts = messages.filter(m => m.role === "assistant").map(m => (m.text || "").toLowerCase());
    const askedShoes = assistantTexts.some(t => t.includes("would you like matching shoes") || t.includes("would you like matching shoes or a bag"));
    if (!askedShoes && !wants.shoes && !wants.bags) return "Would you like matching shoes or a bag with the dress? (reply 'shoes', 'bag', 'both' or 'no')";
  }

  if (wants.shoes) {
    const s = sections.shoes;
    if (!s.occasion) return "Now for shoes — what's the occasion for the shoes? (wedding, party, casual, formal)";
    if (!s.budget) return "Maximum budget for the shoes? (e.g., 2000)";
    if (!s.color) return "Any color preference for the shoes? If not, I can pick a good match.";
    if (!s.style) return "Do you prefer a style for the shoes? (modern, classic, trendy, minimal or 'no preference')";
    const assistantTexts = messages.filter(m => m.role === "assistant").map(m => (m.text || "").toLowerCase());
    const askedBag = assistantTexts.some(t => t.includes("would you like a matching bag") || t.includes("would you like a matching bag as well"));
    if (!askedBag && !wants.bags) return "Would you like a matching bag as well? (yes/no)";
  }

  if (wants.bags) {
    const b = sections.bags;
    if (!b.occasion) return "For the bag — what's the occasion? (wedding, party, casual, formal)";
    if (!b.budget) return "Maximum budget for the bag? (e.g., 1500)";
    if (!b.color) return "Any color preference for the bag? If not, I can pick a good match.";
    if (!b.style) return "Do you prefer a style for the bag? (modern, classic, trendy, minimal or 'no preference')";
  }

  const dressOk = !wants.dress || isComplete(sections.dress);
  const shoeOk = !wants.shoes || isComplete(sections.shoes);
  const bagOk = !wants.bags || isComplete(sections.bags);
  if (dressOk && shoeOk && bagOk) return null;

  return "Can you please clarify a bit more about your preferences?";
}

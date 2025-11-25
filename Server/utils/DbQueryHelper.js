// utils/dbQueryHelpers.js
// Encapsulates the progressive / relaxed product query logic.

import Product from "../models/Product.js";

export async function queryCategory(category, prefs = {}, limit = 6) {
  const q = { category };
  if (prefs.color) q.color = { $in: [prefs.color.toLowerCase()] };
  if (prefs.budget) q.price = { $lte: prefs.budget };
  if (prefs.style) q.styleTags = { $in: [prefs.style.toLowerCase()] };

  async function tryFind(query) {
    return await Product.find(query).limit(limit).lean();
  }

  // strict
  let items = await tryFind(q);
  if (items.length) return items;

  // relax style
  if (q.styleTags) {
    const r = { ...q }; delete r.styleTags;
    items = await tryFind(r);
    if (items.length) return items;
  }

  // relax color
  if (q.color) {
    const r = { ...q }; delete r.color;
    items = await tryFind(r);
    if (items.length) return items;
  }

  // relax budget
  if (q.price) {
    const r = { ...q }; r.price = { $lte: (prefs.budget || 0) * 2 || 1000000 };
    items = await tryFind(r);
    if (items.length) return items;
  }

  return await tryFind({ category });
}

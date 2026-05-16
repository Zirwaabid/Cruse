// controllers/categoryController.js

import Category from "../../models/category.js";

//>>> create category
// helper to create slug
const generateSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-");

export const createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    let level = 0;

    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(400).json({ message: "Parent not found" });
      }
      level = parentCategory.level + 1;
    }

    const category = await Category.create({
      name,
      slug: generateSlug(name),
      parent: parent || null,
      level
    });

    res.status(201).json(category);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// >> get categories in the form of tree
export const getCategoryTree = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).lean();

    const map = {};
    const roots = [];

    // create map
    categories.forEach(cat => {
      map[cat._id] = { ...cat, children: [] };
    });

    // build tree
    categories.forEach(cat => {
      if (cat.parent) {
        map[cat.parent]?.children.push(map[cat._id]);
      } else {
        roots.push(map[cat._id]);
      }
    });

    res.json(roots);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
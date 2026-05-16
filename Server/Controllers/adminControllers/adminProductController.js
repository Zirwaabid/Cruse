import Product from "../../models/Product.js";

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      color,
      styleTags,
      stock,
      famous,
    } = req.body;

    const image = req.file?.path; // Cloudinary URL

    const product = await Product.create({
      title,
      description,
      category,
      price,
      image,
      color,
      styleTags,
      stock,
      famous,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Product creation failed" });
  }
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

import Product from "../models/Product.js";

// Get all products or by category
export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

// GET Famous Products
export const getFamousProducts = async (req, res) => {
  try {
    const products = await Product.find({ famous: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Add product (admin)
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
};


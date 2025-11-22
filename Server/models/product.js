import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ["dress", "shoe", "bag"], required: true },
  price: { type: Number, required: true },
  image: String,
  color: [String],
  styleTags: [String],
  stock: { type: Number, default: 1 },
  famous: { type: Boolean, default: false }

});

const Product = mongoose.model("Product", productSchema);
export default Product;

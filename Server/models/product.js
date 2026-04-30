// product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: String,

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  price: { type: Number, required: true },


  variants: [
    {
      color: { type: String, required: true },
      size: { type: String },
      stock: { type: Number, default: 0 }
    }
  ],
  images: { type: [String], default: [] },
  tags: { type: [String], default: [] },

  isFeatured: { type: Boolean, default: false },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
productSchema.index({ category: 1 });
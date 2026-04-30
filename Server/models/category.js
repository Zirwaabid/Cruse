// categorySchema.js 
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },   // "Bags", "Sneakers"
  
  slug: { type: String, required: true, unique: true }, // "bags", "sneakers"
  
  parent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category", 
    default: null 
  },

  level: { type: Number, default: 0 }, // 0 = main, 1 = sub, 2 = sub-sub

  isActive: { type: Boolean, default: true }

}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
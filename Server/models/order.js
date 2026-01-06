import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: Array,
  total: Number,
  paymentMethod: String,
  paymentStatus: { type: String, default: "pending" },
  address: Object,
  status: { type: String, default: "on the way" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);

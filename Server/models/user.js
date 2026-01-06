import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  paymentMethod: String, // "cod" or "online"
  paymentStatus: { type: String, default: "pending" }, // pending, completed
  address: Object,
  status: { type: String, default: "on the way" }, // on the way, delivered
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  name: String,
  email: String,
  orders: [orderSchema],
});

export default mongoose.model("User", userSchema);

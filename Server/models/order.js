import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Firebase UID
      required: true,
    },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
          image: String,
           description: String,
           color: String,
      },
    ],

    address: {
      name: String,
      email: String,
      phone: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    paymentIntentId: String,

    totalAmount: Number,

    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

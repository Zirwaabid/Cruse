// pages/Checkout/OrderSummaryStep.jsx
import React from "react";
import { useCart } from "../../context/CartContext";

export default function OrderSummaryStep({ address, paymentMethod, onBack }) {
  const { cartItems, cartTotal } = useCart();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="border-t mt-6 pt-4 flex justify-between font-semibold">
        <span>Total</span>
        <span>${cartTotal}</span>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="text-gray-500 hover:underline">
          Back
        </button>

        <button className="px-8 py-3 bg-black text-white rounded-lg">
          Complete Order
        </button>
      </div>
    </div>
  );
}

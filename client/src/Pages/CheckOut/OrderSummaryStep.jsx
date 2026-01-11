import React from "react";
import { useCart } from "../../context/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../stripe/stripePromise";
import StripeCheckoutForm from "./components/StripeCheckoutForm";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export default function OrderSummaryStep({ address, paymentMethod, onBack }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCODOrder = async () => {
    try {
      await axios.post("http://localhost:5000/api/orders", {
        userId: user.uid,
        cartItems,
        address,
        paymentMethod: "cod",
      });

      clearCart();
      toast.success("Order placed successfully");
      navigate("/profile");
    } catch (err) {
      toast.error("Order failed");
    }
  };

  const handleOnlineSuccess = async (paymentIntent) => {
    // console.log("PAYMENT INTENT:", paymentIntent);
    try {
      await axios.post("http://localhost:5000/api/orders", {
        userId: user.uid,
        cartItems,
        address,
        paymentMethod: "online",
        paymentIntentId: paymentIntent.id,
      });

      clearCart();
      toast.success("Payment & order successful");
      navigate("/profile");
    } catch (err) {
      toast.error("Order failed");
     
    }
  };


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

      {/* Items */}
      {cartItems.map((item) => (
        <div key={item._id} className="flex justify-between mb-2">
          <span>{item.name} × {item.quantity}</span>
          <span>${item.price * item.quantity}</span>
          <img src={item.image} alt="" />
        </div>
      ))}

      <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
        <span>Total</span>
        <span>${cartTotal}</span>
      </div>

      {/* COD */}
      {paymentMethod === "cod" && (
        <button
          onClick={handleCODOrder}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg"
        >
          Place Order (Cash on Delivery)
        </button>
      )}

      {/* ONLINE */}
      {paymentMethod === "online" && (
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm
            total={cartTotal}
            onSuccess={handleOnlineSuccess}
          />
        </Elements>
      )}

      <button onClick={onBack} className="mt-6 text-gray-500 hover:underline">
        Back
      </button>
    </div>
  );
}

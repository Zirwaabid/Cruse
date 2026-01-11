import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import { useCart } from "../../../context/CartContext";
export default function StripeCheckoutForm({ total, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { cartItems } = useCart();

const handlePay = async () => {
  if (!stripe || !elements) return;

  try {
    setLoading(true);

    const { data } = await axios.post(
      "http://localhost:5000/api/payment",
      { cartItems }
    );

    const result = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user.email,
          },
        },
      }
    );

    if (result.error) {
      toast.error(result.error.message);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      toast.success("Payment successful");
      onSuccess(result.paymentIntent);
    }
  } catch (err) {
    console.error(err);
    toast.error("Payment failed");
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="space-y-4 mt-6">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#111",
              fontFamily: "Inter, system-ui, sans-serif",
              "::placeholder": {
                color: "#a0a0a0",
              },
            },
            invalid: {
              color: "#e11d48",
            },
          },
        }}
      />


      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

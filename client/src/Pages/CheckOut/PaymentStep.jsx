import React from "react";
// pages/Checkout/PaymentStep.jsx
export default function PaymentStep({ onNext, onBack }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>

      <div className="space-y-4">
        <PaymentCard
          title="Cash on Delivery"
          description="Pay when your order is delivered"
          onClick={() => onNext("cod")}
        />

        <PaymentCard
          title="Online Payment"
          description="Pay securely with card"
          onClick={() => onNext("online")}
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="text-gray-500 hover:underline">
          Back
        </button>
      </div>
    </div>
  );
}

function PaymentCard({ title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border rounded-xl p-5 cursor-pointer hover:border-black transition"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

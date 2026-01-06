// pages/Checkout/CheckoutPage.jsx
import React from "react";
import { useState } from "react";
import AddressStep from "./AddressStep";
import PaymentStep from "./PaymentStep";
import OrderSummaryStep from "./OrderSummaryStep";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">

        {/* Step Indicator */}
        <div className="flex justify-between mb-10 text-sm font-medium text-gray-500">
          <span className={step >= 1 ? "text-black" : ""}>Address</span>
          <span className={step >= 2 ? "text-black" : ""}>Payment</span>
          <span className={step >= 3 ? "text-black" : ""}>Confirm</span>
        </div>

        {step === 1 && (
          <AddressStep
            onNext={(data) => {
              setAddress(data);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <PaymentStep
            onNext={(method) => {
              setPaymentMethod(method);
              setStep(3);
            }}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <OrderSummaryStep
            address={address}
            paymentMethod={paymentMethod}
            onBack={() => setStep(2)}
          />
        )}

      </div>
    </div>
  );
}

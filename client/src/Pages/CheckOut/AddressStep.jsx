import React from "react";
// pages/Checkout/AddressStep.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AddressStep({ onNext }) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (Object.values(form).some((v) => !v)) return;
    onNext(form);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 mt-28">Shipping Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="name" value={form.name} onChange={handleChange} label="Full Name" />
        <Input name="email" value={form.email} onChange={handleChange} label="Email" />
        <Input name="phone" value={form.phone} onChange={handleChange} label="Phone" />
        <Input name="city" value={form.city} onChange={handleChange} label="City" />
        <Input name="state" value={form.state} onChange={handleChange} label="State" />
        <Input name="zip" value={form.zip} onChange={handleChange} label="ZIP Code" />
        <Input name="country" value={form.country} onChange={handleChange} label="Country" />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-black outline-none"
      />
    </div>
  );
}

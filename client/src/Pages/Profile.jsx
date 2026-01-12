import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    axios
      .get(`http://localhost:5000/api/orders/${user.uid}`)
      .then((res) => setOrders(res.data));
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto mt-28 px-4 pb-20">
      {/* PROFILE HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold text-gray-900">
          My Profile
        </h1>
        <p className="text-gray-500 mt-1">{user.email}</p>
      </div>

      {/* ORDERS */}
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders yet.</p>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-2xl shadow-sm p-6"
          >
            {/* ORDER HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <p className="text-sm text-gray-500">
                  Order #{order._id.slice(-6)}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  Order: {order.orderStatus}
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  Payment: {order.paymentStatus}
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  {order.paymentMethod.toUpperCase()}
                </span>
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 border rounded-xl p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                      <span>Qty: {item.quantity}</span>
                      <span>Color: {item.color}</span>
                    </div>
                  </div>

                  <div className="text-right font-semibold text-gray-900">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="border-t mt-6 pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">
                ${order.totalAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

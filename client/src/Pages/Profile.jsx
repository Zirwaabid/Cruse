import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/${user.uid}`)
      .then((res) => setOrders(res.data));
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-28 px-4">
      <h1 className="text-3xl font-semibold mb-2">My Profile</h1>
      <p className="text-gray-500">{user.email}</p>

      <h2 className="text-xl font-semibold mt-10 mb-4">My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="border rounded-xl p-5 mb-4">
          <div className="flex justify-between mb-2">
            <span>Order #{order._id.slice(-6)}</span>
            <span className="text-sm text-gray-500">
              {order.orderStatus}
            </span>
          </div>

          {order.items.map((item) => (
            <div key={item.productId} className="text-sm flex justify-between">
              <span>{item.name} × {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <div className="border-t mt-3 pt-2 font-semibold flex justify-between">
            <span>Total</span>
            <span>${order.totalAmount}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

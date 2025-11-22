import React from "react";
import { useCart } from "../context/CartContext";
import {Trash} from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  const deliveryCost = 200;
  const grandTotal = cartTotal + deliveryCost;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-12">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold heading-text">Your Cart</h1>
       

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-3 flex flex-col sm:flex-row gap-4 sm:gap-6"
                >
                  <Link
                    to={`/product/${item._id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="flex items-center gap-4"
                  >
                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full sm:w-28 h-28 object-cover rounded-lg"
                    />

                    {/* CONTENT */}
                  </Link>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <p className="font-semibold text-lg heading-text">{item.title}</p>
                      <div className="text-sm text-gray-600 mt-1 space-y-0.5">
                        <p>Color: <span className="font-medium">{item.color}</span></p>
                        <p>Stock: <span className="font-medium">{item.stock}</span></p>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 mt-2">
                        Rs. {item.price}
                      </p>
                    </div>

                    {/* Remove Button */}
                <button onClick={() => removeFromCart(item._id)}>
                  <Trash className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                </button>
                  </div>
                  {/* QUANTITY BOX */}
                  {/* QUANTITY BOX */}
                  <div className="
  flex items-center bg-gray-100 rounded-lg px-3 py-2 h-10 
  w-fit 
  self-end 
  sm:ml-auto sm:self-center 
">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="text-xl px-2 hover:text-black cursor-pointer"
                    >
                      -
                    </button>

                    <span className="mx-3 font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="text-xl px-2 hover:text-black cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-28">
            <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>

            <div className="space-y-3 text-gray-700 text-base">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>{cartCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs. {cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>Rs. {deliveryCost}</span>
              </div>
            </div>

            <div className="border-t my-5"></div>

            <div className="flex justify-between text-2xl font-bold">
              <span>Total:</span>
              <span>Rs. {grandTotal}</span>
            </div>

            <Link
              to="/checkout"
              className="block mt-7 button-bg text-white text-center py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
            >
              Checkout 
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

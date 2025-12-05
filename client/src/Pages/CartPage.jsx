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
          <h1 className="text-2xl sm:text-3xl font-bold heading-text">Your Cart</h1>
       

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className=" rounded-xl shadow-sm border border-amber-950 p-3 sm:p-2 flex flex-col sm:flex-row gap-4 sm:gap-5"
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
                      className="w-full sm:w-16 h-10/12 sm:h-25 object-cover rounded-lg"
                    />

                    {/* CONTENT */}
                  </Link>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <p className="font-semibold text-sm heading-text">{item.title}</p>
                      <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                        <p>Color: <span className="font-medium">{item.color}</span></p>
                        <p>Stock: <span className="font-medium">{item.stock}</span></p>
                      </div>
                      <p className="text-md font-semibold text-gray-900 mt-2">
                        Rs. {item.price}
                      </p>
                    </div>

                    {/* Remove Button */}
                <button onClick={() => removeFromCart(item._id)}>
                  <Trash className="w-3 h-3 text-gray-600 hover:text-black cursor-pointer" />
                </button>
                  </div>
                  {/* QUANTITY BOX */}
                  {/* QUANTITY BOX */}
                  <div className="
  flex items-center rounded-lg px-2 py-1 h-6 
  w-fit 
  self-end 
  sm:ml-auto sm:self-center 
">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="text-md px-1 hover:text-black cursor-pointer"
                    >
                      -
                    </button>

                    <span className="mx-1 font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="text-md px-1 hover:text-black cursor-pointer"
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
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sticky top-28">
            <h2 className="text-xl font-semibold mb-3">Order Summary</h2>

            <div className="space-y-3 text-gray-700 text-sm">
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

            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>Rs. {grandTotal}</span>
            </div>

            <Link
              to="/checkout"
              className="block mt-5 button-bg text-white text-center py-2 rounded-lg text-md font-medium hover:bg-gray-800 transition"
            >
              Checkout 
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

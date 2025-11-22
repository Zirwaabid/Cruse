import React from "react";
import { X, Trash, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal
  } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 
        ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 
        transform transition-transform duration-300 
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)}>
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[65%]">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <Link
                  to={`/product/${item._id}`}
                  onClick={() => setIsCartOpen(false)}
                  className="flex items-center gap-4"
                >

                  {/* Image */}
                  <img
                    src={item.image}
                    className="w-16 h-16 rounded object-cover"
                    alt={item.name}
                  />


                  {/* Info */}
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-gray-600 text-sm">Rs. {item.price}</p>

                  </div>
                </Link>
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>


                {/* Remove Button */}
                <button onClick={() => removeFromCart(item._id)}>
                  <Trash className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Total + Visit Cart */}
        <div className="p-4 border-t mt-auto flex flex-col gap-1">
          {/* Total */}
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>Rs. {cartTotal}</span>
          </div>

          {/* Checkout */}
          <Link
            to="/checkout"
            onClick={() => setIsCartOpen(false)}
            className="w-full text-center button-bg text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Checkout
          </Link>

          {/* Visit Cart */}
          <Link
            to="/cart"
            onClick={() => setIsCartOpen(false)}
            className="w-full text-center button-bg text-white py-3 rounded-lg hover:bg-gray-800 "
          >
            Visit Full Cart
          </Link>
        </div>

      </div>
    </>
  );
}

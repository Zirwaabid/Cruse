import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";// import your auth context
import { toast } from "react-hot-toast";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/firebase"; // your firestore instance

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("CartProvider user:", user);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // ---------------------------
  // FETCH CART FROM FIRESTORE ON LOGIN
  // ---------------------------
  useEffect(() => {
  if (loading) return; // 

  const fetchCart = async () => {
    if (user) {
      try {
        const docRef = doc(db, "carts", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCartItems(docSnap.data().items || []);
        } else {
          await setDoc(docRef, {
            userId: user.uid,
            items: [],
          });
          setCartItems([]);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    } else {
      setCartItems([]);
    }
  };

  fetchCart();
}, [user, loading]);


  // ---------------------------
  // SYNC CART TO FIRESTORE
  // ---------------------------
  const syncCartToFirestore = async (updatedCart) => {
    if (user) {
      try {
        const docRef = doc(db, "carts", user.uid);
        await setDoc(
          docRef,
          { items: updatedCart },
          { merge: true }
        );

      } catch (err) {
        console.error("Error syncing cart:", err);
      }
    }
  };

  // ---------------------------
  // ADD TO CART (CHECK LOGIN)
  // ---------------------------
  const addToCart = async (product) => {
  if (!user) {
    toast.error("Please login before adding items to cart");
    return;
  }

  let newCart;

  const existingItem = cartItems.find(
    (item) => item._id === product._id
  );

  if (existingItem) {
    newCart = cartItems.map((item) =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    newCart = [...cartItems, { ...product, quantity: 1 }];
  }

  setCartItems(newCart);
  await syncCartToFirestore(newCart);
  setIsCartOpen(true);
};

  // ---------------------------
  // REMOVE COMPLETELY
  // ---------------------------
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    syncCartToFirestore(updatedCart);
  };

  // ---------------------------
  // INCREASE QUANTITY
  // ---------------------------
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    syncCartToFirestore(updatedCart);
  };

  // ---------------------------
  // DECREASE QUANTITY
  // ---------------------------
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCartItems(updatedCart);
    syncCartToFirestore(updatedCart);
  };

  // ---------------------------
  // CART TOTAL PRICE
  // ---------------------------
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ---------------------------
  // TOTAL ITEMS COUNT
  // ---------------------------
  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

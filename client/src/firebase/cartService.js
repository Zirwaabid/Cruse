import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Clear user's cart in Firestore
 */
export const clearFirestoreCart = async (uid) => {
  const cartRef = doc(db, "carts", uid);

  await updateDoc(cartRef, {
    items: [],
  });
};
// export const clearFirestoreCart = async (uid) => {
//   const userRef = doc(db, "users", uid);

//   await updateDoc(userRef, {
//     cart: [],
//   });
// };

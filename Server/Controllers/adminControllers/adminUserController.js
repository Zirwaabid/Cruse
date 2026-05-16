import admin from "../../config/firebaseAdmin.js";
import Order from "../../models/order.js";

/**
 * 👥 GET ALL USERS (FROM FIRESTORE)
 */
export const getAllUsers = async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection("users").get();

    const users = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * 👤 GET SINGLE USER PROFILE
 */
export const getSingleUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      uid,
      ...userDoc.data(),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

/**
 * 📦 GET USER ORDERS (FROM MONGODB)
 */
export const getUserOrders = async (req, res) => {
  try {
    const { uid } = req.params;

    const orders = await Order.find({ userId: uid }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

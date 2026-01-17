import admin from "../config/firebaseAdmin.js";
export const adminOnly = async (req, res, next) => {
  try {
    // 🔑 1. Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 🔐 2. Verify Firebase ID Token
    const decoded = await admin.auth().verifyIdToken(token);

    // 🔥 3. Fetch user role from Firestore
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(decoded.uid)
      .get();

    if (!userDoc.exists) {
      return res.status(403).json({ message: "User profile not found" });
    }

    const userData = userDoc.data();

    // 🚫 4. Check admin role
    if (userData.role !== "admin") {
      return res.status(403).json({ message: "Admin access denied" });
    }

    // ✅ 5. Attach admin to request
    req.admin = {
      uid: decoded.uid,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

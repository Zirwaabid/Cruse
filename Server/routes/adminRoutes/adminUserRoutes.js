import express from "express";
import {
  getAllUsers,
  getSingleUser,
  getUserOrders,
} from "../../Controllers/adminControllers/adminUserController.js";

import { adminOnly } from "../../middleware/adminMiddleware.js";

const router = express.Router();

// 🔐 ADMIN ONLY
router.get("/", adminOnly, getAllUsers);
router.get("/:uid", adminOnly, getSingleUser);
router.get("/:uid/orders", adminOnly, getUserOrders);

export default router;

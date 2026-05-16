import express from "express";
import {
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../../Controllers/adminControllers/adminOrderController.js";

import { adminOnly } from "../../middleware/adminMiddleware.js";

const router = express.Router();

// 🔐 ADMIN ONLY
router.get("/", adminOnly, getAllOrders);
router.get("/:id", adminOnly, getSingleOrder);
router.put("/:id/status", adminOnly, updateOrderStatus);

export default router;

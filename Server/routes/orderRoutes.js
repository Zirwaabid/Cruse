import express from "express";
import { createOrder, getUserOrders } from "../Controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:userId", getUserOrders);
// router.delete("/delete-all", deleteAllOrders)

export default router;

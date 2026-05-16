import express from "express";
import { getPayments } from "../../Controllers/paymentContorllers/paymentController.js";
const router = express.Router()
router.post("/", getPayments)
export default router;
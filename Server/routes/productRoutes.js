import express from "express";
import { getAllProducts, getProductById, addProduct, getFamousProducts } from "../Controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/famous", getFamousProducts);
router.get("/:id", getProductById);
router.post("/", addProduct); // For admin use
export default router;
import express from "express";
import { getAllProducts, getProductById, getFamousProducts } from "../Controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/famous", getFamousProducts);
router.get("/:id", getProductById);
export default router;
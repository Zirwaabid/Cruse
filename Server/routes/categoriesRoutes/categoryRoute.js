import express from "express";
import { createCategory, getCategoryTree } from "../../Controllers/CategoryController/categoryController.js";

const router = express.Router();

router.post("/create", createCategory);
router.get("/get", getCategoryTree);
export default router;
import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Controllers/adminProductController.js";

import upload from '../middleware/upload.js';
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// 🔐 ADMIN ONLY
router.post("/", adminOnly, upload.single("image"), createProduct);
router.put("/:id", adminOnly, upload.single("image"), updateProduct);
router.delete("/:id", adminOnly, deleteProduct);

export default router;

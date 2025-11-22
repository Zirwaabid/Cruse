// routes/aiRoutes.js
import express from "express";
import {getFashionAdvice} from '../Controllers/aiController.js'

const router = express.Router();

// POST request for chatbot
router.post("/chat", getFashionAdvice);

export default router;

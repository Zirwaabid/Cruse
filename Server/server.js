import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Connect Database
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

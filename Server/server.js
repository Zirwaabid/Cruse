import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
// category routes 
import categoryRoute from './routes/categoriesRoutes/categoryRoute.js'
// product routes
import productRoutes from './routes/productRoutes/productRoutes.js'
// payment routes
import paymentRoutes from './routes/paymentRoutes/paymentRoutes.js'
// order route
import orderRoutes from './routes/orderRoutes/orderRoutes.js'
// admin routes 
import adminProductRoutes from "./routes/adminRoutes/adminProductRoutes.js";
import adminOrderRoutes from "./routes/adminRoutes/adminOrderRoutes.js";
import adminUserRoutes from "./routes/adminRoutes/adminUserRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Connect Database
connectDB();

//---user Routes
// ---Product routes---
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
// ---Category routes---
app.use("/api/categories", categoryRoute);
// admin routes 
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/users", adminUserRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

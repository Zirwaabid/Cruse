import mongoose from "mongoose";
import dotenv from "dotenv";

import { seedCategories } from "./seedCategories.js";
import { seedProducts } from "./seedProduct.js";

dotenv.config(); // 👈 MUST be before using process.env

const runSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const categories = await seedCategories();
    await seedProducts(categories);

    console.log("Seeding Done ✅");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runSeeder();
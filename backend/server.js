import express from "express";
import morgan from "morgan";
import dbConnection from "./config/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/cloudinaryRoutes.js";

dotenv.config();

const app = express();

dbConnection();

app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
// app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subCategory", subCategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/upload", uploadRoutes);

// root route
app.get("/", (req, res) => {
  res.json({ duls_online_store: "Welcome to Duls-Online-Store" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

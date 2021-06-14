import express from "express";
import morgan from "morgan";
import dbConnection from "./config/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";

// routes import
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

//initialize express
const app = express();

// database connection
dbConnection();

//set up middlewares
app.use(express.json({ limit: "4mb" }));
app.use(morgan("dev"));
app.use(cors());

//route middlewares
app.use("/api/auth", authRoutes);
app.use("/api", categoryRoutes);

// root route
app.get("/", (req, res) => {
  res.json({ duls_online_store: "Welcome to Duls-Online-Store" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

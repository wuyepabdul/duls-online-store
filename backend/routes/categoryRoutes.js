import express from "express";
import {
  createCategory,
  listCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { adminCheck, authCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

//create a category route
router.post("/category", authCheck, adminCheck, createCategory);

//list a category route
router.get("/categories", authCheck, adminCheck, listCategories);

//get category by slug route
router.get("/category/:slug", authCheck, adminCheck, getCategory);

//update a category route
router.put("/category/:slug", authCheck, adminCheck, updateCategory);

// delete a category route
router.delete("/category/:slug", authCheck, adminCheck, deleteCategory);

export default router;

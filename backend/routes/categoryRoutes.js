import express from "express";
import {
  createCategory,
  listCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategorySubs,
} from "../controllers/categoryController.js";

import { adminCheck, authCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authCheck, adminCheck, createCategory);

router.get("/", listCategories);

router.get("/sub/:id", getCategorySubs);

router.get("/:slug", getCategory);

router.put("/:slug", authCheck, adminCheck, updateCategory);

router.delete("/:slug", authCheck, adminCheck, deleteCategory);

export default router;

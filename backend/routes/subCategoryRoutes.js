import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategory,
  listSubCategories,
  updateSubCategory,
} from "../controllers/subCategoryControllers.js";

import { adminCheck, authCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authCheck, adminCheck, createSubCategory);

router.get("/", listSubCategories);

router.get("/:slug", getSubCategory);

router.put("/:slug", authCheck, adminCheck, updateSubCategory);

router.delete("/:slug", authCheck, adminCheck, deleteSubCategory);

export default router;

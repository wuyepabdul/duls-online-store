import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductBySlug,
  listProducts,
  getTotalProducts,
  updateProduct,
  listNewArrivals,
  rateProduct,
  listRelatedProducts,
  searchFilters,
} from "../controllers/productControllers.js";

import { adminCheck, authCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authCheck, adminCheck, createProduct);

router.post("/list", listProducts);

router.post("/searchfilters", searchFilters);

router.post("/newarrivals", listNewArrivals);

router.get("/total", getTotalProducts);

router.get("/listall/:count", getAllProducts);

router.get("/:slug", getProductBySlug);

router.get("/relatedproducts/:productId", listRelatedProducts);

router.put("/:slug", authCheck, adminCheck, updateProduct);

router.put("/rating/:productId", authCheck, rateProduct);

router.delete("/:slug", authCheck, adminCheck, deleteProduct);

export default router;

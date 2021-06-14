import express from "express";
import {
  createOrUpdateUser,
  getCurrentAdminUser,
  getCurrentUser,
} from "../controllers/authController.js";
import { adminCheck, authCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

// create or update user
router.post("/createOrUpdateUser", authCheck, createOrUpdateUser);

// get current user
router.get("/currentUser", authCheck, getCurrentUser);

// get current admin user
router.get("/currentAdminUser", authCheck, adminCheck, getCurrentAdminUser);

export default router;

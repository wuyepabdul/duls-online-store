import express from "express";
import {
  signinController,
  signupController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", signinController);

router.post("/register", signupController);

export default router;

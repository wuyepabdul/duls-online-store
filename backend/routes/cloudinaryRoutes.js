import express from "express";

import { adminCheck, authCheck } from "../middlewares/authMiddleware.js";

import {
  removeImage,
  uploadImage,
} from "../controllers/cloudinaryControllers.js";

const router = express.Router();

router.post("/uploadimages", authCheck, adminCheck, uploadImage);
router.post("/removeimages", authCheck, adminCheck, removeImage);

export default router;

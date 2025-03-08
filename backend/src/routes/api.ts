import express from "express";
import {
  getAllAPIs, 
} from "../controllers/apiController";
import { logApiUsage } from "../middleware/logApiUsage";
import { searchAPIs } from "../controllers/userController";

const router = express.Router();
router.get("/apis", getAllAPIs);
router.post('/search', searchAPIs)

// Admin API Approval Routes



export default router;

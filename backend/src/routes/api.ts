import express from "express";
import {
  getAllAPIs, 
} from "../controllers/apiController";
import { logApiUsage } from "../middleware/logApiUsage";

const router = express.Router();


router.get("/apis", getAllAPIs);


// Admin API Approval Routes



export default router;

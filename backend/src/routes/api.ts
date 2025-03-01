import express from "express";
import {
  getAllAPIs,
  createAPI,
  getAPIById,
  updateAPI,
  deleteAPI,
  suggestAPIs,
  addApi,
  approveAPI,
  rejectAPI, // New controllers
} from "../controllers/apiController";
import { verifyAdmin } from "../middleware/authMiddleware";

const router = express.Router();


router.post("/apis", verifyAdmin, createAPI);
router.put("/apis/:id", verifyAdmin, updateAPI);
router.delete("/apis/:id", verifyAdmin, deleteAPI);
router.post("/add", verifyAdmin, addApi);
router.put("/apis/:id/approve", verifyAdmin, approveAPI);
router.put("/apis/:id/reject", verifyAdmin, rejectAPI);


router.get("/apis/:id", getAPIById);
router.get("/apis", getAllAPIs);
router.post("/suggest", suggestAPIs);

// Admin API Approval Routes



export default router;

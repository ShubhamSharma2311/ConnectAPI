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

const router = express.Router();

router.get("/apis", getAllAPIs);
router.post("/apis", createAPI);
router.get("/apis/:id", getAPIById);
router.put("/apis/:id", updateAPI);
router.delete("/apis/:id", deleteAPI);
router.post("/suggest", suggestAPIs);
router.post("/add", addApi);

// Admin API Approval Routes
router.put("/apis/:id/approve", approveAPI);
router.put("/apis/:id/reject", rejectAPI);

export default router;

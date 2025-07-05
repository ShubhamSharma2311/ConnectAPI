import express from "express";
import { 
  userSignup, 
  userLogin, 
  searchAPIs, 
  trendingAPI, 
  tryAPI, 
  trackApiInteraction, 
  toggleBookmark, 
  getUserBookmarks, 
  getUserInteractionHistory 
} from "../controllers/userController";
import { verifyUser } from "../middleware/userMiddleware"; // Ensure authentication
import apiRoutes from "./api";
const router = express.Router();

// User Authentication Routes
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.use("/api", apiRoutes);

// API Search and Discovery
router.post("/search", verifyUser, searchAPIs);
router.get("/trending", trendingAPI);
router.post("/try/:id", verifyUser, tryAPI);

// 📊 API Interaction Tracking
router.post("/track-interaction", verifyUser, trackApiInteraction);

// ⭐ Bookmark Management
router.post("/bookmark", verifyUser, toggleBookmark);
router.get("/bookmarks", verifyUser, getUserBookmarks);

// 📈 User Analytics
router.get("/interaction-history", verifyUser, getUserInteractionHistory);

export default router;

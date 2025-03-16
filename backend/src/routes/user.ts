import express from "express";
import { userSignup, userLogin, searchAPIs , trendingAPI, tryAPI } from "../controllers/userController";
import { verifyUser } from "../middleware/userMiddleware"; // Ensure authentication
import apiRoutes from "./api";
const router = express.Router();

// User Authentication Routes
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.use("/api", apiRoutes);
// Route for searching APIs (User)
router.post("/search", verifyUser, searchAPIs);
router.get("/trending", trendingAPI);
router.post("/try/:id", verifyUser, tryAPI);
export default router;

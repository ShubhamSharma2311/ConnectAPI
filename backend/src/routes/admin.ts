import express from "express";
import { adminSignup, adminLogin } from "../controllers/adminController";
import { verifyAdmin } from "../middleware/adminMiddleware";
import { Request, Response } from "express";

const router = express.Router();

// ✅ Public Routes
router.post("/signup", adminSignup);
router.post("/login", adminLogin);

// ✅ Protected Route Example
router.get("/dashboard", verifyAdmin, (req: Request, res: Response) => {
  const authReq = req as any; // Cast req to 'any' to avoid TS errors
  res.json({ message: "Welcome Admin!", admin: authReq.admin });
});

export default router;

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ✅ Define a Custom Request Type
interface AuthRequest extends Request {
  user?: { id: string }; // Extend Request with user property
}

// ✅ Middleware to verify user authentication
export const verifyUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");
  console.log("Auth header:", authHeader);
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ 
      message: "Access Denied. No valid authorization header provided.",
      expected: "Bearer <token>"
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ message: "Access Denied. No token provided." });
    return;
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
    res.status(500).json({ message: "Server configuration error" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    console.log("Token decoded successfully for user:", decoded.id);
    req.user = decoded; // Store user data in request object
    next(); // Proceed to the next middleware or route handler
  } catch (error: any) {
    console.error("JWT verification error:", error.message);
    res.status(400).json({ 
      message: "Invalid token",
      error: error.message
    });
  }
};

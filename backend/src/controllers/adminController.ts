import { Request, Response } from "express";
import Admin from "../models/Admin";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// ✅ Zod Validation Schema
const adminSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

// ✅ Admin Signup
export const adminSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = adminSchema.parse(req.body);

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      res.status(400).json({ message: "Admin already exists" });
      return;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid input", error });
  }
};

// ✅ Admin Login
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET as string, {
      expiresIn: "2h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: "Invalid input", error });
  }
};

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
import Api from "../models/Api";
import { generateUserEmbedding } from "../services/embeddingService";
import mongoose from "mongoose";
dotenv.config();

// ✅ User Signup
export const userSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(400).json({ message: "Invalid input", error });
  }
};


// ✅ User Login
export const userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
  
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
  
      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(400).json({ message: "Invalid input", error });
    }
  };


  // Function to compute cosine similarity
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}

// User API search function
export const searchAPIs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body; // User input (either API name or usage description)

    if (!query) {
      res.status(400).json({ message: "Search query is required" });
      return;
    }

    // 1️⃣ **Check if the query directly matches an API name**
    const exactMatchAPIs = await Api.find({ name: { $regex: query, $options: "i" } });

    if (exactMatchAPIs.length > 0) {
      res.json({ message: "Exact match found", apis: exactMatchAPIs });
      return;
    }

    // 2️⃣ **Convert user input into embeddings**
    const userEmbedding = await generateUserEmbedding(query);

    // 3️⃣ **Retrieve all APIs with embeddings from the database**
    const allAPIs = await Api.find({ embedding: { $exists: true, $ne: null } });

    // 4️⃣ **Calculate similarity scores**
    const scoredAPIs = allAPIs
      .map((api) => ({
        ...api.toObject(),
        similarity: cosineSimilarity(userEmbedding, api.embedding as number[]),
      }))
      .sort((a, b) => b.similarity - a.similarity) // Sort by highest similarity
      .slice(0, 10); // Return top 10 results

    res.json({ message: "Relevant APIs found", apis: scoredAPIs });
  } catch (error) {
    console.error("❌ Error searching APIs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
  
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
import Api from "../models/Api";
import { generateUserEmbedding } from "../services/embeddingService";
import axios from "axios";
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

    // Create new user (no password hashing)
    const newUser = new User({ name, email, password });

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser._id , name: newUser.name }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: "7d" }
    );

    // Save user only after token generation succeeds
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Signup Error:", error); // Log the full error
    res.status(400).json({ message: "Signup failed", error });
  }
};

// ✅ User Login
export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id , name : user.name }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

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
    const { query } = req.body; // User input

    if (!query) {
      res.status(400).json({ message: "Search query is required" });
      return;
    }

    // 1️⃣ Check if the query directly matches an API name
    const exactMatchAPIs = await Api.find({ name: { $regex: query, $options: "i" } });
    if (exactMatchAPIs.length > 0) {
      res.json({ message: "Exact match found", apis: exactMatchAPIs });
      return;
    }

    // 2️⃣ Convert user input into embeddings
    const userEmbedding = await generateUserEmbedding(query);

    // 3️⃣ Retrieve all APIs with embeddings
    const allAPIs = await Api.find({ embedding: { $exists: true, $ne: null } });

    // 4️⃣ Calculate similarity scores, filter by threshold, sort and slice
    const threshold = 0.7; // Only return APIs with similarity above this value
    const scoredAPIs = allAPIs
      .map(api => ({
        ...api.toObject(),
        similarity: cosineSimilarity(userEmbedding, api.embedding as number[]),
      }))
      .filter(api => api.similarity >= threshold)  // Filter out low similarity results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5); // Return top 5 results

    res.json({ message: "Relevant APIs found", apis: scoredAPIs });
  } catch (error) {
    console.error("Error searching APIs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const trendingAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const trendingApis = await Api.find().sort({ usageCount: -1 }).limit(10);
    res.status(200).json(trendingApis);
  } catch (error) {
    console.error("Error fetching trending APIs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const tryAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the API id from the URL parameters
    const { id } = req.params;

    // Find the API details in the database
    const apiData = await Api.findById(id);
    if (!apiData) {
      res.status(404).json({ message: "API not found" });
      return;
    }

    // Increment the usage count for this API
    await Api.findByIdAndUpdate(id, { $inc: { usageCount: 1 } });

    // Forward the request to the actual external API endpoint
    // This example assumes a GET request; adjust method, headers, etc. as needed
    const externalResponse = await axios({
      method: req.method,              // Use the same HTTP method as the incoming request
      url: apiData.endpoint,           // External API endpoint stored in your DB
      headers: req.headers,            // Optionally forward headers (filter if needed)
      params: req.query,               // Forward query parameters (for GET requests)
      data: req.body,                  // For POST/PUT requests, forward the body
    });

    // Return the external API's response to the client
    res.status(externalResponse.status).json(externalResponse.data);
  } catch (error: any) {
    console.error("Error in tryAPI endpoint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


  

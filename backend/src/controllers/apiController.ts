import { Request, Response } from "express";
import Api from "../models/Api";
import { z } from "zod";
import mongoose from "mongoose";
import { generateEmbedding } from "../services/geminiService";
import API from "../models/Api";



// Define Zod schema for API validation
const apiSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  price: z.number().min(0, "Price must be a positive number"),
  usage: z.string(),
  documentationUrl: z.string().url("Invalid URL format"),
  endpoint: z.string().url("Invalid endpoint URL format"), // Add this
  provider: z.string().min(3, "Provider name must be at least 3 characters"), // Add this
});

export const createAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = apiSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        message: "Invalid data",
        errors: validationResult.error.format(),
      });
      return; // ✅ Only return to stop further execution, not return res.
    }

    const { name, description, category, price, usage, documentationUrl, endpoint, provider } =
      validationResult.data;

    // 🔹 Check for required fields without returning res
    if (!endpoint || !provider) {
      res.status(400).json({
        message: "Missing required fields: endpoint and provider",
      });
      return; // ✅ Stop execution without returning res
    }

    // 🔹 Generate vector embedding for the API description
    const embedding = await generateEmbedding(description);

    // 🔹 Create and save the API record
    const newApi = await Api.create({
      name,
      description,
      category,
      price,
      usage,
      documentationUrl,
      endpoint,
      provider,
      embedding,
    });

    res.status(201).json(newApi); // ✅ Send response without returning it
  } catch (error: any) {
    console.error("🔥 Error creating API:", error);
    res.status(500).json({ message: "Error creating API", error: error.message });
  }
};

// Get all APIs
export const getAllAPIs = async (req: Request, res: Response) => {
  try {
    const page = parseInt((req.query.page as string)?.trim()) || 1;
    const limit = parseInt((req.query.limit as string)?.trim()) || 10;
    const skip = (page - 1) * limit;

    // Extract filter query parameters and trim them
    const name = (req.query.name as string)?.trim();
    const category = (req.query.category as string)?.trim();
    const minPrice = (req.query.minPrice as string)?.trim();
    const maxPrice = (req.query.maxPrice as string)?.trim();

    let filter: any = {};

    if (name) filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    console.log("Generated filter:", JSON.stringify(filter, null, 2)); // Debugging log

    const apis = await Api.find(filter).skip(skip).limit(limit);
    const total = await Api.countDocuments(filter);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      apis,
    });
  } catch (error) {
    console.error("🔥 Error fetching APIs:", error);
    res.status(500).json({ message: "Error fetching APIs" });
  }
};





// Update API with Zod validation
export const updateAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    let { id } = req.params;
    id = id.trim(); // Remove unwanted whitespace

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid API ID format" });
      return;
    }

    const updatedApi = await Api.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // Ensure validation runs
    );

    if (!updatedApi) {
      res.status(404).json({ message: "API not found" });
      return;
    }

    res.json(updatedApi);
  } catch (error) {
    console.error("🔥 Error updating API:", error);
    res.status(500).json({ message: "Error updating API", error: (error as Error).message });
  }
};

// Delete API
export const deleteAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    let { id } = req.params;
    id = id.trim(); // Remove unwanted whitespace

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid API ID format" });
      return;
    }

    const deletedApi = await Api.findByIdAndDelete(id);
    if (!deletedApi) {
      res.status(404).json({ message: "API not found" });
      return;
    }

    res.json({ message: "API deleted successfully" });
  } catch (error) {
    console.error("🔥 Error deleting API:", error);
    res.status(500).json({ message: "Error deleting API", error: (error as Error).message });
  }
};





// Approve API
export const approveAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const api = await API.findByIdAndUpdate(id, { status: "approved" }, { new: true });

    if (!api) {
      res.status(404).json({ message: "API not found" });
      return;
    }

    res.status(200).json({ message: "API approved successfully", api });
  } catch (error) {
    res.status(500).json({ message: "Error approving API", error });
  }
};

// Reject API
export const rejectAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const api = await API.findByIdAndUpdate(id, { status: "rejected" }, { new: true });

    if (!api) {
      res.status(404).json({ message: "API not found" });
      return;
    }

    res.status(200).json({ message: "API rejected successfully", api });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting API", error });
  }
};
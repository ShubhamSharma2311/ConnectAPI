import { Request, Response } from "express";
import Api from "../models/Api";
import { z } from "zod";

// Define Zod schema for API validation
const apiSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  price: z.number().min(0, "Price must be a positive number"),
  usage: z.string(),
  documentationUrl: z.string().url("Invalid URL format"),
});

// Get all APIs
export const getAllAPIs = async (req: Request, res: Response): Promise<void> => {
  try {
    const apis = await Api.find();
    res.json(apis);
  } catch (error) {
    console.error("🔥 Error fetching APIs:", error);
    res.status(500).json({ message: "Error fetching APIs" });
  }
};

// Get API by ID
export const getAPIById = async (req: Request, res: Response): Promise<void> => {
  try {
    const api = await Api.findById(req.params.id);
    if (!api) {
      res.status(404).json({ message: "API not found" });
      return;
    }
    res.json(api);
  } catch (error) {
    res.status(500).json({ message: "Error fetching API" });
  }
};

// Create new API with Zod validation
export const createAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = apiSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        message: "Invalid data",
        errors: validationResult.error.format(),
      });
      return;
    }

    const newApi = new Api(validationResult.data);
    await newApi.save();
    res.status(201).json(newApi);
  } catch (error: any) {
    console.error("🔥 Error creating API:", error);
    res.status(500).json({ message: "Error creating API", error: error.message });
  }
};

// Update API with Zod validation
export const updateAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = apiSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        message: "Invalid data",
        errors: validationResult.error.format(),
      });
      return;
    }

    const updatedApi = await Api.findByIdAndUpdate(req.params.id, validationResult.data, { new: true });

    if (!updatedApi) {
      res.status(404).json({ message: "API not found" });
      return;
    }

    res.json(updatedApi);
  } catch (error) {
    res.status(500).json({ message: "Error updating API" });
  }
};

// Delete API
export const deleteAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedApi = await Api.findByIdAndDelete(req.params.id);
    if (!deletedApi) {
      res.status(404).json({ message: "API not found" });
      return;
    }
    res.json({ message: "API deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting API" });
  }
};

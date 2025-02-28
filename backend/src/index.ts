import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db"; // Import the DB connection function
import apiRoutes from "./routes/api";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB(); // Establish MongoDB connection
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error(" Server Startup Failed:", error);
    process.exit(1); // Exit process on failure
  }
};

startServer();

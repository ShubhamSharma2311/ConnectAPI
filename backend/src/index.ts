import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db"; // Import the DB connection function
import apiRoutes from "./routes/api";
import adminRoutes from "./routes/admin";
import userRoutes from "./routes/user"; 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173", // Vite default port
    "https://connect-api-onw5.vercel.app", // Deployed version
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Cache-Control",
    "X-File-Name"
  ],
  exposedHeaders: ["Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// Routes

app.use("/app/admin", adminRoutes);
app.use("/app/user", userRoutes);

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

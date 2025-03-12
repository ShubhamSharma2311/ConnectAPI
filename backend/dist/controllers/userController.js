"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAPIs = exports.userLogin = exports.userSignup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const Api_1 = __importDefault(require("../models/Api"));
const embeddingService_1 = require("../services/embeddingService");
dotenv_1.default.config();
// ✅ User Signup
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Create new user (no password hashing)
        const newUser = new User_1.default({ name, email, password });
        // Generate JWT Token
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: "7d" });
        // Save user only after token generation succeeds
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully", token });
    }
    catch (error) {
        console.error("Signup Error:", error); // Log the full error
        res.status(400).json({ message: "Signup failed", error });
    }
});
exports.userSignup = userSignup;
// ✅ User Login
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user || user.password !== password) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(400).json({ message: "Invalid input", error });
    }
});
exports.userLogin = userLogin;
// Function to compute cosine similarity
function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}
// User API search function
const searchAPIs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.body; // User input
        if (!query) {
            res.status(400).json({ message: "Search query is required" });
            return;
        }
        // 1️⃣ Check if the query directly matches an API name
        const exactMatchAPIs = yield Api_1.default.find({ name: { $regex: query, $options: "i" } });
        if (exactMatchAPIs.length > 0) {
            res.json({ message: "Exact match found", apis: exactMatchAPIs });
            return;
        }
        // 2️⃣ Convert user input into embeddings
        const userEmbedding = yield (0, embeddingService_1.generateUserEmbedding)(query);
        // 3️⃣ Retrieve all APIs with embeddings
        const allAPIs = yield Api_1.default.find({ embedding: { $exists: true, $ne: null } });
        // 4️⃣ Calculate similarity scores, filter by threshold, sort and slice
        const threshold = 0.7255; // Only return APIs with similarity above this value
        const scoredAPIs = allAPIs
            .map(api => (Object.assign(Object.assign({}, api.toObject()), { similarity: cosineSimilarity(userEmbedding, api.embedding) })))
            .filter(api => api.similarity >= threshold) // Filter out low similarity results
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 5); // Return top 5 results
        res.json({ message: "Relevant APIs found", apis: scoredAPIs });
    }
    catch (error) {
        console.error("Error searching APIs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.searchAPIs = searchAPIs;

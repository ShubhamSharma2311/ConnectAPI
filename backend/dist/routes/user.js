"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userMiddleware_1 = require("../middleware/userMiddleware"); // Ensure authentication
const api_1 = __importDefault(require("./api"));
const router = express_1.default.Router();
// User Authentication Routes
router.post("/signup", userController_1.userSignup);
router.post("/login", userController_1.userLogin);
router.use("/api", api_1.default);
// Route for searching APIs (User)
router.post("/search", userMiddleware_1.verifyUser, userController_1.searchAPIs);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiController_1 = require("../controllers/apiController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get("/apis", apiController_1.getAllAPIs);
router.post('/search', userController_1.searchAPIs);
// Admin API Approval Routes
exports.default = router;

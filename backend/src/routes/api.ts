import express from "express";
import { getAllAPIs, createAPI, getAPIById, updateAPI, deleteAPI } from "../controllers/apiController";

const router = express.Router();

router.get("/apis", getAllAPIs);
router.post("/apis", createAPI);
router.get("/apis/:id", getAPIById);
router.put("/apis/:id", updateAPI);
router.delete("/apis/:id", deleteAPI);

export default router;

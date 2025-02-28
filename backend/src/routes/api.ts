import express from "express";
import { getAllAPIs, createAPI, getAPIById, updateAPI, deleteAPI } from "../controllers/apiController";
import { suggestAPIs } from "../controllers/apiController";
import { addApi } from "../controllers/apiController";

const router = express.Router();

router.get("/apis", getAllAPIs);
router.post("/apis", createAPI);
router.get("/apis/:id", getAPIById);
router.put("/apis/:id", updateAPI);
router.delete("/apis/:id", deleteAPI);
router.post("/suggest", suggestAPIs);
router.post("/add", addApi);
export default router;

import { Router } from "express";
import { getRecords, getRecordById, createRecord, updateRecord, deleteRecord } from "../controllers/boothController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();

router.get("/", getRecords);
router.get("/:id", getRecordById);
router.post("/", authMiddleware, createRecord);
router.patch("/:id", authMiddleware, updateRecord);
router.delete("/:id", authMiddleware, deleteRecord);

export const boothRoutes = router;

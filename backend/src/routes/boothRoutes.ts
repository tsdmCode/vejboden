import { Router } from "express";
import { getRecords, getRecordById, createRecord, updateRecord, deleteRecord } from "../controllers/boothController.js";

const router = Router();

router.get("/", getRecords);
router.get("/:id", getRecordById);
router.post("/", createRecord);
router.patch("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export const boothRoutes = router;

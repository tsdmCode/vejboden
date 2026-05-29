import { Router } from "express";
import { getRecords, getRecordById, createRecord, updateRecord, deleteRecord } from "../controllers/ratingsController.js";

const router = Router();

router.get("/", getRecords);
router.get("/:id", getRecordById);
router.post("/", createRecord);
router.patch("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export const ratingsRoutes = router;

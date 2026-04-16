import { Router } from "express";
import { getAdminSummary } from "../controllers/adminController.js";
import { authorize } from "../middleware/auth.js";

export const router = Router();

router.get("/summary", authorize("admin", "recruiter"), getAdminSummary);

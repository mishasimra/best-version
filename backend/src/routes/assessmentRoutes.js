import { Router } from "express";
import {
  getAssessmentQuestions,
  getLatestAssessment,
  submitAssessment,
} from "../controllers/assessmentController.js";

export const router = Router();

router.get("/questions", getAssessmentQuestions);
router.get("/latest", getLatestAssessment);
router.post("/", submitAssessment);

import { Router } from "express";
import {
  getMentorById,
  getMentors,
  getMyMentorshipRequests,
  requestMentorship,
} from "../controllers/mentorshipController.js";
import { validateRequest } from "../middleware/validate.js";
import { mentorshipValidator } from "../validators/commonValidators.js";

export const router = Router();

router.get("/", getMentors);
router.get("/requests", getMyMentorshipRequests);
router.get("/:mentorId", getMentorById);
router.post("/:mentorId/request", mentorshipValidator, validateRequest, requestMentorship);

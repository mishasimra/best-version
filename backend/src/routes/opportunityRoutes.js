import { Router } from "express";
import {
  applyToJob,
  getCareerOpportunities,
  getCompetitions,
  getFreelanceJobById,
  getFreelanceJobs,
  getLeaderboard,
  getMyApplications,
  getStartupIdeas,
  joinCompetition,
} from "../controllers/opportunityController.js";
import { validateRequest } from "../middleware/validate.js";
import { applicationValidator } from "../validators/commonValidators.js";

export const router = Router();

router.get("/freelance", getFreelanceJobs);
router.get("/freelance/:jobId", getFreelanceJobById);
router.post("/freelance/:jobId/apply", applicationValidator, validateRequest, applyToJob);
router.get("/applications", getMyApplications);
router.get("/competitions", getCompetitions);
router.post("/competitions/:competitionId/join", joinCompetition);
router.get("/leaderboard", getLeaderboard);
router.get("/career", getCareerOpportunities);
router.get("/startups", getStartupIdeas);

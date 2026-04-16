import { Router } from "express";
import { createProject, getProjects, submitProject, updateProject } from "../controllers/projectController.js";
import { validateRequest } from "../middleware/validate.js";
import { projectValidator } from "../validators/commonValidators.js";

export const router = Router();

router.get("/", getProjects);
router.post("/", projectValidator, validateRequest, createProject);
router.patch("/:projectId", updateProject);
router.post("/:projectId/submit", submitProject);

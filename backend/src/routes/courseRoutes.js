import { Router } from "express";
import {
  enrollInCourse,
  getCourseDetails,
  getCourses,
  updateCourseProgress,
} from "../controllers/courseController.js";

export const router = Router();

router.get("/", getCourses);
router.get("/:slug", getCourseDetails);
router.post("/:courseId/enroll", enrollInCourse);
router.patch("/:courseId/progress", updateCourseProgress);

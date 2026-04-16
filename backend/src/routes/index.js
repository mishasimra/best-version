import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { router as adminRouter } from "./adminRoutes.js";
import { router as assessmentRouter } from "./assessmentRoutes.js";
import { router as authRouter } from "./authRoutes.js";
import { router as communityRouter } from "./communityRoutes.js";
import { router as courseRouter } from "./courseRoutes.js";
import { router as dashboardRouter } from "./dashboardRoutes.js";
import { router as mentorshipRouter } from "./mentorshipRoutes.js";
import { router as opportunityRouter } from "./opportunityRoutes.js";
import { router as profileRouter } from "./profileRoutes.js";
import { router as projectRouter } from "./projectRoutes.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/dashboard", protect, dashboardRouter);
router.use("/assessments", protect, assessmentRouter);
router.use("/courses", protect, courseRouter);
router.use("/projects", protect, projectRouter);
router.use("/opportunities", protect, opportunityRouter);
router.use("/community", protect, communityRouter);
router.use("/mentors", protect, mentorshipRouter);
router.use("/profile", protect, profileRouter);
router.use("/admin", protect, adminRouter);

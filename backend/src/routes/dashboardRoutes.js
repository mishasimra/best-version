import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController.js";

export const router = Router();

router.get("/", getDashboard);

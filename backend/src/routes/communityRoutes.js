import { Router } from "express";
import { followUser, getCommunity } from "../controllers/communityController.js";

export const router = Router();

router.get("/", getCommunity);
router.post("/follow/:userId", followUser);

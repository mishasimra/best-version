import { Router } from "express";
import { followUser, getCommunity, unfollowUser } from "../controllers/communityController.js";

export const router = Router();

router.get("/", getCommunity);
router.post("/follow/:userId", followUser);
router.delete("/follow/:userId", unfollowUser);

import { Router } from "express";
import {
  forgotPassword,
  getAuthOptions,
  getCurrentUser,
  login,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validate.js";
import {
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  resetPasswordValidator,
} from "../validators/authValidators.js";

export const router = Router();

router.get("/options", getAuthOptions);
router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.post("/forgot-password", forgotPasswordValidator, validateRequest, forgotPassword);
router.post("/reset-password", resetPasswordValidator, validateRequest, resetPassword);
router.get("/me", protect, getCurrentUser);

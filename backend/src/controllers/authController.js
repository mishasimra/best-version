import crypto from "crypto";
import { User } from "../models/User.js";
import { Wallet } from "../models/Wallet.js";
import { Portfolio } from "../models/Portfolio.js";
import { Resume } from "../models/Resume.js";
import { Notification } from "../models/Notification.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";
import { signToken } from "../utils/tokens.js";
import { buildAuthPlaceholders } from "../services/authService.js";

function buildAuthPayload(user) {
  return {
    token: signToken({ userId: user._id }),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      headline: user.headline,
      stats: user.stats,
      preferences: user.preferences,
    },
    integrations: buildAuthPlaceholders(),
  };
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "student",
    headline: "Building my best version, one milestone at a time.",
    location: "Remote",
    strengths: ["Curiosity", "Consistency"],
    skills: ["Communication", "Problem Solving"],
    interests: ["Career Growth", "Real Projects"],
    badges: ["Fresh Start"],
    stats: {
      xp: 120,
      streak: 1,
      completedCourses: 0,
      projectsBuilt: 0,
      competitionWins: 0,
      earnings: 0,
    },
  });

  await Promise.all([
    Wallet.create({ user: user._id, balance: 0, pending: 0, transactions: [] }),
    Portfolio.create({
      user: user._id,
      summary: "A growing body of work that shows momentum, grit, and hands-on learning.",
      featuredProjects: [],
      links: [],
    }),
    Resume.create({
      user: user._id,
      headline: "Aspiring builder creating proof of work through projects and competitions.",
      experience: [],
      education: [],
      achievements: [],
      resumeUrl: "",
    }),
    Notification.create({
      user: user._id,
      title: "Welcome to Best Version",
      body: "Start with the skill assessment to unlock personalized recommendations.",
      type: "success",
      ctaLabel: "Take assessment",
      ctaPath: "/assessment",
    }),
  ]);

  return sendResponse(res, {
    statusCode: 201,
    message: "Account created successfully",
    data: buildAuthPayload(user),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return sendResponse(res, {
    message: "Login successful",
    data: buildAuthPayload(user),
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return sendResponse(res, {
    message: "Current user fetched",
    data: {
      user: req.user,
      integrations: buildAuthPlaceholders(),
    },
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    user.resetPasswordToken = crypto.randomBytes(16).toString("hex");
    user.resetPasswordExpiresAt = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();
  }

  return sendResponse(res, {
    message: "If that email exists, a reset token has been generated for local development.",
    data: {
      resetToken: user?.resetPasswordToken || null,
    },
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError(400, "Reset token is invalid or expired");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();

  return sendResponse(res, {
    message: "Password reset successful",
    data: buildAuthPayload(user),
  });
});

export const getAuthOptions = asyncHandler(async (_req, res) => {
  return sendResponse(res, {
    message: "Auth options fetched",
    data: buildAuthPlaceholders(),
  });
});

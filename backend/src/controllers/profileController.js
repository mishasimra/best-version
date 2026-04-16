import { Notification } from "../models/Notification.js";
import { Portfolio } from "../models/Portfolio.js";
import { Resume } from "../models/Resume.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";

export const getProfile = asyncHandler(async (req, res) => {
  const [portfolio, resume, notifications] = await Promise.all([
    Portfolio.findOne({ user: req.user._id }),
    Resume.findOne({ user: req.user._id }),
    Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20),
  ]);

  return sendResponse(res, {
    message: "Profile fetched",
    data: {
      user: req.user,
      portfolio,
      resume,
      notifications,
    },
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ["name", "headline", "bio", "location", "skills", "interests", "socialLinks", "avatar"];
  const update = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowedFields.includes(key)));
  const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select("-password");

  if (req.body.portfolio) {
    await Portfolio.findOneAndUpdate({ user: req.user._id }, req.body.portfolio, { new: true, upsert: true });
  }

  if (req.body.resume) {
    await Resume.findOneAndUpdate({ user: req.user._id }, req.body.resume, { new: true, upsert: true });
  }

  return sendResponse(res, {
    message: "Profile updated",
    data: user,
  });
});

export const getSettings = asyncHandler(async (req, res) => {
  return sendResponse(res, {
    message: "Settings fetched",
    data: req.user.preferences,
  });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { preferences: { ...req.user.preferences, ...req.body } },
    { new: true }
  ).select("-password");

  return sendResponse(res, {
    message: "Settings updated",
    data: user.preferences,
  });
});

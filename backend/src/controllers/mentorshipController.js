import { Mentor } from "../models/Mentor.js";
import { MentorshipRequest } from "../models/MentorshipRequest.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";

export const getMentors = asyncHandler(async (_req, res) => {
  const mentors = await Mentor.find().populate("user").sort({ featured: -1, createdAt: -1 });
  return sendResponse(res, {
    message: "Mentors fetched",
    data: mentors,
  });
});

export const getMentorById = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.mentorId).populate("user");
  if (!mentor) {
    throw new ApiError(404, "Mentor not found");
  }
  return sendResponse(res, {
    message: "Mentor details fetched",
    data: mentor,
  });
});

export const requestMentorship = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.mentorId);
  if (!mentor) {
    throw new ApiError(404, "Mentor not found");
  }

  const request = await MentorshipRequest.create({
    mentor: mentor._id,
    user: req.user._id,
    message: req.body.message,
    goals: req.body.goals || [],
    preferredSlot: req.body.preferredSlot,
  });

  return sendResponse(res, {
    statusCode: 201,
    message: "Mentorship request sent",
    data: request,
  });
});

export const getMyMentorshipRequests = asyncHandler(async (req, res) => {
  const requests = await MentorshipRequest.find({ user: req.user._id }).populate({
    path: "mentor",
    populate: { path: "user", select: "name avatar headline" },
  });

  return sendResponse(res, {
    message: "Mentorship requests fetched",
    data: requests,
  });
});

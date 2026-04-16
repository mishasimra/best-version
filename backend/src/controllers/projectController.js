import { Project } from "../models/Project.js";
import { Submission } from "../models/Submission.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id }).sort({ updatedAt: -1 });
  return sendResponse(res, {
    message: "Projects fetched",
    data: projects,
  });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create({
    ...req.body,
    user: req.user._id,
  });

  await User.findByIdAndUpdate(req.user._id, { $inc: { "stats.projectsBuilt": 1, "stats.xp": 40 } });

  return sendResponse(res, {
    statusCode: 201,
    message: "Project created",
    data: project,
  });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.projectId, user: req.user._id },
    req.body,
    { new: true }
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return sendResponse(res, {
    message: "Project updated",
    data: project,
  });
});

export const submitProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, user: req.user._id });
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const submission = await Submission.create({
    project: project._id,
    user: req.user._id,
    notes: req.body.notes,
    submissionUrl: req.body.submissionUrl,
  });

  project.status = "submitted";
  project.completion = 100;
  await project.save();

  return sendResponse(res, {
    statusCode: 201,
    message: "Project submitted",
    data: submission,
  });
});

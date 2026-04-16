import { Application } from "../models/Application.js";
import { Competition } from "../models/Competition.js";
import { FreelanceJob } from "../models/FreelanceJob.js";
import { LeaderboardEntry } from "../models/LeaderboardEntry.js";
import { StartupIdea } from "../models/StartupIdea.js";
import { Wallet } from "../models/Wallet.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";

export const getFreelanceJobs = asyncHandler(async (req, res) => {
  const { q, type = "freelance" } = req.query;
  const filter = { status: "open" };

  if (type !== "all") {
    filter.type = type;
  }
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { company: { $regex: q, $options: "i" } },
      { skills: { $regex: q, $options: "i" } },
    ];
  }

  const jobs = await FreelanceJob.find(filter).sort({ createdAt: -1 });
  const applications = await Application.find({ user: req.user._id }).select("job status");
  const appMap = new Map(applications.map((item) => [item.job.toString(), item.status]));

  return sendResponse(res, {
    message: "Opportunities fetched",
    data: jobs.map((job) => ({ ...job.toObject(), applicationStatus: appMap.get(job._id.toString()) || null })),
  });
});

export const getFreelanceJobById = asyncHandler(async (req, res) => {
  const job = await FreelanceJob.findById(req.params.jobId);
  if (!job) {
    throw new ApiError(404, "Opportunity not found");
  }
  return sendResponse(res, { message: "Opportunity details fetched", data: job });
});

export const applyToJob = asyncHandler(async (req, res) => {
  const job = await FreelanceJob.findById(req.params.jobId);
  if (!job) {
    throw new ApiError(404, "Opportunity not found");
  }

  const application = await Application.findOneAndUpdate(
    { user: req.user._id, job: job._id },
    {
      proposal: req.body.proposal,
      bidAmount: req.body.bidAmount || "",
      portfolioLink: req.body.portfolioLink || "",
      status: "applied",
    },
    { new: true, upsert: true }
  );

  return sendResponse(res, {
    statusCode: 201,
    message: "Application submitted",
    data: application,
  });
});

export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ user: req.user._id }).populate("job").sort({ createdAt: -1 });
  const wallet = await Wallet.findOne({ user: req.user._id });

  return sendResponse(res, {
    message: "Applications fetched",
    data: {
      applications,
      wallet,
    },
  });
});

export const getCompetitions = asyncHandler(async (_req, res) => {
  const competitions = await Competition.find().sort({ deadline: 1 });
  return sendResponse(res, {
    message: "Competitions fetched",
    data: competitions,
  });
});

export const joinCompetition = asyncHandler(async (req, res) => {
  const competition = await Competition.findById(req.params.competitionId);
  if (!competition) {
    throw new ApiError(404, "Competition not found");
  }

  if (!competition.participants.some((participant) => participant.toString() === req.user._id.toString())) {
    competition.participants.push(req.user._id);
    await competition.save();
  }

  return sendResponse(res, {
    message: "Competition joined",
    data: competition,
  });
});

export const getLeaderboard = asyncHandler(async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate("user").sort({ rank: 1 });
  return sendResponse(res, {
    message: "Leaderboard fetched",
    data: leaderboard,
  });
});

export const getCareerOpportunities = asyncHandler(async (_req, res) => {
  const jobs = await FreelanceJob.find({ status: "open", type: { $in: ["job", "internship"] } }).sort({ createdAt: -1 });
  return sendResponse(res, {
    message: "Career opportunities fetched",
    data: jobs,
  });
});

export const getStartupIdeas = asyncHandler(async (_req, res) => {
  const ideas = await StartupIdea.find().sort({ createdAt: -1 });
  return sendResponse(res, {
    message: "Startup ideas fetched",
    data: ideas,
  });
});

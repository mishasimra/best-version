import { Competition } from "../models/Competition.js";
import { Course } from "../models/Course.js";
import { FreelanceJob } from "../models/FreelanceJob.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";

export const getAdminSummary = asyncHandler(async (_req, res) => {
  const [users, courses, competitions, jobs] = await Promise.all([
    User.find().select("name email role createdAt").sort({ createdAt: -1 }).limit(10),
    Course.find().select("title category level studentsCount featured").sort({ createdAt: -1 }).limit(10),
    Competition.find().select("title status prize deadline").sort({ deadline: 1 }).limit(10),
    FreelanceJob.find().select("title company type status deadline").sort({ createdAt: -1 }).limit(10),
  ]);

  return sendResponse(res, {
    message: "Admin summary fetched",
    data: {
      users,
      courses,
      competitions,
      jobs,
    },
  });
});

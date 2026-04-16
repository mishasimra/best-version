import { Course } from "../models/Course.js";
import { Competition } from "../models/Competition.js";
import { Enrollment } from "../models/Enrollment.js";
import { FreelanceJob } from "../models/FreelanceJob.js";
import { Mentor } from "../models/Mentor.js";
import { Notification } from "../models/Notification.js";
import { Project } from "../models/Project.js";
import { Wallet } from "../models/Wallet.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const [enrollments, projects, competitions, jobs, mentors, notifications, wallet, featuredCourses] = await Promise.all([
    Enrollment.find({ user: req.user._id }).populate("course").sort({ updatedAt: -1 }).limit(3),
    Project.find({ user: req.user._id }).sort({ updatedAt: -1 }).limit(3),
    Competition.find().sort({ deadline: 1 }).limit(3),
    FreelanceJob.find({ status: "open", type: { $in: ["freelance", "job", "internship"] } }).limit(4),
    Mentor.find().populate("user").sort({ featured: -1, createdAt: -1 }).limit(4),
    Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5),
    Wallet.findOne({ user: req.user._id }),
    Course.find({ featured: true }).limit(3),
  ]);

  return sendResponse(res, {
    message: "Dashboard data fetched",
    data: {
      welcome: {
        name: req.user.name,
        headline: req.user.headline,
      },
      progressOverview: {
        xp: req.user.stats?.xp || 0,
        streak: req.user.stats?.streak || 0,
        completedCourses: req.user.stats?.completedCourses || 0,
        projectsBuilt: req.user.stats?.projectsBuilt || 0,
        competitionWins: req.user.stats?.competitionWins || 0,
      },
      recommendations: [
        {
          title: "Ship a portfolio-ready mini product this week",
          subtitle: "Your profile shows strong momentum in project-based learning.",
          actionPath: "/projects",
        },
        {
          title: "Join one live competition",
          subtitle: "Competitions are the fastest way to earn visibility and proof of work.",
          actionPath: "/competitions",
        },
        {
          title: "Book a mentor session",
          subtitle: "Mentors can help convert your strengths into a sharper next-step plan.",
          actionPath: "/mentorship",
        },
      ],
      activeCourses: enrollments,
      activeProjects: projects,
      competitions,
      gigs: jobs,
      mentors,
      notifications,
      wallet,
      featuredCourses,
    },
  });
});

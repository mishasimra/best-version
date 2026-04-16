import { Course } from "../models/Course.js";
import { Enrollment } from "../models/Enrollment.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";

export const getCourses = asyncHandler(async (req, res) => {
  const { q, category, level, sort = "featured" } = req.query;
  const filter = {};

  if (q) {
    filter.$or = [{ title: { $regex: q, $options: "i" } }, { tags: { $regex: q, $options: "i" } }];
  }
  if (category && category !== "all") {
    filter.category = category;
  }
  if (level && level !== "all") {
    filter.level = level;
  }

  let query = Course.find(filter);
  if (sort === "rating") query = query.sort({ rating: -1 });
  else if (sort === "students") query = query.sort({ studentsCount: -1 });
  else query = query.sort({ featured: -1, createdAt: -1 });

  const courses = await query;
  const enrollments = await Enrollment.find({ user: req.user._id }).select("course progress status");
  const enrollmentMap = new Map(enrollments.map((item) => [item.course.toString(), item]));

  return sendResponse(res, {
    message: "Courses fetched",
    data: courses.map((course) => ({
      ...course.toObject(),
      enrollment: enrollmentMap.get(course._id.toString()) || null,
    })),
  });
});

export const getCourseDetails = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const enrollment = await Enrollment.findOne({ user: req.user._id, course: course._id });
  return sendResponse(res, {
    message: "Course details fetched",
    data: { ...course.toObject(), enrollment },
  });
});

export const enrollInCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const existing = await Enrollment.findOne({ user: req.user._id, course: course._id });
  if (existing) {
    return sendResponse(res, {
      message: "Already enrolled",
      data: existing,
    });
  }

  const enrollment = await Enrollment.create({
    user: req.user._id,
    course: course._id,
    lastAccessedAt: new Date(),
  });

  return sendResponse(res, {
    statusCode: 201,
    message: "Enrolled successfully",
    data: enrollment,
  });
});

export const updateCourseProgress = asyncHandler(async (req, res) => {
  const { progress, completedLessons = [] } = req.body;
  const enrollment = await Enrollment.findOne({
    user: req.user._id,
    course: req.params.courseId,
  });

  if (!enrollment) {
    throw new ApiError(404, "Enrollment not found");
  }

  const wasCompleted = enrollment.status === "completed";
  enrollment.progress = Math.max(0, Math.min(100, Number(progress || 0)));
  enrollment.completedLessons = completedLessons;
  enrollment.lastAccessedAt = new Date();
  enrollment.status = enrollment.progress >= 100 ? "completed" : "active";
  await enrollment.save();

  if (!wasCompleted && enrollment.status === "completed") {
    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        "stats.completedCourses": 1,
        "stats.xp": 80,
      },
    });
  }

  return sendResponse(res, {
    message: "Course progress updated",
    data: enrollment,
  });
});

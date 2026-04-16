import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: String,
    durationMinutes: Number,
    completedByDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: String,
    level: String,
    durationHours: Number,
    rating: Number,
    studentsCount: Number,
    instructorName: String,
    instructorRole: String,
    description: String,
    outcomes: [String],
    tags: [String],
    coverImage: String,
    lessons: [lessonSchema],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);

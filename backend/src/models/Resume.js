import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    headline: String,
    experience: [String],
    education: [String],
    achievements: [String],
    resumeUrl: String,
  },
  { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);

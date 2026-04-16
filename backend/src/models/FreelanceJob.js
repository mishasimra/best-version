import mongoose from "mongoose";

const freelanceJobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: String,
    type: { type: String, enum: ["freelance", "internship", "job"], default: "freelance" },
    location: String,
    remote: { type: Boolean, default: true },
    budget: String,
    experienceLevel: String,
    description: String,
    skills: [String],
    status: { type: String, enum: ["open", "closed"], default: "open" },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deadline: Date,
  },
  { timestamps: true }
);

export const FreelanceJob = mongoose.model("FreelanceJob", freelanceJobSchema);

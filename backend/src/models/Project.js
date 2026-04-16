import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema(
  {
    title: String,
    status: { type: String, enum: ["todo", "active", "done"], default: "todo" },
    dueDate: Date,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    brief: String,
    description: String,
    category: String,
    status: { type: String, enum: ["planning", "building", "submitted", "completed"], default: "planning" },
    tags: [String],
    milestones: [milestoneSchema],
    completion: { type: Number, default: 0 },
    repoUrl: String,
    liveUrl: String,
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);

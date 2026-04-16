import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "FreelanceJob", required: true },
    proposal: String,
    bidAmount: String,
    portfolioLink: String,
    status: { type: String, enum: ["applied", "reviewing", "shortlisted", "accepted", "rejected"], default: "applied" },
  },
  { timestamps: true }
);

applicationSchema.index({ user: 1, job: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);

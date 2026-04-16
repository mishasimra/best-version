import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    notes: String,
    submissionUrl: String,
    score: Number,
    feedback: String,
    status: { type: String, enum: ["pending", "reviewed"], default: "pending" },
  },
  { timestamps: true }
);

export const Submission = mongoose.model("Submission", submissionSchema);

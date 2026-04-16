import mongoose from "mongoose";

const mentorshipRequestSchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: String,
    goals: [String],
    status: { type: String, enum: ["requested", "accepted", "declined"], default: "requested" },
    preferredSlot: String,
  },
  { timestamps: true }
);

export const MentorshipRequest = mongoose.model("MentorshipRequest", mentorshipRequestSchema);

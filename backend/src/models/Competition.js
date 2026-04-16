import mongoose from "mongoose";

const competitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    host: String,
    description: String,
    category: String,
    prize: String,
    deadline: Date,
    startDate: Date,
    status: { type: String, enum: ["active", "upcoming", "past"], default: "active" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    rules: [String],
    coverImage: String,
  },
  { timestamps: true }
);

export const Competition = mongoose.model("Competition", competitionSchema);

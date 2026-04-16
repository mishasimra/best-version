import mongoose from "mongoose";

const leaderboardEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    points: Number,
    achievements: Number,
    competitionWins: Number,
    skillGrowth: Number,
    earnings: Number,
    rank: Number,
  },
  { timestamps: true }
);

export const LeaderboardEntry = mongoose.model("LeaderboardEntry", leaderboardEntrySchema);

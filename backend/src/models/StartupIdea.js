import mongoose from "mongoose";

const startupIdeaSchema = new mongoose.Schema(
  {
    title: String,
    sector: String,
    summary: String,
    lookingFor: [String],
    stage: String,
    postedByName: String,
    traction: String,
  },
  { timestamps: true }
);

export const StartupIdea = mongoose.model("StartupIdea", startupIdeaSchema);

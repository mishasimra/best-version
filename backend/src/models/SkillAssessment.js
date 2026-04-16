import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: String,
    prompt: String,
    category: String,
    answer: String,
    score: Number,
  },
  { _id: false }
);

const recommendationSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    reason: String,
  },
  { _id: false }
);

const skillAssessmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answers: [answerSchema],
    categoryScores: {
      technical: { type: Number, default: 0 },
      creative: { type: Number, default: 0 },
      leadership: { type: Number, default: 0 },
      analytical: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
    },
    topStrengths: [String],
    recommendations: [recommendationSchema],
    summary: String,
  },
  { timestamps: true }
);

export const SkillAssessment = mongoose.model("SkillAssessment", skillAssessmentSchema);

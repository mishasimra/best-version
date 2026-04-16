import mongoose from "mongoose";

const portfolioItemSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    link: String,
    tech: [String],
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    summary: String,
    featuredProjects: [portfolioItemSchema],
    links: [String],
  },
  { timestamps: true }
);

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);

import mongoose from "mongoose";

const feedPostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: String,
    tags: [String],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FeedPost = mongoose.model("FeedPost", feedPostSchema);

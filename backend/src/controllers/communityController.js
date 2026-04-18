import { Connection } from "../models/Connection.js";
import { FeedPost } from "../models/FeedPost.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";

export const getCommunity = asyncHandler(async (req, res) => {
  const [people, feed, connections] = await Promise.all([
    User.find({ _id: { $ne: req.user._id } }).select("-password").sort({ "stats.xp": -1 }).limit(12),
    FeedPost.find().populate("author", "name avatar headline").sort({ createdAt: -1 }).limit(10),
    Connection.find({ follower: req.user._id }),
  ]);

  const followingSet = new Set(connections.map((item) => item.following.toString()));

  return sendResponse(res, {
    message: "Community data fetched",
    data: {
      people: people.map((person) => ({
        ...person.toObject(),
        isFollowing: followingSet.has(person._id.toString()),
      })),
      feed,
      prompts: [
        "Find someone to co-build a portfolio project this month.",
        "Follow three people in the path you want to grow into.",
        "Share a weekly win to keep your momentum visible.",
      ],
    },
  });
});

export const followUser = asyncHandler(async (req, res) => {
  const connection = await Connection.findOneAndUpdate(
    { follower: req.user._id, following: req.params.userId },
    {},
    { new: true, upsert: true }
  );

  return sendResponse(res, {
    statusCode: 201,
    message: "Connection saved",
    data: connection,
  });
});

export const unfollowUser = asyncHandler(async (req, res) => {
  await Connection.findOneAndDelete({
    follower: req.user._id,
    following: req.params.userId,
  });

  return sendResponse(res, {
    message: "Connection removed",
    data: { following: req.params.userId, isFollowing: false },
  });
});

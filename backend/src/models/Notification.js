import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    body: String,
    type: { type: String, enum: ["info", "success", "warning"], default: "info" },
    read: { type: Boolean, default: false },
    ctaLabel: String,
    ctaPath: String,
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);

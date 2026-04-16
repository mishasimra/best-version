import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    label: String,
    amount: Number,
    type: { type: String, enum: ["credit", "debit"], default: "credit" },
    occurredAt: Date,
  },
  { _id: false }
);

const walletSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    balance: { type: Number, default: 0 },
    pending: { type: Number, default: 0 },
    transactions: [transactionSchema],
  },
  { timestamps: true }
);

export const Wallet = mongoose.model("Wallet", walletSchema);

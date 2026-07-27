import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chatroom",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },

    // -- Moderation Additions --
    status: {
      type: String,
      enum: ["approved", "pending", "flagged"],
      default: "pending",
      index: true,
    },
    moderationDetails: {
      flaggedCategories: [{ type: String }],
      score: { type: Number },
      reviewedAt: { type: Date },
    },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

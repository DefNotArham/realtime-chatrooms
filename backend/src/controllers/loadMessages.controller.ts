import type { Request, Response } from "express";
import Message from "../models/messsage.model.js";

const loadMessagesController = async (
  req: Request<{}, {}, { roomId: string }>,
  res: Response,
) => {
  const { roomId } = req.body;

  try {
    if (!roomId) {
      return res.status(400).json({
        success: false,
        message: "Room Id required",
      });
    }

    // 1. Fetch ALL messages for the room (including flagged)
    const messages = await Message.find({ roomId })
      .populate("userId", "username")
      .sort({ createdAt: 1 });

    // 2. Sanitize content if flagged
    const formattedMessages = messages.map((msg) => {
      const isFlagged = msg.status === "flagged";

      return {
        _id: msg._id.toString(),
        message: isFlagged
          ? "[This message was removed by automated moderation]"
          : msg.content,
        username: (msg.userId as any).username,
        userId: (msg.userId as any)._id.toString(),
        status: msg.status, // Pass status along so frontend knows if it's flagged
      };
    });

    return res.status(200).json({
      success: true,
      messages: formattedMessages,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default loadMessagesController;

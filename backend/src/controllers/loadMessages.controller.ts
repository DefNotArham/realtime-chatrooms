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

    const messages = await Message.find({ roomId })
      .populate("userId", "username")
      .sort({ createdAt: 1 });

    const formattedMessages = messages.map((msg) => ({
      _id: msg._id.toString(),
      message: msg.content,
      username: (msg.userId as any).username,
      userId: (msg.userId as any)._id.toString(),
    }));

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

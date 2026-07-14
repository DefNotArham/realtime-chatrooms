import type { Request, Response } from "express";
import Chatroom from "../models/chatroom.model.js";
import User from "../models/user.model.js";
import Message from "../models/messsage.model.js";

type MessageType = {
  roomId: string;
  clientId: string;
  message: string;
};

const sendMessageController = async (
  req: Request<{}, {}, MessageType>,
  res: Response,
) => {
  const { roomId, clientId, message } = req.body;
  try {
    if (!roomId)
      return res
        .status(404)
        .json({ success: false, message: "Room Id not found" });

    if (!clientId)
      return res
        .status(404)
        .json({ success: false, message: "Client Id not found" });

    const room = await Chatroom.findById(roomId);

    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });

    const user = await User.findOne({ clientId });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const newMessage = await Message.create({
      roomId,
      userId: user._id,
      content: message,
    });

    res.status(200).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default sendMessageController;

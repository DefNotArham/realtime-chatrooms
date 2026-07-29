import Chatroom from "../models/chatroom.model.js";
import User from "../models/user.model.js";
import Message from "../models/messsage.model.js";

import type { Request, Response } from "express";
import { checkInappropriateText } from "../services/moderation.service.js";

type RoomType = {
  username: string;
  clientId: string;
  roomName: string;
  roomDescription: string;
};

const createChatroomController = async (
  req: Request<{}, {}, RoomType>,
  res: Response,
) => {
  const { clientId, roomName, roomDescription } = req.body;

  try {
    if (!clientId)
      return res
        .status(404)
        .json({ success: false, message: "Client Id not found" });

    if (!roomName)
      return res
        .status(400)
        .json({ success: false, message: "Please enter a room name" });

    const user = await User.findOne({ clientId });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isNameFlagged = await checkInappropriateText(roomName, "room name");
    if (isNameFlagged) {
      return res.status(400).json({
        success: false,
        message:
          "Room name contains inappropriate language. Please choose another name.",
      });
    }

    if (roomDescription) {
      const isDescFlagged = await checkInappropriateText(
        roomDescription,
        "room description",
      );
      if (isDescFlagged) {
        return res.status(400).json({
          success: false,
          message:
            "Room description contains inappropriate language. Please modify it.",
        });
      }
    }

    const chatroom = await Chatroom.create({
      name: roomName,
      description: roomDescription,
      owner: user._id,
      members: [user._id],
    });

    user.rooms.push(chatroom._id);
    await user.save();

    return res.status(201).json({ success: true, chatroom });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default createChatroomController;

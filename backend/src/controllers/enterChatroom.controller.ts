import type { Request, Response } from "express";

import User from "../models/user.model.js";
import Chatroom from "../models/chatroom.model.js";

import { getIO } from "../socket/socket.io.js";
import { checkInappropriateText } from "../services/moderation.service.js";

type EnterChatroomType = {
  clientId: string;
  username: string;
  roomId: string;
};

const enterChatroomController = async (
  req: Request<{}, {}, EnterChatroomType>,
  res: Response,
) => {
  const { clientId, roomId } = req.body;

  let { username } = req.body;

  try {
    username = username?.trim();

    if (!clientId)
      return res
        .status(404)
        .json({ success: false, message: "Client Id not found" });

    if (!roomId)
      return res
        .status(404)
        .json({ success: false, message: "Room Id not found" });

    const room = await Chatroom.findById(roomId);
    const user = await User.findOne({ clientId });

    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!user.username) {
      if (username && username.trim()) {
        const isNameFlagged = await checkInappropriateText(
          username,
          "username",
        );

        if (isNameFlagged) {
          return res.status(400).json({
            success: false,
            message:
              "Username contains inappropriate language. Please choose another username.",
          });
        }

        user.username = username;
      } else {
        user.username = `User-${clientId.slice(0, 4)}`;
      }

      await user.save();
    }

    if (!room.isOnline.some((id) => id.equals(user._id))) {
      room.isOnline.push(user._id);
    }
    await room.save();

    // const io = getIO();

    // io.to(roomId).emit("room-online-updated", {
    //   roomId,
    //   onlineCount: room.isOnline.length,
    // });

    res.status(200).json({ success: true, room });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default enterChatroomController;

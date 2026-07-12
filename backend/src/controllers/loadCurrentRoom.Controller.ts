import type { Request, Response } from "express";

import Chatroom from "../models/chatroom.model.js";
import User from "../models/user.model.js";

type RoomType = {
  roomId: string;
  clientId: string;
};

const loadCurrentRoomController = async (
  req: Request<{}, {}, RoomType>,
  res: Response,
) => {
  const { roomId, clientId } = req.body;
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
    const user = await User.findOne({ clientId });

    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!room.members.some((id) => id.equals(user._id)))
      return res.status(403).json({
        success: false,
        message: "You are not a member of this room",
      });

    res.status(200).json({ success: true, room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Sever error" });
  }
};

export default loadCurrentRoomController;

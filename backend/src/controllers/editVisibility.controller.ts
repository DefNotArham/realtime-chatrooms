import type { Request, Response } from "express";
import Chatroom from "../models/chatroom.model.js";
import User from "../models/user.model.js";

type EditVisibilityType = {
    clientId: string;
    roomId: string;
    isPublic: boolean;
}

const editVisibilityController = async (
  req: Request<{}, {}, EditVisibilityType>,
  res: Response,
) => {
  const { clientId, roomId, isPublic } = req.body;

  try {
    if (!clientId)
      return res
        .status(404)
        .json({ success: false, message: "Client Id not found" });

    if (!roomId)
      return res
        .status(400)
        .json({ success: false, message: "Room Id not found" });

    if (typeof isPublic !== "boolean")
      return res
        .status(400)
        .json({ success: false, message: "IsPublic not found" });

    const chatroom = await Chatroom.findById(roomId);

    if (!chatroom)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });

    const user = await User.findOne({ clientId });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!chatroom.owner.equals(user._id)) {
      return res
        .status(403)
        .json({ success: false, code: "NOT_OWNER", message: "You are not the owner of this room" });
    }

    chatroom.isPublic = isPublic;
    await chatroom.save();

    return res.status(200).json({ success: true, chatroom });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default editVisibilityController;
import type { Request, Response } from "express";
import User from "../models/user.model.js";

type PinRoomType = {
  clientId: string;
  roomId: string;
  isPinned: boolean;
};

const pinRoomController = async (
  req: Request<{}, {}, PinRoomType>,
  res: Response,
) => {
  const { clientId, roomId, isPinned } = req.body;

  try {
    if (!clientId)
      return res.status(404).json({ success: false, message: "Client Id not found" });

    if (!roomId)
      return res.status(400).json({ success: false, message: "Room Id not found" });

    if (typeof isPinned !== "boolean")
      return res.status(400).json({ success: false, message: "isPinned not found" });

    const user = await User.findOne({ clientId });

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const isMember = user.rooms.some((id) => id.equals(roomId));
    if (!isMember)
      return res.status(403).json({ success: false, message: "You are not a member of this room" });

    if (isPinned) {
      if (!user.pinnedRooms.some((id) => id.equals(roomId))) {
        user.pinnedRooms.push(roomId as any);
      }
    } else {
      user.pinnedRooms = user.pinnedRooms.filter((id) => !id.equals(roomId)) as any;
    }

    await user.save();

    return res.status(200).json({ success: true, pinnedRooms: user.pinnedRooms });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default pinRoomController;
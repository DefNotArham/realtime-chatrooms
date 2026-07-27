import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import Chatroom from "../models/chatroom.model.js";
import User from "../models/user.model.js";

// Server-to-Client payload types
export interface ServerToClientEvents {
  "new-message": (data: {
    _id: string;
    message: string;
    username: string | null | undefined;
    userId: string;
    ownerId: string;
    status: "pending" | "approved" | "flagged";
  }) => void;
  "message-flagged": (data: { messageId: string; roomId: string }) => void;
  "message-approved": (data: { messageId: string; roomId: string }) => void;
  "room-online-updated": (data: {
    roomId: string;
    onlineCount: number;
  }) => void;
}

// Client-to-Server payload types
export interface ClientToServerEvents {
  "join-room": (data: { roomId: string; clientId: string }) => void;
  "leave-room": (data: { roomId: string; clientId: string }) => void;
}

let io: Server<ClientToServerEvents, ServerToClientEvents>;

export const initSocket = (httpServer: HttpServer, corsOrigin: string) => {
  io = new Server(httpServer, {
    cors: {
      origin: corsOrigin,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-room", async ({ roomId, clientId }) => {
      socket.join(roomId);

      const room = await Chatroom.findById(roomId);

      if (!room) return;

      console.log("ONLINE USERS:", room.isOnline.length);

      io.to(roomId).emit("room-online-updated", {
        roomId,
        onlineCount: room.isOnline.length,
      });

      console.log(`User joined ${roomId}`);
    });
    socket.on("leave-room", async ({ roomId, clientId }) => {
      const room = await Chatroom.findById(roomId);
      const user = await User.findOne({ clientId });

      if (!room || !user) return;

      room.isOnline = room.isOnline.filter((id) => !id.equals(user._id));

      await room.save();

      const io = getIO();

      io.to(roomId).emit("room-online-updated", {
        roomId,
        onlineCount: room.isOnline.length,
      });

      socket.leave(roomId);

      console.log(`User left ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized yet — call initSocket first");
  }
  return io;
};

import OpenAI from "openai";
import Message from "../models/messsage.model.js";
import { getIO } from "../socket/socket.io.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Asynchronously moderates a message in the background.
 * Updates MongoDB status and emits Socket.io events when complete.
 */

export const moderateMessageAsync = async (
  messageId: string,
  content: string,
  roomId: string,
): Promise<void> => {
  try {
    const response = await openai.moderations.create({
      model: "omni-moderation-latest",
      input: content,
    });

    const isFlagged = response.results[0]?.flagged;

    if (isFlagged) {
      await Message.findByIdAndUpdate(messageId, { status: "flagged" });

      getIO().to(roomId).emit("message-flagged", {
        messageId,
        roomId,
      });
    } else {
      await Message.findByIdAndUpdate(messageId, { status: "approved" });

      getIO().to(roomId).emit("message-approved", {
        messageId,
        roomId,
      });
    }
  } catch (error) {
    console.error(`Moderation failed for message ${messageId}:`, error);
  }
};

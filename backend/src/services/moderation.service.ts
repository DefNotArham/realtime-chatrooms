import { GoogleGenAI, Type } from "@google/genai";
import Message from "../models/messsage.model.js";
import { getIO } from "../socket/socket.io.js";

const ai = new GoogleGenAI({});

export const moderateMessageAsync = async (
  messageId: string,
  content: string,
  roomId: string,
): Promise<void> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `Analyze if this chat message contains hate speech, extreme profanity, severe harassment, swear words or explicit violence: "${content}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isFlagged: {
              type: Type.BOOLEAN,
              description:
                "Set to true if the message contains toxic or inappropriate content.",
            },
          },
          required: ["isFlagged"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    const isFlagged = Boolean(result.isFlagged);

    if (isFlagged) {
      await Message.findByIdAndUpdate(messageId, { status: "flagged" });
      getIO().to(roomId).emit("message-flagged", { messageId, roomId });
    } else {
      await Message.findByIdAndUpdate(messageId, { status: "approved" });
      getIO().to(roomId).emit("message-approved", { messageId, roomId });
    }
  } catch (error) {
    console.error(`Gemini moderation failed for message ${messageId}:`, error);

    // Fallback: approve message if API call fails
    await Message.findByIdAndUpdate(messageId, { status: "approved" });
    getIO().to(roomId).emit("message-approved", { messageId, roomId });
  }
};

/**
 * Synchronously checks if user-provided text (username, room name, description) is toxic.
 * Returns true if flagged, false if clean.
 */
export const checkInappropriateText = async (
  text: string,
  type: "username" | "room name" | "room description",
): Promise<boolean> => {
  // Don't waste API calls on empty optional fields
  if (!text || !text.trim()) return false;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `Analyze if this ${type} contains offensive language, slurs, explicit content, hate speech, or extreme profanity: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isFlagged: {
              type: Type.BOOLEAN,
              description: "Set to true if content is toxic or inappropriate.",
            },
          },
          required: ["isFlagged"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return Boolean(result.isFlagged);
  } catch (error) {
    console.error(`Gemini moderation failed for ${type}:`, error);
    // Fallback: allow creation if API fails so creation isn't blocked
    return false;
  }
};

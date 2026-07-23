import { useState } from "react";
import useChatroomStore from "../../stores/chatroom.store";

interface MessageInputProps {
  roomId: string | undefined;
  clientId: string | null;
}

const MessageInput = ({ roomId, clientId }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatroomStore();

  return (
    <footer className="border-t border-neutral-800 p-5">
      <div className="max-w-4xl mx-auto flex gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage(roomId!, clientId!, message);
              setMessage("");
            }
          }}
          type="text"
          placeholder="Type a message..."
          className="
        flex-1
        bg-neutral-900
        border
        border-neutral-800
        rounded-xl
        px-5
        py-3
        text-neutral-100
        placeholder:text-neutral-500
        focus:outline-none
        focus:border-teal-400
        transition
      "
        />

        <button
          onClick={async () => {
            if (!message.trim()) return;
            if (!roomId || !clientId) return;

            const sent = await sendMessage(roomId, clientId, message);

            if (sent) {
              setMessage("");
            }
          }}
          className="
        px-7
        py-3
        rounded-xl
        bg-teal-400
        text-neutral-950
        font-semibold
        hover:bg-teal-300
        active:scale-95
        transition
        cursor-pointer
      "
        >
          Send
        </button>
      </div>
    </footer>
  );
};

export default MessageInput;

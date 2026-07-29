import { useState } from "react";
import useChatroomStore from "../../stores/chatroom.store";
import { useParams } from "react-router";

const Footer = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatroomStore();
  const { roomId } = useParams();

  const clientId = localStorage.getItem("clientId");

  return (
    <footer className="shrink-0 border-t border-neutral-800 p-4 sm:p-5 bg-neutral-950">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
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
          min-w-0
          bg-neutral-900
          border
          border-neutral-800
          rounded-xl
          px-4
          sm:px-5
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
          shrink-0
          px-5
          sm:px-7
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

export default Footer;

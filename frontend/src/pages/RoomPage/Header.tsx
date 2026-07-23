import { useEffect, useState } from "react";
import useChatroomStore from "../../stores/chatroom.store";
import { useNavigate, useParams } from "react-router";
import socket from "../../lib/socket";

const Header = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const navigate = useNavigate();
  const { roomId } = useParams();

  const { currentRoom } = useChatroomStore();

  useEffect(() => {
    socket.on("room-online-updated", (data) => {
      console.log("RECEIVED ONLINE UPDATE:", data);

      if (data.roomId === roomId) {
        setOnlineCount(data.onlineCount);
      }
    });

    return () => {
      socket.off("room-online-updated");
    };
  }, [roomId]);

  return (
    <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
          Live Chat
        </p>

        <h1 className="text-2xl font-semibold mt-1">
          Room name: {currentRoom?.name}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          {onlineCount} Online
        </div>

        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer"
        >
          Leave Room
        </button>
      </div>
    </header>
  );
};

export default Header;

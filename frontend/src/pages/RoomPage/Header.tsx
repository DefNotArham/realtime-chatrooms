import { useNavigate, useParams } from "react-router";
import useChatroomStore from "../../stores/chatroom.store";
import { useEffect, useState } from "react";
import socket from "../../lib/socket";

const Header = () => {
  const [isPublicLoading, setIsPublicLoading] = useState(false);
  const { currentRoom, editVisibility } = useChatroomStore();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [onlineCount, setOnlineCount] = useState(0);

  const clientId = localStorage.getItem("clientId");
  const isPublic = currentRoom?.isPublic ?? false;

  const handleToggleVisibility = async () => {
    if (!roomId || !currentRoom || !clientId) return;

    const newVisibility = !currentRoom.isPublic;
    setIsPublicLoading(true);

    const result = await editVisibility(roomId, clientId, newVisibility);
    setIsPublicLoading(false);

    if (result === "NOT_OWNER") {
      alert("Only the room owner can change visibility");
    } else if (result === null) {
      alert("Failed to change visibility");
    }
  };

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
    <header className="shrink-0 border-b border-neutral-800 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
          Live Chat
        </p>

        <h1 className="text-2xl font-semibold mt-1">
          Room name: {currentRoom?.name}
        </h1>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer select-none">
            <span className="text-xs uppercase tracking-wider">Public</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={handleToggleVisibility}
                disabled={isPublicLoading}
                className="sr-only"
              />
              <div
                className={`w-10 h-6 rounded-full transition-colors ${
                  isPublic ? "bg-teal-400" : "bg-neutral-700"
                } ${isPublicLoading ? "opacity-50" : ""}`}
              />
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  isPublic ? "translate-x-4" : ""
                }`}
              />
            </div>
          </label>
        </div>

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

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import socket from "../lib/socket";

import useChatroomStore from "../stores/chatroom.store";

const RoomPage = () => {
  console.log("ROOM PAGE RENDERED");
  const { roomId } = useParams();
  const clientId = localStorage.getItem("clientId");

  const [onlineCount, setOnlineCount] = useState(0);

  const navigate = useNavigate();

  const { loadCurrentRoom, currentRoom, sendMessage, loadMessages } =
    useChatroomStore();

  const [message, setMessage] = useState("");

  type Message = {
    _id: string;
    message: string;
    username: string;
    userId: string;
  };

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("new-message", (data) => {
      console.log("NEW MESSAGE:", data);

      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("new-message");
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!roomId) return;

      const oldMessages = await loadMessages(roomId);

      if (oldMessages) {
        setMessages(oldMessages);
      }
    };

    fetchMessages();
  }, [roomId]);

  // 1. Start listening first
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

  // 2. Then join the room
  useEffect(() => {
    if (!roomId || !clientId) return;

    if (!socket.connected) {
      socket.connect();
    }

    console.log("JOINING ROOM:", roomId, clientId);

    socket.emit("join-room", {
      roomId,
      clientId,
    });

    return () => {
      socket.emit("leave-room", {
        roomId,
        clientId,
      });
    };
  }, [roomId, clientId]);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!roomId) return;
      if (!clientId) return;

      await loadCurrentRoom(roomId, clientId);
    };

    fetchRoomData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* Header */}
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

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-6">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`max-w-xs mt-2 rounded-xl px-4 py-3 ${
              msg.userId === clientId
                ? "self-end bg-teal-400 text-neutral-950"
                : "self-start bg-neutral-900 border border-neutral-800"
            }`}
          >
            <p
              className={`text-xs mb-1 ${
                msg.userId === clientId ? "text-neutral-800" : "text-amber-400"
              }`}
            >
              {msg.username}
            </p>

            <p>{msg.message}</p>
          </div>
        ))}
      </main>

      {/* Message Input */}
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
    </div>
  );
};

export default RoomPage;

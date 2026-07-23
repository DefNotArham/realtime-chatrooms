import { useEffect, useState } from "react";
import Header from "./Header";
import MessagesList from "./MessagesList";
import { useParams } from "react-router";
import MessageInput from "./MessagesInput";
import socket from "../../lib/socket";
import useChatroomStore from "../../stores/chatroom.store";

type Message = {
  _id: string;
  message: string;
  username: string;
  userId: string;
};

const RoomPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { roomId } = useParams();
  const { loadMessages, loadCurrentRoom } = useChatroomStore();

  const clientId = localStorage.getItem("clientId");

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
  }, [roomId, loadMessages]);

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
  }, [clientId, loadCurrentRoom, roomId]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <Header />

      <MessagesList messages={messages} clientId={clientId} />

      <MessageInput clientId={clientId} roomId={roomId} />
    </div>
  );
};

export default RoomPage;

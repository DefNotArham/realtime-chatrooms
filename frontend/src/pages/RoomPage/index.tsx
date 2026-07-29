import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import MessagesList from "./MessagesList";
import ScrollBottomButton from "./ScrollBottomButton";
import Footer from "./Footer";
import { useParams } from "react-router";
import socket from "../../lib/socket";
import useChatroomStore from "../../stores/chatroom.store";

const RoomPage = () => {
  console.log("ROOM PAGE RENDERED");
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const { roomId } = useParams();
  const { loadCurrentRoom } = useChatroomStore();

  const clientId = localStorage.getItem("clientId");

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
    <div className="h-[100dvh] bg-neutral-950 text-neutral-100 flex flex-col relative py-3 lg:py-0">
      <Header />

      <MessagesList
        mainRef={mainRef}
        setShowScrollBottom={setShowScrollBottom}
      />

      {showScrollBottom && <ScrollBottomButton mainRef={mainRef} />}

      <Footer />
    </div>
  );
};

export default RoomPage;

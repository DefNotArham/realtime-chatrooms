import { FaCrown } from "react-icons/fa";
import useChatroomStore from "../../stores/chatroom.store";
import {
  useEffect,
  useRef,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import socket from "../../lib/socket";
import { useParams } from "react-router";

type MessagesListProps = {
  mainRef: RefObject<HTMLDivElement | null>;
  setShowScrollBottom: Dispatch<SetStateAction<boolean>>;
};

type Message = {
  _id: string;
  message: string;
  username: string;
  userId: string;
  ownerId: string;
  status: "pending" | "approved" | "flagged";
};

const MessagesList = ({ mainRef, setShowScrollBottom }: MessagesListProps) => {
  const {
    messages,
    setMessages,
    loadMessages,
    handleMessageApproved,
    handleMessageFlagged,
  } = useChatroomStore();
  const { roomId } = useParams();

  const clientId = localStorage.getItem("clientId");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isInitialLoad = useRef(true);

  const handleScroll = () => {
    if (!mainRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = mainRef.current;

    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollBottom(!isNearBottom);
  };

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      console.log("NEW MESSAGE:", newMessage);

      setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [setMessages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!roomId) return;

      const oldMessages = await loadMessages(roomId);

      if (oldMessages) {
        setMessages(oldMessages);
      }
    };

    fetchMessages();
  }, [roomId, loadMessages, setMessages]);

  useEffect(() => {
    socket.on("message-flagged", handleMessageFlagged);
    socket.on("message-approved", handleMessageApproved);

    return () => {
      socket.off("message-flagged", handleMessageFlagged);
      socket.off("message-approved", handleMessageApproved);
    };
  }, [roomId, handleMessageFlagged, handleMessageApproved]);

  useEffect(() => {
    if (!mainRef.current || messages.length === 0) return;

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, mainRef]);

  return (
    <main
      ref={mainRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-6 flex flex-col"
    >
      {messages.map((msg) => {
        const isOwner = msg.ownerId === msg.userId;
        const isSelf = msg.userId === clientId;

        // FLAGGED MESSAGE
        if (msg.status === "flagged") {
          return (
            <div
              key={msg._id}
              className={`w-full max-w-sm mt-2 rounded-xl px-4 py-3 bg-red-950/40 border border-red-500/30 ${
                isSelf ? "self-end" : "self-start"
              }`}
            >
              <p
                className={`text-xs mb-1 ${
                  isSelf ? "text-red-300" : "text-amber-600"
                }`}
              >
                {isOwner && (
                  <FaCrown className="w-4 h-4 mr-1 inline text-amber-500" />
                )}
                {msg.username}
              </p>

              <p className="text-red-400 italic text-xs">
                [This message was removed by automated moderation]
              </p>
            </div>
          );
        }

        // REGULAR MESSAGE
        return (
          <div
            key={msg._id}
            className={`w-full max-w-sm mt-2 rounded-xl px-4 py-3 ${
              isSelf
                ? "self-end bg-teal-400 text-neutral-950"
                : "self-start bg-neutral-900 border border-neutral-800"
            }`}
          >
            <p
              className={`text-xs mb-1 ${
                isSelf ? "text-neutral-800" : "text-amber-400"
              }`}
            >
              {isOwner && (
                <FaCrown className="w-4 h-4 mr-1 inline text-yellow-500" />
              )}
              {msg.username}
            </p>

            <p>{msg.message}</p>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </main>
  );
};

export default MessagesList;

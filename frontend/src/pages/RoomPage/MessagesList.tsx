type Message = {
  _id: string;
  message: string;
  username: string;
  userId: string;
};

interface MessagesListProps {
  messages: Message[];
  clientId: string | null;
}

const MessagesList = ({ messages, clientId }: MessagesListProps) => {
  return (
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
  );
};

export default MessagesList;

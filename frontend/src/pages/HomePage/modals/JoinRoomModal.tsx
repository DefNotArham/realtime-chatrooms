import { useState, type Dispatch, type SetStateAction } from "react";
import useChatroomStore from "../../../stores/chatroom.store";
import { SyncLoader } from "react-spinners";

type JoinRoomModalProps = {
  setShowJoin: Dispatch<SetStateAction<boolean>>;
};

const JoinRoomModal = ({ setShowJoin }: JoinRoomModalProps) => {
  const [joinCode, setJoinCode] = useState("");
  const { joinRoom, loadRooms, joinRoomError, joinRoomLoading } =
    useChatroomStore();

  const clientId = localStorage.getItem("clientId");

  const handleJoinCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clientId) {
      console.log("ClientId not found");
      return;
    }

    const room = await joinRoom(joinCode, clientId);

    if (room) {
      setShowJoin(false);
      setJoinCode("");
      await loadRooms(clientId);
    }

    setJoinCode("");
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50"
      onClick={() => setShowJoin(false)}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleJoinCode(e)}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold">Join a room</h2>

        <input
          onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
          value={joinCode}
          autoFocus
          maxLength={6}
          placeholder="Enter code"
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-3 font-mono text-lg tracking-[0.2em] text-center uppercase focus:outline-none focus:border-teal-300"
        />

        {joinRoomError && (
          <p className="w-full text-sm text-red-400 -mt-2">{joinRoomError}</p>
        )}

        <button
          disabled={joinRoomLoading}
          className="px-5 py-2.5 rounded-lg bg-teal-400 text-neutral-950 text-sm font-semibold hover:bg-teal-300 transition cursor-pointer"
        >
          {joinRoomLoading ? <SyncLoader size={7} /> : "Join"}
        </button>
      </form>
    </div>
  );
};

export default JoinRoomModal;

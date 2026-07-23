import { useState } from "react";
import useChatroomStore from "../../../stores/chatroom.store";
import { useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";
import type { StateSetter } from "../stateSetter";

interface UsernameModalProps {
  clientId: string | null;
  selectedRoomId: string | null;
  setShowUsername: StateSetter<boolean>;
}

const UsernameModal = ({
  clientId,
  selectedRoomId,
  setShowUsername,
}: UsernameModalProps) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const { enterRoom, enterRoomError, enterRoomLoading } = useChatroomStore();

  const handleEnterRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clientId) {
      console.log("ClientId not found");
      return;
    }

    if (!selectedRoomId) {
      console.log("Room Id not found");
      return;
    }

    const result = await enterRoom(clientId, username, selectedRoomId);

    if (result && result !== "USERNAME_REQUIRED") {
      setUsername("");
      setShowUsername(false);
      navigate(`/room/${result._id}`);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50"
      onClick={() => setShowUsername(false)}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleEnterRoom(e)}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold">Enter a username</h2>

        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          autoFocus
          placeholder="Username"
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-amber-400"
        />

        {enterRoomError && (
          <p className="w-full text-sm text-red-400 -mt-2">{enterRoomError}</p>
        )}

        <button
          disabled={enterRoomLoading}
          className="px-5 py-2.5 rounded-lg bg-amber-400 text-neutral-950 text-sm font-semibold hover:bg-amber-300 transition cursor-pointer"
        >
          {enterRoomLoading ? <SyncLoader size={7} /> : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default UsernameModal;

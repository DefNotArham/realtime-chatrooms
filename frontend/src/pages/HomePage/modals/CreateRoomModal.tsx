import { useState } from "react";
import useChatroomStore from "../../../stores/chatroom.store";
import { SyncLoader } from "react-spinners";
import type { StateSetter } from "../stateSetter";

interface CreateRoomModalProps {
  setShowCreate: StateSetter<boolean>;
  clientId: string | null;
}

const CreateRoomModal = ({ setShowCreate, clientId }: CreateRoomModalProps) => {
  const [roomName, setRoomName] = useState("");

  const { createRoom, loadRooms, createChatroomError, createChatroomLoading } =
    useChatroomStore();

  const handleCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clientId) {
      console.log("ClientId not found");
      return;
    }

    const room = await createRoom(clientId, roomName);

    if (room) {
      setShowCreate(false);
      setRoomName("");
      await loadRooms(clientId);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50"
      onClick={() => setShowCreate(false)}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleCreateRoom(e)}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold">Create a new room</h2>

        <input
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
          autoFocus
          placeholder="Room name"
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-amber-400"
        />

        {createChatroomError && (
          <p className="w-full text-sm text-red-400 -mt-2">
            {createChatroomError}
          </p>
        )}

        <button
          type="submit"
          disabled={createChatroomLoading}
          className="px-5 py-2.5 rounded-lg bg-amber-400 text-neutral-950 text-sm font-semibold hover:bg-amber-300 transition cursor-pointer"
        >
          {createChatroomLoading ? <SyncLoader size={7} /> : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateRoomModal;

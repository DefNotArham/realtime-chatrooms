import { useState } from "react";
import useUserStore from "../../../stores/user.store";
import { useNavigate } from "react-router";
import useChatroomStore from "../../../stores/chatroom.store";
import { SyncLoader } from "react-spinners";
import type { StateSetter } from "../stateSetter";

interface EditUsernameModalProps {
  clientId: string | null;
  setShowEditUsername: StateSetter<boolean>;
}

const EditUsernameModal = ({
  clientId,
  setShowEditUsername,
}: EditUsernameModalProps) => {
  const navigate = useNavigate();

  const [editUsername, setEditUsername] = useState("");

  const { enterRoomLoading } = useChatroomStore();

  const handleEditUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clientId) {
      console.log("ClientId not found");
      return;
    }

    const result = await useUserStore
      .getState()
      .editUsername(clientId, editUsername);
    if (result) {
      setEditUsername("");
      setShowEditUsername(false);
      navigate(`/`);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50"
      onClick={() => setShowEditUsername(false)}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleEditUsername(e)}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold">Enter your new username</h2>

        <input
          onChange={(e) => setEditUsername(e.target.value)}
          value={editUsername}
          autoFocus
          placeholder="Username"
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-amber-400"
        />

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

export default EditUsernameModal;

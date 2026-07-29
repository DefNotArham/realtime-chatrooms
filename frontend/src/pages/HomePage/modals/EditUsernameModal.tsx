import { useState, type Dispatch, type SetStateAction } from "react";
import useChatroomStore from "../../../stores/chatroom.store";
import useUserStore from "../../../stores/user.store";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router";

type EditUsernameModalProps = {
  setShowEditUsername: Dispatch<SetStateAction<boolean>>;
};

const EditUsernameModal = ({ setShowEditUsername }: EditUsernameModalProps) => {
  const [editUsername, setEditUsername] = useState("");
  const { editUsernameError } = useUserStore();
  const { enterRoomLoading } = useChatroomStore();
  const navigate = useNavigate();

  const clientId = localStorage.getItem("clientId");

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

        {editUsernameError && (
          <p className="w-full text-sm text-red-400 -mt-2">
            {editUsernameError}
          </p>
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

export default EditUsernameModal;

import { BiCheck, BiCopy, BiPin } from "react-icons/bi";
import useChatroomStore from "../../stores/chatroom.store";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router";

type RoomsListProps = {
  setSelectedRoomId: Dispatch<SetStateAction<string>>;
  setShowUsername: Dispatch<SetStateAction<boolean>>;
};

const RoomsList = ({ setSelectedRoomId, setShowUsername }: RoomsListProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>();
  const { rooms, pinnedRoomIds, pinRoom, enterRoom } = useChatroomStore();
  const navigate = useNavigate();

  const clientId = localStorage.getItem("clientId");

  const handleCopy = (code: string) => {
    if (!code) return;

    navigator.clipboard.writeText(code);
    setCopiedCode(code);

    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handlePinToggle = (roomId: string, currentlyPinned: boolean) => {
    if (!clientId) return;
    pinRoom(clientId, roomId, !currentlyPinned);
  };

  // pinned rooms have their own section above, so exclude them here
  const unpinnedRooms = rooms.filter((r) => !pinnedRoomIds.includes(r._id));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
      {unpinnedRooms.map((r) => {
        const isCopied = copiedCode === r?.joinCode;
        return (
          <div
            key={r._id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400 hover:-translate-y-0.5 transition flex flex-col justify-between gap-3 sm:min-h-[220px]"
          >
            <div className="flex justify-between items-start gap-3">
              <h2 className="text-lg font-bold ">{r?.name}</h2>

              <button
                onClick={() => handlePinToggle(r._id, false)}
                title="Pin room"
                className="shrink-0 p-1.5 rounded-md transition cursor-pointer text-neutral-500 hover:text-amber-400"
              >
                <BiPin size={18} />
              </button>
            </div>

            <p
              className={`text-sm leading-relaxed line-clamp-3 ${
                r?.description ? "text-neutral-300" : "text-neutral-500 italic"
              }`}
            >
              {r?.description || "--No Description--"}
            </p>

            <div className="flex justify-between items-center mt-3">
              <div
                onClick={() => handleCopy(r?.joinCode)}
                title={isCopied ? "Copied!" : "Click to copy"}
                className={`flex items-center gap-1.5 font-mono text-xs font-semibold tracking-[0.12em] bg-neutral-800 border px-2.5 py-1.5 rounded-md cursor-pointer transition ${
                  isCopied
                    ? "border-teal-500/50 text-teal-400 bg-teal-950/20"
                    : "border-neutral-700 text-teal-300 hover:bg-neutral-700"
                }`}
              >
                {isCopied ? "Copied!" : r?.joinCode}
                {isCopied ? (
                  <BiCheck size={13} className="text-teal-400" />
                ) : (
                  <BiCopy size={13} className="text-teal-300" />
                )}
              </div>

              <button
                onClick={async () => {
                  if (!clientId) return;

                  const result = await enterRoom(clientId, "", r._id);

                  if (result === "USERNAME_REQUIRED") {
                    setSelectedRoomId(r._id);
                    setShowUsername(true);
                    return;
                  }

                  if (result) {
                    navigate(`/room/${result._id}`);
                  }
                }}
                className="px-4 py-1.5 rounded-md bg-teal-400 text-neutral-950 text-sm font-semibold hover:bg-teal-300 transition cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomsList;
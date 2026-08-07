import { useNavigate } from "react-router";
import { BiSolidPin } from "react-icons/bi";
import useChatroomStore from "../../stores/chatroom.store";
import type { Dispatch, SetStateAction } from "react";

type PinnedRoomsListProps = {
  setSelectedRoomId: Dispatch<SetStateAction<string>>;
  setShowUsername: Dispatch<SetStateAction<boolean>>;
};

const PinnedRoomsList = ({
  setSelectedRoomId,
  setShowUsername,
}: PinnedRoomsListProps) => {
  const { rooms, pinnedRoomIds, pinRoom, enterRoom } = useChatroomStore();
  const navigate = useNavigate();

  const clientId = localStorage.getItem("clientId");

  const pinnedRooms = rooms.filter((r) => pinnedRoomIds.includes(r._id));

  const handleUnpin = (roomId: string) => {
    if (!clientId) return;
    pinRoom(clientId, roomId, false);
  };

  const handleEnter = async (roomId: string) => {
    if (!clientId) return;

    const result = await enterRoom(clientId, "", roomId);

    if (result === "USERNAME_REQUIRED") {
      setSelectedRoomId(roomId);
      setShowUsername(true);
      return;
    }

    if (result) {
      navigate(`/room/${result._id}`);
    }
  };

  if (pinnedRooms.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4 text-neutral-200 flex items-center gap-2">
        <BiSolidPin className="text-amber-400" size={20} />
        Pinned Rooms
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {pinnedRooms.map((r) => (
          <div
            key={r._id}
            className="bg-neutral-900 border border-amber-400/60 rounded-xl p-5 hover:-translate-y-0.5 transition flex flex-col justify-between gap-3 sm:min-h-[220px]"
          >
            <div className="flex justify-between items-start gap-3">
              <h2 className="text-lg font-bold">{r?.name}</h2>

              <button
                onClick={() => handleUnpin(r._id)}
                title="Unpin room"
                className="shrink-0 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded hover:bg-amber-400/20 transition cursor-pointer"
              >
                <BiSolidPin size={11} />
                Pinned
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
              <div className="text-xs text-neutral-500">
                {r?.members?.length ?? 0} member
                {(r?.members?.length ?? 0) !== 1 ? "s" : ""}
              </div>

              <button
                onClick={() => handleEnter(r._id)}
                className="px-4 py-1.5 rounded-md bg-amber-400 text-neutral-950 text-sm font-semibold hover:bg-amber-300 transition cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PinnedRoomsList;
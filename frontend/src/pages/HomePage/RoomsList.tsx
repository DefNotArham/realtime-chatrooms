import { useNavigate } from "react-router";
import type { StateSetter } from "./stateSetter";
import useChatroomStore from "../../stores/chatroom.store";

interface RoomsListProps {
  clientId: string | null;
  setSelectedRoomId: StateSetter<string | null>;
  setShowUsername: StateSetter<boolean>;
}

const RoomsList = ({
  clientId,
  setSelectedRoomId,
  setShowUsername,
}: RoomsListProps) => {
  const navigate = useNavigate();

  const { rooms, enterRoom } = useChatroomStore();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
      {rooms.map((r) => (
        <div
          key={r._id}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400 hover:-translate-y-0.5 transition"
        >
          <div className="flex justify-between items-start gap-3">
            <h2 className="text-lg font-semibold">{r?.name}</h2>
          </div>

          <div className="flex justify-between items-center mt-3">
            <span className="font-mono text-xs font-semibold tracking-[0.12em] bg-neutral-800 border border-neutral-700 text-teal-300 px-2.5 py-1.5 rounded-md">
              {r?.joinCode}
            </span>

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
      ))}
    </div>
  );
};

export default RoomsList;

import { useNavigate } from "react-router";
import useChatroomStore from "../../stores/chatroom.store";
import type { Dispatch, SetStateAction } from "react";

type PublicRoomsListProps = {
  setSelectedRoomId: Dispatch<SetStateAction<string>>;
  setShowUsername: Dispatch<SetStateAction<boolean>>;
};

const PublicRoomsList = ({
  setSelectedRoomId,
  setShowUsername,
}: PublicRoomsListProps) => {
  const { publicRooms, joinRoom, enterRoom } = useChatroomStore();
  const navigate = useNavigate();

  const clientId = localStorage.getItem("clientId");

  const handleJoinPublicRoom = async (roomId: string, joinCode: string) => {
    if (!clientId) return;

    const joinedRoom = await joinRoom(joinCode, clientId);

    if (joinedRoom) {
      const result = await enterRoom(clientId, "", joinedRoom._id);

      if (result === "USERNAME_REQUIRED") {
        setSelectedRoomId(joinedRoom._id);
        setShowUsername(true);
        return;
      }

      if (result) {
        navigate(`/room/${result._id}`);
      }
    } else {
      const result = await enterRoom(clientId, "", roomId);

      if (result === "USERNAME_REQUIRED") {
        setSelectedRoomId(roomId);
        setShowUsername(true);
        return;
      }

      if (result) {
        navigate(`/room/${result._id}`);
      }
    }
  };

  return (
    <>
      {publicRooms.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-neutral-200">
            Public Rooms
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {publicRooms.map((r) => (
              <div
                key={r._id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-teal-400 hover:-translate-y-0.5 transition flex flex-col justify-between gap-3 sm:min-h-[220px]"
              >
                <div className="flex justify-between items-start gap-3">
                  <h2 className="text-lg font-bold ">{r?.name}</h2>
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-teal-400/10 text-teal-400 border border-teal-400/30 px-2 py-0.5 rounded shrink-0">
                    Public
                  </span>
                </div>

                <p
                  className={`text-sm leading-relaxed line-clamp-3 ${
                    r?.description
                      ? "text-neutral-300"
                      : "text-neutral-500 italic"
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
                    onClick={() => handleJoinPublicRoom(r._id, r.joinCode)}
                    className="px-4 py-1.5 rounded-md bg-teal-400 text-neutral-950 text-sm font-semibold hover:bg-teal-300 transition cursor-pointer"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default PublicRoomsList;

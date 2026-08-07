import { useEffect, useState } from "react";
import Header from "./Header";
import RoomsList from "./RoomsList";
import PinnedRoomsList from "./PinnedRoomsList";
import PublicRoomsList from "./PublicRoomsList";
import CreateRoomModal from "./modals/CreateRoomModal";
import JoinRoomModal from "./modals/JoinRoomModal";
import EditUsernameModal from "./modals/EditUsernameModal";
import UsernameModal from "./modals/UsernameModal";
import useChatroomStore from "../../stores/chatroom.store";

const HomePage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [showUsername, setShowUsername] = useState(false);

  const clientId = localStorage.getItem("clientId");
  const { loadRooms, loadPublicRooms } = useChatroomStore();

  useEffect(() => {
    const fetchRooms = async () => {
      if (!clientId) {
        console.log("ClientId not found");
        return;
      }

      await loadRooms(clientId);
      await loadPublicRooms(clientId);
    };

    fetchRooms();
  }, [clientId, loadPublicRooms, loadRooms]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 md:px-10 lg:px-5 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <Header
          setShowCreate={setShowCreate}
          setShowEditUsername={setShowEditUsername}
          setShowJoin={setShowJoin}
        />

        <PinnedRoomsList
          setSelectedRoomId={setSelectedRoomId}
          setShowUsername={setShowUsername}
        />

        <RoomsList
          setSelectedRoomId={setSelectedRoomId}
          setShowUsername={setShowUsername}
        />

        <PublicRoomsList
          setSelectedRoomId={setSelectedRoomId}
          setShowUsername={setShowUsername}
        />
      </div>

      {showCreate && <CreateRoomModal setShowCreate={setShowCreate} />}

      {showJoin && <JoinRoomModal setShowJoin={setShowJoin} />}

      {showEditUsername && (
        <EditUsernameModal setShowEditUsername={setShowEditUsername} />
      )}

      {showUsername && (
        <UsernameModal
          selectedRoomId={selectedRoomId}
          setShowUsername={setShowUsername}
        />
      )}
    </div>
  );
};

export default HomePage;
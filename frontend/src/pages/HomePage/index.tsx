import { useState } from "react";
import Header from "./Header";
import RoomsList from "./RoomsList";
import CreateRoomModal from "./modals/CreateRoomModal";
import JoinRoomModal from "./modals/JoinRoomModal";
import EditUsernameModal from "./modals/EditUsernameModal";
import UsernameModal from "./modals/UsernameModal";

const HomePage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const clientId = localStorage.getItem("clientId");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-5 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <Header
          setShowEditUsername={setShowEditUsername}
          setShowCreate={setShowCreate}
          setShowJoin={setShowJoin}
        />
        <RoomsList
          clientId={clientId}
          setSelectedRoomId={setSelectedRoomId}
          setShowUsername={setShowUsername}
        />
      </div>

      {showCreate && (
        <CreateRoomModal clientId={clientId} setShowCreate={setShowCreate} />
      )}
      {showJoin && (
        <JoinRoomModal clientId={clientId} setShowJoin={setShowJoin} />
      )}
      {showEditUsername && (
        <EditUsernameModal
          clientId={clientId}
          setShowEditUsername={setShowEditUsername}
        />
      )}
      {showUsername && (
        <UsernameModal
          clientId={clientId}
          selectedRoomId={selectedRoomId}
          setShowUsername={setShowUsername}
        />
      )}
    </div>
  );
};

export default HomePage;

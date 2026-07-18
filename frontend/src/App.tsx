import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";

import useUserStore from "./stores/user.store";
import { useEffect, useState } from "react";
import LoadingPage from "./pages/LoadingPage";

import NotFoundPage from "./pages/NotFoundPage";
import ServerErrorPage from "./pages/ServerErrorPage";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initUser = async () => {
      let clientId = localStorage.getItem("clientId");

      if (!clientId) {
        clientId = crypto.randomUUID();
        localStorage.setItem("clientId", clientId);
      }

      await useUserStore.getState().createUser(clientId);

      setReady(true);
    };

    initUser();
  }, []);

  if (!ready) return <LoadingPage />;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room/:roomId" element={<RoomPage />} />

      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

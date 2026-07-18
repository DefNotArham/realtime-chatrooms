// src/components/LoadingPage.tsx

import { SyncLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-amber-400 animate-pulse" />

          <h1 className="text-3xl font-semibold text-neutral-100 tracking-wide">
            Chat Rooms
          </h1>
        </div>

        <SyncLoader color="#fbbf24" size={10} />
      </div>
    </div>
  );
};

export default LoadingPage;

import type { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  setShowEditUsername: Dispatch<SetStateAction<boolean>>;
  setShowJoin: Dispatch<SetStateAction<boolean>>;
  setShowCreate: Dispatch<SetStateAction<boolean>>;
};

const Header = ({
  setShowEditUsername,
  setShowJoin,
  setShowCreate,
}: HeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 mb-10 border-b border-neutral-800">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />

        <div>
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-500">
            Live · Socket.IO
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide">
            Chat rooms
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 w-full sm:w-auto">
        <button
          onClick={() => setShowEditUsername(true)}
          className="px-4 py-2.5 rounded-lg border border-neutral-700 text-sm font-semibold hover:border-neutral-500 transition cursor-pointer truncate"
        >
          Edit Username
        </button>

        <button
          onClick={() => setShowJoin(true)}
          className="px-4 py-2.5 rounded-lg border border-neutral-700 text-sm font-semibold hover:border-neutral-500 transition cursor-pointer truncate"
        >
          Join by code
        </button>

        <button
          onClick={() => setShowCreate(true)}
          className="col-span-2 sm:col-span-1 px-5 py-2.5 rounded-lg bg-amber-400 text-neutral-950 text-sm font-semibold hover:bg-amber-300 transition cursor-pointer"
        >
          + Create room
        </button>
      </div>
    </header>
  );
};

export default Header;

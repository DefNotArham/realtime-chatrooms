import type { StateSetter } from "./stateSetter";

interface HeaderProps {
  setShowEditUsername: StateSetter<boolean>;
  setShowJoin: StateSetter<boolean>;
  setShowCreate: StateSetter<boolean>;
}

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

      <div className="flex gap-2">
        <button
          onClick={() => setShowEditUsername(true)}
          className="px-5 py-2.5 rounded-lg border border-neutral-700 text-sm font-semibold hover:border-neutral-500 transition cursor-pointer"
        >
          Edit Username
        </button>
        <button
          onClick={() => setShowJoin(true)}
          className="px-5 py-2.5 rounded-lg border border-neutral-700 text-sm font-semibold hover:border-neutral-500 transition cursor-pointer"
        >
          Join by code
        </button>

        <button
          onClick={() => setShowCreate(true)}
          className="px-5 py-2.5 rounded-lg bg-amber-400 text-neutral-950 text-sm font-semibold hover:bg-amber-300 transition cursor-pointer"
        >
          + Create room
        </button>
      </div>
    </header>
  );
};

export default Header;

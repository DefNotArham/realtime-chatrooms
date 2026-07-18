import { useNavigate } from "react-router";

const ServerErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="font-mono text-sm tracking-widest text-red-400 uppercase">
          Error 500
        </p>

        <h1 className="text-5xl font-bold mt-4">Server Error</h1>

        <p className="text-neutral-400 mt-4">
          Something went wrong on our end. Please try again later.
        </p>

        <button
          onClick={() => navigate("/")}
          className="
            mt-8
            px-6
            py-3
            rounded-xl
            border
            border-neutral-700
            hover:border-red-400
            transition
            cursor-pointer
          "
        >
          Return home
        </button>
      </div>
    </div>
  );
};

export default ServerErrorPage;

import type { RefObject } from "react";

type ScrollBottomButtonProps = {
  mainRef: RefObject<HTMLDivElement | null>;
};

const ScrollBottomButton = ({ mainRef }: ScrollBottomButtonProps) => {
  const scrollToBottom = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={scrollToBottom}
      className="absolute bottom-25 sm:bottom-30 right-6 sm:right-8 z-10 p-3 rounded-full bg-neutral-900 border border-neutral-700 text-teal-400 shadow-xl hover:bg-neutral-800 hover:border-teal-400 active:scale-95 transition cursor-pointer flex items-center justify-center"
      aria-label="Scroll to bottom"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
};

export default ScrollBottomButton;

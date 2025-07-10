import PlayPauseIcon from "@/assets/play-pause.svg?react";
import NextIcon from "@/assets/next.svg?react";
import PreviousIcon from "@/assets/previous.svg?react";

interface ClickWheelProps {
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onMenu: () => void;
}

const ClickWheel = ({
  onPlayPause,
  onNext,
  onPrevious,
  onMenu,
}: ClickWheelProps) => {
  return (
    <div className="relative rounded-full bg-[#fefefe] h-[245px] w-[245px] flex items-center justify-center">
      <button
        className="absolute top-6 text-[#7F7F7F] text-sm font-medium cursor-pointer"
        onClick={onMenu}
      >
        MENU
      </button>

      <button className="absolute left-6 cursor-pointer" onClick={onPrevious}>
        <PreviousIcon />
      </button>
      <button className="absolute right-6 cursor-pointer" onClick={onNext}>
        <NextIcon />
      </button>
      <button
        className="absolute bottom-6 cursor-pointer"
        onClick={onPlayPause}
      >
        <PlayPauseIcon />
      </button>

      <div
        className="w-[100px] h-[100px] rounded-full"
        style={{
          background:
            "radial-gradient(166.67% 166.67% at 50.27% 0%, #C1C1C1 0%, #ECECEC 51.56%, #ACACAC 100%)",
        }}
      />
    </div>
  );
};

export { ClickWheel };

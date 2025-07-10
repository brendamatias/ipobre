import PlayPauseIcon from "@/assets/play-pause.svg?react";
import NextIcon from "@/assets/next.svg?react";
import PreviousIcon from "@/assets/previous.svg?react";
import { useRef } from "react";

interface ClickWheelProps {
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onMenu: () => void;
  onSeekStart: (direction: Direction) => void;
  onSeekStop?: () => void;
  isSeekable: boolean;
}

const ClickWheel = ({
  onPlayPause,
  onNext,
  onPrevious,
  onMenu,
  onSeekStart,
  onSeekStop,
  isSeekable,
}: ClickWheelProps) => {
  const isSeekingRef = useRef(false);
  const seekTimeout = useRef<NodeJS.Timeout | null>(null);
  const pressStartTimeRef = useRef<number>(0);
  const pressDirectionRef = useRef<Direction | null>(null);

  const handleSeekStart = (direction: Direction) => {
    pressStartTimeRef.current = Date.now();
    pressDirectionRef.current = direction;

    if (isSeekable) {
      seekTimeout.current = setTimeout(() => {
        isSeekingRef.current = true;
        onSeekStart(direction);
      }, 300);
    }
  };

  const handleSeekStop = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    if (seekTimeout.current) {
      clearTimeout(seekTimeout.current);
      seekTimeout.current = null;
    }

    if (isSeekingRef.current) {
      onSeekStop?.();
      isSeekingRef.current = false;
    } else {
      if (pressDirectionRef.current === "forward") {
        onNext();
      } else {
        onPrevious();
      }
    }

    pressDirectionRef.current = null;
  };

  return (
    <div className="relative rounded-full bg-[#fefefe] h-[245px] w-[245px] flex items-center justify-center">
      <button
        className="absolute top-6 text-[#7F7F7F] text-sm font-medium cursor-pointer"
        onClick={onMenu}
      >
        MENU
      </button>

      <button
        className="absolute left-6 cursor-pointer"
        onMouseDown={() => handleSeekStart("backward")}
        onTouchStart={() => handleSeekStart("backward")}
        onMouseUp={handleSeekStop}
        onTouchEnd={handleSeekStop}
      >
        <PreviousIcon />
      </button>

      <button
        className="absolute right-6 cursor-pointer"
        onMouseDown={() => handleSeekStart("forward")}
        onTouchStart={() => handleSeekStart("forward")}
        onMouseUp={handleSeekStop}
        onTouchEnd={handleSeekStop}
      >
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

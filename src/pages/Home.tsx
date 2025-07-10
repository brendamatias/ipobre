import { cn } from "@/lib";
import { useState } from "react";
import PlayPauseIcon from "@/assets/play-pause.svg?react";
import NextIcon from "@/assets/next.svg?react";
import PreviousIcon from "@/assets/previous.svg?react";
import PlayIcon from "@/assets/play.svg?react";
import PauseIcon from "@/assets/pause.svg?react";
import ArrowRightIcon from "@/assets/arrow-right.svg?react";
import BatteryIcon from "@/assets/battery.svg?react";

const songs = [
  "Dove - Pillar point",
  "Clocks",
  "Space song",
  "La Vie En Rose",
  "Lorem",
  "Lorem 2",
];

export const Home = () => {
  const [song, setSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="flex justify-between items-center gap-4 flex-col w-[353px] h-[584px] rounded-[28px] px-9 py-8"
      style={{
        background:
          "linear-gradient(90deg, #BFBFBF 0%, #CECECE 32.97%, #CECECE 64.85%, #AFAFAF 100%)",
      }}
    >
      <div className="bg-white border-[6px] border-black rounded-2xl overflow-hidden h-[226px] w-full">
        <div className="bg-[#DEE1E0] px-3 py-2.5 h-[32px] flex items-center justify-between gap-4">
          <span className="text-xs">Songs</span>

          <div className="flex gap-2.5 items-center">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
            <BatteryIcon />
          </div>
        </div>

        <ul className="overflow-auto max-h-[170px] pr-1 -mr-1">
          {songs.map((item) => (
            <li
              key={item}
              className={cn(
                "h-[34px] px-3 py-2 flex justify-between gap-4 items-center text-xs cursor-pointer",
                song === item ? "text-white" : "text-black"
              )}
              style={{
                background:
                  song === item
                    ? "linear-gradient(180deg, #3AABEB 0%, #317EB6 100%)"
                    : "transparent",
              }}
              onClick={() => setSong(item)}
            >
              {item}

              {item === song && <ArrowRightIcon />}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative rounded-full bg-[#fefefe] h-[245px] w-[245px] flex items-center justify-center">
        <span className="absolute top-6 text-[#7F7F7F] text-sm font-medium">
          MENU
        </span>
        <span className="absolute left-6">
          <PreviousIcon />
        </span>
        <span className="absolute right-6">
          <NextIcon />
        </span>

        <button
          className="absolute bottom-6 cursor-pointer"
          onClick={(prev) => setIsPlaying(!prev)}
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
    </div>
  );
};

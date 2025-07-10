import { cn } from "@/lib";
import PlayIcon from "@/assets/play.svg?react";
import PauseIcon from "@/assets/pause.svg?react";
import ArrowRightIcon from "@/assets/arrow-right.svg?react";
import BatteryIcon from "@/assets/battery.svg?react";

interface Song {
  name: string;
  artist: string;
  album: string;
  file: string;
  cover: string;
}

interface PlayerDisplayProps {
  currentSong: Song;
  screen: "menu" | "player";
  songs: Song[];
  currentIndex: number;
  isPlaying: boolean;
  selectedRef: React.RefObject<HTMLLIElement | null>;
  onSelectSong: (index: number) => void;
}

const PlayerDisplay = ({
  currentSong,
  screen,
  songs,
  currentIndex,
  isPlaying,
  selectedRef,
  onSelectSong,
}: PlayerDisplayProps) => {
  return (
    <div className="bg-white border-[6px] border-black rounded-2xl overflow-hidden h-[226px] w-full">
      <div className="bg-[#DEE1E0] px-3 py-2.5 h-[32px] flex items-center justify-between gap-4">
        <span className="text-xs">
          {screen === "menu" ? "Songs" : "Now Playing"}
        </span>

        <div className="flex gap-2.5 items-center">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
          <BatteryIcon />
        </div>
      </div>

      {screen === "menu" ? (
        <ul className="overflow-auto max-h-[170px] pr-1 -mr-1">
          {songs
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((item, i) => (
              <li
                ref={i === currentIndex ? selectedRef : null}
                key={item.name}
                className={cn(
                  "h-[34px] px-3 py-2 flex justify-between gap-4 items-center text-xs cursor-pointer",
                  i === currentIndex ? "text-white" : "text-black"
                )}
                style={{
                  background:
                    i === currentIndex
                      ? "linear-gradient(180deg, #3AABEB 0%, #317EB6 100%)"
                      : "transparent",
                }}
                onClick={() => onSelectSong(i)}
              >
                {item.name} - {item.artist}
                <ArrowRightIcon />
              </li>
            ))}
        </ul>
      ) : (
        <div className="flex flex-col justify-between h-full max-h-[170px] gap-2 px-3 py-2 text-black">
          <div className="flex flex-col gap-2">
            <div className="text-xs w-full text-left font-medium">
              {currentIndex + 1} of {songs.length}
            </div>
            <div className="flex items-center gap-3">
              <img
                src={currentSong.cover}
                alt={currentSong.name}
                className="w-[80px] h-[80px] object-cover border border-[#999]"
              />

              <div className="text-xs flex flex-col gap-1.5 w-full">
                <span className="font-semibold">{currentSong.name}</span>
                <span className="">{currentSong.artist}</span>
                <span className="italic text-[10px]">{currentSong.album}</span>
              </div>
            </div>
          </div>

          <div className="w-full h-[6px] bg-gray-300 rounded-full mt-2">
            <div className="h-full bg-blue-500 w-[40%] rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export { PlayerDisplay };

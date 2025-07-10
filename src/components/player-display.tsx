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
                // src={currentSong.cover}
                src="data:image/jpeg;base64,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"
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

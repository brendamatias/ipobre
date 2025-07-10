import { useEffect, useRef, useState } from "react";
import { PlayerDisplay, ClickWheel } from "@/components";
import { songs } from "@/data";

export const Home = () => {
  const [screen, setScreen] = useState<"menu" | "player">("menu");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const selectedRef = useRef<HTMLLIElement | null>(null);

  const currentSong = songs[currentIndex];

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const onSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div
      className="flex justify-between items-center gap-4 flex-col w-[353px] h-[584px] rounded-[28px] px-9 py-8"
      style={{
        background:
          "linear-gradient(90deg, #BFBFBF 0%, #CECECE 32.97%, #CECECE 64.85%, #AFAFAF 100%)",
      }}
    >
      <audio ref={audioRef} src={currentSong.file} />

      <PlayerDisplay
        currentSong={currentSong}
        screen={screen}
        songs={songs}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        selectedRef={selectedRef}
        currentTime={currentTime}
        duration={duration}
        onSelectSong={(i) => {
          setCurrentIndex(i);
          setIsPlaying(true);
          setScreen("player");
        }}
        onSeek={onSeek}
      />

      <ClickWheel
        onPlayPause={togglePlayPause}
        onNext={playNext}
        onPrevious={playPrevious}
        onMenu={() => setScreen("menu")}
      />
    </div>
  );
};

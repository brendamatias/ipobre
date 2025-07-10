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
  const seekIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const startSeeking = (direction: Direction) => {
    if (!audioRef.current) return;

    const seek = () => {
      if (!audioRef.current) return;
      audioRef.current.currentTime += direction === "forward" ? 2 : -2;
      setCurrentTime(audioRef.current.currentTime);
    };

    seek();

    seekIntervalRef.current = setInterval(seek, 200);
  };

  const stopSeeking = () => {
    if (seekIntervalRef.current) {
      clearInterval(seekIntervalRef.current);
      seekIntervalRef.current = null;
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
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", playNext);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen === "menu") {
        if (e.key === "ArrowRight") {
          setScreen("player");
          setIsPlaying(true);
        }
      } else {
        if (e.key === "ArrowRight") {
          playNext();
        } else if (e.key === "ArrowLeft") {
          playPrevious();
        } else if (e.key === "ArrowDown") {
          togglePlayPause();
        } else if (e.key === "ArrowUp") {
          setScreen("menu");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screen, playNext, playPrevious, togglePlayPause]);

  return (
    <div
      tabIndex={0}
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
        onSeekStart={startSeeking}
        onSeekStop={stopSeeking}
        isSeekable={screen === "player"}
      />
    </div>
  );
};

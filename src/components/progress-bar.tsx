import { formatTime } from "@/utils";
import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);

  const barRef = useRef<HTMLDivElement | null>(null);

  const activeTime = isDragging ? previewTime : currentTime;
  const percent = duration ? (activeTime / duration) * 100 : 0;

  const getTimeFromEvent = (e: MouseEvent | React.MouseEvent) => {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const x = e.clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    return (clampedX / rect.width) * duration;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const newTime = getTimeFromEvent(e);
    setPreviewTime(newTime);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newTime = getTimeFromEvent(e);
    setPreviewTime(newTime);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onSeek(previewTime);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, previewTime]);

  return (
    <div className="flex flex-col gap-1">
      <div
        ref={barRef}
        className="w-full h-[6px] bg-gray-300 rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-[#666] font-mono">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export { ProgressBar };

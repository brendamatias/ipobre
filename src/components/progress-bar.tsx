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

  const getTimeFromPointer = (
    e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
  ) => {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    return (clampedX / rect.width) * duration;
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const newTime = getTimeFromPointer(e);
    setPreviewTime(newTime);
  };

  const moveDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const newTime = getTimeFromPointer(e);
    setPreviewTime(newTime);
  };

  const endDrag = () => {
    if (isDragging) {
      setIsDragging(false);
      onSeek(previewTime);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", moveDrag);
      window.addEventListener("mouseup", endDrag);
      window.addEventListener("touchmove", moveDrag);
      window.addEventListener("touchend", endDrag);
    } else {
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("touchend", endDrag);
    }

    return () => {
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("touchend", endDrag);
    };
  }, [isDragging, previewTime]);

  return (
    <div className="flex flex-col gap-1">
      <div
        ref={barRef}
        className="w-full h-[10px] bg-gray-300 rounded-full cursor-pointer"
        onMouseDown={startDrag}
        onTouchStart={startDrag}
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

import { formatTime } from "@/utils";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
}

const ProgressBar = ({ currentTime, duration }: ProgressBarProps) => {
  const percent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full h-[6px] bg-gray-300 rounded-full">
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

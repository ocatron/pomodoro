import { cn } from "@/lib/ui-utils";
import {
  useLongBreakMinutes,
  usePomodoroMinutes,
  useShortBreakMinutes,
  useTimerMode,
} from "@/store/pomodoro-store";
import React, { useMemo } from "react";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  remainingSeconds: number;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, remainingSeconds, ...props }, ref) => {
    const pomodoroMinutes = usePomodoroMinutes();
    const shortBreakMinutes = useShortBreakMinutes();
    const longBreakMinutes = useLongBreakMinutes();
    const timerMode = useTimerMode();

    const progress = useMemo(() => {
      if (timerMode === "pomodoro") {
        return (remainingSeconds * 100) / pomodoroMinutes / 60;
      }
      if (timerMode === "short-break") {
        return (remainingSeconds * 100) / shortBreakMinutes / 60;
      }
      return (remainingSeconds * 100) / longBreakMinutes / 60;
    }, [
      longBreakMinutes,
      pomodoroMinutes,
      remainingSeconds,
      shortBreakMinutes,
      timerMode,
    ]);

    return (
      <div
        className={cn(
          "relative h-1 w-full max-w-md overflow-hidden rounded-full bg-muted",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div
          className="absolute top-0 h-full w-full rounded-full bg-primary"
          style={{ right: `${progress}%` }}
        />
      </div>
    );
  },
);
ProgressBar.displayName = "Countdown";

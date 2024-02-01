import { cn } from "@/lib/ui-utils";
import {
  useCompletedPomodoroCount,
  useTimerMode,
} from "@/store/pomodoro-store";
import React, { useMemo } from "react";

type PomodoroCountProps = React.HTMLAttributes<HTMLDivElement>;

export const PomodoroCount = React.forwardRef<HTMLDivElement, PomodoroCountProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, ...props }, ref) => {
    const completedPomodoroCount = useCompletedPomodoroCount();
    const timerMode = useTimerMode();
    const currentPomodoro = completedPomodoroCount + 1;

    const description = useMemo(() => {
      if (timerMode === "short-break" || timerMode === "long-break") {
        return `Completed #${currentPomodoro}`;
      }
      if (currentPomodoro === 1) {
        return `Let's get started...`;
      }
      return `Pomodoro #${currentPomodoro}`;
    }, [currentPomodoro, timerMode]);

    return (
      <div className={cn(className)} ref={ref} {...props}>
        {description}
      </div>
    );
  },
);
PomodoroCount.displayName = "Countdown";

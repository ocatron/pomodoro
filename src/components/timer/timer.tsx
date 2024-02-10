import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/ui-utils";
import React, { useCallback, useEffect, useMemo } from "react";
import { Countdown } from "./countdown";
import { addMinutes } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "../tabs";
import {
  useTimerMode,
  type TimerMode,
  usePomodoroActions,
  usePomodoroMinutes,
  useShortBreakMinutes,
  useLongBreakMinutes,
  useCompletedPomodoroCount,
} from "@/store/pomodoro-store";
import { Button } from "../button";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { PomodoroCount } from "./pomodoro-count";
import { ProgressBar } from "./progress-bar";

type TimerProps = React.HTMLAttributes<HTMLDivElement>;

export const Timer = React.forwardRef<HTMLDivElement, TimerProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, ...props }, ref) => {
    const pomodoroMinutes = usePomodoroMinutes();
    const shortBreakMinutes = useShortBreakMinutes();
    const longBreakMinutes = useLongBreakMinutes();
    const timerMode = useTimerMode();
    const pomodoroActions = usePomodoroActions();
    const completedPomodoroCount = useCompletedPomodoroCount();
    const isResetDisabled = useMemo(() => {
      if (timerMode !== "pomodoro" || completedPomodoroCount > 0) {
        return false;
      }
      return true;
    }, [completedPomodoroCount, timerMode]);

    const { totalSeconds, didStart, isRunning, pause, resume, restart } =
      useTimer({
        expiryTime: addMinutes(new Date(), pomodoroMinutes),
        autoStart: false,
      });

    const resetTimer = useCallback(() => {
      if (timerMode === "pomodoro") {
        restart({
          expiryTime: addMinutes(new Date(), pomodoroMinutes),
          autoStart: false,
        });
      } else if (timerMode === "short-break") {
        restart({
          expiryTime: addMinutes(new Date(), shortBreakMinutes),
          autoStart: false,
        });
      } else {
        restart({
          expiryTime: addMinutes(new Date(), longBreakMinutes),
          autoStart: false,
        });
      }
    }, [
      longBreakMinutes,
      pomodoroMinutes,
      restart,
      shortBreakMinutes,
      timerMode,
    ]);

    useEffect(() => {
      resetTimer();
    }, [resetTimer]);

    const handleTimerModeChange = useCallback(
      (value: string) => {
        if ((value as TimerMode) === "pomodoro") {
          pomodoroActions.setMode("pomodoro");
        } else if ((value as TimerMode) === "short-break") {
          pomodoroActions.setMode("short-break");
        } else {
          pomodoroActions.setMode("long-break");
        }
      },
      [pomodoroActions],
    );

    const handlePlay = useCallback(() => {
      if (isRunning) {
        pause();
      } else {
        resume();
      }
    }, [isRunning, pause, resume]);

    const handleNext = useCallback(() => {
      pomodoroActions.next();
    }, [pomodoroActions]);

    const handlePrevious = useCallback(() => {
      if (didStart) {
        resetTimer();
      } else {
        pomodoroActions.previous();
      }
    }, [didStart, pomodoroActions, resetTimer]);

    const handleReset = useCallback(() => {
      if (!isResetDisabled) {
        pomodoroActions.resetPomodoroCount();
      }
    }, [isResetDisabled, pomodoroActions]);

    return (
      <div
        className={cn(
          "flex flex-col items-center overflow-hidden rounded-md border border-border p-4",
          className,
        )}
        ref={ref}
        {...props}
      >
        <Tabs
          value={timerMode}
          onValueChange={handleTimerModeChange}
          className="max-w-full overflow-hidden"
        >
          <TabsList className="w-full max-w-full">
            <TabsTrigger value="pomodoro" aria-label="Pomodoro">
              <span className="max-sm:hidden">Pomodoro</span>
              <span className="sm:hidden">Pomo</span>
            </TabsTrigger>
            <TabsTrigger value="short-break" aria-label="Short break">
              <span className="max-sm:hidden">Short Break</span>
              <span className="sm:hidden">Short</span>
            </TabsTrigger>
            <TabsTrigger value="long-break" aria-label="Long break">
              <span className="max-sm:hidden">Long Break</span>
              <span className="sm:hidden">Long</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Countdown remainingSeconds={totalSeconds} className="mt-8" />
        <PomodoroCount className="mt-8" didStart={didStart} />
        <ProgressBar remainingSeconds={totalSeconds} className="mt-8" />
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            shape="square"
            variant="ghost"
            size="xl"
            onClick={handlePrevious}
          >
            <SkipBack className="h-8 w-8" />
          </Button>
          <Button shape="square" size="xl" onClick={handlePlay}>
            {isRunning ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </Button>
          <Button shape="square" variant="ghost" size="xl" onClick={handleNext}>
            <SkipForward className="h-8 w-8" />
          </Button>
        </div>
        <div className="mt-4 flex w-full justify-center gap-4 border-border">
          <Button
            variant="ghost"
            disabled={isResetDisabled}
            onClick={handleReset}
          >
            <RotateCcw className="mr-1 h-5 w-5" /> Reset Pomodoros
          </Button>
        </div>
      </div>
    );
  },
);
Timer.displayName = "Timer";

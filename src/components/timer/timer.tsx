import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/ui-utils";
import React, { useState } from "react";
import { Countdown } from "./countdown";
import { addMinutes } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "../tabs";

type TimerProps = React.HTMLAttributes<HTMLDivElement>;
type TimerMode = "pomodoro" | "short-break" | "long-break";

export const Timer = React.forwardRef<HTMLDivElement, TimerProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, ...props }, ref) => {
    const totalMinutes = 5;
    const { totalSeconds } = useTimer({
      expiryTime: addMinutes(new Date(), totalMinutes),
    });

    const [timerMode, setTimerMode] = useState<TimerMode>("pomodoro");
    return (
      <div
        className={cn(
          "flex flex-col items-center rounded-md border border-border p-4",
          className,
        )}
        ref={ref}
        {...props}
      >
        <Tabs
          value={timerMode}
          onValueChange={(value) => setTimerMode(value as TimerMode)}
        >
          <TabsList>
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="short-break">Short Break</TabsTrigger>
            <TabsTrigger value="long-break">Long Break</TabsTrigger>
          </TabsList>
        </Tabs>
        <Countdown remainingSeconds={totalSeconds} className="mt-8" />
      </div>
    );
  },
);
Timer.displayName = "Timer";

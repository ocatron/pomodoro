import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/ui-utils";
import React from "react";
import { Countdown } from "./countdown";
import { addMinutes } from "date-fns";
type TimerProps = React.HTMLAttributes<HTMLDivElement>;

export const Timer = React.forwardRef<HTMLDivElement, TimerProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, ...props }, ref) => {
    const totalMinutes = 5;
    const { totalSeconds } = useTimer({ expiryTime: addMinutes(new Date(), totalMinutes) });
    return (
      <div
        className={cn("rounded-md border border-border  p-4", className)}
        ref={ref}
        {...props}
      >
        <Countdown remainingSeconds={totalSeconds} />
      </div>
    );
  },
);
Timer.displayName = "Timer";

import { pad } from "@/lib/number-utils";
import { cn } from "@/lib/ui-utils";
import { secondsToMinutes } from "date-fns";
import React from "react";

interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  remainingSeconds: number;
}

export const Countdown = React.forwardRef<HTMLDivElement, CountdownProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, remainingSeconds, ...props }, ref) => {
    const minutes = pad(secondsToMinutes(remainingSeconds), 2);
    const seconds = pad(remainingSeconds % 60, 2);
    return (
      <div className={cn("font-mono text-6xl", className)} ref={ref} {...props}>
        {`${minutes}:${seconds}`}
      </div>
    );
  },
);
Countdown.displayName = "Countdown";

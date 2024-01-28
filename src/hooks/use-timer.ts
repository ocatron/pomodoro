import { addMilliseconds, differenceInMilliseconds } from "date-fns";
import { useCallback, useState } from "react";
import { useInterval } from "./use-interval";

const DEFAULT_DELAY = 1000;

interface TimerConfig {
  expiryTime: Date;
  onExpire?: () => void;
  autoStart?: boolean;
}

const getRemainingSecondsToExpiryTime = (
  expiryTime: Date,
  shouldRound = false,
): number => {
  const now = new Date();
  const milliseconds = differenceInMilliseconds(expiryTime, now);
  if (milliseconds > 0) {
    const seconds = milliseconds / 1000;
    return shouldRound ? Math.round(seconds) : seconds;
  }
  return 0;
};

const getExtraDelayFromExpiryTime = (expiryTime: Date) => {
  const seconds = getRemainingSecondsToExpiryTime(expiryTime);
  const extraMilliseconds = Math.floor((seconds - Math.floor(seconds)) * 1000);
  return extraMilliseconds > 0 ? extraMilliseconds : DEFAULT_DELAY;
};

export const useTimer = ({
  expiryTime: expiry,
  onExpire,
  autoStart = true,
}: TimerConfig) => {
  const [expiryTime, setExpiryTime] = useState(expiry);
  const [remainingSeconds, setRemainingSeconds] = useState(
    getRemainingSecondsToExpiryTime(expiryTime),
  );
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [delay, setDelay] = useState<number | null>(
    getExtraDelayFromExpiryTime(expiryTime),
  );

  const handleExpire = useCallback(() => {
    const isOnExpireValid = onExpire && typeof onExpire === "function";
    if (isOnExpireValid) {
      onExpire();
    }
    setIsRunning(false);
    setDelay(null);
  }, [onExpire]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const restart = useCallback(
    ({
      expiryTime: newExpiry,
      autoStart: newAutoStart = true,
    }: Omit<TimerConfig, "onExpire">) => {
      setDelay(getExtraDelayFromExpiryTime(newExpiry));
      setDidStart(newAutoStart);
      setIsRunning(newAutoStart);
      setExpiryTime(newExpiry);
      setRemainingSeconds(getRemainingSecondsToExpiryTime(newExpiry));
    },
    [],
  );

  const resume = useCallback(() => {
    const time = addMilliseconds(new Date(), remainingSeconds * 1000);
    restart({ expiryTime: time });
  }, [restart, remainingSeconds]);

  const start = useCallback(() => {
    if (didStart) {
      setRemainingSeconds(getRemainingSecondsToExpiryTime(expiryTime));
      setIsRunning(true);
    } else {
      resume();
    }
  }, [didStart, expiryTime, resume]);

  useInterval(
    () => {
      console.log("Running...");
      if (delay !== DEFAULT_DELAY) {
        setDelay(DEFAULT_DELAY);
      }
      const newRemainingSeconds = getRemainingSecondsToExpiryTime(expiryTime);
      setRemainingSeconds(newRemainingSeconds);
      if (newRemainingSeconds <= 0) {
        handleExpire();
      }
    },
    isRunning ? delay : null,
  );

  return {
    totalSeconds: Math.ceil(remainingSeconds),
    start,
    pause,
    resume,
    restart,
    isRunning,
  };
};

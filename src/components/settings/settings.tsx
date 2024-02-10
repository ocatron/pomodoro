import React, { useCallback, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import { NumberInput } from "../input";
import { Label } from "../label";
import {
  useLongBreakInterval,
  useLongBreakMinutes,
  usePomodoroActions,
  usePomodoroMinutes,
  useShortBreakMinutes,
} from "@/store/pomodoro-store";
import { Button } from "../button";
import { RotateCcw } from "lucide-react";
import { ScrollArea } from "../scroll-area";

interface SettingsProps {
  children: React.ReactNode;
}

const getPositiveNumberOrNaN = (value: number) => (value <= 0 ? 1 : value);

function Settings({ children }: SettingsProps) {
  const pomodoroMinutes = usePomodoroMinutes();
  const shortBreakMinutes = useShortBreakMinutes();
  const longBreakMinutes = useLongBreakMinutes();
  const longBreakInterval = useLongBreakInterval();
  const pomodoroActions = usePomodoroActions();

  const [pomodoroMinutesInputValue, setPomodoroMinutesInputValue] =
    useState(pomodoroMinutes);
  const [shortBreakMinutesInputValue, setShortBreakMinutesInputValue] =
    useState(shortBreakMinutes);
  const [longBreakMinutesInputValue, setLongBreakMinutesInputValue] =
    useState(longBreakMinutes);
  const [longBreakIntervalInputValue, setLongBreakIntervalInputValue] =
    useState(longBreakInterval);

  const reInitialize = useCallback(() => {
    setPomodoroMinutesInputValue(pomodoroMinutes);
    setShortBreakMinutesInputValue(shortBreakMinutes);
    setLongBreakMinutesInputValue(longBreakMinutes);
    setLongBreakIntervalInputValue(longBreakInterval);
  }, [longBreakInterval, longBreakMinutes, pomodoroMinutes, shortBreakMinutes]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open === true) {
        reInitialize();
      }
    },
    [reInitialize],
  );

  const handleChangePomodoroMinutes = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.currentTarget.value);
      setPomodoroMinutesInputValue(getPositiveNumberOrNaN(value));
      pomodoroActions.setPomodoroMinutes(value);
    },
    [pomodoroActions],
  );

  const handleChangeShortBreakMinutes = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.currentTarget.value);
      setShortBreakMinutesInputValue(getPositiveNumberOrNaN(value));
      pomodoroActions.setShortBreakMinutes(value);
    },
    [pomodoroActions],
  );

  const handleChangeLongBreakMinutes = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.currentTarget.value);
      setLongBreakMinutesInputValue(getPositiveNumberOrNaN(value));
      pomodoroActions.setLongBreakMinutes(value);
    },
    [pomodoroActions],
  );

  const handleChangeLongBreakInterval = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.currentTarget.value);
      setLongBreakIntervalInputValue(getPositiveNumberOrNaN(value));
      pomodoroActions.setLongBreakInterval(value);
    },
    [pomodoroActions],
  );

  const handleReset = useCallback(() => {
    const defaultState = pomodoroActions.resetToDefaultSettings();
    setPomodoroMinutesInputValue(defaultState.pomodoroMinutes!);
    setShortBreakMinutesInputValue(defaultState.shortBreakMinutes!);
    setLongBreakMinutesInputValue(defaultState.longBreakMinutes!);
    setLongBreakIntervalInputValue(defaultState.longBreakInterval!);
  }, [pomodoroActions]);

  return (
    <Drawer onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-full">
        <ScrollArea>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <div className="flex flex-col gap-8 [&>div]:flex [&>div]:max-sm:flex-col [&>div]:max-sm:gap-1">
                <div>
                  <Label
                    htmlFor="pomodoro-minutes"
                    className="flex grow flex-col gap-1"
                  >
                    Pomodoro
                    <span className="text-sm text-muted-foreground">
                      minutes
                    </span>
                  </Label>
                  <NumberInput
                    id="pomodoro-minutes"
                    className="sm:max-w-[8rem]"
                    value={pomodoroMinutesInputValue}
                    onChange={handleChangePomodoroMinutes}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="short-break-minutes"
                    className="flex grow flex-col gap-1"
                  >
                    Short break
                    <span className="text-sm text-muted-foreground">
                      minutes
                    </span>
                  </Label>
                  <NumberInput
                    id="short-break-minutes"
                    className="sm:max-w-[8rem]"
                    value={shortBreakMinutesInputValue}
                    onChange={handleChangeShortBreakMinutes}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="long-break-minutes"
                    className="flex grow flex-col gap-1"
                  >
                    Long break
                    <span className="text-sm text-muted-foreground">
                      minutes
                    </span>
                  </Label>
                  <NumberInput
                    id="long-break-minutes"
                    className="sm:max-w-[8rem]"
                    value={longBreakMinutesInputValue}
                    onChange={handleChangeLongBreakMinutes}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="long-break-interval"
                    className="flex grow flex-col gap-1"
                  >
                    Long Break Interval
                    <span className="text-sm text-muted-foreground">
                      pomodoros
                    </span>
                  </Label>
                  <NumberInput
                    id="long-break-interval"
                    className="sm:max-w-[8rem]"
                    value={longBreakIntervalInputValue}
                    onChange={handleChangeLongBreakInterval}
                  />
                </div>
                <Button variant="secondary" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
export { Settings };

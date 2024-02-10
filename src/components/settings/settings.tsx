import React, { useCallback } from "react";
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

function Settings({ children }: SettingsProps) {
  const pomodoroMinutes = usePomodoroMinutes();
  const shortBreakMinutes = useShortBreakMinutes();
  const longBreakMinutes = useLongBreakMinutes();
  const longBreakInterval = useLongBreakInterval();
  const pomodoroActions = usePomodoroActions();

  const handleChangePomodoroMinutes = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      pomodoroActions.setPomodoroMinutes(parseInt(e.currentTarget.value));
    },
    [pomodoroActions],
  );

  const handleChangeShortBreakMinutes = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      pomodoroActions.setShortBreakMinutes(parseInt(e.currentTarget.value));
    },
    [pomodoroActions],
  );

  const handleChangeLongBreakMinutes = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      pomodoroActions.setLongBreakMinutes(parseInt(e.currentTarget.value));
    },
    [pomodoroActions],
  );

  const handleChangeLongBreakInterval = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      pomodoroActions.setLongBreakInterval(parseInt(e.currentTarget.value));
    },
    [pomodoroActions],
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-full">
        <ScrollArea>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between gap-4">
                  <Label
                    htmlFor="pomodoro-minutes"
                    className="flex flex-col gap-1"
                  >
                    Pomodoro
                    <span className="text-sm text-muted-foreground">
                      minutes
                    </span>
                  </Label>
                  <NumberInput
                    id="pomodoro-minutes"
                    className="max-w-[4rem]"
                    value={pomodoroMinutes}
                    onChange={handleChangePomodoroMinutes}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Label
                    htmlFor="short-break-minutes"
                    className="flex flex-col gap-1"
                  >
                    Short break
                    <span className="text-sm text-muted-foreground">
                      minutes
                    </span>
                  </Label>
                  <NumberInput
                    id="short-break-minutes"
                    className="max-w-[4rem]"
                    value={shortBreakMinutes}
                    onChange={handleChangeShortBreakMinutes}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Label
                    htmlFor="long-break-minutes"
                    className="flex flex-col gap-1"
                  >
                    Long break
                    <span className="text-sm text-muted-foreground">
                      minutes
                    </span>
                  </Label>
                  <NumberInput
                    id="long-break-minutes"
                    className="max-w-[4rem]"
                    value={longBreakMinutes}
                    onChange={handleChangeLongBreakMinutes}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Label
                    htmlFor="long-break-interval"
                    className="flex flex-col gap-1"
                  >
                    Long Break Interval
                    <span className="text-sm text-muted-foreground">
                      pomodoros
                    </span>
                  </Label>
                  <NumberInput
                    id="long-break-interval"
                    className="max-w-[4rem]"
                    value={longBreakInterval}
                    onChange={handleChangeLongBreakInterval}
                  />
                </div>
                <Button
                  variant="secondary"
                  onClick={pomodoroActions.resetToDefaultSettings}
                >
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

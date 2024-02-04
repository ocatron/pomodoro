import { create } from "zustand";

export type TimerMode = "pomodoro" | "short-break" | "long-break";

const DEFAULT_POMODORO_MINUTES = 25;
const DEFAULT_SHORT_BREAK_MINUTES = 5;
const DEFAULT_LONG_BREAK_MINUTES = 15;
const DEFAULT_LONG_BREAK_INTERVAL = 4;

export interface PomodoroState {
  completedPomodoroCount: number;
  pomodoroMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
  mode: TimerMode;

  actions: {
    next: () => void;
    previous: () => void;
    resetPomodoroCount: () => void;
    resetToDefaultSettings: () => void;
    setMode: (mode: TimerMode) => void;
    setPomodoroMinutes: (minutes: number) => void;
    setShortBreakMinutes: (minutes: number) => void;
    setLongBreakMinutes: (minutes: number) => void;
    setLongBreakInterval: (pomodoros: number) => void;
  };
}

const usePomodoroStore = create<PomodoroState>()((set) => ({
  completedPomodoroCount: 0,
  pomodoroMinutes: DEFAULT_POMODORO_MINUTES,
  shortBreakMinutes: DEFAULT_SHORT_BREAK_MINUTES,
  longBreakMinutes: DEFAULT_LONG_BREAK_MINUTES,
  longBreakInterval: DEFAULT_LONG_BREAK_INTERVAL,
  mode: "pomodoro",
  actions: {
    next: () =>
      set((state) => {
        if (state.mode === "long-break" || state.mode === "short-break") {
          return {
            mode: "pomodoro",
            completedPomodoroCount: state.completedPomodoroCount + 1,
          };
        }
        if (
          (state.completedPomodoroCount + 1) % state.longBreakInterval ===
          0
        ) {
          return { mode: "long-break" };
        }
        return { mode: "short-break" };
      }),
    previous: () =>
      set((state) => {
        if (state.mode === "long-break" || state.mode === "short-break") {
          return {
            mode: "pomodoro",
          };
        }
        if (state.completedPomodoroCount - 1 < 0) {
          return { mode: "pomodoro", completedPomodoroCount: 0 };
        }
        if (state.completedPomodoroCount - 1 === 0) {
          return { mode: "short-break", completedPomodoroCount: 0 };
        }
        if (state.completedPomodoroCount % state.longBreakInterval === 0) {
          return {
            mode: "long-break",
            completedPomodoroCount: state.completedPomodoroCount - 1,
          };
        }
        return {
          mode: "short-break",
          completedPomodoroCount: state.completedPomodoroCount - 1,
        };
      }),
    resetPomodoroCount: () =>
      set(() => ({ completedPomodoroCount: 0, mode: "pomodoro" })),
    resetToDefaultSettings: () =>
      set(() => ({
        pomodoroMinutes: DEFAULT_POMODORO_MINUTES,
        shortBreakMinutes: DEFAULT_SHORT_BREAK_MINUTES,
        longBreakMinutes: DEFAULT_LONG_BREAK_MINUTES,
        longBreakInterval: DEFAULT_LONG_BREAK_INTERVAL,
      })),
    setMode: (mode: TimerMode) => set(() => ({ mode })),
    setPomodoroMinutes: (minutes) =>
      set(() => ({ pomodoroMinutes: minutes <= 0 ? 1 : minutes })),
    setShortBreakMinutes: (minutes) =>
      set(() => ({ shortBreakMinutes: minutes <= 0 ? 1 : minutes })),
    setLongBreakMinutes: (minutes) =>
      set(() => ({ longBreakMinutes: minutes <= 0 ? 1 : minutes })),
    setLongBreakInterval: (pomodoros) =>
      set(() => ({ longBreakInterval: pomodoros <= 0 ? 1 : pomodoros })),
  },
}));

export const useCompletedPomodoroCount = () =>
  usePomodoroStore((state) => state.completedPomodoroCount);

export const usePomodoroMinutes = () =>
  usePomodoroStore((state) => state.pomodoroMinutes);

export const useShortBreakMinutes = () =>
  usePomodoroStore((state) => state.shortBreakMinutes);

export const useLongBreakMinutes = () =>
  usePomodoroStore((state) => state.longBreakMinutes);

export const useLongBreakInterval = () =>
  usePomodoroStore((state) => state.longBreakInterval);

export const useTimerMode = () => usePomodoroStore((state) => state.mode);

export const usePomodoroActions = () =>
  usePomodoroStore((state) => state.actions);

export { usePomodoroStore };

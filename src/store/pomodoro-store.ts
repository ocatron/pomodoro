import { create } from "zustand";

export type TimerMode = "pomodoro" | "short-break" | "long-break";

const DEFAULT_POMODORO_MINUTES = 25;
const DEFAULT_SHORT_BREAK_MINUTES = 5;
const DEFAULT_LONG_BREAK_MINUTES = 15;
const DEFAULT_LONG_BREAK_INTERVAL = 4;

export interface PomodoroState {
  pomodoroCount: number;
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
  };
}

const usePomodoroStore = create<PomodoroState>()((set) => ({
  pomodoroCount: 0,
  pomodoroMinutes: DEFAULT_POMODORO_MINUTES,
  shortBreakMinutes: DEFAULT_SHORT_BREAK_MINUTES,
  longBreakMinutes: DEFAULT_LONG_BREAK_MINUTES,
  longBreakInterval: DEFAULT_LONG_BREAK_INTERVAL,
  mode: "pomodoro",
  actions: {
    next: () =>
      set((state) => {
        if (state.mode === "long-break" || state.mode === "short-break") {
          return { mode: "pomodoro", pomodoroCount: state.pomodoroCount + 1 };
        }
        if ((state.pomodoroCount - 1) % state.longBreakInterval === 0) {
          return { mode: "long-break" };
        }
        return { mode: "short-break" };
      }),
    previous: () =>
      set((state) => {
        if (state.mode === "long-break" || state.mode === "short-break") {
          return { mode: "pomodoro", pomodoroCount: state.pomodoroCount - 1 };
        }
        if ((state.pomodoroCount - 1) % state.longBreakInterval === 0) {
          return { mode: "long-break" };
        }
        return { mode: "short-break" };
      }),
    resetPomodoroCount: () =>
      set(() => ({ pomodoroCount: 0, mode: "pomodoro" })),
    resetToDefaultSettings: () =>
      set(() => ({
        pomodoroMinutes: DEFAULT_POMODORO_MINUTES,
        shortBreakMinutes: DEFAULT_SHORT_BREAK_MINUTES,
        longBreakMinutes: DEFAULT_LONG_BREAK_MINUTES,
        longBreakInterval: DEFAULT_LONG_BREAK_INTERVAL,
      })),
    setMode: (mode: TimerMode) => set(() => ({ mode })),
  },
}));

export { usePomodoroStore };

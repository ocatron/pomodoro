import logo from "@/assets/logo.svg";
import { ModeToggle } from "../mode-toggle";

export function Header() {
  return (
    <header>
      <div className="flex h-14 w-full items-center justify-between border-b border-border bg-background px-4">
        <div className="flex items-center">
          <img className="h-8 w-8" src={logo} />
          <span className="pl-1.5 text-lg font-semibold">Pomodoro</span>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

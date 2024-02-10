import logo from "@/assets/logo.svg";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../button";
import { Settings2 as SettingsIcon } from "lucide-react";
import { Settings } from "../settings";

export function Header() {
  return (
    <header>
      <div className="flex h-14 w-full items-center justify-between border-b border-border bg-background px-4">
        <div className="flex items-center">
          <img className="h-8 w-8" src={logo} />
          <span className="pl-1.5 text-lg font-semibold">Pomodoro</span>
        </div>
        <div className="flex gap-4">
          <Settings>
            <Button variant="ghost" shape="square" size="sm">
              <SettingsIcon className="h-5 w-5" />
            </Button>
          </Settings>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

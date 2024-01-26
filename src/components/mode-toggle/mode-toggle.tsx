import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { Theme } from "../theme/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" shape="square" size="sm">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(newValue) => setTheme(newValue as Theme)}
        >
          <DropdownMenuRadioItem indicator="check" value="light">
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem indicator="check" value="dark">
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem indicator="check" value="system">
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

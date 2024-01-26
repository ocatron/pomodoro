import logo from "@/assets/logo.svg";

export function Header() {
  return (
    <header>
      <div className="flex h-14 w-full items-center border-b border-border bg-background px-4">
        <div className="flex items-center">
          <img className="h-8 w-8" src={logo} />
          <span className="pl-2 text-xl font-semibold">Pomodoro</span>
        </div>
      </div>
    </header>
  );
}

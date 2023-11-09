import logo from "@/assets/logo.svg";

export function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center px-4">
        <div className="flex items-center">
          <img className="h-8 w-8" src={logo} />
          <span className="pl-2 text-xl font-semibold">Pomodoro</span>
        </div>
      </div>
    </header>
  );
}

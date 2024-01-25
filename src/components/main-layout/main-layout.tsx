import { ReactNode } from "react";
import { Header } from "../header";

interface MainLayoutProps {
  children: ReactNode;
}
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-grow px-4">
        {children}
      </main>
    </div>
  );
}

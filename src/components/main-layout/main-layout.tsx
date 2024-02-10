import { ReactNode } from "react";
import { Header } from "../header";
import { ScrollArea } from "../scroll-area";

interface MainLayoutProps {
  children: ReactNode;
}
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <ScrollArea>
        <main className="mx-auto w-full max-w-3xl px-4 py-4">{children}</main>
      </ScrollArea>
    </div>
  );
}

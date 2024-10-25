import { ReactNode } from "react";
import { useLocation } from "react-router";
import { Navbar } from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex flex-col h-screen bg-background">
      <Navbar />

      <div
        className={`flex-1 p-4 w-full ${
          isLoginPage ? "overflow-hidden" : "overflow-auto"
        } `}
      >
        {children}
      </div>
    </div>
  );
}

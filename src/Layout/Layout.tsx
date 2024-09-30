import { ReactNode } from 'react';
import { Navbar } from './Navbar';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="z-20 bg-background">
      <Navbar />
      <div className="w-screen h-screen">{children}</div>
    </div>
  );
}

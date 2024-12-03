"use client";

import { createContext, SetStateAction, useState } from "react";

export type MenuContext = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
};

export const ContextStates = createContext<MenuContext | null>(null);

export function NavBar({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <ContextStates.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </ContextStates.Provider>
  );
}

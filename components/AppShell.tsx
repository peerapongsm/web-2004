"use client";

import type { ReactNode } from "react";
import { MuseumProvider } from "./MuseumContext";
import { MuseumToggleButton } from "./MuseumToggleButton";
import { SparkleCursor } from "./SparkleCursor";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <MuseumProvider>
      <SparkleCursor />
      <div className="museum-toggle-dock">
        <MuseumToggleButton />
      </div>
      {children}
    </MuseumProvider>
  );
}

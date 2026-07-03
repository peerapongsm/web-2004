"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { getAnnotation } from "@/lib/annotations";
import { MuseumCard } from "./MuseumCard";

interface MuseumContextValue {
  museumMode: boolean;
  toggleMuseumMode: () => void;
  openAnnotation: (id: string) => void;
}

const MuseumContext = createContext<MuseumContextValue | null>(null);

export function MuseumProvider({ children }: { children: ReactNode }) {
  const [museumMode, setMuseumMode] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const value: MuseumContextValue = {
    museumMode,
    toggleMuseumMode: () => setMuseumMode((m) => !m),
    openAnnotation: (id) => setActiveId(id),
  };

  const activeAnnotation = activeId ? getAnnotation(activeId) : undefined;

  return (
    <MuseumContext.Provider value={value}>
      {children}
      {activeAnnotation && <MuseumCard annotation={activeAnnotation} onClose={() => setActiveId(null)} />}
    </MuseumContext.Provider>
  );
}

export function useMuseum(): MuseumContextValue {
  const ctx = useContext(MuseumContext);
  if (!ctx) {
    throw new Error("useMuseum must be used within a MuseumProvider");
  }
  return ctx;
}

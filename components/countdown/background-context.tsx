"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BACKGROUND_IMAGES } from "@/lib/constants";

interface BackgroundContextType {
  currentIdx: number;
  totalImages: number;
  handleManualSwitch: () => void;
  handleRandomSwitch: () => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // Randomize initial background on client mount
  useEffect(() => {
    const random = Math.floor(Math.random() * BACKGROUND_IMAGES.length);
    setCurrentIdx(random);
  }, []);

  const handleManualSwitch = () => {
    setCurrentIdx((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
  };

  const handleRandomSwitch = () => {
    const available = BACKGROUND_IMAGES.map((_, i) => i).filter(
      (i) => i !== currentIdx
    );
    const random = available[Math.floor(Math.random() * available.length)];
    setCurrentIdx(random);
  };

  return (
    <BackgroundContext.Provider
      value={{
        currentIdx,
        totalImages: BACKGROUND_IMAGES.length,
        handleManualSwitch,
        handleRandomSwitch,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
}

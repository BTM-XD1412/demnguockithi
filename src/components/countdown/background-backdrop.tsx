"use client";

import Image from "next/image";
import { BACKGROUND_IMAGES } from "@/lib/constants";
import { useBackground } from "./background-context";

export function BackgroundBackdrop() {
  const { currentIdx } = useBackground();

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden select-none">
      <Image
        src={BACKGROUND_IMAGES[currentIdx]}
        alt="Background hình nền kỳ thi THPT"
        fill
        priority
        sizes="100vw"
        quality={80}
        className="object-cover object-center transition-opacity duration-700"
      />
      {/* Clean dark overlay for optimal legibility - NO gradient orbs or blur */}
      <div className="absolute inset-0 bg-background/85" />
    </div>
  );
}

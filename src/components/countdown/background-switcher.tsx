"use client";

import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Shuffle } from "lucide-react";
import { useBackground } from "./background-context";

export function BackgroundSwitcher() {
  const { currentIdx, totalImages, handleManualSwitch, handleRandomSwitch } =
    useBackground();

  return (
    <div className="flex items-center rounded-md border border-border bg-background/80 backdrop-blur-none divide-x divide-border">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleManualSwitch}
        className="gap-1.5 text-xs text-muted-foreground hover:text-foreground h-8 px-2 sm:px-2.5 rounded-r-none"
        title="Đổi hình nền thủ công"
      >
        <ImageIcon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">
          Hình ảnh ({currentIdx + 1}/{totalImages})
        </span>
        <span className="sm:hidden">
          ({currentIdx + 1}/{totalImages})
        </span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleRandomSwitch}
        className="gap-1.5 text-xs text-muted-foreground hover:text-foreground h-8 px-2 sm:px-2.5 rounded-l-none"
        title="Hình nền ngẫu nhiên"
      >
        <Shuffle className="h-3.5 w-3.5" />
        <span className="hidden md:inline">Ngẫu nhiên</span>
      </Button>
    </div>
  );
}

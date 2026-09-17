"use client";

import { PomodoroTimer } from "@/components/countdown/pomodoro-timer";
import { MusicPlayer } from "@/components/countdown/music-player";

export function StudyToolsSection() {
  return (
    <section aria-label="Công cụ học tập" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        <PomodoroTimer />
        <MusicPlayer />
      </div>
    </section>
  );
}

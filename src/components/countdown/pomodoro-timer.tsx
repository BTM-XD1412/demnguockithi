"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Check,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "study" | "break";
type Status = "idle" | "running" | "paused";

interface Preset {
  study: number;
  breakTime: number;
  label: string;
}

const PRESETS: Preset[] = [
  { study: 25, breakTime: 5, label: "25/5" },
  { study: 50, breakTime: 10, label: "50/10" },
  { study: 15, breakTime: 3, label: "15/3" },
  { study: 45, breakTime: 15, label: "45/15" },
];

function playChime() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, now); // D5
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.7);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, now + 0.2); // A5
    gain2.gain.setValueAtTime(0.25, now + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.2);
    osc2.stop(now + 1.1);
  } catch {
    // Audio restriction ignored
  }
}

export function PomodoroTimer() {
  const [studyMinutes, setStudyMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [mode, setMode] = useState<Mode>("study");
  const [status, setStatus] = useState<Status>("idle");
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  const [autoBreak, setAutoBreak] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalStudiedMinutes, setTotalStudiedMinutes] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleModeComplete = useCallback(() => {
    if (soundEnabled) {
      playChime();
    }

    if (mode === "study") {
      setCompletedSessions((prev) => prev + 1);
      setTotalStudiedMinutes((prev) => prev + studyMinutes);

      if (autoBreak) {
        setMode("break");
        setTimeLeft(breakMinutes * 60);
        setStatus("running");
      } else {
        setStatus("idle");
        setTimeLeft(studyMinutes * 60);
      }
    } else {
      setMode("study");
      setTimeLeft(studyMinutes * 60);
      setStatus("idle");
    }
  }, [mode, soundEnabled, autoBreak, studyMinutes, breakMinutes]);

  useEffect(() => {
    if (status === "running") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleModeComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, handleModeComplete]);

  const handleStartPause = () => {
    if (status === "running") {
      setStatus("paused");
    } else {
      setStatus("running");
    }
  };

  const handleStop = () => {
    setStatus("idle");
    setTimeLeft((mode === "study" ? studyMinutes : breakMinutes) * 60);
  };

  const handleReset = () => {
    setStatus("idle");
    setMode("study");
    setTimeLeft(studyMinutes * 60);
  };

  const handleApplyPreset = (preset: Preset) => {
    setStudyMinutes(preset.study);
    setBreakMinutes(preset.breakTime);
    setMode("study");
    setStatus("idle");
    setTimeLeft(preset.study * 60);
  };

  const handleStudyMinutesChange = (val: number) => {
    const clamped = Math.max(1, Math.min(180, val || 1));
    setStudyMinutes(clamped);
    if (status === "idle" && mode === "study") {
      setTimeLeft(clamped * 60);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <Card className="w-full border-border bg-card/85 transition-colors flex flex-col justify-between">
      <div>
        <CardHeader className="p-4 sm:p-5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center text-indigo-500 dark:text-indigo-400 shrink-0">
              <Timer className="h-4 w-4" />
            </div>
            <CardTitle className="text-base sm:text-lg font-bold text-foreground">
              Đồng Hồ Pomodoro
            </CardTitle>
          </div>
        </CardHeader>

        <div className="mx-4 sm:mx-5 border-b border-dashed border-border/80" />

        <CardContent className="p-4 sm:p-5 pt-3 space-y-3.5 text-center">
          {/* Cấu trúc & Trạng thái */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-semibold text-indigo-500 dark:text-indigo-400">
              Cấu trúc: {studyMinutes} học / {breakMinutes} nghỉ
            </p>
            <p className="text-[11px] sm:text-xs text-muted-foreground italic">
              Mục tiêu: {studyMinutes} phút (1 phiên)
            </p>

            <div className="pt-1 flex justify-center">
              {status === "idle" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                  <Check className="h-3 w-3 text-emerald-500" /> Sẵn sàng
                </span>
              )}
              {status === "running" && mode === "study" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  <Play className="h-3 w-3 fill-current" /> Đang học
                </span>
              )}
              {status === "running" && mode === "break" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <Coffee className="h-3 w-3" /> Đang nghỉ
                </span>
              )}
              {status === "paused" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Pause className="h-3 w-3" /> Tạm dừng
                </span>
              )}
            </div>
          </div>

          {/* Đồng hồ số lớn */}
          <div className="py-1">
            <span className="font-mono text-5xl sm:text-6xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight tabular-nums">
              {timeString}
            </span>
          </div>

          {/* Nút điều khiển chính */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <span>Mục tiêu (phút):</span>
              <Input
                type="number"
                min={1}
                max={180}
                value={studyMinutes}
                disabled={status === "running"}
                onChange={(e) => handleStudyMinutesChange(parseInt(e.target.value))}
                className="w-14 h-8 text-center text-xs font-bold rounded-lg px-1"
              />
            </div>

            <Button
              onClick={handleStartPause}
              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 h-8 px-3.5 text-xs font-semibold rounded-lg shadow-none"
            >
              {status === "running" ? (
                <>
                  <Pause className="h-3.5 w-3.5 fill-current" /> Tạm dừng
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" /> Bắt đầu
                </>
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={handleStop}
              disabled={status === "idle"}
              className="gap-1.5 h-8 px-3 text-xs rounded-lg"
            >
              <Pause className="h-3.5 w-3.5" /> Dừng
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-1 text-xs h-8 rounded-lg"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Tắt âm thanh thông báo" : "Bật âm thanh thông báo"}
              className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-indigo-500" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-muted-foreground/60" />
              )}
            </Button>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {PRESETS.map((preset) => {
              const isCurrent =
                studyMinutes === preset.study && breakMinutes === preset.breakTime;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-full border transition-colors",
                    isCurrent
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-none"
                      : "border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Tùy chọn Checkbox */}
          <div className="flex items-center justify-center gap-4 pt-1 text-xs text-muted-foreground">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoBreak}
                onChange={(e) => setAutoBreak(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-input accent-indigo-600 cursor-pointer"
              />
              <span>Tự động nghỉ</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-input accent-indigo-600 cursor-pointer"
              />
              <span>Âm thanh</span>
            </label>
          </div>
        </CardContent>
      </div>

      {/* Thống kê phiên học */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="rounded-lg bg-muted/40 border border-border/70 p-3 flex items-center justify-around text-center">
          <div className="space-y-0.5">
            <div className="font-mono text-xl sm:text-2xl font-black text-foreground tabular-nums">
              {completedSessions}
            </div>
            <div className="text-[11px] sm:text-xs text-muted-foreground font-medium">
              Phiên
            </div>
          </div>

          <div className="h-8 w-px bg-border/80" />

          <div className="space-y-0.5">
            <div className="font-mono text-xl sm:text-2xl font-black text-foreground tabular-nums">
              {totalStudiedMinutes}
            </div>
            <div className="text-[11px] sm:text-xs text-muted-foreground font-medium">
              Phút
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

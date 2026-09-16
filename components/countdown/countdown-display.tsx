"use client";

import { useEffect, useState } from "react";
import { EXAM_TARGET_DATE } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeRemaining(targetDateStr: string): TimeLeft {
  const target = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const distance = target - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

export function CountdownDisplay() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeRemaining(EXAM_TARGET_DATE)
  );
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(EXAM_TARGET_DATE));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "NGÀY", value: hasMounted ? timeLeft.days : "--" },
    { label: "GIỜ", value: hasMounted ? String(timeLeft.hours).padStart(2, "0") : "--" },
    { label: "PHÚT", value: hasMounted ? String(timeLeft.minutes).padStart(2, "0") : "--" },
    { label: "GIÂY", value: hasMounted ? String(timeLeft.seconds).padStart(2, "0") : "--" },
  ];

  return (
    <div className="w-full max-w-3xl flex flex-col items-center space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
        <Clock className="h-4 w-4" />
        <span>Thời gian còn lại</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full px-1 sm:px-0">
        {timeUnits.map((unit) => (
          <Card
            key={unit.label}
            className="flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 border-border bg-card/85 transition-colors hover:border-primary/40 text-center select-none"
          >
            <CardContent className="p-0 flex flex-col items-center justify-center">
              <span className="font-mono text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight tabular-nums text-foreground leading-none">
                {unit.value}
              </span>
              <span className="mt-2 sm:mt-2.5 text-[10px] sm:text-xs font-semibold text-muted-foreground tracking-widest uppercase">
                {unit.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {timeLeft.isExpired && hasMounted && (
        <div className="p-4 rounded-md border border-primary/40 bg-secondary/50 text-center text-sm font-medium text-foreground">
          Kỳ thi đã bắt đầu! Chúc các bạn làm bài thật tốt và đạt kết quả cao nhất!
        </div>
      )}
    </div>
  );
}

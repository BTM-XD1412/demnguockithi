"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  SCHOOL_YEAR_START_DATE,
  SCHOOL_YEAR_START_DISPLAY,
  EXAM_TARGET_DATE,
} from "@/lib/constants";

export function SchoolProgress() {
  const [mounted, setMounted] = useState(false);
  const [percent, setPercent] = useState<number>(4.6);

  useEffect(() => {
    setMounted(true);

    const calculatePercent = () => {
      const start = new Date(SCHOOL_YEAR_START_DATE).getTime();
      const target = new Date(EXAM_TARGET_DATE).getTime();
      const now = Date.now();

      const total = target - start;
      const elapsed = now - start;

      if (total <= 0) return 100;
      if (elapsed <= 0) return 0;

      const calculated = (elapsed / total) * 100;
      return Math.min(100, Math.max(0, parseFloat(calculated.toFixed(1))));
    };

    setPercent(calculatePercent());

    const interval = setInterval(() => {
      setPercent(calculatePercent());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const displayPercent = mounted ? `${percent}%` : "0%";

  return (
    <Card className="w-full border-border bg-card/85 transition-colors hover:border-border/80 text-left">
      <CardContent className="p-4 sm:p-5 space-y-2.5">
        <div className="flex items-center justify-between text-sm sm:text-base font-bold">
          <span className="text-foreground tracking-tight">Tiến trình</span>
          <span className="text-amber-500 dark:text-amber-400 font-semibold tabular-nums">
            {displayPercent}
          </span>
        </div>

        <div className="w-full">
          <Progress
            value={mounted ? percent : 0}
            className="h-2.5 bg-muted/60"
            indicatorClassName="bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-amber-400"
          />
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {displayPercent} thời gian đã qua từ đầu năm học ({SCHOOL_YEAR_START_DISPLAY}) đến kỳ thi THPT 2027
        </p>
      </CardContent>
    </Card>
  );
}

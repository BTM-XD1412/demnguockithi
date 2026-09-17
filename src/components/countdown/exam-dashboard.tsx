"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteCard } from "@/components/countdown/quote-card";
import { SchoolProgress } from "@/components/countdown/school-progress";
import { ExamScheduleCard } from "@/components/countdown/exam-schedule-card";
import { EXAM_SCHEDULE_2027, ExamScheduleItem } from "@/lib/constants";
import { QuoteItem } from "@/lib/quotes";

interface ExamDashboardProps {
  initialQuote?: QuoteItem;
}

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

export function ExamDashboard({ initialQuote }: ExamDashboardProps) {
  const [selectedSubject, setSelectedSubject] = useState<ExamScheduleItem>(
    () => EXAM_SCHEDULE_2027[0]
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeRemaining(selectedSubject.targetDate)
  );
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setTimeLeft(calculateTimeRemaining(selectedSubject.targetDate));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(selectedSubject.targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedSubject]);

  const timeUnits = [
    { label: "NGÀY", value: hasMounted ? timeLeft.days : "--" },
    {
      label: "GIỜ",
      value: hasMounted ? String(timeLeft.hours).padStart(2, "0") : "--",
    },
    {
      label: "PHÚT",
      value: hasMounted ? String(timeLeft.minutes).padStart(2, "0") : "--",
    },
    {
      label: "GIÂY",
      value: hasMounted ? String(timeLeft.seconds).padStart(2, "0") : "--",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start text-left">
      {/* Cột trái: Thông tin môn thi tiếp theo, Đồng hồ đếm ngược, Danh ngôn, Tiến trình */}
      <div className="lg:col-span-7 space-y-4 sm:space-y-5">
        {/* Banner Môn thi tiếp theo */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Clock className="h-5 w-5" />
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Môn thi tiếp theo
              </p>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                  {selectedSubject.name}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 tabular-nums">
                  {selectedSubject.dateDisplay} - {selectedSubject.timeDisplay}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground pt-0.5">
            Thời gian còn lại đến môn thi {selectedSubject.name}
          </p>
        </div>

        {/* 4 Thẻ đếm ngược */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full">
          {timeUnits.map((unit) => (
            <Card
              key={unit.label}
              className="p-3 sm:p-4 md:p-5 border-border bg-card/85 transition-colors hover:border-border/80 select-none text-left"
            >
              <CardContent className="p-0 flex flex-col items-start justify-center">
                <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums text-foreground leading-none">
                  {unit.value}
                </span>
                <span className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  {unit.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {timeLeft.isExpired && hasMounted && (
          <div className="p-3.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-xs sm:text-sm font-medium text-foreground">
            Môn thi {selectedSubject.name} đã bắt đầu! Chúc các sĩ tử tự tin làm bài thật tốt!
          </div>
        )}

        {/* Danh ngôn tự động xoay trượt */}
        <QuoteCard initialQuote={initialQuote} autoRotateInterval={5000} />

        {/* Thanh tiến trình năm học */}
        <SchoolProgress />
      </div>

      {/* Cột phải: Lịch thi tổng quan 2027 (Dự kiến) */}
      <div className="lg:col-span-5 space-y-4">
        <ExamScheduleCard
          selectedSubjectId={selectedSubject.id}
          onSelectSubject={(subj) => setSelectedSubject(subj)}
        />
      </div>
    </div>
  );
}

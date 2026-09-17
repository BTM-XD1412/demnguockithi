"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, PenLine, Calculator } from "lucide-react";
import { EXAM_SCHEDULE_2027, ExamScheduleItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ExamScheduleCardProps {
  selectedSubjectId?: string;
  onSelectSubject?: (subject: ExamScheduleItem) => void;
}

export function ExamScheduleCard({
  selectedSubjectId = "literature",
  onSelectSubject,
}: ExamScheduleCardProps) {
  return (
    <Card className="w-full border-border bg-card/85 text-left transition-colors">
      <CardHeader className="p-4 sm:p-5 pb-3 sm:pb-3.5">
        <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg">
          <CalendarDays className="h-5 w-5 text-amber-500 dark:text-amber-400 shrink-0" />
          <CardTitle className="text-base sm:text-lg font-bold">
            Lịch thi tổng quan 2027 (Dự kiến)
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-0 space-y-2.5">
        {EXAM_SCHEDULE_2027.map((subject) => {
          const isSelected = selectedSubjectId === subject.id;

          return (
            <div
              key={subject.id}
              onClick={() => onSelectSubject?.(subject)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectSubject?.(subject);
                }
              }}
              className={cn(
                "group relative flex items-center justify-between p-3 sm:p-3.5 rounded-lg border transition-all cursor-pointer text-left outline-none",
                isSelected
                  ? "border-amber-500/50 bg-amber-500/10 dark:bg-amber-500/10"
                  : "border-border/70 bg-card hover:border-border hover:bg-muted/40"
              )}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className={cn(
                    "flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-md shrink-0 transition-colors",
                    subject.type === "literature" &&
                      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                    subject.type === "math" &&
                      "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20",
                    subject.type === "elective1" &&
                      "bg-sky-600 text-white font-mono font-bold text-xs",
                    subject.type === "elective2" &&
                      "bg-sky-600 text-white font-mono font-bold text-xs"
                  )}
                >
                  {subject.type === "literature" && <PenLine className="h-4 w-4" />}
                  {subject.type === "math" && <Calculator className="h-4 w-4" />}
                  {subject.type === "elective1" && <span>1</span>}
                  {subject.type === "elective2" && <span>2</span>}
                </div>

                <div className="space-y-0.5 truncate">
                  <p className="text-xs sm:text-sm font-semibold text-foreground tracking-tight truncate">
                    {subject.name}
                  </p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground tabular-nums">
                    {subject.dateDisplay} | {subject.timeDisplay} | {subject.durationMinutes} phút
                  </p>
                </div>
              </div>

              {isSelected && (
                <Badge
                  variant="outline"
                  className="shrink-0 border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full"
                >
                  Đang đếm ngược
                </Badge>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

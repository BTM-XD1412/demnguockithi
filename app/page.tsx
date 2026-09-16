import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CountdownDisplay } from "@/components/countdown/countdown-display";
import { QuoteCard } from "@/components/countdown/quote-card";
import { BackgroundBackdrop } from "@/components/countdown/background-backdrop";
import { getRandomQuote } from "@/lib/quotes";
import { EXAM_TITLE, EXAM_DATE_DISPLAY } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Đếm ngược ngày thi tốt nghiệp THPT 2027",
  description: "Trang web đếm ngược ngày thi tốt nghiệp THPT 2027 dành cho học sinh THPT.",
};

export default function HomePage() {
  const initialQuote = getRandomQuote();

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <BackgroundBackdrop />
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-10 md:py-16 space-y-6 sm:space-y-8 md:space-y-10 max-w-4xl mx-auto w-full text-center">
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            {EXAM_TITLE}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto px-2">
            Đếm ngược từng khoảnh khắc chuẩn bị cho kỳ thi quan trọng nhất thời học sinh.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3 sm:space-y-4 w-full">
          <CountdownDisplay />

          <div className="flex items-center justify-center">
            <Badge
              variant="outline"
              className="gap-1.5 py-1 px-3 text-xs sm:text-sm font-normal text-muted-foreground"
            >
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <span>
                Ngày thi: <strong className="text-foreground font-semibold">{EXAM_DATE_DISPLAY}</strong>
              </span>
              <span className="text-muted-foreground/80">(Dự đoán)</span>
            </Badge>
          </div>
        </div>

        <QuoteCard initialQuote={initialQuote} />
      </main>

      <SiteFooter />
    </div>
  );
}

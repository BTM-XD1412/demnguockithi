import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackgroundBackdrop } from "@/components/countdown/background-backdrop";
import { ExamDashboard } from "@/components/countdown/exam-dashboard";
import { getRandomQuote } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "Đếm ngược ngày thi tốt nghiệp THPT 2027",
  description: "Trang web đếm ngược ngày thi tốt nghiệp THPT 2027 dành cho học sinh THPT với tiến trình năm học và lịch thi chi tiết.",
};

export default function HomePage() {
  const initialQuote = getRandomQuote();

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <BackgroundBackdrop />
      <SiteHeader />

      <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-3 sm:px-4 py-6 sm:py-8 md:py-10">
        <ExamDashboard initialQuote={initialQuote} />
      </main>

      <SiteFooter />
    </div>
  );
}

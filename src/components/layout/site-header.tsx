import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap } from "lucide-react";
import { EXAM_TITLE } from "@/lib/constants";
import { PwaInstaller } from "@/components/pwa/pwa-installer";
import { BackgroundSwitcher } from "@/components/countdown/background-switcher";

export function SiteHeader() {
  return (
    <header className="w-full border-b border-border/40 bg-background/70 backdrop-blur-none sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 font-bold text-foreground hover:text-muted-foreground transition-colors shrink-0"
        >
          <div className="p-1 sm:p-1.5 rounded-md bg-secondary text-foreground">
            <GraduationCap className="h-4 sm:h-5 w-4 sm:w-5" />
          </div>
          <span className="hidden md:inline-block text-sm sm:text-base tracking-tight">
            {EXAM_TITLE}
          </span>
          <span className="md:hidden text-sm sm:text-base font-bold tracking-tight">
            THPT 2027
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <BackgroundSwitcher />

          <PwaInstaller />

          <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs h-8 px-2 sm:px-3">
            <Link href="/info" title="Thông tin kỳ thi">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden xs:inline-block">Giới thiệu</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

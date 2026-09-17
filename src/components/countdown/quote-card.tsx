"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { QuoteItem, getRandomQuote } from "@/lib/quotes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  initialQuote?: QuoteItem;
  autoRotateInterval?: number; // default 5000ms (5 giây)
}

export function QuoteCard({
  initialQuote,
  autoRotateInterval = 5000,
}: QuoteCardProps) {
  const [quote, setQuote] = useState<QuoteItem>(() => initialQuote || getRandomQuote());
  const [slideState, setSlideState] = useState<"idle" | "exit" | "enter">("idle");
  const [isManualRotating, setIsManualRotating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const switchQuote = useCallback(() => {
    setSlideState("exit");

    setTimeout(() => {
      setQuote((prev) => getRandomQuote(prev.id));
      setSlideState("enter");

      setTimeout(() => {
        setSlideState("idle");
      }, 50);
    }, 280);
  }, []);

  const handleManualNext = () => {
    setIsManualRotating(true);
    switchQuote();
    setTimeout(() => setIsManualRotating(false), 500);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      switchQuote();
    }, autoRotateInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, autoRotateInterval, switchQuote]);

  return (
    <Card
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full border-border bg-card/85 text-left transition-colors hover:border-border/80"
    >
      <CardContent className="p-4 sm:p-5 flex items-start justify-between gap-3">
        <div className="relative border-l-2 border-amber-500/80 dark:border-amber-400/80 pl-3.5 sm:pl-4 py-0.5 overflow-hidden min-h-[58px] flex-1 flex flex-col justify-center">
          <div
            className={cn(
              "transition-all duration-300 ease-out transform",
              slideState === "exit" && "opacity-0 -translate-y-2.5",
              slideState === "enter" && "opacity-0 translate-y-2.5",
              slideState === "idle" && "opacity-100 translate-y-0"
            )}
          >
            <blockquote className="text-xs sm:text-sm md:text-base font-medium text-foreground tracking-tight leading-snug">
              &ldquo;{quote.text}&rdquo;
            </blockquote>

            {(quote.author || quote.translation) && (
              <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] sm:text-xs text-muted-foreground leading-normal">
                {quote.author && (
                  <span className="font-medium text-foreground/80">
                    {quote.author}
                  </span>
                )}
                {quote.translation && (
                  <span className="text-muted-foreground/75 italic">
                    {quote.translation}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleManualNext}
          title="Đổi danh ngôn khác"
          className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0 rounded-full"
        >
          <RefreshCw
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-500",
              isManualRotating && "rotate-180"
            )}
          />
          <span className="sr-only">Đổi câu danh ngôn</span>
        </Button>
      </CardContent>
    </Card>
  );
}

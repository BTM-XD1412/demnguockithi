"use client";

import { useState } from "react";
import { QuoteItem, getRandomQuote } from "@/lib/quotes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, RefreshCw } from "lucide-react";

interface QuoteCardProps {
  initialQuote?: QuoteItem;
}

export function QuoteCard({ initialQuote }: QuoteCardProps) {
  const [quote, setQuote] = useState<QuoteItem>(() => initialQuote || getRandomQuote());
  const [isRotating, setIsRotating] = useState(false);

  const handleNextQuote = () => {
    setIsRotating(true);
    const next = getRandomQuote(quote.id);
    setQuote(next);
    setTimeout(() => setIsRotating(false), 300);
  };

  return (
    <Card className="w-full max-w-2xl border-border bg-card/75 backdrop-blur-none transition-colors hover:border-muted-foreground/30">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
          <div className="rounded-full p-2 bg-secondary text-foreground">
            <Quote className="h-4 sm:h-5 w-4 sm:w-5" />
          </div>
          <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed text-foreground transition-opacity px-1">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          {quote.author && (
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              - {quote.author} -
            </p>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextQuote}
            className="text-xs text-muted-foreground hover:text-foreground gap-2 mt-1 sm:mt-2 h-8 sm:h-9"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                isRotating ? "rotate-180" : ""
              }`}
            />
            <span className="hidden sm:inline">Đổi câu nói truyền cảm hứng</span>
            <span className="sm:hidden">Đổi danh ngôn</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

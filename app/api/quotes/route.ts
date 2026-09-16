import { NextRequest } from "next/server";
import { QUOTES, getRandomQuote } from "@/lib/quotes";
import { createSuccessResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const random = searchParams.get("random");

  if (random === "true" || random === "1") {
    const quote = getRandomQuote();
    return createSuccessResponse({
      quote,
    });
  }

  return createSuccessResponse({
    quotes: QUOTES,
    total: QUOTES.length,
  });
}

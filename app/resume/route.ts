import { NextResponse } from "next/server"
import { portfolioContent } from "@/data/content"

// Stable short link (/resume) that forwards to the current resume file.
export function GET() {
  return NextResponse.redirect(portfolioContent.hero.resumeHref, 307)
}

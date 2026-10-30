import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { GeistSans } from "geist/font/sans"
import { portfolioContent } from "@/data/content"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL

export const metadata: Metadata = {
  metadataBase: new URL(vercelHost ? `https://${vercelHost}` : "http://localhost:3000"),
  title: portfolioContent.metadata.title,
  description: portfolioContent.metadata.description,
  openGraph: {
    title: portfolioContent.metadata.title,
    description: portfolioContent.metadata.description,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: portfolioContent.metadata.openGraphAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioContent.metadata.title,
    description: portfolioContent.metadata.description,
    images: ["/opengraph-image"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfe" },
    { media: "(prefers-color-scheme: dark)", color: "#10111c" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <a className="skip-link" href="#main-content">
          {portfolioContent.accessibility.skipToContent}
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

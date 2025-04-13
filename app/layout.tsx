import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import CommentsSection from "@/components/comments-section"
import { fontArabic } from "./fonts"
import { SiteDataProvider } from "@/lib/data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Art Space",
  description: "A creative sanctuary where art, coffee, and community converge",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.className} ${fontArabic.variable}`} suppressHydrationWarning>
        <SiteDataProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              {children}
              <CommentsSection />
            </div>
          </ThemeProvider>
        </SiteDataProvider>
      </body>
    </html>
  )
}


import './globals.css'
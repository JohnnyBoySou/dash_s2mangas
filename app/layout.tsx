import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ClientLayout from "./ClientLayout"
import { AuthProvider } from "@/contexts/auth-context"
import { QueryProvider } from "@/contexts/query-provider"

import { Work_Sans } from "next/font/google"
const work_sans = Work_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Manga Dashboard",
  description: "A dashboard for managing manga data",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={work_sans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <AuthProvider>
              <ClientLayout>{children}</ClientLayout>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

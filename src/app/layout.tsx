import '@/styles/global.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'
import AuthProvider from '@/contexts/AuthContext'
// "text-gray-950 antialiased"
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    template: '%s - Radiant',
    default: 'Radiant - Close every deal',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Radiant Blog"
          href="/blog/feed.xml"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        </body>
    </html>
  )
}

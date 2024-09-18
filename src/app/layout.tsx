import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthSessionProvider from './components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dandi Github Analyzer',
  description: 'Get powerful insights for open source GitHub repositories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
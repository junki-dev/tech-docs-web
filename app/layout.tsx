import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/app/components/Header'
import BoxContent from '@/app/components/BoxContent'
import Box from '@/app/components/Box'
import ReactQueryProvider from '@/app/components/ReactQueryProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Technical Documentations',
  description: 'Technical Documentations',
}

export const viewport: Viewport = {
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={
          'w-screen h-screen bg-my-bg-1 text-my-font-1 overflow-x-hidden'
        }
      >
        {children}
      </body>
    </html>
  )
}

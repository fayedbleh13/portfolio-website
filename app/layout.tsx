import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Digital Soul — Portfolio',
  description: 'Emotional Engineering. A cinematic portfolio experience.',
  metadataBase: new URL('https://portfolio-website.com'), // Update to actual domain
  openGraph: {
    title: 'Digital Soul — Portfolio',
    description: 'Emotional Engineering. A cinematic portfolio experience.',
    url: 'https://portfolio-website.com',
    siteName: 'Digital Soul',
    images: [
      {
        url: '/og-image.png', // Default Next.js OG image path
        width: 1200,
        height: 630,
        alt: 'Digital Soul Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Soul — Portfolio',
    description: 'Emotional Engineering. A cinematic portfolio experience.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-obsidian text-foreground selection:bg-violet selection:text-white radial-bg`}
      >
        {children}
      </body>
    </html>
  )
}

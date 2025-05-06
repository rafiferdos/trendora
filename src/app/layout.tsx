import type { Metadata } from 'next'
import { Geist, Geist_Mono, Jost } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/themeProvider/theme-provider'
import { Toaster } from 'sonner'
import Providers from '@/providers/Providers'
import { WishlistProvider } from '@/context/WishLists.context'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const jost = Jost({
  subsets: ['latin'], // Specify the subset
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'], // Optional: Specify font weights
})

export const metadata: Metadata = {
  title: 'Swap Nest',
  description: 'Swap Nest is a decentralized exchange (DEX) aggregator that helps users find the best prices for their crypto trades across multiple DEXs.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} ${jost.className} antialiased`}
      >
        <Providers>
          <WishlistProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster position="top-center" richColors />
            </ThemeProvider>
          </WishlistProvider>
        </Providers>
      </body>
    </html>
  )
}

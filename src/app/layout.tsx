import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jihad-smadi.dev'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Jihad Al-Smadi · Full-stack Engineer',
    template: '%s · Jihad Al-Smadi',
  },
  description: 'Full-stack engineer building production SaaS & ERP systems with .NET and Angular.',
  openGraph: {
    type:      'website',
    locale:    'en_US',
    url:       BASE,
    siteName:  'Jihad Al-Smadi',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Jihad Al-Smadi — Full-stack Engineer' }],
  },
  twitter: {
    card:    'summary_large_image',
    creator: '@jihadsmadi',
    images:  ['/opengraph-image'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var r=localStorage.getItem('theme');var t=r?JSON.parse(r):null;if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

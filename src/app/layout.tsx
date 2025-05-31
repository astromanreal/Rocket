
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from './providers'; 

const geistSans = GeistSans;
const geistMono = GeistMono;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rocketpedia - Your Ultimate Rocket Guide & Space Exploration Hub',
    template: '%s | Rocketpedia',
  },
  description: 'Explore rockets, space agencies, merchandise, and the science of spaceflight. Rocketpedia is your ultimate guide to the universe of launch vehicles, space exploration, and community discussions.',
  keywords: ['rockets', 'space exploration', 'spaceflight', 'launch vehicles', 'NASA', 'SpaceX', 'astronauts', 'rocket science', 'space agencies', 'rocket data', 'space community', 'rocket merch'],
  openGraph: {
    title: {
        default: 'Rocketpedia - Ultimate Rocket Guide & Space Hub',
        template: '%s | Rocketpedia',
    },
    description: 'Explore rockets, space agencies, merchandise, and the science of spaceflight on Rocketpedia.',
    url: siteUrl,
    siteName: 'Rocketpedia',
    images: [
      {
        url: `${siteUrl}/og-default.png`, 
        width: 1200,
        height: 630,
        alt: 'Rocketpedia Logo and Space Background',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
        default: 'Rocketpedia - Ultimate Rocket Guide & Space Hub',
        template: '%s | Rocketpedia',
    },
    description: 'Explore rockets, space agencies, merchandise, and the science of spaceflight on Rocketpedia.',
    images: [`${siteUrl}/twitter-default.png`], 
    // site: '@YourTwitterHandle', // Optional: Add your Twitter handle
    // creator: '@YourTwitterHandle', // Optional: Add your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: siteUrl,
      name: 'Rocketpedia',
      description: 'Explore rockets, space agencies, merchandise, and the science of spaceflight. Rocketpedia is your ultimate guide to the universe of launch vehicles, space exploration, and community discussions.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      publisher: { // Added publisher for WebSite
        '@type': 'Organization',
        name: 'Rocketpedia',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/rocketpedia-logo.png` // Replace with actual logo URL
        }
      }
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <meta name="google-site-verification" content="mac7aLjz9hgBPOeatEJp8fZ6RL2GRi8PeWQfgcITzFU" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistSans.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" 
          enableSystem
          disableTransitionOnChange
        >
          <Providers> 
            <Header />
            <main className="flex-1 pt-[56px]">{children}</main>
            <Toaster />
          </Providers> 
        </ThemeProvider>
      </body>
    </html>
  );
}

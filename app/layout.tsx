import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider, ThemeScript } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const clerkAppearance = {
  variables: {
    colorPrimary: '#8a2be2',
    colorBackground: 'rgba(26, 26, 26, 0.8)',
    colorInputBackground: '#1f2937',
    colorInputText: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: '#888888',
    borderRadius: '8px',
  },
  elements: {
    formButtonPrimary: {
      background: 'linear-gradient(to bottom, #8a2be2, rgba(138, 43, 226, 0.8))',
      '&:hover': {
        background: 'linear-gradient(to bottom, rgba(138, 43, 226, 0.9), rgba(138, 43, 226, 0.7))',
      },
    },
    card: {
      background: 'rgba(26, 26, 26, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(51, 51, 51, 0.4)',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    headerTitle: {
      color: '#ffffff',
    },
    headerSubtitle: {
      color: '#888888',
    },
    socialButtonsBlockButton: {
      background: '#1f2937',
      border: '1px solid #374151',
      color: '#ffffff',
      '&:hover': {
        background: '#374151',
      },
    },
    formFieldInput: {
      background: '#1f2937',
      border: '1px solid #374151',
      color: '#ffffff',
      '&:focus': {
        borderColor: '#8a2be2',
        boxShadow: '0 0 0 1px #8a2be2',
      },
    },
    formFieldLabel: {
      color: '#888888',
    },
    footerActionLink: {
      color: '#8a2be2',
      '&:hover': {
        color: '#a855f7',
      },
    },
  },
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vybecoding.ai'),
  title: {
    default: 'VybeCoding.ai - AI-Powered Development Platform',
    template: '%s | VybeCoding.ai'
  },
  description: 'Discover AI-built projects, applications, and tools. Browse live demos, source code, and the exact prompts used to create innovative software solutions.',
  keywords: [
    'AI development',
    'AI-built apps',
    'artificial intelligence',
    'coding platform',
    'developer tools',
    'AI projects',
    'machine learning',
    'software development',
    'programming guides',
    'tech tutorials'
  ],
  authors: [{ name: 'VybeCoding Team' }],
  creator: 'VybeCoding.ai',
  publisher: 'VybeCoding.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vybecoding.ai',
    siteName: 'VybeCoding.ai',
    title: 'VybeCoding.ai - AI-Powered Development Platform',
    description: 'Discover AI-built projects, applications, and tools. Browse live demos, source code, and the exact prompts used to create innovative software solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VybeCoding.ai - AI-Powered Development Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VybeCoding.ai - AI-Powered Development Platform',
    description: 'Discover AI-built projects, applications, and tools. Browse live demos, source code, and the exact prompts used to create innovative software solutions.',
    images: ['/og-image.png'],
    creator: '@vybecoding',
    site: '@vybecoding',
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  alternates: {
    canonical: 'https://vybecoding.ai',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <ThemeScript />
        </head>
        <body suppressHydrationWarning>
          <ThemeProvider
            defaultTheme="dark"
            storageKey="vybe-theme"
            enableSystem
          >
            <ConvexClientProvider>{children}</ConvexClientProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
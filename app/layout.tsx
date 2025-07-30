import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider, ThemeScript } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const clerkAppearance = {
  variables: {
    colorPrimary: '#8a2be2',
    colorBackground: 'transparent',
    colorInputBackground: 'rgba(31, 41, 55, 1)',
    colorInputText: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: '#9ca3af',
    borderRadius: '0.5rem',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  elements: {
    formButtonPrimary: {
      background: 'linear-gradient(to bottom, #8a2be2, rgba(138, 43, 226, 0.8))',
      padding: '0.75rem 1.5rem',
      fontWeight: '500',
      '&:hover': {
        background: 'linear-gradient(to bottom, rgba(138, 43, 226, 0.9), rgba(138, 43, 226, 0.7))',
      },
    },
    card: {
      background: 'transparent',
      backdropFilter: 'none',
      border: 'none',
      borderRadius: '0',
      boxShadow: 'none',
      padding: '0',
    },
    headerTitle: {
      display: 'none',
    },
    headerSubtitle: {
      display: 'none',
    },
    socialButtonsBlockButton: {
      background: 'rgba(31, 41, 55, 1)',
      border: '1px solid rgba(55, 65, 81, 1)',
      color: '#ffffff',
      '&:hover': {
        background: '#374151',
      },
    },
    formFieldInput: {
      background: 'rgba(31, 41, 55, 1)',
      border: '1px solid rgba(55, 65, 81, 1)',
      color: '#ffffff',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      '&::placeholder': {
        color: 'rgba(107, 114, 128, 1)',
      },
      '&:focus': {
        borderColor: '#8a2be2',
        boxShadow: '0 0 0 1px #8a2be2',
      },
    },
    formFieldLabel: {
      color: '#9ca3af',
      fontSize: '0.875rem',
      fontWeight: '500',
      marginBottom: '0.5rem',
    },
    footerActionLink: {
      color: '#8a2be2',
      fontWeight: '500',
      '&:hover': {
        color: '#a855f7',
      },
    },
    formFieldAction: {
      color: '#8a2be2',
      fontSize: '0.875rem',
      '&:hover': {
        color: '#a855f7',
      },
    },
    dividerLine: {
      backgroundColor: 'rgba(55, 65, 81, 1)',
    },
    dividerText: {
      color: 'rgba(107, 114, 128, 1)',
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
      padding: '0 0.5rem',
    },
    identityPreviewText: {
      color: '#9ca3af',
    },
    identityPreviewEditButton: {
      color: '#8a2be2',
      '&:hover': {
        color: '#a855f7',
      },
    },
    alternativeMethodsBlockButton: {
      color: '#8a2be2',
      fontSize: '0.875rem',
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
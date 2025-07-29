import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider, ThemeScript } from "@/contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "vybecoding.ai",
  description: "AI-powered development platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
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
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
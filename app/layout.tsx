import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";
import AppLayout from '@/components/layout/AppLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HARKA10 - AI Training Platform",
  description: "Master AI in 48 hours with our intensive training program",
  keywords: ["AI", "training", "artificial intelligence", "education", "learning"],
  authors: [{ name: "HARKA10" }],
  openGraph: {
    title: "HARKA10 - AI Training Platform",
    description: "Master AI in 48 hours with our intensive training program",
    url: "https://harka10.com",
    siteName: "HARKA10",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HARKA10 AI Training Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HARKA10 - AI Training Platform",
    description: "Master AI in 48 hours with our intensive training program",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jacob.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jacob | Venture Capitalist",
    template: "%s | Jacob",
  },
  description: "Venture Capitalist specializing in Gaming and AI. Preparing for the birth of a new industry by combining gaming and AI.",
  keywords: ["Venture Capital", "VC", "Gaming", "AI", "Investment", "Startups", "M&A", "Biz-Dev"],
  authors: [{ name: "Jacob" }],
  creator: "Jacob",
  publisher: "Jacob",
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
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    url: siteUrl,
    title: "Jacob | Venture Capitalist",
    description: "Venture Capitalist specializing in Gaming and AI. Preparing for the birth of a new industry by combining gaming and AI.",
    siteName: "Jacob",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jacob - Venture Capitalist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacob | Venture Capitalist",
    description: "Venture Capitalist specializing in Gaming and AI.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

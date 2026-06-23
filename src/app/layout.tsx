import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunday Vibes | One-Stop Creative Platform",
  description: "Platform digital multifungsi yang menyatukan seluruh layanan kreatif dan teknis dalam satu ekosistem terintegrasi.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sundayvibes.id'),
  openGraph: {
    title: "Sunday Vibes | One-Stop Creative Platform",
    description: "Platform digital multifungsi yang menyatukan seluruh layanan kreatif dan teknis dalam satu ekosistem terintegrasi.",
    url: "/",
    siteName: "Sunday Vibes",
    images: [
      {
        url: "/assets/og-default.png", // Will be created or mapped later
        width: 1200,
        height: 630,
        alt: "Sunday Vibes",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} h-full antialiased`}>
      <head>
        {/* Analytics Umami Placeholder (No-Cookie) */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && process.env.NEXT_PUBLIC_UMAMI_URL && (
          <Script
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

async function getOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sundayvibes.id";
  type Loose = Record<string, unknown> | undefined;
  let contact: Loose;
  let site: Loose;
  try {
    const payload = await getPayload({ config: configPromise });
    contact = (await payload.findGlobal({ slug: "contact-info" })) as Loose;
    site = (await payload.findGlobal({ slug: "site-config" })) as Loose;
  } catch {
    // Globals may be empty in a fresh DB — emit minimal schema.
    contact = undefined;
    site = undefined;
  }

  const brandName = (site?.brandName as string) || "Sunday Vibes";
  const addressText =
    typeof contact?.address === "string" ? (contact.address as string) : "";
  const socialMedia = Array.isArray(site?.socialMedia)
    ? (site?.socialMedia as Array<{ url?: string }>)
    : [];
  const social = socialMedia.filter((s) => s?.url).map((s) => s.url as string);

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${baseUrl}/#organization`,
    name: brandName,
    url: baseUrl,
    email: (contact?.email as string) || undefined,
    telephone: contact?.whatsappNumber ? `+${contact.whatsappNumber}` : undefined,
    address: addressText ? { "@type": "PostalAddress", streetAddress: addressText } : undefined,
    sameAs: social.length ? social : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1917" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents iOS Safari auto-zoom on inputs
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Sunday Vibes | One-Stop Creative Platform",
  description: "Platform digital multifungsi yang menyatukan seluruh layanan kreatif dan teknis dalam satu ekosistem terintegrasi.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sundayvibes.id'),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sunday Vibes",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/logo-black-transparent.webp", // Will act as Apple Touch Icon
  },
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = await getOrganizationSchema();
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
        <JsonLd data={organizationSchema} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
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
    priceRange: "Rp 25.000 - Rp 5.000.000",
    areaServed: [
      { "@type": "City", "name": "Surabaya" },
      { "@type": "City", "name": "Tuban" }
    ]
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
  description: "Platform digital multifungsi di Surabaya yang menyatukan layanan event organizer, sewa alat kamera, pembuatan website/aplikasi, produk digital, dan fotografi profesional.",
  keywords: ["event organizer surabaya", "sewa kamera surabaya", "sewa drone surabaya", "jasa pembuatan website", "jasa coding", "jasa foto wisuda", "sunday vibes"],
  authors: [{ name: "Sunday Vibes Team" }],
  creator: "Sunday Vibes",
  publisher: "Sunday Vibes",
  generator: "Sunday Vibes Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sundayvibes.id'),
  alternates: {
    canonical: '/',
  },
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
  twitter: {
    card: "summary_large_image",
    title: "Sunday Vibes | One-Stop Creative Platform",
    description: "Layanan kreatif dan teknis (Event, Foto, Web Dev, Sewa Alat) dalam satu ekosistem terintegrasi.",
    images: ["/assets/og-default.png"],
  },
  category: "technology",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/assets/logo-black-transparent.webp" type="image/webp" />
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

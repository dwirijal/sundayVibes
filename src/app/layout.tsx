import type { Metadata, Viewport } from "next";
import { Nunito, Inter } from "next/font/google";
import Script from "next/script";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return 'https://sundayvibes.id'
  try {
    return new URL(raw).origin
  } catch {
    return 'https://sundayvibes.id'
  }
}

async function getOrganizationSchema() {
  const baseUrl = siteUrl();
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
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Sunday Vibes | Premium Growth & Systems Agency",
  description: "Mitra strategis digital growth dan systems automation. Kami melayani optimasi konversi, sistem AI bisnis, visual branding, custom Next.js/WordPress development, dan infrastruktur IT.",
  keywords: ["digital agency surabaya", "growth agency surabaya", "otomatisasi sistem bisnis", "jasa ai chatbot", "jasa seo surabaya", "jasa pembuatan website Next.js", "sunday vibes agency", "event organizer surabaya", "sewa kamera surabaya"],
  authors: [{ name: "Sunday Vibes Team" }],
  creator: "Sunday Vibes",
  publisher: "Sunday Vibes",
  generator: "Sunday Vibes Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl()),
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
    title: "Sunday Vibes | Premium Growth & Systems Agency",
    description: "Mitra strategis optimasi konversi, otomatisasi sistem bisnis berbasis AI, & pengembangan infrastruktur IT modern.",
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
    title: "Sunday Vibes | Premium Growth & Systems Agency",
    description: "Optimasi konversi, sistem AI bisnis, visual branding, custom web dev, & infrastruktur IT dalam satu ekosistem terintegrasi.",
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
    <html lang="id" className={cn("h-full", "antialiased", "font-sans", inter.variable)} suppressHydrationWarning>
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
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
          </Script>
        )}
        <JsonLd data={organizationSchema} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
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

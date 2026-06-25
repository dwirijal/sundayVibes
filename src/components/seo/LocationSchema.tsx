import { JsonLd } from "./JsonLd";

interface LocationSchemaProps {
  city: string;
  province?: string;
  latitude?: number;
  longitude?: number;
}

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Tuban: { lat: -6.8989, lng: 112.0511 },
  Surabaya: { lat: -7.2575, lng: 112.7521 },
};

export function LocationSchema({ city, province = "Jawa Timur", latitude, longitude }: LocationSchemaProps) {
  const coords = CITY_COORDS[city] || { lat: latitude || 0, lng: longitude || 0 };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sundayvibes.id";

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Sunday Vibes - ${city}`,
    "image": `${baseUrl}/assets/og-default.png`,
    "url": baseUrl,
    "telephone": "+6285157319611",
    "priceRange": "Rp 25.000 - Rp 5.000.000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": province,
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coords.lat,
      "longitude": coords.lng
    },
    "areaServed": {
      "@type": "City",
      "name": city
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://tiktok.com/@sundayvibes._"
    ]
  };

  return <JsonLd data={schema} />;
}

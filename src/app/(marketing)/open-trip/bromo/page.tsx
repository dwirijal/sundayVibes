import type { Metadata } from "next";
import { PageTransition } from "@/components/animations";
import { BromoTripClient } from "./BromoTripClient";

export const metadata: Metadata = {
  title: "Open Trip Bromo - Sunday Vibes",
  description: "Ikuti Open Trip Bromo pada 25-26 Juli 2026. Mulai 450K per orang. Fasilitas lengkap: Makan, Snack, Tour Guide, Transportasi Full AC, Jeep Hardtop.",
  openGraph: {
    title: "Open Trip Bromo - Sunday Vibes",
    description: "Ikuti Open Trip Bromo pada 25-26 Juli 2026. Mulai 450K per orang. Fasilitas lengkap.",
    images: [{ url: "/assets/og-default.png" }],
  },
};

export default function BromoTripPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <BromoTripClient />
      </main>
    </PageTransition>
  );
}

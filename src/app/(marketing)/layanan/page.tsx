import type { Metadata } from "next";
import { PageTransition } from "@/components/animations";
import { LayananClient } from "./LayananClient";

export const metadata: Metadata = {
  title: "Layanan - Sunday Vibes",
  description: "Semua layanan kreatif: Event Organizer, Digital Product, Sewa Alat, Design, Coding, WordPress, Photography.",
};

export default function LayananPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <LayananClient />
        </div>
      </main>
    </PageTransition>
  );
}

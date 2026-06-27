import { Suspense } from "react";
import type { Metadata } from "next";
import KontrakPageClient from "./KontrakPageClient";

export const metadata: Metadata = {
  title: "Kontrak Sewa Alat | Sunday Vibes",
  description:
    "Buat kontrak sewa alat kreatif dengan mudah. Isi form, pilih alat, bayar via QRIS, dan dapatkan kontrak rental resmi dari Sunday Vibes.",
  openGraph: {
    title: "Kontrak Sewa Alat | Sunday Vibes",
    description:
      "Buat kontrak sewa alat kreatif dengan mudah. Isi form, pilih alat, bayar via QRIS, dan dapatkan kontrak rental resmi dari Sunday Vibes.",
    type: "website",
  },
};

export default function KontrakPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-32 pb-24 bg-background">
          <div className="container mx-auto px-6 max-w-4xl text-center text-muted-foreground">
            Memuat kontrak...
          </div>
        </main>
      }
    >
      <KontrakPageClient />
    </Suspense>
  );
}
